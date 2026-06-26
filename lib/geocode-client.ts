import type { GeocodeResult } from "./types";

const GEOCODE_TIMEOUT_MS = 10000;

export async function geocodeDestinationClient(
  query: string,
): Promise<GeocodeResult | null> {
  const trimmed = query.trim();
  if (!trimmed) {
    return null;
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", trimmed);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("cb", String(Date.now()));
  url.searchParams.set("addressdetails", "0");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEOCODE_TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
      referrerPolicy: "origin",
    });

    if (!response.ok) {
      return null;
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
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
