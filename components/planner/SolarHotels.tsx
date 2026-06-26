"use client";

import { ListingRating } from "@/components/ui/ListingRating";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { PlatformDataNote } from "@/components/ui/PlatformDataNote";
import { Card } from "@/components/ui/Card";
import { formatMoney } from "@/lib/format";
import { useTripStore } from "@/store/trip-store";

export function SolarHotels() {
  const trip = useTripStore((state) => state.trip);
  const hotels = useTripStore((state) => state.hotels);

  return (
    <Card
      title="Solar-powered stays"
      description="Example listings from Airbnb, Booking.com, and Vrbo — eco options prioritized."
      action={
        <p className="text-xs text-mist sm:text-sm">
          {hotels.length
            ? `${hotels.length} picks near ${trip.destination}`
            : "Generate an itinerary to see stays."}
        </p>
      }
    >
      <div className="space-y-3">
        {!hotels.length ? (
          <div className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-mist">
            Lodging suggestions appear after you generate an itinerary.
          </div>
        ) : (
          <>
            {hotels.map((hotel) => (
              <article
                key={hotel.id}
                className="rounded-xl border border-line bg-ink/45 p-3 sm:p-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <PlatformBadge platform={hotel.platform} />
                        {hotel.ecoFriendly ? (
                          <span className="rounded-full border border-solar/35 bg-solar/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-200">
                            Eco
                          </span>
                        ) : null}
                      </div>
                      <h3 className="font-semibold leading-snug">{hotel.name}</h3>
                      <p className="mt-0.5 text-xs text-mist">{hotel.propertyType}</p>
                      <p className="mt-2 text-sm text-mist">{hotel.highlight}</p>
                      <div className="mt-2">
                        <ListingRating rating={hotel.rating} reviewCount={hotel.reviewCount} />
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-solar/15 px-2.5 py-1 text-xs font-semibold text-amber-200">
                          {hotel.solarCoverage}% solar
                        </span>
                        <span className="rounded-full bg-sky/15 px-2.5 py-1 text-xs font-semibold text-sky">
                          {formatMoney(hotel.nightlyRate)}/night
                        </span>
                      </div>
                      <a
                        href={hotel.bookUrl}
                        className="inline-flex items-center justify-center rounded-xl border border-solar/35 bg-solar/10 px-4 py-2 text-sm font-medium text-amber-200 transition hover:-translate-y-0.5"
                        aria-label={`Book ${hotel.name} on ${hotel.platform} (placeholder)`}
                      >
                        Book
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <PlatformDataNote />
          </>
        )}
      </div>
    </Card>
  );
}
