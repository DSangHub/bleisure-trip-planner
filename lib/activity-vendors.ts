import { destinationKey } from "./format";
import type { ActivityCategory, ActivityVendor } from "./types";

type VendorCatalog = Partial<Record<ActivityCategory, ActivityVendor[]>>;

const DENVER_VENDORS: VendorCatalog = {
  biking: [
    {
      id: "denver-suncycle",
      name: "SunCycle Denver Rentals",
      description: "Solar-charged e-bike fleet with Cherry Creek trail maps and helmet included.",
      priceEstimate: "$38 / half day",
      bookUrl: "#book-suncycle-denver",
      ecoFriendly: true,
    },
    {
      id: "denver-mile-high-bikes",
      name: "Mile High Green Bikes",
      description: "Conventional and e-bikes near Union Station; low-emission delivery to your hotel.",
      priceEstimate: "$32 / half day",
      bookUrl: "#book-mile-high-bikes",
      ecoFriendly: true,
    },
    {
      id: "denver-river-ride",
      name: "Riverfront Ride Co.",
      description: "Guided city cycling loop with brewery stops and bike-lane friendly routes.",
      priceEstimate: "$55 / guided tour",
      bookUrl: "#book-riverfront-ride",
      ecoFriendly: false,
    },
  ],
  hiking: [
    {
      id: "denver-rocky-solar-guides",
      name: "Rocky Solar Trail Guides",
      description: "Small-group hikes in Rocky Mountain NP with carbon-offset transport from Denver.",
      priceEstimate: "$145 / full day",
      bookUrl: "#book-rocky-solar-guides",
      ecoFriendly: true,
    },
    {
      id: "denver-front-range-hikes",
      name: "Front Range Eco Hikes",
      description: "Moderate guided hikes on Red Rocks and Mount Falcon with local naturalist.",
      priceEstimate: "$89 / half day",
      bookUrl: "#book-front-range-hikes",
      ecoFriendly: true,
    },
    {
      id: "denver-summit-outfitters",
      name: "Summit Day Hike Co.",
      description: "All-level Rockies day hikes with gear rental and picnic lunch option.",
      priceEstimate: "$120 / full day",
      bookUrl: "#book-summit-day-hike",
      ecoFriendly: false,
    },
  ],
  walking: [
    {
      id: "denver-lohi-walks",
      name: "LoHi Solar Walking Tours",
      description: "Walkable neighborhood tour covering street art, solar rooftops, and local cafes.",
      priceEstimate: "$35 / person",
      bookUrl: "#book-lohi-walks",
      ecoFriendly: true,
    },
    {
      id: "denver-capital-walk",
      name: "Capitol Hill Heritage Walks",
      description: "Historic Denver walking route with optional food market add-on.",
      priceEstimate: "$28 / person",
      bookUrl: "#book-capitol-walks",
      ecoFriendly: false,
    },
  ],
  food: [
    {
      id: "denver-farm-market",
      name: "Union Station Farm Market Tour",
      description: "Tasting walk through local vendors with zero-waste sampling kits.",
      priceEstimate: "$48 / person",
      bookUrl: "#book-union-market-tour",
      ecoFriendly: true,
    },
    {
      id: "denver-green-plate",
      name: "Green Plate Food Crawl",
      description: "Farm-to-table stops in RiNo with vegetarian-forward pairings.",
      priceEstimate: "$72 / person",
      bookUrl: "#book-green-plate",
      ecoFriendly: true,
    },
  ],
  museum: [
    {
      id: "denver-art-skip",
      name: "Denver Art Museum Skip-the-Line",
      description: "Timed entry plus curator highlights for bleisure afternoon blocks.",
      priceEstimate: "$24 / person",
      bookUrl: "#book-dam-tickets",
      ecoFriendly: false,
    },
    {
      id: "denver-nature-science",
      name: "Museum of Nature & Science",
      description: "Flexible ticket with planetarium add-on; great post-meeting decompression.",
      priceEstimate: "$22 / person",
      bookUrl: "#book-denver-museum-science",
      ecoFriendly: false,
    },
  ],
  coffee: [
    {
      id: "denver-solar-roast",
      name: "Solar Roast Coffee Crawl",
      description: "Three-stop crawl featuring solar-powered roasters and rooftop patios.",
      priceEstimate: "$30 / person",
      bookUrl: "#book-solar-roast-crawl",
      ecoFriendly: true,
    },
  ],
  business: [
    {
      id: "denver-cowork-solar",
      name: "Helios Cowork Day Pass",
      description: "Solar-powered cowork lounge with meeting rooms and espresso bar.",
      priceEstimate: "$35 / day",
      bookUrl: "#book-helios-cowork-denver",
      ecoFriendly: true,
    },
    {
      id: "denver-meeting-suites",
      name: "Convention Center Meeting Suites",
      description: "Hourly private meeting rooms with AV and catering coordination.",
      priceEstimate: "$95 / hour",
      bookUrl: "#book-denver-meeting-suites",
      ecoFriendly: false,
    },
  ],
  explore: [
    {
      id: "denver-red-rocks-sunset",
      name: "Red Rocks Sunset Shuttle",
      description: "Low-emission shuttle to sunset viewpoint with flexible return times.",
      priceEstimate: "$40 / person",
      bookUrl: "#book-red-rocks-shuttle",
      ecoFriendly: true,
    },
    {
      id: "denver-flex-explore",
      name: "Denver Flex Explorer Pass",
      description: "Mix-and-match attractions with light rail day pass included.",
      priceEstimate: "$65 / day",
      bookUrl: "#book-denver-flex-pass",
      ecoFriendly: true,
    },
  ],
};

const LISBON_VENDORS: VendorCatalog = {
  biking: [
    {
      id: "lisbon-ebike-tagus",
      name: "Tagus E-Bike Adventures",
      description: "Solar-charged e-bikes along the riverfront with Belém stop and helmet kit.",
      priceEstimate: "€35 / half day",
      bookUrl: "#book-tagus-ebike",
      ecoFriendly: true,
    },
    {
      id: "lisbon-alfama-bikes",
      name: "Alfama Green Cycles",
      description: "Compact city bikes for hill-friendly routes; hotel delivery available.",
      priceEstimate: "€28 / half day",
      bookUrl: "#book-alfama-cycles",
      ecoFriendly: true,
    },
    {
      id: "lisbon-coastal-ride",
      name: "Cascais Coastal Ride Co.",
      description: "Guided coastal cycling day trip with train return from Cais do Sodré.",
      priceEstimate: "€75 / guided tour",
      bookUrl: "#book-cascais-ride",
      ecoFriendly: false,
    },
  ],
  hiking: [
    {
      id: "lisbon-sintra-eco",
      name: "Sintra Eco Trail Guides",
      description: "Guided forest hikes in Sintra-Cascais Natural Park with picnic option.",
      priceEstimate: "€95 / full day",
      bookUrl: "#book-sintra-eco-trails",
      ecoFriendly: true,
    },
    {
      id: "lisbon-monsanto-walks",
      name: "Monsanto Park Hiking Club",
      description: "Urban nature reserve trails minutes from downtown; morning departures.",
      priceEstimate: "€45 / half day",
      bookUrl: "#book-monsanto-hikes",
      ecoFriendly: true,
    },
    {
      id: "lisbon-arrabida-trails",
      name: "Arrábida Coastal Trails",
      description: "Moderate cliffside hike south of Lisbon with small-group guide.",
      priceEstimate: "€110 / full day",
      bookUrl: "#book-arrabida-trails",
      ecoFriendly: false,
    },
  ],
  walking: [
    {
      id: "lisbon-alfama-walk",
      name: "Alfama Solar Walking Tour",
      description: "Fado quarter walk with rooftop viewpoints and local pastry stop.",
      priceEstimate: "€32 / person",
      bookUrl: "#book-alfama-walk",
      ecoFriendly: true,
    },
    {
      id: "lisbon-baixa-tour",
      name: "Baixa Heritage Walks",
      description: "Downtown history tour covering plazas, elevators, and river views.",
      priceEstimate: "€25 / person",
      bookUrl: "#book-baixa-walk",
      ecoFriendly: false,
    },
  ],
  food: [
    {
      id: "lisbon-time-out-market",
      name: "Time Out Market Tasting Tour",
      description: "Guided tasting route with sustainable seafood and wine pairings.",
      priceEstimate: "€58 / person",
      bookUrl: "#book-timeout-market",
      ecoFriendly: true,
    },
    {
      id: "lisbon-mouraria-food",
      name: "Mouraria Food Market Walk",
      description: "Neighborhood market crawl with local chef introductions.",
      priceEstimate: "€65 / person",
      bookUrl: "#book-mouraria-food",
      ecoFriendly: true,
    },
  ],
  museum: [
    {
      id: "lisbon-maat-tickets",
      name: "MAAT Museum Entry",
      description: "Architecture and art museum on the Tagus with flexible afternoon slots.",
      priceEstimate: "€11 / person",
      bookUrl: "#book-maat-tickets",
      ecoFriendly: false,
    },
    {
      id: "lisbon-oceanario",
      name: "Oceanário Skip-the-Line",
      description: "Priority entry to Lisbon's aquarium; ideal for family bleisure days.",
      priceEstimate: "€27 / person",
      bookUrl: "#book-oceanario",
      ecoFriendly: false,
    },
  ],
  coffee: [
    {
      id: "lisbon-solar-coffee",
      name: "Bairro Solar Coffee Crawl",
      description: "Three specialty cafes with solar-powered roasters and pastel de nata stops.",
      priceEstimate: "€28 / person",
      bookUrl: "#book-bairro-coffee",
      ecoFriendly: true,
    },
  ],
  business: [
    {
      id: "lisbon-second-home",
      name: "Second Home Lisbon Day Pass",
      description: "Plant-filled cowork space with meeting pods and fast Wi-Fi.",
      priceEstimate: "€40 / day",
      bookUrl: "#book-second-home-lisbon",
      ecoFriendly: true,
    },
    {
      id: "lisbon-meeting-hub",
      name: "Parque das Nações Meeting Hub",
      description: "Hourly meeting rooms near the river with catering options.",
      priceEstimate: "€85 / hour",
      bookUrl: "#book-lisbon-meeting-hub",
      ecoFriendly: false,
    },
  ],
  explore: [
    {
      id: "lisbon-sunset-miradouro",
      name: "Miradouro Sunset Experience",
      description: "Guided sunset viewpoints with tram pass and local wine tasting.",
      priceEstimate: "€42 / person",
      bookUrl: "#book-miradouro-sunset",
      ecoFriendly: true,
    },
    {
      id: "lisbon-flex-tram",
      name: "Lisbon Flex Tram & Explore",
      description: "24h transit pass plus self-guided neighborhood map bundle.",
      priceEstimate: "€22 / day",
      bookUrl: "#book-lisbon-flex-tram",
      ecoFriendly: true,
    },
  ],
};

const DEFAULT_VENDORS: VendorCatalog = {
  biking: [
    {
      id: "default-eco-bikes",
      name: "EcoCity Bike Rentals",
      description: "E-bike and conventional rentals with route maps and helmets included.",
      priceEstimate: "$35 / half day",
      bookUrl: "#book-ecocity-bikes",
      ecoFriendly: true,
    },
    {
      id: "default-guided-cycle",
      name: "Green Wheel Guided Rides",
      description: "Small-group city cycling tour with locally owned operator.",
      priceEstimate: "$50 / tour",
      bookUrl: "#book-green-wheel",
      ecoFriendly: true,
    },
  ],
  hiking: [
    {
      id: "default-eco-hikes",
      name: "Trailhead Eco Guides",
      description: "Carbon-conscious guided hikes with small groups and gear rental.",
      priceEstimate: "$95 / full day",
      bookUrl: "#book-trailhead-eco",
      ecoFriendly: true,
    },
    {
      id: "default-nature-walks",
      name: "Nature Path Day Hikes",
      description: "Moderate trails near the city with certified local guide.",
      priceEstimate: "$75 / half day",
      bookUrl: "#book-nature-path",
      ecoFriendly: false,
    },
  ],
  walking: [
    {
      id: "default-walking-tour",
      name: "Local Steps Walking Tours",
      description: "Neighborhood walking tour with historic highlights and cafe stop.",
      priceEstimate: "$30 / person",
      bookUrl: "#book-local-steps",
      ecoFriendly: true,
    },
  ],
  food: [
    {
      id: "default-food-tour",
      name: "Green Plate Market Tour",
      description: "Farmers market tasting walk with sustainable vendor focus.",
      priceEstimate: "$55 / person",
      bookUrl: "#book-green-plate-tour",
      ecoFriendly: true,
    },
  ],
  museum: [
    {
      id: "default-museum-pass",
      name: "City Museum Flex Pass",
      description: "Skip-the-line entry to a major museum with audio guide.",
      priceEstimate: "$20 / person",
      bookUrl: "#book-museum-pass",
      ecoFriendly: false,
    },
  ],
  coffee: [
    {
      id: "default-coffee-crawl",
      name: "Solar Sip Coffee Crawl",
      description: "Three-stop specialty coffee route with eco-roaster partners.",
      priceEstimate: "$28 / person",
      bookUrl: "#book-solar-sip",
      ecoFriendly: true,
    },
  ],
  business: [
    {
      id: "default-cowork",
      name: "Helios Cowork Day Pass",
      description: "Solar-powered cowork lounge with meeting room credits.",
      priceEstimate: "$35 / day",
      bookUrl: "#book-helios-cowork",
      ecoFriendly: true,
    },
    {
      id: "default-meeting-room",
      name: "City Meeting Suites",
      description: "Private hourly meeting rooms with AV and refreshments.",
      priceEstimate: "$90 / hour",
      bookUrl: "#book-city-meeting",
      ecoFriendly: false,
    },
  ],
  explore: [
    {
      id: "default-explore-pass",
      name: "Eco Explorer Day Pass",
      description: "Transit plus self-guided highlights bundle for flexible open days.",
      priceEstimate: "$40 / day",
      bookUrl: "#book-eco-explorer",
      ecoFriendly: true,
    },
  ],
  default: [
    {
      id: "default-local-host",
      name: "Local Host Experiences",
      description: "Curated activity matching with vetted eco-conscious operators.",
      priceEstimate: "From $45",
      bookUrl: "#book-local-host",
      ecoFriendly: true,
    },
    {
      id: "default-bleisure-concierge",
      name: "Bleisure Concierge Desk",
      description: "Same-day bookings for tours, rentals, and wellness add-ons.",
      priceEstimate: "From $35",
      bookUrl: "#book-bleisure-concierge",
      ecoFriendly: false,
    },
  ],
};

const VENDOR_CATALOG: Record<string, VendorCatalog> = {
  denver: DENVER_VENDORS,
  lisbon: LISBON_VENDORS,
  default: DEFAULT_VENDORS,
};

const CATEGORY_KEYWORDS: Record<ActivityCategory, string[]> = {
  biking: ["bike", "biking", "bicycle", "cycling", "cycle", "e-bike", "ebike"],
  hiking: ["hike", "hiking", "trail", "mountain", "summit", "trek", "rockies"],
  walking: ["walk", "walking", "tour", "stroll"],
  food: ["food", "market", "restaurant", "dinner", "lunch", "tasting", "crawl"],
  museum: ["museum", "gallery", "exhibit", "art"],
  coffee: ["coffee", "cafe", "café", "espresso"],
  business: [
    "meeting",
    "client",
    "conference",
    "workshop",
    "review",
    "network",
    "offsite",
    "team",
    "project",
  ],
  explore: ["explore", "buffer", "travel", "sunset", "viewpoint", "flexible", "admin", "pace"],
  default: [],
};

export function detectActivityCategory(activity: string): ActivityCategory {
  const value = activity.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as Array<
    [ActivityCategory, string[]]
  >) {
    if (category === "default") continue;
    if (keywords.some((keyword) => value.includes(keyword))) {
      return category;
    }
  }

  return "default";
}

function sortEcoFirst(vendors: ActivityVendor[]): ActivityVendor[] {
  return [...vendors].sort((a, b) => Number(b.ecoFriendly) - Number(a.ecoFriendly));
}

export function getActivityVendors(
  destination: string,
  activity: string,
  limit = 3,
): ActivityVendor[] {
  const category = detectActivityCategory(activity);
  const key = destinationKey(destination);
  const catalog = VENDOR_CATALOG[key] ?? VENDOR_CATALOG.default;
  const defaultCatalog = VENDOR_CATALOG.default;

  const specific = catalog[category] ?? [];
  const fallback = defaultCatalog[category] ?? defaultCatalog.default ?? [];

  const merged = sortEcoFirst(
    [...specific, ...fallback].filter(
      (vendor, index, list) => list.findIndex((item) => item.id === vendor.id) === index,
    ),
  );

  return merged.slice(0, limit);
}

export function getActivityCategoryLabel(category: ActivityCategory): string {
  const labels: Record<ActivityCategory, string> = {
    biking: "Biking & rentals",
    hiking: "Hiking & trails",
    walking: "Walking tours",
    food: "Food & markets",
    museum: "Museums & culture",
    coffee: "Coffee & cafes",
    business: "Work & meetings",
    explore: "Explore & experiences",
    default: "Local experiences",
  };
  return labels[category];
}
