"use client";

import { useEffect, useRef } from "react";
import { useTripStore } from "@/store/trip-store";

export function PlannerHydration({ children }: { children: React.ReactNode }) {
  const days = useTripStore((state) => state.days);
  const isGenerating = useTripStore((state) => state.isGenerating);
  const generateItinerary = useTripStore((state) => state.generateItinerary);
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (bootstrapped.current || days.length || isGenerating) {
      return;
    }

    bootstrapped.current = true;
    void generateItinerary();
  }, [days.length, isGenerating, generateItinerary]);

  return <>{children}</>;
}
