import type { GeocodeResult } from "./types";

export async function geocodeDestination(query: string): Promise<GeocodeResult | null> {
  const trimmed = query.trim();
  if (!trimmed) {
    return null;
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", trimmed);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("cb", String(Date.now()));

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "User-Agent": "BleisureTripPlanner/1.0 (Next.js app)",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Could not load map location. Try again in a moment.");
  }

  const results = (await response.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
  }>;

  if (!results.length) {
    return null;
  }

  const match = results[0];
  return {
    lat: Number(match.lat),
    lon: Number(match.lon),
    displayName: match.display_name,
  };
}
