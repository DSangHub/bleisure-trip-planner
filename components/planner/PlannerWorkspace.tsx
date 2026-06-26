"use client";

import dynamic from "next/dynamic";
import { TripSetupForm } from "@/components/planner/TripSetupForm";
import { ItineraryOverview } from "@/components/planner/ItineraryOverview";
import { CostEstimator } from "@/components/planner/CostEstimator";
import { SolarHotels } from "@/components/planner/SolarHotels";
import { PlannerHydration } from "@/components/planner/PlannerHydration";
import { StoreHydrationGate } from "@/components/StoreHydrationGate";
import { Card } from "@/components/ui/Card";

const DestinationMap = dynamic(
  () => import("@/components/planner/DestinationMap").then((mod) => mod.DestinationMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-56 items-center justify-center rounded-xl border border-line bg-panel2 text-sm text-mist sm:h-72 lg:h-80">
        Loading map...
      </div>
    ),
  },
);

export function PlannerWorkspace() {
  return (
    <StoreHydrationGate>
      <PlannerHydration>
      <header className="mb-6 sm:mb-8">
        <div className="inline-flex items-center rounded-full border border-sky/25 bg-sky/10 px-3 py-1 text-xs font-medium text-sky sm:text-sm">
          Business + Leisure
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Plan your bleisure trip
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
          Balance meetings and downtime in one itinerary. Compare solar-powered stays, estimate
          travel costs with energy savings, preview your destination on the map, and export a PDF
          when you are ready.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5 xl:gap-6">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <TripSetupForm />
          <Card title="Destination map">
            <DestinationMap />
          </Card>
        </div>
        <ItineraryOverview className="lg:col-span-7" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5 xl:mt-6">
        <CostEstimator />
        <SolarHotels />
      </div>
      </PlannerHydration>
    </StoreHydrationGate>
  );
}
