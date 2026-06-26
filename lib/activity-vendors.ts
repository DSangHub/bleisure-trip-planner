import { destinationKey } from "./format";
import type { ActivityCategory, ActivityVendor, HikingVendorGroups } from "./types";

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
      kind: "guided-tour",
    },
    {
      id: "denver-front-range-hikes",
      name: "Front Range Eco Hikes",
      description: "Moderate guided hikes on Red Rocks and Mount Falcon with local naturalist.",
      priceEstimate: "$89 / half day",
      bookUrl: "#book-front-range-hikes",
      ecoFriendly: true,
      kind: "guided-tour",
    },
    {
      id: "denver-continental-divide",
      name: "Continental Divide Guided Treks",
      description: "Full-day Rockies treks with flexible pace groups and trail lunch included.",
      priceEstimate: "$165 / full day",
      bookUrl: "#book-continental-divide-treks",
      ecoFriendly: false,
      kind: "guided-tour",
    },
    {
      id: "denver-helios-trail-gear",
      name: "Helios Trail Gear Co.",
      description: "Solar-powered rental hub for poles, packs, layers, and GPS — hotel delivery available.",
      priceEstimate: "$42 / day kit",
      bookUrl: "#book-helios-trail-gear",
      ecoFriendly: true,
      kind: "gear-rental",
    },
    {
      id: "denver-alpine-eco-outfitters",
      name: "Alpine Eco Outfitters",
      description: "Refurbished and low-impact hiking gear with reusable bottle and snack kit add-on.",
      priceEstimate: "$35 / day kit",
      bookUrl: "#book-alpine-eco-outfitters",
      ecoFriendly: true,
      kind: "gear-rental",
    },
    {
      id: "denver-rockies-rack-pack",
      name: "Rockies Rack & Pack",
      description: "Boots, backpacks, and bear canisters for self-guided Front Range day hikes.",
      priceEstimate: "$48 / day kit",
      bookUrl: "#book-rockies-rack-pack",
      ecoFriendly: false,
      kind: "gear-rental",
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
      kind: "guided-tour",
    },
    {
      id: "lisbon-monsanto-walks",
      name: "Monsanto Park Hiking Club",
      description: "Urban nature reserve trails minutes from downtown; morning departures.",
      priceEstimate: "€45 / half day",
      bookUrl: "#book-monsanto-hikes",
      ecoFriendly: true,
      kind: "guided-tour",
    },
    {
      id: "lisbon-arrabida-trails",
      name: "Arrábida Coastal Trails",
      description: "Moderate cliffside hike south of Lisbon with small-group guide.",
      priceEstimate: "€110 / full day",
      bookUrl: "#book-arrabida-trails",
      ecoFriendly: false,
      kind: "guided-tour",
    },
    {
      id: "lisbon-trail-kit-rentals",
      name: "Tagus Trail Kit Rentals",
      description: "Day-hike packs, poles, and layers with reusable water flask included.",
      priceEstimate: "€30 / day kit",
      bookUrl: "#book-tagus-trail-kit",
      ecoFriendly: true,
      kind: "gear-rental",
    },
    {
      id: "lisbon-sintra-gear",
      name: "Sintra Green Gear Co.",
      description: "Eco-refurbished boots and backpacks for Sintra hill trails.",
      priceEstimate: "€28 / day kit",
      bookUrl: "#book-sintra-green-gear",
      ecoFriendly: true,
      kind: "gear-rental",
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
      description: "Carbon-conscious guided hikes with small groups and naturalist commentary.",
      priceEstimate: "$95 / full day",
      bookUrl: "#book-trailhead-eco",
      ecoFriendly: true,
      kind: "guided-tour",
    },
    {
      id: "default-nature-walks",
      name: "Nature Path Day Hikes",
      description: "Moderate trails near the city with certified local guide.",
      priceEstimate: "$75 / half day",
      bookUrl: "#book-nature-path",
      ecoFriendly: false,
      kind: "guided-tour",
    },
    {
      id: "default-trail-gear",
      name: "Summit Kit Rentals",
      description: "Hiking poles, day packs, and weather layers with hotel drop-off.",
      priceEstimate: "$38 / day kit",
      bookUrl: "#book-summit-kit-rentals",
      ecoFriendly: true,
      kind: "gear-rental",
    },
    {
      id: "default-eco-gear",
      name: "Green Trail Outfitters",
      description: "Reused and repaired gear program with low-waste packaging.",
      priceEstimate: "$32 / day kit",
      bookUrl: "#book-green-trail-outfitters",
      ecoFriendly: true,
      kind: "gear-rental",
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
  hiking: ["hike", "hiking", "trail", "mountain", "summit", "trek", "rockies", "gear", "rental", "outfitter", "pack", "boots"],
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

function dedupeVendors(vendors: ActivityVendor[]): ActivityVendor[] {
  return vendors.filter(
    (vendor, index, list) => list.findIndex((item) => item.id === vendor.id) === index,
  );
}

function getAllCategoryVendors(
  destination: string,
  category: ActivityCategory,
): ActivityVendor[] {
  const key = destinationKey(destination);
  const catalog = VENDOR_CATALOG[key] ?? VENDOR_CATALOG.default;
  const defaultCatalog = VENDOR_CATALOG.default;

  const specific = catalog[category] ?? [];
  const fallback = defaultCatalog[category] ?? defaultCatalog.default ?? [];

  return sortEcoFirst(dedupeVendors([...specific, ...fallback]));
}

function isGuidedTour(vendor: ActivityVendor): boolean {
  return vendor.kind === "guided-tour" || vendor.kind === "general" || !vendor.kind;
}

function isGearRental(vendor: ActivityVendor): boolean {
  return vendor.kind === "gear-rental";
}

export function getHikingVendorGroups(
  destination: string,
  activity: string,
): HikingVendorGroups | null {
  if (detectActivityCategory(activity) !== "hiking") {
    return null;
  }

  const vendors = getAllCategoryVendors(destination, "hiking");
  const guidedTours = sortEcoFirst(vendors.filter(isGuidedTour)).slice(0, 2);
  const gearRentals = sortEcoFirst(vendors.filter(isGearRental)).slice(0, 2);

  if (!guidedTours.length && !gearRentals.length) {
    return null;
  }

  return { guidedTours, gearRentals };
}

export function getActivityVendors(
  destination: string,
  activity: string,
  limit = 3,
): ActivityVendor[] {
  const category = detectActivityCategory(activity);
  const merged = getAllCategoryVendors(destination, category);

  if (category === "hiking") {
    const groups = getHikingVendorGroups(destination, activity);
    if (groups) {
      return [...groups.guidedTours, ...groups.gearRentals].slice(0, limit);
    }
  }

  return merged.slice(0, limit);
}

export function getActivityCategoryLabel(category: ActivityCategory): string {
  const labels: Record<ActivityCategory, string> = {
    biking: "Biking & rentals",
    hiking: "Hiking · guided tours & gear",
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
