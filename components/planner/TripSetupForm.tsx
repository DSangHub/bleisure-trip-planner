"use client";

import { Button, inputClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { exportItineraryPdf } from "@/lib/pdf";
import { normalizeTripForm, validateTrip } from "@/lib/trip";
import { useToastStore } from "@/store/toast-store";
import { useTripStore } from "@/store/trip-store";

export function TripSetupForm() {
  const trip = useTripStore((state) => state.trip);
  const days = useTripStore((state) => state.days);
  const hotels = useTripStore((state) => state.hotels);
  const costEstimate = useTripStore((state) => state.costEstimate);
  const tip = useTripStore((state) => state.tip);
  const statusMessage = useTripStore((state) => state.statusMessage);
  const isGenerating = useTripStore((state) => state.isGenerating);
  const setTripField = useTripStore((state) => state.setTripField);
  const generateItinerary = useTripStore((state) => state.generateItinerary);
  const saveCurrentTrip = useTripStore((state) => state.saveCurrentTrip);
  const resetPlanner = useTripStore((state) => state.resetPlanner);
  const showToast = useToastStore((state) => state.showToast);

  const handleGenerate = async () => {
    await generateItinerary();
  };

  const handleSave = () => {
    saveCurrentTrip();
  };

  const handleExport = () => {
    if (!days.length) {
      const message = "Generate an itinerary before exporting to PDF.";
      useTripStore.getState().setStatusMessage(message);
      showToast(message, "error");
      return;
    }

    try {
      const normalizedTrip = normalizeTripForm(trip);
      const { total } = validateTrip(normalizedTrip);
      exportItineraryPdf({ trip: normalizedTrip, total, days, hotels, costEstimate });
      const message = "Itinerary exported as PDF.";
      useTripStore.getState().setStatusMessage(message);
      showToast(message, "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not export PDF.";
      useTripStore.getState().setStatusMessage(message);
      showToast(message, "error");
    }
  };

  return (
    <Card title="Trip setup">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void handleGenerate();
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="destination" className="mb-1.5 block text-sm text-mist">
              Destination
            </label>
            <input
              id="destination"
              value={trip.destination}
              onChange={(event) => setTripField("destination", event.target.value)}
              placeholder="Lisbon, Portugal"
              required
              className={inputClassName()}
            />
          </div>
          <div>
            <label htmlFor="traveler" className="mb-1.5 block text-sm text-mist">
              Traveler name
            </label>
            <input
              id="traveler"
              value={trip.traveler}
              onChange={(event) => setTripField("traveler", event.target.value)}
              placeholder="Alex Rivera"
              className={inputClassName()}
            />
          </div>
          <div>
            <label htmlFor="start-date" className="mb-1.5 block text-sm text-mist">
              Start date
            </label>
            <input
              id="start-date"
              type="date"
              value={trip.startDate}
              onChange={(event) => setTripField("startDate", event.target.value)}
              required
              suppressHydrationWarning
              className={inputClassName()}
            />
          </div>
          <div>
            <label htmlFor="end-date" className="mb-1.5 block text-sm text-mist">
              End date
            </label>
            <input
              id="end-date"
              type="date"
              value={trip.endDate}
              onChange={(event) => setTripField("endDate", event.target.value)}
              required
              suppressHydrationWarning
              className={inputClassName()}
            />
          </div>
          <div>
            <label htmlFor="business-days" className="mb-1.5 block text-sm text-mist">
              Business days
            </label>
            <input
              id="business-days"
              type="number"
              min={0}
              value={trip.businessDays}
              onChange={(event) =>
                setTripField("businessDays", Math.max(0, Number(event.target.value) || 0))
              }
              className={inputClassName()}
            />
          </div>
          <div>
            <label htmlFor="leisure-days" className="mb-1.5 block text-sm text-mist">
              Leisure days
            </label>
            <input
              id="leisure-days"
              type="number"
              min={0}
              value={trip.leisureDays}
              onChange={(event) =>
                setTripField("leisureDays", Math.max(0, Number(event.target.value) || 0))
              }
              className={inputClassName()}
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="mb-1.5 block text-sm text-mist">
            Trip notes
          </label>
          <textarea
            id="notes"
            value={trip.notes}
            onChange={(event) => setTripField("notes", event.target.value)}
            placeholder="Client dinner on Tuesday, team offsite Wednesday morning..."
            className={`${inputClassName()} min-h-24 resize-y`}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button type="submit" variant="primary" disabled={isGenerating} className="sm:min-w-[10rem]">
            {isGenerating ? "Generating..." : "Generate itinerary"}
          </Button>
          <Button type="button" onClick={handleSave}>
            Save plan
          </Button>
          <Button type="button" variant="solar" onClick={handleExport}>
            Export PDF
          </Button>
          <Button type="button" variant="danger" onClick={resetPlanner}>
            Reset
          </Button>
        </div>
      </form>

      <div className="mt-4 space-y-2">
        <div className="rounded-xl border border-sky/20 bg-sky/10 px-3 py-2.5 text-sm text-slate-300">
          {tip}
        </div>
        {statusMessage ? (
          <div
            role="status"
            className="rounded-xl border border-sky/25 bg-sky/10 px-3 py-2 text-sm text-slate-200"
          >
            {statusMessage}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
