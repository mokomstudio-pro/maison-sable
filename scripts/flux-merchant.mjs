// Flux produits Google Merchant Center — EXEMPLE DE DÉMONSTRATION, jamais soumis ni publié (marque fictive).
// Généré depuis les mêmes sources que le site : prix, disponibilité et livraison identiques à la page et au JSON-LD.
// Usage : node scripts/flux-merchant.mjs → docs/catalogue/flux-merchant-exemple.xml
import { writeFileSync } from "node:fs";
import { produits, livraison } from "../src/lib/data.mjs";
import { absolue } from "../src/config.mjs";

const x = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const TYPE = { biscuits: "Biscuits", "coffrets-cadeaux": "Coffrets & cadeaux" };
const items = [];
for (const p of produits) {
  if (p.type === "Carte cadeau") continue; // carte cadeau : non éligible aux fiches produits
  const nom = p.titre.split(",")[0];
  const description = (p.textes?.presentation || "").replace(/\*\*/g, "");
  for (const v of p.variantes) {
    const variante = v.option_valeur === "Unique" ? "" : ` ${v.option_valeur}`;
    const domicile = livraison.modes.find((m) => m.id === "domicile");
    items.push(`  <item>
    <g:id>${v.sku}</g:id>
    <g:item_group_id>${p.handle}</g:item_group_id>
    <g:title>${x(`Maison Sable ${nom}${variante}`)}</g:title>
    <g:description>${x(description)}</g:description>
    <g:link>${absolue(`/products/${p.handle}`)}?variant=${v.sku}</g:link>
    <g:image_link>${absolue(`/images/photos/${p.handle}-1-800.webp`)}</g:image_link>
    <g:availability>${v.stock === 0 ? "out_of_stock" : "in_stock"}</g:availability>
    <g:price>${v.prix.toFixed(2)} EUR</g:price>
    <g:brand>Maison Sable</g:brand>
    <g:identifier_exists>no</g:identifier_exists>
    <g:mpn>${v.sku}</g:mpn>
    <g:condition>new</g:condition>
    <g:google_product_category>${x("Food, Beverages & Tobacco > Food Items > Bakery > Cookies")}</g:google_product_category>
    <g:product_type>${x(`${TYPE[p.collection_principale]} > ${p.type}`)}</g:product_type>
    ${v.poids_net_g ? `<g:unit_pricing_measure>${v.poids_net_g} g</g:unit_pricing_measure>\n    <g:unit_pricing_base_measure>1 kg</g:unit_pricing_base_measure>\n    <g:shipping_weight>${v.poids_expedition_g} g</g:shipping_weight>` : ""}
    <g:shipping><g:country>FR</g:country><g:service>Livraison à domicile</g:service><g:price>${domicile.prix.toFixed(2)} EUR</g:price></g:shipping>
  </item>`);
  }
}
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- EXEMPLE DE DÉMONSTRATION : Maison Sable est une marque fictive. Ce flux n'est ni soumis à Google ni publié sur le site. -->
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Maison Sable — flux produits (exemple)</title>
  <link>${absolue("/")}</link>
  <description>Biscuits artisanaux de bord de mer, faits à Hossegor (boutique fictive, étude de cas Mokom Studio)</description>
${items.join("\n")}
</channel>
</rss>
`;
writeFileSync("docs/catalogue/flux-merchant-exemple.xml", xml);
console.log(`✓ ${items.length} articles dans docs/catalogue/flux-merchant-exemple.xml (non publié)`);
