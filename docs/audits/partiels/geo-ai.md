# Visibilité IA (GEO) — rapport partiel · 2026-09-28

> Outil : `claude-seo-ai` (`/claude-seo-ai:geo`), analyse automatique + spécialiste « recherche IA », sur l'aperçu local http://localhost:4321/maison-sable/.
> Pages : accueil (dans l'audit complet, voir `seo-ai.md`), **fiche Sablé Dune** (produit à formats), **article « Sablé, galette ou palet »** (page de réponse).
> Dossiers : `…/runs/localhost_4321/2026-09-28T16-25-19Z` (fiche) et `…/2026-09-28T16-25-21Z` (article).

## Score
| Page | Visibilité IA (outil) | Lecture |
|---|---|---|
| Accueil | 48/100 (F, partiel) | plafonné par le `noindex` voulu : Google exclut une page non indexable de ses réponses IA |
| Fiche Sablé Dune | 38/100 (F, partiel) | idem |
| Article | 53/100 (F, partiel) | idem |

**Ce score bas est attendu et accepté** : le site est en `noindex` par décision de Morgane (2026-09-27). Il mesure l'éligibilité, pas la qualité des textes. La qualité, elle, est jugée bonne (ci-dessous).

## Ce qui est bien (constats du spécialiste)
- **Réponse d'abord** : accroche de la fiche (≈ 55 mots, lisible seule, nomme « le Sablé Dune », « Maison Sable », « l'atelier d'Hossegor ») ; chapeau de l'article (≈ 53 mots) avant tout intertitre ; chaque titre-question reçoit une réponse directe (46–57 mots).
- **Densité de faits** : fiche 29 chiffres utiles pour 397 mots, aucun passage de 30 mots sans chiffre ; tableaux HTML (formats, prix au kilo, nutrition) ; article avec tableau comparatif.
- **Sources vérifiées** : les chiffres réels de l'article (20 % de beurre minimum, galette 5 mm, palet 1,5 cm) sont confirmés par la page CNIEL citée (vérifiée le 2026-09-28).
- **Contenu dans le HTML servi** (titre, texte, données structurées) : lisible par les robots IA qui n'exécutent pas JavaScript.
- **Fiction assumée** : aucun `sameAs` inventé, avis fictifs non balisés, valeurs nutritionnelles signalées « valeurs d'exemple ».
- Boutons et champs tous nommés (0 faux bouton, 0 champ sans étiquette).

## À améliorer (aucun bloquant)
| Priorité | Constat | Correction proposée |
|---|---|---|
| Moyenne | Les données structurées des fiches produits et de l'article n'ont pas d'identifiant stable (`@id`) et ne sont pas reliées à l'organisation « Maison Sable » déclarée sur l'accueil | ajouter `@id` + `url` au ProductGroup/Product, `manufacturer` → `#organisation` ; auteur de l'article → `#organisation` |
| Faible | L'article ne déclare pas de quoi il parle (`about`) ni les produits cités (`mentions`) | `about` sablé breton / galette ; `mentions` → @id des fiches Sablé Dune et Palet Marée ; pas de lien Wikidata sans vérification |
| Faible | Intertitre « Et chez Maison Sable ? » dépend du contexte | « Comment Maison Sable interprète-t-elle le sablé ? » |
| Faible | Le fait historique « Isidore Penven » ne repose que sur un blog | source plus solide à trouver par Morgane (facultatif) |

## Faux positifs de l'outil (écartés)
- `llms.txt` « mal formé », `agents.md` « présent » : en local, ces adresses redirigent vers l'accueil ; ces fichiers n'existent pas, par choix (`docs/04-geo.md`). Poids 0 dans le score.
- Accès des robots IA « autorisé » : lu sur une page HTML, pas sur un vrai robots.txt. Sur GitHub Pages (site de projet), c'est le robots.txt du compte qui compte. À revérifier après publication (`ua-diff`, `parse-robots-sitemap`).
- Liens « sans nom » : photos des cartes produit masquées volontairement (doublées par le lien du nom).

## À faire après la mise en ligne
Relancer `/claude-seo-ai:geo` sur https://mokomstudio-pro.github.io/maison-sable/ (robots, en-têtes, comparaison par robot) ; prompts de contrôle de `docs/04-geo.md` à J+30 (sans objet tant que le site reste en `noindex`).
