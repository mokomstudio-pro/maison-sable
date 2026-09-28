# Architecture — Maison Sable

> Étape « architecture » · 2026-09-27 · S'appuie sur `docs/02-recherche.md` (demande de recherche) et `docs/catalogue/modele-donnees.md`.
> Les adresses suivent **exactement celles de Shopify** (`/collections/`, `/products/`, `/pages/`, `/blogs/`, `/policies/`) pour que la maquette puisse devenir un vrai thème sans changer une seule URL.

## 1. Deux décisions de structure

### A. Deux collections, pas trois
Avec 11 produits, une collection « Cartes cadeaux » (1 produit) ou « Boîtes et coffrets » (3 produits) serait trop maigre. Une collection doit rassembler au moins 6 à 8 produits pour être utile. On retient donc :

| Collection | Contenu | Nb | Réponse à la recherche |
|---|---|---|---|
| **Biscuits** (`/collections/biscuits`) | les 7 recettes en sachets | 7 | « sablés pur beurre artisanaux », « biscuiterie artisanale en ligne » |
| **Coffrets & cadeaux** (`/collections/coffrets-cadeaux`) | collection **automatique** : tout produit dont l'occasion contient « Cadeau », soit Boîte Grande Plage, les 2 coffrets, la carte cadeau, le Sablé Pignada et le Croquant Lagune | 6 | « coffret biscuits artisanaux », « coffret gourmand cadeau », « boîte biscuits Noël » (texte saisonnier) |

Un produit peut apparaître dans les deux collections, mais il n'a **qu'une adresse** (`/products/<handle>`) et **une collection principale**, qui détermine le fil d'Ariane. La colonne `collection_principale` du catalogue a été mise à jour dans ce sens (`biscuits` ou `coffrets-cadeaux`).

### B. Site entier en `noindex` une fois en ligne (validé par Morgane le 2026-09-27)
Maison Sable n'existe pas. Si Google indexait une « biscuiterie à Hossegor » avec des prix et un bouton « Commander », de vraies personnes pourraient la chercher, tenter de commander ou venir à l'atelier. **Recommandation** :
- la version publiée sur GitHub Pages porte `<meta name="robots" content="noindex">` sur toutes les pages ;
- tout le travail de référencement est **quand même fait et visible dans le code** (titles, canonicals, données structurées, plan du site, maillage). C'est ce que le portfolio démontre. Une ligne dans `CLAUDE.md` permettra de lever le `noindex` si Morgane en décide autrement ;
- l'audit final signalera ce `noindex` : c'est normal et attendu.

## 2. Arborescence

```
Accueil  /
├── Biscuits                          /collections/biscuits
│   └── 7 fiches produit              /products/sable-dune, /products/palet-maree, …
├── Coffrets & cadeaux                /collections/coffrets-cadeaux
│   └── 6 fiches produit              /products/boite-grande-plage, /products/coffret-ete-indien, …
├── L'atelier à Hossegor              /pages/atelier-hossegor
├── Questions fréquentes              /pages/faq
├── Journal (1 article de soutien)    /blogs/journal
│   └── Sablé, galette ou palet ?     /blogs/journal/sable-galette-palet-difference
├── Contact                           /pages/contact
├── À propos de ce projet             /pages/etude-de-cas        (projet fictif, lien vers Mokom Studio)
├── Pages légales                     /policies/legal-notice · terms-of-service · privacy-policy
│                                     · shipping-policy · refund-policy
├── Rétractation en ligne            /pages/retractation        (noindex)
└── Utilitaires (non indexés)         /cart · /search · /checkout (simulé) · /collections/all · 404
```

**Profondeur** : toute page importante est à **2 clics maximum** depuis l'accueil (accueil → collection → produit). Les produits phares sont aussi à 1 clic, depuis la sélection de l'accueil.

## 3. Rôle de chaque page

| Page | URL | Intention principale | Requête principale (cf. recherche) | Action n°1 | Indexation* |
|---|---|---|---|---|---|
| Accueil | `/` | découvrir la marque et commencer | « Maison Sable », « biscuiterie bord de mer » | aller vers Coffrets & cadeaux / Biscuits | oui |
| Biscuits | `/collections/biscuits` | choisir une recette | sablés pur beurre artisanaux | ajouter au panier | oui |
| Coffrets & cadeaux | `/collections/coffrets-cadeaux` | trouver un cadeau | **coffret biscuits artisanaux** (priorité 1) | ajouter un coffret au panier | oui |
| Fiche produit ×11 | `/products/<handle>` | acheter cette recette ou ce coffret | nom de la recette + saveur (ex. « sablés caramel beurre salé ») | ajouter au panier | oui |
| L'atelier à Hossegor | `/pages/atelier-hossegor` | faire confiance, souvenir local | biscuits artisanaux Hossegor, souvenir gourmand Hossegor | aller vers Coffrets & cadeaux | oui |
| Questions fréquentes | `/pages/faq` | être rassuré (conservation, livraison, allergènes, cadeau) | combien de temps se conservent les sablés | revenir aux collections | oui |
| Article « Sablé, galette ou palet ? » | `/blogs/journal/sable-galette-palet-difference` | comprendre la différence | différence sablé galette palet | aller vers Palet Marée / Biscuits | oui |
| Journal (liste) | `/blogs/journal` | — | — | lire l'article | oui (une seule entrée pour le moment) |
| Contact | `/pages/contact` | écrire à la marque | — | envoyer le formulaire (simulé) | oui |
| À propos de ce projet | `/pages/etude-de-cas` | comprendre la démarche de Mokom Studio | — | contacter Mokom Studio | oui |
| Pages légales | `/policies/*` | obligations | — | — | oui, sans être travaillées pour Google |
| Panier, recherche, commande, `/collections/all` | — | utilitaires | — | — | **non** (`noindex`) + absentes du plan du site |

\* « Indexation » = règle **de conception** telle qu'elle serait appliquée sur un vrai site. Dans la maquette publiée, la décision B s'y ajoute (tout en `noindex`).

**Pas de doublon** : « coffret » et « idée cadeau » ne font qu'une seule page. Noël n'a pas de page propre, seulement un texte d'introduction saisonnier sur Coffrets & cadeaux. `/collections/all`, créée automatiquement par Shopify, n'est reliée nulle part et reste en `noindex`.

## 4. Navigation

**Bandeau d'annonce** (fin, une ligne) : **mention « Boutique fictive, étude de cas Mokom Studio »** (décision de l'étape UX). La réassurance sur la livraison est placée près des boutons d'achat et dans le panier.

**En-tête** : logo · **Biscuits** · **Coffrets & cadeaux** · **L'atelier** · **FAQ** · icône Recherche · icône Panier (avec le nombre d'articles). Pas d'espace client dans la maquette : il n'y aurait rien derrière.
Sur mobile : un menu en tiroir qui reprend les mêmes entrées dans le même ordre. Le panier reste visible en permanence.

**Pied de page** (confiance et utilitaires) :
| Boutique | Maison Sable | Aide | Informations légales |
|---|---|---|---|
| Biscuits · Coffrets & cadeaux · Carte cadeau | L'atelier à Hossegor · Journal · Contact | Questions fréquentes · Livraison · Retours et rétractation | Mentions légales · CGV · Confidentialité |

En bas : « **Projet fictif, étude de cas Mokom Studio** », avec un lien vers `/pages/etude-de-cas`. Cette mention est visible sur toutes les pages.

**Fil d'Ariane** sur toutes les pages de niveau 2 et plus (avec le balisage `BreadcrumbList`) :
- Fiche produit : Accueil › *collection principale* › Produit.
- Article : Accueil › Journal › Article.
- Pages : Accueil › Page.

## 5. Filtres, tri et recherche

| Collection | Filtres | Tri |
|---|---|---|
| Biscuits (7) | **Saveur**, **Prix** | Mis en avant (par défaut) · Prix croissant · Prix décroissant |
| Coffrets & cadeaux (6) | **Format** (Sachet, Boîte, Coffret, Carte cadeau), **Prix** | idem |

- Peu de filtres, car les collections sont petites. Chaque filtre affiche le nombre de produits correspondants, les filtres actifs sont visibles et se retirent d'un clic. Sur mobile, les filtres s'ouvrent en plein écran avec un bouton « Voir N produits ».
- **Pas de filtre « sans fruits à coque »** (décision du catalogue : toutes les recettes peuvent en contenir des traces).
- **Règle d'indexation** : les adresses de filtre et de tri (`?filter.…`, `?sort_by=…`) renvoient leur `canonical` vers la collection sans paramètre et sont absentes du plan du site. Aucune combinaison de filtres ne justifie aujourd'hui sa propre page.
- **Recherche interne** : présente dans l'en-tête, comme dans un vrai Shopify. Elle cherche dans les titres, les saveurs et les ingrédients, avec quelques synonymes (« beurre salé » → caramel, fleur de sel ; « chocolat » → Vague ; « cadeau » → coffrets). La page de résultats est en `noindex`. Si rien ne correspond, elle propose les deux collections et la FAQ. Le fonctionnement exact sera décidé à l'étape UX.

## 6. Maillage interne (liens entre pages)

Chaque page reçoit au moins 2 liens depuis des pages proches, avec un texte de lien descriptif (jamais « cliquez ici »).

| Page | Reçoit des liens de | Envoie vers | Exemples de texte de lien |
|---|---|---|---|
| Accueil | toutes (logo), fil d'Ariane | Coffrets & cadeaux, Biscuits, 3 à 4 produits phares, L'atelier | « Offrir un coffret de biscuits », « Découvrir nos sablés » |
| Biscuits | en-tête, accueil, fiches produit (fil d'Ariane), article, FAQ | 7 produits, Coffrets & cadeaux | « nos coffrets à offrir » |
| Coffrets & cadeaux | en-tête, accueil, fiches (fil d'Ariane et liens contextuels), L'atelier, FAQ | 6 produits, Biscuits | « toutes nos recettes en sachet » |
| Fiche produit | sa ou ses collections, produits liés (`produits_lies` du catalogue), accueil (produits phares), coffrets qui la contiennent | collection principale, 2 à 3 produits liés, coffrets qui contiennent la recette, FAQ (conservation) | « Retrouvez-le dans le Coffret Découverte » |
| L'atelier à Hossegor | en-tête, pied de page, accueil (section histoire) | Coffrets & cadeaux (souvenir), Biscuits, Contact | « rapporter un souvenir d'Hossegor » |
| FAQ | en-tête, pied de page, fiches produit, panier | Coffrets & cadeaux, Biscuits, Livraison, Contact | « choisir un coffret à offrir » |
| Article « Sablé, galette ou palet ? » | Journal, Palet Marée, Biscuits (texte bas de page), FAQ | Palet Marée, Sablé Dune, Biscuits | « notre palet au caramel beurre salé » |
| Étude de cas | pied de page (toutes les pages) | accueil, site de Mokom Studio | « voir la boutique » |

**Règle Shopify** : dans les cartes produit, on relie directement `/products/<handle>` et jamais `/collections/x/products/<handle>`, pour éviter les adresses en double.

## 7. Données structurées prévues (détaillées à l'étape seo-geo)
- Accueil : `Organization` + `WebSite` (sans adresse inventée présentée comme réelle).
- Collections : `BreadcrumbList` (+ `ItemList`).
- Fiches : `Product` / `ProductGroup` (variantes de poids) + `Offer` + `BreadcrumbList`. **Aucune note ni avis** dans le balisage : les avis de la maquette sont fictifs.
- Article : `Article` + `BreadcrumbList`.
- Un seul générateur par type, sans doublon.

## 8. Correspondance avec Shopify (pour une future transposition)
| Maquette | Shopify |
|---|---|
| `/collections/coffrets-cadeaux` | collection automatique, condition « métachamp occasions contient Cadeau » |
| `/collections/biscuits` | collection automatique, condition « type de produit ∈ Sablé, Palet, Croquant » |
| menus en-tête et pied de page | Navigation › menus `main-menu` et `footer` |
| `/pages/faq`, `/pages/atelier-hossegor` | pages + métaobjets FAQ réutilisables |
| `/blogs/journal` | blog « Journal » |
| `/policies/*` | Paramètres › Politiques |
| filtres | application Search & Discovery (métachamps saveur, format) |

## Porte de sortie
- [x] Arborescence construite à partir de la demande de recherche ; chaque collection compte au moins 6 produits (7 et 6).
- [x] Une intention par page, aucun doublon (coffrets et cadeaux fusionnés, Noël traité en saison).
- [x] Toute page importante à 2 clics maximum ; navigation, pied de page et fil d'Ariane définis.
- [x] Maillage interne défini page par page, avec des textes de lien descriptifs.
- [x] Règle d'indexation des filtres, du tri et de la recherche écrite (mise en œuvre à l'étape développement).
- [x] URLs identiques à Shopify.
- [ ] Parcours à valider avec l'étape **UX**.
- [x] Décision B (`noindex` global) validée par Morgane le 2026-09-27.
