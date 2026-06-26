"use client";

import { useEffect, useState } from "react";

export function FileProtocolWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.location.protocol === "file:");
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="mb-4 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100">
      <p className="font-semibold">This app cannot run from a file link.</p>
      <p className="mt-2 text-red-100/90">
        On Chromebook, do not open <code className="rounded bg-black/20 px-1">out/index.html</code>{" "}
        directly. In the Linux terminal, run:
      </p>
      <pre className="mt-2 overflow-x-auto rounded-lg bg-black/30 p-3 text-xs text-slate-100">
{`npm run build
npm run serve:static`}
      </pre>
      <p className="mt-2 text-red-100/90">
        Then open <strong>http://localhost:3000/planner/</strong> in Chrome.
      </p>
    </div>
  );
}
