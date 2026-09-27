# Journal — Maison Sable

## 2026-09-27 — Cadrage (discovery)

**Décisions**
- Projet : boutique e-commerce de biscuits artisanaux à Hossegor, **marque fictive** pour le portfolio Mokom Studio.
- Plateforme : maquette HTML/CSS statique qui reproduit une boutique Shopify, hébergée sur GitHub Pages. Écarté : vrai thème Shopify Liquid (impossible à servir sur GitHub Pages, trop long pour un portfolio).
- Catalogue : 8 à 12 produits (sachets, boîtes, coffrets).
- Aucun visuel de départ : logo, palette, typographies et images à créer.
- Chaîne e-commerce retenue, sans l'étape « migration » (pas de site existant). Étapes « checkout » et « analytics » réalisées en version maquette.
- `claude-seo-ai` laissé actif : ses garde-fous ne concernent que Shopify/WordPress réels, pas un site statique.
- Contenus de marque inventés autorisés, toujours marqués `[FICTIF]` et mention « Projet fictif — étude de cas Mokom Studio » sur le site.

**Questions ouvertes**
- Compte GitHub et nom du dépôt pour l'adresse GitHub Pages.
- Délai souhaité.
- Référence d'excellence hors secteur pour la direction artistique.
- Tutoiement ou vouvoiement.
- Source des images (génération IA ou banques libres de droits).

## 2026-09-27 — Catalogue

**Décisions**
- 11 produits `[FICTIF]` : 7 recettes en sachets, 1 boîte assortie, 2 coffrets, 1 carte cadeau. 19 variantes au total (poids, taille ou montant ; un seul type d'option par produit).
- Source unique : `docs/catalogue/produits.csv` + `variantes.csv`, contrôlée par `node scripts/verifier-catalogue.mjs`.
- Allergènes : liste fermée des 14 allergènes majeurs (UE 1169/2011), affichés avant l'achat. Pas de filtre « sans fruits à coque », car toutes les recettes portent une mention de traces.
- Message cadeau géré comme un champ du panier, pas comme une variante.
- Pas de prix barré ni de GTIN.

**Questions ouvertes**
- Gamme et prix à valider par Morgane.
- Déclaration nutritionnelle (exemption artisanale ou non) → à trancher à l'étape conformité.
- Recherche interne simulée ou non → à trancher à l'étape UX.

## 2026-09-27 — Recherche d'intentions

**Décisions**
- Priorité 1 : « coffret biscuits artisanaux » (cadeau). Ensuite l'ancrage local (Hossegor, souvenir des Landes), puis les recettes sur les fiches produit.
- Une seule collection cadeaux (pas de pages « Coffrets » et « Idées cadeaux » en doublon). Noël est traité comme une saison de cette collection, pas comme une page à part.
- Positionnement confirmé : aucune « biscuiterie de bord de mer » ne s'impose. Le souvenir illustré d'Hossegor est déjà occupé par une madeleine (Lamothe), pas par un sablé.
- Seuil de livraison offerte d'environ 45 € cohérent avec le marché (à trancher à l'étape checkout).
- Aucun volume chiffré : priorités qualitatives, volumes à vérifier.

**Questions ouvertes**
- Renommer « Galette Marée épaisse » en « Palet Marée » (une galette est fine par définition) → à valider par Morgane.
