# Référencement technique — Maison Sable

> Étape « seo-technique » · 2026-09-28 · Contrôle automatique des 31 pages construites : `npm run check:seo` (`scripts/verifier-seo.mjs`), à relancer après chaque modification.
> Rappel : le site est volontairement **en `noindex`** (décision B de Morgane). Tout le référencement est réalisé dans le code pour la démonstration, mais aucune page ne sera affichée par Google.

## Résultat : ✅ conforme (31 pages, 25 adresses dans le plan du site)

| Contrôle | Règle | Résultat |
|---|---|---|
| Langue | `<html lang="fr">` sur chaque page | ✅ |
| Titre principal | un seul `h1` par page, identique à `docs/seo/metas.csv` | ✅ (la commande simulée a un titre de confirmation caché tant qu'elle n'est pas validée) |
| Hiérarchie des titres | aucun saut de niveau (h1 → h2 → h3) | ✅ après correction (page 404 et « Tous les produits ») |
| Title et description | présents, uniques, identiques à `metas.csv` (longueurs déjà contrôlées par `verifier-metas.mjs`) | ✅ |
| Adresse de référence (canonical) | absolue et auto-référente sur chaque page ; les adresses de filtre et de tri (`?filter…`, `?sort_by=`, `?variant=`) pointent vers la page sans paramètre, puisque c'est le même fichier | ✅ |
| Consigne aux robots | `noindex` sur toutes les pages (décision B) ; pages utilitaires (panier, commande, recherche, rétractation, `/collections/all`, 404) exclues du plan du site | ✅ |
| Plan du site | `sitemap.xml` : seules les pages indexables par conception (accueil, 2 collections, 11 fiches, atelier, FAQ, contact, étude de cas, journal, article, 5 pages légales), avec date de modification réelle ; aucune adresse sans page | ✅ |
| `robots.txt` | déclare le plan du site. **Sans effet sur GitHub Pages** pour un site de projet (le fichier lu est celui de la racine du domaine) : le `noindex` page par page prend le relais | ✅ (limite connue) |
| Partage (Open Graph) | titre, description, adresse, image 1200 × 630 sur chaque page | ✅ |
| Images | texte alternatif et dimensions déclarées sur toutes les images (zéro décalage) ; photos en WebP | ✅ |
| Liens internes | aucun lien cassé vers une page du site | ✅ |
| Rendu | tout le contenu est dans le HTML servi (site statique) : lisible sans JavaScript par les moteurs et les IA | ✅ |
| Données structurées | JSON-LD valide : `Organization` + `WebSite` (accueil), `BreadcrumbList` + `ItemList` (collections), `ProductGroup` / `Product` + `Offer` avec prix, devise, disponibilité et frais de livraison (fiches), `Article` + `BreadcrumbList` (article). **Aucune note ni aucun avis** (avis fictifs). | ✅ |

## À faire à la mise en ligne
- Remplacer l'adresse provisoire `SITE_URL` (`src/config.mjs`) par `https://<compte>.github.io` ; toutes les adresses de référence, le plan du site et l'image de partage suivront. **À fournir par Morgane : le compte GitHub.**
- Tester une fiche produit dans l'outil de test des résultats enrichis de Google (possible même en `noindex`, avec l'adresse publique).
- Search Console et Bing Webmaster Tools : sans objet (site non indexé, par choix).

## Porte de sortie (phase D)
- [x] Contenu, liens et données structurées dans le HTML servi.
- [x] `robots.txt`, `sitemap.xml`, canonicals conformes ; `noindex` sur les pages sans valeur de recherche (et partout, décision B).
- [x] Balisage : `lang`, un `h1`, hiérarchie sans saut, `alt` et dimensions, Open Graph.
- [x] JSON-LD valide, sans avis auto-attribués ; `FAQPage` non utilisé (aucun effet dans Google).
- [ ] `/claude-seo-ai:audit` complet : lors de l'audit final (`/mokom:audit`), qui combine tous les contrôles.
