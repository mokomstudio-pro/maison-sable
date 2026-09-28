---
name: Maison Sable
description: La boîte à biscuits en fer lithographiée d'Hossegor, version pastel.
colors:
  sable: "#E9E0D4"
  papier: "#F7F2EA"
  encre: "#2E2A3F"
  encre-douce: "#4E4A5E"
  corail: "#F0A184"
  corail-bord: "#C97B62"
  lagune: "#A9D4D0"
  lagune-pro: "#2F676A"
  beurre: "#F6D98E"
  rose: "#F3C9BD"
  sauge: "#A9C7AE"
  pin: "#3D6652"
  papier-choisi: "#FFFDF8"
  erreur: "#8E3321"
  erreur-fond: "#FBE3DC"
  inactif: "#DDD4C8"
typography:
  display:
    fontFamily: "Big Shoulders Display, Repli titre, sans-serif"
    fontSize: "clamp(2.5rem, 1.8rem + 3.6vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-.005em"
  headline:
    fontFamily: "Big Shoulders Display, Repli titre, sans-serif"
    fontSize: "clamp(2.1rem, 1.6rem + 2.4vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-.005em"
  title:
    fontFamily: "Big Shoulders Display, Repli titre, sans-serif"
    fontSize: "clamp(1.6rem, 1.3rem + 1.4vw, 2.3rem)"
    fontWeight: 800
    lineHeight: 1.02
  product-name:
    fontFamily: "Big Shoulders Display, Repli titre, sans-serif"
    fontSize: "clamp(1.35rem, 1.1rem + .9vw, 1.7rem)"
    fontWeight: 800
    lineHeight: 1.02
  relief:
    fontFamily: "Big Shoulders Inline Display, Big Shoulders Display, Repli titre, sans-serif"
    fontSize: "clamp(1rem, 2.3cqw, 1.7rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: ".08em"
  lead:
    fontFamily: "Figtree, Repli texte, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + .35vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Figtree, Repli texte, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Figtree, Repli texte, system-ui, sans-serif"
    fontSize: "clamp(.875rem, .85rem + .1vw, .9375rem)"
    fontWeight: 400
    lineHeight: 1.55
  price:
    fontFamily: "Figtree, Repli texte, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    fontFeature: "\"tnum\""
rounded:
  plaque: "6px"
  alveole: "12px"
  boite: "14px"
spacing:
  e-1: ".5rem"
  e-2: ".75rem"
  e-3: "1rem"
  e-4: "1.5rem"
  e-5: "2.25rem"
  e-6: "3.5rem"
  e-7: "5.5rem"
components:
  button-primary:
    backgroundColor: "{colors.corail}"
    textColor: "{colors.encre}"
    rounded: "{rounded.plaque}"
    padding: ".6rem 1.35rem .55rem"
    height: "48px"
  button-primary-disabled:
    backgroundColor: "{colors.inactif}"
    textColor: "{colors.encre-douce}"
  button-secondary:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "{rounded.plaque}"
    padding: ".6rem 1.35rem .55rem"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.beurre}"
  button-small:
    backgroundColor: "{colors.corail}"
    textColor: "{colors.encre}"
    rounded: "{rounded.plaque}"
    padding: ".45rem 1rem .4rem"
    height: "44px"
  alveole:
    backgroundColor: "{colors.papier}"
    rounded: "{rounded.alveole}"
  etiquette-produit:
    textColor: "{colors.encre}"
    typography: "{typography.product-name}"
  bandeau-relief:
    backgroundColor: "{colors.sauge}"
    textColor: "{colors.encre}"
    typography: "{typography.relief}"
    padding: ".45rem 1.4rem .35rem"
  plateau:
    backgroundColor: "{colors.sauge}"
    rounded: "{rounded.boite}"
  input:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "{rounded.plaque}"
    padding: ".6rem .8rem"
    height: "48px"
  chip-filtre:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "18px"
    padding: ".2rem .7rem"
    height: "36px"
  pastille-cadeau:
    backgroundColor: "{colors.beurre}"
    textColor: "{colors.encre}"
    rounded: "4px"
    padding: ".3rem .6rem"
  resume-erreurs:
    backgroundColor: "{colors.erreur-fond}"
    textColor: "{colors.encre}"
    rounded: "{rounded.plaque}"
  tiroir:
    backgroundColor: "{colors.sable}"
    textColor: "{colors.encre}"
    width: "min(440px, 100vw)"
  pied:
    backgroundColor: "{colors.pin}"
    textColor: "{colors.papier}"
---

# Design System: Maison Sable

## Overview

**Creative North Star: "La boîte en fer lithographiée"**

Le site est une boîte à biscuits en fer imprimée d'Hossegor, années 1930, tirée en encres pastel. L'accueil est le couvercle : une scène lithographiée (dune, ganivelles, lac marin, pins, soleil bas) dans un cadre serti, un bandeau en relief en haut, une étiquette papier qui porte le titre. Au premier défilement, le plateau sauge sort de sous le couvercle et montre les coffrets rangés dans leurs alvéoles. Tout le reste du site est l'intérieur de la boîte, et le pied de page pin profond en est le dessous, avec une inscription gravée.

La douceur vient des aplats, jamais d'un texte pâle : les grandes surfaces sont sable rosé, papier cristal, beurre, lagune et sauge ; le texte reste en encre prune foncée. Le corail doux est réservé aux actions. Les produits sont illustrés en encres plates avec un contour légèrement décalé, comme un défaut de repérage d'imprimerie ; il n'y a aucune photo. Les informations produit tiennent dans une étiquette à grille fixe, lisible comme une fiche.

Refusés par la direction validée avec Morgane : la boutique gourmande standard (grande photo, deux boutons égaux, grille de cartes ombrées arrondies), le trio crème + serif + terracotta, les dégradés, halos et verres dépolis.

**Key Characteristics:**
- Aplats d'encres pastel, sans dégradé ; texte toujours encre prune sur fond clair.
- Un seul axe vertical : couvercle, plateau, intérieur, dessous de la boîte.
- Filets de sertissage (contour encre rentré) sur les objets-boîte : couvercle, plateau, grandes illustrations.
- Produits posés dans des alvéoles creuses de papier cristal, avec une étiquette à grille fixe.
- Boutons en plaques émaillées corail avec un bord inférieur plus foncé.
- Un seul moment de mouvement signature : l'ouverture de la boîte à l'accueil.

## Colors

Une palette complète d'encres pastel sur fer-blanc, tenue par une encre prune foncée qui porte tout le texte.

### Primary
- **Corail doux** (corail) : boutons d'action uniquement, pastille du nombre d'articles du panier, soleil de la scène. Texte encre dessus (6,7:1). Sur le fond sable il ne contraste qu'à 1,6:1 : c'est le bord émaillé et le texte encre qui rendent le bouton repérable.
- **Bord émaillé** (corail-bord) : tranche inférieure des boutons (ombre pleine de 2 px) et soulignement de la navigation au survol et sur la page active. Jamais en fond ni en texte.

### Secondary
- **Lagune profond** (lagune-pro) : liens, contour de focus clavier (3 px), cases à cocher et boutons radio, curseur, jauge de livraison offerte. 5,8:1 sur papier, 4,9:1 sur sable, 4,7:1 sur beurre. Sur sauge il tombe à 3,5:1 : sur le plateau, les liens passent en encre.
- **Pin profond** (pin) : fond du pied de page, frise de pignes, mention d'économie des coffrets (5,9:1 sur papier, 5,0:1 sur sable ; sur sauge, la mention repasse en encre).

### Tertiary
- **Beurre** (beurre) : ciel du couvercle, pastille « Cadeau », encadrés, bande de réassurance imprimée, bloc éditorial dans la grille, fond de survol des boutons secondaires et des choix, sélection de texte (encre dessus, 10,0:1).
- **Sauge** (sauge) : plateau de l'accueil, bandeau en relief et logo, en-têtes de tableaux, message de confirmation (encre dessus, 7,6:1).
- **Lagune pastel** (lagune) : mer et lac des scènes, fond de la frise de vagues (encre dessus, 8,6:1).
- **Rose crevette** (rose) : horizon de la scène, bloc de saison Noël (encre dessus, 9,2:1).

### Neutral
- **Sable rosé** (sable) : fond général, « métal » de la boîte, dune de la scène, en-tête, tiroirs (encre dessus, 10,6:1). Teinte rosée confirmée par Morgane.
- **Papier cristal** (papier) : alvéoles, étiquettes, champs de formulaire, sections du tunnel, pied du panier (encre dessus, 12,4:1).
- **Encre prune** (encre) : tout le texte, titres, filets de sertissage, bordures de 2 px, contours d'illustration.
- **Encre douce** (encre-douce) : texte secondaire (poids, aides, légendes, dates, fil d'Ariane) ; 6,5:1 sur sable, 7,6:1 sur papier. Bordure des champs au repos.
- **Papier choisi** (papier-choisi) : fond d'une option sélectionnée (variante, mode de livraison).
- **Inactif** (inactif) : fond d'un bouton désactivé, texte encre douce (5,8:1).
- **Erreur** (erreur) et **fond d'erreur** (erreur-fond) : messages d'erreur de champ (7,1:1 sur papier) et cadre du résumé d'erreurs.

### Named Rules
**The Encre Prune Rule.** Sur tout fond clair, le texte est en encre prune (ou encre douce pour le secondaire, lagune profond pour les liens, pin pour l'économie). Jamais de texte pastel sur fond clair. Seul le pied de page pin inverse : texte papier, beurre pour les titres de colonnes et le survol des liens (4,7:1).

**The Corail d'Action Rule.** Le corail doux ne sert qu'aux actions, toujours avec du texte encre et le bord émaillé corail-bord dessous. Jamais de texte blanc sur corail (2,1:1).

**The Pas de Dégradé Rule.** Couleurs en aplats uniquement, dans le CSS comme dans les illustrations.

## Typography

**Display Font:** Big Shoulders Display 800 (avec « Repli titre », Arial Narrow ajusté)
**Relief Font:** Big Shoulders Inline Display 700 (capitales à filet intérieur)
**Body Font:** Figtree variable 300–900 (avec « Repli texte », Arial ajusté)

**Character:** Des capitales étroites Art déco pour les titres, comme les lettres embouties d'une boîte en fer ; un texte humaniste net et chaleureux pour tout ce qui se lit. Trois fichiers WOFF2 hébergés sur le site, `font-display: swap`, polices de repli réglées pour limiter les décalages.

### Hierarchy
- **Display** (800, clamp 2.5–4.6rem, 1.02) : titre H1 des pages et appel de fin de page. Sur l'étiquette du couvercle, taille pilotée par la largeur du couvercle (unités cqw).
- **Headline** (800, clamp 2.1–3.4rem, 1.02) : H2 de section, titre de fiche produit et de commande.
- **Title** (800, clamp 1.6–2.3rem, 1.02) : H3, titres de tiroirs, chiffres de réassurance, prix principal de la fiche.
- **Nom produit** (800, clamp 1.35–1.7rem, 1.02) : première case de l'étiquette produit.
- **Relief** (Inline 700, capitales, espacement .06–.08em) : bandeau du couvercle et nom du logo. Rien d'autre.
- **Chapô** (Figtree 400, clamp 1.125–1.3rem, 1.55) : introductions, avis, 62 caractères de large au plus.
- **Body** (Figtree 400, 1rem, 1.55) : texte courant, 62 à 70 caractères de large.
- **Small** (Figtree 400, clamp .875–.9375rem) : notes, légendes, mentions. Les sous-titres de texte long (H3 d'article, de fiche, de tunnel, titres légaux) passent en Figtree 700 à la taille du chapô.

### Named Rules
**The Chiffres Tabulaires Rule.** Prix, poids, quantités, totaux et tableaux utilisent les chiffres tabulaires, pour que les colonnes s'alignent comme sur une étiquette imprimée.

**The Relief Rare Rule.** La fonte Inline n'apparaît que sur le bandeau du couvercle et le logo. Le relief vient du dessin de la lettre, jamais d'une ombre.

## Layout

Largeur maximale 1240px, gouttière fluide clamp(1rem, .6rem + 2vw, 2.5rem). Sections espacées de e-6 (3.5rem) ; l'échelle d'espacement va de e-1 (.5rem) à e-7 (5.5rem). L'accueil se lit sur un seul axe vertical : couvercle, plateau qui remonte de 26px sous le couvercle, bande de réassurance, frise de ganivelles, histoire, avis, appel final, frise de vagues, pied de page. Sur ordinateur (760px et plus) le couvercle passe en 16:9, l'étiquette se décale à gauche et un pin déborde du cadre à droite.

Grilles produit : 2 colonnes sur mobile, 3 à partir de 1024px ; le plateau et les listes de recettes passent à 4. Collection : panneau de filtres de 240px à gauche à partir de 860px, grille à 2 puis 3 colonnes (1120px). Fiche produit : deux colonnes à partir de 900px, colonne d'achat collante ; en dessous, une barre d'achat fixe en bas d'écran. Tunnel : formulaire + récapitulatif collant de 360px à partir de 960px, récapitulatif en tête sur mobile. Points de rupture observés : 480, 600, 760, 860, 900, 960, 1024, 1120px.

Les frises (bandes de 28px répétées : vagues sur lagune, ganivelles, pignes sur pin) séparent les grands étages de la boîte sur toute la largeur.

## Elevation & Depth

Le système est plat et imprimé. La profondeur vient de la matière de la boîte : des creux (alvéoles, plateau) et des plaques émaillées (boutons), pas d'objets qui flottent. Les ombres portées ne restent que sur les objets qui s'ouvrent par-dessus la page (tiroirs, choix rapides, barre d'achat, étiquette du couvercle).

### Shadow Vocabulary
- **Plaque émaillée** (`box-shadow: 0 2px 0 var(--corail-bord), 0 3px 6px -2px rgb(46 42 63 / .35)`) : bouton au repos ; au survol la tranche passe à 3px et monte de 1px, à l'appui elle disparaît et le bouton s'enfonce de 2px.
- **Alvéole** (`box-shadow: inset 0 3px 8px -3px rgb(46 42 63 / .28)`) : creux des alvéoles produit, galerie de fiche, avis, cartes d'article.
- **Fond du plateau** (`box-shadow: inset 0 10px 18px -12px rgb(46 42 63 / .55)`) : l'ombre du couvercle sur le plateau.
- **Surplomb** (`box-shadow: 0 0 40px -10px rgb(46 42 63 / .6)` pour les tiroirs, `0 10px 24px -10px` pour les choix rapides) : uniquement ce qui recouvre la page.

### Named Rules
**The Pas de Faux Relief Rule.** Pas d'ombre pour simuler un embossage : le bandeau et le couvercle n'en ont pas, la fonte Inline suffit.

**The Filet de Sertissage Rule.** Les objets-boîte portent un contour encre de 2px rentré de 10 à 12px (outline-offset négatif), doublé sur le couvercle d'un filet intérieur plus fin à 35 % d'opacité. C'est le bord serti du fer, pas une bordure de carte.

## Shapes

Des coins de boîte en fer, légèrement arrondis : 14px pour la boîte (couvercle, plateau, grandes illustrations), 12px pour les alvéoles et les blocs papier, 6px pour les plaques (boutons, champs, encadrés), 4px pour les pastilles et le logo. Seules les puces de filtre et le sommaire prennent une forme de pilule (18px). Les séparations sont des filets encre de 2px (haut d'étiquette, barre de filtres, sections de fiche, en-têtes de tiroir) ou de 3px (réassurance). L'alvéole vide d'un produit épuisé est un contour pointillé encre à 40 %, avec « Revient bientôt » posé dessus.

## Components

### Buttons
Des plaques émaillées, fermes et tactiles.
- **Shape :** plaque aux coins de boîte (6px), hauteur 48px (44px en petit).
- **Primary :** corail, texte encre Figtree 700, tranche corail-bord dessous.
- **Hover / Focus :** monte de 1px, tranche plus épaisse ; appui : enfoncement de 2px ; focus : contour lagune profond 3px décalé de 3px. Transitions 200ms.
- **Secondary :** papier cerclé d'un filet encre de 2px ; survol beurre.
- **Disabled :** fond inactif, texte encre douce, sans tranche.
- **Icône :** zone de 44px, pictogrammes SVG au trait en currentColor ; survol voile encre à 7 %.

### Chips
- **Pastilles d'alvéole :** « Cadeau » sur beurre, « Fruits à coque » sur papier cerclé encre 1px ; 4px de rayon, .75rem gras, posées en haut de l'alvéole sur une ligne.
- **Filtres actifs :** pilules papier cerclées encre 2px, 36px de haut, survol beurre, un clic retire le filtre.

### Cards / Containers
- **Alvéole produit :** papier, 12px, ombre creuse, format 4:5, illustration contenue avec 6 % de marge. Au survol (pointeurs qui survolent seulement), la vue en coupe remplace la vue de dessus.
- **Étiquette produit :** grille fixe sous l'alvéole, ouverte par un filet encre de 2px : nom (pleine largeur, Big Shoulders) ; saveur à gauche, prix gras tabulaire à droite ; poids en encre douce ; mention d'économie en pin. Sous 480px, le prix passe sur sa propre ligne. Mêmes cases partout.
- **Blocs papier :** avis, articles, sections du tunnel, confirmation : papier, 12px, padding e-4.

### Inputs / Fields
- **Style :** papier, bordure encre douce 2px, 6px de rayon, 48px de haut, libellé Figtree 600 au-dessus, aide en encre douce.
- **Focus :** contour lagune profond 3px décalé de 2px, bordure encre.
- **Erreur :** message en rouge erreur Figtree 600 sous le champ ; résumé d'erreurs en tête de formulaire sur fond d'erreur cerclé de rouge erreur 2px.
- **Choix :** variantes et modes de livraison en plaques papier ; l'option choisie passe sur papier choisi cerclée d'encre.

### Navigation
- **En-tête :** collant sur sable, filet encre 2px dessous, se cache en descendant et revient en remontant (et dès qu'un élément y reçoit le focus). Logo : plaque sauge au double filet, nom en Inline, lieu en Figtree capitales espacées.
- **Liens :** encre Figtree 600, soulignement corail-bord 2px au survol et sur la page active.
- **Mobile (moins de 860px) :** menu dans un tiroir gauche, liens en Big Shoulders taille Title.

### Tiroirs (menu, panier, recherche)
Éléments `dialog` natifs sur sable, voile encre à 45 %. Le panier glisse de la droite (440px max), le menu de la gauche, la recherche du haut ; 280ms, sans animation en mouvement réduit. Le panier est le fond de la boîte : lignes avec vignette papier, jauge de livraison offerte, suggestion sur beurre, pied papier avec totaux tabulaires.

### Panneau de filtres
Barre de filtres entre deux filets encre ; sur ordinateur, colonne fixe à gauche ; sur mobile, panneau plein écran qui monte du bas (300ms) avec une barre d'actions fixe.

### Le couvercle et le plateau (signature de l'accueil)
Couvercle beurre en coins de boîte, scène lithographiée, filet de sertissage, bandeau en relief sauge centré en haut, étiquette papier au double filet qui porte le H1, une définition et l'action principale. Le plateau sauge sort de sous le couvercle au premier défilement ou après 1,5 s, en transform seulement (600ms), son contenu apparaît en opacité (450ms, décalé de 150ms), une seule fois. Sans JavaScript ou avec « réduire les animations », la boîte est déjà ouverte.

### Frises et bande imprimée
Frises de 28px en motif répété sur toute la largeur (vagues, ganivelles, pignes). La réassurance est une ligne imprimée sur une bande beurre entre deux filets encre pointillés de 2px, points médians décoratifs cachés aux lecteurs d'écran.

### Illustrations
Encres plates tirées de la palette (plus quelques encres de biscuit : doré, caramel, chocolat, coco), contour encre décalé de quelques unités à 85 % comme un défaut de repérage, trame de points encre à 7 % sur la grande scène du couvercle. Chaque produit a une vue de dessus et une vue en coupe. Aucune photo. Le texte alternatif décrit l'illustration (« Illustration : … ») ou reste vide quand l'image est décorative.

## Do's and Don'ts

### Do:
- **Do** écrire tout texte sur fond clair en encre prune (#2E2A3F) ; encre douce pour le secondaire, lagune profond pour les liens.
- **Do** réserver le corail doux (#F0A184) aux actions, avec texte encre et tranche émaillée #C97B62.
- **Do** passer les liens et mentions en encre sur le plateau sauge, où lagune profond et pin ne contrastent pas assez.
- **Do** poser chaque produit dans une alvéole papier creuse avec son étiquette à grille fixe : nom, saveur, prix, poids.
- **Do** utiliser les chiffres tabulaires pour tout prix, poids, quantité et total.
- **Do** garder les transitions d'interface entre 150 et 250ms (200ms par défaut), en transform et opacity, courbe cubic-bezier(.16, 1, .3, 1), sans rebond.
- **Do** montrer un produit épuisé comme une alvéole vide en pointillés, « Revient bientôt ».
- **Do** dessiner les images en aplats avec contour décalé et décrire l'illustration dans le texte alternatif.

### Don't:
- **Don't** utiliser de dégradé, de halo ou de verre dépoli.
- **Don't** mettre de texte blanc sur le corail, ni de texte pastel sur fond clair.
- **Don't** ajouter de sur-titre en capitales au-dessus d'un titre.
- **Don't** mettre de flèche dans les boutons.
- **Don't** simuler un relief par des ombres : le relief vient de la fonte Inline.
- **Don't** utiliser de photo : produits, lieux et atelier sont illustrés.
- **Don't** ajouter un second moment animé ni faire apparaître les blocs en fondu au défilement ; l'ouverture de la boîte est le seul.
- **Don't** transformer les alvéoles en cartes ombrées qui flottent : l'ombre est creuse, vers l'intérieur.
