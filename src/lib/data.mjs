// Chargement des sources uniques du projet (docs/catalogue, docs/seo, docs/08-contenus).
import { readFileSync } from "node:fs";

const lire = (f) => readFileSync(new URL("../../" + f, import.meta.url), "utf8").replace(/^﻿/, "");
const csv = (f) => {
  const [entete, ...lignes] = lire(f).trim().split(/\r?\n/);
  const cols = entete.split(";");
  return lignes.map((l) => Object.fromEntries(l.split(";").map((v, i) => [cols[i], v.trim()])));
};
const liste = (s) => (s ? s.split("|") : []);

export const livraison = JSON.parse(lire("docs/catalogue/livraison.json"));
export const merch = JSON.parse(lire("docs/catalogue/merchandising.json"));
export const nutrition = JSON.parse(lire("docs/catalogue/nutrition.json"));
export const photos = JSON.parse(lire("docs/catalogue/photos.json"));
export const metas = Object.fromEntries(csv("docs/seo/metas.csv").map((m) => [m.url, m]));

// Textes rédigés des fiches (docs/08-contenus/fiches-produits.md)
function textesFiches() {
  const md = lire("docs/08-contenus/fiches-produits.md");
  const out = {};
  for (const bloc of md.split(/^## /m).slice(1)) {
    const handle = bloc.split(/\r?\n/)[0].trim();
    if (!/^[a-z0-9-]+$/.test(handle)) continue;
    const section = (titre) => {
      const m = bloc.match(new RegExp("\\*\\*" + titre + "\\*\\*[^\\n]*\\n([\\s\\S]*?)(?=\\n\\*\\*|\\n---|$)"));
      return m ? m[1].trim() : "";
    };
    const puces = (s) => s.split(/\r?\n/).filter((l) => /^(-|\d+\.)\s/.test(l)).map((l) => l.replace(/^(-|\d+\.)\s+/, "").trim());
    out[handle] = {
      presentation: section("Présentation"),
      enBref: puces(section("En bref")),
      degustation: section("Dégustation et conservation") || section("Utilisation"),
      degustationTitre: section("Dégustation et conservation") ? "Conseils de dégustation et de conservation" : "Utilisation",
      questions: puces(section("Questions")).map((q) => {
        const m = q.match(/^\*(.+?)\*\s+([\s\S]*)$/);
        return m ? { q: m[1].trim(), r: m[2].trim() } : { q, r: "" };
      }),
      alts: puces(section("Images \\(alt\\)")),
    };
  }
  return out;
}
const textes = textesFiches();

const variantes = csv("docs/catalogue/variantes.csv").map((v) => ({
  ...v,
  prix: Number(v.prix),
  poids_net_g: v.poids_net_g ? Number(v.poids_net_g) : null,
  nb_biscuits: v.nb_biscuits ? Number(v.nb_biscuits) : null,
  stock: v.stock ? Number(v.stock) : null,
}));

export const produits = csv("docs/catalogue/produits.csv").map((p) => {
  const vs = variantes.filter((v) => v.handle === p.handle);
  return {
    ...p,
    occasions: liste(p.occasions),
    allergenes: liste(p.allergenes),
    traces: liste(p.traces),
    produits_lies: liste(p.produits_lies),
    conservation_jours: p.conservation_jours ? Number(p.conservation_jours) : null,
    variantes: vs,
    prixMin: Math.min(...vs.map((v) => v.prix)),
    epuise: vs.every((v) => v.stock === 0),
    alimentaire: p.type !== "Carte cadeau",
    cadeau: liste(p.occasions).includes("Cadeau") && p.format !== "Sachet",
    textes: textes[p.handle],
    nutrition: nutrition[p.handle] || null,
    photos: photos.produits[p.handle] || [],
    meta: metas["/products/" + p.handle],
  };
});

export const produit = (h) => produits.find((p) => p.handle === h);

// Économie réelle du grand format (2 × petit − grand), ou du coffret face à ses composants.
export function economie(p, v) {
  if (p.variantes.length === 2 && v === p.variantes[1] && v.poids_net_g === 2 * p.variantes[0].poids_net_g) {
    const e = 2 * p.variantes[0].prix - v.prix;
    return e > 0 ? { montant: e, texte: `de moins que 2 ${p.format === "Boîte" ? "boîtes" : "sachets"}` } : null;
  }
  if (p.handle === "coffret-ete-indien") {
    const comp = produit("boite-grande-plage").variantes[0].prix + produit("sable-pignada").variantes[0].prix + produit("croquant-lagune").variantes[0].prix;
    const e = comp - v.prix;
    return e > 0 ? { montant: e, texte: "de moins que les trois produits achetés séparément" } : null;
  }
  return null;
}

export const collections = {
  biscuits: { handle: "biscuits", titre: "Biscuits", meta: metas["/collections/biscuits"], ordre: merch.collections.biscuits.ordre, bloc: merch.collections.biscuits.bloc_editorial },
  "coffrets-cadeaux": { handle: "coffrets-cadeaux", titre: "Coffrets & cadeaux", meta: metas["/collections/coffrets-cadeaux"], ordre: merch.collections["coffrets-cadeaux"].ordre, bloc: merch.collections["coffrets-cadeaux"].bloc_editorial },
};

// Contenus des pages : lecture brute d'un fichier de docs/08-contenus
export const contenu = (f) => lire("docs/08-contenus/" + f);
