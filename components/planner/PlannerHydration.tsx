"use client";

import { useEffect } from "react";
import { useTripStore } from "@/store/trip-store";

export function PlannerHydration({ children }: { children: React.ReactNode }) {
  const days = useTripStore((state) => state.days);
  const generateItinerary = useTripStore((state) => state.generateItinerary);

  useEffect(() => {
    if (!days.length) {
      void generateItinerary();
    }
  }, [days.length, generateItinerary]);

  return <>{children}</>;
}
