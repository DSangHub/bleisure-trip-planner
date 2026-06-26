"use client";

import type { ReactNode } from "react";
import { ListingRating } from "@/components/ui/ListingRating";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import type { ActivityVendor } from "@/lib/types";

export function SuggestionVendorCard({
  vendor,
  action,
}: {
  vendor: ActivityVendor;
  action?: ReactNode;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-ink/50 p-3">
      <div className="mb-1 flex flex-wrap items-center gap-1.5">
        <PlatformBadge platform={vendor.platform} />
        {vendor.ecoFriendly ? (
          <span className="rounded-full border border-solar/35 bg-solar/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-200">
            Eco
          </span>
        ) : null}
      </div>
      <h4 className="text-sm font-semibold leading-snug text-slate-100">{vendor.name}</h4>
      <p className="mt-1 flex-1 text-xs leading-relaxed text-mist">{vendor.description}</p>
      <ListingRating rating={vendor.rating} reviewCount={vendor.reviewCount} />
      <div className="mt-2 flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs font-medium text-sky">{vendor.priceEstimate}</span>
        <div className="flex flex-wrap gap-2">
          <a
            href={vendor.bookUrl}
            className="inline-flex items-center justify-center rounded-xl border border-solar/35 bg-solar/10 px-3 py-1.5 text-xs font-medium text-amber-200 transition hover:-translate-y-0.5"
            aria-label={`Book ${vendor.name} (placeholder)`}
          >
            Book
          </a>
          {action}
        </div>
      </div>
    </article>
  );
}
