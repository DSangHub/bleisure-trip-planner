import {
  BUSINESS_SUGGESTIONS,
  DESTINATION_LEISURE_SUGGESTIONS,
  LEISURE_SUGGESTIONS,
} from "./constants";
import { getLodgingListings } from "./lodging-listings";
import {
  getDestinationValidationError,
  normalizeDestination,
} from "./destinations";
import { defaultTripDates, destinationKey, formatDateLabel, toLocalDateString } from "./format";
import type {
  SolarHotel,
  TripDay,
  TripFormData,
  TripValidationResult,
} from "./types";

export function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function dayCount(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;
}

export function validateTrip(data: TripFormData): TripValidationResult {
  const destinationError = getDestinationValidationError(data.destination);
  if (destinationError) {
    throw new Error(destinationError);
  }
  if (!data.startDate || !data.endDate) {
    throw new Error("Start and end dates are required.");
  }

  const start = parseDate(data.startDate);
  const end = parseDate(data.endDate);
  if (end < start) {
    throw new Error("End date must be on or after the start date.");
  }

  const total = dayCount(start, end);
  if (data.businessDays + data.leisureDays > total) {
    throw new Error("Business and leisure days cannot exceed total trip length.");
  }

  return { start, end, total };
}

export function normalizeTripForm(trip: TripFormData): TripFormData {
  const defaults = defaultTripDates();
  const normalized: TripFormData = {
    destination: normalizeDestination(trip.destination),
    traveler: trip.traveler.trim(),
    startDate: trip.startDate || defaults.startDate,
    endDate: trip.endDate || defaults.endDate,
    businessDays: Math.max(0, Number(trip.businessDays) || 0),
    leisureDays: Math.max(0, Number(trip.leisureDays) || 0),
    notes: trip.notes.trim(),
  };

  try {
    const { total } = validateTrip(normalized);
    if (normalized.businessDays + normalized.leisureDays > total) {
      normalized.businessDays = Math.min(normalized.businessDays, total);
      normalized.leisureDays = Math.min(
        normalized.leisureDays,
        Math.max(total - normalized.businessDays, 0),
      );
    }
    return normalized;
  } catch {
    return {
      ...normalized,
      ...defaults,
      businessDays: 3,
      leisureDays: 2,
    };
  }
}

export function buildDayPlan(
  start: Date,
  total: number,
  businessDays: number,
  leisureDays: number,
  destination = "",
): TripDay[] {
  const days: TripDay[] = [];
  const businessSlots = Array.from({ length: businessDays }, (_, index) => index);
  const leisureSlots = Array.from(
    { length: leisureDays },
    (_, index) => total - leisureDays + index,
  );

  for (let index = 0; index < total; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);

    let type: TripDay["type"] = "open";
    if (businessSlots.includes(index)) {
      type = "business";
    } else if (leisureSlots.includes(index)) {
      type = "leisure";
    }

    const leisureSuggestions =
      DESTINATION_LEISURE_SUGGESTIONS[destinationKey(destination)] ?? LEISURE_SUGGESTIONS;

    let suggestionPool: string[];
    let suggestionIndex: number;

    if (type === "business") {
      suggestionPool = BUSINESS_SUGGESTIONS;
      suggestionIndex = businessSlots.indexOf(index);
    } else if (type === "leisure") {
      suggestionPool = leisureSuggestions;
      suggestionIndex = leisureSlots.indexOf(index);
    } else {
      suggestionPool = ["Travel day", "Buffer / admin", "Explore at your pace"];
      suggestionIndex = index;
    }

    const activity =
      suggestionPool[
        (suggestionIndex >= 0 ? suggestionIndex : index) % suggestionPool.length
      ];

    days.push({
      index,
      date: toLocalDateString(date),
      label: formatDateLabel(date),
      type,
      activities: [activity],
    });
  }

  return days;
}

export function getSolarHotels(destination: string): SolarHotel[] {
  return getLodgingListings(destination);
}

export function averageHotelRate(hotels: SolarHotel[]): number {
  if (!hotels.length) return 160;
  return Math.round(
    hotels.reduce((sum, hotel) => sum + hotel.nightlyRate, 0) / hotels.length,
  );
}

export function getTripTip(
  total: number,
  businessDays: number,
  leisureDays: number,
): string {
  const openDays = total - businessDays - leisureDays;
  if (openDays > 0) {
    return `You have ${openDays} flexible day(s). Use them for travel buffers or spontaneous plans.`;
  }
  if (businessDays > leisureDays) {
    return "Meeting-heavy trip detected. Consider adding a recovery block on your last day.";
  }
  return "Balanced bleisure split. Block focus time in the mornings and keep evenings open.";
}
