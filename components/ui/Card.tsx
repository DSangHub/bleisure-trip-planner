import type { ReactNode } from "react";

export function Card({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-line bg-panel/95 p-4 shadow-glow backdrop-blur sm:p-5 ${className}`}
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {description ? <p className="mt-1 text-sm text-mist">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
