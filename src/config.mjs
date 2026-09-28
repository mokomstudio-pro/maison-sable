// Réglages de publication. Voir CLAUDE.md (GitHub Pages, noindex global validé par Morgane).
export const BASE = "/maison-sable"; // sous-dossier GitHub Pages (nom du dépôt)
// [À COMPLÉTER] compte GitHub de Mokom Studio : l'adresse finale sera https://<compte>.github.io/maison-sable/
export const SITE_URL = process.env.SITE_URL || "https://compte-github.github.io";
export const NOINDEX = true; // décision B (docs/05-architecture.md)
export const MOKOM_URL = "https://www.mokomstudio.fr";
export const ANNEE = 2026;

export const url = (chemin = "/") => BASE + (chemin.startsWith("/") ? chemin : "/" + chemin);
export const absolue = (chemin = "/") => SITE_URL + url(chemin);
