"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { exportItineraryPdf } from "@/lib/pdf";
import { normalizeTripForm, validateTrip } from "@/lib/trip";
import { useTripStore } from "@/store/trip-store";
import { DayCard } from "@/components/planner/DayCard";
import { ActivitySuggestions } from "@/components/planner/ActivitySuggestions";

function badgeClasses(type: string) {
  if (type === "business") return "bg-amber-400/15 text-amber-200";
  if (type === "leisure") return "bg-emerald-400/15 text-emerald-200";
  return "bg-slate-400/15 text-slate-200";
}

export function ItineraryOverview({ className = "" }: { className?: string }) {
  const trip = useTripStore((state) => state.trip);
  const days = useTripStore((state) => state.days);
  const hotels = useTripStore((state) => state.hotels);
  const costEstimate = useTripStore((state) => state.costEstimate);
  const updateActivity = useTripStore((state) => state.updateActivity);
  const addActivity = useTripStore((state) => state.addActivity);
  const appendActivityToDay = useTripStore((state) => state.appendActivityToDay);
  const removeActivity = useTripStore((state) => state.removeActivity);

  let total = 0;
  try {
    if (days.length) {
      total = validateTrip(trip).total;
    }
  } catch {
    total = 0;
  }

  const handleExport = () => {
    if (!days.length) {
      useTripStore.getState().setStatusMessage("Generate an itinerary before exporting to PDF.");
      return;
    }
    const normalizedTrip = normalizeTripForm(trip);
    exportItineraryPdf({ trip: normalizedTrip, total, days, hotels, costEstimate });
    useTripStore.getState().setStatusMessage("Itinerary exported as PDF.");
  };

  return (
    <Card
      className={className}
      title="Itinerary overview"
      action={
        <Button variant="solar" onClick={handleExport}>
          Export PDF
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
        <Stat value={String(total)} label="Total days" valueClass="text-sky" />
        <Stat value={String(trip.businessDays)} label="Business days" valueClass="text-biz" />
        <Stat value={String(trip.leisureDays)} label="Leisure days" valueClass="text-fun" />
      </div>

      {days.length ? (
        <ActivitySuggestions
          destination={trip.destination}
          days={days}
          onAddToDay={appendActivityToDay}
        />
      ) : null}

      <div id="day-list" className="day-list max-h-[32rem] space-y-3 overflow-y-auto pr-1 sm:max-h-[40rem] lg:max-h-[calc(100vh-16rem)]">
        {!days.length ? (
          <div className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-mist">
            Generate an itinerary to see your day-by-day plan.
          </div>
        ) : (
          days.map((day) => (
            <DayCard
              key={day.index}
              day={day}
              destination={trip.destination}
              badgeClasses={badgeClasses(day.type)}
              onUpdateActivity={updateActivity}
              onAddActivity={addActivity}
              onRemoveActivity={removeActivity}
            />
          ))
        )}
      </div>
    </Card>
  );
}

function Stat({
  value,
  label,
  valueClass,
}: {
  value: string;
  label: string;
  valueClass: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-ink/55 p-3 sm:p-4">
      <strong className={`block text-2xl font-semibold ${valueClass}`}>{value}</strong>
      <span className="text-xs text-mist sm:text-sm">{label}</span>
    </div>
  );
}
