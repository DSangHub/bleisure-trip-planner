#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "out");
const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 3000);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

function resolveFilePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = decoded.replace(/^\/+/, "");
  let filePath = path.join(OUT_DIR, relativePath);

  if (!filePath.startsWith(OUT_DIR)) {
    return null;
  }

  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const indexPath = path.join(filePath, "index.html");
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
      return null;
    }
    return filePath;
  }

  if (relativePath.endsWith("/")) {
    const indexPath = path.join(filePath, "index.html");
    if (fs.existsSync(indexPath)) {
      return indexPath;
    }
  }

  const htmlPath = `${filePath}.html`;
  if (fs.existsSync(htmlPath)) {
    return htmlPath;
  }

  return null;
}

function getHeaders(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const headers = {
    "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=0, must-revalidate",
  };

  if (path.basename(filePath) === "sw.js") {
    headers["Service-Worker-Allowed"] = "/";
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
  }

  if (ext === ".webmanifest") {
    headers["Content-Type"] = "application/manifest+json; charset=utf-8";
  }

  return headers;
}

function sendFile(res, filePath) {
  const stream = fs.createReadStream(filePath);
  res.writeHead(200, getHeaders(filePath));
  stream.pipe(res);
  stream.on("error", () => {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Failed to read file.");
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  let pathname = url.pathname;

  if (pathname === "/") {
    pathname = "/index.html";
  }

  const filePath = resolveFilePath(pathname);
  if (!filePath) {
    const offlinePath = path.join(OUT_DIR, "offline.html");
    if (fs.existsSync(offlinePath) && req.headers.accept?.includes("text/html")) {
      sendFile(res, offlinePath);
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  sendFile(res, filePath);
});

if (!fs.existsSync(OUT_DIR)) {
  console.error("Missing out/ folder. Run `npm run build` first.");
  process.exit(1);
}

server.listen(PORT, HOST, () => {
  console.log("");
  console.log("Bleisure Trip Planner static server");
  console.log("-----------------------------------");
  console.log(`Local:   http://localhost:${PORT}/`);
  console.log(`Planner: http://localhost:${PORT}/planner/`);
  console.log(`Network: http://${HOST === "0.0.0.0" ? "127.0.0.1" : HOST}:${PORT}/`);
  console.log("");
  console.log("Chromebook: use http://localhost (not file://) inside Linux/Crostini.");
  console.log("Do NOT open out/index.html directly from Files.");
  console.log("");
});
