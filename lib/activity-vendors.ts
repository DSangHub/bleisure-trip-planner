import { destinationKey } from "./format";
import type { ActivityCategory, ActivityVendor, HikingVendorGroups } from "./types";

type VendorSeed = Omit<ActivityVendor, "platform" | "rating" | "reviewCount"> &
  Partial<Pick<ActivityVendor, "platform" | "rating" | "reviewCount">>;

type VendorCatalog = Partial<Record<ActivityCategory, VendorSeed[]>>;

function normalizeVendor(seed: VendorSeed): ActivityVendor {
  return {
    platform: seed.platform ?? "local",
    rating: seed.rating ?? 4.6,
    reviewCount: seed.reviewCount ?? 120,
    ...seed,
  };
}

function normalizeVendors(seeds: VendorSeed[]): ActivityVendor[] {
  return seeds.map(normalizeVendor);
}

const DENVER_VENDORS: VendorCatalog = {
  biking: [
    {
      id: "denver-viator-cherry-creek-ebike",
      name: "Denver Cherry Creek E-Bike Sightseeing Tour",
      description:
        "Viator bestseller: guided e-bike ride along Cherry Creek Trail with skyline photo stops.",
      priceEstimate: "From $49 / person",
      bookUrl: "#affiliate-viator-denver-cherry-creek-ebike",
      ecoFriendly: true,
      platform: "viator",
      rating: 4.8,
      reviewCount: 2140,
    },
    {
      id: "denver-gyg-bike-rental",
      name: "Downtown Denver Bike Rental + GPS Route",
      description:
        "GetYourGuide pick: self-guided rental with solar-charging depot and helmet included.",
      priceEstimate: "From $32 / half day",
      bookUrl: "#affiliate-getyourguide-denver-bike-rental",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.7,
      reviewCount: 986,
    },
    {
      id: "denver-local-mile-high-bikes",
      name: "Mile High Electric Bikes",
      description:
        "Local rental shop with e-bike fleet and hotel delivery near Union Station.",
      priceEstimate: "$35 / half day",
      bookUrl: "#affiliate-local-mile-high-bikes",
      ecoFriendly: true,
      platform: "local",
      rating: 4.9,
      reviewCount: 312,
    },
  ],
  hiking: [
    {
      id: "denver-gyg-rocky-mountain-hike",
      name: "Rocky Mountain NP Small-Group Hike from Denver",
      description:
        "GetYourGuide original: full-day guided hike with carbon-offset transport and picnic.",
      priceEstimate: "From $139 / person",
      bookUrl: "#affiliate-getyourguide-denver-rocky-mountain-hike",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.9,
      reviewCount: 3412,
      kind: "guided-tour",
    },
    {
      id: "denver-viator-red-rocks-hike",
      name: "Red Rocks & Mount Falcon Guided Hiking Day",
      description:
        "Viator top rated: moderate trails with naturalist guide and small-group format.",
      priceEstimate: "From $89 / person",
      bookUrl: "#affiliate-viator-denver-red-rocks-hike",
      ecoFriendly: true,
      platform: "viator",
      rating: 4.8,
      reviewCount: 876,
      kind: "guided-tour",
    },
    {
      id: "denver-local-helios-trail-gear",
      name: "Helios Trail Gear Co.",
      description:
        "Local solar-powered rental hub for poles, packs, layers, and GPS — hotel delivery.",
      priceEstimate: "$42 / day kit",
      bookUrl: "#affiliate-local-helios-trail-gear",
      ecoFriendly: true,
      platform: "local",
      rating: 4.8,
      reviewCount: 204,
      kind: "gear-rental",
    },
    {
      id: "denver-local-alpine-eco-outfitters",
      name: "Alpine Eco Outfitters",
      description:
        "Refurbished hiking gear kits with reusable bottle and low-waste snack add-on.",
      priceEstimate: "$35 / day kit",
      bookUrl: "#affiliate-local-alpine-eco-outfitters",
      ecoFriendly: true,
      platform: "local",
      rating: 4.7,
      reviewCount: 158,
      kind: "gear-rental",
    },
    {
      id: "denver-viator-rockies-trek",
      name: "Full-Day Rockies Trek & Scenic Drive",
      description:
        "Viator classic: all-level Rockies day hike with gear rental option at checkout.",
      priceEstimate: "From $120 / person",
      bookUrl: "#affiliate-viator-denver-rockies-trek",
      ecoFriendly: false,
      platform: "viator",
      rating: 4.7,
      reviewCount: 1254,
      kind: "guided-tour",
    },
    {
      id: "denver-local-rockies-rack-pack",
      name: "Rockies Rack & Pack",
      description:
        "Local outfitter for boots, backpacks, and bear canisters on Front Range day hikes.",
      priceEstimate: "$48 / day kit",
      bookUrl: "#affiliate-local-rockies-rack-pack",
      ecoFriendly: false,
      platform: "local",
      rating: 4.6,
      reviewCount: 421,
      kind: "gear-rental",
    },
  ],
  walking: [
    {
      id: "denver-gyg-city-walking",
      name: "Downtown Denver History Walking Tour",
      description:
        "GetYourGuide: LoDo, Union Station, and public art with solar-building highlights.",
      priceEstimate: "From $35 / person",
      bookUrl: "#affiliate-getyourguide-denver-city-walk",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.8,
      reviewCount: 1124,
    },
    {
      id: "denver-viator-capital-hill",
      name: "Capitol Hill & Civic Center Walk",
      description: "Viator: guided stroll past museums, murals, and the golden dome.",
      priceEstimate: "From $28 / person",
      bookUrl: "#affiliate-viator-denver-capitol-walk",
      ecoFriendly: false,
      platform: "viator",
      rating: 4.7,
      reviewCount: 642,
    },
    {
      id: "denver-local-lohi-walks",
      name: "LoHi Solar Walking Tours",
      description: "Local guide covering street art, solar rooftops, and neighborhood cafes.",
      priceEstimate: "$35 / person",
      bookUrl: "#affiliate-local-lohi-walks",
      ecoFriendly: true,
      platform: "local",
      rating: 4.9,
      reviewCount: 218,
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
      id: "denver-gyg-art-museum",
      name: "Denver Art Museum Skip-the-Line",
      description: "GetYourGuide timed entry with curator highlights for afternoon bleisure blocks.",
      priceEstimate: "From $24 / person",
      bookUrl: "#affiliate-getyourguide-denver-art-museum",
      ecoFriendly: false,
      platform: "getyourguide",
      rating: 4.7,
      reviewCount: 1893,
    },
    {
      id: "denver-viator-nature-science",
      name: "Museum of Nature & Science + Planetarium",
      description: "Viator flexible ticket; strong post-meeting decompression option.",
      priceEstimate: "From $22 / person",
      bookUrl: "#affiliate-viator-denver-nature-science",
      ecoFriendly: false,
      platform: "viator",
      rating: 4.8,
      reviewCount: 2341,
    },
    {
      id: "denver-local-history-museum",
      name: "History Colorado Center",
      description: "Local museum pass with Rocky Mountain state exhibits and cafe.",
      priceEstimate: "$18 / person",
      bookUrl: "#affiliate-local-history-colorado",
      ecoFriendly: true,
      platform: "local",
      rating: 4.6,
      reviewCount: 876,
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
  parks: [
    {
      id: "denver-gyg-red-rocks-park",
      name: "Red Rocks Park & Amphitheatre Visit",
      description:
        "GetYourGuide: iconic red sandstone park with optional concert venue tour.",
      priceEstimate: "From $32 / person",
      bookUrl: "#affiliate-getyourguide-denver-red-rocks-park",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.9,
      reviewCount: 4521,
    },
    {
      id: "denver-viator-city-park",
      name: "City Park Paddle & Picnic Experience",
      description: "Viator: lake loop, paddle boats, and skyline views near museums.",
      priceEstimate: "From $38 / person",
      bookUrl: "#affiliate-viator-denver-city-park",
      ecoFriendly: true,
      platform: "viator",
      rating: 4.7,
      reviewCount: 534,
    },
    {
      id: "denver-local-rocky-arsenal",
      name: "Rocky Mountain Arsenal Wildlife Drive",
      description: "Local eco park with bison, prairie dogs, and solar visitor center.",
      priceEstimate: "Free – $15 tour",
      bookUrl: "#affiliate-local-rocky-arsenal",
      ecoFriendly: true,
      platform: "local",
      rating: 4.8,
      reviewCount: 2104,
    },
  ],
  nightlife: [
    {
      id: "denver-viator-rino-rooftop",
      name: "RiNo Solar Rooftop Bar Crawl",
      description: "Viator: curated craft cocktail route with solar-powered venues.",
      priceEstimate: "From $65 / person",
      bookUrl: "#affiliate-viator-denver-rino-nightlife",
      ecoFriendly: true,
      platform: "viator",
      rating: 4.7,
      reviewCount: 892,
    },
    {
      id: "denver-gyg-lodo-jazz",
      name: "LoDo Jazz & Cocktails Evening",
      description: "GetYourGuide: live jazz stops and historic warehouse district walk.",
      priceEstimate: "From $58 / person",
      bookUrl: "#affiliate-getyourguide-denver-lodo-jazz",
      ecoFriendly: false,
      platform: "getyourguide",
      rating: 4.6,
      reviewCount: 421,
    },
    {
      id: "denver-local-blue-moon",
      name: "Blue Moon Brewery Night",
      description: "Local brewery with rooftop patio and live music on weekends.",
      priceEstimate: "From $25 / person",
      bookUrl: "#affiliate-local-blue-moon",
      ecoFriendly: false,
      platform: "local",
      rating: 4.5,
      reviewCount: 1203,
    },
  ],
  spa: [
    {
      id: "denver-local-helios-spa",
      name: "Helios Wellness Spa · Solar Sauna",
      description: "Local solar thermal sauna, massage, and recovery lounge near downtown.",
      priceEstimate: "From $95 / 60 min",
      bookUrl: "#affiliate-local-helios-spa-denver",
      ecoFriendly: true,
      platform: "local",
      rating: 4.9,
      reviewCount: 412,
    },
    {
      id: "denver-gyg-mile-high-massage",
      name: "Mile High Massage & CBD Recovery",
      description: "GetYourGuide bookable: deep tissue and sports recovery for travelers.",
      priceEstimate: "From $110 / 60 min",
      bookUrl: "#affiliate-getyourguide-denver-massage",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.8,
      reviewCount: 678,
    },
    {
      id: "denver-viator-spa-day",
      name: "Denver Bleisure Spa Half-Day",
      description: "Viator package: massage, facial, and herbal tea lounge access.",
      priceEstimate: "From $145 / person",
      bookUrl: "#affiliate-viator-denver-spa-day",
      ecoFriendly: false,
      platform: "viator",
      rating: 4.7,
      reviewCount: 289,
    },
  ],
};

const LISBON_VENDORS: VendorCatalog = {
  biking: [
    {
      id: "lisbon-viator-tagus-ebike",
      name: "Lisbon Tagus River E-Bike Tour",
      description:
        "Viator favorite: guided e-bike ride along the waterfront with Belém landmarks.",
      priceEstimate: "From €42 / person",
      bookUrl: "#affiliate-viator-lisbon-tagus-ebike",
      ecoFriendly: true,
      platform: "viator",
      rating: 4.8,
      reviewCount: 1678,
    },
    {
      id: "lisbon-gyg-bike-rental",
      name: "Lisbon Hills E-Bike Rental & Route App",
      description:
        "GetYourGuide choice: solar-charging pickup point and helmet kit for self-guided rides.",
      priceEstimate: "From €28 / half day",
      bookUrl: "#affiliate-getyourguide-lisbon-bike-rental",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.7,
      reviewCount: 743,
    },
    {
      id: "lisbon-local-alfama-cycles",
      name: "Alfama Green Cycles",
      description:
        "Local shop with compact city bikes for hill-friendly routes and hotel delivery.",
      priceEstimate: "€26 / half day",
      bookUrl: "#affiliate-local-alfama-cycles",
      ecoFriendly: true,
      platform: "local",
      rating: 4.9,
      reviewCount: 289,
    },
  ],
  hiking: [
    {
      id: "lisbon-gyg-sintra-hike",
      name: "Sintra Forest & Palaces Guided Hike",
      description:
        "GetYourGuide bestseller: full-day Sintra trails with picnic and small-group guide.",
      priceEstimate: "From €95 / person",
      bookUrl: "#affiliate-getyourguide-lisbon-sintra-hike",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.9,
      reviewCount: 2891,
      kind: "guided-tour",
    },
    {
      id: "lisbon-viator-arrabida-hike",
      name: "Arrábida Coastal Trail Day Hike",
      description:
        "Viator top rated: cliffside paths south of Lisbon with transport from city center.",
      priceEstimate: "From €110 / person",
      bookUrl: "#affiliate-viator-lisbon-arrabida-hike",
      ecoFriendly: true,
      platform: "viator",
      rating: 4.8,
      reviewCount: 654,
      kind: "guided-tour",
    },
    {
      id: "lisbon-local-trail-kit",
      name: "Tagus Trail Kit Rentals",
      description:
        "Local day-hike packs, poles, and layers with reusable flask included.",
      priceEstimate: "€30 / day kit",
      bookUrl: "#affiliate-local-tagus-trail-kit",
      ecoFriendly: true,
      platform: "local",
      rating: 4.7,
      reviewCount: 176,
      kind: "gear-rental",
    },
    {
      id: "lisbon-local-sintra-gear",
      name: "Sintra Green Gear Co.",
      description:
        "Eco-refurbished boots and backpacks for Sintra hill trails; morning pickup.",
      priceEstimate: "€28 / day kit",
      bookUrl: "#affiliate-local-sintra-green-gear",
      ecoFriendly: true,
      platform: "local",
      rating: 4.8,
      reviewCount: 132,
      kind: "gear-rental",
    },
    {
      id: "lisbon-gyg-monsanto-hike",
      name: "Monsanto Park Nature Hike",
      description:
        "GetYourGuide urban escape: guided nature reserve trails minutes from downtown.",
      priceEstimate: "From €45 / person",
      bookUrl: "#affiliate-getyourguide-lisbon-monsanto-hike",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.7,
      reviewCount: 512,
      kind: "guided-tour",
    },
  ],
  walking: [
    {
      id: "lisbon-viator-alfama-tour",
      name: "Alfama & Mouraria Walking Tour",
      description:
        "Viator bestseller: fado quarter lanes, viewpoints, and pastel de nata stop.",
      priceEstimate: "From €32 / person",
      bookUrl: "#affiliate-viator-lisbon-alfama-walk",
      ecoFriendly: true,
      platform: "viator",
      rating: 4.9,
      reviewCount: 3892,
    },
    {
      id: "lisbon-gyg-baixa-tour",
      name: "Baixa & Chiado Heritage Walk",
      description:
        "GetYourGuide: downtown plazas, Santa Justa Lift, and riverfront promenade.",
      priceEstimate: "From €28 / person",
      bookUrl: "#affiliate-getyourguide-lisbon-baixa-walk",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.8,
      reviewCount: 1567,
    },
    {
      id: "lisbon-local-tram-tour",
      name: "Classic Tram 28 Neighborhood Tour",
      description: "Local guided walk following iconic tram hills and miradouros.",
      priceEstimate: "€35 / person",
      bookUrl: "#affiliate-local-lisbon-tram-tour",
      ecoFriendly: false,
      platform: "local",
      rating: 4.7,
      reviewCount: 934,
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
      id: "lisbon-gyg-maat",
      name: "MAAT Museum Entry + Riverfront",
      description:
        "GetYourGuide: architecture and art on the Tagus with flexible afternoon slots.",
      priceEstimate: "From €11 / person",
      bookUrl: "#affiliate-getyourguide-lisbon-maat",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.6,
      reviewCount: 2134,
    },
    {
      id: "lisbon-viator-oceanario",
      name: "Oceanário de Lisboa Skip-the-Line",
      description: "Viator priority entry; one of Europe's top aquarium experiences.",
      priceEstimate: "From €27 / person",
      bookUrl: "#affiliate-viator-lisbon-oceanario",
      ecoFriendly: false,
      platform: "viator",
      rating: 4.8,
      reviewCount: 5672,
    },
    {
      id: "lisbon-local-tile-museum",
      name: "National Tile Museum Visit",
      description: "Local pass to azulejo masterpieces in a serene convent setting.",
      priceEstimate: "€8 / person",
      bookUrl: "#affiliate-local-lisbon-tile-museum",
      ecoFriendly: true,
      platform: "local",
      rating: 4.7,
      reviewCount: 891,
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
  parks: [
    {
      id: "lisbon-gyg-eduardo-vii",
      name: "Eduardo VII Park Viewpoint Walk",
      description:
        "GetYourGuide: formal gardens, skyline views, and green respite above the city.",
      priceEstimate: "From €18 / person",
      bookUrl: "#affiliate-getyourguide-lisbon-eduardo-vii",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.7,
      reviewCount: 743,
    },
    {
      id: "lisbon-viator-monsanto-park",
      name: "Monsanto Forest Park Picnic",
      description: "Viator: urban forest trails, picnic setup, and nature escape.",
      priceEstimate: "From €35 / person",
      bookUrl: "#affiliate-viator-lisbon-monsanto-park",
      ecoFriendly: true,
      platform: "viator",
      rating: 4.8,
      reviewCount: 421,
    },
    {
      id: "lisbon-local-jardim",
      name: "Jardim da Estrela Garden Morning",
      description: "Local favorite park with kiosk coffee and shaded reading spots.",
      priceEstimate: "Free – €12 tour",
      bookUrl: "#affiliate-local-jardim-estrela",
      ecoFriendly: true,
      platform: "local",
      rating: 4.6,
      reviewCount: 512,
    },
  ],
  nightlife: [
    {
      id: "lisbon-viator-fado-night",
      name: "Bairro Alto Fado & Wine Evening",
      description: "Viator: intimate fado performance with Portuguese wine pairings.",
      priceEstimate: "From €55 / person",
      bookUrl: "#affiliate-viator-lisbon-fado-night",
      ecoFriendly: false,
      platform: "viator",
      rating: 4.9,
      reviewCount: 2891,
    },
    {
      id: "lisbon-gyg-rooftop-tagus",
      name: "Tagus Rooftop Sunset Cocktails",
      description: "GetYourGuide: rooftop bars with river views and local spirits.",
      priceEstimate: "From €48 / person",
      bookUrl: "#affiliate-getyourguide-lisbon-rooftop-night",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.7,
      reviewCount: 1123,
    },
    {
      id: "lisbon-local-pink-street",
      name: "Pink Street Nightlife Crawl",
      description: "Local-guided evening through Cais do Sodré bars and live music.",
      priceEstimate: "From €35 / person",
      bookUrl: "#affiliate-local-pink-street",
      ecoFriendly: false,
      platform: "local",
      rating: 4.5,
      reviewCount: 678,
    },
  ],
  spa: [
    {
      id: "lisbon-local-alfama-spa",
      name: "Alfama Solar Thermal Spa",
      description: "Local hammam-inspired spa with solar hot water and massage menu.",
      priceEstimate: "From €75 / 60 min",
      bookUrl: "#affiliate-local-alfama-spa",
      ecoFriendly: true,
      platform: "local",
      rating: 4.9,
      reviewCount: 534,
    },
    {
      id: "lisbon-gyg-wellness-day",
      name: "Lisbon Bleisure Wellness Half-Day",
      description: "GetYourGuide: massage, facial, and herbal tea in a boutique spa.",
      priceEstimate: "From €120 / person",
      bookUrl: "#affiliate-getyourguide-lisbon-spa",
      ecoFriendly: true,
      platform: "getyourguide",
      rating: 4.8,
      reviewCount: 389,
    },
    {
      id: "lisbon-viator-float-spa",
      name: "Float & Recovery Spa Session",
      description: "Viator bookable sensory float tanks and sports massage for travelers.",
      priceEstimate: "From €95 / 60 min",
      bookUrl: "#affiliate-viator-lisbon-float-spa",
      ecoFriendly: false,
      platform: "viator",
      rating: 4.7,
      reviewCount: 256,
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
  parks: [
    {
      id: "default-urban-park",
      name: "Central Park & Garden Walk",
      description: "Guided stroll through the city's main green space and viewpoints.",
      priceEstimate: "From $20 / person",
      bookUrl: "#book-default-urban-park",
      ecoFriendly: true,
    },
    {
      id: "default-nature-park",
      name: "Nature Reserve Morning Visit",
      description: "Eco park loop with wildlife spotting and picnic option.",
      priceEstimate: "From $30 / person",
      bookUrl: "#book-default-nature-park",
      ecoFriendly: true,
    },
  ],
  nightlife: [
    {
      id: "default-rooftop-crawl",
      name: "Rooftop Bar Evening Crawl",
      description: "Curated cocktail route with skyline views and local guide.",
      priceEstimate: "From $55 / person",
      bookUrl: "#book-default-rooftop-crawl",
      ecoFriendly: false,
    },
    {
      id: "default-live-music",
      name: "Live Music & Nightlife Tour",
      description: "Evening walk through top music venues and historic bars.",
      priceEstimate: "From $45 / person",
      bookUrl: "#book-default-live-music",
      ecoFriendly: false,
    },
  ],
  spa: [
    {
      id: "default-eco-spa",
      name: "Green Wellness Spa Session",
      description: "Eco-certified spa with massage and herbal tea lounge.",
      priceEstimate: "From $90 / 60 min",
      bookUrl: "#book-default-eco-spa",
      ecoFriendly: true,
    },
    {
      id: "default-travel-massage",
      name: "Travel Recovery Massage",
      description: "Deep tissue and jet-lag recovery for bleisure travelers.",
      priceEstimate: "From $85 / 60 min",
      bookUrl: "#book-default-travel-massage",
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
  parks: ["park", "garden", "green", "nature", "viewpoint", "picnic", "reserve"],
  nightlife: ["night", "nightlife", "bar", "cocktail", "fado", "jazz", "club", "evening"],
  spa: ["spa", "massage", "wellness", "sauna", "hammam", "recovery", "float"],
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

  const specific = normalizeVendors(catalog[category] ?? []);
  const fallback = normalizeVendors(defaultCatalog[category] ?? defaultCatalog.default ?? []);

  return sortEcoFirst(dedupeVendors([...specific, ...fallback]));
}

function isGuidedTour(vendor: ActivityVendor): boolean {
  return vendor.kind === "guided-tour" || vendor.kind === "general" || !vendor.kind;
}

function isGearRental(vendor: ActivityVendor): boolean {
  return vendor.kind === "gear-rental";
}

export function getVendorsByCategory(
  destination: string,
  category: ActivityCategory,
  limit = 3,
): ActivityVendor[] {
  return getAllCategoryVendors(destination, category).slice(0, limit);
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
    parks: "Parks & gardens",
    nightlife: "Nightlife & evenings",
    spa: "Massage & spa",
    default: "Local experiences",
  };
  return labels[category];
}
