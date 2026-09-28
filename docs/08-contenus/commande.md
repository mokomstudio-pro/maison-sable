# Commande simulée — textes

> URL `/checkout` (page en `noindex`) · Règles : `docs/10-panier-commande.md`, `docs/catalogue/livraison.json`.

## En-tête de la page
- Logo (lien vers l'accueil) · Lien : Retour au panier
- **H1** : Finaliser la commande
- **Encadré en haut** : Commande fictive : Maison Sable est une étude de cas. Aucun paiement n'est demandé, aucune donnée n'est envoyée ni enregistrée.
- **Bouton secondaire** : Remplir avec un exemple

## Récapitulatif (colonne ou volet replié)
- Titre : Votre commande · mobile replié : « Afficher le récapitulatif (N articles) · 38,40 € »
- Lignes : article, variante, quantité, prix ; « Message cadeau » si présent
- Sous-total · Livraison · Carte cadeau (− 20,00 €) · **Total**
- Jauge si sous le seuil : « Plus que 6,60 € pour la livraison offerte. [Compléter ma commande](/cart) »

## 1. Vos coordonnées (H2)
- E-mail · aide : « Pour vous envoyer la confirmation (simulée). »
- Prénom · Nom
- Adresse · Complément d'adresse (facultatif) · Code postal · Ville
- Pays : France métropolitaine (affiché, non modifiable)
- Case : Livrer à une autre adresse (idéal pour un cadeau)
  - Sous-titre : Adresse de la personne qui reçoit le colis
  - Prénom · Nom · Adresse · Complément · Code postal · Ville
  - Note : Aucun prix n'apparaît dans un colis envoyé à une autre adresse.

## 2. Livraison (H2)
- Livraison à domicile : 5,90 € (ou « Offerte ») · « Livré entre le [date min] et le [date max] »
- Point relais : 4,50 € (ou « Offert ») · « Disponible entre le [date min] et le [date max] »
  - Choix du relais : 3 relais d'exemple (fictifs) : « Relais du Lac, Hossegor » · « Relais des Pins, Hossegor » · « Relais de la Plage, Seignosse »
  - Téléphone portable · aide : « Le point relais vous prévient par SMS quand votre colis est arrivé. »
- Retrait à l'atelier d'Hossegor : Gratuit · « Prêt le [date], du mardi au samedi, 10 h – 13 h et 15 h – 19 h »
- Commande contenant seulement une carte cadeau : « Carte cadeau envoyée par e-mail à la date choisie : aucune livraison. »
- Rappel emballage (sous les modes) : « Vos biscuits voyagent calés dans une boîte en carton. S'ils arrivent cassés, envoyez-nous une photo sous 48 heures : nous les renvoyons. »

## 3. Paiement (H2)
- **Encadré** : Paiement simulé. Dans une vraie boutique Shopify, cette étape proposerait Shop Pay, Apple Pay, Google Pay, PayPal et la carte bancaire, avec une connexion sécurisée.
- Champ : Code de carte cadeau (facultatif) · bouton « Appliquer » · aide : « Pour essayer : SABLE-DEMO-20. »
  - Succès : « Carte cadeau appliquée : − 20,00 €. »
  - Erreur : « Ce code n'existe pas. Vérifiez-le ou essayez SABLE-DEMO-20. »
- Au-dessus du bouton : En validant, vous acceptez les [conditions générales de vente (exemple)](/policies/terms-of-service). Vraie boutique : le bouton s'intitulerait « Commande avec obligation de paiement ».
- **Bouton principal** : Valider la commande fictive
- Sous le bouton : Aucun paiement ne sera demandé.

## Erreurs de formulaire
- Résumé en haut : « 2 champs sont à corriger : » + liens vers chaque champ
- E-mail : « Indiquez une adresse e-mail valide, par exemple nom@exemple.fr. »
- Prénom / Nom : « Indiquez votre prénom. » / « Indiquez votre nom. »
- Adresse : « Indiquez le numéro et le nom de la rue. »
- Code postal : « Le code postal doit contenir 5 chiffres, par exemple 40150. »
- Ville : « Indiquez la ville. »
- Téléphone (relais) : « Indiquez un numéro de portable à 10 chiffres, par exemple 06 12 34 56 78. »
- Mode de livraison : « Choisissez un mode de livraison. »

## Confirmation
- **H1** : Merci, votre commande fictive est validée
- Texte : Commande n° MS-[horodatage]. Dans une vraie boutique, vous recevriez une confirmation par e-mail et un lien de suivi.
- Livraison : « Livraison prévue entre le [date min] et le [date max] à l'adresse indiquée. » · Retrait : « Votre commande sera prête le [date] à l'atelier d'Hossegor, du mardi au samedi, 10 h – 13 h et 15 h – 19 h. »
- Récapitulatif de la commande
- **H2** : Et maintenant ?
  - Texte : Vous venez de parcourir une boutique conçue de bout en bout par Mokom Studio.
  - Bouton : Découvrir la démarche → `/pages/etude-de-cas`
  - Lien : Retourner à la boutique → `/`

## Bloc Noël (repris dans la collection Coffrets & cadeaux, la FAQ, les fiches coffrets et le panier, du 1ᵉʳ octobre au 24 décembre)
- Titre : Commander pour Noël
- Texte : Pour recevoir vos biscuits avant Noël, commandez au plus tard le **mardi 15 décembre 2026 à midi** en point relais et le **jeudi 17 décembre 2026 à midi** en livraison à domicile. Retrait à l'atelier jusqu'au mardi 22 décembre à midi (ouverture exceptionnelle le 24 décembre de 10 h à 13 h). Après ces dates, la carte cadeau part par e-mail le jour de votre choix.
