# Merchandising — Maison Sable

> Étape « merchandising » · 2026-09-28 · Données : [`merchandising.json`](merchandising.json) (ordres, sélections, suggestions), contrôlé par `node scripts/verifier-catalogue.mjs`. Catalogue validé par Morgane le 2026-09-27.
> **Aucune donnée de vente n'existe** (marque fictive) : les ordres ci-dessous sont des **choix stratégiques**, jamais présentés comme « meilleures ventes ». Aucun badge « Best-seller », « Populaire » ou « Plus que 2 ! ».

## 1. Ordre des collections

### Biscuits (7)
| Pos. | Produit | Pourquoi à cette place |
|---|---|---|
| 1 | Sablé Dune | recette signature (beurre + fleur de sel), prix d'appel 6,90 € |
| 2 | Palet Marée | requête la plus recherchée de la gamme (« caramel beurre salé ») |
| 3 | Biscuit Vague | chocolat : large public, tonalité sombre qui rythme la grille |
| — | *Bloc éditorial* | « Sablé, galette ou palet ? » : la coupe dessinée + lien vers l'article |
| 4 | Sablé Pignada | l'histoire locale (forêt de pins landaise) |
| 5 | Sablé Écume | fraîcheur citron-thym, teinte claire |
| 6 | Croquant Lagune | texture différente (croquant), contient des amandes |
| 7 | Sablé Lagon | coco-vanille, format unique |

L'ordre alterne les teintes des illustrations (doré, caramel, sombre, vert, clair, orangé, blanc) pour une grille vivante.

### Coffrets & cadeaux (6)
| Pos. | Produit | Pourquoi |
|---|---|---|
| 1 | Coffret Été Indien | le coffret le plus complet : cible directe de « coffret biscuits artisanaux » |
| 2 | Coffret Découverte | cadeau « goûter toute la gamme », prix intermédiaire (24,90 €) |
| 3 | Boîte Grande Plage | le cadeau le plus accessible (dès 15,90 €), souvenir |
| — | *Bloc éditorial* | « Offrir à distance » : message cadeau, livraison directe, lien FAQ |
| 4 | Carte cadeau | solution de dernière minute, sans risque de goût |
| 5 | Sablé Pignada | sachet « à offrir » (occasion Cadeau) |
| 6 | Croquant Lagune | idem |

**Saison de Noël (octobre-décembre)** : l'ordre ne change pas. Le bloc éditorial devient « Commander pour Noël » (date limite, définie à l'étape checkout) et la Boîte Grande Plage 500 g est présélectionnée sur sa carte.

### Produits épuisés
Un produit épuisé **reste à sa place** sous forme d'alvéole vide avec son étiquette « Revient bientôt » (discipline de la direction artistique). Il n'apparaît dans **aucune suggestion**. S'il est retiré définitivement, sa page redirige vers la collection principale.

## 2. Cartes produit
- Illustration 4:5 dans son alvéole, étiquette à grille fixe : **nom · saveur · poids · prix** (« dès … » si plusieurs poids).
- Seconde illustration au survol (ordinateur) : la vue en coupe du biscuit.
- Pastilles **factuelles uniquement** : « Cadeau » (occasion du catalogue), « Contient des fruits à coque » sur Croquant Lagune et les coffrets qui en contiennent. Pas de « Nouveau » (rien n'est nouveau dans une boutique qui n'a pas d'historique).
- Bouton « Ajouter » (ajout rapide, cf. UX §4).

## 3. Accueil (vitrine, pas le catalogue entier)
- **Plateau des coffrets** (révélé par l'ouverture du couvercle) : Coffret Été Indien, Coffret Découverte, Boîte Grande Plage, Carte cadeau.
- **Plateau des recettes** : Sablé Dune, Palet Marée, Biscuit Vague, Sablé Pignada, puis « Voir les 7 recettes ».
- Correction apportée à `06-ux.md` : le plateau des coffrets compte 2 coffrets, la boîte et la carte cadeau (et non « 3 coffrets »).

## 4. Recommandations

| Emplacement | Type | Contenu | Règle |
|---|---|---|---|
| Fiche recette, sous le bouton d'achat | **Montée en gamme** (le produit dans un coffret) | « Aussi dans : Boîte Grande Plage · Coffret Découverte » (liens) | `fiche_aussi_dans`, une ligne, pas de visuel qui alourdit la zone d'achat |
| Fiche, bas de page « Vous aimerez aussi » | Complémentaires / similaires | `produits_lies` du catalogue (2 à 3) | jamais un produit épuisé, chargé après la zone d'achat |
| Fiche coffret / boîte | Contenu | « Ce que contient le coffret » : liens vers chaque recette | — |
| Tiroir panier | **Complément petit prix** | **une seule** suggestion, seulement s'il manque 15 € ou moins pour la livraison offerte | voir §5 |
| Recherche sans résultat, 404, panier vide | Récupération | Coffret Été Indien, Coffret Découverte, Sablé Dune, Palet Marée + les 2 collections | `recuperation` |
| E-mail après achat | Réachat | hors périmètre de la maquette (aucun e-mail envoyé) | — |

## 5. Montée en gamme, compléments, lots

### Grand format (montée en gamme)
Sur les boutons de poids, la différence est **concrète et exacte** (calculée depuis le catalogue) :

| Produit | Petit | Grand | Affichage sur le bouton du grand format |
|---|---|---|---|
| Sablé Dune | 150 g · 6,90 € (46,00 €/kg) | 300 g · 12,50 € (41,67 €/kg) | « 1,30 € de moins que 2 sachets » |
| Palet Marée | 150 g · 7,50 € (50,00 €/kg) | 300 g · 13,50 € (45,00 €/kg) | « 1,50 € de moins que 2 sachets » |
| Sablé Pignada | 150 g · 8,50 € (56,67 €/kg) | 300 g · 15,50 € (51,67 €/kg) | « 1,50 € de moins que 2 sachets » |
| Sablé Écume | 150 g · 7,20 € (48,00 €/kg) | 300 g · 12,90 € (43,00 €/kg) | « 1,50 € de moins que 2 sachets » |
| Biscuit Vague | 150 g · 7,90 € (52,67 €/kg) | 300 g · 14,50 € (48,33 €/kg) | « 1,30 € de moins que 2 sachets » |
| Boîte Grande Plage | 250 g · 15,90 € (63,60 €/kg) | 500 g · 26,90 € (53,80 €/kg) | « 4,90 € de moins que 2 boîtes » |

Pas de fenêtre qui s'ouvre avant l'ajout au panier : l'information est sur le bouton, c'est tout.

### Complément dans le panier (vers la livraison offerte)
- Seuil de livraison offerte : **45 €** (provisoire, confirmé à l'étape checkout). La jauge et le montant restant sont toujours affichés.
- Si le montant restant est de **15 € ou moins** : proposer **un** sachet, choisi dans l'ordre de `panier_complements`, en excluant ce qui est déjà dans le panier. On prend de préférence un produit lié à un article du panier, et dont le prix couvre le montant restant (sinon le plus proche).
- Jamais de case pré-cochée, jamais d'ajout automatique, jamais de compte à rebours.

### Lots (coffrets)
Un coffret est un produit composé : ses composants sont liés à leurs fiches. Règle Mokom : si l'on affiche une économie, elle doit être **réelle**.
- **Coffret Découverte** (6 mini-sachets de 50 g, format exclusif) : pas de comparaison possible avec les sachets vendus seuls, donc **pas d'économie affichée**. On le présente comme un cadeau prêt à offrir.
- ⚠️ **Coffret Été Indien : il coûte plus cher que ses composants.** Boîte Grande Plage 250 g (15,90 €) + Sablé Pignada 150 g (8,50 €) + Croquant Lagune 120 g (8,90 €) = **33,30 €**, contre **34,00 €** pour le coffret, soit 0,70 € de plus pour l'écrin.
  - **Option A (recommandée)** : passer le coffret à **31,90 €** et afficher « 1,40 € de moins que les trois produits achetés séparément », un argument simple pour la cible cadeau.
  - **Option B** : garder 34 € sans parler d'économie, en justifiant par l'écrin et le message cadeau. C'est honnête, mais un prospect attentif remarquera l'écart.
  - **À trancher par Morgane.** En attendant, aucune économie n'est affichée.

## Porte de sortie
- [x] Ordre de tri défini par collection, justifié, sans fausse donnée de vente. Produits épuisés gérés (alvéole vide, exclus des suggestions).
- [x] Emplacements de recommandation définis avec leur logique (`merchandising.json`, contrôlé).
- [x] Complément dans le panier cohérent avec le seuil de livraison (45 €, provisoire) et l'écart de 15 € de l'UX.
- [ ] Prix du Coffret Été Indien (option A ou B) → **décision de Morgane**.
