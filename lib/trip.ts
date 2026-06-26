import {
  BUSINESS_SUGGESTIONS,
  LEISURE_SUGGESTIONS,
  SOLAR_HOTELS,
} from "./constants";
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
  if (!data.destination.trim()) {
    throw new Error("Destination is required.");
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
    destination: trip.destination.trim(),
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

    const suggestions =
      type === "business"
        ? BUSINESS_SUGGESTIONS
        : type === "leisure"
          ? LEISURE_SUGGESTIONS
          : ["Travel day", "Buffer / admin", "Explore at your pace"];

    days.push({
      index,
      date: toLocalDateString(date),
      label: formatDateLabel(date),
      type,
      activities: [suggestions[index % suggestions.length]],
    });
  }

  return days;
}

export function getSolarHotels(destination: string): SolarHotel[] {
  return SOLAR_HOTELS[destinationKey(destination)] ?? SOLAR_HOTELS.default;
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
