// Accueil (docs/08-contenus/accueil.md, zoning 06-ux.md, contrat de direction : le couvercle)
import { url, absolue } from "../config.mjs";
import { metas, merch, produit, photos } from "../lib/data.mjs";
import { page, frise, tx } from "../lib/layout.mjs";
import { grille } from "../lib/composants.mjs";

export default function accueil() {
  const m = metas["/"];
  const coffrets = merch.accueil.plateau_coffrets.map(produit);
  const recettes = merch.accueil.plateau_recettes.map(produit);
  const corps = `
<section class="boite-accueil" aria-labelledby="titre-accueil">
  <div class="couvercle" data-couvercle>
    <picture>
      <source media="(min-width: 760px)" srcset="${url("/images/photos/accueil-large-960.webp")} 960w, ${url("/images/photos/accueil-large-1600.webp")} 1600w" sizes="(min-width: 1320px) 1240px, 94vw" width="1600" height="900">
      <img class="couvercle-scene" src="${url("/images/photos/accueil-haut-800.webp")}" srcset="${url("/images/photos/accueil-haut-480.webp")} 480w, ${url("/images/photos/accueil-haut-800.webp")} 800w" sizes="94vw" width="800" height="1000" alt="${photos.scenes.accueil.alt}" fetchpriority="high">
    </picture>
    <div class="couvercle-metal" aria-hidden="true"><span>Maison Sable<br>Hossegor</span></div>
    <p class="bandeau-relief" aria-hidden="true">Maison Sable · Hossegor</p>
    <div class="etiquette-couvercle">
      <h1 id="titre-accueil">${tx(m.h1)}</h1>
      <p class="definition-longue">${tx("Maison Sable est une biscuiterie artisanale de bord de mer installée à Hossegor, dans les Landes, qui fabrique en petites séries des sablés, des palets et des coffrets de biscuits pur beurre.")}</p>
      <p class="definition-courte">${tx("Sablés, palets et coffrets pur beurre, faits en petites séries.")}</p>
      <div class="actions">
        <a class="bouton" href="${url("/collections/coffrets-cadeaux")}">Offrir un coffret</a>
        <a class="lien-fort" href="${url("/collections/biscuits")}">Découvrir nos biscuits</a>
      </div>
    </div>
  </div>
  <div class="plateau" aria-labelledby="titre-coffrets">
    <div class="plateau-int">
      <h2 id="titre-coffrets">${tx("Des coffrets à offrir, de la dune à votre table")}</h2>
      <p class="intro">${tx("Coffrets et boîte de 15,90 à 31,90 €, avec un message cadeau si vous le souhaitez, livrés partout en France métropolitaine. La carte cadeau, envoyée par e-mail, dépanne quand il est trop tard pour un colis.")}</p>
      ${grille(coffrets, { liste: "accueil-coffrets", chargement: "lazy" })}
      <p class="suite"><a class="lien-fort" href="${url("/collections/coffrets-cadeaux")}">Voir tous les coffrets et cadeaux</a></p>
    </div>
  </div>
</section>

<section class="reassurance" aria-label="Livraison et fraîcheur">
  <p class="bande-imprimee">${tx("Expédié sous 1 à 2 jours ouvrés")}<span aria-hidden="true"> · </span>${tx("Livraison dès 4,50 €, offerte dès 45 €")}<span aria-hidden="true"> · </span>${tx("Retrait gratuit à l'atelier d'Hossegor")}<span aria-hidden="true"> · </span>${tx("De 45 à 90 jours de conservation")}</p>
</section>

${frise("ganivelles")}

<section class="section recettes" aria-labelledby="titre-recettes">
  <div class="section-tete">
    <h2 id="titre-recettes">Sept recettes pur beurre</h2>
    <p class="intro">${tx("Fleur de sel, caramel au beurre salé, chocolat noir, pignons de pin et miel, citron et thym, amandes et orange, noix de coco et vanille. Chaque recette de Maison Sable se vend en sachet, dès 6,90 € les 150 g.")}</p>
  </div>
  ${grille(recettes, { liste: "accueil-recettes" })}
  <p class="suite"><a class="lien-fort" href="${url("/collections/biscuits")}">Voir les 7 recettes</a></p>
</section>

<section class="histoire" aria-labelledby="titre-atelier">
  <img src="${url("/images/photos/atelier-1200.webp")}" srcset="${url("/images/photos/atelier-800.webp")} 800w, ${url("/images/photos/atelier-1200.webp")} 1200w" sizes="(min-width: 900px) 55vw, 100vw" alt="${photos.scenes.atelier.alt}" width="1200" height="800" loading="lazy" decoding="async">
  <div class="histoire-texte">
    <h2 id="titre-atelier">${tx("Un atelier entre le lac et l'océan")}</h2>
    <p>${tx("Maison Sable est née en 2019 à Hossegor, entre le lac marin et l'océan. Jeanne, pâtissière de formation, y façonne les biscuits à la main avec deux autres personnes, en petites séries. Chaque recette porte le nom d'un paysage de la côte.")}</p>
    <a class="lien-fort" href="${url("/pages/atelier-hossegor")}">${tx("Découvrir l'atelier d'Hossegor")}</a>
  </div>
</section>

<section class="section avis" aria-labelledby="titre-avis">
  <h2 id="titre-avis">${tx("Ce qu'on nous écrit")}</h2>
  <p class="avis-mention">${tx("Avis fictifs, rédigés pour cette étude de cas : Maison Sable n'a pas de clients réels.")}</p>
  <ul class="avis-liste">
    <li><blockquote><p>${tx("« Le Palet Marée a tenu jusqu'à Lyon sans une miette cassée. Mes collègues réclament la boîte. »")}</p></blockquote><p class="avis-auteur">Claire, avis fictif</p></li>
    <li><blockquote><p>${tx("« J'ai offert le Coffret Découverte à mon père, il a tout goûté dans l'ordre conseillé. Son préféré : le Sablé Pignada. »")}</p></blockquote><p class="avis-auteur">Thomas, avis fictif</p></li>
    <li><blockquote><p>${tx("« Retrait à l'atelier un samedi matin, le Sablé Écume a fini sur la plage des Estagnots. »")}</p></blockquote><p class="avis-auteur">Inès, avis fictif</p></li>
  </ul>
</section>

<section class="fin-page" aria-labelledby="titre-cadeau">
  <h2 id="titre-cadeau">Un cadeau à faire&#8239;?</h2>
  <p>${tx("Le Coffret Découverte fait goûter six recettes en une fois. La carte cadeau, de 20 à 60 €, laisse choisir.")}</p>
  <div class="actions"><a class="bouton" href="${url("/collections/coffrets-cadeaux")}">Offrir un coffret</a><a class="lien-fort" href="${url("/products/carte-cadeau")}">Offrir une carte cadeau</a></div>
</section>`;

  return page({
    chemin: "/", titre: m.title, description: m.meta_description, h1Logo: true, corps, classe: "page-accueil",
    precharger: [`<link rel="preload" as="image" imagesrcset="${url("/images/photos/accueil-haut-480.webp")} 480w, ${url("/images/photos/accueil-haut-800.webp")} 800w" imagesizes="94vw" media="(max-width: 759px)">`, `<link rel="preload" as="image" imagesrcset="${url("/images/photos/accueil-large-960.webp")} 960w, ${url("/images/photos/accueil-large-1600.webp")} 1600w" imagesizes="(min-width: 1320px) 1240px, 94vw" media="(min-width: 760px)">`],
    jsonLd: [
      { "@type": "Organization", "@id": absolue("/#organisation"), name: "Maison Sable", url: absolue("/"), logo: absolue("/images/favicon.svg"),
        description: "Maison Sable est une biscuiterie artisanale de bord de mer installée à Hossegor, dans les Landes, qui fabrique en petites séries des sablés, des palets et des coffrets de biscuits pur beurre. Marque fictive : étude de cas Mokom Studio.",
        areaServed: "FR" },
      { "@type": "WebSite", "@id": absolue("/#site"), name: "Maison Sable", url: absolue("/"), inLanguage: "fr-FR", publisher: { "@id": absolue("/#organisation") } },
    ],
  });
}
