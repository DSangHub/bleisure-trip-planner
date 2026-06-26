import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Plan bleisure trips with solar-powered hotels, interactive maps, cost estimates, and PDF export.",
};

const features = [
  {
    title: "Bleisure itineraries",
    body: "Split business and leisure days, edit activities, and keep everything in one plan.",
  },
  {
    title: "Solar hotel picks",
    body: "Destination-based eco stays with solar coverage, nightly rates, and ratings.",
  },
  {
    title: "Cost + carbon insights",
    body: "Compare conventional lodging with solar stays and see estimated savings.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="max-w-3xl">
        <div className="inline-flex items-center rounded-full border border-sky/25 bg-sky/10 px-3 py-1 text-xs font-medium text-sky sm:text-sm">
          Business + Leisure
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Plan smarter bleisure trips
        </h1>
        <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">
          Build day-by-day itineraries, preview destinations on a Leaflet map, compare solar-powered
          hotels, estimate travel costs, and export a polished PDF — all in one app.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/planner"
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky to-violet px-4 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 sm:w-auto sm:min-w-[12rem]"
          >
            Open planner
          </Link>
          <Link
            href="/saved"
            className="inline-flex w-full items-center justify-center rounded-xl border border-line bg-panel2 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 sm:w-auto"
          >
            View saved trips
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-line bg-panel/95 p-5 shadow-glow"
          >
            <h2 className="text-lg font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">{feature.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
