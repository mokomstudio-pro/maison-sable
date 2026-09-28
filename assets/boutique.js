// Maison Sable : interactions de la boutique (amélioration progressive, aucun envoi réseau de données).
// Événements GA4 ajoutés à window.dataLayer uniquement, pour démonstration (docs/09-cro-mesure.md).

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const BASE = document.body.dataset.base || "";
// Même règle que src/config.mjs : adresse de page avec « / » final (GitHub Pages)
const lien = (c) => { const [ch, suite = ""] = c.split(/(?=[?#])/); return BASE + (/\/$|\.[a-z0-9]+$/i.test(ch) ? ch : ch + "/") + suite; };
const NBSP = " ";
const euros = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + NBSP + "€";
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Mesure (démonstration, aucun envoi) ----------
window.dataLayer = window.dataLayer || [];
const item = (d, qte = 1, liste) => ({ item_id: d.sku, item_name: d.nom, item_variant: d.variante || undefined, item_category: d.categorie, price: d.prix, quantity: qte, item_list_id: liste || undefined });
function evenement(nom, params = {}) {
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({ event: nom, ...params });
}

// ---------- Annonces pour lecteurs d'écran ----------
const annonce = (texte) => { const z = $("[data-annonce]"); if (!z) return; z.textContent = ""; setTimeout(() => (z.textContent = texte), 60); };

// ---------- Catalogue (chargé à la demande) ----------
let catalogueP;
const catalogue = () => (catalogueP ??= fetch(lien("/assets/catalogue.json")).then((r) => r.json()));

// ---------- Dates de livraison (jours ouvrés : du lundi au vendredi, hors jours fériés en France) ----------
const feriesCache = {};
function feries(a) {
  if (feriesCache[a]) return feriesCache[a];
  // Dimanche de Pâques (calcul grégorien de Meeus), d'où lundi de Pâques, Ascension (+39 j), lundi de Pentecôte (+50 j)
  const b = a % 19, c = Math.floor(a / 100), e = a % 100, f = Math.floor((8 * c + 13) / 25), g = (19 * b + c - Math.floor(c / 4) - f + 15) % 30;
  const h = (32 + 2 * (c % 4) + 2 * Math.floor(e / 4) - g - (e % 4)) % 7, m = Math.floor((b + 11 * g + 22 * h) / 451);
  const paques = new Date(a, Math.floor((g + h - 7 * m + 114) / 31) - 1, ((g + h - 7 * m + 114) % 31) + 1);
  const dec = (n) => { const x = new Date(paques); x.setDate(x.getDate() + n); return x; };
  const jours = [new Date(a, 0, 1), dec(1), new Date(a, 4, 1), new Date(a, 4, 8), dec(39), dec(50), new Date(a, 6, 14), new Date(a, 7, 15), new Date(a, 10, 1), new Date(a, 10, 11), new Date(a, 11, 25)];
  return (feriesCache[a] = new Set(jours.map((x) => x.toDateString())));
}
const ouvre = (d) => d.getDay() !== 0 && d.getDay() !== 6 && !feries(d.getFullYear()).has(d.toDateString());
function plusOuvres(d, n) { const x = new Date(d); let k = 0; while (k < n) { x.setDate(x.getDate() + 1); if (ouvre(x)) k++; } return x; }
function depart(maintenant = new Date()) { const d = new Date(maintenant); if (!ouvre(d) || d.getHours() >= 12) { do d.setDate(d.getDate() + 1); while (!ouvre(d)); } return d; }
const jour = (d) => { const s = d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); return s.replace(/ 1 /, " 1er "); };
function fenetre(liv, modeId) {
  const m = liv.modes.find((x) => x.id === modeId);
  const d0 = depart();
  if (modeId === "retrait_atelier") { const p = plusOuvres(d0, m.pret_jours_ouvres); while (p.getDay() === 0 || p.getDay() === 1) p.setDate(p.getDate() + 1); return { pret: p }; }
  const min = plusOuvres(d0, liv.preparation_jours_ouvres.min - 1 + m.transit_jours_ouvres.min);
  const max = plusOuvres(d0, liv.preparation_jours_ouvres.max - 1 + m.transit_jours_ouvres.max);
  return { min, max };
}

// ---------- Panier (stockage local du navigateur) ----------
const CLE = "ms-panier";
const lirePanier = () => { try { return JSON.parse(localStorage.getItem(CLE)) || []; } catch { return []; } };
const ecrirePanier = (p) => { try { localStorage.setItem(CLE, JSON.stringify(p)); } catch {} majPanier(); };
const sousTotal = (p) => p.reduce((s, l) => s + l.prix * l.qte, 0);
const nbArticles = (p) => p.reduce((s, l) => s + l.qte, 0);
const cleLigne = (l) => l.sku + "|" + (l.message || "") + "|" + (l.destinataire || "");

function ajouter(d, { qte = 1, message = "", destinataire = "", date_envoi = "", liste } = {}) {
  const p = lirePanier();
  const nv = { ...d, qte, message, destinataire, date_envoi };
  const ex = p.find((l) => cleLigne(l) === cleLigne(nv));
  if (ex) ex.qte = Math.min(20, ex.qte + qte); else p.push(nv);
  ecrirePanier(p);
  evenement("add_to_cart", { ecommerce: { currency: "EUR", value: +(d.prix * qte).toFixed(2), items: [item(d, qte, liste)] } });
  annonce(`${d.nom}${d.variante ? " " + d.variante : ""} ajouté au panier`);
  ouvrirDialogue("panier");
}

function majPanier() {
  const p = lirePanier();
  const n = nbArticles(p);
  $$("[data-compte-panier]").forEach((e) => { e.textContent = n || ""; e.toggleAttribute("data-vide", !n); });
  $$("[data-compte-texte]").forEach((e) => { e.textContent = n ? `Panier, ${n} article${n > 1 ? "s" : ""}` : "Panier vide"; });
  const corps = $("[data-panier-corps]");
  if (corps) corps.innerHTML = rendrePanier(p, "tiroir");
  const pageP = $("[data-panier-page]");
  if (pageP) pageP.innerHTML = rendrePanier(p, "page");
  if (p.length) suggestion(p);
}

async function suggestion(p) {
  const cat = await catalogue();
  const reste = cat.livraison.seuil_livraison_offerte - sousTotal(p);
  const zones = $$("[data-suggestion]");
  if (!zones.length) return;
  if (reste <= 0 || reste > cat.ecartMax) { zones.forEach((z) => (z.innerHTML = "")); return; }
  const dans = new Set(p.map((l) => l.handle));
  const lies = new Set(p.flatMap((l) => cat.produits.find((x) => x.handle === l.handle)?.lies || []));
  const candidats = cat.complements.map((h) => cat.produits.find((x) => x.handle === h)).filter((x) => x && !x.epuise && !dans.has(x.handle));
  const choix = candidats.find((x) => lies.has(x.handle) && x.variantes[0].prix >= reste) || candidats.find((x) => x.variantes[0].prix >= reste) || candidats[0];
  if (!choix) return;
  const v = choix.variantes[0];
  zones.forEach((z) => (z.innerHTML = `<div class="suggestion-panier"><img src="${choix.image}" alt="" width="48" height="60"><span>Pour atteindre la livraison offerte&#8239;: <strong>${esc(v.nom)} ${esc(v.variante)}</strong>, ${euros(v.prix)}</span><button class="bouton bouton-petit bouton-secondaire" type="button" data-ajout="${esc(JSON.stringify(v))}" data-liste="panier-suggestion">Ajouter<span class="visuellement-cache"> ${esc(v.nom)}</span></button></div>`));
}

function rendrePanier(p, ou) {
  if (!p.length) return `<div class="panier-vide"><p>Votre panier est vide.</p><p class="actions"><a class="bouton" href="${lien("/collections/coffrets-cadeaux")}">Nos coffrets à offrir</a><a class="lien-fort" href="${lien("/collections/biscuits")}">Nos biscuits</a></p></div>`;
  const st = sousTotal(p);
  const seuil = 45;
  const reste = Math.max(0, seuil - st);
  // Carte cadeau seule : envoyée par e-mail, rien à livrer (ni jauge, ni frais)
  const carteSeule = p.every((l) => l.handle === "carte-cadeau");
  const liv = carteSeule ? "aucune (envoi par e-mail)" : st >= seuil ? "Offerte" : "dès 4,50" + NBSP + "€ (retrait gratuit à l'atelier)";
  const lignes = p.map((l, i) => `<li class="panier-ligne">
    <img src="${l.image}" alt="" width="64" height="80">
    <div><a class="panier-ligne-nom" href="${lien("/products/" + l.handle)}">${esc(l.nom)}</a>${l.variante ? `<div class="panier-ligne-var">${esc(l.variante)}</div>` : ""}${l.destinataire ? `<div class="panier-ligne-msg">Pour ${esc(l.destinataire)}${l.date_envoi ? `, envoi le ${new Date(l.date_envoi + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}` : ""}</div>` : ""}${l.message ? `<div class="panier-ligne-msg">Message cadeau&#8239;: « ${esc(l.message)} »</div>` : ""}</div>
    <div class="panier-ligne-prix">${euros(l.prix * l.qte)}</div>
    <div class="panier-ligne-actions">
      <div class="quantite"><button class="bouton-icone" type="button" data-panier-qte="${i}" data-delta="-1" aria-label="Diminuer la quantité de ${esc(l.nom)}">−</button><span aria-live="polite" class="num">${l.qte}</span><button class="bouton-icone" type="button" data-panier-qte="${i}" data-delta="1" aria-label="Augmenter la quantité de ${esc(l.nom)}">+</button></div>
      <button class="lien-retirer" type="button" data-panier-retirer="${i}">Retirer<span class="visuellement-cache"> ${esc(l.nom)}</span></button>
    </div></li>`).join("");
  return `${carteSeule ? "" : `<div class="jauge">${reste > 0 ? `<p>Plus que ${euros(reste)} pour la livraison offerte</p>` : `<p>La livraison est offerte</p>`}<div class="jauge-barre" aria-hidden="true"><span style="transform:scaleX(${Math.min(1, st / seuil).toFixed(3)})"></span></div></div>`}
  <div data-suggestion></div>
  <ul class="panier-liste">${lignes}</ul>
  <div class="panier-pied">
    <dl class="totaux"><dt>Sous-total</dt><dd>${euros(st)}</dd><dt>Livraison</dt><dd>${liv}</dd><dt class="total">Total estimé</dt><dd class="total">${euros(st)}${st >= seuil || carteSeule ? "" : " + livraison"}</dd></dl>
    <a class="bouton bouton-large" href="${lien("/checkout")}" data-commencer>Commander</a>
    ${ou === "tiroir" ? `<p class="suite"><a href="${lien("/cart")}">Voir le panier</a></p>` : ""}
    <p class="note">Commande fictive&#8239;: aucun paiement ne sera demandé.</p>
  </div>`;
}

document.addEventListener("click", (e) => {
  const q = e.target.closest("[data-panier-qte]");
  if (q) {
    const p = lirePanier(); const l = p[+q.dataset.panierQte]; if (!l) return;
    l.qte = Math.max(0, Math.min(20, l.qte + +q.dataset.delta));
    if (!l.qte) { p.splice(+q.dataset.panierQte, 1); evenement("remove_from_cart", { ecommerce: { currency: "EUR", value: l.prix, items: [item(l, 1)] } }); }
    ecrirePanier(p); annonce(`Quantité : ${l.qte}`); return;
  }
  const r = e.target.closest("[data-panier-retirer]");
  if (r) {
    const p = lirePanier(); const [l] = p.splice(+r.dataset.panierRetirer, 1);
    if (l) evenement("remove_from_cart", { ecommerce: { currency: "EUR", value: +(l.prix * l.qte).toFixed(2), items: [item(l, l.qte)] } });
    ecrirePanier(p); annonce(`${l?.nom || "Article"} retiré du panier`); $("#panier-titre")?.focus(); return;
  }
  const c = e.target.closest("[data-commencer]");
  if (c) { const p = lirePanier(); evenement("begin_checkout", { ecommerce: { currency: "EUR", value: +sousTotal(p).toFixed(2), items: p.map((l) => item(l, l.qte)) } }); }
  const a = e.target.closest("[data-ajout]");
  if (a) { const d = JSON.parse(a.dataset.ajout); fermerChoix(); ajouter(d, { liste: a.dataset.liste }); return; }
  const oc = e.target.closest("[data-ouvre-choix]");
  if (oc) { const box = oc.nextElementSibling; const ouvert = !box.hidden; fermerChoix(); if (!ouvert) { box.hidden = false; oc.setAttribute("aria-expanded", "true"); box.querySelector("button")?.focus(); } return; }
  if (!e.target.closest(".choix-rapides")) fermerChoix();
  const sel = e.target.closest("[data-selection]");
  if (sel) { const s = JSON.parse(sel.dataset.selection); evenement("select_item", { item_list_id: s.liste, items: [{ item_id: s.handle }] }); }
  const promo = e.target.closest("[data-promotion]");
  if (promo) evenement("select_promotion", { promotion_id: promo.dataset.promotion, promotion_name: promo.textContent.trim() });
  const mk = e.target.closest("[data-evenement='mokom_case_study_click']");
  if (mk) evenement("mokom_case_study_click", { link_location: mk.dataset.emplacement });
});
function fermerChoix() { $$(".choix-rapides").forEach((b) => { if (!b.hidden) { b.hidden = true; b.previousElementSibling?.setAttribute("aria-expanded", "false"); } }); }
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { const ouvert = $(".choix-rapides:not([hidden])"); if (ouvert) { fermerChoix(); ouvert.previousElementSibling?.focus(); } } });

// ---------- Tiroirs (dialog natif : focus piégé, Échap) ----------
function ouvrirDialogue(id) {
  const d = document.getElementById(id); if (!d) return;
  if (!d.open) d.showModal();
  if (id === "panier") { majPanier(); $("#panier-titre")?.focus(); const p = lirePanier(); evenement("view_cart", { ecommerce: { currency: "EUR", value: +sousTotal(p).toFixed(2), items: p.map((l) => item(l, l.qte)) } }); }
  if (id === "recherche") $("#recherche-champ")?.focus();
}
$$("[data-ouvre]").forEach((b) => b.addEventListener("click", (e) => { if (!document.getElementById(b.dataset.ouvre)) return; e.preventDefault(); ouvrirDialogue(b.dataset.ouvre); }));
$$("dialog.tiroir").forEach((d) => {
  d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-ferme]")) d.close(); });
});
// À la fermeture, le navigateur rend le focus à l'élément qui a ouvert le tiroir (WCAG 2.4.3) : ne pas l'effacer.

// ---------- En-tête : se cache en descendant, revient en remontant ----------
{
  // Position lue au premier défilement seulement (pas de calcul de mise en page au démarrage)
  const t = $("[data-entete]"); let y0 = 0, attente = false;
  addEventListener("scroll", () => { if (attente) return; attente = true; requestAnimationFrame(() => { const y = scrollY; t?.classList.toggle("masque", y > y0 && y > 160); y0 = y; attente = false; }); }, { passive: true });
}

// ---------- Accueil : le couvercle se soulève au premier défilement ----------
{
  // Le couvercle en métal se soulève à l'arrivée (animation CSS .couvercle-metal, désactivée si « réduire les animations »)
}

// ---------- Saison de Noël ----------
{
  const now = new Date(); const debut = new Date(now.getFullYear(), 9, 1), fin = new Date(now.getFullYear(), 11, 24, 23, 59);
  if (now >= debut && now <= fin) $$("[data-saison-noel]").forEach((b) => (b.hidden = false));
}

// ---------- Listes de produits vues ----------
{
  const vues = new Set();
  const io = "IntersectionObserver" in window && new IntersectionObserver((ents) => ents.forEach((en) => {
    if (!en.isIntersecting) return; io.unobserve(en.target);
    const cartes = $$(".carte", en.target); const liste = cartes[0]?.querySelector("[data-liste]")?.dataset.liste || cartes[0] && JSON.parse(cartes[0].querySelector("[data-selection]")?.dataset.selection || "{}").liste;
    if (!liste || vues.has(liste)) return; vues.add(liste);
    evenement("view_item_list", { item_list_id: liste, items: cartes.map((c, i) => ({ item_id: c.dataset.produit, index: i })) });
  }), { threshold: 0.2 });
  if (io) $$(".grille-produits").forEach((g) => io.observe(g));
}

// ---------- Fiche produit ----------
{
  const f = $("[data-fiche]");
  if (f) {
    const vars = JSON.parse(f.dataset.variantesJson);
    let v = vars[0];
    const params = new URLSearchParams(location.search);
    const init = vars.find((x) => x.sku === params.get("variant"));
    const form = $("[data-achat]", f);
    const radios = $$("input[name=variante]", form);
    const maj = (pousser) => {
      $("[data-prix]", f).textContent = euros(v.prix);
      const k = $("[data-prix-kilo]", f); if (k) k.textContent = v.prixKilo;
      $("[data-barre-prix]") && ($("[data-barre-prix]").textContent = euros(v.prix));
      $("[data-barre-variante]") && ($("[data-barre-variante]").textContent = v.variante || "");
      if (pousser) { const u = new URL(location); u.searchParams.set("variant", v.sku); history.replaceState(null, "", u); }
    };
    if (init) { v = init; const r = radios.find((x) => x.value === init.sku); if (r) r.checked = true; maj(false); }
    radios.forEach((r) => r.addEventListener("change", () => { v = vars.find((x) => x.sku === r.value); maj(true); annonce(`${v.variante}, ${euros(v.prix)}`); }));
    const champ = $("[data-qte-champ]", form);
    $$("[data-qte]", form).forEach((b) => b.addEventListener("click", () => { champ.value = Math.max(1, Math.min(20, (+champ.value || 1) + +b.dataset.qte)); }));
    const bascule = $("[data-message-bascule]", form);
    if (bascule) {
      const zone = $("[data-message-zone]", form), ta = $("textarea", zone), cpt = $("[data-compteur]", zone);
      bascule.addEventListener("change", () => { zone.hidden = !bascule.checked; bascule.setAttribute("aria-expanded", String(bascule.checked)); if (bascule.checked) ta.focus(); });
      ta.addEventListener("input", () => { const r = 200 - ta.value.length; cpt.textContent = `${r} caractère${r > 1 ? "s" : ""} restant${r > 1 ? "s" : ""}`; });
    }
    const aujourdhui = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    $$("[data-date-min]", form).forEach((d) => (d.min = aujourdhui));
    const soumettre = (e) => {
      e?.preventDefault();
      const aVerifier = $$(".message-cadeau [required]", form);
      if (aVerifier.length && !valider(form, aVerifier)) return;
      const fd = new FormData(form);
      ajouter(v, { qte: +champ.value || 1, message: bascule?.checked ? (fd.get("message") || "").trim() : "", destinataire: fd.get("destinataire") || "", date_envoi: fd.get("date_envoi") || "" });
    };
    form.addEventListener("submit", soumettre);
    $("[data-barre-ajouter]")?.addEventListener("click", soumettre);
    evenement("view_item", { ecommerce: { currency: "EUR", value: v.prix, items: [item(v)] } });
    // Barre d'achat fixe quand le bouton principal sort de l'écran
    const barre = $("[data-barre-achat]"), btn = $("[data-ajouter]", form);
    if (barre && btn && "IntersectionObserver" in window) new IntersectionObserver(([en]) => { barre.hidden = en.isIntersecting; }).observe(btn);
    // Galerie
    const piste = $("[data-galerie]"), pos = $("[data-galerie-pos]");
    if (piste && pos) {
      const n = piste.children.length; const aller = (d) => piste.scrollBy({ left: d * piste.clientWidth, behavior: reduit ? "auto" : "smooth" });
      $("[data-galerie-prec]")?.addEventListener("click", () => aller(-1));
      $("[data-galerie-suiv]")?.addEventListener("click", () => aller(1));
      piste.addEventListener("scroll", () => { pos.textContent = `${Math.round(piste.scrollLeft / piste.clientWidth) + 1} / ${n}`; }, { passive: true });
    }
    // Date de livraison estimée
    const re = $("[data-reassurance]");
    if (re && f.dataset.handle !== "carte-cadeau") catalogue().then((cat) => { const w = fenetre(cat.livraison, "domicile"); re.textContent = `Livré à domicile entre le ${jour(w.min)} et le ${jour(w.max)} · Livraison dès 4,50${NBSP}€, offerte dès 45${NBSP}€ · Retrait gratuit à Hossegor`; });
  }
}

// ---------- Filtres des collections ----------
{
  const form = $("[data-filtres]");
  if (form) {
    const grille = $("[data-grille]"), cartes = $$(".carte", grille), ordre0 = [...grille.children];
    const panneau = $("[data-panneau-filtres]", form), ouvrirBtn = $("[data-ouvre-filtres]", form);
    const nomFiltre = $("fieldset input[type=checkbox]", form)?.name;
    const appliquer = () => {
      const fd = new FormData(form), vals = fd.getAll(nomFiltre), min = parseFloat(fd.get("min")), max = parseFloat(fd.get("max"));
      let n = 0;
      cartes.forEach((c) => { const p = +c.dataset.prix; const ok = (!vals.length || vals.includes(c.dataset[nomFiltre])) && (isNaN(min) || p >= min) && (isNaN(max) || p <= max); c.hidden = !ok; if (ok) n++; });
      $$(".bloc-grille", grille).forEach((b) => (b.hidden = vals.length > 0 || !isNaN(min) || !isNaN(max)));
      const tri = fd.get("tri");
      const tries = tri ? [...cartes].sort((a, b) => (tri === "prix-asc" ? 1 : -1) * (+a.dataset.prix - +b.dataset.prix)) : ordre0;
      tries.forEach((c) => grille.appendChild(c));
      $("[data-compte]", form).textContent = `${n} produit${n > 1 ? "s" : ""}`;
      $("[data-voir-nb]", form).textContent = n;
      $("[data-aucun]").hidden = n > 0;
      const actifs = [...vals.map((x) => [nomFiltre, x, x]), ...(isNaN(min) ? [] : [["min", "", `dès ${min} €`]]), ...(isNaN(max) ? [] : [["max", "", `jusqu'à ${max} €`]])];
      $("[data-filtres-actifs]", form).innerHTML = actifs.map(([nom, val, lib]) => `<button class="filtre-actif" type="button" data-retirer-filtre="${nom}" data-val="${esc(val)}">${esc(lib)} <span aria-hidden="true">×</span><span class="visuellement-cache">, retirer le filtre</span></button>`).join("") + (actifs.length > 1 ? `<button class="filtre-actif" type="button" data-effacer>Tout effacer</button>` : "");
      $("[data-nb-filtres]", form).textContent = actifs.length ? `(${actifs.length})` : "";
      const u = new URL(location); u.search = ""; vals.forEach((x) => u.searchParams.append(`filter.p.m.custom.${nomFiltre}`, x)); if (!isNaN(min)) u.searchParams.set("filter.v.price.gte", min); if (!isNaN(max)) u.searchParams.set("filter.v.price.lte", max); if (tri) u.searchParams.set("sort_by", tri); history.replaceState(null, "", u);
    };
    form.addEventListener("change", appliquer);
    form.addEventListener("input", (e) => { if (e.target.type === "number") appliquer(); });
    form.addEventListener("submit", (e) => e.preventDefault());
    document.addEventListener("click", (e) => {
      const r = e.target.closest("[data-retirer-filtre]");
      if (r) { const nom = r.dataset.retirerFiltre; if (nom === "min" || nom === "max") form.elements[nom].value = ""; else $$(`input[name="${nom}"]`, form).find((i) => i.value === r.dataset.val).checked = false; appliquer(); ouvrirBtn?.focus(); }
      if (e.target.closest("[data-effacer]")) { e.preventDefault(); form.reset(); appliquer(); }
    });
    const fermer = () => { panneau.classList.remove("ouvert"); ["role", "aria-modal", "aria-labelledby"].forEach((a) => panneau.removeAttribute(a)); ouvrirBtn.setAttribute("aria-expanded", "false"); ouvrirBtn.focus(); };
    ouvrirBtn?.addEventListener("click", () => { panneau.classList.add("ouvert"); panneau.setAttribute("role", "dialog"); panneau.setAttribute("aria-modal", "true"); panneau.setAttribute("aria-labelledby", $("h2", panneau).id); ouvrirBtn.setAttribute("aria-expanded", "true"); $("input", panneau)?.focus(); });
    $("[data-ferme-filtres]", form)?.addEventListener("click", fermer);
    $("[data-voir]", form)?.addEventListener("click", fermer);
    panneau.addEventListener("keydown", (e) => {
      if (!panneau.classList.contains("ouvert")) return;
      if (e.key === "Escape") return fermer();
      // Panneau plein écran (mobile) : le focus reste dans le panneau tant qu'il est ouvert
      if (e.key === "Tab") {
        const f = $$("button, input, select, a[href]", panneau).filter((x) => !x.disabled && x.offsetParent !== null);
        const [premier, dernier] = [f[0], f[f.length - 1]];
        if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
        else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
      }
    });
    // Filtres présents dans l'adresse
    const ps = new URLSearchParams(location.search);
    ps.getAll(`filter.p.m.custom.${nomFiltre}`).forEach((x) => { const i = $$(`input[name="${nomFiltre}"]`, form).find((c) => c.value === x); if (i) i.checked = true; });
    if (ps.get("filter.v.price.gte")) form.elements.min.value = ps.get("filter.v.price.gte");
    if (ps.get("filter.v.price.lte")) form.elements.max.value = ps.get("filter.v.price.lte");
    if (ps.get("sort_by")) form.elements.tri.value = ps.get("sort_by");
    if ([...ps.keys()].length) appliquer();
  }
}

// ---------- Recherche ----------
const normaliser = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
async function chercher(q) {
  const cat = await catalogue();
  const nq = normaliser(q.trim());
  if (nq.length < 2) return [];
  const termes = [nq, ...Object.entries(cat.synonymes).filter(([k]) => normaliser(k).includes(nq) || nq.includes(normaliser(k))).flatMap(([, v]) => v.map(normaliser))];
  // Pluriels : « sablés », « coffrets », « biscuits » cherchent la forme au singulier ; tous les mots doivent être présents
  const singulier = (m) => (m.length > 3 ? m.replace(/[sx]$/, "") : m);
  const mots = (s) => s.split(/[^a-z0-9]+/).filter(Boolean).map(singulier);
  const trouve = (texte, t) => { const dispo = mots(texte).join(" "); return mots(t).every((m) => dispo.includes(m)); };
  return cat.produits
    .filter((p) => termes.some((t) => trouve(normaliser(p.mots), t)))
    .sort((a, b) => trouve(normaliser(b.titre), nq) - trouve(normaliser(a.titre), nq)); // les produits dont le nom contient la recherche d'abord
}
const suggestionHtml = (p) => `<a class="suggestion" href="${lien(p.url)}"><img src="${p.image}" alt="" width="56" height="70"><span>${esc(p.titre.split(",")[0])}<small>${p.variantes.length > 1 ? "dès " : ""}${euros(p.prixMin)}</small></span></a>`;
{
  const champ = $("#recherche-champ"), zone = $("[data-suggestions]");
  let minuterie;
  champ?.addEventListener("input", () => { clearTimeout(minuterie); minuterie = setTimeout(async () => { const r = await chercher(champ.value); zone.innerHTML = champ.value.trim().length < 2 ? "" : r.length ? `<p class="aide">Produits</p>${r.slice(0, 6).map(suggestionHtml).join("")}` : `<p>Aucun produit ne correspond à « ${esc(champ.value)} ». Essayez « caramel », « chocolat » ou « coffret ».</p>`; }, 120); });
  $$("form[role=search]").forEach((f) => f.addEventListener("submit", () => evenement("search", { search_term: f.q.value })));
  const res = $("[data-resultats-recherche]");
  const q = new URLSearchParams(location.search).get("q");
  if (res && q) {
    $("#rp-champ").value = q;
    chercher(q).then((r) => {
      res.innerHTML = r.length
        ? `<h2>Résultats pour « ${esc(q)} »</h2><p>${r.length} produit${r.length > 1 ? "s" : ""}</p><div class="recherche-resultats">${r.map(suggestionHtml).join("")}</div>`
        : `<h2>Aucun résultat</h2><p>Aucun produit ne correspond à « ${esc(q)} ». Essayez « caramel », « chocolat » ou « coffret », ou parcourez <a href="${lien("/collections/biscuits")}">nos biscuits</a>, <a href="${lien("/collections/coffrets-cadeaux")}">nos coffrets et cadeaux</a> ou les <a href="${lien("/pages/faq")}">questions fréquentes</a>.</p>`;
    });
  }
}

// ---------- Validation des formulaires (erreurs à côté du champ + résumé) ----------
function champValide(c) {
  let ok = c.checkValidity();
  if (ok && c.name?.endsWith("_cp") && c.value && !/^(?!9[78])\d{5}$/.test(c.value.trim())) ok = false;
  if (ok && c.type === "tel" && c.required && !/^0[67](\s?\d{2}){4}$/.test(c.value.trim())) ok = false;
  if (ok && c.type === "date" && c.min && c.value && c.value < c.min) ok = false;
  return ok;
}
// Un champ signalé en erreur est revérifié dès qu'on le quitte : le message disparaît une fois corrigé
document.addEventListener("focusout", (e) => {
  const c = e.target; if (!c.matches?.("[aria-invalid='true']") || !champValide(c)) return;
  c.removeAttribute("aria-invalid"); const m = document.getElementById(c.id + "-erreur"); if (m) m.hidden = true;
  // Le résumé suit : l'erreur corrigée en disparaît, le compte est mis à jour
  const f = c.form, r = f && $("[data-resume-erreurs]", f); if (!r || r.hidden) return;
  r.querySelector(`a[href="#${c.id}"]`)?.closest("li")?.remove();
  const n = r.querySelectorAll("li").length;
  if (!n) r.hidden = true; else r.querySelector("strong").textContent = `${n} champ${n > 1 ? "s sont" : " est"} à corriger :`;
});
function valider(form, champs, autres = []) {
  let erreurs = [];
  champs.forEach((c) => {
    const id = c.id + "-erreur";
    let msg = document.getElementById(id);
    let ok = champValide(c);
    if (!ok) {
      if (!msg) { msg = document.createElement("p"); msg.className = "erreur-champ"; msg.id = id; c.insertAdjacentElement("afterend", msg); }
      msg.textContent = c.dataset.erreur || "Ce champ est à compléter.";
      msg.hidden = false; c.setAttribute("aria-invalid", "true");
      c.setAttribute("aria-describedby", [...new Set([...(c.getAttribute("aria-describedby") || "").split(" ").filter(Boolean), id])].join(" "));
      erreurs.push([c, msg.textContent]);
    } else if (msg) { msg.hidden = true; c.removeAttribute("aria-invalid"); }
  });
  erreurs.push(...autres); // erreurs de groupe (ex. mode de livraison)
  const resume = $("[data-resume-erreurs]", form);
  if (resume) {
    resume.hidden = !erreurs.length;
    if (erreurs.length) {
      resume.innerHTML = `<p><strong>${erreurs.length} champ${erreurs.length > 1 ? "s sont" : " est"} à corriger&#8239;:</strong></p><ul>${erreurs.map(([c, m]) => `<li><a href="#${c.id}">${esc(m)}</a></li>`).join("")}</ul>`;
      resume.focus();
    }
  } else if (erreurs.length) erreurs[0][0].focus();
  return !erreurs.length;
}

$$("form[data-formulaire='lettre']").forEach((f) => f.addEventListener("submit", (e) => {
  e.preventDefault(); const c = f.email; const err = $(".erreur-champ", f);
  if (!c.checkValidity()) { err.textContent = "Indiquez une adresse e-mail valide, par exemple nom@exemple.fr."; err.hidden = false; c.setAttribute("aria-invalid", "true"); c.setAttribute("aria-describedby", err.id); c.focus(); return; }
  err.hidden = true; c.removeAttribute("aria-invalid"); f.reset(); $(".confirmation", f).hidden = false; evenement("sign_up", { method: "newsletter" });
}));
$$("form[data-formulaire='contact']").forEach((f) => f.addEventListener("submit", (e) => {
  e.preventDefault(); if (!valider(f, $$("[required]", f))) return;
  const sujet = f.sujet.value; f.reset(); const conf = $(".confirmation", f); conf.hidden = false; conf.setAttribute("tabindex", "-1"); conf.focus(); evenement("generate_lead", { form: "contact", subject: sujet });
}));
$$("form[data-formulaire='retractation']").forEach((f) => {
  const etape = (n) => { $$("[data-etape]", f).forEach((x) => (x.hidden = x.dataset.etape !== String(n))); $(`[data-etape="${n}"] h2`, f)?.focus(); };
  // « Une partie de la commande » : on demande quels produits
  f.addEventListener("change", (e) => { if (e.target.name !== "portee") return; const partie = e.target.value === "partie", z = $("[data-produits-zone]", f); z.hidden = !partie; f.produits.required = partie; });
  f.addEventListener("submit", (e) => { e.preventDefault(); if (!valider(f, $$("[data-etape='1'] [required]", f).filter((c) => !c.closest("[hidden]")))) return; $("[data-recap]", f).textContent = `${f.nom.value} · commande ${f.commande.value} · ${f.portee.value === "toute" ? "toute la commande" : "produits : " + f.produits.value.trim()}`; etape(2); });
  $("[data-retour]", f).addEventListener("click", () => etape(1));
  $("[data-confirmer]", f).addEventListener("click", () => { const d = new Date(); $("[data-horodatage]", f).textContent = `Enregistrée le ${d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} à ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}. Dans une vraie boutique, un accusé de réception vous serait envoyé immédiatement par e-mail, avec les instructions de retour.`; etape(3); });
});

// ---------- Commande simulée ----------
{
  const zone = $("[data-commande]");
  // Panier vide : message affiché tout de suite, sans attendre le catalogue (évite un saut de mise en page)
  if (zone && !lirePanier().length) zone.innerHTML = `<div class="commande-tete"><h1>Votre panier est vide</h1><p class="actions"><a class="bouton" href="${lien("/collections/coffrets-cadeaux")}">Nos coffrets à offrir</a><a class="lien-fort" href="${lien("/collections/biscuits")}">Nos biscuits</a></p></div>`;
  else if (zone) catalogue().then((cat) => {
    const liv = cat.livraison;
    const form = $("form", zone), recap = $("[data-recap-corps]", zone);
    const p = lirePanier();
    const carteSeule = p.every((l) => l.handle === "carte-cadeau");
    let remise = 0;
    const st = sousTotal(p);
    const mode = () => form.livraison?.value || "";
    const fraisMode = (id) => { const m = liv.modes.find((x) => x.id === id); if (!m || carteSeule) return 0; return m.offert_des_seuil && st >= liv.seuil_livraison_offerte ? 0 : m.prix; };
    const total = () => Math.max(0, st + fraisMode(mode()) - remise);
    const majRecap = () => {
      recap.innerHTML = p.map((l) => `<div class="recap-ligne"><span>${l.qte} × ${esc(l.nom)}${l.variante ? " " + esc(l.variante) : ""}${l.message ? `<br><small>Message cadeau : « ${esc(l.message.length > 60 ? l.message.slice(0, 57) + "…" : l.message)} »</small>` : ""}</span><span>${euros(l.prix * l.qte)}</span></div>`).join("") +
        `<dl class="totaux"><dt>Sous-total</dt><dd>${euros(st)}</dd><dt>Livraison</dt><dd>${carteSeule ? "aucune" : mode() ? (fraisMode(mode()) ? euros(fraisMode(mode())) : "Offerte") : "à choisir"}</dd>${remise ? `<dt>Carte cadeau</dt><dd>− ${euros(remise)}</dd>` : ""}<dt class="total">Total</dt><dd class="total">${euros(total())}</dd></dl>` +
        (st < liv.seuil_livraison_offerte && !carteSeule ? `<p class="note">Plus que ${euros(liv.seuil_livraison_offerte - st)} pour la livraison offerte. <a href="${lien("/cart")}">Compléter ma commande</a></p>` : "");
      $("[data-recap-resume]", zone).textContent = `Votre commande (${nbArticles(p)} article${nbArticles(p) > 1 ? "s" : ""}) · ${euros(total())}`;
    };
    // Modes : prix et dates
    liv.modes.forEach((m) => {
      const pz = $(`[data-prix-mode="${m.id}"]`, zone); if (pz) pz.textContent = fraisMode(m.id) ? euros(fraisMode(m.id)) : m.id === "retrait_atelier" ? "Gratuit" : "Offerte";
      const dz = $(`[data-date-mode="${m.id}"]`, zone); const w = fenetre(liv, m.id);
      if (dz) dz.textContent = m.id === "retrait_atelier" ? `Prêt le ${jour(w.pret)}, ${m.horaires}` : `${m.id === "domicile" ? "Livré" : "Disponible"} entre le ${jour(w.min)} et le ${jour(w.max)}`;
    });
    const majAdresse = () => { const inutile = carteSeule || mode() === "retrait_atelier"; $("[data-zone-adresse]", zone).hidden = inutile; $("[data-sans-adresse]", zone).hidden = !inutile; };
    if (carteSeule) { $("[data-modes]", zone).hidden = true; $("[data-carte-seule]", zone).hidden = false; $$("[name=livraison]", form).forEach((r) => (r.required = false)); }
    form.addEventListener("change", (e) => {
      if (e.target.name === "livraison") {
        const relais = e.target.value === "point_relais"; $("[data-relais]", zone).hidden = !relais; form.tel.required = relais;
        $("#modes-erreur").hidden = true; majAdresse();
        evenement("add_shipping_info", { ecommerce: { currency: "EUR", value: +st.toFixed(2), shipping_tier: e.target.value, items: p.map((l) => item(l, l.qte)) } });
        majRecap();
      }
      if (e.target.matches("[data-autre-adresse]")) { const z = $("[data-zone-autre]", zone); z.hidden = !e.target.checked; e.target.setAttribute("aria-expanded", String(e.target.checked)); $$("input:not([name$=complement])", z).forEach((i) => (i.required = e.target.checked)); }
    });
    $("[data-exemple]", zone).addEventListener("click", () => {
      const ex = { email: "exemple@exemple.fr", k_prenom: "Camille", k_nom: "Exemple", k_adresse: "1 rue de l'Exemple", k_cp: "40150", k_ville: "Hossegor" };
      Object.entries(ex).forEach(([k, val]) => (form.elements[k].value = val));
      if (!mode() && !carteSeule) { form.livraison[0].checked = true; form.dispatchEvent(new Event("change")); form.livraison[0].dispatchEvent(new Event("change", { bubbles: true })); }
      $$("[aria-invalid='true']", form).forEach((c) => { if (champValide(c)) { c.removeAttribute("aria-invalid"); const m = document.getElementById(c.id + "-erreur"); if (m) m.hidden = true; } });
      if (!$("[aria-invalid='true']", form)) $("[data-resume-erreurs]", form).hidden = true;
      annonce("Formulaire rempli avec des données d'exemple");
    });
    $("[data-appliquer-code]", zone).addEventListener("click", () => {
      const code = form.code.value.trim().toUpperCase(), ret = $("[data-code-retour]", zone);
      if (code === "SABLE-DEMO-20") { remise = Math.min(20, st + fraisMode(mode())); ret.textContent = `Carte cadeau appliquée : − ${euros(remise)}${remise < 20 ? ` (le solde de ${euros(20 - remise)} reste sur la carte)` : ""}.`; form.code.removeAttribute("aria-invalid"); }
      else { remise = 0; ret.textContent = "Ce code n'existe pas. Vérifiez-le ou essayez SABLE-DEMO-20."; form.code.setAttribute("aria-invalid", "true"); }
      majRecap();
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const champs = $$("[required]", form).filter((c) => c.type !== "radio" && !c.closest("[hidden]"));
      const sansMode = !carteSeule && !mode();
      $("#modes-erreur").hidden = !sansMode;
      if (!valider(form, champs, sansMode ? [[$("#k-livraison"), "Choisissez un mode de livraison."]] : [])) return;
      evenement("add_payment_info", { ecommerce: { currency: "EUR", value: +st.toFixed(2), payment_type: "simulation", items: p.map((l) => item(l, l.qte)) } });
      let id = sessionStorage.getItem("ms-commande");
      const d = new Date();
      if (!id) {
        id = `MS-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}${String(d.getSeconds()).padStart(2, "0")}`;
        try { sessionStorage.setItem("ms-commande", id); } catch {}
        evenement("purchase", { ecommerce: { transaction_id: id, currency: "EUR", value: +st.toFixed(2), shipping: fraisMode(mode()), items: p.map((l) => item(l, l.qte)) } });
      }
      const m = mode(), w = m ? fenetre(liv, m) : null;
      const quand = carteSeule ? "La carte cadeau sera envoyée par e-mail à la date choisie." : m === "retrait_atelier" ? `Votre commande sera prête le ${jour(w.pret)} à l'atelier d'Hossegor, du mardi au samedi, 10 h – 13 h et 15 h – 19 h.` : `Livraison prévue entre le ${jour(w.min)} et le ${jour(w.max)}${m === "point_relais" ? ` au ${esc(form.relais.value)}` : " à l'adresse indiquée"}.`;
      const conf = $("[data-confirmation]", zone);
      conf.innerHTML = `<h1 id="conf-titre">Merci, votre commande fictive est validée</h1><p>Commande n° <strong>${id}</strong>. Dans une vraie boutique, vous recevriez une confirmation par e-mail et un lien de suivi.</p><p>${quand}</p>${recap.innerHTML}
        <h2>Et maintenant&#8239;?</h2><p>Vous venez de parcourir une boutique conçue de bout en bout par Mokom Studio.</p>
        <p class="actions"><a class="bouton" href="${lien("/pages/etude-de-cas")}" data-evenement="mokom_case_study_click" data-emplacement="confirmation">Découvrir la démarche</a><a class="lien-fort" href="${lien("/")}">Retourner à la boutique</a></p>`;
      conf.hidden = false; zone.classList.add("confirmee"); form.reset(); try { localStorage.removeItem(CLE); sessionStorage.removeItem("ms-commande"); } catch {}
      majPanier(); scrollTo(0, 0); conf.focus();
    });
    if (matchMedia("(min-width: 960px)").matches) $("[data-recap-details]", zone).open = true;
    majAdresse(); majRecap();
  });
}

majPanier();
