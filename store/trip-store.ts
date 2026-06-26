import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useToastStore } from "@/store/toast-store";
import { DEFAULT_COST_INPUTS } from "@/lib/constants";
import { estimateCosts } from "@/lib/costs";
import { createTripId, defaultTripDates } from "@/lib/format";
import { geocodeDestinationClient } from "@/lib/geocode-client";
import {
  averageHotelRate,
  buildDayPlan,
  getSolarHotels,
  getTripTip,
  normalizeTripForm,
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
  saveCurrentTrip: () => boolean;
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
          const trip = normalizeTripForm(state.trip);
          const { start, total } = validateTrip(trip);
          const days = buildDayPlan(
            start,
            total,
            trip.businessDays,
            trip.leisureDays,
          );
          const hotels = getSolarHotels(trip.destination);
          const costs = {
            ...state.costs,
            nightly: averageHotelRate(hotels),
          };
          const { costEstimate, tip } = recomputeCosts(trip, days, costs, hotels);

          set({
            trip,
            days,
            hotels,
            costs,
            costEstimate,
            tip,
            statusMessage: `Itinerary generated for ${trip.destination}.`,
          });
          useToastStore
            .getState()
            .showToast(`Itinerary ready for ${trip.destination}.`, "success");

          set({ mapStatus: `Locating ${trip.destination}...` });
          const geocode = await geocodeDestinationClient(trip.destination);
          if (!geocode) {
            set({
              geocode: null,
              mapStatus: `No map match found for "${trip.destination}". Itinerary was still generated.`,
            });
          } else {
            set({
              geocode,
              mapStatus: `Showing ${trip.destination} on the map.`,
            });
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Could not generate itinerary.";
          set({
            statusMessage: message,
          });
          useToastStore.getState().showToast(message, "error");
        } finally {
          set({ isGenerating: false });
        }
      },

      saveCurrentTrip: () => {
        const state = get();
        const showToast = useToastStore.getState().showToast;

        if (!state.days.length) {
          const message = "Generate an itinerary before saving.";
          set({ statusMessage: message });
          showToast(message, "error");
          return false;
        }

        try {
          const trip = normalizeTripForm(state.trip);
          validateTrip(trip);
          const savedTrip: SavedTrip = {
            id: createTripId(),
            name: `${trip.destination} (${trip.startDate})`,
            savedAt: new Date().toISOString(),
            trip: structuredClone(trip),
            days: structuredClone(state.days),
            costs: structuredClone(state.costs),
            hotels: structuredClone(state.hotels),
            costEstimate: state.costEstimate ? structuredClone(state.costEstimate) : null,
          };

          const message = `Saved ${trip.destination} to your collection.`;
          set({
            trip,
            savedTrips: [savedTrip, ...state.savedTrips],
            statusMessage: message,
          });
          showToast(message, "success");
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Could not save trip.";
          set({ statusMessage: message });
          showToast(message, "error");
          return false;
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

        const message = `Loaded ${saved.name}.`;
        set({
          trip: saved.trip,
          days: saved.days,
          costs: saved.costs,
          hotels: saved.hotels,
          costEstimate: saved.costEstimate ?? costEstimate,
          tip,
          statusMessage: message,
          mapStatus: `Showing ${saved.trip.destination} on the map.`,
        });
        useToastStore.getState().showToast(message, "success");
      },

      deleteSavedTrip: (id) => {
        const removed = get().savedTrips.find((trip) => trip.id === id);
        set((state) => ({
          savedTrips: state.savedTrips.filter((trip) => trip.id !== id),
          statusMessage: "Saved trip removed.",
        }));
        useToastStore
          .getState()
          .showToast(removed ? `Removed ${removed.name}.` : "Saved trip removed.", "info");
      },

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
      version: 2,
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<TripState>;
        if (version < 2) {
          return {
            ...state,
            savedTrips: Array.isArray(state.savedTrips) ? state.savedTrips : [],
          };
        }
        return state;
      },
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<TripState> | undefined;
        if (!persisted) {
          return currentState;
        }

        const trip = normalizeTripForm({
          ...currentState.trip,
          ...(persisted.trip ?? {}),
        });

        return {
          ...currentState,
          trip,
          days: persisted.days ?? currentState.days,
          hotels: persisted.hotels ?? currentState.hotels,
          costs: persisted.costs ?? currentState.costs,
          costEstimate: persisted.costEstimate ?? currentState.costEstimate,
          savedTrips: Array.isArray(persisted.savedTrips)
            ? persisted.savedTrips
            : currentState.savedTrips,
        };
      },
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
