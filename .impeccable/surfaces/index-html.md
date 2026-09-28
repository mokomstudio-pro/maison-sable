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
OWN-WORLD (révisé 2026-09-28, version gourmande demandée par Morgane) : vraies photos gourmandes (Unsplash, créditées, « photo d’illustration ») dans des alvéoles crème ; palette « Caramel et beurre » — fond biscuit #F3E4CC, carte crème #FBF4E8, texte chocolat #3A2218, bouton caramel #A5531D texte blanc, plateau cannelle #7A3E1D texte crème, miel #E8B15A (bandeau en relief, pastilles), liens #8A4A1C, pied de page chocolat ; cadre de boîte en fer et filets de sertissage autour des photos, plus d’aplats dessinés. Titres Big Shoulders Display 800, relief Big Shoulders Inline Display, texte Figtree.
STORY : La visiteuse reconnaît un objet-souvenir de la côte, comprend en une ligne ce que vend Maison Sable (biscuits artisanaux d'Hossegor, coffrets à offrir), croit à l'artisanat par la précision des étiquettes (ingrédients, poids, allergènes), et ajoute un coffret au panier. Le prospect retient une marque singulière et un parcours d'achat impeccable.
FIRST VIEWPORT : la photo de biscuits en lumière chaude dans un cadre de boîte en fer ; bandeau miel « Maison Sable · Hossegor » ; étiquette crème à gauche avec le H1, la définition et le bouton caramel « Offrir un coffret ». Interaction signature : à l’arrivée, un couvercle en métal cannelle portant « Maison Sable Hossegor » se soulève (1 s, CSS, une fois) et découvre la photo ; H1 et bouton restent lisibles au-dessus ; état final sans animation si « réduire les animations ».
FORM : « La boîte en fer lithographiée », candidat 5 de ma liste ordonnée (1 affiches balnéaires, 2 architecture basco-landaise, 3 carte postale, 4 tables des marées, 5 boîte en fer lithographiée, 6 cabines de plage rayées, 7 ganivelles et rides de sable) ; seed key 6d3452dc ; choix : assigned. Relèvements : grille fixe d'étiquette (tableau à palettes), coupe explicative dessinée sablé/galette/palet (carnet), alvéole vide = épuisé (vidéoclub), un seul axe vertical couvercle → fond de boîte (Versailles). Interaction signature : au premier défilement de l'accueil, le couvercle se soulève (transform/opacity, ≤ 600 ms, une fois) et révèle le plateau des coffrets rangés dans leurs alvéoles de papier cristal ; état final visible sans JS et en reduced-motion. Grammaire de mouvement : 150–250 ms, glissements courts, pas de rebond.
FINISH : unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
- Faces exactes (display inline 1930s + texte humaniste) à éprouver au développement ; éviter la liste des polices réflexe.
- Production des 12 illustrations (couvercle + 11 produits) : SVG en aplats ou raster généré, provenance à consigner.
