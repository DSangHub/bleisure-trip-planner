"use client";

import { useState } from "react";
import { SuggestionVendorCard } from "@/components/planner/SuggestionVendorCard";
import { Button } from "@/components/ui/Button";
import { PlatformDataNote } from "@/components/ui/PlatformDataNote";
import {
  getSuggestionActivityLabel,
  getSuggestionCategoryLabel,
  getSuggestionsForCategory,
  SUGGESTION_CHIPS,
} from "@/lib/activity-suggestions";
import type { SuggestionCategory, TripDay } from "@/lib/types";
import { useToastStore } from "@/store/toast-store";

export function ActivitySuggestions({
  destination,
  days,
  onAddToDay,
}: {
  destination: string;
  days: TripDay[];
  onAddToDay: (dayIndex: number, activity: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<SuggestionCategory>("biking");
  const [expandedDayPicker, setExpandedDayPicker] = useState<string | null>(null);
  const showToast = useToastStore((state) => state.showToast);

  if (!days.length) {
    return null;
  }

  const vendors = getSuggestionsForCategory(destination, activeCategory, 3);

  const handleAdd = (vendorId: string, dayIndex: number, activity: string) => {
    onAddToDay(dayIndex, activity);
    setExpandedDayPicker(null);
    const day = days.find((item) => item.index === dayIndex);
    showToast(`Added to ${day?.label ?? "day"}: ${activity}`, "success");
  };

  return (
    <section className="mb-4 rounded-2xl border border-line bg-panel/60 p-3 sm:p-4">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Activity suggestions</h3>
          <p className="mt-1 text-xs text-mist">
            Browse by category for {destination} — add experiences to any day card.
          </p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
          Eco options first
        </span>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Activity categories">
        {SUGGESTION_CHIPS.map((chip) => {
          const isActive = chip.id === activeCategory;
          return (
            <button
              key={chip.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveCategory(chip.id);
                setExpandedDayPicker(null);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                isActive
                  ? "border-sky/40 bg-sky/15 text-sky"
                  : "border-line bg-panel2/80 text-mist hover:border-sky/30 hover:text-slate-200"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-mist">
        {getSuggestionCategoryLabel(activeCategory)} near {destination}
      </p>

      <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-3">
        {vendors.map((vendor) => {
          const activityLabel = getSuggestionActivityLabel(destination, activeCategory, vendor);
          const pickerKey = vendor.id;

          return (
            <SuggestionVendorCard
              key={vendor.id}
              vendor={vendor}
              action={
                <div className="relative">
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-3 py-1.5 text-xs"
                    onClick={() =>
                      setExpandedDayPicker((current) =>
                        current === pickerKey ? null : pickerKey,
                      )
                    }
                  >
                    Add to day
                  </Button>
                  {expandedDayPicker === pickerKey ? (
                    <div className="absolute right-0 top-full z-20 mt-1 min-w-[10rem] rounded-xl border border-line bg-panel p-2 shadow-glow">
                      <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wide text-mist">
                        Pick a day
                      </p>
                      <div className="flex flex-col gap-1">
                        {days.map((day) => (
                          <button
                            key={day.index}
                            type="button"
                            onClick={() => handleAdd(vendor.id, day.index, activityLabel)}
                            className="rounded-lg px-2 py-1.5 text-left text-xs text-slate-200 transition hover:bg-sky/10"
                          >
                            {day.label}
                            <span className="ml-1 text-mist">· {day.type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              }
            />
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {days
          .filter((day) => day.type === "leisure" || day.type === "open")
          .slice(0, 3)
          .map((day) => (
            <Button
              key={`quick-${day.index}`}
              type="button"
              variant="secondary"
              className="px-3 py-1.5 text-xs"
              onClick={() =>
                handleAdd(
                  `quick-${activeCategory}`,
                  day.index,
                  getSuggestionActivityLabel(destination, activeCategory),
                )
              }
            >
              Quick add to {day.label}
            </Button>
          ))}
      </div>

      <PlatformDataNote className="mt-3 border-t border-line/60 pt-2" />
    </section>
  );
}
