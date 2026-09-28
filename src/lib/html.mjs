// Petits outils de rendu : échappement, typographie française, prix.

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const NBSP = " ";
const FINE = " ";

// Typographie française appliquée au texte (jamais aux attributs d'URL) :
// espace fine insécable avant ; ! ? et dans les guillemets, insécable avant : et avant les unités.
export const typo = (s = "") =>
  String(s)
    .replace(/ ([;!?])/g, FINE + "$1")
    .replace(/ :(\s|$)/g, NBSP + ":$1")
    .replace(/« /g, "«" + FINE)
    .replace(/ »/g, FINE + "»")
    .replace(/(\d) (€|g|kg|%|h|mm|cm|kcal|kJ|jours?|mots?)(?![\p{L}])/gu, "$1" + NBSP + "$2")
    .replace(/(\d) (\d{3})(?!\d)/g, "$1" + FINE + "$2");

// Texte : échappé puis typographié. Accepte **gras** et [lien](url) issus des documents de contenu.
export const t = (s = "", { liens = true, lien = (h) => h } = {}) => {
  let out = typo(esc(s));
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  if (liens) out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, txt, href) => `<a href="${lien(href)}">${txt}</a>`);
  return out;
};

export const prix = (n) =>
  Number(n).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + NBSP + "€";

export const prixKilo = (p, g) => (g ? prix((p / g) * 1000) + "/kg" : "");

export const attrs = (o) =>
  Object.entries(o)
    .filter(([, v]) => v !== false && v !== undefined && v !== null)
    .map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`))
    .join(" ");
