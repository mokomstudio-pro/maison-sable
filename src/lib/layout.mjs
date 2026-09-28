// Gabarit commun : <head>, bandeau fictif, en-tête, pied de page, tiroirs (menu, panier, recherche).
import { url, absolue, NOINDEX, MOKOM_URL } from "../config.mjs";
import { esc, t } from "./html.mjs";

export const lien = (href) => (/^(https?:|mailto:|#)/.test(href) ? href : url(href));
export const tx = (s) => t(s, { lien });

const icone = {
  loupe: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  panier: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M4 8h16l-1.4 11.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  fermer: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};
export { icone };

const menu = [
  ["/collections/biscuits", "Biscuits"],
  ["/collections/coffrets-cadeaux", "Coffrets & cadeaux"],
  ["/pages/atelier-hossegor", "L'atelier"],
  ["/pages/faq", "FAQ"],
];

export const logo = (balise = "a") =>
  balise === "a"
    ? `<a class="logo" href="${url("/")}" aria-label="Maison Sable, accueil"><span class="logo-nom">Maison Sable</span><span class="logo-lieu">Hossegor</span></a>`
    : `<span class="logo"><span class="logo-nom">Maison Sable</span><span class="logo-lieu">Hossegor</span></span>`;

export function filAriane(etapes) {
  // etapes : [[libellé, chemin], ..., [libellé courant]]
  const items = etapes
    .map(([nom, href], i) =>
      i === etapes.length - 1 ? `<li><span aria-current="page">${esc(nom)}</span></li>` : `<li><a href="${url(href)}">${esc(nom)}</a></li>`,
    )
    .join("");
  return `<nav class="ariane" aria-label="Fil d'Ariane"><ol>${items}</ol></nav>`;
}

export const jsonLdAriane = (etapes) => ({
  "@type": "BreadcrumbList",
  itemListElement: etapes.map(([nom, href], i) => ({ "@type": "ListItem", position: i + 1, name: nom, ...(href ? { item: absolue(href) } : {}) })),
});

export const frise = (type = "vagues") => `<div class="frise frise-${type}" aria-hidden="true"></div>`;

export function page({ chemin, titre, description, h1Logo = false, corps, indexable = true, jsonLd = [], classe = "", ogType = "website", precharger = [] }) {
  const robots = NOINDEX || !indexable ? '<meta name="robots" content="noindex">' : "";
  const ld = jsonLd.length ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd }).replace(/</g, "\\u003c")}</script>` : "";
  const nav = menu.map(([href, nom]) => `<li><a href="${url(href)}"${chemin.startsWith(href) ? ' aria-current="page"' : ""}>${esc(nom)}</a></li>`).join("");
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titre)}</title>
<meta name="description" content="${esc(description)}">
${robots}
<link rel="canonical" href="${absolue(chemin)}">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Maison Sable">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${absolue(chemin)}">
<meta property="og:image" content="${absolue("/images/partage.png")}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F3E4CC">
<link rel="icon" href="${url("/images/favicon.svg")}" type="image/svg+xml">
<link rel="preload" href="${url("/assets/fonts/big-shoulders-display-800.woff2")}" as="font" type="font/woff2" crossorigin>
${precharger.join("\n")}
<link rel="stylesheet" href="${url("/assets/maison-sable.css")}">
<script>document.documentElement.classList.add("js")</script>
<script type="module" src="${url("/assets/boutique.js")}"></script>
${ld}
</head>
<body class="${classe}" data-base="${url("")}">
<a class="evitement" href="#contenu">Aller au contenu</a>
<p class="bandeau-fiction">Boutique fictive, étude de cas Mokom Studio&#8239;: aucune commande n'est expédiée. <a href="${url("/pages/etude-de-cas")}" data-evenement="mokom_case_study_click" data-emplacement="bandeau">Découvrir le projet</a></p>
<header class="entete" data-entete>
  <div class="entete-int">
    <button class="bouton-icone menu-ouvrir js-seul" type="button" aria-haspopup="dialog" aria-controls="menu-mobile" data-ouvre="menu-mobile">${icone.menu}<span class="visuellement-cache">Menu</span></button>
    ${h1Logo ? logo("span") : logo()}
    <nav class="nav-principale" aria-label="Menu principal"><ul>${nav}</ul></nav>
    <div class="entete-actions">
      <a class="bouton-icone" href="${url("/search")}" data-ouvre="recherche" aria-haspopup="dialog">${icone.loupe}<span class="visuellement-cache">Rechercher</span></a>
      <a class="bouton-icone bouton-panier" href="${url("/cart")}" data-ouvre="panier" aria-haspopup="dialog">${icone.panier}<span class="visuellement-cache">Panier, </span><span class="pastille-panier" data-compte-panier>0</span><span class="visuellement-cache"> article(s)</span></a>
    </div>
  </div>
</header>
<main id="contenu" tabindex="-1">
${corps}
</main>
${piedDePage()}
${tiroirs()}
<div class="annonce visuellement-cache" aria-live="polite" data-annonce></div>
</body>
</html>`;
}

function piedDePage() {
  const col = (titre, liens) => `<div class="pied-col"><h2>${esc(titre)}</h2><ul>${liens.map(([h, n]) => `<li><a href="${url(h)}">${esc(n)}</a></li>`).join("")}</ul></div>`;
  return `<footer class="pied">
  ${frise("vagues")}
  <div class="pied-int">
    <div class="pied-marque">${logo("span")}
      <form class="lettre" data-formulaire="lettre" novalidate>
        <h2>Des nouvelles de l'atelier</h2>
        <p>Les nouvelles recettes et les dates de Noël, une fois par saison.</p>
        <label for="lettre-email">Votre e-mail</label>
        <div class="champ-ligne"><input id="lettre-email" name="email" type="email" autocomplete="email" required><button class="bouton bouton-secondaire" type="submit">M'inscrire</button></div>
        <p class="erreur-champ" id="lettre-email-erreur" hidden></p>
        <p class="confirmation" role="status" hidden>Simulation&#8239;: aucune adresse n'est enregistrée.</p>
      </form>
    </div>
    ${col("Boutique", [["/collections/biscuits", "Biscuits"], ["/collections/coffrets-cadeaux", "Coffrets & cadeaux"], ["/products/carte-cadeau", "Carte cadeau"]])}
    ${col("Maison Sable", [["/pages/atelier-hossegor", "L'atelier à Hossegor"], ["/blogs/journal", "Journal"], ["/pages/contact", "Contact"]])}
    ${col("Aide", [["/pages/faq", "Questions fréquentes"], ["/policies/shipping-policy", "Livraison"], ["/policies/refund-policy", "Retours et rétractation"]])}
    ${col("Informations légales", [["/policies/legal-notice", "Mentions légales"], ["/policies/terms-of-service", "CGV"], ["/policies/privacy-policy", "Confidentialité"], ["/pages/retractation", "Annuler ma commande"]])}
  </div>
  <p class="pied-gravure">Biscuits faits à Hossegor · Projet fictif, étude de cas <a href="${url("/pages/etude-de-cas")}" data-evenement="mokom_case_study_click" data-emplacement="pied">Mokom Studio</a></p>
</footer>`;
}

function tiroirs() {
  return `<dialog class="tiroir tiroir-gauche" id="menu-mobile" aria-label="Menu">
  <div class="tiroir-tete"><span class="tiroir-titre">Menu</span><button class="bouton-icone" type="button" data-ferme>${icone.fermer}<span class="visuellement-cache">Fermer le menu</span></button></div>
  <nav aria-label="Menu mobile"><ul class="menu-mobile">${menu.map(([h, n]) => `<li><a href="${url(h)}">${esc(n)}</a></li>`).join("")}<li><a href="${url("/pages/contact")}">Contact</a></li></ul></nav>
</dialog>
<dialog class="tiroir tiroir-droite" id="panier" aria-labelledby="panier-titre">
  <div class="tiroir-tete"><h2 class="tiroir-titre" id="panier-titre" tabindex="-1">Votre panier</h2><button class="bouton-icone" type="button" data-ferme>${icone.fermer}<span class="visuellement-cache">Fermer le panier</span></button></div>
  <div class="panier-corps" data-panier-corps></div>
</dialog>
<dialog class="tiroir tiroir-haut" id="recherche" aria-label="Rechercher">
  <form class="recherche-form" action="${url("/search")}" role="search">
    <label for="recherche-champ">Rechercher un biscuit ou un coffret</label>
    <div class="champ-ligne"><input id="recherche-champ" name="q" type="search" autocomplete="off" aria-controls="recherche-suggestions"><button class="bouton" type="submit">Rechercher</button></div>
  </form>
  <div id="recherche-suggestions" class="recherche-suggestions" data-suggestions aria-live="polite"></div>
  <button class="bouton-icone recherche-fermer" type="button" data-ferme>${icone.fermer}<span class="visuellement-cache">Fermer la recherche</span></button>
</dialog>`;
}

export const lienMokom = (texte, emplacement, classe = "") =>
  `<a class="${classe}" href="${MOKOM_URL}" data-evenement="mokom_case_study_click" data-emplacement="${emplacement}">${esc(texte)}</a>`;
