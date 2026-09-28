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
- ~~Renommer « Galette Marée épaisse » en « Palet Marée »~~ → validé, fait (voir ci-dessous).

## 2026-09-27 — Catalogue : renommage validé

- « Galette Marée épaisse au caramel beurre salé » devient « **Palet Marée au caramel beurre salé** » (type `Palet`). Validé par Morgane.
- Adresse de la page : `palet-maree` (au lieu de `galette-maree`). Aucune redirection n'est nécessaire puisque le site n'est pas en ligne. SKU `MS-MAREE-*` inchangés.
- Mis à jour : produits.csv, variantes.csv, dictionnaire (script + modele-donnees.md), brief, PRODUCT.md, 02-recherche.md.

## 2026-09-27 — Architecture

**Décisions**
- Deux collections : **Biscuits** (7 recettes) et **Coffrets & cadeaux** (6 produits, collection automatique selon l'occasion « Cadeau »). Les collections « Boîtes et coffrets » et « Cartes cadeaux » sont abandonnées, car trop maigres. Catalogue mis à jour (`collection_principale`).
- Adresses identiques à Shopify (`/collections/`, `/products/`, `/pages/`, `/blogs/`, `/policies/`). Toute page importante est à 2 clics maximum.
- Pages éditoriales : L'atelier à Hossegor, FAQ, 1 article « Sablé, galette ou palet ? », Contact, À propos de ce projet (étude de cas).
- Filtres limités (saveur et prix ; format et prix) ; filtres, tri, recherche, panier et `/collections/all` exclus de l'index.
- Pas d'avis dans les données structurées, puisqu'ils sont fictifs.

**Questions ouvertes**
- Décision B : site publié entièrement en `noindex` (proposé, à valider par Morgane).

## 2026-09-27 — SEO et GEO

**Décisions**
- Carte requêtes → pages : la collection Coffrets & cadeaux porte la requête n°1. Aucune requête n'est ciblée par deux pages.
- Titles, descriptions et H1 des 20 pages dans `docs/seo/metas.csv`, contrôlés par `node scripts/verifier-metas.mjs` (tous conformes).
- Fiche d'entité créée (`docs/fiche-entite.md`) : définition unique de la marque, pas d'adresse précise, téléphone dans la plage ARCEP réservée aux fictions (05 36 49…), e-mail en `.example`, aucun SIREN, aucune fiche Google Business Profile.
- `Organization` plutôt que `LocalBusiness` (aucune adresse réelle à déclarer). Pas d'avis dans les données structurées.
- 24 questions cibles, chacune rattachée à une seule page. Pas de sources tierces à solliciter (entreprise fictive). Pas de `llms.txt`.
- Limite de GitHub Pages : le `robots.txt` d'un site de projet n'est pas modifiable. Le `noindex` se fait page par page.

**Questions ouvertes**
- Décision B (`noindex` global) toujours à valider.
- Origine des ingrédients phares, emballage, date limite de Noël → étapes fiche produit et checkout.
- URL du site Mokom Studio (page Étude de cas).

## 2026-09-27 — UX

**Décisions**
- 4 parcours, dont celui du **prospect de Mokom Studio**, qui est le vrai public de la maquette.
- Le bandeau d'annonce devient la mention « Boutique fictive, étude de cas Mokom Studio : aucune commande n'est expédiée ». La réassurance livraison passe près des boutons d'achat et dans le panier (architecture mise à jour).
- Tunnel de commande simulé sur une seule page : **aucun champ de carte bancaire**, données jamais envoyées, bouton « Remplir avec un exemple ».
- Ajout rapide depuis les cartes (1 interaction, 2 pour un produit à deux poids). Barre d'achat fixe sur mobile. Tiroir panier avec barre de progression vers la livraison offerte.
- Allergènes toujours visibles (pas d'accordéon fermé). Réponses de la FAQ visibles. Message cadeau limité aux coffrets, à la boîte et à la carte cadeau.
- Recherche interne : index intégré, synonymes, page en `noindex`, fonctionne sans JavaScript.
- Grille de 2 colonnes sur mobile et de 3 sur ordinateur (à confirmer en UI).

**Questions ouvertes**
- Prix au kilo : obligation à vérifier à l'étape conformité.
- Décision B (`noindex` global) et URL de Mokom Studio : toujours en attente.

## 2026-09-27 — Décisions de Morgane

- **Décision B validée** : le site publié sur GitHub Pages est entièrement en `noindex`. Le travail SEO reste fait dans le code (voir CLAUDE.md et `05-architecture.md`).
- **Site de Mokom Studio** : https://www.mokomstudio.fr (page Étude de cas, éditeur réel dans la fiche d'entité).
- Gamme et prix du catalogue **validés par Morgane** le 2026-09-27.
- Questions ouvertes restantes : origine des ingrédients, emballage, date limite de Noël, prix au kilo.

## 2026-09-28 — Direction artistique

**Décisions**
- Réponses de Morgane : retenir « une marque qui a une vraie personnalité » ; éviter le terroir et le luxe froid ; référence : affiches balnéaires anciennes.
- Piste choisie sur la page de décision : **« La boîte en fer lithographiée »** (tirage de l'outil de conception, seed 6d3452dc). Écartées : l'affiche de station, le mur de boîtes, la boutique classique, et 5 pistes hors sujet dont une discipline a été gardée.
- Palette en encres plates, contrastes vérifiés : fer-blanc, papier cristal, encre, corail (actions, texte encre), lagune `#62A7B1` (ajustée pour le contraste), lagune profond `#285F69` (liens), beurre, pin.
- Aucune photo : produits illustrés en aplats, logo dessiné. Moment signature : le couvercle qui se soulève sur l'accueil.
- Construction pilotée par le code (pas de générateur d'images dans cette session) ; contrat de direction dans `.impeccable/surfaces/index-html.md`. `DESIGN.md` sera écrit à la fin du développement.

**Questions ouvertes**
- Fontes exactes (épreuve au développement).
- Production des illustrations (couvercle + 11 produits).

## 2026-09-28 — Merchandising

**Décisions**
- Ordres des collections, plateaux de l'accueil et suggestions dans `docs/catalogue/merchandising.json`, contrôlés par `verifier-catalogue.mjs`.
- Aucune fausse donnée de vente : pas de badge « Best-seller » ni « Nouveau ». Seules pastilles : « Cadeau » et « Contient des fruits à coque ».
- Grand format : économie réelle affichée sur le bouton de poids (de 1,30 € à 4,90 €), prix au kilo calculé.
- Panier : une seule suggestion (un sachet), seulement s'il manque 15 € ou moins pour la livraison offerte (45 €, provisoire).
- Produit épuisé : alvéole vide « Revient bientôt », exclu des suggestions.
- Correction dans `06-ux.md` : le plateau de l'accueil présente 2 coffrets, la boîte et la carte cadeau.

**Questions ouvertes**
- Le Coffret Été Indien (34 €) coûte 0,70 € de plus que ses composants (33,30 €). Option A : 31,90 € avec « 1,40 € de moins » ; option B : 34 € sans parler d'économie → **décision de Morgane**.

## 2026-09-28 — Prix du Coffret Été Indien

- **Option A choisie par Morgane** : le Coffret Été Indien passe de 34 € à **31,90 €**, soit 1,40 € de moins que ses composants achetés séparément (33,30 €). L'économie est affichée sur la fiche et sur la carte.
- Mis à jour : variantes.csv, metas.csv, fiche d'entité, modele-donnees.md, merchandising.md, 02/03/04. Vérifications du catalogue et des metas OK.

## 2026-09-28 — Fiche produit

**Décisions**
- Gabarit unique de fiche produit (`docs/08-contenus/gabarit-fiche-produit.md`) rempli par le développement à partir de 4 sources : catalogue, merchandising, metas, textes. Aucun fait recopié à la main.
- Textes des 11 fiches (`docs/08-contenus/fiches-produits.md`) : présentation de 40 à 60 mots (vérifiée), 3 points « En bref », dégustation et conservation, 2 questions par produit, textes alternatifs des illustrations.
- Voix : chaleureuse, sensorielle, précise ; liste de formules interdites contrôlée. Vouvoiement appliqué.
- Allergènes toujours visibles ; questions dédiées sur les pignons et la noix de coco (qui ne sont pas des fruits à coque au sens réglementaire), le soja du chocolat et les amandes des coffrets.
- Nouveau fait `[FICTIF]` : la Boîte Grande Plage est une boîte en fer imprimée et réutilisable (ajouté à la fiche d'entité).

**Questions ouvertes**
- Validité de la carte cadeau et déclaration nutritionnelle → étape conformité.
- Vouvoiement ou tutoiement : à confirmer par Morgane.

## 2026-09-28 — Textes des pages (copywriting)

**Décisions**
- Vouvoiement validé par Morgane.
- Textes écrits dans `docs/08-contenus/` : accueil, collections (Biscuits, Coffrets & cadeaux), atelier, FAQ (5 groupes, dont « Maison Sable existe-t-elle vraiment ? »), article « Sablé, galette ou palet ? », contact, étude de cas, éléments communs (bandeau, en-tête, pied de page, panier, recherche, 404, journal).
- Article : faits historiques vérifiés aux sources (Isidore Penven, Pont-Aven, fin du XIXᵉ siècle ; épaisseurs de 5 mm et de 1 à 1,5 cm ; au moins 20 % de beurre). L'affirmation sur la levure, non confirmée, a été retirée (description Google corrigée).
- Avis de l'accueil : 3 avis fictifs, signalés comme tels au-dessus, prénoms seuls, sans étoiles ni données structurées.
- Cohérence corrigée : l'équipe compte 3 personnes, Jeanne comprise. La date sur l'étiquette est une date « à consommer de préférence avant ».
- Réponses directes de 40 à 60 mots vérifiées ; aucune formule interdite ; « En savoir plus » remplacé par « Découvrir le projet ».

**Questions ouvertes**
- Méthode de fabrication `[FICTIF]` de la page atelier, description de Mokom Studio, mention de la plage des Estagnots → à valider par Morgane.
- Délai d'acheminement, emballage, date limite de Noël → étape checkout. Validité de la carte cadeau, mentions de l'étiquette → étape conformité. Résultats mesurés → après l'audit.

## 2026-09-28 — Planche de direction : retours de Morgane

- Planche de travail créée et ouverte dans le navigateur : `.impeccable/mocks/planche-direction.html`. Ce n'est pas le site, les illustrations sont des esquisses.
- **Ambiance validée.** Couleurs passées en **pastels plus doux et chaleureux** à la demande de Morgane : sable rosé, papier, lagune pastel, beurre, rose crevette, sauge, corail doux. Le texte reste en encre prune foncée, et tous les contrastes du texte sont vérifiés (au moins 4,9:1). Le corail doux ressort peu sur le fond (1,6:1) : les boutons ont donc un bord émaillé plus foncé.
- **Titres : Big Shoulders Display** (choix B de Morgane). Relief : Big Shoulders Inline Display. Texte : Figtree.
- Mis à jour : `07-direction-artistique.md` (couleurs, typographie), contrat de direction (`.impeccable/surfaces/index-html.md`).
- Détecteur de design : marges intérieures corrigées. Deux exceptions limitées à la planche (espacement des lettres en relief, étiquette posée sur le couvercle). Les scènes en formes géométriques simples devront devenir de vraies illustrations au développement.

## 2026-09-28 — Conversion et mesure

**Décisions**
- Morgane garde le fond sable rosé.
- Revue CRO de chaque gabarit, avant développement : aucun point bloquant. Points à corriger : emballage et délai d'acheminement (objection n°1 d'un cadeau), date limite de Noël → étape checkout ; validité de la carte cadeau → étape conformité.
- Téléphone de fiction affiché mais pas cliquable (un lien d'appel aboutirait à un numéro qui ne sonne nulle part).
- Mesure : « démontrer sans collecter ». 15 événements au format GA4 recommandé, ajoutés à `window.dataLayer` sans aucun envoi, et aucun outil chargé, donc pas de bandeau cookies. La conversion réelle du portfolio est `mokom_case_study_click`.
- Documenté pour une vraie boutique : Consent Mode v2 en mode basique, application Google & YouTube ou GTM (jamais les deux), Search Console, Bing, Merchant Center.
- Pas de tests A/B (aucun trafic).
