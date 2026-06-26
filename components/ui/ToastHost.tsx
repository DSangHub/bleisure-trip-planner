"use client";

import { useToastStore } from "@/store/toast-store";

const styles = {
  success: "border-emerald-400/35 bg-emerald-500/15 text-emerald-100",
  error: "border-red-400/35 bg-red-500/15 text-red-100",
  info: "border-sky/35 bg-sky/15 text-slate-100",
};

export function ToastHost() {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  if (!toasts.length) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`pointer-events-auto w-full max-w-sm rounded-xl border px-4 py-3 text-sm shadow-glow backdrop-blur sm:w-auto ${styles[toast.type]}`}
        >
          <div className="flex items-start justify-between gap-3">
            <p>{toast.message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 text-xs opacity-70 transition hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
