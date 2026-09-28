# Gabarit de la fiche produit — Maison Sable

> Étape « fiche produit » · 2026-09-28 · Structure : `docs/06-ux.md` (zoning de la fiche) · Direction : `docs/07-direction-artistique.md` · Textes : [`fiches-produits.md`](fiches-produits.md).
> Une seule page modèle, remplie par le développement à partir de **4 sources**, sans texte recopié à la main :
> `produits.csv` + `variantes.csv` (faits) · `merchandising.json` (suggestions) · `seo/metas.csv` (title, description, H1) · `fiches-produits.md` (textes rédigés).

## 1. Voix de la marque (pour toutes les fiches)
- **Trois adjectifs** : chaleureuse, sensorielle, précise.
- **On ne dit jamais** : « fait avec amour » ou « avec passion », « le meilleur » ou « n°1 », « comme autrefois » ou « la recette de grand-mère » (le code terroir écarté), « healthy » ou « sain », « irrésistible ».
- **Vouvoiement** chaleureux `[HYPOTHÈSE, non tranché par Morgane]`.
- Le sujet est toujours nommé (« Le Palet Marée… »), jamais « il » ou « ce biscuit » en début de passage (règle GEO).
- Chiffres exacts tirés du catalogue : pourcentages, poids, nombre de biscuits (« environ »), durée de conservation.
- Typographie française appliquée **automatiquement au rendu** : espace insécable avant `: ; ! ?` et à l'intérieur des « », espace fine entre un nombre et « € », « g », « % ».

## 2. Blocs, dans l'ordre (mobile), avec leur source

| # | Bloc | Contenu | Source |
|---|---|---|---|
| 1 | Galerie | 3 à 4 illustrations dans leur alvéole, avec les boutons précédent / suivant | `images/produits/<handle>-<n>` + `alt` de `fiches-produits.md` |
| 2 | Fil d'Ariane | Accueil › *collection principale* › Produit | `collection_principale` |
| 3 | H1 | titre du produit | `metas.csv` (H1) |
| 4 | Étiquette de prix | prix de la variante choisie + prix au kilo en petit ; pour les coffrets : l'économie réelle si elle existe | `variantes.csv`, calcul |
| 5 | Choix de la variante | boutons « 150 g · 6,90 € », etc. ; sur le grand format : « 1,30 € de moins que 2 sachets » | `variantes.csv`, `merchandising.md` §5 |
| 6 | Message cadeau | coffrets, boîte, carte cadeau : case « Ajouter un message cadeau » → champ de 200 caractères | occasion « Cadeau » + format ≠ Sachet |
| 7 | Quantité + **« Ajouter au panier »** | — | — |
| 8 | Réassurance (1 ligne) | « Expédié sous 24 à 48 h · Livraison 5,90 €, offerte dès 45 € · Retrait gratuit à Hossegor » | `fiche-entite.md` (valeurs provisoires) |
| 9 | Aussi dans | « Aussi dans : Boîte Grande Plage · Coffret Découverte » (liens) | `merchandising.json` › `fiche_aussi_dans` |
| 10 | **Présentation** | paragraphe « réponse d'abord » de 40 à 60 mots + 3 puces « En bref » | `fiches-produits.md` |
| 11 | **Ingrédients et allergènes** (H2) | « **Contient** : … » en gras · liste d'ingrédients avec les allergènes en gras · « Peut contenir des traces de : … » · tableau : poids net, nombre de biscuits (environ), conservation, prix au kilo. **Ouvert, jamais replié** | `produits.csv`, `variantes.csv` |
| 11 bis | *Coffrets et boîte* : **Ce que contient le coffret** (H2) | liste des recettes avec liens vers leurs fiches ; allergènes cumulés | `produits.csv` (ingrédients / composition) |
| 12 | Déclaration nutritionnelle | tableau pour 100 g | `[À DÉCIDER à l'étape conformité]` : valeurs d'exemple `[FICTIF]` ou mention d'exemption |
| 13 | **Conseils de dégustation et de conservation** (H2) | 2 à 3 phrases uniques | `fiches-produits.md` |
| 14 | **Livraison et retrait** (H2) | bloc commun : préparation 24 à 48 h ouvrées ; livraison 5,90 €, offerte dès 45 € ; retrait gratuit à l'atelier du mardi au samedi ; lien FAQ | `fiche-entite.md` |
| 15 | **Questions fréquentes** (H2) | 2 à 3 questions propres au produit, réponse directe en tête, **réponses visibles** | `fiches-produits.md` |
| 16 | **Vous aimerez aussi** (H2) | 2 à 3 cartes avec ajout rapide ; jamais un produit épuisé | `produits_lies` |

**Carte cadeau** : les blocs 5 (montant), 6 (e-mail de la personne, date d'envoi, message) et 13 à 15 s'adaptent. Pas de blocs 11 et 12.

## 3. Mention de fiction (rappel)
Le bandeau d'annonce (« Boutique fictive… ») est présent. Le bouton reste « Ajouter au panier » : c'est le tunnel de commande qui dit clairement que la commande est fictive (voir `06-ux.md`).

## 4. Données structurées (générées)
`ProductGroup` (produits à 2 poids, `variesBy: https://schema.org/weight`, chaque variante `Product` avec `sku`, `weight`, `offers`) ou `Product` (variante unique), `brand` Maison Sable, `offers` en EUR avec `availability` et `shippingDetails` (5,90 €, France métropolitaine, 24–48 h de préparation). `BreadcrumbList`. **Pas de `aggregateRating` ni de `review`.** Description = paragraphe de présentation, sans balises.

## 5. Contrôles avant mise en ligne
- Chaque fait affiché existe dans `produits.csv`, `variantes.csv` ou `fiche-entite.md`.
- Les allergènes affichés, les données structurées et le catalogue sont **identiques** (générés depuis la même source).
- Changer de variante met à jour le prix, le prix au kilo, l'économie, l'URL (`?variant=`) et l'illustration si elle diffère.

## Porte de sortie (fiche produit)
- [x] Gabarit conforme à la structure mobile ; barre d'achat fixe sur mobile (UX).
- [x] Variantes : URL, prix, prix au kilo, économie synchronisés (règle écrite ; mise en œuvre au développement).
- [x] Descriptions uniques, faits issus du catalogue, tableau de caractéristiques.
- [x] Données structurées prévues (Product / ProductGroup / Offer, livraison), sans avis.
- [x] Réassurance chiffrée près du bouton.
