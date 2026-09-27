# Plan GEO — Maison Sable (être compris et cité par les IA)

> Étape « seo-geo » · 2026-09-27 · Faits : `docs/fiche-entite.md` uniquement.
> **Cadre honnête** : Maison Sable est fictive et, si la décision B est validée, elle ne sera pas indexée. **Aucune IA ne pourra donc la citer**, et ce n'est pas le but. Ce plan sert à **montrer dans le portfolio** comment Mokom Studio rend une boutique lisible par les IA : réponses directes, faits précis, entité cohérente, contenu dans le HTML.

## 1. Questions cibles (chacune rattachée à UNE page, avec une réponse directe de 40 à 60 mots en tête)

| # | Question | Page | Fait(s) utilisé(s) |
|---|---|---|---|
| 1 | Quel coffret de biscuits artisanaux offrir ? | Coffrets & cadeaux | 3 coffrets et la boîte, contenus, prix |
| 2 | Combien coûte un coffret de biscuits Maison Sable ? | Coffrets & cadeaux | 15,90 à 34 € |
| 3 | Peut-on ajouter un message cadeau et faire livrer directement ? | Coffrets & cadeaux | message cadeau, livraison France métropolitaine |
| 4 | Jusqu'à quand commander pour Noël ? | Coffrets & cadeaux (bloc saisonnier) | date limite `[À DÉCIDER à l'étape checkout]` |
| 5 | Qu'est-ce que Maison Sable ? | Accueil | définition de la fiche d'entité |
| 6 | Où acheter des biscuits artisanaux à Hossegor ? | L'atelier à Hossegor | atelier, retrait, horaires `[FICTIF]` |
| 7 | Que rapporter d'Hossegor comme souvenir gourmand ? | L'atelier à Hossegor | coffrets, recettes inspirées du lieu |
| 8 | Qui fabrique les biscuits Maison Sable ? | L'atelier à Hossegor | Jeanne, équipe de 3, petites séries `[FICTIF]` |
| 9 | Combien de temps se conservent les sablés ? | FAQ | durées du catalogue (45 à 90 jours), conseils |
| 10 | Comment garder des sablés croustillants ? | FAQ | au sec, sachet refermé |
| 11 | Les biscuits arrivent-ils cassés ? Comment sont-ils emballés ? | FAQ | emballage `[À DÉCIDER à l'étape checkout]` |
| 12 | Quels sont les délais et frais de livraison ? | FAQ | 24 à 48 h de préparation, 5,90 €, offerte dès 45 € (provisoire) |
| 13 | Peut-on retirer sa commande à l'atelier ? | FAQ | gratuit, horaires |
| 14 | Les biscuits contiennent-ils des fruits à coque ? | FAQ | traces sur toutes les recettes, amandes dans Lagune |
| 15 | Quels allergènes contiennent les biscuits ? | FAQ | 14 allergènes, par recette |
| 16 | Comment fonctionne la carte cadeau ? | Carte cadeau | 20, 40 ou 60 €, envoi par e-mail |
| 17 | Quelle est la différence entre un sablé, une galette et un palet ? | Article | épaisseur, levure, texture (sources externes) |
| 18 | D'où vient la galette de Pont-Aven ? | Article | faits sourcés (produits-laitiers.com, etc.) |
| 19 | Quel biscuit au caramel beurre salé choisir ? | Palet Marée | caramel 12 %, beurre demi-sel, 150 ou 300 g |
| 20 | Quels sablés à la fleur de sel acheter en ligne ? | Sablé Dune | beurre demi-sel 30 %, fleur de sel 0,8 % |
| 21 | Que contient la Boîte Grande Plage ? | Boîte Grande Plage | 4 recettes, 250 ou 500 g |
| 22 | Que contient le Coffret Découverte ? | Coffret Découverte | 6 mini-sachets de 50 g |
| 23 | Les biscuits au chocolat contiennent-ils du soja ? | Biscuit Vague | lécithine de soja dans le chocolat |
| 24 | Les sablés Pignada contiennent-ils des fruits à coque ? | Sablé Pignada | pignons ≠ fruits à coque réglementaires, traces possibles |

Aucune question n'est traitée par deux pages. La FAQ renvoie vers les fiches pour le détail.

## 2. Règles d'écriture (appliquées à l'étape copywriting)
- **Réponse d'abord** sous chaque H2 formulé comme une question.
- **Passages autonomes** : nommer « Maison Sable », « le Palet Marée », « l'atelier d'Hossegor » plutôt que « nous », « il » ou « ce biscuit ».
- **Faits précis** : pourcentages d'ingrédients, poids, nombre de biscuits, durées, prix. Tous tirés du catalogue.
- **Tableaux HTML** : caractéristiques produit, comparatif des coffrets, comparatif sablé, galette et palet.
- **Même définition** de la marque partout (fiche d'entité, mot pour mot).
- **Signaux de confiance** : date sur l'article, sources citées, page atelier concrète, mentions légales complètes. La mention « projet fictif » reste visible.

## 3. Technique
- Tout le contenu est dans le HTML servi : panier et filtres en amélioration progressive, aucun texte injecté seulement par JavaScript.
- Pas de `nosnippet` ni de `max-snippet:0`. Seul le `noindex` global (décision B) s'applique.
- **Robots IA** : sans objet tant que le site est en `noindex`, et le `robots.txt` d'un site de projet GitHub Pages n'est pas modifiable (voir `03-seo.md` §5). Pour un vrai client, on autoriserait les robots de recherche (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `Bingbot`, `Applebot`), et le choix sur les robots d'entraînement lui reviendrait.
- **Données structurées** cohérentes avec la fiche d'entité : `Organization` sans `sameAs` (aucun profil externe), `Product` avec des faits complets, sans note inventée.
- `llms.txt` : non prioritaire. Aucun grand moteur ne s'en sert de façon avérée. Il n'est pas prévu.

## 4. Prompts de contrôle (état « avant »)
À poser à ChatGPT, Perplexity et au mode IA de Google. **Pour une marque fictive non indexée, on s'attend à ce qu'elle ne soit jamais citée.** L'intérêt, pour le portfolio, est de relever **qui est cité aujourd'hui** sur ces questions, donc la concurrence réelle et les sources de référence.

| # | Prompt | Résultat « avant » |
|---|---|---|
| 1 | Quelle biscuiterie artisanale à Hossegor ? | `[À RELEVER]` |
| 2 | Que rapporter d'Hossegor comme souvenir gourmand ? | `[À RELEVER]` |
| 3 | Meilleur coffret de biscuits artisanaux à offrir en France | `[À RELEVER]` |
| 4 | Où acheter des sablés au caramel beurre salé artisanaux en ligne ? | `[À RELEVER]` |
| 5 | Idée de cadeau gourmand des Landes | `[À RELEVER]` |
| 6 | Différence entre sablé, galette et palet | `[À RELEVER]` |
| 7 | Combien de temps se conservent des sablés pur beurre ? | `[À RELEVER]` |
| 8 | Coffret de biscuits pour cadeau d'entreprise, fabriqué en France | `[À RELEVER]` |
| 9 | Biscuits artisanaux sans fruits à coque livrés à domicile | `[À RELEVER]` |
| 10 | Maison Sable Hossegor | `[À RELEVER]` (attendu : aucun résultat) |

Je ne peux pas interroger ces assistants depuis ici. Le relevé est à faire par Morgane, ou il sera ignoré puisqu'il s'agit d'une maquette.

## 5. Sources tierces
**Aucune à obtenir** : solliciter la presse, des annuaires ou des plateformes d'avis pour une entreprise fictive serait trompeur. Pour un vrai client, on viserait par exemple l'office de tourisme local, la presse régionale, les épiceries fines partenaires, les guides « que rapporter de… » (voir les sources de `02-recherche.md`) et une plateforme d'avis vérifiés.

## Porte de sortie
- [x] `docs/fiche-entite.md` complète, avec `[FICTIF]`, sources et `[À COMPLÉTER]` explicites.
- [x] 24 questions cibles, chacune rattachée à une seule page.
- [ ] `/claude-seo-ai:geo` sur les pages clés → après le développement.
- [~] Prompts de contrôle listés ; relevé « avant » `[À RELEVER]` (facultatif pour une maquette).
