import type { TravelPlatform } from "./travel-platforms";

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
  id: string;
  name: string;
  propertyType: string;
  nightlyRate: number;
  solarCoverage: number;
  rating: number;
  reviewCount: number;
  highlight: string;
  platform: TravelPlatform;
  bookUrl: string;
  ecoFriendly: boolean;
}

export interface GeocodeResult {
  lat: number;
  lon: number;
  displayName: string;
}

export type ActivityCategory =
  | "biking"
  | "hiking"
  | "walking"
  | "food"
  | "museum"
  | "coffee"
  | "business"
  | "explore"
  | "parks"
  | "nightlife"
  | "spa"
  | "default";

export type SuggestionCategory =
  | "biking"
  | "hiking"
  | "city-tours"
  | "museums"
  | "parks"
  | "nightlife"
  | "spa";

export type HikingVendorKind = "guided-tour" | "gear-rental" | "general";

export interface ActivityVendor {
  id: string;
  name: string;
  description: string;
  priceEstimate: string;
  bookUrl: string;
  ecoFriendly: boolean;
  platform: TravelPlatform;
  rating: number;
  reviewCount: number;
  kind?: HikingVendorKind;
}

export interface HikingVendorGroups {
  guidedTours: ActivityVendor[];
  gearRentals: ActivityVendor[];
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
