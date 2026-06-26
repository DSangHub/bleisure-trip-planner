import type { SolarHotel } from "./types";

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

export const SOLAR_HOTELS: Record<string, SolarHotel[]> = {
  london: [
    { name: "SunGrid Tower Hotel", nightlyRate: 210, solarCoverage: 88, rating: 4.7, highlight: "Rooftop solar farm covers 88% of daily demand." },
    { name: "Thames Solar Suites", nightlyRate: 185, solarCoverage: 76, rating: 4.5, highlight: "Battery-backed solar microgrid for guest floors." },
    { name: "Greenwich Helios Inn", nightlyRate: 165, solarCoverage: 92, rating: 4.4, highlight: "Net-zero lobby powered entirely by solar canopy." },
  ],
  lisbon: [
    { name: "Alfama Sol Stay", nightlyRate: 145, solarCoverage: 81, rating: 4.6, highlight: "Historic building retrofitted with solar roof tiles." },
    { name: "Tagus Helios Hotel", nightlyRate: 175, solarCoverage: 90, rating: 4.7, highlight: "Harbor-view property with 90% solar energy mix." },
    { name: "Baixa Sun Rooms", nightlyRate: 130, solarCoverage: 74, rating: 4.3, highlight: "Compact solar hotel ideal for bleisure trips." },
  ],
  paris: [
    { name: "Seine Solar Maison", nightlyRate: 220, solarCoverage: 70, rating: 4.5, highlight: "Facade-integrated solar panels reduce grid draw." },
    { name: "Montmartre Helios", nightlyRate: 195, solarCoverage: 83, rating: 4.6, highlight: "Hybrid solar-thermal system for hot water." },
    { name: "Left Bank Sun Hotel", nightlyRate: 205, solarCoverage: 79, rating: 4.4, highlight: "Smart energy dashboard in every room." },
  ],
  default: [
    { name: "Helios Urban Hotel", nightlyRate: 160, solarCoverage: 80, rating: 4.4, highlight: "Solar canopy over the rooftop lounge." },
    { name: "SunStay City Collection", nightlyRate: 140, solarCoverage: 72, rating: 4.3, highlight: "Certified green stay with on-site solar array." },
    { name: "EcoGrid Boutique Inn", nightlyRate: 155, solarCoverage: 85, rating: 4.5, highlight: "High solar coverage with low overnight rates." },
  ],
};
