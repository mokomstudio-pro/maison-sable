# Maison Sable — projet Mokom Studio

## Qui parle à Claude
Morgane (Mokom Studio), webdesigner, pas développeuse. Explications en langage clair, sans jargon (dire « bouton d'action » plutôt que CTA, « tunnel de commande » plutôt que checkout, « vente complémentaire » plutôt que cross-sell…) ; une étape à la fois ; propose ta meilleure option plutôt que de poser plusieurs questions. Quand tu dois lancer une commande, lance-la toi-même.

## Méthode
Ce projet suit la méthode Mokom (plugin `mokom`). L'état d'avancement est dans `.mokom/etat.json`.
- Continuer : `/mokom:etape` · Auditer : `/mokom:audit` · Relancer le cadrage : skill `mokom-discovery`.
- Chaque étape lit les livrables des étapes précédentes et se termine par sa checklist de sortie.

## Sources de vérité (dans cet ordre en cas de conflit)
1. Ce fichier CLAUDE.md et les décisions notées dans `docs/journal.md`
2. `DESIGN.md` (direction artistique du client) et `PRODUCT.md` (vérité produit)
3. `docs/fiche-entite.md` (tous les faits sur le client : nom, adresse, horaires, chiffres). Aucun fait hors de cette fiche.
4. Les skills Mokom, puis les skills spécialisées (claude-seo-ai, impeccable, frontend-design, web-quality…)

## Fiche projet
- Type : e-commerce (maquette de portfolio) · Plateforme : HTML/CSS statique « façon Shopify » · Hébergement : GitHub Pages · Domaine : `[À COMPLÉTER : compte GitHub]`.github.io
- Action n°1 : ajouter au panier → commander (coffrets cadeaux en priorité)
- Langue : fr-FR

## Particularités de ce projet
- **Marque fictive** : l'exception à « jamais de fait inventé » est autorisée ici pour les contenus de marque (produits, prix, histoire, avis), à condition de les consigner dans `docs/fiche-entite.md` comme `[FICTIF]` et d'afficher sur le site la mention « Projet fictif — étude de cas Mokom Studio ». Les faits sur le monde réel (Hossegor, Landes, réglementation) restent exacts.
- **Pas de vrai Shopify** : pages statiques qui reproduisent les gabarits Shopify (accueil, collection, fiche produit, panier, tunnel simulé). Garder des structures de données et de pages transposables en thème Liquid. Les étapes « checkout » et « analytics » de la chaîne sont réalisées en version maquette (aucun paiement, aucun traceur réel, pas de Merchant Center).
- GitHub Pages sert le site depuis un sous-dossier : utiliser des chemins relatifs ou tenir compte du préfixe `/maison-sable/`.
- **Indexation (validé par Morgane le 2026-09-27)** : la version publiée sur GitHub Pages est entièrement en `noindex` (une fausse biscuiterie ne doit pas apparaître dans Google). Tout le SEO est quand même réalisé dans le code. Pour lever le `noindex`, modifier cette ligne et la décision B de `docs/05-architecture.md`.
- Le plugin `claude-seo-ai` reste **actif** : aucun geste Shopify/WordPress n'est bloqué sur un site statique.

## Règles non négociables
- Jamais de fait inventé sur le monde réel : `[À COMPLÉTER]` à la place. Contenus de marque inventés : toujours marqués `[FICTIF]`.
- Un seul `h1` par page ; `title` et meta description uniques ; URLs courtes en minuscules avec tirets.
- Contenu principal présent dans le HTML servi (pas seulement après JavaScript).
- Core Web Vitals visés (mobile, 75e percentile) : LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1.
- Accessibilité WCAG 2.2 AA ; transitions d'interface en `transform`/`opacity` (effets plus riches seulement pour le moment signature, mesurés) ; `prefers-reduced-motion` respecté.
- Allergènes indiqués sur chaque fiche produit.
- Avant toute mise en ligne : `/mokom:audit` (un garde-fou le rappelle automatiquement).
- Chaque changement notable : entrée datée dans `docs/journal.md` + commit clair (feat, fix, style, seo, content, perf, chore).
