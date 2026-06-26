import type { Metadata } from "next";
import { PlannerWorkspace } from "@/components/planner/PlannerWorkspace";

export const metadata: Metadata = {
  title: "Planner",
  description: "Generate bleisure itineraries with maps, solar hotels, and cost estimates.",
};

export default function PlannerPage() {
  return <PlannerWorkspace />;
}
