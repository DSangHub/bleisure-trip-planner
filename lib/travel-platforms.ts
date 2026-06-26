export type TravelPlatform =
  | "airbnb"
  | "booking"
  | "vrbo"
  | "getyourguide"
  | "viator"
  | "local";

export const PLATFORM_DATA_NOTE =
  "Example data modeled on top travel platforms — book via links (affiliate placeholders).";

const PLATFORM_LABELS: Record<TravelPlatform, string> = {
  airbnb: "Airbnb",
  booking: "Booking.com",
  vrbo: "Vrbo",
  getyourguide: "GetYourGuide",
  viator: "Viator",
  local: "Local partner",
};

const PLATFORM_STYLES: Record<TravelPlatform, string> = {
  airbnb: "border-rose-400/35 bg-rose-500/10 text-rose-200",
  booking: "border-sky/35 bg-sky/10 text-sky",
  vrbo: "border-violet/35 bg-violet/10 text-violet-200",
  getyourguide: "border-amber-400/35 bg-amber-500/10 text-amber-200",
  viator: "border-emerald-400/35 bg-emerald-500/10 text-emerald-200",
  local: "border-line bg-panel2 text-mist",
};

export function getPlatformLabel(platform: TravelPlatform): string {
  return PLATFORM_LABELS[platform];
}

export function getPlatformBadgeClass(platform: TravelPlatform): string {
  return PLATFORM_STYLES[platform];
}

export function formatReviewCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(count);
}
