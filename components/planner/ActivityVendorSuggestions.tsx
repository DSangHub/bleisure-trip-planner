"use client";

import {
  detectActivityCategory,
  getActivityCategoryLabel,
  getActivityVendors,
  getHikingVendorGroups,
} from "@/lib/activity-vendors";
import { ListingRating } from "@/components/ui/ListingRating";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { PlatformDataNote } from "@/components/ui/PlatformDataNote";
import type { ActivityVendor, HikingVendorKind } from "@/lib/types";

export function ActivityVendorSuggestions({
  destination,
  activity,
}: {
  destination: string;
  activity: string;
}) {
  const trimmed = activity.trim();
  if (!trimmed) {
    return null;
  }

  const category = detectActivityCategory(trimmed);
  const hikingGroups = getHikingVendorGroups(destination, trimmed);
  const vendors = hikingGroups ? [] : getActivityVendors(destination, trimmed);

  if (!hikingGroups && !vendors.length) {
    return null;
  }

  return (
    <div className="mt-2 rounded-xl border border-line/80 bg-panel2/40 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-mist">
          Local picks · {getActivityCategoryLabel(category)}
        </p>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
          Eco options first
        </span>
      </div>

      {hikingGroups ? (
        <div className="space-y-3">
          {hikingGroups.guidedTours.length ? (
            <VendorSection title="Guided tours" vendors={hikingGroups.guidedTours} />
          ) : null}
          {hikingGroups.gearRentals.length ? (
            <VendorSection title="Gear rentals" vendors={hikingGroups.gearRentals} />
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}

      <PlatformDataNote className="mt-3 border-t border-line/60 pt-2" />
    </div>
  );
}

function VendorSection({ title, vendors }: { title: string; vendors: ActivityVendor[] }) {
  return (
    <div>
      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-300">
        {title}
      </h4>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}

function kindLabel(kind?: HikingVendorKind): string | null {
  if (kind === "guided-tour") return "Guided tour";
  if (kind === "gear-rental") return "Gear rental";
  return null;
}

function VendorCard({ vendor }: { vendor: ActivityVendor }) {
  const subtype = kindLabel(vendor.kind);

  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-ink/50 p-3">
      <div className="mb-1 flex flex-wrap items-center gap-1.5">
        <PlatformBadge platform={vendor.platform} />
        {vendor.ecoFriendly ? (
          <span
            className="rounded-full border border-solar/35 bg-solar/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-200"
            title="Eco or solar-friendly operator"
          >
            Eco
          </span>
        ) : null}
      </div>
      <div className="mb-1 min-w-0">
        <h4 className="text-sm font-semibold leading-snug text-slate-100">{vendor.name}</h4>
        {subtype ? (
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-mist">
            {subtype}
          </p>
        ) : null}
      </div>
      <p className="mb-2 flex-1 text-xs leading-relaxed text-mist">{vendor.description}</p>
      <ListingRating rating={vendor.rating} reviewCount={vendor.reviewCount} />
      <div className="mt-2 flex items-center justify-between gap-2 pt-1">
        <span className="text-xs font-medium text-sky">{vendor.priceEstimate}</span>
        <a
          href={vendor.bookUrl}
          className="inline-flex shrink-0 items-center justify-center rounded-xl border border-solar/35 bg-solar/10 px-3 py-1.5 text-xs font-medium text-amber-200 transition hover:-translate-y-0.5"
          aria-label={`Book ${vendor.name} via ${vendor.platform} (placeholder)`}
        >
          Book
        </a>
      </div>
    </article>
  );
}
