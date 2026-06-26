"use client";

import { useEffect } from "react";

function canRegisterServiceWorker() {
  if (typeof window === "undefined") {
    return false;
  }

  if (!("serviceWorker" in navigator)) {
    return false;
  }

  const { protocol, hostname } = window.location;
  const isHttp = protocol === "http:" || protocol === "https:";
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".localhost");

  return isHttp && (protocol === "https:" || isLocalhost);
}

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!canRegisterServiceWorker()) {
      if (window.location.protocol === "file:") {
        console.info(
          "[pwa] Service workers are disabled for file:// URLs. Serve the out/ folder over http://localhost instead.",
        );
      }
      return;
    }

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    };

    if (document.readyState === "complete") {
      void register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);

  return null;
}
