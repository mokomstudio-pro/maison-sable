# Design (impeccable critique + audit) — rapport partiel · 2026-09-28

Méthode : double évaluation isolée — A : revue de directeur artistique (9 gabarits en 1440 et 390 px dans le navigateur) · B : détecteur impeccable sur `dist/` et `src/` + audit technique du code. Surcouche visuelle du détecteur non injectée (navigateur réservé à l'évaluation A).

## Scores
| Évaluation | Score | Bande |
|---|---|---|
| Critique (heuristiques de Nielsen, A) | 25/36 (≈ 28/40 ; « flexibilité » sans objet) | bon |
| Audit technique (B) | 13/20 — accessibilité 3, performance 3, responsive 3, variables 2, intégrité 2 | correct, à reprendre |

## Verdict sur la personnalité
**Propre à la marque sur l'accueil** (cadre de boîte en fer, bandeau miel en relief, plateau cannelle, Big Shoulders), **générique ailleurs** : collection, fiche, panier, tunnel, recherche ressemblent à un bon thème Shopify. L'idée « couvercle → fond de boîte » s'arrête après le premier écran.

## Là où A et B sont d'accord (priorité maximale)
**[P0] Choix rapide des formats illisible sur le plateau de l'accueil** (Carte cadeau, Boîte Grande Plage) — texte crème sur fond crème (≈ 1,1:1), 1,9:1 à l'option active ; le menu déborde aussi à droite en 390 px et couvre le nom du produit. Cause : `.plateau { color: var(--carte) }` (css l.522) hérité par `.choix-rapides` (l.191-193) via `button { color: inherit }`. **Vérifié.** Chemin d'achat n°1 + WCAG 1.4.3. Correction : `.plateau .choix-rapides { color: var(--encre) }` + menu ancré à droite sur la dernière colonne.

**Dette de cascade CSS** (source du P0) — sections « Corrections », « Revue finale », « Direction gourmande » qui se surchargent : `.bandeau-relief` et `.pied-gravure` définis 5 fois, `.plateau a` en encre (l.452) puis crème (l.524), anciennes couleurs, commentaire « fond sauge ». À fusionner dans les règles d'origine.

## Autres constats
| Prio | Constat | Source | Correction |
|---|---|---|---|
| P1 | **Photos en contradiction avec les produits** : cookies américains aux pépites en ouverture de l'accueil, Sablé Écume = gros cookie à l'orange, Biscuit Vague = cookies chocolat, Coffret Découverte = cookies à vermicelles | A | choisir des photos de sablés/palets fidèles ; accueil : plan serré de sablés dorés |
| P1 | **Mention `[FICTIF]` affichée telle quelle** dans la FAQ de la carte cadeau (2 réponses) — **vérifié** | B | retirer les marqueurs de travail à la génération |
| P1 | **Panier et tunnel génériques** : aucune suggestion vers la livraison offerte, message cadeau non rappelé, tunnel qui garde menu + pied de page + lettre d'information (sorties en pleine commande), 3 encarts « fictif » avant le 1ᵉʳ champ en mobile (premier champ à 782 px) | A | tunnel sans menu (logo + retour panier), un seul encart fictif, suggestion dans le tiroir, rappel du message cadeau |
| P1 | Mentions légales `[À COMPLÉTER]` (éditeur) | B | informations à fournir par Morgane |
| P2 | Récapitulatif d'erreurs du tunnel : annonce « 6 champs » alors que 7 erreurs (mode de livraison oublié) | A | inclure le groupe « mode de livraison » |
| P2 | Animations qui ignorent « réduire les animations » : en-tête masqué au défilement, barre d'achat, boutons, jauge, panneau de filtres | B | bloc global `prefers-reduced-motion` |
| P2 | Colonnes centrées sous des titres alignés à gauche (panier, recherche, 404) | A | aligner sur la grille du h1 |
| P2 | Pastilles en 10,5 px sous 480 px ; légende photo 11,5 px | B | ≥ 12 px |
| P2 | Pastille allergène des cartes masquée aux lecteurs d'écran (dans le lien image `aria-hidden`) | B | répéter l'allergène dans l'étiquette |
| P2 | Photos 800 px lourdes (185–260 Ko : Écume, Lagune, Été Indien, atelier) | B | recompresser (qualité 70–75, ~100 Ko) |
| P2 | L'univers « boîte » absent hors accueil (collection, fiche, tiroir panier) | A | filet de sertissage, tiroir « fond de boîte » |
| P3 | Couleurs en dur hors variables (#DDD4C8, #FFFDF8, #8E3321, #FBE3DC, #B8862F) ; écart CSS ↔ DESIGN.md (rayons, tailles) | B | variables + mise à jour DESIGN.md |
| P3 | Cibles 36–38 px (filtre actif, sommaire) ; tiroirs en `100vw` ; `dist/assets/maison-sable.css` publié mais inutilisé ; ombre animée sur `.bouton` | B | — |
| P3 | Filtre prix peu utile (gamme 6,90–8,90 €) ; cellule vide sur la collection mobile ; « Contient : fruits à coque » sous la ligne de flottaison sur le Croquant Lagune | A | — |

## Faux positifs du détecteur (écartés)
Halos « dark-glow » (anneaux `inset` servant de bordure, 135), contraste « encre sur encre » (fond transparent à 7 % ignoré, 31), images à opacité 0 (image de survol voulue, 21), interlignage 1,30 (au seuil, 33), marges « serrées » sur photos pleine surface (22).

## Ce qui marche
- Fiche produit exemplaire : allergènes en encart, tableau format/poids/prix au kilo, dates de livraison calculées, économie affichée, barre d'achat collante.
- Formulaires accessibles : récapitulatif d'erreurs focalisé, messages précis, focus au tiroir, annonce vocale de l'ajout ; dialogues natifs, piège du focus, Échap, lien d'évitement.
- Paires de couleurs principales conformes (encre/fond 11,8:1, blanc/caramel 5,45:1).
- Couvercle animé en `transform` seulement, une fois, coupé en « réduire les animations » ; amélioration progressive ; aucun script tiers.
- Textes justes et chaleureux ; fiction signalée sans lourdeur.

Captures : `scratchpad/critique-a/` (session). Sorties brutes du détecteur : `scratchpad/dist.json`, `scratchpad/src.json`.
