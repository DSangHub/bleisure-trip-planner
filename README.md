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

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js**
4. Build command: `npm run build`
5. Output: default (`.next`)
6. Deploy

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Notes

- Map tiles use OpenStreetMap; geocoding uses Nominatim with a server route to avoid browser CORS issues.
- Trip data is stored in the browser via Zustand `persist` (localStorage).
- The legacy single-file version is preserved in `legacy/index.html`.
