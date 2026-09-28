# Direction artistique — Maison Sable

> ## ⚠️ Révision du 2026-09-28 : version gourmande (demande de Morgane)
> Morgane trouvait le design « pas assez gourmand » et voulait de vraies photos. Décisions :
> - **Photos réelles** (Unsplash, licence libre, créditées) sur les fiches, les cartes, l'accueil et l'atelier, signalées « photo d'illustration » : `docs/catalogue/photos.json`, téléchargées par `scripts/photos.mjs`. Les aplats dessinés sont abandonnés (seuls restent la carte cadeau et le schéma sablé / galette / palet).
> - **Palette A « Caramel et beurre »**, choisie sur la planche `.impeccable/mocks/planche-palettes-photos.html` : fond biscuit `#F3E4CC`, carte crème `#FBF4E8`, texte chocolat `#3A2218` (11,8:1), bouton caramel `#A5531D` avec texte blanc (5,45:1), plateau cannelle `#7A3E1D` avec texte crème (7,6:1), miel `#E8B15A` (bandeau, pastilles), liens `#8A4A1C`, pied de page chocolat.
> - **Typographies conservées** (Big Shoulders Display, Big Shoulders Inline, Figtree) : Morgane les adore.
> - **Idée de la boîte conservée**, en photo : cadre de boîte en fer autour de la photo d'accueil, bandeau en relief, plateau cannelle qui porte les coffrets, filets de sertissage à la place des frises dessinées.
> - **Ouverture visible dès l'arrivée** : un couvercle en métal cannelle se soulève (1 s, une fois, CSS) et découvre la photo ; le titre et le bouton restent lisibles pendant l'animation ; désactivée si « réduire les animations ».
> Les sections 3, 5 et 7 ci-dessous décrivent la version précédente (pastel, aplats) et sont remplacées par ce bloc ; `DESIGN.md` est réécrit à partir du site construit.


> Étape « UI » · 2026-09-28 · Piste choisie par Morgane sur la page de décision : **« La boîte en fer lithographiée »**.
> Planche de travail : `.impeccable/mocks/planche-direction.html` (version pastel validée).
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

## 3. Couleurs : encres pastel (révisées le 2026-09-28 à la demande de Morgane : « plus douces et chaleureuses, tons pastel »)

| Rôle | Nom | Valeur | Usage | Contraste vérifié |
|---|---|---|---|---|
| Fond | Sable rosé | `#E9E0D4` | fond général, « métal » de la boîte, sable de la dune | texte encre : 10,6:1 ✅ |
| Zone de lecture | Papier cristal | `#F7F2EA` | alvéoles, fiches, formulaires, tunnel | texte encre : 12,4:1 ✅ |
| Texte | Encre prune | `#2E2A3F` | texte courant, titres (foncé et chaud, jamais pastel) | — |
| Action | Corail doux | `#F0A184` | **boutons d'action uniquement**, texte encre, bord émaillé `#C97B62` | encre dessus : 6,7:1 ✅ · corail sur fond : 1,6:1 → le bord émaillé et le texte portent le repérage |
| Champ couleur | Lagune pastel | `#A9D4D0` | mer, lac, grands aplats | encre dessus : 8,6:1 ✅ |
| Lien | Lagune profond | `#2F676A` | liens et contour de focus | sur papier : 5,8:1 ✅ · sur fond : 4,9:1 ✅ |
| Accent chaud | Beurre | `#F6D98E` | ciel, pastilles « Cadeau » | encre dessus : 10,0:1 ✅ |
| Accent doux | Rose crevette | `#F3C9BD` | horizon, accents chaleureux | encre dessus : 9,2:1 ✅ |
| Champ vert | Sauge | `#A9C7AE` | pins, bandeaux embossés, fond de boîte | encre dessus : 7,6:1 ✅ |
| Profond | Pin profond | `#3D6652` | pied de page (texte papier dessus) | papier dessus : 5,9:1 ✅ |

Stratégie : **palette complète en pastels**, où la lagune, le beurre et le sable occupent les grandes surfaces. Tout le texte reste en **encre prune foncée** : la douceur vient des aplats, jamais d'un texte pâle. Le corail doux est **réservé aux actions**. Focus clavier : contour lagune profond de 3 px + décalage.

## 4. Typographie (choisie par Morgane le 2026-09-28)
- **Grands titres** : **Big Shoulders Display** (graisse 800), verticale et Art déco. Jamais sous 24 px. Les rondeurs de Shrikhand ont été écartées.
- **Lettres en relief** (bandeau du couvercle, noms de collections, étiquettes) : **Big Shoulders Inline Display**, capitales à filet intérieur. Le logo « Maison Sable » sera **dessiné** (lettrage SVG) dans le même esprit.
- **Texte courant et interface** : **Figtree**, 16 px minimum sur mobile, interlignage 1,5, lignes de 65 à 75 caractères, **chiffres tabulaires** pour les prix, les poids et les tableaux.
- Polices hébergées sur le site (WOFF2, sous-ensemble latin, `font-display: swap`), **4 fichiers au plus** : Big Shoulders Display 800, Big Shoulders Inline Display 700, Figtree 400 et 700.
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
- [x] Pas de palette crème + terracotta par défaut : pastels tirés de la scène d'Hossegor (lagune, beurre, rose, sauge), texte prune. Le passage aux pastels est une demande explicite de Morgane.
- [x] Pas de sur-titres en capitales, pas de numéros 01/02/03, pas de flèches dans les boutons.
- [x] Pas de photos de banque d'images (illustrations dessinées).
- [ ] À revérifier au développement : `impeccable detect`, critique et revue finale.

## 10. Ce qui reste à produire (étape développement)
- Logo « Maison Sable » dessiné, illustration du couvercle, **11 illustrations produit**, frises, coupe sablé/galette/palet, image de partage 1200 × 630.
- `DESIGN.md` écrit à la fin à partir du site construit.
