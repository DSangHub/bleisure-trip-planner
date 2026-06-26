import { NextResponse } from "next/server";
import { geocodeDestination } from "@/lib/geocode";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query?.trim()) {
    return NextResponse.json({ error: "Destination query is required." }, { status: 400 });
  }

  try {
    const result = await geocodeDestination(query);
    if (!result) {
      return NextResponse.json(
        { error: `No map match found for "${query}". Try a city and country.` },
        { status: 404 },
      );
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Could not load map location. Try again in a moment." },
      { status: 502 },
    );
  }
}
