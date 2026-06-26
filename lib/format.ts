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
  if (value.includes("denver")) return "denver";
  if (value.includes("paris")) return "paris";
  if (value.includes("rome") || value.includes("roma")) return "rome";
  if (value.includes("barcelona")) return "barcelona";
  if (value.includes("amsterdam")) return "amsterdam";
  if (value.includes("tokyo")) return "tokyo";
  if (value.includes("singapore")) return "singapore";
  if (value.includes("sydney")) return "sydney";
  if (value.includes("new york")) return "newyork";
  if (value.includes("san francisco")) return "sanfrancisco";
  return "default";
}

export function defaultTripDates(): { startDate: string; endDate: string } {
  const today = new Date();
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);
  return {
    startDate: toLocalDateString(today),
    endDate: toLocalDateString(end),
  };
}

export function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function createTripId(): string {
  return `trip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
