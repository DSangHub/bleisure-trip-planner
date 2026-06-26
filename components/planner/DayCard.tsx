"use client";

import { Button, inputClassName } from "@/components/ui/Button";
import type { TripDay } from "@/lib/types";

export function DayCard({
  day,
  badgeClasses,
  onUpdateActivity,
  onAddActivity,
  onRemoveActivity,
}: {
  day: TripDay;
  badgeClasses: string;
  onUpdateActivity: (dayIndex: number, activityIndex: number, value: string) => void;
  onAddActivity: (dayIndex: number) => void;
  onRemoveActivity: (dayIndex: number, activityIndex: number) => void;
}) {
  const badgeLabel = day.type === "open" ? "Flexible" : day.type;

  return (
    <article className="rounded-xl border border-line bg-ink/45 p-3 sm:p-4">
      <header className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-semibold">{day.label}</div>
          <div className="text-xs text-mist sm:text-sm">{day.date}</div>
        </div>
        <span
          className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide ${badgeClasses}`}
        >
          {badgeLabel}
        </span>
      </header>

      {day.activities.map((activity, activityIndex) => (
        <div key={activityIndex} className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            value={activity}
            onChange={(event) =>
              onUpdateActivity(day.index, activityIndex, event.target.value)
            }
            aria-label={`Activity for ${day.label}`}
            className={`${inputClassName()} flex-1 py-2 text-sm`}
          />
          <Button
            type="button"
            variant="danger"
            className="sm:shrink-0"
            onClick={() => onRemoveActivity(day.index, activityIndex)}
          >
            Remove
          </Button>
        </div>
      ))}

      <div className="mt-3">
        <Button type="button" onClick={() => onAddActivity(day.index)}>
          Add activity
        </Button>
      </div>
    </article>
  );
}
