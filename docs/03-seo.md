# Stratégie SEO — Maison Sable

> Étape « seo-geo » · 2026-09-27 · S'appuie sur `docs/02-recherche.md` (intentions), `docs/05-architecture.md` (pages) et `docs/fiche-entite.md` (faits).
> **Titles, descriptions et H1** de chaque page : [`docs/seo/metas.csv`](seo/metas.csv). C'est la source unique, contrôlée par `node scripts/verifier-metas.mjs` (longueurs, doublons). Les tableaux ci-dessous ne les recopient pas.

## 1. Carte requêtes → pages

| Page | Intention | Requête principale | Requêtes secondaires | Format attendu | Priorité | Action n°1 |
|---|---|---|---|---|---|---|
| Coffrets & cadeaux | transaction | coffret biscuits artisanaux | coffret gourmand cadeau, idée cadeau gourmand, boîte biscuits Noël, coffret biscuits livraison | collection de produits | **1** | ajouter un coffret |
| Accueil | navigation / découverte | Maison Sable | biscuiterie bord de mer, biscuits artisanaux Landes | page de marque | 1 | aller vers Coffrets / Biscuits |
| Biscuits | transaction | sablés artisanaux pur beurre | biscuiterie artisanale en ligne, biscuits artisanaux, sablés au beurre en ligne | collection de produits | 2 | ajouter au panier |
| L'atelier à Hossegor | locale | biscuits artisanaux Hossegor | biscuiterie Hossegor, souvenir gourmand Hossegor, que ramener des Landes | page éditoriale locale | 2 | aller vers Coffrets |
| Palet Marée | transaction | palets caramel beurre salé | sablés caramel beurre salé, biscuit caramel beurre salé | fiche produit | 2 | ajouter au panier |
| Sablé Dune | transaction | sablés fleur de sel | sablés beurre demi-sel, sablés pur beurre fleur de sel | fiche produit | 2 | ajouter au panier |
| Biscuit Vague | transaction | biscuits chocolat noir fleur de sel | sablés chocolat fleur de sel | fiche produit | 3 | ajouter au panier |
| Croquant Lagune | transaction | croquants aux amandes | croquant amandes orange | fiche produit | 3 | ajouter au panier |
| Sablé Pignada | transaction | sablés pignons de pin | sablés miel pignons | fiche produit | 3 | ajouter au panier |
| Sablé Écume | transaction | sablés citron thym | sablés citron | fiche produit | 3 | ajouter au panier |
| Sablé Lagon | transaction | sablés noix de coco | sablés coco vanille | fiche produit | 3 | ajouter au panier |
| Boîte Grande Plage | transaction | boîte de biscuits assortis | assortiment biscuits artisanaux, boîte biscuits cadeau | fiche produit | 2 | ajouter au panier |
| Coffret Été Indien | transaction | coffret biscuits artisanaux (variante « coffret garni ») | coffret gourmand Landes | fiche produit | 2 | ajouter au panier |
| Coffret Découverte | transaction | coffret découverte biscuits | assortiment dégustation biscuits | fiche produit | 2 | ajouter au panier |
| Carte cadeau | transaction | carte cadeau gourmande | carte cadeau biscuits | fiche produit | 4 | ajouter au panier |
| FAQ | information | combien de temps se conservent les sablés | livraison biscuits cassés, allergènes biscuits, message cadeau | questions-réponses | 3 | revenir aux collections |
| Article « Sablé, galette ou palet ? » | information | différence sablé galette palet | qu'est-ce qu'un palet breton, galette bretonne biscuit | article explicatif | 4 | aller vers Palet Marée |
| Contact, Journal, Étude de cas, pages légales | navigation | — | — | — | — | — |

**Contrôle anti-doublon** : aucune requête principale n'est ciblée par deux pages. « Coffret biscuits artisanaux » appartient à la collection. La fiche Coffret Été Indien vise sa **variante produit** (« coffret garni »), et son title commence par « Coffret de biscuits artisanaux Été Indien ». Le lien interne principal de la fiche renvoie vers la collection, qui reste la page de référence.

## 2. Entités (noms stables, repris tels quels partout)

| Entité | Type schema.org | Page de référence | Nom stable |
|---|---|---|---|
| La marque | `Organization` (pas `LocalBusiness` : pas d'adresse réelle à déclarer) | Accueil + L'atelier | « Maison Sable » |
| La fondatrice `[FICTIF]` | pas de `Person` balisée (personnage fictif) | L'atelier | « Jeanne » |
| Les 11 produits | `Product` / `ProductGroup` | fiches produit | titres du catalogue |
| Le lieu | `Place` via `areaServed` / texte | L'atelier | « Hossegor (Landes) » |
| Le site | `WebSite` | Accueil | « Maison Sable » |
| L'éditeur réel | `Organization` (Mokom Studio) | Étude de cas | « Mokom Studio » |

## 3. Autorité thématique
- **Piliers** : Coffrets & cadeaux, Biscuits.
- **Soutiens** : L'atelier (→ Coffrets), FAQ (→ les deux piliers), article « Sablé, galette ou palet ? » (→ Biscuits, Palet Marée), fiches produit (→ collection principale).
- 20 pages denses plutôt qu'une multitude de pages minces : pas de page par saveur, par occasion ou pour Noël (voir l'architecture).

## 4. Spécifications par page

### Accueil
- URL : `/` · Intention : navigation / découverte · Requête principale : Maison Sable
- Action n°1 : aller vers Coffrets & cadeaux (secondaire : Biscuits)
- Title, meta, H1 : `metas.csv`. Le H1 est la signature de la marque, et le logo est un `span`, pas un second H1.
- Plan :
  - H2 « Des coffrets à offrir, de la dune à votre table » : 3 coffrets et la boîte, lien vers la collection
  - H2 « Sept recettes pur beurre » : 4 recettes phares, lien vers Biscuits
  - H2 « Un atelier au bord de l'océan » : section histoire (image + 3 phrases + lien vers L'atelier)
  - H2 « Livraison, retrait et fraîcheur » : réassurance chiffrée (délai, tarif, seuil, retrait)
- Contenus obligatoires : définition de la marque (fiche d'entité, mot pour mot), prix d'appel, réassurance livraison, mention « projet fictif »
- Liens sortants : Coffrets & cadeaux, Biscuits, 4 fiches, L'atelier, FAQ
- Données structurées : `Organization` + `WebSite`
- Image principale : `images/accueil-hero.webp` · alt : « Sablés Maison Sable posés sur le sable clair d'une dune, océan en arrière-plan » `[image à créer]`
- Indexable : oui (règle de conception) ; voir décision B

### Coffrets & cadeaux
- URL : `/collections/coffrets-cadeaux` · Intention : transaction · Requête principale : coffret biscuits artisanaux
- Action n°1 : ajouter un coffret au panier
- Plan :
  - Introduction de 40 à 60 mots **au-dessus de la grille** : ce qu'on trouve, prix de 15,90 à 31,90 €, message cadeau, livraison
  - Grille des 6 produits, filtres Format et Prix
  - H2 « Comment choisir son coffret ? » : petit tableau comparatif (contenu, poids, prix, pour qui)
  - H2 « Offrir à distance : message cadeau et livraison » : délais, message, envoi direct au destinataire
  - H2 « Commander pour Noël » : **bloc saisonnier**, visible d'octobre à décembre, avec la date limite de commande `[À DÉCIDER à l'étape checkout]`
- Contenus obligatoires : fourchette de prix, délai, seuil de livraison offerte, message cadeau
- Liens entrants : en-tête, accueil, fiches (fil d'Ariane), L'atelier, FAQ · Sortants : 6 fiches, Biscuits
- Données structurées : `BreadcrumbList` + `ItemList`
- Indexable : oui ; filtres et tri non indexés

### Biscuits
- URL : `/collections/biscuits` · Intention : transaction · Requête principale : sablés artisanaux pur beurre
- Plan : introduction de 40 à 60 mots (7 recettes, pur beurre, dès 6,90 €) → grille des 7 produits (filtres Saveur, Prix) → H2 « Sablé, palet ou croquant : quelle texture choisir ? » (3 lignes, lien vers l'article) → H2 « Fraîcheur et conservation » (durée, conseil, lien FAQ)
- Liens : 7 fiches, Coffrets & cadeaux, article, FAQ
- Données structurées : `BreadcrumbList` + `ItemList`

### Fiche produit (gabarit commun aux 11 fiches)
- URL : `/products/<handle>` · Intention : transaction · Requête principale : voir la carte (§1)
- Title : `[Type au pluriel] [saveur], [Nom] | Maison Sable` (dans `metas.csv`). H1 = titre du catalogue.
- Plan (ordre de décision, mobile d'abord) :
  - En haut : galerie, H1, prix, sélecteur de poids (boutons), « Ajouter au panier », 1 ligne de réassurance (délai + tarif + seuil)
  - Paragraphe « réponse d'abord » de 40 à 60 mots : ce que c'est, le goût, la texture, pour quelle occasion, le lieu de fabrication
  - H2 « Ingrédients et allergènes » : liste complète avec les **allergènes en gras**, les traces, un tableau (poids net, nombre de biscuits environ, conservation)
  - H2 « Conseils de dégustation et de conservation »
  - H2 « Livraison et retrait » : chiffré, repris de la fiche d'entité
  - H2 « Questions fréquentes » : 2 ou 3 questions propres au produit
  - H2 « Vous aimerez aussi » : `produits_lies` du catalogue, plus les coffrets qui contiennent la recette
- Données structurées : `ProductGroup` (variantes de poids, `variesBy: weight`) ou `Product` pour les fiches à variante unique, avec `Offer` (prix, EUR, disponibilité, `shippingDetails`), `BreadcrumbList`, **sans `aggregateRating`**. Généré depuis le catalogue, jamais écrit à la main.
- Images : `images/produits/<handle>-<n>.webp`, alt selon `modele-donnees.md` §7
- Indexable : oui ; `?variant=` renvoie son canonical vers la fiche

### L'atelier à Hossegor
- URL : `/pages/atelier-hossegor` · Intention : locale · Requête principale : biscuits artisanaux Hossegor
- Plan :
  - Réponse d'abord (40 à 60 mots) : qui, quoi, où (définition de la fiche d'entité)
  - H2 « Une biscuiterie entre le lac marin et l'océan » : le lieu (faits réels sur Hossegor)
  - H2 « Des biscuits faits à la main, en petites séries » : la méthode `[FICTIF]`
  - H2 « Jeanne et l'équipe » `[FICTIF]`
  - H2 « Retirer sa commande à l'atelier » : horaires, gratuit, « adresse fictive »
  - H2 « Rapporter un souvenir d'Hossegor » : lien vers Coffrets
- Données structurées : `BreadcrumbList` (l'`Organization` est déclarée une seule fois, sur l'accueil)
- Remarque : **pas de fiche Google Business Profile** (entreprise fictive), donc aucune place dans les résultats locaux de Google (« pack local »). La page vise les résultats classiques.

### FAQ
- URL : `/pages/faq` · Intention : information · Requête principale : combien de temps se conservent les sablés
- Plan : 4 groupes en H2 (Fraîcheur et conservation · Livraison et retrait · Allergènes et ingrédients · Cadeaux et carte cadeau). Chaque question en H3, avec une réponse directe de 40 à 60 mots en tête (voir `docs/04-geo.md`).
- Données structurées : `BreadcrumbList`. Balisage `FAQPage` facultatif, sans effet dans Google depuis mai 2026 ; si on l'utilise, il passe par un seul générateur commun.

### Article « Sablé, galette ou palet ? »
- URL : `/blogs/journal/sable-galette-palet-difference` · Intention : information
- Plan : réponse d'abord (40 à 60 mots) → tableau comparatif (épaisseur, texture, origine) → H2 « D'où vient la galette de Pont-Aven ? » (faits sourcés) → H2 « Et chez Maison Sable ? » (Palet Marée, Sablé Dune) → sources citées
- Contenus obligatoires : **date de publication et de mise à jour visibles**, auteur (« L'atelier Maison Sable » `[FICTIF]`), sources externes (liens)
- Données structurées : `Article` + `BreadcrumbList`

### Contact · Journal · Étude de cas
- Contact : formulaire (simulé), e-mail et téléphone fictifs de la fiche d'entité, délai de réponse, lien vers la FAQ.
- Journal : liste des articles (un seul pour le moment).
- Étude de cas : explique que la marque est fictive, présente la démarche de Mokom Studio et renvoie vers son site. `Organization` Mokom Studio en `publisher`.

## 5. Règles techniques pour l'étape développement
- `<html lang="fr">`, un seul `h1`, niveaux de titres sans saut, `canonical` **absolu et auto-référent** sur chaque page (pour GitHub Pages : `https://<compte>.github.io/maison-sable/...`).
- `noindex` sur le panier, la recherche, la commande, `/collections/all`, et sur les adresses de filtre et de tri (canonical vers la collection).
- `sitemap.xml` : uniquement les pages indexables (20 moins les utilitaires), avec un `lastmod` réel.
- **Limite de GitHub Pages** : pour un site de projet (`<compte>.github.io/maison-sable/`), le `robots.txt` est lu **à la racine du domaine**, donc hors de notre contrôle. Le plan du site est déclaré par un lien et la balise `noindex` (décision B) est posée page par page, ce qui fonctionne sans `robots.txt`.
- Open Graph et carte de partage sur chaque page (image 1200 × 630).
- Données structurées générées depuis `produits.csv`, `variantes.csv` et `fiche-entite.md`. Un seul générateur par type.

## Porte de sortie
- [x] Chaque page a une intention unique, une requête principale et une spec (gabarit commun pour les 11 fiches).
- [x] Aucune cannibalisation (contrôle §1).
- [x] Architecture à 2 clics maximum et maillage défini page par page (`05-architecture.md` §6).
- [x] Titles et descriptions contrôlés automatiquement (20 pages conformes, aucun doublon).
- [ ] Après le développement : `/claude-seo-ai:audit`, JSON-LD, plan du site, canonicals. Le `noindex` global (décision B) sera signalé, et c'est attendu.
