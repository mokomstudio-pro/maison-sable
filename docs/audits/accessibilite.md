# Accessibilité — Maison Sable

> Étape « accessibilité » · 2026-09-28 · Référentiel : WCAG 2.2 niveau AA (objectif Mokom).
> Outils : Lighthouse (Chrome) en mobile, **tests réels au clavier** (Tab, Maj+Tab, Entrée, Espace, Échap) dans Chrome DevTools, `npm run check:seo` (titres, alt, lang).

## 1. Scores Lighthouse accessibilité (mobile, après corrections)

| Page | Score |
|---|---|
| Accueil | **100** |
| Collection Biscuits | **100** (98 avant correction) |
| Fiche produit Palet Marée | **100** |
| FAQ | **100** |
| Commande simulée (après une erreur de saisie) | **100** |

Bonnes pratiques : 100 partout. (Le score SEO de Lighthouse est bas par choix : site en `noindex`.)

## 2. Corrections faites

| Problème | Critère WCAG | Correction |
|---|---|---|
| Le logo était annoncé « Maison Sable, accueil » alors qu'il affiche « Maison Sable Hossegor » (gênant pour la commande vocale) | 2.5.3 Nom visible dans le nom accessible | nom lu : « Maison Sable Hossegor, accueil » (texte visible + « accueil » masqué visuellement) |
| Noms de produits en titre de niveau 3 sans niveau 2 sur les collections, la page 404 et « Tous les produits » | 1.3.1 Information et relations | niveaux de titres rétablis |
| Panneau de filtres plein écran (mobile) : Tab pouvait sortir du panneau vers des éléments cachés derrière | 2.4.3 Parcours du focus / 2.4.11 Focus non masqué | le focus reste dans le panneau tant qu'il est ouvert ; Échap le ferme et rend le focus au bouton « Filtrer » |
| Coche du format choisi (✓) et signe d'erreur (⚠) tapés en caractères | 1.1.1 / cohérence du système | icônes dessinées (masques SVG), couleur du texte ; l'information reste portée aussi par le contour (format) et par le texte (erreur) |

Nettoyage associé : suppression du code inutilisé des anciennes versions (frises dessinées, plateau qui sortait du couvercle, pin qui débordait).

## 3. Parcours testés au clavier (mobile 390 px)

| Parcours | Résultat |
|---|---|
| Lien d'évitement « Aller au contenu » | premier élément, visible au focus ✅ |
| Ordre de tabulation d'une fiche produit | logique : bandeau → menu → logo → recherche → panier → galerie → fil d'Ariane → formats → quantité → bouton ✅ |
| Contour de focus | 3 px caramel foncé (#8A4A1C), visible sur tous les éléments testés ✅ |
| Taille des zones cliquables | 44 × 44 px pour les boutons d'icône et de quantité ✅ (minimum WCAG 2.2 : 24 × 24) |
| Ajout au panier au clavier | Entrée ajoute, le tiroir s'ouvre, le focus va sur son titre, l'ajout est **annoncé** (« Palet Marée 150 g ajouté au panier ») ✅ |
| Tiroir du panier | focus piégé tant qu'il est ouvert (dialogue natif), Échap ferme, le focus revient sur « Ajouter au panier » ✅ |
| Choix rapide du format sur une carte | Entrée ouvre, le focus va sur le premier format, `aria-expanded` à jour, Échap ferme et rend le focus ✅ |
| Filtres (mobile) | Entrée ouvre, Espace coche, nombre de produits annoncé (« 1 produit »), Échap ferme ✅ |
| Commande avec erreurs | le focus va sur le résumé « 6 champs sont à corriger », chaque champ passe en `aria-invalid` et est relié à son message (`aria-describedby`) ✅ |

## 4. Déjà en place depuis le développement
- `lang="fr"`, zones (`header`, `nav` nommées, `main`, `footer`), un seul `h1` par page, fil d'Ariane avec `aria-current`.
- Textes alternatifs descriptifs sur toutes les photos ; images décoratives en `alt=""`.
- Contrastes vérifiés sur toutes les paires de couleurs (texte ≥ 4,5:1).
- Allergènes en gras **et** introduits par le mot « Contient » (pas seulement une couleur).
- Aucune information portée par la couleur seule ; aucun carrousel automatique.
- `prefers-reduced-motion` : le couvercle en métal ne s'anime pas et les tiroirs s'ouvrent sans glissement.
- Aide au même endroit sur toutes les pages (FAQ dans l'en-tête et le pied de page, WCAG 3.2.6) ; aucune ressaisie demandée (3.3.7) ; pas de test cognitif (3.3.8).

## 5. Limites
- Test au lecteur d'écran réel (NVDA, VoiceOver) non réalisé : les noms accessibles, les annonces et les états ont été vérifiés dans l'arbre d'accessibilité de Chrome. Un passage avec un vrai lecteur d'écran est recommandé avant de présenter l'étude de cas comme « accessible ».
- Déclaration d'accessibilité : l'état de conformité sera publié dans les mentions légales après l'audit final.

## Porte de sortie
- [x] Navigation au clavier testée sur chaque gabarit (fiche, collection, panier, commande) ; aucun piège, focus toujours visible.
- [x] Lighthouse accessibilité à 100 sur les gabarits testés ; problèmes bloquants corrigés.
- [ ] `/impeccable critique` : couvert par l'audit final (`/mokom:audit`).
