// Composants de la boutique : alvéole + étiquette produit, boutons d'ajout, données pour le panier.
import { url } from "../config.mjs";
import { esc, prix, typo } from "./html.mjs";
const insecable = (s) => typo(esc(s)).replace(/ (€|g)\b/g, "\u00A0$1");
import { economie } from "./data.mjs";

// Photo d'illustration (docs/catalogue/photos.json) ; la carte cadeau garde son visuel dessiné
export const imageProduit = (h, n = 1, w = 800) => (h === "carte-cadeau" ? url(`/images/produits/carte-cadeau-1.svg`) : url(`/images/photos/${h}-${n}-${w}.webp`));
export const srcsetProduit = (h, n = 1) => (h === "carte-cadeau" ? "" : `${imageProduit(h, n, 480)} 480w, ${imageProduit(h, n, 800)} 800w`);

const saveurCourte = (p) => (p.type === "Carte cadeau" ? "Montant au choix" : p.saveur === "Assortiment" ? `${p.format} assorti${p.format === "Boîte" ? "e" : ""}` : p.saveur);
const poidsCourts = (p) => (p.type === "Carte cadeau" ? p.variantes.map((v) => v.option_valeur).join(" · ") : p.variantes.map((v) => (v.option_valeur === "Unique" ? `${v.poids_net_g} g` : v.option_valeur)).join(" · "));

// Données d'une variante pour le panier (lues par boutique.js)
export const donneesVariante = (p, v) => ({
  sku: v.sku, handle: p.handle, nom: p.titre.split(/,| au | aux | à la | à l'/)[0].trim(), titre: p.titre,
  variante: v.option_valeur === "Unique" ? "" : v.option_valeur, prix: v.prix, image: imageProduit(p.handle),
  cadeau: p.cadeau || p.type === "Carte cadeau", categorie: p.collection_principale, format: p.format,
});

export function boutonAjout(p, liste) {
  if (p.epuise) return `<button class="bouton bouton-petit" type="button" disabled>Épuisé</button>`;
  if (p.variantes.length === 1) {
    const d = donneesVariante(p, p.variantes[0]);
    return `<button class="bouton bouton-petit js-seul" type="button" data-ajout='${esc(JSON.stringify(d))}' data-liste="${liste}">Ajouter<span class="visuellement-cache"> ${esc(d.nom)} au panier</span></button>`;
  }
  const choix = p.variantes
    .map((v) => {
      const d = donneesVariante(p, v);
      return `<button class="choix-rapide" type="button" data-ajout='${esc(JSON.stringify(d))}' data-liste="${liste}">${esc(v.option_valeur)} · ${prix(v.prix)}</button>`;
    })
    .join("");
  return `<div class="ajout-rapide js-seul" data-ajout-rapide>
    <button class="bouton bouton-petit" type="button" aria-expanded="false" data-ouvre-choix>Ajouter<span class="visuellement-cache"> ${esc(p.titre)}, choisir le ${p.variantes[0].option_nom.toLowerCase()}</span></button>
    <div class="choix-rapides" role="group" aria-label="${esc(p.variantes[0].option_nom)}" hidden>${choix}</div>
  </div>`;
}

export function carteProduit(p, { liste, niveauTitre = 3, chargement = "lazy" } = {}) {
  const pastilles = [
    p.cadeau || p.type === "Carte cadeau" ? '<span class="pastille pastille-cadeau">Cadeau</span>' : "",
    p.allergenes.includes("Fruits à coque") ? '<span class="pastille pastille-info">Fruits à coque</span>' : "",
  ].join("");
  const eco = p.variantes.map((v) => economie(p, v)).find(Boolean);
  const ecoTexte = p.handle === "coffret-ete-indien" && eco ? `<span class="etiq-eco">${typo(prix(eco.montant) + " de moins qu'à l'unité")}</span>` : "";
  const prixTexte = (p.variantes.length > 1 && p.type !== "Carte cadeau" ? "dès " : p.type === "Carte cadeau" ? "de " : "") + prix(p.prixMin);
  const h = `h${niveauTitre}`;
  if (p.epuise)
    return `<article class="carte carte-epuisee" data-produit="${p.handle}" data-saveur="${esc(p.saveur)}" data-format="${esc(p.format)}" data-prix="${p.prixMin}">
  <div class="alveole alveole-vide"><span>Revient bientôt</span></div>
  <div class="etiquette-produit"><${h} class="etiq-nom"><a href="${url("/products/" + p.handle)}">${esc(p.titre.split(",")[0])}</a></${h}><span class="etiq-saveur">${esc(saveurCourte(p))}</span><span class="etiq-prix">${prixTexte}</span><span class="etiq-poids">${insecable(poidsCourts(p))}</span></div>
  ${boutonAjout(p, liste)}
</article>`;
  return `<article class="carte" data-produit="${p.handle}" data-saveur="${esc(p.saveur)}" data-format="${esc(p.format)}" data-prix="${p.prixMin}">
  <a class="alveole" href="${url("/products/" + p.handle)}" tabindex="-1" aria-hidden="true" data-selection='${esc(JSON.stringify({ liste, handle: p.handle }))}'>
    ${pastilles ? `<span class="pastilles">${pastilles}</span>` : ""}
    <img src="${imageProduit(p.handle)}"${srcsetProduit(p.handle) ? ` srcset="${srcsetProduit(p.handle)}" sizes="(min-width: 1024px) 380px, 46vw"` : ""} alt="" width="800" height="1000" loading="${chargement}" decoding="async">
    ${p.photos.length > 1 ? `<img class="alveole-survol" src="${imageProduit(p.handle, 2)}" srcset="${srcsetProduit(p.handle, 2)}" sizes="(min-width: 1024px) 380px, 46vw" alt="" width="800" height="1000" loading="lazy" decoding="async">` : ""}
  </a>
  <div class="etiquette-produit">
    <${h} class="etiq-nom"><a href="${url("/products/" + p.handle)}" data-selection='${esc(JSON.stringify({ liste, handle: p.handle }))}'>${esc(p.titre.split(",")[0].replace(/ (au|aux|à la|à l') .*$/, ""))}</a></${h}>
    <span class="etiq-saveur">${esc(saveurCourte(p))}</span>
    <span class="etiq-prix">${prixTexte}</span>
    <span class="etiq-poids">${insecable(poidsCourts(p))}</span>
    ${ecoTexte}
  </div>
  ${boutonAjout(p, liste)}
</article>`;
}

export const grille = (produits, opts) => `<div class="grille-produits">${produits.map((p) => carteProduit(p, opts)).join("")}</div>`;
