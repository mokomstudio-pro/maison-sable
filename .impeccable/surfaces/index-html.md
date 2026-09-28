---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief — boutique Maison Sable (accueil, collections, fiches, panier, tunnel simulé)

Scope : toute la boutique statique (site entier), mode **Persuade** pour accueil/collections/fiches, **Operate** pour panier et tunnel, **Read** pour FAQ/article.
Audience : acheteuses de coffrets et souvenirs d'Hossegor (mobile) ; public réel : prospects de Mokom Studio. Action : ajouter au panier → commander (coffrets d'abord). Preuves : faits du catalogue et de docs/fiche-entite.md uniquement, fiction toujours signalée. Contraintes : docs/06-ux.md (zoning), budget perf mokom-performance, WCAG 2.2 AA, aucune photo disponible (illustrations produit à produire).

## Direction contract
THESIS : Le site est une boîte à biscuits en fer lithographiée d'Hossegor, années 1930 : l'accueil est le couvercle imprimé, on le soulève et les produits sont rangés dans la boîte. Refuse la boutique gourmande standard (grande photo, deux boutons, grille de cartes arrondies) et le crème + serif + terracotta.
OWN-WORLD : aplats d'encres lithographiques sans dégradé — fer-blanc #DAD6CC (fond), lagune #62A7B1, corail #E9745B (actions, texte encre dessus), beurre #F1C453, pin #2E5B4E, encre #1D2740 (texte), lagune profond #285F69 (liens) ; papier cristal #EFECE5 pour les alvéoles/zones de lecture. Bandeaux de couvercle à frise répétée (vagues, pignes, ganivelles), lettres en relief (inline), filets de sertissage, coins de boîte légèrement arrondis, étiquettes produit à grille fixe (nom / saveur / poids / prix en chiffres tabulaires). Illustrations produit en 4 encres plates, jamais de photo.
STORY : La visiteuse reconnaît un objet-souvenir de la côte, comprend en une ligne ce que vend Maison Sable (biscuits artisanaux d'Hossegor, coffrets à offrir), croit à l'artisanat par la précision des étiquettes (ingrédients, poids, allergènes), et ajoute un coffret au panier. Le prospect retient une marque singulière et un parcours d'achat impeccable.
FIRST VIEWPORT : Mobile 390 px : bandeau fictif (1 ligne) ; en-tête compact ; le couvercle occupe l'écran — scène lithographiée (dune, ganivelles, lac marin, pins, soleil bas) dans un cadre de boîte à sertissage ; bandeau embossé « Maison Sable · Hossegor » en haut du couvercle ; H1 « Biscuits artisanaux de bord de mer, faits à Hossegor » sur l'étiquette centrale du couvercle ; phrase de définition ; bouton corail « Offrir un coffret » visible sans défiler, lien secondaire « Découvrir nos biscuits ». Desktop : couvercle en 16:9, étiquette décalée à gauche du centre, scène qui déborde du cadre à droite.
FORM : « La boîte en fer lithographiée », candidat 5 de ma liste ordonnée (1 affiches balnéaires, 2 architecture basco-landaise, 3 carte postale, 4 tables des marées, 5 boîte en fer lithographiée, 6 cabines de plage rayées, 7 ganivelles et rides de sable) ; seed key 6d3452dc ; choix : assigned. Relèvements : grille fixe d'étiquette (tableau à palettes), coupe explicative dessinée sablé/galette/palet (carnet), alvéole vide = épuisé (vidéoclub), un seul axe vertical couvercle → fond de boîte (Versailles). Interaction signature : au premier défilement de l'accueil, le couvercle se soulève (transform/opacity, ≤ 600 ms, une fois) et révèle le plateau des coffrets rangés dans leurs alvéoles de papier cristal ; état final visible sans JS et en reduced-motion. Grammaire de mouvement : 150–250 ms, glissements courts, pas de rebond.
FINISH : unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
- Faces exactes (display inline 1930s + texte humaniste) à éprouver au développement ; éviter la liste des polices réflexe.
- Production des 12 illustrations (couvercle + 11 produits) : SVG en aplats ou raster généré, provenance à consigner.
