---
name: Maison Sable
description: La boîte à biscuits en fer d'Hossegor, version gourmande « Caramel et beurre », en vraies photos.
colors:
  fond: "#F3E4CC"
  carte: "#FBF4E8"
  encre: "#3A2218"
  encre-douce: "#6B4A3A"
  action: "#A5531D"
  action-bord: "#6E3510"
  sur-action: "#FFFFFF"
  lien: "#8A4A1C"
  miel: "#E8B15A"
  miel-clair: "#F6DDB0"
  cannelle: "#7A3E1D"
  carte-choisie: "#FFFDF8"
  erreur: "#8E3321"
  erreur-fond: "#FBE3DC"
  inactif: "#DDD4C8"
typography:
  display:
    fontFamily: "Big Shoulders Display, Repli titre, sans-serif"
    fontSize: "clamp(2.5rem, 1.8rem + 3.6vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Big Shoulders Display, Repli titre, sans-serif"
    fontSize: "clamp(2.1rem, 1.6rem + 2.4vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Big Shoulders Display, Repli titre, sans-serif"
    fontSize: "clamp(1.6rem, 1.3rem + 1.4vw, 2.3rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.005em"
  relief:
    fontFamily: "Big Shoulders Inline Display, Big Shoulders Display, Repli titre, sans-serif"
    fontSize: "clamp(1rem, 2.3cqw, 1.7rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.08em"
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
  button:
    fontFamily: "Figtree, Repli texte, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.3
  small:
    fontFamily: "Figtree, Repli texte, system-ui, sans-serif"
    fontSize: "clamp(.875rem, .85rem + .1vw, .9375rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Figtree, Repli texte, system-ui, sans-serif"
    fontSize: ".75rem"
    fontWeight: 700
    lineHeight: 1.1
rounded:
  boite: "14px"
  alveole: "12px"
  plaque: "6px"
  etiquette: "4px"
  pilule: "18px"
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
    backgroundColor: "{colors.action}"
    textColor: "{colors.sur-action}"
    typography: "{typography.button}"
    rounded: "{rounded.plaque}"
    padding: ".6rem 1.35rem .55rem"
    height: "48px"
  button-primary-disabled:
    backgroundColor: "{colors.inactif}"
    textColor: "{colors.encre-douce}"
  button-secondary:
    backgroundColor: "{colors.carte}"
    textColor: "{colors.encre}"
    typography: "{typography.button}"
    rounded: "{rounded.plaque}"
    padding: ".6rem 1.35rem .55rem"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.miel}"
    textColor: "{colors.encre}"
  button-small:
    padding: ".45rem 1rem .4rem"
    height: "44px"
  input:
    backgroundColor: "{colors.carte}"
    textColor: "{colors.encre}"
    rounded: "{rounded.plaque}"
    padding: ".6rem .8rem"
    height: "48px"
  chip-filtre:
    backgroundColor: "{colors.carte}"
    textColor: "{colors.encre}"
    rounded: "{rounded.pilule}"
    padding: ".2rem .7rem"
    height: "36px"
  chip-filtre-hover:
    backgroundColor: "{colors.miel}"
  pastille-cadeau:
    backgroundColor: "{colors.miel}"
    textColor: "{colors.encre}"
    typography: "{typography.label}"
    rounded: "{rounded.etiquette}"
    padding: ".3rem .6rem"
  alveole:
    backgroundColor: "{colors.carte}"
    rounded: "{rounded.alveole}"
  plateau:
    backgroundColor: "{colors.cannelle}"
    textColor: "{colors.carte}"
    rounded: "{rounded.boite}"
  logo:
    backgroundColor: "{colors.cannelle}"
    textColor: "{colors.carte}"
    rounded: "{rounded.etiquette}"
    padding: ".3rem .9rem .25rem"
  bandeau-relief:
    backgroundColor: "{colors.miel}"
    textColor: "{colors.encre}"
    typography: "{typography.relief}"
    padding: ".6rem 1.4rem .5rem"
  pied:
    backgroundColor: "{colors.encre}"
    textColor: "{colors.carte}"
---

# Design System: Maison Sable

## Overview

**Creative North Star: "La boîte en fer, ouverte sur les biscuits"**

Maison Sable est une boîte à biscuits en fer d'Hossegor que l'on ouvre. Depuis la révision du 28 septembre 2026, la boîte n'est plus une lithographie en aplats pastel : ce sont de vraies photos de biscuits, chaudes et dorées, posées dans une boîte dont on garde toutes les pièces de métal. Le cadre du couvercle entoure la photo d'accueil, un bandeau miel en lettres à filet intérieur porte le nom, un plateau cannelle tient les coffrets, et deux filets de sertissage (les bords roulés d'une boîte en fer) séparent les étages de la page. Le fond biscuit, la carte crème et l'encre chocolat viennent de la palette « Caramel et beurre » choisie par Morgane ; le fond crème est un choix assumé.

La page se lit de haut en bas, comme une boîte : le couvercle (accueil), le plateau (les coffrets), le fond (les recettes, l'atelier, les avis), puis le dessous de la boîte (le pied de page chocolat, avec sa mention gravée). La densité est celle d'une boutique : des étiquettes produit à cases fixes, des prix et des poids alignés, des photos qui remplissent leurs alvéoles. Le seul moment spectaculaire est l'arrivée sur l'accueil : un couvercle en métal cannelle se soulève et découvre la photo.

Seuls deux visuels restent dessinés : la carte cadeau et la coupe comparée sablé / galette / palet. Tout le reste est photographié, crédité et signalé « Photo d'illustration » (Unsplash, les biscuits montrés ne sont pas ceux de la marque fictive).

**Key Characteristics:**
- Vraies photos gourmandes, chaudes, cadrées serré, dans des alvéoles crème ou un cadre de boîte en fer.
- Fond biscuit, cartes crème, texte chocolat ; le caramel ne sert qu'à agir.
- Plateau cannelle à texte crème pour les coffrets ; pied de page chocolat.
- Titres Big Shoulders Display 800, lettrage embossé Big Shoulders Inline Display, texte Figtree.
- Filets de sertissage doubles à la place des frises dessinées.
- Un couvercle en métal qui se soulève une fois à l'arrivée ; ailleurs, des mouvements courts et sans rebond.

## Colors

Une palette de pâtisserie au beurre : biscuit, crème, chocolat, caramel, miel et cannelle, sans aucune couleur froide.

### Primary
- **Caramel** (action) : la couleur des boutons d'action (« Offrir un coffret », « Ajouter ») et de la pastille du panier, toujours avec du texte blanc (sur-action, contraste 5,45:1).
- **Caramel brûlé** (action-bord) : le bord émaillé sous chaque bouton caramel, une lèvre de 2 px qui donne au bouton l'épaisseur d'une plaque ; aussi le soulignement de la page active dans la navigation.

### Secondary
- **Cannelle** (cannelle) : le métal de la boîte. Plateau des coffrets sur l'accueil, couvercle en métal animé, plaque du logo. Le texte y est toujours crème (7,6:1).
- **Miel** (miel) : les accents lumineux. Bandeau en relief du couvercle, pastilles « Cadeau », encadrés d'information, allergènes, bande de réassurance, survol des boutons secondaires et des filtres, sélection de texte. Titres de colonnes et survols de liens dans le pied de page chocolat.
- **Miel clair** (miel-clair) : les zones d'information douces. En-têtes de tableau, messages de confirmation, bloc de Noël.

### Tertiary
- **Brun lien** (lien) : liens dans le texte, contour de focus clavier (3 px), jauge de livraison offerte, cases à cocher et boutons radio.

### Neutral
- **Biscuit** (fond) : fond général de toutes les pages, de l'en-tête et des tiroirs.
- **Crème** (carte) : alvéoles produit, étiquettes, avis, cartes d'article, blocs du tunnel de commande, champs de formulaire, texte sur cannelle et sur chocolat.
- **Chocolat** (encre) : tout le texte courant et les titres (11,8:1 sur le fond), les filets et contours de la boîte, le bandeau fictif en haut de page, le pied de page.
- **Chocolat au lait** (encre-douce) : texte secondaire (poids, notes, dates, fil d'Ariane, aides de champs), bordure des champs au repos.
- **Crème choisie** (carte-choisie) : fond d'une option sélectionnée (format de produit, mode de livraison).
- **Erreur** (erreur) et **fond d'erreur** (erreur-fond) : messages de champ et résumé d'erreurs du formulaire.
- **Inactif** (inactif) : bouton désactivé (« Épuisé »).

### Named Rules
**La règle du caramel réservé.** Le caramel ne colore que ce qui agit : boutons d'action et pastille du panier. Jamais un fond de section, un titre ou une décoration.

**La règle du texte chocolat.** Sur les fonds clairs, le texte est chocolat ou chocolat au lait, jamais miel ni caramel. Le miel ne devient couleur de texte que sur le chocolat du pied de page.

**La règle du métal cannelle.** La cannelle est le métal de la boîte : elle porte le texte crème, les coffrets et le logo, et ne sert pas de couleur de texte.

## Typography

**Display Font:** Big Shoulders Display 800 (avec « Repli titre », Arial Narrow ajustée)
**Relief Font:** Big Shoulders Inline Display 700 (lettres à filet intérieur)
**Body Font:** Figtree variable 300 à 900 (avec « Repli texte », Arial ajustée)

**Character:** Des capitales étroites et verticales d'emballage Art déco pour les titres, un lettrage embossé pour la marque, et une linéale ronde et chaleureuse pour lire les étiquettes et commander.

### Hierarchy
- **Display** (800, t-5, interligne 1,02) : le H1 de chaque page et le titre de fin d'accueil. Sur l'étiquette du couvercle, il suit la largeur du cadre (unités de conteneur).
- **Headline** (800, t-4, 1,02) : titres de section ; H1 de la fiche produit et du tunnel.
- **Title** (800, t-3, 1,02) : sous-sections, titres de tiroir, prix principal, chiffres de réassurance, menu mobile.
- **Nom d'étiquette** (800, de 1,35 à 1,7 rem, 1,02) : le nom du produit sous chaque alvéole.
- **Relief** (Inline 700, capitales, espacement 0,06 à 0,1 em) : logo, bandeau du couvercle, texte du couvercle en métal ; la mention gravée du pied de page le reprend en bas de casse.
- **Lead** (400, t-2, 1,55) : introductions de section et chapôs. Les intertitres des pages de texte et des fiches passent en Figtree 700 à cette taille.
- **Body** (400, 1 rem, 1,55) : texte courant. Mesure de lecture : 36 à 38 em pour le texte long.
- **Small** (400, t-0) : notes, légendes, fil d'Ariane, dates, avis.
- **Label** (700, 0,75 rem, 1,1) : pastilles « Cadeau » et « Fruits à coque » dans les alvéoles.

### Named Rules
**La règle des chiffres alignés.** Prix, poids, quantités, totaux et tableaux sont en chiffres tabulaires, pour que les étiquettes se lisent comme une grille.

**La règle du relief rare.** Le lettrage Inline en capitales est l'embossage de la marque : logo, bandeau du couvercle, couvercle en métal. Il ne sert jamais de titre de section ni de sur-titre.

**La règle de la mesure en em.** La longueur des lignes se règle en em (36 à 38 em pour le texte courant), pas en ch : les chiffres larges de Figtree faussent le ch.

## Layout

Une seule colonne verticale, du couvercle au dessous de la boîte, dans un conteneur de 1240 px maximum avec une gouttière fluide (de 1 à 2,5 rem). Les sections respirent sur e-6 (3,5 rem) en haut et en bas ; la fin de l'accueil et du tunnel descend à e-7.

- **Accueil :** le couvercle occupe toute la largeur du conteneur. Photo verticale sur mobile (900 × 1300), paysage 16:9 à partir de 760 px. L'étiquette crème du H1 est posée en bas à gauche (en bas sur toute la largeur sur mobile, 48 % de large sur ordinateur). Le plateau cannelle remonte de 26 px sous le couvercle et porte les coffrets sur 2 colonnes, puis 4 à partir de 1024 px.
- **Grilles produit :** 2 colonnes sur mobile, 3 à partir de 1024 px ; sur les collections, une colonne de filtres de 240 px à partir de 860 px, grille de 2 puis 3 colonnes à 1120 px. Les filtres deviennent un panneau plein écran sur mobile.
- **Fiche produit :** galerie et bloc d'achat en 1,15 / 1 à partir de 900 px, bloc d'achat collant ; barre d'achat fixe en bas sur mobile.
- **Tunnel :** formulaire et récapitulatif collant de 360 px à partir de 960 px ; récapitulatif en premier sur mobile.
- **Pages de texte :** une colonne de 38 em centrée.
- **Rythme :** l'échelle e-1 à e-7 (0,5 à 5,5 rem) règle tous les écarts ; grilles à gouttière e-5 en vertical et fluide en horizontal.

## Elevation & Depth

La boîte est plate et son relief est creusé, pas posé. Les alvéoles, la galerie et les avis sont des creux (ombre intérieure douce en haut) où l'on dépose les biscuits ; le plateau est un fond de boîte creusé. Ce qui dépasse de la surface, c'est ce qui agit : le bouton caramel a une lèvre émaillée de 2 px, et seules les couches temporaires (liste des formats, tiroirs, barre d'achat mobile) projettent une ombre portée. Le cadre de la boîte et le bandeau en relief n'ont aucune ombre simulée : la fonte Inline et le contour suffisent.

### Shadow Vocabulary
Valeurs relevées dans le CSS. Toutes les ombres, filets et voiles sont teintés de chocolat (`rgb(58 34 24)`, soit `#3A2218`) depuis la correction du 2026-09-28.

- **Plaque émaillée** (`box-shadow: 0 2px 0 var(--action-bord), 0 3px 6px -2px rgb(58 34 24 / .35)`) : bouton caramel au repos ; au survol la lèvre passe à 3 px et le bouton monte d'1 px, à l'appui elle disparaît et le bouton s'enfonce de 2 px.
- **Alvéole** (`box-shadow: inset 0 3px 8px -3px rgb(58 34 24 / .28)`) : alvéoles produit, galerie, avis, cartes d'article.
- **Fond de plateau** (`box-shadow: inset 0 10px 18px -12px rgb(58 34 24 / .55)`) : le plateau cannelle sous le couvercle.
- **Couche flottante** (`box-shadow: 0 10px 24px -10px rgb(58 34 24 / .6), inset 0 0 0 2px var(--encre)`) : choix rapide des formats.
- **Tiroir** (`box-shadow: 0 0 40px -10px rgb(58 34 24 / .6)`, voile `rgb(58 34 24 / .45)`) : menu, panier, recherche.

### Named Rules
**La règle du creux.** Les contenus reposent dans des creux ; seuls les boutons d'action et les couches temporaires sortent de la surface.

## Shapes

Des coins de boîte en fer, doux mais nets : 14 px pour la boîte (couvercle, plateau, grandes photos), 12 px pour les alvéoles et les blocs, 6 px pour les plaques (boutons, champs, encadrés), 4 px pour les petites étiquettes (pastilles, logo), 18 px en pilule pour les filtres actifs et le sommaire.

- **Cadre de boîte :** un contour chocolat de 2 px rentré de 12 px à l'intérieur du couvercle et du plateau, doublé d'un filet fin à 18 px ; sur les grandes photos (atelier, pages), un contour crème de 2 px rentré de 10 px.
- **Filets de sertissage :** un double filet chocolat (2 px plein, puis 1 px à 45 % d'opacité rentré de 4 px) sur 16 px de haut sépare les étages de la page.
- **Étiquettes à filet :** l'étiquette du couvercle a un filet intérieur rentré de 6 px ; l'étiquette produit s'ouvre sur un trait chocolat de 2 px (crème sur le plateau).
- **Alvéole vide :** un produit épuisé laisse un emplacement en pointillés avec l'étiquette « Revient bientôt ».

## Components

### Buttons
Des plaques émaillées caramel, franches et pressables.
- **Shape :** plaque aux coins de 6 px, 48 px de haut au minimum (44 px en petit format).
- **Primary :** fond caramel, texte blanc, Figtree 700, lèvre caramel brûlé de 2 px.
- **Hover / Focus :** monte d'1 px, lèvre de 3 px ; à l'appui, s'enfonce de 2 px. Transitions de 0,2 s sur la courbe de la maison. Focus : contour brun lien de 3 px décalé de 3 px.
- **Secondary :** fond crème, contour intérieur chocolat de 2 px, texte chocolat ; au survol, fond miel.
- **Disabled :** fond inactif, texte chocolat au lait, sans lèvre.
- **Lien fort :** l'action secondaire à côté d'un bouton est un lien souligné en Figtree 700, pas un deuxième bouton.

### Chips
- **Style :** filtres actifs et sommaire en pilule crème cernée de chocolat (2 px), Figtree 600 ; au survol, fond miel.
- **Pastilles :** petites étiquettes rectangulaires de 4 px dans l'alvéole, « Cadeau » en miel, « Fruits à coque » en crème cernée de chocolat.

### Cards / Containers
- **Alvéole produit :** creux crème aux coins de 12 px, format 4:5, photo en plein cadre (object-fit cover) ; au survol, une deuxième photo remplace la première.
- **Étiquette produit :** grille fixe sous l'alvéole : nom (Big Shoulders 800), saveur, prix aligné à droite, poids en chocolat au lait. Les mêmes cases partout.
- **Blocs :** avis, articles et étapes du tunnel en crème aux coins de 12 px, padding e-4.
- **Encadrés :** miel (information, allergènes, bloc de grille) ou miel clair (confirmation, Noël).

### Inputs / Fields
- **Style :** fond crème, bordure chocolat au lait de 2 px, coins de 6 px, 48 px de haut.
- **Focus :** contour brun lien de 3 px décalé de 2 px, bordure qui passe au chocolat.
- **Error :** message rouge brique en 600, résumé d'erreurs sur fond rosé cerné de rouge brique.
- **Choix :** formats et modes de livraison en cartes crème ; l'option choisie prend un contour chocolat et le fond crème choisie.

### Navigation
- **En-tête :** fond biscuit collant, filet chocolat de 2 px en bas ; il se cache en descendant et revient en remontant. Liens chocolat Figtree 600, page active et survol soulignés de caramel brûlé (2 px). Logo à gauche : plaque cannelle, lettrage Inline crème, double filet intérieur ; au survol, plaque miel.
- **Mobile (sous 860 px) :** menu en tiroir depuis la gauche, liens en Big Shoulders 800 ; panier en tiroir depuis la droite, recherche depuis le haut. Glissement de 0,28 s, supprimé si « réduire les animations ».
- **Pied de page :** le dessous de la boîte, chocolat, texte crème, titres de colonne miel, mention gravée en lettrage Inline.

### Le couvercle (signature)
Le haut de l'accueil est un couvercle de boîte en fer. La photo de biscuits en lumière chaude est encadrée d'un contour chocolat rentré de 12 px ; un bandeau miel en lettrage Inline porte « Maison Sable · Hossegor » en haut ; l'étiquette crème à filet intérieur porte le H1, la définition et le bouton caramel « Offrir un coffret ».

À l'arrivée, un couvercle en métal cannelle portant « Maison Sable Hossegor » en lettrage Inline crème recouvre la photo, puis se soulève une seule fois : animation CSS `couvercle-souleve`, 1 s, courbe `cubic-bezier(.65, 0, .35, 1)`, départ après 0,45 s. Il bascule légèrement puis sort par le haut et disparaît. L'étiquette du H1 est au-dessus du couvercle pendant toute l'animation : le titre et le bouton restent lisibles et cliquables. Avec « réduire les animations », le couvercle en métal n'existe pas et la photo est visible d'emblée.

### Le plateau
Sous le couvercle, un plateau cannelle aux coins bas de 14 px, creusé et cerné du même contour chocolat, porte les coffrets dans leurs alvéoles crème. Tout le texte et les filets d'étiquette y sont crème ; les boutons restent caramel.

## Do's and Don'ts

### Do:
- **Do** montrer les biscuits en vraies photos chaudes, créditées, et signalées « Photo d'illustration · auteur, Unsplash » partout où elles sont vues en grand.
- **Do** garder le dessin pour deux visuels seulement : la carte cadeau et la coupe sablé / galette / palet.
- **Do** réserver le caramel aux actions, avec du texte blanc et la lèvre caramel brûlé.
- **Do** poser le texte crème sur la cannelle et le chocolat, le texte chocolat sur tout le reste.
- **Do** séparer les grands étages de page par un filet de sertissage double, pas par une frise dessinée.
- **Do** utiliser les mêmes cases d'étiquette (nom, saveur, prix, poids) sur les cartes, la fiche et le panier, en chiffres tabulaires.
- **Do** régler la mesure des textes en em (36 à 38 em).
- **Do** garder les mouvements d'interface entre 0,2 et 0,3 s, sans rebond ; le couvercle en métal (1 s, une fois) est la seule exception.
- **Do** laisser un produit épuisé en alvéole vide « Revient bientôt ».

### Don't:
- **Don't** revenir aux aplats illustrés pastel ni aux frises dessinées (vagues, pignes, ganivelles) : cette version est remplacée.
- **Don't** utiliser le caramel en fond de section, en titre ou en décoration.
- **Don't** écrire en miel ou en caramel sur un fond clair.
- **Don't** mettre de sur-titre en capitales au-dessus des titres ; les capitales Inline appartiennent au logo, au bandeau et au couvercle.
- **Don't** mettre de flèche dans les boutons ni deux boutons identiques côte à côte.
- **Don't** ajouter de dégradé, de halo ou de verre dépoli, ni d'ombre simulée sur le cadre ou le bandeau.
- **Don't** rejouer le couvercle au défilement ni le laisser masquer le H1 et le bouton.
- **Don't** présenter une photo d'illustration comme un produit réel de Maison Sable.

## Corrections après rédaction (2026-09-28)
- Teinte des ombres, filets et voiles passée du prune hérité au chocolat `rgb(58 34 24)`.
- Boutons posés sur le plateau cannelle : fond miel `#E8B15A`, texte chocolat (7,6:1), lèvre `#B8862F`, pour qu'ils se détachent du plateau. Les boutons caramel restent la règle sur les fonds clairs.
- Un seul rouge d'erreur : `#8E3321` (bordure des champs invalides comprise).
- Mesures de texte converties en em (intro 32 em, chapô et blocs d'aide 34 em, étiquette du couvercle 28 em).
- Légende « Photo d'illustration » ajoutée sur la photo du couvercle et sur la photo de l'atelier de l'accueil. Les cartes produit n'en portent pas : le bandeau « boutique fictive » et les légendes des fiches suffisent.
- Étape accessibilité : les signes ✓ (variante choisie) et ⚠ (erreur de champ) sont désormais des icônes dessinées (masques SVG, couleur du texte) ; restes des anciennes versions supprimés du CSS.
