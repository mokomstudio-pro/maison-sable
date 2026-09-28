// Collections Biscuits et Coffrets & cadeaux (docs/08-contenus/collections.md, merchandising.json)
import { url, absolue } from "../config.mjs";
import { collections, produit, produits } from "../lib/data.mjs";
import { page, filAriane, jsonLdAriane, frise, tx } from "../lib/layout.mjs";
import { carteProduit } from "../lib/composants.mjs";
import { esc } from "../lib/html.mjs";
import { blocNoel } from "./communs.mjs";

const textes = {
  biscuits: {
    intro: "Les biscuits artisanaux de Maison Sable sont sept recettes pur beurre, façonnées à la main à Hossegor : sablés à la fleur de sel, au chocolat noir, aux pignons de pin, au citron ou à la noix de coco, palet au caramel beurre salé et croquant aux amandes. Sachets de 120 à 300 g, dès 6,90 €.",
    filtre: { nom: "saveur", legende: "Saveur" },
    bloc: `<aside class="bloc-grille" aria-labelledby="bloc-texture">
      <img src="${url("/images/coupe-sable-galette-palet.svg")}" alt="Illustration en coupe : galette fine, sablé moyen, palet épais" width="1200" height="560" loading="lazy" decoding="async">
      <h2 id="bloc-texture">Sablé, galette ou palet&#8239;?</h2>
      <p>${tx("Une galette est fine et croustillante, un palet est épais et friable. Voyez la différence en coupe.")}</p>
      <a class="lien-fort" href="${url("/blogs/journal/sable-galette-palet-difference")}" data-promotion="bloc-texture">Lire l'article</a>
    </aside>`,
    aide: `<section class="section guide-choix" aria-labelledby="aide-1">
      <h2 id="aide-1">${tx("Sablé, palet ou croquant : quelle texture choisir ?")}</h2>
      <p>${tx("Pour un biscuit fondant, choisissez un sablé : Dune, Pignada, Écume, Vague ou Lagon. Pour un cœur moelleux, le Palet Marée est le plus épais. Pour tremper dans un café, le Croquant Lagune est sec et craquant.")}</p>
      <h2>Fraîcheur et conservation</h2>
      <p>${tx("Les sablés de Maison Sable se conservent de 45 à 60 jours et le Croquant Lagune 90 jours, dans leur sachet refermé, au sec et à l'abri de la chaleur. [Toutes les questions sur la conservation](/pages/faq#fraicheur)")}</p>
      <p class="suite">${tx("Vous cherchez un cadeau ? [Nos coffrets à offrir](/collections/coffrets-cadeaux)")}</p>
    </section>`,
  },
  "coffrets-cadeaux": {
    intro: "Les coffrets de biscuits artisanaux de Maison Sable arrivent prêts à offrir : Coffret Été Indien à 31,90 €, Coffret Découverte à 24,90 €, Boîte Grande Plage dès 15,90 €. Ajoutez un message cadeau et faites livrer directement la personne, partout en France métropolitaine. Carte cadeau dès 20 €.",
    filtre: { nom: "format", legende: "Format" },
    bloc: `<aside class="bloc-grille bloc-grille-texte" aria-labelledby="bloc-distance">
      <h2 id="bloc-distance">Offrir à distance</h2>
      <p>${tx("Écrivez votre message sur la fiche du coffret, puis indiquez l'adresse de la personne au moment de commander. Aucun prix n'apparaît dans le colis.")}</p>
      <a class="lien-fort" href="${url("/pages/faq#cadeaux")}" data-promotion="bloc-distance">Comment ça marche</a>
    </aside>`,
    aide: `<section class="section guide-choix" aria-labelledby="aide-choisir">
      <h2 id="aide-choisir">${tx("Comment choisir son coffret ?")}</h2>
      <div class="tableau-cadre" role="region" aria-labelledby="aide-choisir" tabindex="0">
      <table class="tableau">
        <thead><tr><th scope="col">Cadeau</th><th scope="col">Contenu</th><th scope="col">Poids</th><th scope="col">Prix</th><th scope="col">Pour qui</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="${url("/products/boite-grande-plage")}">Boîte Grande Plage</a></th><td>${tx("4 recettes, boîte en fer réutilisable")}</td><td class="num">${tx("250 g / 500 g")}</td><td class="num">${tx("15,90 € / 26,90 €")}</td><td>${tx("un cadeau simple, un souvenir d'Hossegor")}</td></tr>
          <tr><th scope="row"><a href="${url("/products/coffret-decouverte")}">Coffret Découverte</a></th><td>${tx("6 mini-sachets, 6 recettes")}</td><td class="num">${tx("300 g")}</td><td class="num">${tx("24,90 €")}</td><td>faire goûter toute la gamme</td></tr>
          <tr><th scope="row"><a href="${url("/products/coffret-ete-indien")}">Coffret Été Indien</a></th><td>${tx("Boîte Grande Plage 250 g + Sablés Pignada + Croquants Lagune")}</td><td class="num">${tx("520 g")}</td><td class="num">${tx("31,90 €")}</td><td>le cadeau le plus complet</td></tr>
          <tr><th scope="row"><a href="${url("/products/carte-cadeau")}">Carte cadeau</a></th><td>${tx("montant au choix, envoyée par e-mail")}</td><td>—</td><td class="num">${tx("20 / 40 / 60 €")}</td><td>${tx("ne pas se tromper de goût, dernière minute")}</td></tr>
        </tbody>
      </table></div>
      <p class="note">Les coffrets Découverte et Été Indien contiennent des amandes (Croquant Lagune).</p>
      <h2>${tx("Offrir à distance : message cadeau et livraison")}</h2>
      <p>${tx("Maison Sable prépare chaque commande sous 1 à 2 jours ouvrés. Le message cadeau (200 caractères) s'ajoute sur la fiche du coffret, de la boîte ou de la carte cadeau. Au moment de commander, cochez « Livrer à une autre adresse » : le colis part directement chez la personne. Livraison dès 4,50 €, offerte dès 45 €. Dans un colis envoyé à une autre adresse, aucun prix n'apparaît.")}</p>
      ${blocNoel()}
      <p class="suite"><a class="lien-fort" href="${url("/collections/biscuits")}">Toutes nos recettes en sachet</a></p>
    </section>`,
  },
};

export default function collection(handle) {
  const c = collections[handle];
  const x = textes[handle];
  const liste = c.ordre.map(produit);
  const valeurs = [...new Set(liste.map((p) => p[x.filtre.nom]))];
  const cartes = liste.map((p) => carteProduit(p, { liste: handle, niveauTitre: 2 }));
  cartes.splice(c.bloc.apres_position, 0, x.bloc);
  const ariane = [["Accueil", "/"], [c.titre]];
  const corps = `
<div class="page-tete">
  ${filAriane(ariane)}
  <h1>${tx(c.meta.h1)}</h1>
  <p class="intro">${tx(x.intro)}</p>
</div>
<section class="collection" aria-label="Produits">
  <form class="filtres js-seul" data-filtres data-collection="${handle}" aria-label="Filtrer les produits">
    <div class="filtres-barre">
      <button class="bouton bouton-secondaire filtres-ouvrir" type="button" aria-expanded="false" aria-controls="panneau-filtres-${handle}" data-ouvre-filtres>Filtrer <span data-nb-filtres></span></button>
      <p class="filtres-compte" data-compte aria-live="polite">${liste.length} produits</p>
      <label class="tri"><span>Trier</span><select name="tri" data-tri><option value="">Notre sélection</option><option value="prix-asc">Prix croissant</option><option value="prix-desc">Prix décroissant</option></select></label>
    </div>
    <div class="filtres-panneau" id="panneau-filtres-${handle}" data-panneau-filtres>
      <div class="filtres-panneau-tete"><h2 id="titre-filtres-${handle}">Filtrer</h2><button class="bouton-icone" type="button" data-ferme-filtres><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span class="visuellement-cache">Fermer les filtres</span></button></div>
      <fieldset><legend>${x.filtre.legende}</legend>
        ${valeurs.map((v, i) => `<label class="case"><input type="checkbox" name="${x.filtre.nom}" value="${esc(v)}" id="f-${handle}-${i}"><span>${esc(v)}</span></label>`).join("")}
      </fieldset>
      <fieldset><legend>Prix</legend>
        <div class="prix-bornes"><label>Min. (€)<input type="number" name="min" inputmode="decimal" min="0" step="1"></label><label>Max. (€)<input type="number" name="max" inputmode="decimal" min="0" step="1"></label></div>
      </fieldset>
      <div class="filtres-actions"><button class="bouton bouton-secondaire" type="reset" data-effacer>Effacer les filtres</button><button class="bouton" type="button" data-voir>Voir <span data-voir-nb>${liste.length}</span> produits</button></div>
    </div>
    <div class="filtres-actifs" data-filtres-actifs></div>
  </form>
  <div class="grille-produits" data-grille>${cartes.join("")}</div>
  <div class="aucun-resultat" data-aucun hidden><p>Aucun produit ne correspond à ces filtres.</p><button class="bouton bouton-secondaire" type="button" data-effacer>Effacer les filtres</button></div>
</section>
${frise("pignes")}
${x.aide}`;
  return page({
    chemin: `/collections/${handle}`, titre: c.meta.title, description: c.meta.meta_description, corps, classe: "page-collection",
    jsonLd: [
      jsonLdAriane(ariane.map(([n, h], i) => [n, h ?? (i === ariane.length - 1 ? `/collections/${handle}` : undefined)])),
      { "@type": "ItemList", name: c.titre, itemListElement: liste.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absolue("/products/" + p.handle), name: p.titre })) },
    ],
  });
}

export function toutes() {
  const corps = `<div class="page-tete">${filAriane([["Accueil", "/"], ["Tous les produits"]])}<h1>Tous les produits</h1></div>
  <section class="section"><div class="grille-produits">${produits.map((p) => carteProduit(p, { liste: "toutes", niveauTitre: 2 })).join("")}</div></section>`;
  return page({ chemin: "/collections/all", titre: "Tous les produits | Maison Sable", description: "Tous les biscuits, boîtes, coffrets et cartes cadeaux de Maison Sable.", corps, indexable: false });
}
