# Panier et commande simulée — Maison Sable

> Étape « checkout » · 2026-09-28 · Référence : `mokom-ecommerce/references/panier-checkout.md` · Zoning : `06-ux.md` · Textes : [`08-contenus/commande.md`](08-contenus/commande.md) · Règles chiffrées : [`catalogue/livraison.json`](catalogue/livraison.json).
> Toutes les règles de livraison sont **inventées** `[FICTIF]` (marque fictive) mais **cohérentes et calculées**. Elles sont à valider par Morgane.

## 1. Décisions de livraison `[FICTIF]`

| Mode | Prix | Offert dès 45 € | Délai affiché | Particularité |
|---|---|---|---|---|
| Livraison à domicile | 5,90 € | oui | préparation 1 à 2 jours ouvrés + acheminement 2 à 3 jours ouvrés | — |
| Point relais | 4,50 € | oui | préparation 1 à 2 j + acheminement 3 à 4 j ouvrés | téléphone demandé (le relais prévient par SMS), avec la raison affichée |
| Retrait à l'atelier d'Hossegor | gratuit | — | prêt le jour ouvré suivant | horaires du mardi au samedi |
| Carte cadeau | — | — | envoyée par e-mail à la date choisie | aucun frais |

- **Heure limite** : une commande passée après midi est traitée le jour ouvré suivant.
- **Date affichée en clair** : « Livré entre le jeudi 1ᵉʳ et le lundi 5 octobre », calculée à partir de la date du jour (jours ouvrés du lundi au vendredi). Sur la fiche produit, dans le panier et à l'étape livraison.
- **Seuil de livraison offerte : 45 € confirmé** (valable pour le domicile et le point relais).
- Pas de noms de transporteurs réels (on n'engage pas des entreprises réelles dans une fiction).

## 2. Emballage et casse (l'objection n°1 d'un cadeau) `[FICTIF]`
- Les sachets refermables sont **calés** dans une boîte en carton, avec du papier froissé recyclé. La Boîte Grande Plage (en fer) et les coffrets voyagent dans leur propre emballage, suremballés.
- **Engagement** : si des biscuits arrivent cassés, une photo envoyée sous 48 heures suffit, et Maison Sable renvoie les biscuits.
- **Colis cadeau** : aucun prix n'apparaît dans le colis quand l'adresse de livraison est différente de celle de l'acheteur. Le message cadeau est imprimé sur une carte.

## 3. Noël 2026 `[FICTIF]`
Bloc visible du 1ᵉʳ octobre au 24 décembre (collection Coffrets & cadeaux, FAQ, fiches des coffrets, panier).

| Mode | Commander au plus tard | Calcul |
|---|---|---|
| Point relais | **mardi 15 décembre, midi** | préparation jusqu'au jeudi 17 + 4 jours ouvrés d'acheminement = mercredi 23 |
| Domicile | **jeudi 17 décembre, midi** | préparation jusqu'au lundi 21 + 3 jours ouvrés = jeudi 24 |
| Retrait à l'atelier | **mardi 22 décembre, midi** | prêt le mercredi 23 ; ouverture exceptionnelle le jeudi 24 décembre de 10 h à 13 h |
| Carte cadeau | jusqu'au 24 décembre (et après) | envoi par e-mail à la date choisie |

## 4. Panier (tiroir et page `/cart`)
Conforme à la référence Mokom et à `06-ux.md` :
- [x] Tiroir latéral après l'ajout, avec un lien vers la page panier complète.
- [x] Image, nom, variante, message cadeau modifiable, quantité modifiable, suppression, prix unitaire et total.
- [x] **Livraison estimée** (« à partir de 4,50 € », ou « offerte ») et **date estimée**, avant de commander.
- [x] Jauge vers la livraison offerte, montant restant écrit en toutes lettres.
- [x] Une seule suggestion complémentaire (règles de `merchandising.json`).
- [x] Pas de champ « code promo » : aucun code n'existe ; un champ vide inviterait à chercher un code ailleurs et à quitter la boutique. La carte cadeau se saisit à l'étape de paiement.
- [x] Pas de paiements express (Apple Pay…) dans la maquette : ils seraient trompeurs. Un encadré les mentionne à l'étape paiement.
- [x] Réassurance sous le bouton : « Commande fictive : aucun paiement ne sera demandé. »
- [x] Panier mémorisé dans le navigateur (per-appareil, pas de compte).

## 5. Commande simulée (`/checkout`, une page, 3 sections)
- **Sans compte**, et aucune création de compte proposée ensuite (rien n'est enregistré).
- **Coordonnées** : e-mail, prénom et nom séparés, adresse, complément, code postal (clavier numérique), ville. Case « Livrer à une autre adresse » pour les cadeaux, qui ouvre les mêmes champs pour la personne destinataire. Tous les champs ont l'`autocomplete` adapté (`email`, `given-name`, `family-name`, `address-line1`, `address-line2`, `postal-code`, `address-level2`, `tel`).
- **Livraison** : 3 modes en boutons radio, avec prix et date estimée. Le téléphone apparaît seulement pour le point relais, avec sa raison. Point relais : liste de 3 relais fictifs à Hossegor et Seignosse, pas de carte.
- **Paiement** : **aucun champ de carte**. Encadré « Paiement simulé » + champ « Carte cadeau » (facultatif, accepte le code d'exemple `SABLE-DEMO-20`, qui déduit 20 €) + bouton « Valider la commande fictive ».
- **Récapitulatif** toujours visible : ordinateur en colonne à droite, mobile replié en haut avec le total visible. Sous-total, livraison, carte cadeau, **total**. Aucun frais n'apparaît après la section livraison.
- **Erreurs** : à côté du champ, sans effacer la saisie, plus un résumé en haut avec des liens vers les champs. Le code postal doit compter 5 chiffres ; les codes commençant par 97 ou 98 (outre-mer, non livré) sont refusés avec un message explicite.
- **Confirmation** : numéro de commande fictif (`MS-` + horodatage), récapitulatif, date de livraison estimée ou horaires de retrait, « Et maintenant ? » (étude de cas + retour à la boutique). Panier vidé. Événement `purchase` envoyé une seule fois (voir `09-cro-mesure.md`).
- Aucune donnée ne quitte le navigateur. Les données saisies sont effacées à la confirmation.

## 6. Pour une vraie boutique Shopify (documenté pour l'étude de cas)
- Le tunnel de commande est celui de Shopify : personnalisation par l'éditeur de checkout (logo, couleurs, polices), extensions seulement sur les pages de remerciement et de suivi (hors Shopify Plus).
- Activer Shop Pay, Apple Pay, Google Pay, PayPal ; carte via Shopify Payments (3-D Secure).
- Tarifs d'expédition par zone et par poids (le catalogue fournit `poids_expedition_g`), retrait en magasin (point de vente « Atelier Hossegor »), points relais via une application justifiée (fonction, poids, coût).
- Relance de panier abandonné par e-mail, avec consentement.
- Commande test réelle + remboursement avant la mise en ligne.

## Porte de sortie
- [x] Frais et délais connus avant la commande (fiche produit, panier, étape livraison).
- [x] Commande sans compte ; saisie assistée (`autocomplete`, claviers adaptés). Paiements express : mentionnés mais non simulés (honnêteté de la maquette).
- [ ] Parcours complet testé sur mobile → après le développement.
- [ ] Événements du tunnel vérifiés (console, aucun envoi) → après le développement.
