# Performance — Maison Sable

> Étape « performance » · 2026-09-28 · Mesures **de laboratoire** (le site n'a pas de visiteurs réels : aucune donnée de terrain CrUX ni Search Console, et le site est en `noindex`).
> Conditions : Chrome, mobile 390 × 844 (densité 2), **réseau « 4G lente »**, **processeur ralenti 4 fois**, cache vidé, aperçu local compressé en gzip comme GitHub Pages (`npm run serve`). Traces enregistrées avec Chrome DevTools.
> Objectifs Mokom (mobile) : LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1 · accueil ≤ 1,5 Mo · JavaScript propre ≤ 150 Ko · polices ≤ 4 fichiers / 150 Ko · image principale ≤ 150 Ko.

## 1. Résultats par gabarit (après corrections)

| Gabarit | LCP (affichage de l'élément principal) | CLS (décalages) | Poids transféré | Verdict |
|---|---|---|---|---|
| Accueil `/` | **2,24 s** (image d'accueil) | **0,00** | 379 Ko (HTML 16, polices 68, images 284, JS 11) | ✅ |
| Collection `/collections/biscuits` | **1,90 s** | **0,01** | 514 Ko (images 420) | ✅ |
| Fiche produit `/products/palet-maree` | **2,25 s** (photo principale) | **0,00** | 339 Ko (images 241) | ✅ |
| Panier `/cart` (1 article) | **1,27 s** | **0,00** | — | ✅ |
| Commande `/checkout` | **1,67 s** | **0,00** | — | ✅ |

**Réactivité (INP)** : sur la fiche produit, deux vrais clics (choix du format 300 g, puis « Ajouter au panier » qui ouvre le tiroir) avec le processeur ralenti 4 fois : **aucune interaction au-dessus de 16 ms** (seuil minimal de mesure), très loin des 200 ms. Le script ne fait aucun calcul lourd au clic.

**Budget**

| Poste | Mesuré | Budget | |
|---|---|---|---|
| Poids de l'accueil | 379 Ko | ≤ 1,5 Mo | ✅ |
| JavaScript propre | 11 Ko compressés (33 Ko bruts) | ≤ 150 Ko | ✅ |
| Polices | 3 fichiers WOFF2, 68 Ko | ≤ 4 fichiers, ≤ 150 Ko | ✅ |
| Image principale mobile | 54 Ko (640 px) à 84 Ko (800 px) selon l'écran | ≤ 150 Ko | ✅ |
| Image principale ordinateur | 152 Ko (1 600 px) | ≤ 150 Ko | ⚠️ à la limite (2 Ko au-dessus) |
| Scripts tiers | aucun | seulement après consentement | ✅ |

## 2. Problèmes trouvés et corrigés

| Problème | Cause | Correction | Gain mesuré |
|---|---|---|---|
| LCP de l'accueil à **2,80 s** (au-dessus de 2,5 s) | feuille de style dans un fichier séparé, qui bloque le premier affichage (≈ 0,5 s perdues sur 4G lente) ; photo d'accueil plus grande que nécessaire sur téléphone | styles intégrés dans chaque page (≈ 9 Ko compressés) ; variante de la photo d'accueil à 640 px (54 Ko) | **2,80 s → 2,24 s** ; délai de rendu 860 → 375 ms |
| CLS de la commande à **0,14** (au-dessus de 0,1) | le récapitulatif (ouvert en haut sur mobile) et les dates de livraison sont remplis après l'affichage et poussent le formulaire vers le bas | récapitulatif replié sur mobile (une ligne, comme prévu en UX), ouvert seulement sur ordinateur ; place réservée pour les dates de livraison | **0,14 → 0,00** |

## 3. Déjà en place (conçu dès le développement)
- Image principale jamais en chargement différé, avec `fetchpriority="high"`, préchargée par taille d'écran (`imagesrcset`), dimensions déclarées (zéro décalage).
- Toutes les autres photos : `loading="lazy"`, `decoding="async"`, WebP recadré, `srcset` 480 / 800 px.
- Polices hébergées sur le site, `font-display: swap`, polices de repli ajustées, préchargement de la seule police des titres.
- JavaScript en module différé, rien de bloquant ; aucune bibliothèque, aucun script tiers.
- Animation du couvercle en `transform` uniquement, une seule fois, désactivée si « réduire les animations » ; le titre et le bouton restent au-dessus pendant l'animation.

## 4. Points d'attention (non bloquants)
- **Poids des photos des collections** : l'outil de trace estime qu'environ 380 Ko de photos pourraient être économisés sur la collection Biscuits (photos 800 px envoyées aux écrans haute densité). Piste : ajouter une taille intermédiaire (640 px) pour les vignettes. Gain modeste, sans effet mesuré sur le LCP (1,90 s).
- **Photo d'accueil ordinateur** : 152 Ko pour un budget de 150 Ko. Sans effet sur le mobile ; à recompresser légèrement si l'audit final le demande.
- **Cache** : GitHub Pages sert les fichiers avec un cache court (10 min) et ne permet pas de le régler. Les fichiers ne sont pas versionnés dans leur nom : acceptable pour une maquette.
- Les mesures de terrain (visiteurs réels sur 28 jours) ne seront jamais disponibles : site en `noindex` et sans mesure d'audience, par choix.

## Porte de sortie
- [x] Chaque gabarit : LCP, CLS et réactivité dans les objectifs en laboratoire mobile (5 gabarits mesurés).
- [x] Budget respecté ; seul dépassement : photo d'accueil **ordinateur** de 2 Ko (sans effet sur le mobile), signalé.
- [x] Aucun script tiers.
