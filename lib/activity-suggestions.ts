import { destinationKey } from "./format";
import type { ActivityCategory, ActivityVendor, SuggestionCategory } from "./types";
import { getVendorsByCategory } from "./activity-vendors";

export interface SuggestionChip {
  id: SuggestionCategory;
  label: string;
}

export const SUGGESTION_CHIPS: SuggestionChip[] = [
  { id: "biking", label: "Biking" },
  { id: "hiking", label: "Hiking" },
  { id: "city-tours", label: "City tours" },
  { id: "museums", label: "Museums" },
  { id: "parks", label: "Parks" },
  { id: "nightlife", label: "Nightlife" },
  { id: "spa", label: "Massage & spa" },
];

const SUGGESTION_TO_VENDOR_CATEGORY: Record<SuggestionCategory, ActivityCategory> = {
  biking: "biking",
  hiking: "hiking",
  "city-tours": "walking",
  museums: "museum",
  parks: "parks",
  nightlife: "nightlife",
  spa: "spa",
};

const DEFAULT_ACTIVITY_LABELS: Record<SuggestionCategory, string> = {
  biking: "Scenic bike ride",
  hiking: "Guided nature hike",
  "city-tours": "City walking tour",
  museums: "Museum visit",
  parks: "Park and viewpoint visit",
  nightlife: "Evening out",
  spa: "Massage and spa session",
};

const DESTINATION_ACTIVITY_LABELS: Record<string, Partial<Record<SuggestionCategory, string>>> = {
  denver: {
    biking: "Scenic biking along Cherry Creek",
    hiking: "Guided hike in the Rockies",
    "city-tours": "Downtown Denver walking tour",
    museums: "Denver Art Museum visit",
    parks: "Red Rocks Park & amphitheatre",
    nightlife: "RiNo rooftop bar evening",
    spa: "Mile High wellness & massage",
  },
  lisbon: {
    biking: "Tagus river e-bike ride",
    hiking: "Sintra hills hiking day",
    "city-tours": "Alfama & Baixa walking tour",
    museums: "MAAT museum afternoon",
    parks: "Eduardo VII park & viewpoints",
    nightlife: "Bairro Alto fado evening",
    spa: "Alfama thermal spa session",
  },
};

export function getSuggestionActivityLabel(
  destination: string,
  category: SuggestionCategory,
  vendor?: ActivityVendor,
): string {
  if (vendor) {
    return vendor.name;
  }

  const destLabels = DESTINATION_ACTIVITY_LABELS[destinationKey(destination)];

  return destLabels?.[category] ?? DEFAULT_ACTIVITY_LABELS[category];
}

export function getSuggestionsForCategory(
  destination: string,
  category: SuggestionCategory,
  limit = 3,
): ActivityVendor[] {
  const vendorCategory = SUGGESTION_TO_VENDOR_CATEGORY[category];

  if (category === "hiking") {
    return getVendorsByCategory(destination, "hiking", 10)
      .filter((vendor) => vendor.kind !== "gear-rental")
      .slice(0, limit);
  }

  return getVendorsByCategory(destination, vendorCategory, limit);
}

export function getSuggestionCategoryLabel(category: SuggestionCategory): string {
  return SUGGESTION_CHIPS.find((chip) => chip.id === category)?.label ?? category;
}
