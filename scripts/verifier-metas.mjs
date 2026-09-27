// Vérifie docs/seo/metas.csv : longueurs (title 30–60, recommandé 50–60 ; description 140–160),
// doublons de title, de description et de h1, h1 identique au title.
// Usage : node scripts/verifier-metas.mjs
import { readFileSync } from "node:fs";

const [entete, ...lignes] = readFileSync("docs/seo/metas.csv", "utf8").replace(/^﻿/, "").trim().split(/\r?\n/);
const cols = entete.split(";");
const pages = lignes.map((l) => Object.fromEntries(l.split(";").map((v, i) => [cols[i], v.trim()])));
const len = (s) => [...s].length;

const erreurs = [];
const avertissements = [];
const vus = { title: new Map(), meta_description: new Map(), h1: new Map() };

for (const p of pages) {
  const t = len(p.title), d = len(p.meta_description);
  if (t < 30 || t > 60) erreurs.push(`${p.url} : title ${t} car. (30–60)`);
  else if (t < 50) avertissements.push(`${p.url} : title ${t} car. (recommandé 50–60)`);
  if (d < 140 || d > 160) erreurs.push(`${p.url} : description ${d} car. (140–160)`);
  if (!p.h1) erreurs.push(`${p.url} : h1 vide`);
  if (p.h1 && p.h1 === p.title) avertissements.push(`${p.url} : h1 identique au title`);
  for (const c of Object.keys(vus)) {
    if (vus[c].has(p[c])) erreurs.push(`${p.url} : ${c} identique à ${vus[c].get(p[c])}`);
    vus[c].set(p[c], p.url);
  }
}

for (const p of pages) console.log(`${String(len(p.title)).padStart(3)} | ${String(len(p.meta_description)).padStart(3)} | ${p.url}`);
if (avertissements.length) console.log(`\n⚠ ${avertissements.length} avertissement(s) :\n- ` + avertissements.join("\n- "));
if (erreurs.length) {
  console.log(`\n✗ ${erreurs.length} problème(s) :\n- ` + erreurs.join("\n- "));
  process.exit(1);
}
console.log(`\n✓ ${pages.length} pages : longueurs conformes, aucun doublon.`);
