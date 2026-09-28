// Télécharge les photos d'illustration (docs/catalogue/photos.json) depuis le CDN Unsplash,
// recadrées et au format WebP, dans src/images/photos/. Usage : node scripts/photos.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const P = JSON.parse(readFileSync("docs/catalogue/photos.json", "utf8"));
const dossier = "src/images/photos";
mkdirSync(dossier, { recursive: true });

// Formats : produit 4:5, scène d'accueil 16:9 (ordinateur) et 4:5 (mobile), atelier 3:2
const taches = [];
for (const [h, photos] of Object.entries(P.produits))
  photos.forEach((p, i) => { for (const w of [480, 800]) taches.push([p.id, `${h}-${i + 1}-${w}.webp`, w, Math.round((w * 5) / 4)]); });
const s = P.scenes;
for (const w of [960, 1600]) taches.push([s.accueil.id, `accueil-large-${w}.webp`, w, Math.round((w * 9) / 16)]);
for (const w of [480, 640, 800]) taches.push([s.accueil.id, `accueil-haut-${w}.webp`, w, Math.round((w * 5) / 4)]);
for (const w of [800, 1200]) { taches.push([s.atelier.id, `atelier-${w}.webp`, w, Math.round((w * 2) / 3)]); taches.push([s["atelier-petrir"].id, `atelier-petrir-${w}.webp`, w, Math.round((w * 2) / 3)]); }

let n = 0;
for (const [id, nom, w, h] of taches) {
  const f = `${dossier}/${nom}`;
  if (existsSync(f)) continue;
  const q = nom.startsWith("accueil-haut-640") ? 55 : nom.startsWith("accueil") ? 62 : 72; // image principale : ≤ 150 Ko
  const url = `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&fm=webp&q=${q}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${nom} : HTTP ${r.status}`);
  writeFileSync(f, Buffer.from(await r.arrayBuffer()));
  n++;
}
console.log(`✓ ${taches.length} fichiers (${n} téléchargés) dans ${dossier}`);
