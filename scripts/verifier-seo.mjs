// Contrôle SEO technique du site construit (dist/). Usage : npm run build && node scripts/verifier-seo.mjs
// Vérifie chaque page : lang, un seul h1, niveaux de titres, title / description (conformes à docs/seo/metas.csv),
// canonical absolu et auto-référent, robots noindex, Open Graph, images (alt, dimensions), liens internes,
// JSON-LD (syntaxe, types attendus, pas d'avis), plan du site (pages indexables par conception uniquement).
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { BASE, SITE_URL, NOINDEX } from "../src/config.mjs";

const dist = "dist";
const erreurs = [], notes = [];
const err = (p, m) => erreurs.push(`${p} : ${m}`);

const fichiers = [];
(function parcourir(d) { for (const f of readdirSync(d)) { const c = join(d, f); if (statSync(c).isDirectory()) parcourir(c); else if (f.endsWith(".html") && f !== "partage-gabarit.html") fichiers.push(c); } })(dist);
const chemin = (f) => { const r = "/" + relative(dist, f).replace(/\\/g, "/"); return r === "/index.html" ? "/" : r.endsWith("/index.html") ? r.slice(0, -11) : r; };

const metas = Object.fromEntries(readFileSync("docs/seo/metas.csv", "utf8").trim().split(/\r?\n/).slice(1).map((l) => { const [url, title, meta_description, h1] = l.split(";"); return [url, { title, meta_description, h1 }]; }));
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/[  ]/g, " ");
const texte = (h) => decode(h.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const existe = (href) => {
  const p = href.split(/[?#]/)[0];
  if (!p.startsWith(BASE)) return true;
  const r = p.slice(BASE.length) || "/";
  return existsSync(join(dist, r)) && statSync(join(dist, r)).isFile() || existsSync(join(dist, r, "index.html"));
};
const TYPES_ATTENDUS = (c) => c === "/" ? ["Organization", "WebSite"] : c.startsWith("/products/") ? ["BreadcrumbList", /Product|ProductGroup/] : c.startsWith("/collections/") && c !== "/collections/all" ? ["BreadcrumbList", "ItemList"] : c.startsWith("/blogs/journal/") ? ["Article", "BreadcrumbList"] : [];

const vus = { title: new Map(), desc: new Map() };
for (const f of fichiers) {
  const c = chemin(f), h = readFileSync(f, "utf8");
  if (!/<html lang="fr">/.test(h)) err(c, "lang=fr absent");
  const h1 = h.match(/<h1[\s>][\s\S]*?<\/h1>/g) || [];
  if (h1.length !== 1 && !c.startsWith("/checkout")) err(c, `${h1.length} h1`);
  // niveaux de titres sans saut (hors tiroirs du gabarit)
  const principal = h.split("<main")[1]?.split("</main>")[0] || "";
  let prec = 1;
  for (const m of principal.matchAll(/<h([1-6])[\s>]/g)) { const n = +m[1]; if (n > prec + 1) err(c, `saut de titre h${prec} → h${n}`); prec = n; }
  const title = texte(h.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "");
  const desc = decode(h.match(/<meta name="description" content="([^"]*)"/)?.[1] || "");
  if (!title) err(c, "title vide"); if (!desc) err(c, "description vide");
  const m = metas[c];
  if (m) {
    if (texte(m.title) !== title) err(c, `title différent de metas.csv (« ${title} »)`);
    if (texte(m.meta_description) !== desc) err(c, "description différente de metas.csv");
    if (h1[0] && texte(m.h1) !== texte(h1[0])) err(c, `h1 différent de metas.csv (« ${texte(h1[0])} »)`);
  }
  for (const [k, v] of [["title", title], ["desc", desc]]) { if (vus[k].has(v)) err(c, `${k} identique à ${vus[k].get(v)}`); vus[k].set(v, c); }
  const canon = h.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const attendu = SITE_URL + BASE + (c === "/" ? "/" : c);
  if (canon !== attendu) err(c, `canonical ${canon} ≠ ${attendu}`);
  const noindex = /<meta name="robots" content="noindex">/.test(h);
  if (NOINDEX && !noindex) err(c, "noindex absent (décision B)");
  for (const p of ["og:title", "og:description", "og:url", "og:image"]) if (!h.includes(`property="${p}"`)) err(c, `${p} absent`);
  for (const img of h.matchAll(/<img\b[^>]*>/g)) {
    const t = img[0];
    if (!/\salt="/.test(t)) err(c, `image sans alt : ${t.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(t) || !/\sheight="\d+"/.test(t)) err(c, `image sans dimensions : ${t.slice(0, 80)}`);
  }
  for (const a of h.matchAll(/\shref="([^"]+)"/g)) { const href = a[1]; if (href.startsWith(BASE) && !existe(href)) err(c, `lien cassé ${href}`); }
  // JSON-LD
  const blocs = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const types = [];
  for (const b of blocs) {
    let j; try { j = JSON.parse(b[1]); } catch { err(c, "JSON-LD illisible"); continue; }
    const graphe = j["@graph"] || [j];
    for (const n of graphe) {
      types.push(n["@type"]);
      const s = JSON.stringify(n);
      if (/aggregateRating|"review"/.test(s)) err(c, "note ou avis dans les données structurées (interdit : avis fictifs)");
      if (n["@type"] === "BreadcrumbList") n.itemListElement.forEach((e, i) => { if (e.position !== i + 1) err(c, "fil d'Ariane : positions"); if (i < n.itemListElement.length - 1 && !e.item) err(c, "fil d'Ariane : item manquant"); });
      if (/Product/.test(n["@type"])) {
        const offres = n.hasVariant ? n.hasVariant.map((v) => v.offers) : [].concat(n.offers);
        for (const o of offres) { if (!o || !o.price || o.priceCurrency !== "EUR" || !o.availability) err(c, "offre incomplète (prix, devise, disponibilité)"); }
        if (!n.image || !n.brand || !n.description) err(c, "Product : image, marque ou description manquante");
      }
    }
  }
  for (const t of TYPES_ATTENDUS(c)) if (!types.some((x) => (t instanceof RegExp ? t.test(x) : x === t))) err(c, `JSON-LD ${t} absent`);
}

// Plan du site
const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const nonIndexables = ["/cart", "/checkout", "/search", "/collections/all", "/pages/retractation", "/404.html"];
for (const l of locs) {
  const c = l.replace(SITE_URL + BASE, "") || "/";
  if (nonIndexables.includes(c)) err("sitemap", `page utilitaire listée : ${c}`);
  if (!existe(BASE + (c === "/" ? "/" : c))) err("sitemap", `adresse sans page : ${c}`);
}
for (const u of Object.keys(metas)) if (!locs.includes(SITE_URL + BASE + (u === "/" ? "/" : u))) err("sitemap", `page indexable absente : ${u}`);
if (!readFileSync(join(dist, "robots.txt"), "utf8").includes("Sitemap:")) err("robots.txt", "ligne Sitemap absente");
if (SITE_URL.includes("compte-github")) notes.push("SITE_URL est encore l'adresse provisoire : à remplacer par le compte GitHub de Mokom Studio avant la mise en ligne.");

console.log(`${fichiers.length} pages contrôlées, ${locs.length} adresses dans le plan du site.`);
notes.forEach((n) => console.log("ℹ " + n));
if (erreurs.length) { console.log(`✗ ${erreurs.length} problème(s) :\n- ` + erreurs.join("\n- ")); process.exit(1); }
console.log("✓ SEO technique conforme.");
