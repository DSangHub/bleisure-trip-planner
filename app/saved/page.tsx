import type { Metadata } from "next";
import { SavedTripsClient } from "@/components/saved/SavedTripsClient";

export const metadata: Metadata = {
  title: "Saved trips",
  description: "View and reopen saved bleisure trip plans.",
};

export default function SavedTripsPage() {
  return <SavedTripsClient />;
}
