#!/usr/bin/env python3
"""Simple static server for the out/ folder with correct PWA MIME types."""

from __future__ import annotations

import functools
import http.server
import os
import socketserver
from pathlib import Path

OUT_DIR = Path(__file__).resolve().parent.parent / "out"
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "3000"))

MIME_OVERRIDES = {
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".json": "application/json",
    ".webmanifest": "application/manifest+json",
    ".css": "text/css",
    ".html": "text/html",
    ".png": "image/png",
    ".svg": "image/svg+xml",
}


class StaticHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(OUT_DIR), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        if self.path.endswith("/sw.js"):
            self.send_header("Service-Worker-Allowed", "/")
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def guess_type(self, path: str) -> str:
        ext = Path(path).suffix.lower()
        if ext in MIME_OVERRIDES:
            return MIME_OVERRIDES[ext]
        return super().guess_type(path)

    def do_GET(self) -> None:
        requested = self.path.split("?", 1)[0]
        target = OUT_DIR / requested.lstrip("/")

        if requested.endswith("/") and target.is_dir():
            index = target / "index.html"
            if index.exists():
                self.path = str(index.relative_to(OUT_DIR)).replace(os.sep, "/")
        elif target.is_dir():
            index = target / "index.html"
            if index.exists():
                self.path = f"{requested.rstrip('/')}/index.html"

        return super().do_GET()


def main() -> None:
    if not OUT_DIR.exists():
        raise SystemExit("Missing out/ folder. Run `npm run build` first.")

    handler = functools.partial(StaticHandler)
    with socketserver.TCPServer((HOST, PORT), handler) as httpd:
        print("")
        print("Bleisure static server (Python)")
        print("-------------------------------")
        print(f"Local:   http://localhost:{PORT}/")
        print(f"Planner: http://localhost:{PORT}/planner/")
        print("Use http://localhost — not file://")
        print("")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
