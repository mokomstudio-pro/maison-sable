# Journal — Maison Sable

## 2026-09-27 — Cadrage (discovery)

**Décisions**
- Projet : boutique e-commerce de biscuits artisanaux à Hossegor, **marque fictive** pour le portfolio Mokom Studio.
- Plateforme : maquette HTML/CSS statique qui reproduit une boutique Shopify, hébergée sur GitHub Pages. Écarté : vrai thème Shopify Liquid (impossible à servir sur GitHub Pages, trop long pour un portfolio).
- Catalogue : 8 à 12 produits (sachets, boîtes, coffrets).
- Aucun visuel de départ : logo, palette, typographies et images à créer.
- Chaîne e-commerce retenue, sans l'étape « migration » (pas de site existant). Étapes « checkout » et « analytics » réalisées en version maquette.
- `claude-seo-ai` laissé actif : ses garde-fous ne concernent que Shopify/WordPress réels, pas un site statique.
- Contenus de marque inventés autorisés, toujours marqués `[FICTIF]` et mention « Projet fictif — étude de cas Mokom Studio » sur le site.

**Questions ouvertes**
- Compte GitHub et nom du dépôt pour l'adresse GitHub Pages.
- Délai souhaité.
- Référence d'excellence hors secteur pour la direction artistique.
- Tutoiement ou vouvoiement.
- Source des images (génération IA ou banques libres de droits).

## 2026-09-27 — Catalogue

**Décisions**
- 11 produits `[FICTIF]` : 7 recettes en sachets, 1 boîte assortie, 2 coffrets, 1 carte cadeau. 19 variantes au total (poids, taille ou montant ; un seul type d'option par produit).
- Source unique : `docs/catalogue/produits.csv` + `variantes.csv`, contrôlée par `node scripts/verifier-catalogue.mjs`.
- Allergènes : liste fermée des 14 allergènes majeurs (UE 1169/2011), affichés avant l'achat. Pas de filtre « sans fruits à coque », car toutes les recettes portent une mention de traces.
- Message cadeau géré comme un champ du panier, pas comme une variante.
- Pas de prix barré ni de GTIN.

**Questions ouvertes**
- Gamme et prix à valider par Morgane.
- Déclaration nutritionnelle (exemption artisanale ou non) → à trancher à l'étape conformité.
- Recherche interne simulée ou non → à trancher à l'étape UX.

## 2026-09-27 — Recherche d'intentions

**Décisions**
- Priorité 1 : « coffret biscuits artisanaux » (cadeau). Ensuite l'ancrage local (Hossegor, souvenir des Landes), puis les recettes sur les fiches produit.
- Une seule collection cadeaux (pas de pages « Coffrets » et « Idées cadeaux » en doublon). Noël est traité comme une saison de cette collection, pas comme une page à part.
- Positionnement confirmé : aucune « biscuiterie de bord de mer » ne s'impose. Le souvenir illustré d'Hossegor est déjà occupé par une madeleine (Lamothe), pas par un sablé.
- Seuil de livraison offerte d'environ 45 € cohérent avec le marché (à trancher à l'étape checkout).
- Aucun volume chiffré : priorités qualitatives, volumes à vérifier.

**Questions ouvertes**
- ~~Renommer « Galette Marée épaisse » en « Palet Marée »~~ → validé, fait (voir ci-dessous).

## 2026-09-27 — Catalogue : renommage validé

- « Galette Marée épaisse au caramel beurre salé » devient « **Palet Marée au caramel beurre salé** » (type `Palet`). Validé par Morgane.
- Adresse de la page : `palet-maree` (au lieu de `galette-maree`). Aucune redirection n'est nécessaire puisque le site n'est pas en ligne. SKU `MS-MAREE-*` inchangés.
- Mis à jour : produits.csv, variantes.csv, dictionnaire (script + modele-donnees.md), brief, PRODUCT.md, 02-recherche.md.

## 2026-09-27 — Architecture

**Décisions**
- Deux collections : **Biscuits** (7 recettes) et **Coffrets & cadeaux** (6 produits, collection automatique selon l'occasion « Cadeau »). Les collections « Boîtes et coffrets » et « Cartes cadeaux » sont abandonnées, car trop maigres. Catalogue mis à jour (`collection_principale`).
- Adresses identiques à Shopify (`/collections/`, `/products/`, `/pages/`, `/blogs/`, `/policies/`). Toute page importante est à 2 clics maximum.
- Pages éditoriales : L'atelier à Hossegor, FAQ, 1 article « Sablé, galette ou palet ? », Contact, À propos de ce projet (étude de cas).
- Filtres limités (saveur et prix ; format et prix) ; filtres, tri, recherche, panier et `/collections/all` exclus de l'index.
- Pas d'avis dans les données structurées, puisqu'ils sont fictifs.

**Questions ouvertes**
- Décision B : site publié entièrement en `noindex` (proposé, à valider par Morgane).

## 2026-09-27 — SEO et GEO

**Décisions**
- Carte requêtes → pages : la collection Coffrets & cadeaux porte la requête n°1. Aucune requête n'est ciblée par deux pages.
- Titles, descriptions et H1 des 20 pages dans `docs/seo/metas.csv`, contrôlés par `node scripts/verifier-metas.mjs` (tous conformes).
- Fiche d'entité créée (`docs/fiche-entite.md`) : définition unique de la marque, pas d'adresse précise, téléphone dans la plage ARCEP réservée aux fictions (05 36 49…), e-mail en `.example`, aucun SIREN, aucune fiche Google Business Profile.
- `Organization` plutôt que `LocalBusiness` (aucune adresse réelle à déclarer). Pas d'avis dans les données structurées.
- 24 questions cibles, chacune rattachée à une seule page. Pas de sources tierces à solliciter (entreprise fictive). Pas de `llms.txt`.
- Limite de GitHub Pages : le `robots.txt` d'un site de projet n'est pas modifiable. Le `noindex` se fait page par page.

**Questions ouvertes**
- Décision B (`noindex` global) toujours à valider.
- Origine des ingrédients phares, emballage, date limite de Noël → étapes fiche produit et checkout.
- URL du site Mokom Studio (page Étude de cas).

## 2026-09-27 — UX

**Décisions**
- 4 parcours, dont celui du **prospect de Mokom Studio**, qui est le vrai public de la maquette.
- Le bandeau d'annonce devient la mention « Boutique fictive, étude de cas Mokom Studio : aucune commande n'est expédiée ». La réassurance livraison passe près des boutons d'achat et dans le panier (architecture mise à jour).
- Tunnel de commande simulé sur une seule page : **aucun champ de carte bancaire**, données jamais envoyées, bouton « Remplir avec un exemple ».
- Ajout rapide depuis les cartes (1 interaction, 2 pour un produit à deux poids). Barre d'achat fixe sur mobile. Tiroir panier avec barre de progression vers la livraison offerte.
- Allergènes toujours visibles (pas d'accordéon fermé). Réponses de la FAQ visibles. Message cadeau limité aux coffrets, à la boîte et à la carte cadeau.
- Recherche interne : index intégré, synonymes, page en `noindex`, fonctionne sans JavaScript.
- Grille de 2 colonnes sur mobile et de 3 sur ordinateur (à confirmer en UI).

**Questions ouvertes**
- Prix au kilo : obligation à vérifier à l'étape conformité.
- Décision B (`noindex` global) et URL de Mokom Studio : toujours en attente.
