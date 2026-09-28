# Modèle de données produit — Maison Sable

> Étape « catalogue » · 2026-09-27 · Marque **fictive** : produits, recettes, prix, poids et stocks sont inventés `[FICTIF]`. Seules les règles (allergènes, étiquetage, prix) reflètent la réglementation réelle.

## 1. Où sont les données
Une seule source, versionnée avec le projet. Le site, les fiches produits et les données structurées sont générés à partir d'elle, jamais recopiés à la main.

| Fichier | Contenu |
|---|---|
| [`produits.csv`](produits.csv) | une ligne par produit (11) |
| [`variantes.csv`](variantes.csv) | une ligne par variante achetable (19) |
| [`../../scripts/verifier-catalogue.mjs`](../../scripts/verifier-catalogue.mjs) | contrôle qualité : `node scripts/verifier-catalogue.mjs` |

Format : séparateur `;`, valeurs multiples séparées par `|`, prix au format `12.50`, encodage UTF-8. Pour l'ouvrir dans un tableur : Google Sheets ou LibreOffice (import UTF-8, séparateur point-virgule).

## 2. Gamme `[FICTIF]`

| Produit | Format | Variantes (prix) | Collection principale |
|---|---|---|---|
| Sablé Dune au beurre et fleur de sel | Sachet | 150 g (6,90 €) · 300 g (12,50 €) | biscuits |
| Palet Marée au caramel beurre salé | Sachet | 150 g (7,50 €) · 300 g (13,50 €) | biscuits |
| Sablé Pignada aux pignons de pin et miel | Sachet | 150 g (8,50 €) · 300 g (15,50 €) | biscuits |
| Croquant Lagune aux amandes et zestes d'orange | Sachet | 120 g (8,90 €) | biscuits |
| Sablé Écume au citron et thym | Sachet | 150 g (7,20 €) · 300 g (12,90 €) | biscuits |
| Biscuit Vague au chocolat noir et fleur de sel | Sachet | 150 g (7,90 €) · 300 g (14,50 €) | biscuits |
| Sablé Lagon à la noix de coco et vanille | Sachet | 150 g (7,50 €) | biscuits |
| Boîte Grande Plage, assortiment de 4 recettes | Boîte | 250 g (15,90 €) · 500 g (26,90 €) | coffrets-cadeaux |
| Coffret Été Indien, boîte assortie et deux sachets | Coffret | unique (31,90 €) | coffrets-cadeaux |
| Coffret Découverte, 6 mini-sachets | Coffret | unique (24,90 €) | coffrets-cadeaux |
| Carte cadeau Maison Sable | Carte cadeau | 20 € · 40 € · 60 € | coffrets-cadeaux |

Les noms rappellent la côte landaise (dune, marée, lagune, écume, pignada = la forêt de pins en gascon). Collections validées à l'étape « architecture » (`docs/05-architecture.md`) : **Biscuits** (7 produits) et **Coffrets & cadeaux** (6 produits, collection automatique selon l'occasion « Cadeau »).

## 3. Règle produit / variante
- **Variante** = même recette, même fiche, seul le **poids** (sachets), la **taille** (boîte) ou le **montant** (carte cadeau) change. Un seul type d'option par produit : c'est simple à comprendre et ça reste compatible avec Shopify (3 options maximum).
- **Produit distinct** dès que la recette, le goût ou le contenu change. Chaque recette a sa propre page, parce que chacune est recherchée et offerte pour elle-même. Un « Sablé Dune au chocolat » serait donc un nouveau produit, pas une variante.
- Les assortiments (boîte, coffrets) sont des produits à part entière. Leur composition est écrite noir sur blanc et renvoie aux recettes qu'ils contiennent. Leurs allergènes regroupent tous ceux des recettes incluses.
- **Message cadeau** : ce n'est pas une variante. C'est un champ libre ajouté à la ligne du panier (dans Shopify, une « propriété de ligne »). Il est prévu pour les coffrets, la boîte et la carte cadeau.
- **Une adresse de page par produit** (`/produits/<handle>`), quelle que soit la collection d'où l'on arrive. Changer de variante ne crée jamais de nouvelle page à indexer.

## 4. Options, attributs, étiquettes
- **Options** (pour choisir) : `Poids`, `Taille`, `Montant`.
- **Attributs** (pour filtrer et décrire, champs personnalisés `custom.*` dans Shopify) : format, saveur, texture, occasions, ingrédients, allergènes, traces, conservation.
- **Étiquettes (tags)** : réservées à l'usage interne (ex. `nouveaute-ete`). Un filtre ne se base jamais uniquement sur elles.

## 5. Dictionnaire des attributs

| Attribut | Valeurs autorisées (liste fermée) | Unité | Obligatoire | Filtrable | Affiché sur la fiche |
|---|---|---|---|---|---|
| `type` | Sablé · Palet · Croquant · Boîte assortie · Coffret · Carte cadeau | — | oui | non | non (sert au titre) |
| `format` | Sachet · Boîte · Coffret · Carte cadeau | — | oui | **oui** | oui |
| `saveur` | Beurre & fleur de sel · Caramel · Chocolat · Agrumes & herbes · Fruits secs · Coco & vanille · Assortiment | — | oui (alimentaire) | **oui** | oui |
| `texture` | Fondant · Croquant · Épais · Mixte | — | oui (alimentaire) | non (à revoir en UX) | oui |
| `occasions` | Goûter · Cadeau · Souvenir · Pique-nique (plusieurs possibles) | — | oui | **oui** | non (sert aux collections thématiques) |
| `ingredients` | texte libre, par ordre de poids décroissant, pourcentages des ingrédients mis en avant | — | oui (alimentaire) | non | oui |
| `allergenes` | les 14 allergènes majeurs du règlement UE 1169/2011 : Gluten · Crustacés · Œufs · Poissons · Arachides · Soja · Lait · Fruits à coque · Céleri · Moutarde · Sésame · Sulfites · Lupin · Mollusques | — | oui (alimentaire) | non | **oui, mis en évidence** |
| `traces` | mêmes 14 valeurs | — | non | non | oui (« Peut contenir… ») |
| `conservation_jours` | nombre entier | jours | oui (alimentaire) | non | oui (« à consommer de préférence dans les N jours ») |
| `conservation_conseil` | texte court | — | oui (alimentaire) | non | oui |
| `collection_principale` | biscuits · coffrets-cadeaux (validé à l'étape architecture) | — | oui | — | fil d'Ariane |
| `produits_lies` | handles existants | — | non | — | bloc « Vous aimerez aussi » |

Champs de variante : `sku` (format `MS-<RECETTE>-<POIDS>`), `prix`, `prix_barre`, `poids_net_g`, `poids_expedition_g` (emballage compris, pour calculer les frais de port), `nb_biscuits` (environ), `stock`, `gtin`.

**Prévu pour l'étape « fiche produit »** (ce ne sont pas encore des colonnes du tableur) : description unique, 3 à 4 points clés, conseil de dégustation, questions fréquentes, déclaration nutritionnelle, images.

## 6. Règles de qualité et de conformité
- **Allergènes** : ils figurent sur chaque fiche **avant l'achat** et sont mis en évidence dans la liste d'ingrédients (en gras). En vente à distance, les mentions obligatoires doivent être disponibles avant l'achat (règlement INCO, art. 14). Le détail est vu à l'étape « conformité ».
- **Pas de filtre « sans fruits à coque »** : l'atelier (fictif) travaille les amandes, donc toutes les recettes portent la mention « peut contenir des traces de fruits à coque ». Un tel filtre rassurerait à tort les personnes allergiques.
- **Déclaration nutritionnelle** : une exemption existe pour les produits artisanaux vendus en petites quantités, mais elle ne s'applique pas forcément à une vente en ligne dans toute la France. On partira du principe qu'elle est affichée (valeurs d'exemple `[FICTIF]`). À vérifier à l'étape « conformité ».
- **Prix barré** : aucun pour le moment. Si une promotion est un jour affichée, le prix de référence doit être le prix le plus bas pratiqué dans les 30 jours précédents.
- **GTIN (code-barres)** : aucun, comme c'est le cas pour une petite biscuiterie artisanale. Pour Google Shopping, il faudra déclarer « pas d'identifiant » avec marque + SKU.
- **Poids** : le poids net est affiché. Le poids d'expédition sert uniquement au calcul des frais de port.
- **Stocks et délais** : valeurs de démonstration `[FICTIF]`. Aucune mention d'urgence du type « plus que 2 ! » ne s'appuie sur ces chiffres.

## 7. Images (convention, à produire à l'étape UI)
- Fichiers : `images/produits/<handle>-<n>.webp` ; ordre : 1 photo du produit sur fond crème, 2 gros plan sur la texture, 3 mise en situation (plage, goûter, emballage cadeau), 4 étiquette ou composition (coffrets).
- Texte alternatif : il décrit ce que l'on voit, sans bourrage de mots-clés. Exemple : « Sablés Dune dorés empilés sur un torchon en lin, grains de fleur de sel visibles ».
- Aucune photo réelle disponible : images générées ou libres de droits, avec leur provenance notée dans `docs/journal.md`.

## 8. Premières règles pour les filtres et la recherche (à confirmer aux étapes architecture et UX)
- Filtres prévus sur la collection « biscuits » : saveur, format, prix. Filtre prévu sur « boîtes et coffrets » : prix. Avec 11 produits, il en faut peu.
- Les pages filtrées ne sont pas indexées : elles renvoient (canonical) vers la collection non filtrée et sont absentes du plan du site. Si les gens recherchent vraiment « idées cadeaux » ou « souvenirs d'Hossegor », ces thèmes deviendront de vraies collections, avec leur propre adresse.
- Recherche interne : Shopify la propose, on la simulera donc dans la maquette par souci de fidélité. Sa page de résultats ne sera pas indexée. Décision définitive à l'étape UX.

## Porte de sortie
- [x] Dictionnaire d'attributs normalisé ; règle produit/variante écrite.
- [x] Fichier source unique, versionné, avec contrôle automatique (doublons, champs vides, valeurs hors dictionnaire, variantes orphelines).
- [ ] Arborescence validée contre la recherche → étape **architecture** (après la recherche d'intentions).
- [ ] Règle d'indexation des filtres implémentée → écrite ici, mise en œuvre à l'étape **développement**.
- [ ] Recherche interne configurée → décision à l'étape **UX**.
