"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-6">
      <h2 className="text-xl font-semibold text-red-200">Something went wrong</h2>
      <p className="mt-2 text-sm text-mist">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <div className="mt-4">
        <Button variant="danger" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
