# Brief — Maison Sable

> Date : 2026-09-27 · Type : e-commerce (maquette de portfolio) · Plateforme : **HTML/CSS statique qui reproduit une boutique Shopify, hébergé sur GitHub Pages** (alternative écartée : vrai thème Shopify Liquid sur boutique de test, parce qu'un thème Shopify ne peut pas être servi par GitHub Pages et que le coût en temps est disproportionné pour une pièce de portfolio).

> ⚠️ **Marque fictive.** Maison Sable n'existe pas : c'est une étude de cas créée par Mokom Studio pour son portfolio. Les produits, prix, textes, avis et l'histoire de la marque sont **inventés** et doivent être présentés comme tels sur le site (mention « Projet fictif — étude de cas Mokom Studio »). Hossegor, en revanche, est un lieu réel : la géographie et les références locales doivent rester exactes.

## 1. Le business en 5 lignes
- Activité / offre principale : biscuiterie artisanale (sablés, palets, biscuits secs) vendue en ligne à l'unité, en sachets, en boîtes et en coffrets cadeaux. `[FICTIF]`
- Prix ou panier moyen : sachets ≈ 6–9 €, boîtes ≈ 14–22 €, coffrets ≈ 29–45 € ; panier moyen visé ≈ 35 €. `[FICTIF — HYPOTHÈSE]`
- Zone servie : livraison France métropolitaine + retrait à l'atelier-boutique à Hossegor (Landes). `[FICTIF — HYPOTHÈSE]`
- Saisonnalité : pic d'été (vacanciers, surf, côte landaise) et pic de fin d'année (cadeaux de Noël, cadeaux d'entreprise). `[HYPOTHÈSE]`
- Ce qui rend la marque différente : l'ancrage océan/dune de Hossegor, la texture « sablée » comme signature (nom, produit, univers visuel), une fabrication en petites séries. `[FICTIF]`

## 2. Objectif du site
- Action n°1 (mesurable) : **ajouter au panier puis commander** (taux de conversion visé en situation réelle ≈ 2–3 %). `[HYPOTHÈSE]`
- Actions secondaires : commander un coffret cadeau (avec message), s'inscrire à la lettre d'information (nouveautés de saison), choisir le retrait à l'atelier.
- Objectif réel du projet (portfolio) : montrer à de futurs clients de Mokom Studio la capacité à concevoir une boutique Shopify premium, gourmande et performante — parcours complet accueil → collection → fiche produit → panier.

## 3. Cibles `[HYPOTHÈSE]`
| Profil | Déclencheur d'achat | Objections | Leurs mots (vocabulaire réel) |
|---|---|---|---|
| Vacancier·ère de la côte landaise (30–55 ans) | Souvenir de vacances à rapporter, envie de prolonger l'été après le retour | « Ça va arriver cassé ? », frais de port, fraîcheur | « souvenir d'Hossegor », « biscuits artisanaux », « goût beurre salé », « à offrir » |
| Personne qui offre (cadeaux perso ou d'entreprise) | Noël, anniversaire, remerciement, cadeaux clients | Délai de livraison, présentation du coffret, message personnalisé | « coffret gourmand », « cadeau original », « livré à temps », « joli emballage » |
| Gourmand·e local·e (Landes, Pays basque) | Envie d'un plaisir de qualité, goûter / pique-nique plage | Prix vs biscuits de supermarché | « fait maison », « ingrédients locaux », « sans conservateurs », « retrait sur place » |

## 4. Concurrence et références
- Concurrents directs / références du secteur (à vérifier avant usage, faits non vérifiés) : biscuiteries régionales ayant une boutique en ligne (ex. La Mère Poulard, biscuiteries basques et bretonnes). `[À COMPLÉTER — analyse à l'étape recherche]`
- Référence d'excellence hors secteur (pour la direction artistique) : `[À COMPLÉTER]` — piste : marques de cosmétiques ou de surf « lifestyle » à l'univers doux et tactile.

## 5. Marque
- Charte existante : **non** — tout est à créer (logo typographique, palette, typographies).
- Ambiance demandée : **palette douce et gourmande** (sable, crème, beurre, caramel, touches océan ou rose poudré) — à trancher à l'étape UI.
- Ton : **chaleureux**, complice, sensoriel, simple ; **vouvoiement** (validé par Morgane le 2026-09-28).
- Mots interdits / promesses interdites : pas de fausses allégations santé (« sain », « healthy », « sans sucre » sans fondement), pas de « bio » ni « label » inventé présenté comme réel, pas de faux chiffres présentés comme vrais.

## 6. Preuves disponibles
- Photos réelles : **aucune** → images d'illustration à produire (génération ou banques d'images libres de droits, crédits à noter).
- Avis vérifiables : aucun (marque fictive) → avis d'exemple, signalés comme fictifs.
- Presse / labels / certifications : aucun.
- Chiffres : aucun.
- Équipe / fondateur : aucun → personnage fondateur fictif possible, signalé comme tel.
- Manquants : logo, visuels, textes — tous à créer dans la chaîne.

## 7. Contraintes
- Budget / délai : `[À COMPLÉTER]` (projet interne Mokom Studio).
- Qui met à jour : Morgane / Mokom Studio, rarement.
- Langues : français (fr-FR).
- Obligations légales : pages légales d'exemple (mentions légales, CGV, confidentialité) à produire en version maquette, clairement fictives ; pas de bannière cookies nécessaire tant qu'aucun traceur n'est posé.
- Hébergement : GitHub Pages (URL de type `https://<compte>.github.io/maison-sable/`) `[À COMPLÉTER : compte GitHub]`.

## 8. E-commerce
- Nb produits / variantes : **8 à 12 produits** (sachets, boîtes, coffrets), variantes simples (format/poids). `[FICTIF]`
- Source catalogue : à créer (fichier de données du projet, à l'étape catalogue).
- Livraison : France métropolitaine, retrait atelier Hossegor ; tarifs d'exemple. `[FICTIF]`
- Retours : produits alimentaires, pas de droit de rétractation pour denrées périssables — à présenter correctement dans les CGV d'exemple.
- Paiements : simulés (le tunnel de commande est une maquette, aucun paiement réel).
- Site à migrer : **aucun** → étape « migration » retirée.

## Décisions et hypothèses
- Décision : maquette HTML/CSS statique « façon Shopify » sur GitHub Pages (panier simulé en JavaScript léger, contenu principal toujours présent dans le HTML).
- Décision : 8–12 produits.
- Décision : marque fictive → contenus inventés autorisés, **toujours signalés comme fictifs** sur le site publié.
- [HYPOTHÈSE] Cibles, prix, saisonnalité et zone de livraison ci-dessus.
- Les structures de pages et de données doivent rester fidèles à Shopify (collections, fiche produit, variantes, panier) pour que la maquette puisse être transposée en thème Shopify plus tard.
