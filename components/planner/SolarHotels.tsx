"use client";

import { Card } from "@/components/ui/Card";
import { formatMoney } from "@/lib/format";
import { useTripStore } from "@/store/trip-store";

export function SolarHotels() {
  const trip = useTripStore((state) => state.trip);
  const hotels = useTripStore((state) => state.hotels);

  return (
    <Card
      title="Solar-powered hotel suggestions"
      description="Eco-certified stays with on-site solar generation."
      action={
        <p className="text-xs text-mist sm:text-sm">
          {hotels.length
            ? `${hotels.length} solar stays near ${trip.destination}`
            : "Generate an itinerary to see hotel picks."}
        </p>
      }
    >
      <div className="space-y-3">
        {!hotels.length ? (
          <div className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-mist">
            Hotel suggestions appear after you generate an itinerary.
          </div>
        ) : (
          hotels.map((hotel) => (
            <article
              key={hotel.name}
              className="rounded-xl border border-line bg-ink/45 p-3 sm:p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p className="mt-1 text-sm text-mist">{hotel.highlight}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-solar/15 px-2.5 py-1 text-xs font-semibold text-amber-200">
                    {hotel.solarCoverage}% solar
                  </span>
                  <span className="rounded-full bg-sky/15 px-2.5 py-1 text-xs font-semibold text-sky">
                    {formatMoney(hotel.nightlyRate)}/night
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs text-mist">
                Guest rating {hotel.rating.toFixed(1)} / 5
              </p>
            </article>
          ))
        )}
      </div>
    </Card>
  );
}
