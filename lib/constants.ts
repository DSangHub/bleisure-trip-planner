export const BUSINESS_SUGGESTIONS = [
  "Client meetings",
  "Conference sessions",
  "Team workshop",
  "Project review",
  "Networking lunch",
];

export const LEISURE_SUGGESTIONS = [
  "City walking tour",
  "Local food market",
  "Museum visit",
  "Sunset viewpoint",
  "Neighborhood coffee crawl",
];

export const DESTINATION_LEISURE_SUGGESTIONS: Record<string, string[]> = {
  denver: [
    "Scenic biking along Cherry Creek",
    "Guided hike in the Rockies",
    "City walking tour",
    "Union Station food market",
    "Red Rocks sunset viewpoint",
  ],
  lisbon: [
    "Tagus river e-bike ride",
    "Sintra hills hiking day",
    "Alfama walking tour",
    "Time Out Market food crawl",
    "Miradouro sunset viewpoint",
  ],
};

export const DEFAULT_CENTER: [number, number] = [38.7223, -9.1393];
export const DEFAULT_ZOOM = 5;

export const CONVENTIONAL_PREMIUM = 0.18;
export const SOLAR_ENERGY_DISCOUNT = 0.12;
export const CO2_KG_PER_NIGHT = 11.5;

export const DEFAULT_COST_INPUTS = {
  flight: 650,
  nightly: 180,
  businessDaily: 95,
  leisureDaily: 120,
  transportDaily: 35,
};
