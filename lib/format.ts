export function formatMoney(amount: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateLabel(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function destinationKey(destination: string): string {
  const value = destination.toLowerCase();
  if (value.includes("london")) return "london";
  if (value.includes("lisbon")) return "lisbon";
  if (value.includes("paris")) return "paris";
  return "default";
}

export function defaultTripDates(): { startDate: string; endDate: string } {
  const today = new Date();
  const end = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000);
  return {
    startDate: today.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

export function createTripId(): string {
  return `trip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
