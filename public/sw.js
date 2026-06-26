/* eslint-disable no-restricted-globals */
const VERSION = "bleisure-pwa-v2";
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const TILE_CACHE = `tiles-${VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/planner/",
  "/saved/",
  "/offline/",
  "/offline.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

async function precacheAssets(cache) {
  await Promise.allSettled(
    PRECACHE_URLS.map(async (url) => {
      try {
        await cache.add(url);
      } catch (error) {
        console.warn("[sw] precache skipped:", url, error);
      }
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => precacheAssets(cache))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.includes(VERSION))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isMapTileRequest(url) {
  return (
    url.hostname.endsWith("tile.openstreetmap.org") ||
    url.hostname.includes("basemaps.cartocdn.com")
  );
}

function isStaticAsset(url) {
  return url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/");
}

function isNavigationRequest(request) {
  return request.mode === "navigate";
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    if (cached) {
      return cached;
    }
    throw error;
  }
}

async function networkFirstWithOfflineFallback(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    const offlinePage =
      (await caches.match("/offline/")) || (await caches.match("/offline.html"));
    if (offlinePage) {
      return offlinePage;
    }

    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

async function staleWhileRevalidate(request, cacheName, maxEntries = 80) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
        cache.keys().then((keys) => {
          if (keys.length > maxEntries) {
            cache.delete(keys[0]);
          }
        });
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  if (url.origin !== self.location.origin && !isMapTileRequest(url)) {
    return;
  }

  if (isNavigationRequest(request)) {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  if (isStaticAsset(url) || PRECACHE_URLS.includes(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  if (isMapTileRequest(url)) {
    event.respondWith(staleWhileRevalidate(request, TILE_CACHE));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(networkFirstWithOfflineFallback(request));
  }
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
