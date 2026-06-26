import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_COST_INPUTS } from "@/lib/constants";
import { estimateCosts } from "@/lib/costs";
import { createTripId, defaultTripDates } from "@/lib/format";
import { geocodeDestinationClient } from "@/lib/geocode-client";
import {
  averageHotelRate,
  buildDayPlan,
  getSolarHotels,
  getTripTip,
  validateTrip,
} from "@/lib/trip";
import type {
  CostEstimate,
  CostInputs,
  GeocodeResult,
  SavedTrip,
  SolarHotel,
  TripDay,
  TripFormData,
} from "@/lib/types";

interface TripState {
  trip: TripFormData;
  days: TripDay[];
  hotels: SolarHotel[];
  costs: CostInputs;
  costEstimate: CostEstimate | null;
  savedTrips: SavedTrip[];
  tip: string;
  mapStatus: string;
  geocode: GeocodeResult | null;
  isGenerating: boolean;
  statusMessage: string;
  setTripField: <K extends keyof TripFormData>(key: K, value: TripFormData[K]) => void;
  setCostField: <K extends keyof CostInputs>(key: K, value: CostInputs[K]) => void;
  setMapStatus: (status: string) => void;
  setGeocode: (geocode: GeocodeResult | null) => void;
  setStatusMessage: (message: string) => void;
  updateActivity: (dayIndex: number, activityIndex: number, value: string) => void;
  addActivity: (dayIndex: number) => void;
  removeActivity: (dayIndex: number, activityIndex: number) => void;
  generateItinerary: () => Promise<void>;
  saveCurrentTrip: () => void;
  loadSavedTrip: (id: string) => void;
  deleteSavedTrip: (id: string) => void;
  resetPlanner: () => void;
}

const { startDate, endDate } = defaultTripDates();

const defaultTrip: TripFormData = {
  destination: "Lisbon, Portugal",
  traveler: "Alex Rivera",
  startDate,
  endDate,
  businessDays: 3,
  leisureDays: 2,
  notes: "",
};

function recomputeCosts(
  trip: TripFormData,
  days: TripDay[],
  costs: CostInputs,
  hotels: SolarHotel[],
): { costEstimate: CostEstimate | null; tip: string } {
  if (!days.length) {
    return {
      costEstimate: null,
      tip: "Tip: Keep at least one leisure day after heavy meeting blocks to recover and explore.",
    };
  }

  try {
    const { total } = validateTrip(trip);
    return {
      costEstimate: estimateCosts(trip, total, costs, hotels),
      tip: getTripTip(total, trip.businessDays, trip.leisureDays),
    };
  } catch {
    return { costEstimate: null, tip: "Set your trip details and generate an itinerary." };
  }
}

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      trip: defaultTrip,
      days: [],
      hotels: [],
      costs: DEFAULT_COST_INPUTS,
      costEstimate: null,
      savedTrips: [],
      tip: "Tip: Keep at least one leisure day after heavy meeting blocks to recover and explore.",
      mapStatus: "Enter a destination to preview it on the map.",
      geocode: null,
      isGenerating: false,
      statusMessage: "",

      setTripField: (key, value) => set((state) => ({ trip: { ...state.trip, [key]: value } })),

      setCostField: (key, value) =>
        set((state) => {
          const costs = { ...state.costs, [key]: value };
          const { costEstimate } = recomputeCosts(state.trip, state.days, costs, state.hotels);
          return { costs, costEstimate };
        }),

      setMapStatus: (mapStatus) => set({ mapStatus }),
      setGeocode: (geocode) => set({ geocode }),
      setStatusMessage: (statusMessage) => set({ statusMessage }),

      updateActivity: (dayIndex, activityIndex, value) =>
        set((state) => {
          const days = state.days.map((day) => {
            if (day.index !== dayIndex) return day;
            const activities = [...day.activities];
            activities[activityIndex] = value;
            return { ...day, activities };
          });
          return { days };
        }),

      addActivity: (dayIndex) =>
        set((state) => ({
          days: state.days.map((day) =>
            day.index === dayIndex
              ? { ...day, activities: [...day.activities, "New activity"] }
              : day,
          ),
        })),

      removeActivity: (dayIndex, activityIndex) =>
        set((state) => ({
          days: state.days.map((day) => {
            if (day.index !== dayIndex) return day;
            const activities = day.activities.filter((_, index) => index !== activityIndex);
            return { ...day, activities: activities.length ? activities : [""] };
          }),
        })),

      generateItinerary: async () => {
        const state = get();
        set({ isGenerating: true, statusMessage: "" });

        try {
          const { start, total } = validateTrip(state.trip);
          const days = buildDayPlan(
            start,
            total,
            state.trip.businessDays,
            state.trip.leisureDays,
          );
          const hotels = getSolarHotels(state.trip.destination);
          const costs = {
            ...state.costs,
            nightly: averageHotelRate(hotels),
          };
          const { costEstimate, tip } = recomputeCosts(state.trip, days, costs, hotels);

          set({
            days,
            hotels,
            costs,
            costEstimate,
            tip,
            mapStatus: `Locating ${state.trip.destination}...`,
          });

          const geocode = await geocodeDestinationClient(state.trip.destination);
          if (!geocode) {
            set({
              geocode: null,
              mapStatus: `No map match found for "${state.trip.destination}". Try a city and country.`,
            });
          } else {
            set({
              geocode,
              mapStatus: `Showing ${state.trip.destination} on the map.`,
            });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Could not generate itinerary.";
          set({
            statusMessage: message,
            mapStatus: message,
          });
        } finally {
          set({ isGenerating: false });
        }
      },

      saveCurrentTrip: () => {
        const state = get();
        if (!state.days.length) {
          set({ statusMessage: "Generate an itinerary before saving." });
          return;
        }

        try {
          validateTrip(state.trip);
          const savedTrip: SavedTrip = {
            id: createTripId(),
            name: `${state.trip.destination} (${state.trip.startDate})`,
            savedAt: new Date().toISOString(),
            trip: state.trip,
            days: state.days,
            costs: state.costs,
            hotels: state.hotels,
            costEstimate: state.costEstimate,
          };

          set({
            savedTrips: [savedTrip, ...state.savedTrips],
            statusMessage: "Trip saved to your collection.",
          });
        } catch (error) {
          set({
            statusMessage: error instanceof Error ? error.message : "Could not save trip.",
          });
        }
      },

      loadSavedTrip: (id) => {
        const saved = get().savedTrips.find((trip) => trip.id === id);
        if (!saved) return;

        const { costEstimate, tip } = recomputeCosts(
          saved.trip,
          saved.days,
          saved.costs,
          saved.hotels,
        );

        set({
          trip: saved.trip,
          days: saved.days,
          costs: saved.costs,
          hotels: saved.hotels,
          costEstimate: saved.costEstimate ?? costEstimate,
          tip,
          statusMessage: `Loaded ${saved.name}.`,
          mapStatus: `Showing ${saved.trip.destination} on the map.`,
        });
      },

      deleteSavedTrip: (id) =>
        set((state) => ({
          savedTrips: state.savedTrips.filter((trip) => trip.id !== id),
          statusMessage: "Saved trip removed.",
        })),

      resetPlanner: () => {
        const dates = defaultTripDates();
        set({
          trip: { ...defaultTrip, ...dates },
          days: [],
          hotels: [],
          costs: DEFAULT_COST_INPUTS,
          costEstimate: null,
          tip: "Planner reset. Start a fresh bleisure itinerary.",
          mapStatus: "Enter a destination to preview it on the map.",
          geocode: null,
          statusMessage: "",
        });
      },
    }),
    {
      name: "bleisure-trip-planner-next",
      partialize: (state) => ({
        trip: state.trip,
        days: state.days,
        hotels: state.hotels,
        costs: state.costs,
        costEstimate: state.costEstimate,
        savedTrips: state.savedTrips,
      }),
    },
  ),
);

export function getTripTotals() {
  const { trip, days } = useTripStore.getState();
  if (!days.length) {
    return { total: 0, businessDays: trip.businessDays, leisureDays: trip.leisureDays };
  }
  const { total } = validateTrip(trip);
  return { total, businessDays: trip.businessDays, leisureDays: trip.leisureDays };
}
