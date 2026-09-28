// Aperçu local : sert dist/ sous /maison-sable/ comme GitHub Pages. Usage : npm run serve
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { BASE } from "./config.mjs";

const dist = fileURLToPath(new URL("../dist", import.meta.url));
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };
const port = Number(process.env.PORT || 4321);

createServer(async (req, res) => {
  const chemin = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (!chemin.startsWith(BASE)) { res.writeHead(302, { Location: BASE + "/" }); return res.end(); }
  let f = join(dist, chemin.slice(BASE.length));
  try {
    if ((await stat(f)).isDirectory()) {
      if (!chemin.endsWith("/")) { res.writeHead(301, { Location: chemin + "/" + new URL(req.url, "http://x").search }); return res.end(); }
      f = join(f, "index.html");
    }
    // Comme GitHub Pages : compression gzip des fichiers texte
    let corps = await readFile(f); const entetes = { "Content-Type": types[extname(f)] || "application/octet-stream", "Cache-Control": "no-cache" };
    if (/gzip/.test(req.headers["accept-encoding"] || "") && /\.(html|css|js|json|svg|xml|txt)$/.test(f)) { corps = gzipSync(corps); entetes["Content-Encoding"] = "gzip"; }
    res.writeHead(200, entetes); res.end(corps);
  } catch {
    res.writeHead(404, { "Content-Type": types[".html"] });
    res.end(await readFile(join(dist, "404.html")));
  }
}).listen(port, () => console.log(`Aperçu : http://localhost:${port}${BASE}/`));
