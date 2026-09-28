// Réglages de publication. Voir CLAUDE.md (GitHub Pages, noindex global validé par Morgane).
export const BASE = "/maison-sable"; // sous-dossier GitHub Pages (nom du dépôt)
// Compte GitHub de Mokom Studio (validé par Morgane le 2026-09-28) : https://mokomstudio-pro.github.io/maison-sable/
export const SITE_URL = process.env.SITE_URL || "https://mokomstudio-pro.github.io";
export const NOINDEX = true; // décision B (docs/05-architecture.md)
export const MOKOM_URL = "https://www.mokomstudio.fr";
export const ANNEE = 2026;
export const MOKOM_LD = { "@type": "Organization", "@id": "https://www.mokomstudio.fr/#organisation", name: "Mokom Studio", url: "https://www.mokomstudio.fr" };

// Chaque page est un dossier (…/index.html) : GitHub Pages redirige (301) une adresse de page sans « / » final.
// On écrit donc directement la forme finale : /maison-sable/collections/biscuits/ (fichiers : inchangés).
export const avecBarre = (c) => { const [ch, suite = ""] = c.split(/(?=[?#])/); return (/\/$|\.[a-z0-9]+$/i.test(ch) ? ch : ch + "/") + suite; };
export const url = (chemin = "/") => BASE + avecBarre(chemin.startsWith("/") ? chemin : "/" + chemin);
export const absolue = (chemin = "/") => SITE_URL + url(chemin);
