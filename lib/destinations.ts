export interface BleisureDestination {
  label: string;
  region: string;
  keywords: string[];
}

export const POPULAR_BLEISURE_DESTINATIONS: BleisureDestination[] = [
  { label: "Lisbon, Portugal", region: "Europe", keywords: ["lisbon", "portugal", "pt", "lisboa"] },
  { label: "London, UK", region: "Europe", keywords: ["london", "uk", "united kingdom", "england"] },
  { label: "Paris, France", region: "Europe", keywords: ["paris", "france", "fr"] },
  { label: "Rome, Italy", region: "Europe", keywords: ["rome", "roma", "italy", "it"] },
  { label: "Barcelona, Spain", region: "Europe", keywords: ["barcelona", "spain", "es", "catalonia"] },
  { label: "Madrid, Spain", region: "Europe", keywords: ["madrid", "spain", "es"] },
  { label: "Milan, Italy", region: "Europe", keywords: ["milan", "milano", "italy", "it"] },
  { label: "Amsterdam, Netherlands", region: "Europe", keywords: ["amsterdam", "netherlands", "nl", "holland"] },
  { label: "Berlin, Germany", region: "Europe", keywords: ["berlin", "germany", "de"] },
  { label: "Munich, Germany", region: "Europe", keywords: ["munich", "munchen", "germany", "de"] },
  { label: "Dublin, Ireland", region: "Europe", keywords: ["dublin", "ireland", "ie"] },
  { label: "Edinburgh, UK", region: "Europe", keywords: ["edinburgh", "scotland", "uk"] },
  { label: "Copenhagen, Denmark", region: "Europe", keywords: ["copenhagen", "denmark", "dk"] },
  { label: "Stockholm, Sweden", region: "Europe", keywords: ["stockholm", "sweden", "se"] },
  { label: "Zurich, Switzerland", region: "Europe", keywords: ["zurich", "switzerland", "ch"] },
  { label: "Vienna, Austria", region: "Europe", keywords: ["vienna", "wien", "austria", "at"] },
  { label: "Prague, Czech Republic", region: "Europe", keywords: ["prague", "praha", "czech", "cz"] },
  { label: "Denver, CO, USA", region: "Americas", keywords: ["denver", "colorado", "co", "usa", "us"] },
  { label: "New York, NY, USA", region: "Americas", keywords: ["new york", "nyc", "ny", "usa", "us", "manhattan"] },
  { label: "San Francisco, CA, USA", region: "Americas", keywords: ["san francisco", "sf", "california", "ca", "usa", "bay area"] },
  { label: "Austin, TX, USA", region: "Americas", keywords: ["austin", "texas", "tx", "usa", "us"] },
  { label: "Seattle, WA, USA", region: "Americas", keywords: ["seattle", "washington", "wa", "usa", "us"] },
  { label: "Chicago, IL, USA", region: "Americas", keywords: ["chicago", "illinois", "il", "usa", "us"] },
  { label: "Miami, FL, USA", region: "Americas", keywords: ["miami", "florida", "fl", "usa", "us"] },
  { label: "Los Angeles, CA, USA", region: "Americas", keywords: ["los angeles", "la", "california", "ca", "usa", "us"] },
  { label: "Boston, MA, USA", region: "Americas", keywords: ["boston", "massachusetts", "ma", "usa", "us"] },
  { label: "Toronto, ON, Canada", region: "Americas", keywords: ["toronto", "canada", "ca", "ontario", "on"] },
  { label: "Vancouver, BC, Canada", region: "Americas", keywords: ["vancouver", "canada", "ca", "british columbia", "bc"] },
  { label: "Mexico City, Mexico", region: "Americas", keywords: ["mexico city", "cdmx", "mexico", "mx"] },
  { label: "São Paulo, Brazil", region: "Americas", keywords: ["sao paulo", "são paulo", "brazil", "br"] },
  { label: "Buenos Aires, Argentina", region: "Americas", keywords: ["buenos aires", "argentina", "ar"] },
  { label: "Tokyo, Japan", region: "Asia-Pacific", keywords: ["tokyo", "japan", "jp"] },
  { label: "Singapore", region: "Asia-Pacific", keywords: ["singapore", "sg"] },
  { label: "Sydney, Australia", region: "Asia-Pacific", keywords: ["sydney", "australia", "au", "nsw"] },
  { label: "Melbourne, Australia", region: "Asia-Pacific", keywords: ["melbourne", "australia", "au", "vic"] },
  { label: "Hong Kong", region: "Asia-Pacific", keywords: ["hong kong", "hk", "china"] },
  { label: "Seoul, South Korea", region: "Asia-Pacific", keywords: ["seoul", "south korea", "korea", "kr"] },
  { label: "Bangkok, Thailand", region: "Asia-Pacific", keywords: ["bangkok", "thailand", "th"] },
  { label: "Bali, Indonesia", region: "Asia-Pacific", keywords: ["bali", "indonesia", "id", "denpasar"] },
  { label: "Dubai, UAE", region: "Middle East", keywords: ["dubai", "uae", "emirates"] },
  { label: "Tel Aviv, Israel", region: "Middle East", keywords: ["tel aviv", "israel", "il"] },
  { label: "Cape Town, South Africa", region: "Africa", keywords: ["cape town", "south africa", "za"] },
];

const DESTINATION_MIN_LENGTH = 2;
const DESTINATION_MAX_LENGTH = 120;

export function normalizeDestination(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function getDestinationValidationError(destination: string): string | null {
  const normalized = normalizeDestination(destination);

  if (!normalized) {
    return "Destination is required.";
  }
  if (normalized.length < DESTINATION_MIN_LENGTH) {
    return "Enter at least 2 characters for the destination.";
  }
  if (normalized.length > DESTINATION_MAX_LENGTH) {
    return `Destination is too long (max ${DESTINATION_MAX_LENGTH} characters).`;
  }
  if (!/[a-zA-Z\u00C0-\u024F]/.test(normalized)) {
    return "Include a city or place name with letters.";
  }

  return null;
}

export function filterDestinations(query: string, limit = 8): BleisureDestination[] {
  const normalized = normalizeDestination(query).toLowerCase();
  if (!normalized) {
    return POPULAR_BLEISURE_DESTINATIONS.slice(0, limit);
  }

  const tokens = normalized.split(/[\s,]+/).filter(Boolean);

  const scored = POPULAR_BLEISURE_DESTINATIONS.map((destination) => {
    const haystack = `${destination.label} ${destination.region} ${destination.keywords.join(" ")}`.toLowerCase();
    const labelLower = destination.label.toLowerCase();

    let score = 0;
    if (labelLower.startsWith(normalized)) {
      score += 100;
    } else if (labelLower.includes(normalized)) {
      score += 60;
    }

    for (const token of tokens) {
      if (labelLower.includes(token)) {
        score += 30;
      }
      if (destination.keywords.some((keyword) => keyword.startsWith(token) || keyword.includes(token))) {
        score += 20;
      }
      if (haystack.includes(token)) {
        score += 10;
      }
    }

    return { destination, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.destination.label.localeCompare(b.destination.label));

  return scored.slice(0, limit).map((entry) => entry.destination);
}

export function findDestinationMatch(value: string): BleisureDestination | null {
  const normalized = normalizeDestination(value).toLowerCase();
  return (
    POPULAR_BLEISURE_DESTINATIONS.find(
      (destination) => destination.label.toLowerCase() === normalized,
    ) ?? null
  );
}
