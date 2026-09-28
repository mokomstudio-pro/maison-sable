// Construit le site statique dans dist/ à partir des sources du projet.
import { mkdirSync, writeFileSync, rmSync, cpSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { absolue, NOINDEX } from "./config.mjs";
import { produits, merch, livraison } from "./lib/data.mjs";
import { illustrationProduit, illustrationCoupeTrois, imagePartage, C } from "./lib/illustrations.mjs";
import { donneesVariante, imageProduit } from "./lib/composants.mjs";
import accueil from "./pages/accueil.mjs";
import collection, { toutes } from "./pages/collection.mjs";
import fiche from "./pages/produit.mjs";
import * as P from "./pages/pages.mjs";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(racine, "dist");
rmSync(dist, { recursive: true, force: true });

const ecrire = (chemin, contenu) => {
  const f = join(dist, chemin);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, contenu);
};
const pageHtml = (chemin, html) => ecrire(chemin === "/" ? "index.html" : chemin.endsWith(".html") ? chemin : join(chemin, "index.html"), html);

// Pages : chemin public → rendu. `indexable` suit docs/05-architecture.md (sitemap).
const pages = [
  ["/", accueil, true],
  ["/collections/biscuits", () => collection("biscuits"), true],
  ["/collections/coffrets-cadeaux", () => collection("coffrets-cadeaux"), true],
  ["/collections/all", toutes, false],
  ...produits.map((p) => [`/products/${p.handle}`, () => fiche(p.handle), true]),
  ["/pages/atelier-hossegor", P.atelier, true],
  ["/pages/faq", P.faq, true],
  ["/pages/contact", P.contact, true],
  ["/pages/etude-de-cas", P.etudeDeCas, true],
  ["/pages/retractation", P.retractation, false],
  ["/blogs/journal", P.journal, true],
  ["/blogs/journal/sable-galette-palet-difference", P.article, true],
  ["/policies/legal-notice", P.mentions, true],
  ["/policies/terms-of-service", P.cgv, true],
  ["/policies/privacy-policy", P.confidentialite, true],
  ["/policies/shipping-policy", P.livraisonPage, true],
  ["/policies/refund-policy", P.retoursPage, true],
  ["/cart", P.panier, false],
  ["/checkout", P.commande, false],
  ["/search", P.recherche, false],
  ["/404.html", P.erreur404, false],
];
for (const [chemin, rendu] of pages) pageHtml(chemin, rendu());

// Ressources
cpSync(join(racine, "src/assets"), join(dist, "assets"), { recursive: true, filter: (f) => !f.endsWith("maison-sable.css") }); // CSS intégré dans chaque page
// Photos d'illustration (scripts/photos.mjs) ; seule la carte cadeau garde un visuel dessiné
cpSync(join(racine, "src/images/photos"), join(dist, "images/photos"), { recursive: true });
ecrire("images/produits/carte-cadeau-1.svg", illustrationProduit("carte-cadeau", 1));
ecrire("images/coupe-sable-galette-palet.svg", illustrationCoupeTrois());
ecrire("images/partage.svg", imagePartage());
ecrire("images/favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${C.lagune}"/><circle cx="40" cy="26" r="12" fill="${C.corail}"/><path d="M0 44c16-8 34-8 64-2v22H0Z" fill="${C.sable}"/><path d="M16 50h32" stroke="${C.encre}" stroke-width="4" stroke-linecap="round"/></svg>`);
const og = join(racine, "src/images/partage.jpg");
if (existsSync(og)) cpSync(og, join(dist, "images/partage.jpg"));

// Données pour boutique.js : produits (panier, recherche), compléments, livraison
const catalogue = {
  produits: produits.map((p) => ({
    handle: p.handle, titre: p.titre, format: p.format, saveur: p.saveur, epuise: p.epuise, lies: p.produits_lies,
    image: imageProduit(p.handle, 1, 480), url: `/products/${p.handle}`, prixMin: p.prixMin,
    mots: [p.titre, p.saveur, p.type, p.format, p.ingredients, ...p.occasions].join(" ").toLowerCase(),
    variantes: p.variantes.map((v) => donneesVariante(p, v)),
  })),
  synonymes: { "beurre salé": ["caramel", "fleur de sel"], chocolat: ["vague"], cadeau: ["coffret", "boîte", "carte cadeau"], amande: ["lagune"], coco: ["lagon"], citron: ["écume"], caramel: ["marée"], pin: ["pignada"], noel: ["coffret", "boîte"], "noël": ["coffret", "boîte"] },
  complements: merch.panier_complements,
  ecartMax: merch.ecart_max_suggestion_panier,
  livraison,
};
ecrire("assets/catalogue.json", JSON.stringify(catalogue));

// Plan du site (pages indexables par conception) et robots.txt
const lastmod = new Date().toISOString().slice(0, 10);
ecrire("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(([, , i]) => i).map(([c]) => `  <url><loc>${absolue(c)}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`);
ecrire("robots.txt", `# Sans effet sur GitHub Pages (site de projet) : le robots.txt est lu à la racine du domaine.\n# Le site est en noindex page par page (${NOINDEX ? "décision validée" : "désactivé"}).\nUser-agent: *\nAllow: /\nSitemap: ${absolue("/sitemap.xml")}\n`);
ecrire(".nojekyll", "");

const n = pages.length;
const poidsJs = readFileSync(join(dist, "assets/boutique.js")).length;
console.log(`✓ ${n} pages construites dans dist/ · boutique.js ${(poidsJs / 1024).toFixed(1)} Ko (non compressé)`);
