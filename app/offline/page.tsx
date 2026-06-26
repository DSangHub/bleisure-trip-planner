import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Offline",
  description: "Offline fallback for Bleisure Trip Planner",
};

export default function OfflinePage() {
  return (
    <Card title="You are offline">
      <p className="text-sm leading-relaxed text-mist">
        Cached itineraries and saved trips are still available. Reconnect to refresh maps, solar
        hotel suggestions, and geocoding results.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
        <li>View and edit your current itinerary offline</li>
        <li>Open saved trips from local storage</li>
        <li>Export PDFs from cached trip data</li>
      </ul>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link href="/planner/">
          <Button variant="primary">Open planner</Button>
        </Link>
        <Link href="/saved/">
          <Button>View saved trips</Button>
        </Link>
      </div>
    </Card>
  );
}
