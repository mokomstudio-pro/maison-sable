# Conformité — Maison Sable

> Étape « conformité » · 2026-09-28 · Référence : `mokom-ecommerce/references/conformite-france.md`.
> **Repères de conception, pas un avis juridique.** Pour une vraie boutique : CGV et parcours de rétractation validés par un professionnel du droit, règles vérifiées à la date de mise en ligne.
> Textes : [`08-contenus/legal/`](08-contenus/legal/).

## 1. Principe propre à la maquette
La boutique est fictive, mais le site est **réellement publié** par Mokom Studio. Donc :
- les **mentions légales** désignent l'éditeur réel (Mokom Studio) et l'hébergeur réel (GitHub Pages) ;
- les **CGV** sont un **modèle de démonstration**, annoncé comme « sans valeur contractuelle » ;
- la **confidentialité** décrit la réalité : aucune donnée collectée, aucun cookie, le panier est gardé dans le navigateur (stockage nécessaire au service, exempté de consentement), et les polices sont hébergées sur le site.

## 2. Décisions

| Sujet | Décision | Où |
|---|---|---|
| Droit de rétractation | 14 jours après réception ; **exclus une fois ouverts** : sachets, boîtes et coffrets (hygiène et protection de la santé, art. L221-28 du Code de la consommation). Les biscuits se conservent de 45 à 90 jours : on ne s'appuie pas sur l'exception « denrées périssables », moins sûre ici. | CGV §7, page Retours |
| Rétractation en ligne (depuis le 19/06/2026) | Bouton **« Renoncer au contrat ici »** en pied de page, page `/pages/retractation` sans connexion, étape de confirmation, accusé de réception horodaté (simulé) | pied de page, `/pages/retractation` |
| Carte cadeau | **valable 1 an**, utilisable en plusieurs fois, annulable sous 14 jours si non utilisée `[FICTIF]` | CGV §9, fiche, FAQ |
| Bouton de commande | maquette : « Valider la commande fictive » (aucun paiement). Vraie boutique : **« Commande avec obligation de paiement »**. Lien vers les CGV juste au-dessus du bouton. | commande |
| Information alimentaire (règlement INCO) | Sur chaque fiche, **avant l'achat** : dénomination, ingrédients avec allergènes en gras, quantité nette, durée et conditions de conservation, **déclaration nutritionnelle**, nom de l'exploitant (« Maison Sable, Hossegor, adresse fictive »). | gabarit fiche |
| Déclaration nutritionnelle | **Affichée**. L'exemption des petits producteurs artisanaux vise la vente directe en faibles quantités et au niveau local, ce qui ne couvre pas clairement une vente en ligne dans toute la France. Valeurs d'exemple `[FICTIF]` dans `catalogue/nutrition.json`, contrôlées (cohérence énergie et nutriments). | fiche |
| Date sur l'étiquette | « À consommer de préférence avant » (date de durabilité minimale), pas « date limite de consommation » (réservée aux denrées très périssables). | fiche, page atelier |
| Prix au kilo | Affiché sur chaque fiche et pour chaque poids (calculé depuis le catalogue). | fiche |
| Prix barrés | Aucun. Règle écrite : le prix de référence est le plus bas des 30 derniers jours. | merchandising |
| Avis | Avis **fictifs**, signalés comme tels, « aucun contrôle » indiqué, pas d'étoiles ni de données structurées. | accueil, CGV §10 |
| Sécurité des produits (GPSR) | **Ne s'applique pas** aux denrées alimentaires, qui relèvent du règlement INCO (ci-dessus). | — |
| Garanties légales | Mentionnées ; l'encadré réglementaire (décret n° 2022-946) est à reproduire mot pour mot dans une vraie boutique. | CGV §8 |
| Médiateur | À désigner par un vrai vendeur (pas de nom inventé : ce serait associer un vrai médiateur à une fiction). | CGV §11 |
| Cookies | Aucun cookie, aucun traceur : **pas de bandeau**. | confidentialité |
| Accessibilité (EAA) | Une entreprise de 3 personnes serait exemptée (micro-entreprise). Mokom vise quand même WCAG 2.2 AA, et l'état de conformité est publié dans les mentions légales après l'audit. | mentions légales |

## 3. Pages et liens
- Pied de page, colonne « Informations légales » : Mentions légales · CGV · Confidentialité · **Renoncer au contrat ici**.
- Colonne « Aide » : Livraison (`/policies/shipping-policy`) · Retours et rétractation (`/policies/refund-policy`).
- Commande : lien « Conditions générales de vente (exemple) » au-dessus du bouton final ; liens Livraison et Retours dans le récapitulatif.
- Nouvelle page `/pages/retractation` (`noindex`, absente du plan du site).

## À compléter par Morgane (éditeur réel)
- Forme juridique, nom, adresse, SIREN, TVA, e-mail de Mokom Studio, directrice de la publication.
- Adresse de GitHub, Inc. à vérifier à la mise en ligne.

## Porte de sortie
- [x] Pages légales rédigées et liées depuis le pied de page et la commande.
- [x] Rétractation : information, exclusion des produits ouverts, bouton en ligne sans connexion, confirmation, accusé de réception (simulé). Formulaire type : à reproduire pour une vraie boutique.
- [x] GPSR : non applicable (denrées alimentaires) ; informations INCO prévues sur chaque fiche.
- [x] Prix barrés : aucun, règle des 30 jours écrite.
- [x] Mentions alimentaires sur les fiches : allergènes, nutrition, conservation, exploitant, prix au kilo.
- [ ] Informations de l'éditeur réel → **à fournir par Morgane**.
