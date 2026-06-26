import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-gradient-to-r from-sky to-violet text-ink font-semibold hover:-translate-y-0.5",
  secondary:
    "border border-line bg-panel2 text-slate-100 font-medium hover:-translate-y-0.5",
  solar:
    "border border-solar/35 bg-solar/10 text-amber-200 font-medium hover:-translate-y-0.5",
  danger:
    "border border-red-400/35 bg-red-400/10 text-red-300 font-medium hover:-translate-y-0.5",
};

export function Button({
  variant = "secondary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      className={`w-full rounded-xl px-4 py-2.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function inputClassName() {
  return "w-full rounded-xl border border-line bg-panel2 px-3 py-2.5 text-sm outline-none transition focus:border-sky focus:ring-2 focus:ring-sky/30 sm:text-base";
}
