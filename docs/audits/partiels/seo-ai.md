# SEO + visibilité IA (claude-seo-ai) — rapport partiel · 2026-09-28

> `/claude-seo-ai:audit http://localhost:4321/maison-sable/ --environment local --vertical ecommerce --pages 12`
> Dossier : `C:/Users/Tabouret/.claude/plugins/data/claude-seo-ai-claude-seo-ai/runs/localhost_4321/2026-09-28T16-22-15Z/` (rapport automatique : `report.md`).
> 12 pages analysées (accueil, étude de cas, 2 collections, atelier, FAQ, recherche, panier, 2 coffrets, journal, contact) + 4 spécialistes (technique, recherche IA, contenus/confiance, données structurées), qui ont aussi lu dans `dist/` la fiche Sablé Dune, le Croquant Lagune, la carte cadeau et l'article.
> Note de méthode : la fusion automatique des avis des spécialistes dans le score n'a été faite que pour l'un d'eux (les autres rapports n'ont pas pu être enregistrés en fichier). **Les scores ci-dessous sont ceux de l'analyse automatique**, corrigés à la main des faux positifs listés plus bas.

## Scores
| Score | Valeur | Lecture |
|---|---|---|
| SEO (recherche) | 45/100 (F) | **trompeur en aperçu local** : l'essentiel des points perdus vient du `noindex` voulu, des adresses canoniques et de l'image de partage qui pointent vers la future adresse GitHub (pas encore en ligne) et d'un faux « Article manquant » sur 6 pages qui ne sont pas des articles |
| Visibilité IA | 48/100 (F, partiel) | plafonnée par le `noindex` voulu (Google exclut une page non indexable de ses réponses IA) |

Hors effets du `noindex` et de l'aperçu local, les spécialistes ne relèvent **aucun défaut bloquant**.

## Faux positifs écartés (preuves dans les rapports des spécialistes)
| Constat automatique | Pourquoi il est faux ici |
|---|---|
| `M2.canonical.noindex_conflict` (12 pages) | la canonique pointe vers la même page sur l'adresse de production ; seul l'hôte diffère (localhost) |
| `M8.og.image_unreachable` | l'image de partage est sur l'adresse GitHub, pas encore publiée |
| `M5.article.missing` (6 pages) | accueil, collections, coffrets, atelier ne sont pas des articles ; l'article du journal a bien son `Article` valide |
| `M17.sitemap.missing`, `M1.robots.*` | le plan du site existe (`/maison-sable/sitemap.xml`, 25 adresses, valide) ; en local, `/robots.txt` redirige vers l'accueil |
| `M21.llmstxt.malformed`, `agents.md` présent, UCP 200 | fichiers absents par choix ; le serveur local renvoie l'accueil |
| `M22.links.empty_name` | photos des cartes produit masquées volontairement, doublées par le lien du nom |

## Constats réels
### Important (à corriger avant de lever un jour le `noindex`, recommandé avant publication)
1. **Barre oblique finale** — Chaque page est un dossier (`collections/biscuits/index.html`) mais liens, canoniques, `og:url`, plan du site et `@id` sont écrits sans `/` final. **GitHub Pages répondra par une redirection 301** vers l'adresse avec `/`. Correction : générer toutes les adresses de page avec `/` final dans `src/config.mjs`/`build.mjs`, et faire imiter ce comportement par `src/serve.mjs`.
2. **Mentions légales incomplètes** (éditeur Mokom Studio : forme juridique, nom, adresse, SIREN, e-mail, directrice de publication) — à fournir par Morgane. Obligation légale (LCEN art. 6).

### Améliorations (données structurées)
3. Variantes des `ProductGroup` sans `image` ni `brand` propres (6 fiches) → recopier ceux du groupe.
4. Aucun `@id`/`url` sur Product, ProductGroup, Article ; pas de `manufacturer`/`seller` → relier à `#organisation`.
5. Éditeur de l'article (Mokom Studio) ≠ éditeur du site (Maison Sable) ; auteur « Maison Sable (fictif) » anonyme → un seul éditeur par `@id`, signature liée à la page atelier ; `BlogPosting` + `Blog` sur le journal (facultatif).
6. Politique de retour visible mais pas en `MerchantReturnPolicy` (14 jours, remboursement intégral) ; seuil de livraison offerte (45 €) non déclaré.
7. Carte cadeau : un seul `sku` (20 €) pour 3 offres → `sku` par offre.

### Améliorations (contenu, partage)
8. Image de partage unique sur toutes les pages (y compris fiches produit) et lourde (partage.png 841 Ko) → image par produit + version allégée.
9. Étude de cas : section « Les résultats mesurés » vide (« publiées après l'audit final ») → y reporter les mesures datées de cet audit. Même promesse dans les mentions légales (accessibilité).
10. Étude de cas sans nom d'autrice ni lien réel → signature réelle à fournir par Morgane.
11. Dates limites de Noël sans année (« mardi 15 décembre ») → ajouter 2026.
12. Texte alternatif des photos principales de fiche sans nom du produit (facultatif).
13. `lastmod` du plan du site = date de génération pour toutes les pages (facultatif).

## Ce qui est bien
- Contenu, titres et données structurées présents dans le HTML servi ; aucun script bloquant.
- 1 seul `h1`, aucun saut de niveau, `<main>` partout ; viewport correct.
- Aucun lien interne cassé, vraie page 404, aucune page orpheline, aucun libellé de lien générique.
- Images WebP dimensionnées, `srcset`, chargement différé sous la ligne de flottaison.
- `ProductGroup` + `hasVariant` pour les formats ; prix identiques entre page, données structurées et flux d'exemple (16 articles).
- Filtres sans adresse indexable ; avis fictifs non balisés (conforme aux règles de Google) ; fiction signalée partout.
- Articles sourcés (CNIEL vérifié), dates cohérentes.

## À refaire après publication
`/claude-seo-ai:audit https://mokomstudio-pro.github.io/maison-sable/` : vérifier les 301 de barre oblique, l'image de partage, les en-têtes, l'accès des robots (`ua-diff`).
