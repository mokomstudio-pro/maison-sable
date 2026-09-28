# Direction artistique — Maison Sable

> Étape « UI » · 2026-09-28 · Piste choisie par Morgane sur la page de décision : **« La boîte en fer lithographiée »**.
> Contrat de direction technique : `.impeccable/surfaces/index-html.md` (relu par l'outil de conception à chaque étape de construction). `DESIGN.md` sera écrit **à la fin du développement**, à partir du site réellement construit.

## 1. Idée directrice
**« Une boîte à biscuits en fer imprimée d'Hossegor, années 1930 : on soulève le couvercle, les biscuits sont rangés dedans. »**
Chaque choix visuel doit pouvoir s'y rattacher : couleurs = encres d'imprimerie sur fer-blanc ; lettres = titres embossés ; produits = illustrations imprimées et étiquettes ; mouvement = un couvercle qui s'ouvre.

## 2. Pourquoi cette piste
- **Personnalité forte** (ta priorité n°1) : aucune biscuiterie concurrente observée ne construit son site comme un objet ; un prospect s'en souvient.
- **Ta référence respectée** : les boîtes en fer des stations balnéaires étaient justement imprimées dans le style des affiches de l'époque (aplats, soleil, grandes lettres).
- **Ni terroir, ni luxe froid** : un objet de vacances coloré et moderne pour 1930, pas de kraft ni de nappe à carreaux ; pas de noir et or.
- **Répond à l'absence de photos** : dans cet univers, les biscuits sont **illustrés**, pas photographiés — cohérent, léger, et sans fausse photo trompeuse.
- **Le produit reste clair** : chaque produit a une étiquette à grille fixe (nom, saveur, poids, prix), lisible comme une fiche.

Pistes écartées (visibles sur la page de décision) : l'affiche de station (très répandue, porte mal une grille de produits), le mur de boîtes (clair mais sans la mer), la boutique classique (indistincte, exige des photos), et cinq pistes hors sujet dont on a gardé une discipline chacune (voir §6).

## 3. Couleurs (encres plates, jamais de dégradé)

| Rôle | Nom | Valeur | Usage | Contraste vérifié |
|---|---|---|---|---|
| Fond | Fer-blanc | `#DAD6CC` | fond général, « métal » de la boîte | texte encre : 10,2:1 ✅ |
| Zone de lecture | Papier cristal | `#EFECE5` | alvéoles, fiches, formulaires, tunnel | texte encre : 12,6:1 ✅ |
| Texte | Encre | `#1D2740` | texte courant, titres | — |
| Action | Corail | `#E9745B` | **boutons d'action uniquement** (texte encre dessus) | encre sur corail : 5,0:1 ✅ · blanc sur corail : 2,9 ❌ interdit |
| Champ couleur | Lagune | `#62A7B1` | grands aplats (ciel, lac, bandeaux) | encre dessus : 5,4:1 ✅ · blanc dessus ❌ |
| Lien | Lagune profond | `#285F69` | liens et focus | sur papier : 6,1:1 ✅ · sur fer-blanc : 4,9:1 ✅ |
| Accent chaud | Beurre | `#F1C453` | soleil, pastilles « Cadeau », surlignage prix | encre dessus : 9,0:1 ✅ |
| Accent profond | Pin | `#2E5B4E` | forêt, pied de page, bandeaux sombres | blanc dessus : 7,7:1 ✅ · beurre dessus : 4,7:1 ✅ |

Stratégie : **palette complète à rôles nommés**, où la lagune et le fer-blanc occupent de grandes surfaces (le couvercle, les bandeaux), pas des touches dispersées. Le corail est **réservé aux actions** (ajouter, commander, offrir). Le focus clavier : contour lagune profond de 3 px + décalage.

## 4. Typographie (rôles décidés, fontes à éprouver au développement)
- **Lettres embossées** (bandeau du couvercle, logo, étiquettes de collection) : capitales Art déco à filet intérieur (« inline »), comme gravées dans le métal. Le logo « Maison Sable » sera **dessiné** (lettrage SVG), pas tapé dans une police.
- **Grands titres** : une fonte d'affichage généreuse et gourmande, avec du caractère (pistes à éprouver : *Shrikhand* pour la rondeur « emballage de friandise », *Big Shoulders Display* pour la verticalité Art déco). Jamais sous 24 px.
- **Texte courant et interface** : une sans-sérif humaniste très lisible (piste : *Figtree*), 16 px minimum sur mobile, interlignage 1,5, lignes de 65–75 caractères, **chiffres tabulaires** pour prix, poids et tableaux.
- Polices hébergées sur le site (WOFF2, sous-ensemble latin, `font-display: swap`), **4 fichiers au plus**. Aucune des polices « par réflexe » (Inter, Playfair, Cormorant, Montserrat…).
- Pas de sur-titres en capitales au-dessus des titres.

## 5. Matières, formes et composants
- **Le couvercle** (haut de l'accueil) : scène d'Hossegor lithographiée — dune, **ganivelles** (clôtures de bois des dunes landaises), lac marin, pins, soleil bas — en 4 encres plates ; cadre de boîte avec filets de sertissage ; bandeau embossé en haut.
- **Frises** de bord de boîte (vagues, pignes de pin, ganivelles) pour séparer les grandes sections, comme le bord d'un couvercle.
- **Alvéoles** : les produits sont posés dans des alvéoles de papier cristal (cartes produit au fond papier, bord festonné discret), pas dans des cartes ombrées arrondies.
- **Étiquette produit à grille fixe** : nom (embossé) · saveur · poids · prix — les mêmes cases partout (carte, fiche, panier).
- **Boutons** : plaques émaillées corail, coins légèrement arrondis (rayon d'un coin de boîte en fer), texte encre ; état appuyé = léger enfoncement (transform), pas de flèche « → ».
- **Illustrations produit** : chaque biscuit illustré en aplats (4 encres), vu de dessus et en coupe ; même lumière, même trait. **Aucune photo**. Provenance de chaque image notée (dessin produit pour Mokom Studio, marque fictive).
- **Panier** : le tiroir latéral est le « fond de boîte » où les articles se rangent.

## 6. Disciplines empruntées aux pistes écartées (relèvements)
- **Grille fixe** (tableau à palettes) : toutes les étiquettes ont les mêmes cases, chiffres alignés.
- **Expliquer en dessinant** (carnet) : une coupe imprimée compare sablé, galette et palet (article + collection Biscuits).
- **L'état se lit dans l'objet** (vidéoclub) : un produit épuisé laisse une alvéole vide avec son étiquette « Revient bientôt ».
- **Un seul axe** (jardins) : l'accueil se lit de haut en bas, du couvercle jusqu'au fond de la boîte (pied de page = dessous de la boîte, avec la mention « fabriqué à Hossegor — projet fictif » comme une inscription gravée).

## 7. Mouvement
- **Moment signature (accueil uniquement)** : au premier défilement, le couvercle se soulève et glisse (≤ 600 ms, une seule fois) et révèle le plateau des coffrets. Réalisé en `transform`/`opacity` ; la page reste complète sans JavaScript ; avec « réduire les animations », le couvercle est déjà ouvert. Mesuré sur mobile avant validation (règle Mokom).
- **Interface** : 150–250 ms, glissements courts, pas de rebond, pas d'apparition en fondu de chaque bloc au défilement, pas de carrousel automatique.
- **Ajout au panier** : l'étiquette du produit « tombe » dans le fond de boîte (tiroir) — retour immédiat, discret.

## 8. Mise en page et grille
- Grille de 12 colonnes (ordinateur), 4 (mobile), gouttière fixe, marges fluides ; largeur maximale maîtrisée sur grand écran.
- Grille produits : 2 colonnes mobile, 3 colonnes ordinateur (alvéoles).
- Compositions assumées : sur ordinateur, l'étiquette du couvercle décalée à gauche et la scène qui déborde du cadre à droite ; une frise qui traverse toute la largeur entre deux « étages » de la boîte.

## 9. Contrôle anti-« site IA » (au stade de la direction)
- [x] Pas d'ouverture centrée « Bienvenue » + 2 boutons identiques (couvercle, étiquette décalée, un bouton principal + un lien).
- [x] Pas de cartes arrondies ombrées partout (alvéoles papier, étiquettes).
- [x] Pas de dégradé, de halo, de verre dépoli.
- [x] Pas de palette crème + terracotta par défaut (fer-blanc + lagune + corail, tirée de l'objet).
- [x] Pas de sur-titres en capitales, pas de numéros 01/02/03, pas de flèches dans les boutons.
- [x] Pas de photos de banque d'images (illustrations dessinées).
- [ ] À revérifier au développement : `impeccable detect`, critique et revue finale.

## 10. Ce qui reste à produire (étape développement)
- Logo « Maison Sable » dessiné, illustration du couvercle, **11 illustrations produit**, frises, coupe sablé/galette/palet, image de partage 1200 × 630.
- Choix final des fontes (épreuve typographique).
- `DESIGN.md` écrit à la fin à partir du site construit.
