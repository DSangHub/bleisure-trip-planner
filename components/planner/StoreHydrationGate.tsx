"use client";

import { useEffect, useState } from "react";
import { useTripStore } from "@/store/trip-store";

export function StoreHydrationGate({ children }: { children: React.ReactNode }) {
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
    return (
      <div className="space-y-4">
        <div className="h-28 animate-pulse rounded-2xl bg-panel/80" />
        <div className="h-[32rem] animate-pulse rounded-2xl bg-panel/80" />
      </div>
    );
  }

  return <>{children}</>;
}
