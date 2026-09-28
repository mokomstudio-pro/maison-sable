# Conversion et mesure — Maison Sable

> Étape « cro » · 2026-09-28 · Entrées : `01-brief.md` (action n°1 : ajouter au panier → commander, coffrets d'abord), `06-ux.md`, `08-contenus/`, `catalogue/merchandising.md`.
> Revue **avant développement**, faite sur les zonings et les textes. Elle sera **refaite sur les pages construites** (étape audit).
> Légende : ✅ OK · 🟠 À corriger · 🔴 Bloquant. Les points notés « client réel » ne concernent pas la maquette, mais seraient à traiter pour une vraie boutique : ils montrent la méthode dans l'étude de cas.

## 1. Revue par gabarit

### Accueil
| Critère | Statut | Constat |
|---|---|---|
| Clarté en 5 s | ✅ | H1 « Biscuits artisanaux de bord de mer, faits à Hossegor » + définition + « Offrir un coffret » visibles sans défiler sur mobile (planche vérifiée). |
| Pertinence | ✅ | Tient la promesse des requêtes de marque et « biscuiterie bord de mer ». |
| Preuves | 🟠 client réel | Avis fictifs signalés comme tels. C'est honnête pour la maquette ; un vrai client aurait besoin d'avis vérifiés (plateforme tierce). Réassurance chiffrée présente (bloc 3). |
| Action | ✅ | Un bouton principal par écran (« Offrir un coffret »), lien secondaire vers les biscuits, ajout rapide sur les cartes. |
| Frictions | ✅ | Pas de fenêtre à l'arrivée, pas de carrousel. Couvercle animé une seule fois, contenu visible sans JavaScript. |
| Anxiété | ✅ | Prix « dès … », livraison dès 4,50 € / offerte dès 45 €, retrait gratuit : tout est visible avant le panier. |
| Après la conversion | — | Sans objet (voir panier et commande). |

### Collections (Biscuits, Coffrets & cadeaux)
| Critère | Statut | Constat |
|---|---|---|
| Clarté | ✅ | Introduction de 40 à 60 mots avec la fourchette de prix, toujours visible. |
| Pertinence | ✅ | « Coffret biscuits artisanaux » : l'introduction et le tableau comparatif répondent directement. |
| Preuves | ✅ | Tableau « Comment choisir son coffret ? » (contenu, poids, prix, pour qui) ; économie réelle de 1,40 € sur l'Été Indien. |
| Action | ✅ | « Ajouter » sur chaque carte, choix du poids sur place pour les produits à 2 formats. |
| Frictions | ✅ | Filtres limités (2 par collection), « Voir N produits » sur mobile, aucune page vide. |
| Anxiété | ✅ | Dates limites de Noël fixées (étape checkout). |

### Fiche produit
| Critère | Statut | Constat |
|---|---|---|
| Clarté | ✅ | Nom, prix, prix au kilo, poids, bouton et réassurance au-dessus de la ligne de flottaison mobile ; présentation « réponse d'abord ». |
| Preuves | ✅ | Pourcentages d'ingrédients, nombre de biscuits, durée de conservation, allergènes : faits précis et vérifiables. |
| Action | ✅ | « Ajouter au panier » + barre d'achat fixe sur mobile ; montée en gamme écrite sur le bouton (« 1,30 € de moins que 2 sachets »). |
| Frictions | ✅ | Choix du poids par boutons (pas de liste déroulante), message cadeau facultatif. |
| Anxiété | ✅ | Emballage calé, engagement « biscuits cassés renvoyés sur photo », date de livraison estimée affichée (étape checkout). |
| Allergies | ✅ | Allergènes en gras, toujours ouverts ; questions dédiées (pignons, coco, soja, amandes). |

### Panier (tiroir et page)
| Critère | Statut | Constat |
|---|---|---|
| Clarté | ✅ | Sous-total, livraison estimée, total avant « Commander ». |
| Action | ✅ | « Commander » unique ; une seule suggestion, seulement près du seuil. |
| Frictions | ✅ | Quantité et message modifiables sur place, panier mémorisé. |
| Anxiété | ✅ | « Commande fictive : aucun paiement » ; jauge de livraison offerte avec montant restant écrit. |
| Éthique | ✅ | Aucune case pré-cochée, aucun ajout automatique, aucun compte à rebours. |

### Commande simulée
| Critère | Statut | Constat |
|---|---|---|
| Clarté | ✅ | Textes rédigés (`08-contenus/commande.md`). |
| Frictions | ✅ | Sans compte, champs minimum, `autocomplete`, « Remplir avec un exemple », téléphone demandé seulement pour le point relais. |
| Anxiété | ✅ | Récapitulatif toujours visible, aucun frais après l'étape livraison, date de livraison estimée. |
| Après la conversion | ✅ | Page de confirmation « Et maintenant ? » avec lien vers l'étude de cas (conversion réelle du portfolio). E-mail de confirmation : sans objet (rien n'est envoyé). |

### L'atelier, FAQ, article
| Critère | Statut | Constat |
|---|---|---|
| Suite logique | ✅ | Chaque page se termine par un lien vers une collection (souvenir, cadeau, recette). |
| Anxiété | ✅ | Validité de la carte cadeau fixée (1 an, étape conformité). |
| Confiance | ✅ | Question « Maison Sable existe-t-elle vraiment ? » : la transparence devient un signal de sérieux pour le prospect. |

### Contact
| Critère | Statut | Constat |
|---|---|---|
| Frictions | ✅ | 4 champs, libellés visibles, erreurs avec exemple, délai de réponse annoncé. |
| Alternatives | ⚠️ décision | Téléphone de fiction (plage ARCEP) : **affiché mais pas cliquable**, car un lien d'appel mènerait à un numéro qui n'aboutit pas. Pour un vrai client : numéro cliquable sur mobile (`tel:`). |

## 2. Priorités (impact × facilité)

| # | Correction | Impact | Facilité | Où |
|---|---|---|---|---|
| 1 | Décider emballage + délai d'acheminement, et les afficher près du bouton, dans le panier et dans la FAQ | fort (objection n°1 du cadeau) | facile | étape checkout |
| 2 | Date limite de commande pour Noël (collection, FAQ, fiche coffret en saison) | fort en saison | facile | étape checkout |
| 3 | Validité de la carte cadeau | moyen | facile | étape conformité |
| 4 | Vérifier après le développement que le bouton principal reste visible sans défiler à 360 px, et que la barre fixe ne masque rien | fort | moyen | développement + audit |
| 5 | Client réel : avis vérifiés par un tiers, photos réelles en plus des illustrations | fort | dépend du client | hors maquette |

**Tests A/B** : aucun. Il n'y a pas de trafic réel ; les corrections suivent les bonnes pratiques et sont vérifiées à l'audit.

## 3. Plan de mesure

### Principe pour la maquette : démontrer sans collecter
La maquette **ne charge aucun outil de mesure** : ni Google Analytics, ni Google Tag Manager, ni pixel. Aucune donnée ne quitte le navigateur, donc **aucun bandeau cookies** n'est nécessaire (règle `CLAUDE.md` : aucun traceur réel).
Les événements sont quand même **codés** : ils sont ajoutés à une liste interne du navigateur (`window.dataLayer`), au format GA4 recommandé, sans aucun envoi. Un prospect ou un développeur peut les voir dans la console du navigateur. Cela montre qu'une vraie boutique serait prête à mesurer.

### Événements (format GA4 recommandé pour l'e-commerce)

| Événement | Déclencheur | Paramètres principaux | Page |
|---|---|---|---|
| `view_item_list` | affichage d'une grille de produits | `item_list_id` (`biscuits`, `coffrets-cadeaux`, `accueil-coffrets`, `accueil-recettes`, `vous-aimerez-aussi`), `items[]` | accueil, collections, fiches |
| `select_item` | clic sur une carte produit | `item_list_id`, `items[0]` | idem |
| `view_item` | affichage d'une fiche | `currency: EUR`, `value`, `items[0]` (`item_id` = SKU, `item_name`, `item_variant`, `item_category` = collection principale, `price`) | fiche |
| `add_to_cart` | « Ajouter au panier » / « Ajouter » | `currency`, `value`, `items[0]` + `quantity`, `item_list_id` si ajout rapide | fiche, cartes |
| `remove_from_cart` | « Retirer » ou quantité à 0 | idem | panier |
| `view_cart` | ouverture du tiroir ou de `/cart` | `currency`, `value`, `items[]` | panier |
| `begin_checkout` | « Commander » | `currency`, `value`, `items[]` | panier |
| `add_shipping_info` | choix de la livraison validé | `shipping_tier` (`domicile`, `point_relais`, `retrait_atelier`) | commande |
| `add_payment_info` | clic « Valider la commande fictive » | `payment_type: simulation` | commande |
| `purchase` | page de confirmation | `transaction_id` **unique** (`MS-` + horodatage), `value`, `shipping`, `currency`, `items[]` | confirmation |
| `search` | recherche validée | `search_term` | recherche |
| `sign_up` | inscription à la lettre d'information (simulée) | `method: newsletter` | pied de page |
| `generate_lead` | envoi du formulaire de contact (simulé) | `form: contact`, `subject` | contact |
| `select_promotion` | clic sur un bloc éditorial dans une grille ou sur le bloc Noël | `promotion_id`, `promotion_name` | collections |
| `mokom_case_study_click` | clic vers l'étude de cas ou vers mokomstudio.fr | `link_location` (bandeau, pied de page, confirmation, FAQ) | toutes |

Conventions : noms en `snake_case`, un seul envoi par action (pas de doublon au rechargement de la confirmation : `transaction_id` gardé en mémoire de session), `value` hors frais de port, `shipping` à part.

**Conversions** (pour une vraie boutique) : `purchase` (principale), `add_to_cart`, `begin_checkout`, `sign_up`. **Conversion réelle du portfolio** : `mokom_case_study_click`.

### Pour une vraie boutique Shopify (documenté pour l'étude de cas)
- **Consentement (CNIL)** : bandeau de la boutique (API de confidentialité Shopify), où refuser est aussi simple qu'accepter. **Consent Mode v2 en mode basique** : `ad_storage`, `analytics_storage`, `ad_user_data` et `ad_personalization` sont à `denied` par défaut, et aucune balise Google n'est chargée avant l'accord. Mokom refuse le mode « avancé ».
- **Outil** : l'application Google & YouTube (événements clients Shopify) **ou** Google Tag Manager, jamais les deux.
- **Toujours** : Google Search Console + Bing Webmaster Tools ; Google Merchant Center (flux produits) à l'étape analytics.
- **Vérification** : DebugView GA4, un test de chaque conversion, aucun doublon, aucune requête vers Google avant consentement.
- **Tableau de bord** : sessions organiques, taux de conversion mobile / ordinateur, conversions par page d'entrée, sorties du tunnel étape par étape, part des coffrets dans le chiffre d'affaires, panier moyen face au seuil de 45 €.

### Search Console / Bing pour la maquette
Sans objet : le site est en `noindex` (décision de Morgane). Si Mokom Studio veut mesurer l'intérêt des prospects, la mesure se fera **sur son propre site** (clics vers la maquette), pas dans la maquette.

## Porte de sortie
- [x] Revue CRO de chaque gabarit (avant développement) ; aucun point bloquant. 4 points « À corriger » reportés aux étapes checkout et conformité.
- [x] Plan de mesure écrit : événements, déclencheurs, paramètres, conversions, consentement (pour une vraie boutique), principe « démontrer sans collecter » pour la maquette.
- [ ] Après le développement : chaque événement vérifié dans la console, aucun envoi réseau vers un outil de mesure, revue CRO refaite sur les pages construites.

## 4. Test du plan de marquage (étape analytics, 2026-09-28)

Parcours réel dans Chrome (collection → fiche → panier → commande → confirmation → contact), lecture de `window.dataLayer` à chaque page :

| Événement | Déclencheur testé | Paramètres vérifiés | |
|---|---|---|---|
| `view_item_list` | grille de la collection visible | `item_list_id` = biscuits | ✅ |
| `select_item` | clic sur le nom d'un produit | produit + liste | ✅ |
| `select_promotion` | clic sur le bloc « Sablé, galette ou palet ? » | `promotion_id` = bloc-texture | ✅ |
| `view_item` | ouverture de la fiche Croquant Lagune | SKU, prix 8,90 | ✅ |
| `add_to_cart` | « Ajouter » sur une carte, choix rapide 300 g, « Ajouter au panier » | SKU, quantité, valeur | ✅ (après correction, voir ci-dessous) |
| `view_cart` | ouverture du tiroir | articles, valeur | ✅ |
| `remove_from_cart` | « Retirer » dans le tiroir | SKU, valeur | ✅ |
| `begin_checkout` | « Commander » | 2 articles, 22,40 € | ✅ |
| `add_shipping_info` | choix du mode de livraison | `shipping_tier` | ✅ |
| `add_payment_info` | « Valider la commande fictive » | `payment_type` = simulation | ✅ |
| `purchase` | confirmation | `transaction_id` unique (MS-AAAAMMJJ-hhmmss), valeur 22,40 € hors port, port 5,90 €, 2 articles | ✅ |
| `mokom_case_study_click` | « Découvrir la démarche » | `link_location` = confirmation | ✅ |
| `sign_up` | lettre d'information | `method` = newsletter | ✅ |
| `generate_lead` | formulaire de contact | `form`, `subject` | ✅ |
| `search` | recherche « caramel » | `search_term` | ✅ |

- **Aucun envoi réseau** : toutes les requêtes du parcours restent sur l'adresse du site (pages, photos, polices, script, catalogue). Aucun appel à Google Analytics, Google Tag Manager ni à un pixel publicitaire. Donc pas de bandeau cookies, conformément à la décision.
- **Défaut trouvé et corrigé pendant le test** : l'apostrophe du nom « Croquant Lagune aux amandes et zestes d'orange » coupait les données du bouton, et l'ajout au panier échouait sans message (carte et fiche). Les 253 données de boutons du site sont désormais écrites entre guillemets doubles et vérifiées automatiquement par `npm run check:seo`.
- **Google Merchant Center** : non ouvert (soumettre les produits d'une marque fictive serait trompeur). Un **flux d'exemple** est généré par `node scripts/flux-merchant.mjs` → `docs/catalogue/flux-merchant-exemple.xml` (16 articles, carte cadeau exclue) : titres « Marque + produit + variante », `identifier_exists` = no + référence, catégorie Google « Cookies », prix au kilo, livraison. Il n'est **pas publié** sur le site. Prix et disponibilité identiques à la page et au JSON-LD par construction (mêmes sources).
