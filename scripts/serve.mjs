import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon"
};

function safePath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  return normalize(pathname).replace(/^(\.\.[/\\])+/, "");
}

async function tryFile(p) {
  try {
    const s = await stat(p);
    if (s.isFile()) return p;
  } catch {}
  return null;
}

async function resolveFile(url) {
  const path = safePath(url);
  if (path === "/" || path === "") return resolve(root, "docs/index.html");

  // 1. Try as-is from project root (preserves /dist/, /benchmarks/, /examples/, /docs/, etc.)
  const direct = resolve(root, path.replace(/^\//, ""));
  if (direct.startsWith(root) && await tryFile(direct)) return direct;

  // 2. Fallback: serve from docs/
  const inDocs = resolve(root, "docs", path.replace(/^\//, ""));
  if (inDocs.startsWith(root) && await tryFile(inDocs)) return inDocs;

  return null;
}

const server = createServer(async (request, response) => {
  const file = await resolveFile(request.url);

  if (!file) {
    // Serve docs/404.html if available, with a 404 status.
    const fallback = resolve(root, "docs/404.html");
    if (await tryFile(fallback)) {
      response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      createReadStream(fallback).pipe(response);
      return;
    }
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": types[extname(file)] || "application/octet-stream",
    "cache-control": "no-cache"
  });
  createReadStream(file).pipe(response);
});

server.listen(port, () => {
  console.log(`Serving http://127.0.0.1:${port}`);
});
