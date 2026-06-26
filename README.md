# Bleisure Trip Planner

A production-ready **Next.js 15** App Router application for planning business + leisure ("bleisure") trips with:

- Tailwind CSS dark theme
- Leaflet map with Nominatim geocoding (server-side API route)
- Itinerary generation with editable activities
- Solar-powered hotel suggestions
- Travel cost estimator with solar savings and carbon estimate
- PDF export via jsPDF
- Zustand state with local persistence
- Routes: Home, Planner, Saved trips

## Requirements

- Node.js 18.18+ (Node 20+ recommended)
- npm 9+

## Setup

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project structure

```
app/
  page.tsx              # Home / marketing landing
  planner/page.tsx      # Main trip planner workspace
  saved/page.tsx        # Saved trips collection
  api/geocode/route.ts  # Nominatim geocode proxy
components/
  planner/              # Map, forms, itinerary, costs, hotels
  saved/                # Saved trips UI
  layout/               # Header, background
lib/                    # Trip logic, costs, PDF, geocode
store/trip-store.ts     # Zustand store with persistence
```

## Production build (static export)

This app is configured for **static export** (`output: "export"`). The build outputs static HTML/CSS/JS to the `out/` folder.

```bash
npm install
npm run build
npm run serve:static
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown by `serve`).

Geocoding runs in the browser via Nominatim (with cache-busting) so no server API is required for static hosting. Deploy the `out/` folder to any static host (Vercel static, Netlify, GitHub Pages, S3, etc.).

### Node server (optional)

If you remove `output: "export"` from `next.config.ts` and restore the geocode API route, you can use:

```bash
npm run build
npm run start
```
