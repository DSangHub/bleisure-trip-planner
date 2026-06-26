"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { StoreHydrationGate, savedPageFallback } from "@/components/StoreHydrationGate";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatMoney } from "@/lib/format";
import { useTripStore } from "@/store/trip-store";

function SavedTripsContent() {
  const router = useRouter();
  const savedTrips = useTripStore((state) => state.savedTrips);
  const loadSavedTrip = useTripStore((state) => state.loadSavedTrip);
  const deleteSavedTrip = useTripStore((state) => state.deleteSavedTrip);
  const statusMessage = useTripStore((state) => state.statusMessage);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Saved trips</h1>
        <p className="mt-2 max-w-2xl text-sm text-mist sm:text-base">
          Reopen a saved bleisure plan or remove trips you no longer need. Plans are stored in this
          browser and persist across sessions.
        </p>
      </header>

      {statusMessage ? (
        <div
          role="status"
          className="rounded-xl border border-line bg-panel2/70 px-3 py-2 text-sm text-mist"
        >
          {statusMessage}
        </div>
      ) : null}

      {!savedTrips.length ? (
        <Card title="No saved trips yet">
          <p className="text-sm text-mist">
            Generate an itinerary in the planner and click Save plan to store it here.
          </p>
          <div className="mt-4">
            <Link href="/planner">
              <Button variant="primary">Go to planner</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {savedTrips.map((saved) => (
            <article
              key={saved.id}
              className="rounded-2xl border border-line bg-panel/95 p-4 shadow-glow sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{saved.name}</h2>
                  <p className="mt-1 text-sm text-mist">
                    {saved.trip.traveler || "Guest"} · {saved.days.length} day(s) · Saved{" "}
                    {new Date(saved.savedAt).toLocaleString()}
                  </p>
                  {saved.costEstimate ? (
                    <p className="mt-2 text-sm text-emerald-300">
                      Solar savings: {formatMoney(saved.costEstimate.savings)}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    onClick={() => {
                      loadSavedTrip(saved.id);
                      router.push("/planner");
                    }}
                  >
                    Load in planner
                  </Button>
                  <Button variant="danger" onClick={() => deleteSavedTrip(saved.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export function SavedTripsClient() {
  return (
    <StoreHydrationGate fallback={savedPageFallback}>
      <SavedTripsContent />
    </StoreHydrationGate>
  );
}
