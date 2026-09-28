// Blocs partagés entre pages.
import { tx } from "../lib/layout.mjs";

// Bloc Noël (livraison.json › noel_2026) : visible du 1er octobre au 24 décembre, affiché par boutique.js selon la date.
export const blocNoel = () => `<div class="bloc-noel" data-saison-noel hidden>
  <h2>Commander pour Noël</h2>
  <p>${tx("Pour recevoir vos biscuits avant Noël, commandez au plus tard le **mardi 15 décembre 2026 à midi** en point relais et le **jeudi 17 décembre 2026 à midi** en livraison à domicile. Retrait à l'atelier jusqu'au mardi 22 décembre à midi (ouverture exceptionnelle le 24 décembre de 10 h à 13 h). Après ces dates, la carte cadeau part par e-mail le jour de votre choix.")}</p>
</div>`;
