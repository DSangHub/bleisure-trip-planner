import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { FileProtocolWarning } from "@/components/pwa/FileProtocolWarning";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { OfflineBanner } from "@/components/pwa/OfflineBanner";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0f1419",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bleisure",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192" }],
  },
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
        <ServiceWorkerRegistration />
        <BackgroundGlow />
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
          <FileProtocolWarning />
          <OfflineBanner />
          {children}
        </main>
        <InstallPrompt />
      </body>
    </html>
  );
}
