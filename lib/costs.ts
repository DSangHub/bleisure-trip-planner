import {
  CO2_KG_PER_NIGHT,
  CONVENTIONAL_PREMIUM,
  SOLAR_ENERGY_DISCOUNT,
} from "./constants";
import type { CostEstimate, CostInputs, SolarHotel, TripFormData } from "./types";

export function estimateCosts(
  data: TripFormData,
  total: number,
  costs: CostInputs,
  hotels: SolarHotel[],
): CostEstimate {
  const nights = Math.max(total - 1, 1);
  const openDays = Math.max(total - data.businessDays - data.leisureDays, 0);

  const conventionalNightly = costs.nightly * (1 + CONVENTIONAL_PREMIUM);
  const lodgingConventional = conventionalNightly * nights;
  const lodgingSolar = costs.nightly * nights;
  const meals =
    data.businessDays * costs.businessDaily +
    data.leisureDays * costs.leisureDaily +
    openDays * ((costs.businessDaily + costs.leisureDaily) / 2);
  const transport = costs.transportDaily * total;
  const avgSolarCoverage = hotels.length
    ? hotels.reduce((sum, hotel) => sum + hotel.solarCoverage, 0) / hotels.length
    : 80;
  const energyCredit =
    lodgingSolar * SOLAR_ENERGY_DISCOUNT * (avgSolarCoverage / 100);
  const carbonAvoidedKg = Math.round(
    nights * CO2_KG_PER_NIGHT * (avgSolarCoverage / 100),
  );

  const conventionalTotal =
    costs.flight + lodgingConventional + meals + transport;
  const solarTotal = Math.max(
    costs.flight + lodgingSolar + meals + transport - energyCredit,
    0,
  );
  const savings = Math.max(conventionalTotal - solarTotal, 0);

  return {
    nights,
    flight: costs.flight,
    lodgingConventional,
    lodgingSolar,
    meals,
    transport,
    energyCredit,
    carbonAvoidedKg,
    conventionalTotal,
    solarTotal,
    savings,
    avgSolarCoverage,
  };
}
