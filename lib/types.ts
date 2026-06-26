export type DayType = "business" | "leisure" | "open";

export interface TripDay {
  index: number;
  date: string;
  label: string;
  type: DayType;
  activities: string[];
}

export interface TripFormData {
  destination: string;
  traveler: string;
  startDate: string;
  endDate: string;
  businessDays: number;
  leisureDays: number;
  notes: string;
}

export interface CostInputs {
  flight: number;
  nightly: number;
  businessDaily: number;
  leisureDaily: number;
  transportDaily: number;
}

export interface CostEstimate {
  nights: number;
  flight: number;
  lodgingConventional: number;
  lodgingSolar: number;
  meals: number;
  transport: number;
  energyCredit: number;
  carbonAvoidedKg: number;
  conventionalTotal: number;
  solarTotal: number;
  savings: number;
  avgSolarCoverage: number;
}

export interface SolarHotel {
  name: string;
  nightlyRate: number;
  solarCoverage: number;
  rating: number;
  highlight: string;
}

export interface GeocodeResult {
  lat: number;
  lon: number;
  displayName: string;
}

export interface SavedTrip {
  id: string;
  name: string;
  savedAt: string;
  trip: TripFormData;
  days: TripDay[];
  costs: CostInputs;
  hotels: SolarHotel[];
  costEstimate: CostEstimate | null;
}

export interface TripValidationResult {
  start: Date;
  end: Date;
  total: number;
}
