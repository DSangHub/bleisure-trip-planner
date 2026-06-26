"use client";

import { useEffect, useState } from "react";
import { useTripStore } from "@/store/trip-store";

interface StoreHydrationGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const defaultFallback = (
  <div className="space-y-4">
    <div className="h-28 animate-pulse rounded-2xl bg-panel/80" />
    <div className="h-[32rem] animate-pulse rounded-2xl bg-panel/80" />
  </div>
);

const savedFallback = (
  <div className="space-y-4">
    <div className="h-10 w-48 animate-pulse rounded-xl bg-panel/80" />
    <div className="h-32 animate-pulse rounded-2xl bg-panel/80" />
  </div>
);

export function StoreHydrationGate({
  children,
  fallback = defaultFallback,
}: StoreHydrationGateProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const finish = () => setReady(true);

    if (useTripStore.persist.hasHydrated()) {
      finish();
      return;
    }

    const unsub = useTripStore.persist.onFinishHydration(finish);
    return unsub;
  }, []);

  if (!ready) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export { savedFallback as savedPageFallback };
