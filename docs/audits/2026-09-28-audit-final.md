# Audit final — Maison Sable — 2026-09-28

**Verdict : PAS PRÊT** — 4 bloquants, dont 3 corrigeables en moins d'une heure et 1 qui dépend des informations de Morgane (mentions légales).

**Scores** : SEO 45/100 · Visibilité IA 48/100 (claude-seo-ai, en aperçu local — bas à cause du `noindex` voulu et de l'adresse de production pas encore en ligne, voir `partiels/seo-ai.md`) · Lighthouse mobile : performance 90–100 (78 sur la commande panier vide) / accessibilité 100 / bonnes pratiques 100 / SEO 58–61 (noindex voulu) · Design : critique 25/36, audit technique 13/20.

Cible : http://localhost:4321/maison-sable/ (aperçu local du futur https://mokomstudio-pro.github.io/maison-sable/). Gabarits : accueil, 2 collections, produit à formats (Sablé Dune), produit simple (Croquant Lagune), carte cadeau, panier, commande, recherche, 404, atelier, FAQ, contact, article, rétractation, mentions légales. **Non auditable** : produit en rupture (aucun au catalogue ; code lu seulement).

Auditeurs indépendants : claude-seo-ai (4 spécialistes + 2 analyses GEO), impeccable (critique + audit, 2 évaluations isolées), mokom-auditeur-seo-geo, -ux-ui, -cro, -ecommerce, puis -performance seul. Rapports partiels : `docs/audits/partiels/`.

## Bloquants (à corriger avant publication)
| # | Domaine | Page | Constat | Preuve | Correction | Effort |
|---|---|---|---|---|---|---|
| B1 | Accessibilité / achat | Accueil (plateau des coffrets), collection Coffrets | Menu de choix du format (Carte cadeau, Boîte Grande Plage) : texte crème sur fond crème, **invisible** (1:1 ; 1,9:1 à l'option active) ; le menu de la dernière carte sort de l'écran en 390 px | `.plateau { color: var(--carte) }` css l.522 hérité par `.choix-rapide` (`button { color: inherit }` l.40) ; mesure DevTools rgb(251,244,232) sur rgb(251,244,232) ; capture `audit-ux/accueil-390-choix-rapide.png` — relevé par 3 auditeurs | `.plateau .choix-rapides { color: var(--encre) }` + menu ancré à droite sur la dernière colonne | S |
| B2 | Accessibilité | Accueil (plateau), pied de page, bandeau « fictif » | Contour de focus caramel foncé invisible sur fond sombre (1,21:1 sur cannelle, 2,16:1 sur encre) — WCAG 2.4.7 / 1.4.11, sur le parcours coffrets | `:focus-visible { outline: 3px solid var(--lien) }` css l.39 ; capture `audit-ux/focus-plateau-1440.png` | contour crème/miel dans `.plateau`, `.pied`, `.bandeau-fiction` | S |
| B3 | Contenu | /products/carte-cadeau | Marqueur de travail `[FICTIF]` affiché tel quel dans 2 réponses de FAQ | `grep -c "\[FICTIF\]" dist/products/carte-cadeau/index.html` → 2 ; source `docs/08-contenus/fiches-produits.md:263-264` | retirer les marqueurs à la génération + contrôle dans `npm run check` | S |
| B4 | Légal | /policies/legal-notice | Éditeur réel (Mokom Studio) incomplet : forme juridique, nom, adresse, SIREN, TVA, e-mail, directrice de publication `[À COMPLÉTER]` (LCEN art. 6) | `src/pages/pages.mjs:177` | **informations à fournir par Morgane** | S |

## Importants (à corriger sous 2 semaines — recommandé avant publication)
| # | Domaine | Constat | Preuve | Correction |
|---|---|---|---|---|
| I1 | SEO / technique | Adresses sans « / » final alors que chaque page est un dossier : GitHub Pages répondra par une **redirection 301** sur chaque lien interne, canonique, `og:url`, plan du site | `src/config.mjs` `absolue()`, `src/build.mjs:79` ; serveur local qui masque le problème (`src/serve.mjs:18`) — 3 auditeurs | adresses avec « / » final + serveur local qui redirige comme GitHub Pages |
| I2 | Accessibilité | À la fermeture d'un tiroir (menu, panier, recherche), le focus tombe sur la page au lieu de revenir au bouton d'ouverture (2.4.3) — contredit `accessibilite.md` §3 | `boutique.js:153` `d.addEventListener("close", () => document.activeElement?.blur?.())` | supprimer ce `blur` |
| I3 | Commande | Résumé d'erreurs : « 6 champs » pour 7 erreurs (mode de livraison oublié) ; erreurs qui restent affichées après correction ou « Remplir avec un exemple » | `boutique.js:414-416` ; capture `checkout-390-exemple-erreurs-restees.png` | inclure le mode de livraison ; revalider à la sortie du champ |
| I4 | Commande | Adresse postale exigée pour une carte cadeau seule ou un retrait à l'atelier | `pages.mjs` `adresse("k")` toujours obligatoire | masquer/dispenser l'adresse dans ces 2 cas |
| I5 | Commande | Tunnel avec menu, recherche, pied de page et lettre d'information (sorties en pleine commande) ; 3 encarts « fictif » avant le 1ᵉʳ champ en mobile (782 px) | `dist/checkout/index.html` : 2 `<nav>`, `form.lettre` | tunnel allégé : logo + « Retour au panier » + liens légaux ; un seul encart |
| I6 | Commande / perf | Commande avec panier vide : **CLS 0,52** (le formulaire est remplacé tard par « panier vide ») | Lighthouse passe 2 ; `boutique.js:367-371` | lire le panier avant le catalogue |
| I7 | Contenu / allergies | Étiquette « Amandes & pignons » sur le Sablé Pignada, qui ne contient pas d'amandes | `docs/catalogue/produits.csv:4` | familles de saveur distinctes (ex. « Pignons & miel », « Amandes & orange ») |
| I8 | Carte cadeau | E-mail du destinataire et date d'envoi ni obligatoires ni vérifiés (date passée possible), non rappelés au panier | `produit.mjs:46-47`, `boutique.js:95` | `required`, `min` = aujourd'hui, rappel au panier |
| I9 | Recherche | Pluriels sans résultat : « sablés », « palets », « biscuits », « coffrets » → 0 | fonction `chercher()` rejouée sur `catalogue.json` ; `boutique.js:294-300` | retirer le s/x final avant de comparer |
| I10 | Légal | Formulaire de rétractation sans nom ni choix des produits (« une partie ») | `pages.mjs` `retractation()` | ajouter « Nom » et « Produits concernés » ; faire confirmer le libellé du bouton |
| I11 | Légal | Coffrets : ingrédients et valeurs nutritionnelles seulement par renvoi aux fiches recettes (INCO art. 14, à confirmer) | `dist/products/coffret-decouverte` | bloc repliable par recette sur chaque coffret |
| I12 | Accessibilité | « Réduire les animations » ignoré pour l'en-tête au défilement, le panneau de filtres, la barre d'achat, la jauge | css l.64, 220, 293, 375 | bloc global `prefers-reduced-motion` |
| I13 | Accessibilité | Panneau de filtres mobile sans `role="dialog"`, `aria-modal` ni nom | mesure arbre d'accessibilité | ajouter les attributs |
| I14 | Performance | Image principale de l'accueil téléchargée en priorité basse : LCP médian **2,55 s** (cible 2,5) ; fiche produit 2,6 s (Lighthouse) | trace LCPDiscovery ; `accueil.mjs:83` ; délai d'affichage 82 % sur la fiche | `fetchpriority="high"` sur le préchargement ; retirer `decoding="async"` de la photo principale de fiche |
| I15 | Performance | Vignettes du panier en 800 px chargées sur toutes les pages ; images « au survol » téléchargées sur téléphone (155 Ko) | `build.mjs:66`, `composants.mjs:58` | vignette 160–480 px ; images de survol chargées au besoin |
| I16 | Direction artistique | Photos qui contredisent les produits : cookies américains en ouverture, Écume = cookie à l'orange, Vague = cookies chocolat, Découverte = vermicelles | captures `accueil-1440.png`, `404-390.png` ; `docs/catalogue/photos.json` | choisir des photos de sablés/palets fidèles (validation de Morgane) |

## Améliorations
- **Données structurées** : `@id`/`url` sur Product/ProductGroup/Article, `manufacturer`/`seller` → `#organisation` ; image et marque sur chaque variante ; un seul éditeur (Maison Sable ou Mokom Studio) ; `MerchantReturnPolicy` (14 jours) ; seuil 45 € ; zone « France métropolitaine » ; `sku` par offre sur la carte cadeau ; `BlogPosting` + `Blog`, `AboutPage` (facultatif).
- **SEO** : canonique à retirer sur la 404 ; prévoir panier/recherche/commande sans canonique ; `lastmod` réel ; image de partage par produit et `partage.png` allégé (841 Ko → ~150 Ko).
- **Contenus** : étude de cas — section « Les résultats mesurés » à remplir avec les mesures datées de cet audit ; signature réelle ; dates de Noël sans année (ajouter 2026) ; intertitre « Et chez Maison Sable ? » ; « l'une des plus connues de Bretagne » sans source ; « choisir le taille » (lecteurs d'écran) ; « de 20,00 € » → « de 20 à 60 € » ; panier vide annoncé « Panier, article(s) ».
- **Panier / mesure** : jauge de livraison masquée si carte cadeau seule ; règle « carte cadeau et seuil de 45 € » à trancher ; `item_id` = SKU partout ; `value` hors port dans `add_payment_info` ; code carte cadeau dans `purchase` ; livraison codée en dur en 3 endroits ; jours fériés ignorés dans les dates ; variante en rupture encore ajoutable.
- **Design** : dette de cascade CSS (règles surchargées jusqu'à 5 fois — cause du B1) ; couleurs hors variables ; univers « boîte » absent hors accueil ; colonnes centrées sous des titres à gauche (panier, recherche, 404) ; pastilles 10,5 px ; allergène Lagune loin sous le bouton ; `dist/assets/maison-sable.css` publié inutilement ; photos 800 px lourdes (185–260 Ko) ; police à relief arrivée après la fin de l'animation en 4G lente.

## Ce qui est bien (à conserver)
- **Aucun traceur**, aucun script tiers ; 15 événements GA4 dans `dataLayer` seulement ; `purchase` unique.
- **Poids tenu** : accueil 380–726 Ko (budget 1,5 Mo), JS 11 Ko, polices 68 Ko ; CLS ≤ 0,04 (hors I6) ; ajout au panier 88–160 ms avec processeur ×4 ; couvercle animé en `transform`, une fois, coupé en « réduire les animations ».
- **Lighthouse accessibilité et bonnes pratiques 100** sur les 5 gabarits mesurés ; lien d'évitement, dialogues natifs, résumé d'erreurs focalisé, annonce vocale de l'ajout, cibles 44 px.
- **SEO technique** : 1 h1 par page, titres uniques, contenu et JSON-LD dans le HTML servi, aucun lien cassé, vraie 404, `ProductGroup` + `hasVariant`, prix identiques page / données / flux, filtres non indexables, avis fictifs non balisés.
- **Fiche produit exemplaire** : allergènes en gras + « Contient », tableau format/poids/prix au kilo, nutrition signalée « valeurs d'exemple », dates de livraison calculées, barre d'achat mobile.
- **Textes** : réponse d'abord, faits précis, article sourcé (CNIEL vérifié), fiction signalée sur les 31 pages sans lourdeur, typographie française correcte.
- **Conformité** : rétractation 14 j + exception produits ouverts, bouton de rétractation en ligne, frais annoncés avant le tunnel, pas de prix barrés, commande sans compte.

## Données non vérifiables sans le client ([À COMPLÉTER])
- Mentions légales de Mokom Studio (forme juridique, nom, adresse, SIREN, TVA, e-mail, directrice de publication) et signature réelle de l'étude de cas.
- Règle « la carte cadeau compte-t-elle dans le seuil de livraison offerte ? » (fait de marque fictif à décider).
- Libellé exact du bouton de rétractation dans le texte français de transposition de la directive 2023/2673.
- Mesures de visiteurs réels (CrUX) : inexistantes tant que le site est en `noindex` sans outil de mesure.
- Test avec un vrai lecteur d'écran (NVDA / VoiceOver).

## Après la mise en ligne
Relancer `/claude-seo-ai:audit` sur l'adresse GitHub (redirections, image de partage, en-têtes, robots) ; ne pas déclarer le plan du site dans la Search Console tant que le `noindex` reste ; vérifier le type servi pour les WebP.

---

## Contre-audit après corrections — 2026-09-28

**Nouveau verdict : PRÊT AVEC RÉSERVES** — les 4 bloquants sont levés, vérifiés par des auditeurs indépendants (UX/UI et performance relancés ; contrôles SEO automatiques).

| Bloquant | État | Preuve |
|---|---|---|
| B1 Choix rapide illisible | **corrigé** | texte encre sur crème 13,5:1 ; menu dans l'écran en 390 et 1440 px (contre-audit UX) |
| B2 Focus invisible sur fonds foncés | **corrigé** | contour miel 4,29:1 sur cannelle, 7,64:1 sur encre |
| B3 `[FICTIF]` visible | **corrigé** | marqueurs retirés à la génération + contrôle automatique dans `verifier-seo.mjs` (31 pages) |
| B4 Mentions légales | **corrigé** | éditeur : Mokom Studio, Morgane Dulaut (micro-entreprise), adresse, SIRET, e-mail, directrice de publication ; déclaration d'accessibilité « partiellement conforme » |

Points importants corrigés : I1 « / » final (liens, canoniques, plan du site ; l'aperçu local redirige comme GitHub Pages), I2 focus rendu, I3 résumé d'erreurs complet et mis à jour, I4 adresse inutile masquée, I5 tunnel allégé, I6 CLS commande vide 0,52 → 0,00, I7 saveur « Fruits secs », I8 carte cadeau vérifiée, I9 recherche au pluriel (+ tri par nom), I10 rétractation (nom, produits), I11 coffrets (ingrédients et nutrition par recette), I12 animations réduites, I13 filtres annoncés comme fenêtre, I14 photo d'accueil prioritaire (LCP 2,55 → 2,35 s), I15 vignettes 480 px et images de survol non chargées sur mobile. Aussi : données structurées reliées (`@id`, fabricant, vendeur, image par format, politique de retour, éditeur unique Mokom Studio), 404 sans canonique, jours fériés, image de partage 841 → 100 Ko, dates de Noël avec l'année, résultats mesurés publiés dans l'étude de cas.

**Mesures après corrections** (traces, 390 px, 4G lente, CPU ×4) : accueil 2,35 s · collection 1,94 s · fiche 2,28 s · panier 1,45 s · commande 1,52 s ; CLS ≤ 0,04 ; ajout au panier 184 ms ; Lighthouse perf 91–100, a11y 100, bonnes pratiques 100.

### Réserves (non bloquantes)
- **I16 Photos** : plusieurs photos montrent des cookies plutôt que des sablés — nouvelles photos à choisir avec Morgane.
- Lighthouse (téléphone plus lent simulé) : photo principale à 3,0 s (accueil) et 2,86 s (fiche) → ajouter une taille d'image intermédiaire (560–640 px) ; vignettes 160/240 px.
- Démarrage du script : lecture de défilement retirée (corrigé après la mesure, non remesuré).
- N° de TVA intracommunautaire de Mokom Studio : à ajouter seulement si assujettie.
- Test avec un vrai lecteur d'écran ; dette de cascade CSS ; `item_id` des listes (identifiant produit, choix documenté) ; livraison codée en dur à 3 endroits.
