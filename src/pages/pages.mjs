// Pages éditoriales, légales et utilitaires (textes : docs/08-contenus/)
import { url, absolue, MOKOM_URL } from "../config.mjs";
import { metas, produit, merch } from "../lib/data.mjs";
import { page, filAriane, jsonLdAriane, frise, tx, lienMokom } from "../lib/layout.mjs";
import { grille, carteProduit } from "../lib/composants.mjs";
import { esc } from "../lib/html.mjs";
import { blocNoel } from "./communs.mjs";

const m = (c) => metas[c];
const tete = (ariane, h1, intro = "") => `<div class="page-tete">${filAriane(ariane)}<h1>${tx(h1)}</h1>${intro ? `<p class="intro">${tx(intro)}</p>` : ""}</div>`;
const simple = (chemin, h1, corps, { titre, description, indexable = true, jsonLd = [], classe = "page-texte" } = {}) => {
  const ariane = [["Accueil", "/"], [h1]];
  const mm = m(chemin) || {};
  return page({ chemin, titre: titre || mm.title, description: description || mm.meta_description, indexable, classe, corps: tete(ariane, mm.h1 || h1) + corps, jsonLd: [jsonLdAriane([["Accueil", "/"], [mm.h1 || h1, chemin]]), ...jsonLd] });
};

// ---------- L'atelier ----------
export function atelier() {
  return simple("/pages/atelier-hossegor", "L'atelier Maison Sable à Hossegor", `
<div class="texte">
  <p class="chapo">${tx("Maison Sable est une biscuiterie artisanale de bord de mer installée à Hossegor, dans les Landes, qui fabrique en petites séries des sablés, des palets et des coffrets de biscuits pur beurre. L'atelier ouvert en 2019 prépare les commandes livrées partout en France et accueille les retraits sur place, du mardi au samedi.")}</p>
  <h2>${tx("Une biscuiterie entre le lac marin et l'océan")}</h2>
  <p>${tx("Hossegor se trouve sur la côte sud des Landes, entre un lac marin et l'océan Atlantique, au bord d'une forêt de pins. Les recettes de Maison Sable en portent les noms : la Dune, la Marée, la Lagune, l'Écume, la Vague, et la Pignada, la forêt de pins en gascon.")}</p>
</div>
<figure class="illustration-large"><img src="${url("/images/atelier.svg")}" alt="Illustration : l'atelier Maison Sable, une maison basse aux volets ouverts sous les pins, entre le lac et la dune" width="1200" height="800" loading="lazy" decoding="async"></figure>
<div class="texte">
  <h2>Des biscuits faits à la main, en petites séries</h2>
  <p>${tx("L'atelier Maison Sable travaille en petites fournées, recette par recette :")}</p>
  <ol class="etapes">
    <li>${tx("La pâte est pétrie avec le beurre demi-sel, puis reposée.")}</li>
    <li>${tx("Chaque biscuit est façonné et découpé à la main.")}</li>
    <li>${tx("Les biscuits cuisent, refroidissent complètement, puis sont ensachés le jour même.")}</li>
    <li>${tx("Chaque sachet porte sa date « à consommer de préférence avant », de 45 à 90 jours après fabrication selon la recette.")}</li>
  </ol>
  <h2>${tx("Jeanne et l'équipe")}</h2>
  <p>${tx("Jeanne, pâtissière de formation, a créé Maison Sable en 2019 pour faire des biscuits qui ont le goût des vacances sur la côte. Elle travaille à l'atelier avec deux personnes.")}</p>
  <p class="note">Jeanne est un personnage fictif, comme la marque.</p>
  <h2>Retirer sa commande à l'atelier</h2>
  <p>${tx("Le retrait à l'atelier est gratuit. Choisissez « Retrait à l'atelier » au moment de commander, puis passez aux horaires d'ouverture.")}</p>
  <div class="tableau-cadre" role="region" aria-label="Horaires de retrait" tabindex="0"><table class="tableau"><caption>Horaires de retrait</caption><tbody>
    <tr><th scope="row">Mardi à samedi</th><td>${tx("10 h – 13 h et 15 h – 19 h")}</td></tr><tr><th scope="row">Dimanche et lundi</th><td>fermé</td></tr></tbody></table></div>
  <p>${tx("Adresse : Atelier à Hossegor (adresse fictive) · Téléphone : 05 36 49 12 34 (numéro de fiction, il ne sonne nulle part)")}</p>
  <h2>${tx("Rapporter un souvenir d'Hossegor")}</h2>
  <p>${tx("Pour rapporter un peu de la côte, la Boîte Grande Plage se garde longtemps, même vide : c'est une boîte en fer imprimée, réutilisable. Le Coffret Découverte fait goûter six recettes en une fois.")}</p>
</div>
<section class="section">${grille(["boite-grande-plage", "coffret-decouverte", "sable-pignada"].map(produit), { liste: "atelier-souvenirs" })}
<p class="suite"><a class="lien-fort" href="${url("/collections/coffrets-cadeaux")}">${tx("Rapporter un souvenir d'Hossegor")}</a></p></section>`);
}

// ---------- FAQ ----------
export function faq() {
  const groupes = [
    ["fraicheur", "Fraîcheur et conservation", [
      ["Combien de temps se conservent les biscuits Maison Sable ?", "Les biscuits Maison Sable se conservent de 45 à 90 jours selon la recette. Le Palet Marée, le Sablé Pignada et les coffrets : 45 jours. Le Sablé Dune, le Sablé Écume, le Biscuit Vague et le Sablé Lagon : 60 jours. Le Croquant Lagune : 90 jours. La date figure sur chaque sachet."],
      ["Comment garder des sablés croustillants ?", "Refermez le sachet après chaque ouverture et gardez-le au sec, à l'abri de la chaleur. L'humidité ramollit un sablé au beurre, la chaleur fait fondre le chocolat et le caramel. La Boîte Grande Plage, en fer, protège bien ses biscuits si le couvercle reste fermé."]]],
    ["livraison", "Livraison et retrait", [
      ["Quels sont les délais et les frais de livraison ?", "Maison Sable prépare chaque commande sous 1 à 2 jours ouvrés et livre en France métropolitaine. La livraison à domicile coûte 5,90 € (2 à 3 jours ouvrés d'acheminement) et le point relais 4,50 € (3 à 4 jours ouvrés) ; les deux sont offerts dès 45 € d'achat. La date de livraison estimée s'affiche avant de commander."],
      ["Les biscuits arrivent-ils cassés ?", "Rarement, et Maison Sable s'engage si c'est le cas. Les sachets voyagent calés dans une boîte en carton avec du papier froissé recyclé ; la Boîte Grande Plage et les coffrets sont suremballés. Si des biscuits arrivent cassés, envoyez une photo sous 48 heures : Maison Sable les renvoie."],
      ["Peut-on retirer sa commande à l'atelier ?", "Oui, le retrait à l'atelier d'Hossegor est gratuit. Choisissez « Retrait à l'atelier » en commandant, puis passez du mardi au samedi, de 10 h à 13 h et de 15 h à 19 h. [L'atelier et ses horaires](/pages/atelier-hossegor)"],
      ["Peut-on faire livrer une autre personne ?", "Oui. Au moment de commander, cochez « Livrer à une autre adresse » et indiquez l'adresse de la personne. Pour un cadeau, ajoutez un message sur la fiche du coffret."]]],
    ["allergenes", "Allergènes et ingrédients", [
      ["Quels allergènes contiennent les biscuits ?", "Toutes les recettes de Maison Sable contiennent du gluten (farine de blé), du lait (beurre) et des œufs. Le Biscuit Vague contient aussi du soja (dans le chocolat). Le Croquant Lagune contient des amandes. La liste complète figure sur chaque fiche produit, avec les allergènes en gras."],
      ["Les biscuits contiennent-ils des fruits à coque ?", "Seul le Croquant Lagune contient des fruits à coque (25 % d'amandes), ainsi que les coffrets Découverte et Été Indien qui l'incluent. Toutes les autres recettes peuvent contenir des traces de fruits à coque, car l'atelier travaille les amandes. Aucun biscuit ne convient donc à une allergie sévère aux fruits à coque."],
      ["Les biscuits sont-ils sans gluten ou végétaliens ?", "Non. Toutes les recettes de Maison Sable contiennent de la farine de blé, du beurre et des œufs."]]],
    ["cadeaux", "Cadeaux et carte cadeau", [
      ["Peut-on ajouter un message cadeau ?", "Oui, sur les coffrets, la Boîte Grande Plage et la carte cadeau. Cochez « Ajouter un message cadeau » sur la fiche du produit et écrivez jusqu'à 200 caractères. Le message voyage avec le colis, ou avec l'e-mail pour la carte cadeau."],
      ["Jusqu'à quand commander pour Noël ?", "Pour une livraison avant Noël, commandez au plus tard le **mardi 15 décembre à midi** en point relais et le **jeudi 17 décembre à midi** en livraison à domicile (retrait à l'atelier jusqu'au mardi 22 décembre à midi). Après ces dates, la carte cadeau reste possible : elle part par e-mail le jour de votre choix."],
      ["Comment fonctionne la carte cadeau ?", "La carte cadeau Maison Sable, de 20, 40 ou 60 €, est envoyée par e-mail à la date de votre choix, avec votre message. La personne saisit le code reçu au moment de payer. Elle est valable un an et s'utilise en une ou plusieurs fois."]]],
    ["boutique", "À propos de cette boutique", [
      ["Maison Sable existe-t-elle vraiment ?", "Non. Maison Sable est une marque fictive, imaginée par Mokom Studio pour montrer la conception d'une boutique en ligne. Aucune commande n'est expédiée, aucun paiement n'est demandé et aucune donnée n'est envoyée. Hossegor, en revanche, existe bien. [Découvrir la démarche](/pages/etude-de-cas)"]]],
  ];
  const sommaire = `<nav class="sommaire" aria-label="Sommaire"><ul>${groupes.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join("")}</ul></nav>`;
  const corps = `<div class="texte faq">
  <p class="chapo">${tx("Conservation, livraison, allergènes, cadeaux : les réponses aux questions posées le plus souvent sur les biscuits Maison Sable.")}</p>
  ${sommaire}
  ${groupes.map(([id, titre, qs]) => `<section aria-labelledby="${id}"><h2 id="${id}">${esc(titre)}</h2>${qs.map(([q, r]) => `<h3>${tx(q)}</h3><p>${tx(r)}</p>`).join("")}</section>`).join("")}
  <section class="fin-texte"><h2>Vous ne trouvez pas votre réponse&#8239;?</h2><p>${tx("Écrivez à Maison Sable : l'équipe répond sous 48 heures ouvrées.")}</p>
  <p class="actions"><a class="bouton" href="${url("/pages/contact")}">Nous contacter</a><a class="lien-fort" href="${url("/collections/coffrets-cadeaux")}">Nos coffrets à offrir</a><a class="lien-fort" href="${url("/collections/biscuits")}">Nos biscuits</a></p></section>
</div>`;
  return simple("/pages/faq", "Questions fréquentes", corps);
}

// ---------- Contact ----------
export function contact() {
  return simple("/pages/contact", "Nous contacter", `<div class="texte">
  <p class="chapo">${tx("Une question sur une commande, un coffret ou le retrait à l'atelier d'Hossegor ? Écrivez à Maison Sable : l'équipe répond sous 48 heures ouvrées. Beaucoup de réponses se trouvent déjà dans les [questions fréquentes](/pages/faq).")}</p>
  <form class="formulaire" data-formulaire="contact" novalidate>
    <div class="resume-erreurs" data-resume-erreurs tabindex="-1" hidden></div>
    <div class="champ"><label for="c-nom">Votre nom</label><input id="c-nom" name="nom" autocomplete="name" required data-erreur="Indiquez votre nom."></div>
    <div class="champ"><label for="c-email">Votre e-mail</label><p class="aide" id="c-email-aide">Pour vous répondre.</p><input id="c-email" name="email" type="email" autocomplete="email" required aria-describedby="c-email-aide" data-erreur="Indiquez une adresse e-mail valide, par exemple nom@exemple.fr."></div>
    <div class="champ"><label for="c-sujet">Votre demande porte sur</label><select id="c-sujet" name="sujet"><option>Une commande</option><option>Un coffret ou un cadeau</option><option>Le retrait à l'atelier</option><option>Autre chose</option></select></div>
    <div class="champ"><label for="c-message">Votre message</label><textarea id="c-message" name="message" rows="6" required data-erreur="Écrivez votre message."></textarea></div>
    <button class="bouton" type="submit">Envoyer mon message</button>
    <p class="confirmation" role="status" hidden>${tx("Message simulé : rien n'a été envoyé, car Maison Sable est une boutique fictive. Dans une vraie boutique, vous recevriez une réponse sous 48 heures ouvrées.")}</p>
  </form>
  <h2>Coordonnées</h2>
  <ul class="coordonnees">
    <li>${tx("E-mail : bonjour@maison-sable.example")}</li>
    <li>${tx("Téléphone : 05 36 49 12 34 (numéro réservé aux fictions, il ne sonne nulle part)")}</li>
    <li>${tx("Atelier : Hossegor, Landes (adresse fictive), du mardi au samedi, 10 h – 13 h et 15 h – 19 h")}</li>
  </ul>
</div>`);
}

// ---------- Étude de cas ----------
export function etudeDeCas() {
  const etapes = [
    ["Cadrage", "Maquette fidèle à Shopify, publiée sur GitHub Pages, fiction signalée partout"],
    ["Catalogue", "11 produits, une recette = une page, 14 allergènes réglementaires toujours visibles"],
    ["Recherche", "« Coffret biscuits artisanaux » en priorité ; aucune biscuiterie « de bord de mer » ne s'impose"],
    ["Architecture", "2 collections seulement, tout produit à 2 clics de l'accueil"],
    ["Référencement", "une intention par page, titles et descriptions contrôlés automatiquement, site non indexé (marque fictive)"],
    ["Parcours", "ajout au panier en 1 à 2 gestes, aucun champ de paiement dans la commande simulée"],
    ["Direction artistique", "une boîte à biscuits en fer lithographiée des années 1930, en pastels, produits illustrés"],
    ["Mise en avant", "aucune fausse donnée de vente, économies réelles calculées"],
    ["Textes", "chaque fait vient du catalogue ou de la fiche d'identité de la marque"],
    ["Commande et conformité", "livraison chiffrée, rétractation en ligne, déclaration nutritionnelle, aucun cookie"],
  ];
  return simple("/pages/etude-de-cas", "Maison Sable, une étude de cas Mokom Studio", `<div class="texte">
  <p class="chapo">${tx("Maison Sable est une biscuiterie fictive imaginée par Mokom Studio, studio de conception de sites web, pour montrer comment se construit une boutique en ligne : cadrage, recherche, référencement, parcours, direction artistique, textes et performance. La marque, ses produits et ses avis sont inventés ; la méthode et les choix sont réels.")}</p>
  <h2>Une marque fictive, une démarche réelle</h2>
  <div class="tableau-cadre" role="region" aria-label="Décisions par étape" tabindex="0"><table class="tableau"><thead><tr><th scope="col">Étape</th><th scope="col">Décision clé</th></tr></thead>
  <tbody>${etapes.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${tx(b)}</td></tr>`).join("")}</tbody></table></div>
  <h2>Les résultats mesurés</h2>
  <p data-resultats>${tx("Les mesures de performance et d'accessibilité seront publiées ici après l'audit final.")}</p>
  <h2>Parlons de votre boutique</h2>
  <p>${tx("Vous préparez une boutique en ligne ou un site vitrine ? Mokom Studio applique la même méthode à votre projet.")}</p>
  <p class="actions">${lienMokom("Parlons de votre boutique", "etude-de-cas", "bouton")}<a class="lien-fort" href="${url("/")}">Voir la boutique Maison Sable</a></p>
</div>`, { jsonLd: [{ "@type": "Organization", name: "Mokom Studio", url: MOKOM_URL }] });
}

// ---------- Journal et article ----------
export function journal() {
  const a = m("/blogs/journal/sable-galette-palet-difference");
  return simple("/blogs/journal", "Le journal", `<div class="texte">
  <p class="chapo">${tx("Recettes, savoir-faire et histoires de biscuits de la côte landaise, racontés depuis l'atelier Maison Sable (fictif) à Hossegor.")}</p>
  <article class="carte-article"><h2><a href="${url("/blogs/journal/sable-galette-palet-difference")}">${tx(a.h1)}</a></h2><p class="date"><time datetime="2026-09-28">28 septembre 2026</time></p><p>${tx("Une galette est fine et croustillante, un palet est épais et friable : les différences, en un tableau.")}</p></article>
</div>`);
}

export function article() {
  const chemin = "/blogs/journal/sable-galette-palet-difference";
  const mm = m(chemin);
  const ariane = [["Accueil", "/"], ["Journal", "/blogs/journal"], ["Sablé, galette ou palet ?"]];
  const corps = `${tete(ariane, mm.h1)}
<article class="texte article">
  <p class="signature">${tx("L'atelier Maison Sable (fictif) · Publié le")} <time datetime="2026-09-28">28 septembre 2026</time> · ${tx("Mis à jour le")} <time datetime="2026-09-28">28 septembre 2026</time></p>
  <p class="chapo">${tx("La galette et le palet sont deux formes de la même pâte sablée bretonne. La galette est fine, environ 5 mm, et croustillante. Le palet est épais, 1 à 1,5 cm, et très friable. Le mot « sablé » désigne la famille entière : un biscuit au beurre à la texture qui s'effrite.")}</p>
  <h2>Les différences en un tableau</h2>
  <div class="tableau-cadre" role="region" aria-label="Galette et palet comparés" tabindex="0"><table class="tableau"><thead><tr><th scope="col"></th><th scope="col">Galette</th><th scope="col">Palet</th></tr></thead><tbody>
    <tr><th scope="row">Épaisseur</th><td>${tx("environ 5 mm")}</td><td>${tx("1 à 1,5 cm")}</td></tr>
    <tr><th scope="row">Texture</th><td>fine et croustillante</td><td>épaisse et friable</td></tr>
    <tr><th scope="row">Aspect</th><td>${tx("dorée à l'œuf, striée")}</td><td>bords irréguliers, cuite en moule</td></tr>
    <tr><th scope="row">Famille</th><td>sablé breton</td><td>sablé breton</td></tr></tbody></table></div>
  <figure class="illustration-large"><img src="${url("/images/coupe-sable-galette-palet.svg")}" alt="Illustration en coupe : une galette fine, un sablé et un palet épais côte à côte, avec leurs épaisseurs" width="1200" height="560" loading="lazy" decoding="async"></figure>
  <h2>${tx("D'où vient la galette de Pont-Aven ?")}</h2>
  <p>${tx("À la fin du XIXᵉ siècle, Isidore Penven, boulanger à Pont-Aven, dans le Finistère, fabrique des galettes fines et croustillantes. La tradition raconte qu'une erreur de pesée aurait donné une pâte plus fine que la recette habituelle. La galette de Pont-Aven est depuis l'une des plus connues de Bretagne.")}</p>
  <h2>${tx("Qu'est-ce qui rend une pâte « sablée » ?")}</h2>
  <p>${tx("Une pâte sablée contient beaucoup de beurre (au moins 20 % pour le sablé breton), du sucre et des jaunes d'œufs. Le beurre enrobe la farine et limite la formation d'une pâte élastique : le biscuit cuit s'effrite en bouche, comme du sable.")}</p>
  <h2>Et chez Maison Sable&#8239;?</h2>
  <p>${tx("Maison Sable n'est pas bretonne mais landaise : ses recettes empruntent la technique du sablé au beurre et lui donnent le goût de la côte d'Hossegor.")}</p>
  <ul><li>${tx("Le **Sablé Dune** est un sablé fondant au beurre demi-sel (30 %) et à la fleur de sel.")}</li><li>${tx("Le **Palet Marée** suit la forme du palet, épais et friable, avec un cœur de caramel au beurre salé (12 %).")}</li></ul>
</article>
<section class="section">${grille(["palet-maree", "sable-dune"].map(produit), { liste: "article" })}<p class="suite"><a class="lien-fort" href="${url("/collections/biscuits")}">Toutes nos recettes</a></p></section>
<div class="texte sources"><h2>Sources</h2><ul>
  <li><a href="https://www.produits-laitiers.com/tout-sur-le-sable-breton/">Produits laitiers (CNIEL), « Tout sur le sablé breton »</a></li>
  <li><a href="https://www.ledessertdabord.fr/histoire-de-sable-breton/">Le Dessert d'Abord, « Histoire de pâtisserie : le sablé breton »</a></li></ul></div>`;
  return page({ chemin, titre: mm.title, description: mm.meta_description, corps, classe: "page-texte", ogType: "article",
    jsonLd: [{ "@type": "Article", headline: mm.h1, datePublished: "2026-09-28", dateModified: "2026-09-28", inLanguage: "fr-FR", author: { "@type": "Organization", name: "Maison Sable (fictif)" }, publisher: { "@type": "Organization", name: "Mokom Studio", url: MOKOM_URL }, image: absolue("/images/coupe-sable-galette-palet.svg"), mainEntityOfPage: absolue(chemin) },
      jsonLdAriane([["Accueil", "/"], ["Journal", "/blogs/journal"], [mm.h1, chemin]])] });
}

// ---------- Pages légales (docs/08-contenus/legal/) ----------
const legal = (chemin, h1, titre, description, corps) => simple(chemin, h1, `<div class="texte legal">${corps}</div>`, { titre: `${h1} | Maison Sable`, description });
export const mentions = () => legal("/policies/legal-notice", "Mentions légales", "", "Mentions légales du site Maison Sable, boutique fictive publiée par Mokom Studio.", `
  <p class="encadre">${tx("Maison Sable est une marque fictive, créée par Mokom Studio pour une étude de cas. Aucun produit n'est vendu, aucune commande n'est expédiée, aucun paiement n'est encaissé.")}</p>
  <h2>Éditeur du site</h2><p>${tx("Mokom Studio · [À COMPLÉTER : forme juridique, nom de l'exploitante, adresse, SIREN, TVA, e-mail] · Site :")} ${lienMokom("www.mokomstudio.fr", "mentions")}<br>${tx("Directrice de la publication : [À COMPLÉTER]")}</p>
  <h2>Hébergeur</h2><p>${tx("GitHub, Inc. (service GitHub Pages), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis · github.com")}</p>
  <h2>Propriété intellectuelle</h2><p>${tx("Les textes, illustrations, le logo « Maison Sable » et la mise en page sont des créations de Mokom Studio. Toute reproduction sans autorisation est interdite. Hossegor et les lieux cités existent ; la marque, ses produits, ses personnages et ses avis sont inventés.")}</p>
  <h2>Données personnelles et cookies</h2><p>${tx("Voir la [politique de confidentialité](/policies/privacy-policy) : le site ne collecte aucune donnée et ne dépose aucun cookie.")}</p>
  <h2>Accessibilité</h2><p>${tx("Le site vise la conformité aux WCAG 2.2, niveau AA. État de conformité : publié après l'audit final.")}</p>`);

export const cgv = () => legal("/policies/terms-of-service", "Conditions générales de vente", "", "Conditions générales de vente d'exemple de Maison Sable, boutique fictive : prix, livraison, rétractation, garanties.", `
  <p class="encadre">${tx("Exemple fictif, sans valeur contractuelle. Maison Sable n'existe pas : ces conditions montrent ce qu'une vraie boutique de biscuits devrait prévoir.")}</p>
  <h2>1. Vendeur</h2><p>${tx("Maison Sable, biscuiterie artisanale à Hossegor (Landes), marque fictive. Coordonnées : voir les [mentions légales](/policies/legal-notice).")}</p>
  <h2>2. Produits</h2><p>${tx("Chaque fiche indique, avant la commande, la dénomination, la liste des ingrédients, les allergènes, la quantité nette, la durée et les conditions de conservation, la déclaration nutritionnelle et le nom de l'exploitant.")}</p>
  <h2>3. Prix</h2><p>${tx("Prix en euros, toutes taxes comprises, hors frais de livraison. Livraison à domicile 5,90 €, point relais 4,50 €, offerts dès 45 € d'achat ; retrait gratuit à l'atelier. Le prix au kilo est indiqué sur chaque fiche.")}</p>
  <h2>4. Commande</h2><p>${tx("La commande est conclue après la validation du récapitulatif (articles, frais, total). Dans une vraie boutique, le bouton final porte la mention « Commande avec obligation de paiement ».")}</p>
  <h2>5. Paiement</h2><p>${tx("Paiement simulé dans cette maquette. Carte cadeau Maison Sable acceptée en paiement total ou partiel.")}</p>
  <h2>6. Livraison</h2><p>${tx("France métropolitaine. Préparation en 1 à 2 jours ouvrés ; acheminement de 2 à 3 jours ouvrés à domicile et de 3 à 4 jours ouvrés en point relais. Biscuits arrivés cassés : une photo envoyée sous 48 heures suffit pour qu'ils soient renvoyés.")}</p>
  <h2>7. Droit de rétractation</h2><p>${tx("Vous disposez de **14 jours** à compter de la réception pour renoncer à votre achat, sans justification. **Exception** : les sachets, boîtes et coffrets **ouverts** ne peuvent pas être repris, pour des raisons d'hygiène et de protection de la santé (article L221-28 du Code de la consommation). La carte cadeau peut être annulée dans le même délai tant qu'elle n'a pas été utilisée. Pour renoncer en ligne, sans vous connecter : [Renoncer au contrat ici](/pages/retractation). Remboursement sous 14 jours, frais de livraison initiaux compris.")}</p>
  <h2>8. Garanties légales</h2><p>${tx("Les produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés. Une vraie boutique doit reproduire l'encadré d'information prévu par le décret n° 2022-946 du 29 juin 2022.")}</p>
  <h2>9. Carte cadeau</h2><p>${tx("Montant de 20, 40 ou 60 €, utilisable en une ou plusieurs fois sur toute la boutique, valable 1 an à compter de son envoi. Non remboursable en espèces.")}</p>
  <h2>10. Avis clients</h2><p>${tx("Les avis affichés sur ce site sont fictifs et n'ont fait l'objet d'aucun contrôle.")}</p>
  <h2>11. Médiation</h2><p>${tx("Une vraie boutique doit indiquer le médiateur de la consommation qu'elle a choisi.")}</p>
  <h2>12. Données personnelles</h2><p>${tx("Voir la [politique de confidentialité](/policies/privacy-policy).")}</p>`);

export const confidentialite = () => legal("/policies/privacy-policy", "Confidentialité", "", "Maison Sable ne collecte aucune donnée personnelle et ne dépose aucun cookie : le panier reste dans votre navigateur.", `
  <p class="chapo">${tx("Ce site ne collecte aucune donnée personnelle et ne dépose aucun cookie. Les formulaires (contact, lettre d'information, commande) sont des simulations : ce que vous saisissez reste dans votre navigateur et n'est envoyé à personne.")}</p>
  <h2>Ce qui est gardé dans votre navigateur</h2><p>${tx("Le contenu du panier, pour le retrouver si vous revenez sur le même appareil. Il est stocké localement, n'est jamais transmis et s'efface quand vous videz le panier ou les données du site. Ce stockage est strictement nécessaire au service demandé. Les champs de la commande simulée sont effacés à la confirmation.")}</p>
  <h2>Mesure d'audience</h2><p>${tx("Aucune. Aucun outil de mesure n'est chargé. Les actions sur le site sont seulement enregistrées dans la mémoire de la page, pour démonstration, et disparaissent quand vous la quittez.")}</p>
  <h2>Hébergement</h2><p>${tx("Le site est hébergé par GitHub Pages (GitHub, Inc., États-Unis). Comme tout hébergeur, GitHub peut enregistrer des données techniques de connexion : voir la [déclaration de confidentialité de GitHub](https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement).")}</p>
  <h2>Polices de caractères</h2><p>Les polices sont hébergées sur le site lui-même&#8239;: aucune requête n'est faite vers un service tiers.</p>
  <h2>Vos droits</h2><p>${tx("Aucune donnée n'étant collectée, il n'y a rien à consulter ni à supprimer.")}</p>`);

export const livraisonPage = () => legal("/policies/shipping-policy", "Livraison et retrait", "", "Livraison Maison Sable : domicile 5,90 €, point relais 4,50 €, offerts dès 45 €, retrait gratuit à Hossegor. Boutique fictive.", `
  <p class="encadre">${tx("Boutique fictive : aucune commande n'est expédiée.")}</p>
  <p>${tx("France métropolitaine (outre-mer non livré). Préparation : 1 à 2 jours ouvrés ; commande passée après midi traitée le jour ouvré suivant.")}</p>
  <div class="tableau-cadre" role="region" aria-label="Modes de livraison" tabindex="0"><table class="tableau"><thead><tr><th scope="col">Mode</th><th scope="col">Prix</th><th scope="col">Délai</th></tr></thead><tbody>
    <tr><th scope="row">Livraison à domicile</th><td>${tx("5,90 €, offerte dès 45 €")}</td><td>${tx("2 à 3 jours ouvrés")}</td></tr>
    <tr><th scope="row">Point relais</th><td>${tx("4,50 €, offert dès 45 €")}</td><td>${tx("3 à 4 jours ouvrés")}</td></tr>
    <tr><th scope="row">${tx("Retrait à l'atelier d'Hossegor")}</th><td>gratuit</td><td>${tx("prêt le jour ouvré suivant, du mardi au samedi, 10 h – 13 h et 15 h – 19 h")}</td></tr>
    <tr><th scope="row">Carte cadeau</th><td>—</td><td>${tx("par e-mail, à la date choisie")}</td></tr></tbody></table></div>
  <p>${tx("Emballage : sachets calés dans une boîte en carton, papier froissé recyclé ; aucun prix dans un colis cadeau. Biscuits cassés : envoyez une photo sous 48 heures, Maison Sable les renvoie.")}</p>
  ${blocNoel().replace("hidden", "")}`);

export const retoursPage = () => legal("/policies/refund-policy", "Retours et rétractation", "", "Rétractation sous 14 jours pour les produits non ouverts, bouton de rétractation en ligne. Exemple, boutique fictive.", `
  <p class="chapo">${tx("Vous pouvez renoncer à votre achat pendant 14 jours après la réception, sans justification, tant que les sachets, boîtes et coffrets n'ont pas été ouverts. Un produit ouvert ne peut pas être repris, pour des raisons d'hygiène. La carte cadeau peut être annulée dans le même délai si elle n'a pas été utilisée.")}</p>
  <p><a class="bouton" href="${url("/pages/retractation")}">Renoncer au contrat ici</a></p>
  <ul><li>${tx("Remboursement sous 14 jours, frais de livraison initiaux compris.")}</li><li>${tx("Biscuits cassés à la livraison : ce n'est pas une rétractation, c'est un renvoi. Envoyez une photo sous 48 heures.")}</li></ul>
  <p class="note">Boutique fictive&#8239;: ces règles sont un exemple.</p>`);

export function retractation() {
  return simple("/pages/retractation", "Renoncer à ma commande", `<div class="texte">
  <p class="chapo">${tx("Vous avez 14 jours après la réception pour renoncer à votre commande. Les produits doivent être non ouverts.")}</p>
  <form class="formulaire" data-formulaire="retractation" novalidate>
    <div class="resume-erreurs" data-resume-erreurs tabindex="-1" hidden></div>
    <div data-etape="1">
      <div class="champ"><label for="r-commande">Numéro de commande</label><p class="aide" id="r-commande-aide">${tx("Il figure dans l'e-mail de confirmation, par exemple MS-20261001-1432.")}</p><input id="r-commande" name="commande" required aria-describedby="r-commande-aide" data-erreur="Indiquez le numéro de commande."></div>
      <div class="champ"><label for="r-email">E-mail utilisé pour la commande</label><input id="r-email" name="email" type="email" autocomplete="email" required data-erreur="Indiquez une adresse e-mail valide, par exemple nom@exemple.fr."></div>
      <fieldset class="champ"><legend>Produits concernés</legend><label class="case"><input type="radio" name="portee" value="toute" checked><span>Toute la commande</span></label><label class="case"><input type="radio" name="portee" value="partie"><span>Une partie de la commande</span></label></fieldset>
      <button class="bouton" type="submit">Renoncer au contrat ici</button>
    </div>
    <div data-etape="2" hidden><h2 tabindex="-1">Confirmer la rétractation</h2><p data-recap></p><p class="actions"><button class="bouton" type="button" data-confirmer>Confirmer ma rétractation</button><button class="lien-fort bouton-lien" type="button" data-retour>Revenir en arrière</button></p></div>
    <div data-etape="3" hidden><h2 tabindex="-1">Votre rétractation est enregistrée</h2><p data-horodatage></p><p class="note">Simulation&#8239;: rien n'est envoyé ni enregistré.</p></div>
  </form>
</div>`, { titre: "Renoncer à ma commande | Maison Sable", description: "Formulaire de rétractation en ligne de Maison Sable, sans connexion. Boutique fictive : simulation.", indexable: false });
}

// ---------- Panier, commande, recherche, 404 ----------
export function panier() {
  return page({ chemin: "/cart", titre: "Votre panier | Maison Sable", description: "Votre panier Maison Sable.", indexable: false, classe: "page-panier",
    corps: `${tete([["Accueil", "/"], ["Panier"]], "Votre panier")}<section class="section panier-page" data-panier-page><p class="js-absent">Le panier nécessite JavaScript.</p></section>` });
}

export function commande() {
  const modes = `
    <label class="mode"><input type="radio" name="livraison" value="domicile" required><span><b>Livraison à domicile</b> <span data-prix-mode="domicile">5,90&nbsp;€</span><small data-date-mode="domicile"></small></span></label>
    <label class="mode"><input type="radio" name="livraison" value="point_relais"><span><b>Point relais</b> <span data-prix-mode="point_relais">4,50&nbsp;€</span><small data-date-mode="point_relais"></small></span></label>
    <div class="relais" data-relais hidden>
      <fieldset><legend>Choisissez un point relais (exemples fictifs)</legend>
        <label class="case"><input type="radio" name="relais" value="Relais du Lac, Hossegor" checked><span>Relais du Lac, Hossegor</span></label>
        <label class="case"><input type="radio" name="relais" value="Relais des Pins, Hossegor"><span>Relais des Pins, Hossegor</span></label>
        <label class="case"><input type="radio" name="relais" value="Relais de la Plage, Seignosse"><span>Relais de la Plage, Seignosse</span></label></fieldset>
      <div class="champ"><label for="k-tel">Téléphone portable</label><p class="aide" id="k-tel-aide">Le point relais vous prévient par SMS quand votre colis est arrivé.</p><input id="k-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" aria-describedby="k-tel-aide" data-erreur="Indiquez un numéro de portable à 10 chiffres, par exemple 06 12 34 56 78."></div>
    </div>
    <label class="mode"><input type="radio" name="livraison" value="retrait_atelier"><span><b>Retrait à l'atelier d'Hossegor</b> <span>Gratuit</span><small data-date-mode="retrait_atelier"></small></span></label>`;
  const adresse = (p, oblig = true) => `
    <div class="champ-duo"><div class="champ"><label for="${p}-prenom">Prénom</label><input id="${p}-prenom" name="${p}_prenom" autocomplete="${p === "k" ? "given-name" : "off"}" ${oblig ? "required" : ""} data-erreur="Indiquez votre prénom."></div>
    <div class="champ"><label for="${p}-nom">Nom</label><input id="${p}-nom" name="${p}_nom" autocomplete="${p === "k" ? "family-name" : "off"}" ${oblig ? "required" : ""} data-erreur="Indiquez votre nom."></div></div>
    <div class="champ"><label for="${p}-adresse">Adresse</label><input id="${p}-adresse" name="${p}_adresse" autocomplete="${p === "k" ? "address-line1" : "off"}" ${oblig ? "required" : ""} data-erreur="Indiquez le numéro et le nom de la rue."></div>
    <div class="champ"><label for="${p}-complement">Complément d'adresse (facultatif)</label><input id="${p}-complement" name="${p}_complement" autocomplete="${p === "k" ? "address-line2" : "off"}"></div>
    <div class="champ-duo"><div class="champ"><label for="${p}-cp">Code postal</label><input id="${p}-cp" name="${p}_cp" inputmode="numeric" autocomplete="${p === "k" ? "postal-code" : "off"}" maxlength="5" ${oblig ? "required" : ""} data-erreur="Le code postal doit contenir 5 chiffres, par exemple 40150."></div>
    <div class="champ"><label for="${p}-ville">Ville</label><input id="${p}-ville" name="${p}_ville" autocomplete="${p === "k" ? "address-level2" : "off"}" ${oblig ? "required" : ""} data-erreur="Indiquez la ville."></div></div>`;
  const corps = `<div class="commande" data-commande>
  <div class="commande-tete"><a class="lien-fort" href="${url("/cart")}">Retour au panier</a><h1>Finaliser la commande</h1>
  <p class="encadre">${tx("Commande fictive : Maison Sable est une étude de cas. Aucun paiement n'est demandé, aucune donnée n'est envoyée ni enregistrée.")}</p>
  <button class="bouton bouton-secondaire" type="button" data-exemple>Remplir avec un exemple</button></div>
  <form class="commande-form formulaire" data-formulaire="commande" novalidate>
    <div class="resume-erreurs" data-resume-erreurs tabindex="-1" hidden></div>
    <section aria-labelledby="k1"><h2 id="k1">1. Vos coordonnées</h2>
      <div class="champ"><label for="k-email">E-mail</label><p class="aide" id="k-email-aide">Pour vous envoyer la confirmation (simulée).</p><input id="k-email" name="email" type="email" autocomplete="email" required aria-describedby="k-email-aide" data-erreur="Indiquez une adresse e-mail valide, par exemple nom@exemple.fr."></div>
      ${adresse("k")}
      <p class="champ-fixe">Pays&#8239;: France métropolitaine</p>
      <label class="case"><input type="checkbox" name="autre_adresse" data-autre-adresse aria-controls="autre-adresse" aria-expanded="false"><span>Livrer à une autre adresse (idéal pour un cadeau)</span></label>
      <div id="autre-adresse" data-zone-autre hidden><h3>Adresse de la personne qui reçoit le colis</h3>${adresse("d", false)}<p class="note">Aucun prix n'apparaît dans un colis envoyé à une autre adresse.</p></div>
    </section>
    <section aria-labelledby="k2"><h2 id="k2">2. Livraison</h2>
      <fieldset class="modes" data-modes><legend class="visuellement-cache">Mode de livraison</legend>${modes}</fieldset>
      <p class="erreur-champ" id="modes-erreur" hidden>Choisissez un mode de livraison.</p>
      <p class="carte-seule" data-carte-seule hidden>${tx("Carte cadeau envoyée par e-mail à la date choisie : aucune livraison.")}</p>
      <p class="note">${tx("Vos biscuits voyagent calés dans une boîte en carton. S'ils arrivent cassés, envoyez-nous une photo sous 48 heures : nous les renvoyons.")}</p>
    </section>
    <section aria-labelledby="k3"><h2 id="k3">3. Paiement</h2>
      <p class="encadre">${tx("Paiement simulé. Dans une vraie boutique Shopify, cette étape proposerait Shop Pay, Apple Pay, Google Pay, PayPal et la carte bancaire, avec une connexion sécurisée.")}</p>
      <div class="champ"><label for="k-code">Code de carte cadeau (facultatif)</label><p class="aide" id="k-code-aide">${tx("Pour essayer : SABLE-DEMO-20.")}</p>
        <div class="champ-ligne"><input id="k-code" name="code" autocomplete="off" aria-describedby="k-code-aide k-code-retour"><button class="bouton bouton-secondaire" type="button" data-appliquer-code>Appliquer</button></div><p id="k-code-retour" class="aide" aria-live="polite" data-code-retour></p></div>
      <p class="cgv">${tx("En validant, vous acceptez les [conditions générales de vente (exemple)](/policies/terms-of-service). Dans une vraie boutique, le bouton s'intitulerait « Commande avec obligation de paiement ».")}</p>
      <button class="bouton bouton-large" type="submit">Valider la commande fictive</button>
      <p class="note">Aucun paiement ne sera demandé.</p>
    </section>
  </form>
  <aside class="recapitulatif" data-recap aria-label="Votre commande"><details open data-recap-details><summary data-recap-resume>Votre commande</summary><div data-recap-corps></div></details>
    <p class="note"><a href="${url("/policies/shipping-policy")}">Livraison</a> · <a href="${url("/policies/refund-policy")}">Retours</a></p></aside>
  <section class="confirmation-commande" data-confirmation hidden tabindex="-1" aria-labelledby="conf-titre"></section>
</div>`;
  return page({ chemin: "/checkout", titre: "Finaliser la commande | Maison Sable", description: "Commande simulée de la boutique fictive Maison Sable.", indexable: false, classe: "page-commande", corps });
}

export function recherche() {
  return page({ chemin: "/search", titre: "Recherche | Maison Sable", description: "Rechercher un biscuit ou un coffret Maison Sable.", indexable: false, classe: "page-recherche",
    corps: `${tete([["Accueil", "/"], ["Recherche"]], "Rechercher")}<section class="section">
    <form class="recherche-form" action="${url("/search")}" role="search"><label for="rp-champ">Rechercher un biscuit ou un coffret</label><div class="champ-ligne"><input id="rp-champ" name="q" type="search"><button class="bouton" type="submit">Rechercher</button></div></form>
    <div data-resultats-recherche aria-live="polite"><p>${tx("Parcourez nos [biscuits](/collections/biscuits), nos [coffrets et cadeaux](/collections/coffrets-cadeaux) ou les [questions fréquentes](/pages/faq).")}</p></div></section>` });
}

export function erreur404() {
  return page({ chemin: "/404.html", titre: "Page introuvable | Maison Sable", description: "Cette page n'existe pas.", indexable: false,
    corps: `<div class="page-tete page-404"><h1>${tx("Cette page s'est envolée avec la marée")}</h1><p class="intro">${tx("L'adresse n'existe pas ou plus. Cherchez un biscuit, ou repartez d'une collection.")}</p>
    <form class="recherche-form" action="${url("/search")}" role="search"><label for="e-champ">Rechercher un biscuit ou un coffret</label><div class="champ-ligne"><input id="e-champ" name="q" type="search"><button class="bouton" type="submit">Rechercher</button></div></form>
    <p class="actions"><a class="lien-fort" href="${url("/")}">Accueil</a><a class="lien-fort" href="${url("/collections/coffrets-cadeaux")}">Nos coffrets à offrir</a><a class="lien-fort" href="${url("/collections/biscuits")}">Nos biscuits</a></p></div>
    <section class="section">${grille(merch.recuperation.map(produit), { liste: "404" })}</section>` });
}
void carteProduit;
