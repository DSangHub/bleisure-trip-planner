import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/planner", label: "Planner" },
  { href: "/saved", label: "Saved trips" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line/80 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          Bleisure Trip Planner
        </Link>
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-line bg-panel2/80 px-3 py-1.5 text-sm text-mist transition hover:border-sky/40 hover:text-sky"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
