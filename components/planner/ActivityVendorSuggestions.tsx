"use client";

import {
  detectActivityCategory,
  getActivityCategoryLabel,
  getActivityVendors,
} from "@/lib/activity-vendors";
import type { ActivityVendor } from "@/lib/types";

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
  const vendors = getActivityVendors(destination, trimmed);

  if (!vendors.length) {
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

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}

function VendorCard({ vendor }: { vendor: ActivityVendor }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-ink/50 p-3">
      <div className="mb-1 flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold leading-snug text-slate-100">{vendor.name}</h4>
        {vendor.ecoFriendly ? (
          <span
            className="shrink-0 rounded-full border border-solar/35 bg-solar/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-200"
            title="Eco or solar-friendly operator"
          >
            Eco
          </span>
        ) : null}
      </div>
      <p className="mb-2 flex-1 text-xs leading-relaxed text-mist">{vendor.description}</p>
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="text-xs font-medium text-sky">{vendor.priceEstimate}</span>
        <a
          href={vendor.bookUrl}
          className="inline-flex shrink-0 items-center justify-center rounded-xl border border-solar/35 bg-solar/10 px-3 py-1.5 text-xs font-medium text-amber-200 transition hover:-translate-y-0.5"
          aria-label={`Book ${vendor.name} (placeholder)`}
        >
          Book
        </a>
      </div>
    </article>
  );
}
