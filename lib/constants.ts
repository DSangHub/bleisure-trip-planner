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
  rome: [
    { name: "Trastevere Sol Rooms", nightlyRate: 170, solarCoverage: 84, rating: 4.6, highlight: "Rooftop solar tiles above a walkable leisure district." },
    { name: "Forum Helios Hotel", nightlyRate: 195, solarCoverage: 78, rating: 4.5, highlight: "Business lounge powered by on-site solar and battery storage." },
    { name: "Vatican View Sun Stay", nightlyRate: 155, solarCoverage: 88, rating: 4.4, highlight: "High solar coverage for bleisure stays near historic sites." },
  ],
  barcelona: [
    { name: "Gothic Quarter Helios", nightlyRate: 165, solarCoverage: 82, rating: 4.5, highlight: "Solar canopy shades a rooftop cowork terrace." },
    { name: "Barceloneta Sun Hotel", nightlyRate: 150, solarCoverage: 77, rating: 4.4, highlight: "Beach-adjacent stay with strong solar generation." },
    { name: "Eixample Sol Suites", nightlyRate: 180, solarCoverage: 86, rating: 4.6, highlight: "Modernist block retrofitted with solar glass facade." },
  ],
  amsterdam: [
    { name: "Canal Ring Sun Hotel", nightlyRate: 190, solarCoverage: 75, rating: 4.5, highlight: "Canal-side property with solar roof and green tariff matching." },
    { name: "Jordaan Helios Inn", nightlyRate: 165, solarCoverage: 83, rating: 4.4, highlight: "Quiet neighborhood stay with solar-heated guest floors." },
    { name: "Amstel Solar Suites", nightlyRate: 175, solarCoverage: 80, rating: 4.5, highlight: "Strong solar coverage near business and museum districts." },
  ],
  denver: [
    { name: "Rocky Mountain Sol Hotel", nightlyRate: 175, solarCoverage: 86, rating: 4.5, highlight: "Solar roof array powers the business center and guest rooms." },
    { name: "Mile High Helios Inn", nightlyRate: 155, solarCoverage: 79, rating: 4.4, highlight: "Downtown stay with battery-backed solar microgrid." },
    { name: "Front Range Sun Suites", nightlyRate: 140, solarCoverage: 91, rating: 4.3, highlight: "High solar coverage near convention and leisure districts." },
  ],
  default: [
    { name: "Helios Urban Hotel", nightlyRate: 160, solarCoverage: 80, rating: 4.4, highlight: "Solar canopy over the rooftop lounge." },
    { name: "SunStay City Collection", nightlyRate: 140, solarCoverage: 72, rating: 4.3, highlight: "Certified green stay with on-site solar array." },
    { name: "EcoGrid Boutique Inn", nightlyRate: 155, solarCoverage: 85, rating: 4.5, highlight: "High solar coverage with low overnight rates." },
  ],
};
