// Fiche produit (gabarit : docs/08-contenus/gabarit-fiche-produit.md)
import { url, absolue } from "../config.mjs";
import { produit, merch, livraison, economie } from "../lib/data.mjs";
import { page, filAriane, jsonLdAriane, tx } from "../lib/layout.mjs";
import { carteProduit, donneesVariante, imageProduit, srcsetProduit } from "../lib/composants.mjs";
import { esc, prix, prixKilo, typo } from "../lib/html.mjs";
import { blocNoel } from "./communs.mjs";

const COLLECTION = { biscuits: "Biscuits", "coffrets-cadeaux": "Coffrets & cadeaux" };
const CONTENU = {
  "boite-grande-plage": ["sable-dune", "palet-maree", "sable-ecume", "biscuit-vague"],
  "coffret-ete-indien": ["boite-grande-plage", "sable-pignada", "croquant-lagune"],
  "coffret-decouverte": ["sable-dune", "palet-maree", "sable-pignada", "croquant-lagune", "sable-ecume", "biscuit-vague"],
};
// Mots des ingrédients à mettre en gras pour chaque allergène (règlement INCO)
const MOTS = { Gluten: ["farine de blé"], Lait: ["beurre demi-sel", "beurre", "crème", "lait"], "Œufs": ["jaune d'œuf", "blancs d'œufs", "œufs"], Soja: ["lécithine de soja"], "Fruits à coque": ["amandes"] };

function ingredientsEnGras(p) {
  let s = typo(esc(p.ingredients));
  const mots = p.allergenes.flatMap((a) => MOTS[a] || []).sort((a, b) => b.length - a.length);
  const echappe = (m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const m of mots) s = s.replace(new RegExp(`(^|[\\s(])(${echappe(m)})(?![^<]*</strong>)`, "g"), "$1<strong>$2</strong>");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const ligneEco = (p, v) => { const e = economie(p, v); return e ? `${prix(e.montant)} ${e.texte}` : ""; };

export default function fiche(handle) {
  const p = produit(handle);
  const x = p.textes;
  const v0 = p.variantes[0];
  const coll = p.collection_principale;
  const ariane = [["Accueil", "/"], [COLLECTION[coll], `/collections/${coll}`], [p.titre]];
  const estCarte = p.type === "Carte cadeau";
  const estLot = !!CONTENU[handle];
  const dataVariantes = p.variantes.map((v) => ({ ...donneesVariante(p, v), stock: v.stock, poids: v.poids_net_g, prixKilo: v.poids_net_g ? prixKilo(v.prix, v.poids_net_g) : "", eco: ligneEco(p, v) }));

  const choix = p.variantes.length > 1
    ? `<fieldset class="variantes" data-variantes>
        <legend>${esc(v0.option_nom)}</legend>
        ${p.variantes.map((v, i) => `<div class="variante"><input type="radio" name="variante" id="v-${v.sku}" value="${v.sku}"${i === 0 ? " checked" : ""}><label for="v-${v.sku}"><b>${typo(esc(v.option_valeur))} · ${prix(v.prix)}</b>${v.poids_net_g ? `<small>${prixKilo(v.prix, v.poids_net_g)}${ligneEco(p, v) ? ` · <span class="eco">${typo(ligneEco(p, v))}</span>` : ""}</small>` : ""}</label></div>`).join("")}
      </fieldset>`
    : "";
  const cadeauChamps = p.cadeau || estCarte
    ? `<div class="message-cadeau">
        ${estCarte ? `<label for="cc-email">E-mail de la personne</label><input id="cc-email" name="destinataire" type="email" autocomplete="off" required data-erreur="Indiquez l'e-mail de la personne qui recevra la carte, par exemple prenom@exemple.fr.">
        <label for="cc-date">Date d'envoi</label><input id="cc-date" name="date_envoi" type="date" required data-date-min data-erreur="Choisissez une date d'envoi à partir d'aujourd'hui.">` : ""}
        <label class="case"><input type="checkbox" data-message-bascule aria-controls="message-${handle}" aria-expanded="false"><span>Ajouter un message cadeau</span></label>
        <div id="message-${handle}" data-message-zone hidden>
          <label for="msg-${handle}">Votre message</label>
          <textarea id="msg-${handle}" name="message" maxlength="200" rows="3" aria-describedby="msg-${handle}-compte"></textarea>
          <p class="aide" id="msg-${handle}-compte" data-compteur aria-live="polite">200 caractères restants</p>
        </div>
      </div>`
    : "";
  const aussi = (merch.fiche_aussi_dans[handle] || []).map(produit);
  const lies = p.produits_lies.map(produit).filter((q) => !q.epuise).slice(0, 3);

  const blocIngredients = estCarte ? "" : estLot
    ? `<section class="fiche-section" aria-labelledby="t-contenu">
        <h2 id="t-contenu">Ce que contient ${handle.startsWith("boite") ? "la boîte" : "le coffret"}</h2>
        <ul class="liste-contenu">${CONTENU[handle].map((h) => `<li><a href="${url("/products/" + h)}">${esc(produit(h).titre)}</a></li>`).join("")}</ul>
        <p class="allergenes"><strong>${typo("Contient :")}</strong> ${p.allergenes.map((a) => `<strong>${esc(a.toLowerCase())}</strong>`).join(", ")}.${p.traces.length ? ` ${typo("Peut contenir des traces de : " + p.traces.map((a) => a.toLowerCase()).join(", ") + ".")}` : ""}</p>
        ${tableCaracteristiques(p)}
        <h3>Ingrédients et valeurs nutritionnelles, recette par recette</h3>
        ${CONTENU[handle].map((h) => { const r = produit(h); return `<details class="recette-detail"><summary>${esc(r.titre.split(",")[0])}</summary>
          <p><span class="etiquette-mini">Ingrédients</span> ${ingredientsEnGras(r)}.</p>${r.nutrition ? tableNutrition(r) : ""}</details>`; }).join("")}
        <p class="note">Fabriqué par Maison Sable, Hossegor (adresse fictive). ${typo("À consommer de préférence avant la date indiquée sur chaque sachet.")}</p>
      </section>`
    : `<section class="fiche-section" aria-labelledby="t-ingredients">
        <h2 id="t-ingredients">Ingrédients et allergènes</h2>
        <p class="allergenes"><strong>${typo("Contient :")}</strong> ${p.allergenes.map((a) => `<strong>${esc(a.toLowerCase())}</strong>`).join(", ")}.${p.traces.length ? ` ${typo("Peut contenir des traces de : " + p.traces.map((a) => a.toLowerCase()).join(", ") + ".")}` : ""}</p>
        <p><span class="etiquette-mini">Ingrédients</span> ${ingredientsEnGras(p)}.</p>
        ${tableCaracteristiques(p)}
        ${p.nutrition ? tableNutrition(p) : ""}
        <p class="note">Fabriqué par Maison Sable, Hossegor (adresse fictive). ${typo("À consommer de préférence avant la date indiquée sur le sachet.")}</p>
      </section>`;

  const corps = `
<div class="fiche" data-fiche data-variantes-json="${esc(JSON.stringify(dataVariantes))}" data-handle="${handle}">
  <div class="fiche-galerie" aria-label="Illustrations du produit" role="region">
    <div class="galerie-piste" data-galerie tabindex="0">
      ${estCarte
        ? `<figure class="galerie-vue galerie-vue-dessin"><img src="${imageProduit(handle)}" alt="${esc(x.alts[0] || p.titre)}" width="800" height="1000" fetchpriority="high"></figure>`
        : p.photos.map((ph, i) => `<figure class="galerie-vue"><img src="${imageProduit(handle, i + 1)}" srcset="${srcsetProduit(handle, i + 1)}" sizes="(min-width: 900px) 55vw, 100vw" alt="${esc(ph.alt)}" width="800" height="1000" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}><figcaption>Photo d'illustration · ${esc(ph.auteur)}, Unsplash</figcaption></figure>`).join("")}
    </div>
    ${p.photos.length < 2 ? "" : `<div class="galerie-commandes js-seul"><button class="bouton-icone" type="button" data-galerie-prec aria-label="Illustration précédente"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></button><span data-galerie-pos>1 / ${p.photos.length}</span><button class="bouton-icone" type="button" data-galerie-suiv aria-label="Illustration suivante"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></button></div>`}
  </div>
  <div class="fiche-achat">
    ${filAriane(ariane)}
    <h1>${tx(p.meta.h1)}</h1>
    <p class="fiche-prix"><span class="prix-principal" data-prix>${prix(v0.prix)}</span>${v0.poids_net_g ? ` <span class="prix-kilo" data-prix-kilo>${prixKilo(v0.prix, v0.poids_net_g)}</span>` : ""}</p>
    ${p.allergenes.length ? `<p class="allergenes-court">${typo("Allergènes : " + p.allergenes.map((x) => x.toLowerCase()).join(", "))}. <a href="#${estLot ? "t-contenu" : "t-ingredients"}">Détail</a></p>` : ""}
    ${estLot && economie(p, v0) ? `<p class="fiche-eco">${typo(ligneEco(p, v0))}</p>` : ""}
    <form class="achat" data-achat novalidate>
      ${choix}
      ${cadeauChamps}
      <div class="achat-ligne">
        <div class="quantite"><button type="button" class="bouton-icone" data-qte="-1" aria-label="Diminuer la quantité">−</button><label class="visuellement-cache" for="qte-${handle}">Quantité</label><input id="qte-${handle}" type="number" inputmode="numeric" min="1" max="20" value="1" data-qte-champ><button type="button" class="bouton-icone" data-qte="1" aria-label="Augmenter la quantité">+</button></div>
        <button class="bouton bouton-large" type="submit" data-ajouter${p.epuise ? " disabled" : ""}>${p.epuise ? "Épuisé" : "Ajouter au panier"}</button>
      </div>
      <p class="js-absent note">Le panier nécessite JavaScript.</p>
    </form>
    <p class="reassurance-ligne" data-reassurance>${estCarte ? tx("Envoyée par e-mail à la date choisie · aucun frais de livraison") : tx("Livraison dès 4,50 €, offerte dès 45 € · Retrait gratuit à Hossegor")}</p>
    ${aussi.length ? `<p class="aussi-dans">Aussi dans&#8239;: ${aussi.map((q) => `<a href="${url("/products/" + q.handle)}">${esc(q.titre.split(",")[0])}</a>`).join(" · ")}</p>` : ""}
  </div>
</div>

<div class="fiche-contenu">
  <section class="fiche-section fiche-presentation" aria-label="Présentation">
    <p class="chapo">${tx(x.presentation)}</p>
    <ul class="en-bref">${x.enBref.map((b) => `<li>${tx(b)}</li>`).join("")}</ul>
  </section>
  ${blocIngredients}
  <section class="fiche-section" aria-labelledby="t-degustation"><h2 id="t-degustation">${x.degustationTitre}</h2><p>${tx(x.degustation)}</p></section>
  ${estCarte ? "" : `<section class="fiche-section" aria-labelledby="t-livraison"><h2 id="t-livraison">Livraison et retrait</h2>
    <ul class="liste-livraison">
      <li>${tx("Préparation en 1 à 2 jours ouvrés ; commande passée après midi traitée le jour ouvré suivant.")}</li>
      <li>${tx("Livraison à domicile : 5,90 €, 2 à 3 jours ouvrés. Point relais : 4,50 €, 3 à 4 jours ouvrés. Offerts dès 45 € d'achat.")}</li>
      <li>${tx("Retrait gratuit à l'atelier d'Hossegor, du mardi au samedi.")}</li>
      <li>${tx("Sachets calés dans une boîte en carton ; biscuits cassés renvoyés sur simple photo sous 48 heures.")}</li>
    </ul><p><a href="${url("/policies/shipping-policy")}">Toutes les conditions de livraison</a></p>
    ${p.cadeau ? blocNoel() : ""}</section>`}
  <section class="fiche-section" aria-labelledby="t-questions"><h2 id="t-questions">Questions fréquentes</h2>
    ${x.questions.map((q) => `<h3>${tx(q.q)}</h3><p>${tx(q.r)}</p>`).join("")}
  </section>
</div>
${lies.length ? `<section class="section suggestions" aria-labelledby="t-lies"><h2 id="t-lies">Vous aimerez aussi</h2><div class="grille-produits">${lies.map((q) => carteProduit(q, { liste: "vous-aimerez-aussi" })).join("")}</div></section>` : ""}
<div class="barre-achat js-seul" data-barre-achat hidden>
  <span class="barre-nom">${esc(p.titre.split(",")[0])} <span data-barre-variante>${v0.option_valeur === "Unique" ? "" : typo(esc(v0.option_valeur))}</span></span>
  <span class="barre-prix" data-barre-prix>${prix(v0.prix)}</span>
  <button class="bouton" type="button" data-barre-ajouter${p.epuise ? " disabled" : ""}>Ajouter au panier</button>
</div>`;

  const offre = (v) => ({
    "@type": "Offer", sku: v.sku, price: v.prix.toFixed(2), priceCurrency: "EUR", url: absolue(`/products/${handle}?variant=${v.sku}`), seller: { "@id": absolue("/#organisation") },
    availability: v.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition",
    ...(estCarte ? {} : { shippingDetails: livraison.modes.filter((m) => m.id !== "retrait_atelier").map((m) => ({
      "@type": "OfferShippingDetails", shippingRate: { "@type": "MonetaryAmount", value: m.prix.toFixed(2), currency: "EUR" },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "FR" },
      deliveryTime: { "@type": "ShippingDeliveryTime", handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" }, transitTime: { "@type": "QuantitativeValue", minValue: m.transit_jours_ouvres.min, maxValue: m.transit_jours_ouvres.max, unitCode: "DAY" } },
    })) }),
  });
  const base = { "@id": absolue(`/products/${handle}`) + "#produit", url: absolue(`/products/${handle}`), name: p.titre, description: x.presentation.replace(/\*\*/g, ""), image: absolue(estCarte ? `/images/produits/${handle}-1.svg` : `/images/photos/${handle}-1-800.webp`), brand: { "@type": "Brand", name: "Maison Sable" }, manufacturer: { "@id": absolue("/#organisation") }, category: COLLECTION[coll] };
  const ld = p.variantes.length > 1 && !estCarte
    ? { "@type": "ProductGroup", productGroupID: handle, ...base, variesBy: "https://schema.org/weight",
        hasVariant: p.variantes.map((v) => ({ "@type": "Product", name: `${p.titre} ${v.option_valeur}`, image: base.image, brand: base.brand, sku: v.sku, inProductGroupWithID: handle, weight: { "@type": "QuantitativeValue", value: v.poids_net_g, unitCode: "GRM" }, offers: offre(v) })) }
    : { "@type": "Product", ...base, ...(p.variantes.length === 1 ? { sku: v0.sku } : {}), ...(v0.poids_net_g ? { weight: { "@type": "QuantitativeValue", value: v0.poids_net_g, unitCode: "GRM" } } : {}), offers: p.variantes.length > 1 ? p.variantes.map(offre) : offre(v0) };

  return page({
    chemin: `/products/${handle}`, titre: p.meta.title, description: p.meta.meta_description, corps, classe: "page-produit", ogType: "product",
    jsonLd: [ld, jsonLdAriane([["Accueil", "/"], [COLLECTION[coll], `/collections/${coll}`], [p.titre, `/products/${handle}`]])],
  });
}

function tableCaracteristiques(p) {
  const lignes = p.variantes.map((v) => `<tr><th scope="row">${typo(esc(v.option_valeur === "Unique" ? "Format unique" : v.option_valeur))}</th><td class="num">${v.poids_net_g ? typo(v.poids_net_g + " g") : "—"}</td><td class="num">${v.nb_biscuits ? typo("environ " + v.nb_biscuits) : "—"}</td><td class="num">${v.poids_net_g ? prixKilo(v.prix, v.poids_net_g) : "—"}</td></tr>`).join("");
  return `<div class="tableau-cadre" role="region" aria-label="Caractéristiques" tabindex="0"><table class="tableau">
    <caption>${typo(`Caractéristiques · conservation : ${p.conservation_jours} jours · ${p.conservation_conseil.toLowerCase().replace(/\.$/, "")}`)}</caption>
    <thead><tr><th scope="col">Format</th><th scope="col">Poids net</th><th scope="col">Biscuits</th><th scope="col">Prix au kilo</th></tr></thead><tbody>${lignes}</tbody></table></div>`;
}

function tableNutrition(p) {
  const n = p.nutrition;
  const f = (v) => String(v).replace(".", ",");
  const kj = Math.round(n.kcal * 4.184);
  const rows = [["Énergie", `${kj} kJ / ${n.kcal} kcal`], ["Matières grasses", `${f(n.lipides)} g`], ["dont acides gras saturés", `${f(n.satures)} g`, true], ["Glucides", `${f(n.glucides)} g`], ["dont sucres", `${f(n.sucres)} g`, true], ["Protéines", `${f(n.proteines)} g`], ["Sel", `${f(n.sel)} g`]];
  return `<div class="tableau-cadre" role="region" aria-label="Déclaration nutritionnelle" tabindex="0"><table class="tableau tableau-nutrition">
    <caption>Valeurs nutritionnelles pour 100 g · valeurs d'exemple, marque fictive</caption>
    <tbody>${rows.map(([a, b, sous]) => `<tr${sous ? ' class="sous"' : ""}><th scope="row">${esc(a)}</th><td class="num">${typo(b)}</td></tr>`).join("")}</tbody></table></div>`;
}
