import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bleisure Trip Planner",
    template: "%s | Bleisure Trip Planner",
  },
  description:
    "Plan business and leisure trips with solar-powered hotel suggestions, travel cost estimates, interactive maps, and PDF export.",
  keywords: [
    "bleisure",
    "trip planner",
    "solar hotels",
    "business travel",
    "itinerary",
  ],
  openGraph: {
    title: "Bleisure Trip Planner",
    description:
      "Balance meetings and downtime with solar stays, cost estimates, and exportable itineraries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-ink text-slate-100 antialiased">
        <BackgroundGlow />
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
