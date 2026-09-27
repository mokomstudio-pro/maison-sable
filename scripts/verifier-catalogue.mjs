// Vérifie le catalogue (docs/catalogue/produits.csv + variantes.csv) :
// doublons, champs obligatoires vides, valeurs hors dictionnaire, variantes orphelines.
// Usage : node scripts/verifier-catalogue.mjs
import { readFileSync } from "node:fs";

const DICO = {
  type: ["Sablé", "Palet", "Croquant", "Boîte assortie", "Coffret", "Carte cadeau"],
  format: ["Sachet", "Boîte", "Coffret", "Carte cadeau"],
  saveur: ["Beurre & fleur de sel", "Caramel", "Chocolat", "Agrumes & herbes", "Amandes & pignons", "Coco & vanille", "Assortiment"],
  texture: ["Fondant", "Croquant", "Épais", "Mixte"],
  occasions: ["Goûter", "Cadeau", "Souvenir", "Pique-nique"],
  // Les 14 allergènes majeurs (règlement UE 1169/2011, annexe II)
  allergenes: ["Gluten", "Crustacés", "Œufs", "Poissons", "Arachides", "Soja", "Lait", "Fruits à coque", "Céleri", "Moutarde", "Sésame", "Sulfites", "Lupin", "Mollusques"],
  collection_principale: ["biscuits", "coffrets-cadeaux"],
  option_nom: ["Poids", "Taille", "Montant"],
};
DICO.traces = DICO.allergenes;
const MULTI = ["occasions", "allergenes", "traces"];
const OBLIGATOIRES_ALIMENTAIRE = ["saveur", "texture", "ingredients", "allergenes", "conservation_jours", "conservation_conseil"];

const lire = (f) => {
  const [entete, ...lignes] = readFileSync(f, "utf8").replace(/^﻿/, "").trim().split(/\r?\n/);
  const cols = entete.split(";");
  return lignes.map((l, i) => {
    const v = l.split(";");
    if (v.length !== cols.length) erreur(`${f} ligne ${i + 2} : ${v.length} colonnes au lieu de ${cols.length}`);
    return Object.fromEntries(cols.map((c, j) => [c, (v[j] ?? "").trim()]));
  });
};

const erreurs = [];
const erreur = (m) => erreurs.push(m);

const produits = lire("docs/catalogue/produits.csv");
const variantes = lire("docs/catalogue/variantes.csv");
const handles = new Set();

for (const p of produits) {
  const h = p.handle;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(h)) erreur(`${h} : handle invalide (minuscules, chiffres, tirets)`);
  if (handles.has(h)) erreur(`${h} : handle en double`);
  handles.add(h);
  for (const c of ["titre", "type", "format", "occasions", "collection_principale"]) if (!p[c]) erreur(`${h} : « ${c} » vide`);
  if (p.type !== "Carte cadeau") for (const c of OBLIGATOIRES_ALIMENTAIRE) if (!p[c]) erreur(`${h} : « ${c} » vide (obligatoire pour un produit alimentaire)`);
  for (const [c, valeurs] of Object.entries(DICO)) {
    if (!(c in p) || !p[c]) continue;
    const liste = MULTI.includes(c) ? p[c].split("|") : [p[c]];
    for (const v of liste) if (!valeurs.includes(v)) erreur(`${h} : « ${v} » n'est pas une valeur autorisée pour ${c}`);
  }
  const allerg = p.allergenes ? p.allergenes.split("|") : [];
  for (const t of p.traces ? p.traces.split("|") : []) if (allerg.includes(t)) erreur(`${h} : « ${t} » est à la fois allergène et trace`);
}
for (const p of produits) for (const l of p.produits_lies ? p.produits_lies.split("|") : []) if (!handles.has(l)) erreur(`${p.handle} : produit lié inconnu « ${l} »`);

const skus = new Set();
const avecVariante = new Set();
for (const v of variantes) {
  if (!handles.has(v.handle)) erreur(`${v.sku} : produit « ${v.handle} » inexistant`);
  avecVariante.add(v.handle);
  if (skus.has(v.sku)) erreur(`${v.sku} : SKU en double`);
  skus.add(v.sku);
  if (!DICO.option_nom.includes(v.option_nom)) erreur(`${v.sku} : option « ${v.option_nom} » hors dictionnaire`);
  if (!/^\d+\.\d{2}$/.test(v.prix)) erreur(`${v.sku} : prix « ${v.prix} » invalide (format 12.50)`);
  if (v.prix_barre && !(Number(v.prix_barre) > Number(v.prix))) erreur(`${v.sku} : prix barré inférieur ou égal au prix`);
}
for (const h of handles) if (!avecVariante.has(h)) erreur(`${h} : aucune variante`);
for (const p of produits) {
  const opts = new Set(variantes.filter((v) => v.handle === p.handle).map((v) => v.option_nom));
  if (opts.size > 1) erreur(`${p.handle} : plusieurs noms d'option (${[...opts].join(", ")})`);
}

if (erreurs.length) {
  console.log(`✗ ${erreurs.length} problème(s) :\n- ` + erreurs.join("\n- "));
  process.exit(1);
}
console.log(`✓ Catalogue valide : ${produits.length} produits, ${variantes.length} variantes.`);
