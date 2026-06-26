"use client";

import { inputClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatMoney } from "@/lib/format";
import { useTripStore } from "@/store/trip-store";

export function CostEstimator() {
  const costs = useTripStore((state) => state.costs);
  const costEstimate = useTripStore((state) => state.costEstimate);
  const setCostField = useTripStore((state) => state.setCostField);

  return (
    <Card
      title="Travel cost estimator"
      description="Estimate trip spend and compare conventional lodging with solar-powered stays."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(
          [
            ["flight", "Round-trip flights ($)"],
            ["nightly", "Solar hotel nightly rate ($)"],
            ["businessDaily", "Business day spend ($)"],
            ["leisureDaily", "Leisure day spend ($)"],
            ["transportDaily", "Local transport per day ($)"],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className={key === "transportDaily" ? "sm:col-span-2" : ""}>
            <label className="mb-1.5 block text-sm text-mist">{label}</label>
            <input
              type="number"
              min={0}
              value={costs[key]}
              onChange={(event) => setCostField(key, Number(event.target.value))}
              className={inputClassName()}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
        <div className="rounded-xl border border-line bg-ink/55 p-3">
          <strong className="block text-xl font-semibold text-slate-200">
            {formatMoney(costEstimate?.conventionalTotal ?? 0)}
          </strong>
          <span className="text-xs text-mist">Conventional total</span>
        </div>
        <div className="rounded-xl border border-solar/30 bg-solar/10 p-3">
          <strong className="block text-xl font-semibold text-amber-200">
            {formatMoney(costEstimate?.solarTotal ?? 0)}
          </strong>
          <span className="text-xs text-mist">Solar stay total</span>
        </div>
        <div className="rounded-xl border border-fun/30 bg-emerald-400/10 p-3">
          <strong className="block text-xl font-semibold text-emerald-300">
            {formatMoney(costEstimate?.savings ?? 0)}
          </strong>
          <span className="text-xs text-mist">Estimated savings</span>
        </div>
      </div>

      {costEstimate ? (
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          <li>
            Lodging: {formatMoney(costEstimate.lodgingConventional)} conventional vs{" "}
            {formatMoney(costEstimate.lodgingSolar)} solar
          </li>
          <li>Meals &amp; activities: {formatMoney(costEstimate.meals)}</li>
          <li>
            Flights + local transport:{" "}
            {formatMoney(costEstimate.flight + costEstimate.transport)}
          </li>
          <li>
            Solar energy credit: -{formatMoney(costEstimate.energyCredit)} (
            {Math.round(costEstimate.avgSolarCoverage)}% avg solar coverage)
          </li>
          <li>
            Estimated carbon avoided: {costEstimate.carbonAvoidedKg} kg CO₂ by choosing solar
            stays
          </li>
        </ul>
      ) : null}
    </Card>
  );
}
