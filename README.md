# Bleisure Trip Planner

A production-ready **Next.js 15** App Router application for planning business + leisure ("bleisure") trips with:

- Tailwind CSS dark theme
- Leaflet map with Nominatim geocoding (client-side, static-hosting friendly)
- Itinerary generation with editable activities
- Solar-powered hotel suggestions
- Travel cost estimator with solar savings and carbon estimate
- PDF export via jsPDF
- Zustand state with local persistence
- **PWA**: installable, offline-capable, service worker caching
- Routes: Home, Planner, Saved trips, Offline fallback

## Requirements

- Node.js 18.18+ (Node 20+ recommended)
- npm 9+

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production static export to `out/` |
| `npm run serve:static` | Serve static `out/` folder locally |
| `npm run lint` | Run ESLint |

## Production build (static export)

This app uses **static export** (`output: "export"`). The build outputs HTML/CSS/JS to `out/`.

```bash
npm install
npm run build
npm run serve:static
```

Deploy the `out/` folder to any static host (Vercel, Netlify, GitHub Pages, S3, etc.).

## PWA (Progressive Web App)

The app is a full **installable PWA** with offline support.

### What's included

| Feature | Location |
|---------|----------|
| Web App Manifest | `public/manifest.webmanifest` |
| Service Worker | `public/sw.js` |
| Install prompt | `components/pwa/InstallPrompt.tsx` |
| Offline banner | `components/pwa/OfflineBanner.tsx` |
| Offline page | `/offline/` + `public/offline.html` |
| Icons | `public/icons/icon-*.png` |

### Manifest highlights

- **Name:** Bleisure Trip Planner
- **Start URL:** `/planner/`
- **Theme / background:** `#0f1419` (dark bleisure style)
- **Display:** standalone
- **Shortcuts:** Planner, Saved trips

### Offline behavior

After one online visit, the service worker caches:

- App pages (`/`, `/planner/`, `/saved/`, `/offline/`)
- Static assets (`/_next/static/*`, icons, manifest)
- Map tiles (OpenStreetMap) where possible — stale-while-revalidate, capped cache

**Works offline:**

- View and edit cached itineraries
- Saved trips (Zustand + localStorage)
- Export PDF from cached data
- Previously viewed map tiles

**Requires network:**

- New destination geocoding (Nominatim)
- Fresh solar hotel lookups for new destinations

### Install on device

**Desktop (Chrome / Edge):**

1. Open the deployed or local app (`npm run serve:static`)
2. Click the install icon in the address bar, or use the in-app **Add to home screen** prompt

**Mobile (Android Chrome):**

1. Open the site
2. Tap **Add to home screen** from the browser menu or install prompt

**iOS Safari:**

1. Open the site in Safari
2. Tap Share → **Add to Home Screen**

### Test PWA locally

```bash
npm run build
npm run serve:static
```

1. Visit http://localhost:3000/planner/
2. Open DevTools → Application → Manifest / Service Workers
3. Confirm manifest loads and service worker is active
4. Enable **Offline** in DevTools → Network, reload — planner and saved trips should still work

### Why a custom service worker?

This project uses **static export** (`output: "export"`), which is ideal for static hosting but incompatible with `next-pwa` server integration. A hand-written service worker in `public/sw.js` is the recommended approach for offline caching with static Next.js exports.

## Project structure

```
app/
  page.tsx                 # Home
  planner/page.tsx         # Main planner
  saved/page.tsx           # Saved trips
  offline/page.tsx         # Offline fallback UI
components/
  planner/                 # Map, forms, itinerary, costs, hotels
  pwa/                     # Service worker, install prompt, offline banner
  saved/                   # Saved trips UI
lib/                       # Trip logic, costs, PDF, geocode
public/
  manifest.webmanifest
  sw.js
  icons/
store/trip-store.ts        # Zustand store with persistence
```

## Notes

- Geocoding uses Nominatim in the browser with cache-busting for CORS reliability.
- Trip data persists in the browser via Zustand `persist` (localStorage).
- Legacy single-file version: `legacy/index.html`
