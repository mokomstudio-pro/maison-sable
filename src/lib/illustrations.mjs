// Illustrations « lithographie sur fer-blanc » : aplats d'encres pastel, contour encre légèrement
// décalé (défaut de repérage d'imprimerie), aucune photo. Dessinées pour Mokom Studio, marque fictive.
export const C = {
  sable: "#E9E0D4", papier: "#F7F2EA", encre: "#2E2A3F", corail: "#F0A184", lagune: "#A9D4D0",
  laguneP: "#2F676A", beurre: "#F6D98E", rose: "#F3C9BD", sauge: "#A9C7AE", pin: "#3D6652",
  dore: "#E7B865", doreF: "#C98F45", caramel: "#D98E55", choco: "#6E4B48", chocoF: "#523838", coco: "#FBF7EF",
};
const svg = (w, h, corps, titre = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${titre ? `<title>${titre}</title>` : ""}${corps}</svg>`;

// Contour décalé : la même forme, en trait encre, glissée de quelques unités.
const trait = (d, dx = 4, dy = 3, w = 5) => `<path d="${d}" fill="none" stroke="${C.encre}" stroke-width="${w}" stroke-linejoin="round" transform="translate(${dx} ${dy})" opacity=".85"/>`;

// Disque festonné (sablé) : centre, rayon, nombre de festons
function feston(cx, cy, r, n = 22, prof = 0.06) {
  let d = "";
  for (let i = 0; i <= n * 2; i++) {
    const a = (Math.PI * i) / n;
    const rr = r * (i % 2 ? 1 : 1 - prof);
    d += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * Math.sin(a)).toFixed(1);
  }
  return d + "Z";
}
const cercle = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

// Pseudo-aléatoire déterministe (mêmes dessins à chaque construction)
function alea(graine) {
  let s = graine;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}
function semis(cx, cy, r, n, graine, dessin) {
  const rnd = alea(graine);
  let out = "";
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * r;
    out += dessin(cx + d * Math.cos(a), cy + d * Math.sin(a), rnd() * 180, rnd);
  }
  return out;
}

// ---------- Biscuits vus de dessus, empilés ----------
function pile({ fond, bord, festons = 22, garniture = () => "", graine = 7, rond = false }) {
  const pos = [[400, 640, 250], [330, 430, 205], [495, 330, 190]];
  let out = "";
  pos.forEach(([x, y, r], i) => {
    const d = rond ? cercle(x, y, r) : feston(x, y, r, festons);
    out += `<g><path d="${d}" fill="${bord}" transform="translate(0 16)"/><path d="${d}" fill="${fond}"/>${trait(d)}`;
    out += `<path d="${rond ? cercle(x, y, r * 0.84) : feston(x, y, r * 0.84, festons)}" fill="none" stroke="${bord}" stroke-width="4" stroke-dasharray="3 14" stroke-linecap="round"/>`;
    out += garniture(x, y, r * 0.72, graine + i * 31) + "</g>";
  });
  return out;
}
const grains = (couleur, n = 16, t = 7) => (x, y, r, g) =>
  semis(x, y, r, n, g, (a, b, rot) => `<rect x="${(a - t / 2).toFixed(1)}" y="${(b - t / 2).toFixed(1)}" width="${t}" height="${t}" rx="1.5" fill="${couleur}" transform="rotate(${rot.toFixed(0)} ${a.toFixed(1)} ${b.toFixed(1)})"/>`);

const produitsVue = {
  "sable-dune": () => pile({ fond: C.dore, bord: C.doreF, garniture: grains(C.coco, 18, 8) }),
  "sable-pignada": () =>
    pile({
      fond: C.dore, bord: C.doreF, festons: 26, graine: 11,
      garniture: (x, y, r, g) => semis(x, y, r, 9, g, (a, b, rot) => `<ellipse cx="${a.toFixed(1)}" cy="${b.toFixed(1)}" rx="15" ry="8" fill="${C.beurre}" stroke="${C.doreF}" stroke-width="3" transform="rotate(${rot.toFixed(0)} ${a.toFixed(1)} ${b.toFixed(1)})"/>`),
    }),
  "sable-ecume": () =>
    pile({
      fond: "#F2DCA6", bord: "#D9B77A", festons: 20, graine: 23,
      garniture: (x, y, r, g) =>
        semis(x, y, r, 7, g, (a, b, rot) => `<path d="M${a.toFixed(1)} ${b.toFixed(1)}q14 -12 30 -2" fill="none" stroke="${C.beurre}" stroke-width="7" stroke-linecap="round" transform="rotate(${rot.toFixed(0)} ${a.toFixed(1)} ${b.toFixed(1)})"/>`) +
        semis(x, y, r * 0.8, 4, g + 5, (a, b, rot) => `<g transform="rotate(${rot.toFixed(0)} ${a.toFixed(1)} ${b.toFixed(1)})" fill="${C.pin}"><ellipse cx="${a}" cy="${b}" rx="7" ry="3.5"/><ellipse cx="${a + 12}" cy="${b + 3}" rx="7" ry="3.5"/><ellipse cx="${a - 12}" cy="${b + 3}" rx="7" ry="3.5"/></g>`),
    }),
  "biscuit-vague": () =>
    pile({
      fond: C.choco, bord: C.chocoF, festons: 24, graine: 41,
      garniture: (x, y, r, g) =>
        `<path d="M${x - r * 0.7} ${y}q${r * 0.175} -${r * 0.22} ${r * 0.35} 0t${r * 0.35} 0t${r * 0.35} 0t${r * 0.35} 0" fill="none" stroke="${C.chocoF}" stroke-width="9" stroke-linecap="round"/>` + grains(C.coco, 12, 7)(x, y, r, g),
    }),
  "sable-lagon": () =>
    pile({
      fond: "#F4E3B8", bord: "#DCC08A", rond: true, graine: 53,
      garniture: (x, y, r, g) => semis(x, y, r, 14, g, (a, b, rot) => `<path d="M${a.toFixed(1)} ${b.toFixed(1)}q9 -7 20 0" fill="none" stroke="${C.coco}" stroke-width="6" stroke-linecap="round" transform="rotate(${rot.toFixed(0)} ${a.toFixed(1)} ${b.toFixed(1)})"/>`),
    }),
  "palet-maree": () => {
    let out = "";
    [[400, 700, 230], [330, 470, 190], [500, 360, 175]].forEach(([x, y, r], i) => {
      const h = 58, ry = r * 0.42;
      out += `<g><path d="M${x - r} ${y}v${h}a${r} ${ry} 0 0 0 ${2 * r} 0v-${h}Z" fill="${C.doreF}"/><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${ry}" fill="${C.dore}"/>`;
      out += trait(`M${x - r} ${y}v${h}a${r} ${ry} 0 0 0 ${2 * r} 0v-${h}a${r} ${ry} 0 0 0 -${2 * r} 0Z`);
      out += `<path d="M${x - r * 0.62} ${y - 6}c${r * 0.2} -${ry * 0.5} ${r * 0.35} ${ry * 0.55} ${r * 0.55} 0s${r * 0.35} ${ry * 0.5} ${r * 0.62} 0" fill="none" stroke="${C.caramel}" stroke-width="16" stroke-linecap="round"/>`;
      out += `<path d="M${x - r * 0.7} ${y + h * 0.55}h${r * 1.4}" stroke="${C.caramel}" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/></g>`;
      void i;
    });
    return out;
  },
  "croquant-lagune": () => {
    let out = "";
    [[110, 640, -12], [210, 470, -4], [140, 300, 8]].forEach(([x, y, rot], i) => {
      const d = `M${x} ${y}h420a30 30 0 0 1 30 30v40a30 30 0 0 1 -30 30h-300a30 30 0 0 1 -30 -30v-40a30 30 0 0 1 30 -30Z`;
      out += `<g transform="rotate(${rot} ${x + 210} ${y + 50})"><path d="${d}" fill="${C.doreF}" transform="translate(0 12)"/><path d="${d}" fill="${C.dore}"/>${trait(d)}`;
      out += semis(x + 210, y + 50, 150, 7, 71 + i * 13, (a, b, r2) => `<path d="M${a.toFixed(1)} ${(b - 13).toFixed(1)}c16 6 16 20 0 26c-16 -6 -16 -20 0 -26Z" fill="#F3E2B6" stroke="${C.doreF}" stroke-width="3" transform="rotate(${(r2 / 2 + 60).toFixed(0)} ${a.toFixed(1)} ${b.toFixed(1)})"/>`);
      out += semis(x + 210, y + 50, 160, 5, 97 + i * 7, (a, b) => `<rect x="${a.toFixed(1)}" y="${b.toFixed(1)}" width="16" height="5" rx="2.5" fill="${C.corail}"/>`) + "</g>";
    });
    return out;
  },
};

// Coupe : tranche d'un biscuit (épaisseur, mie)
function coupe({ fond, bord, epaisseur = 70, mie = C.beurre, points = C.doreF, extra = "", graine = 3 }) {
  epaisseur = Math.round(epaisseur * 2.2);
  const x = 60, y = 500 - epaisseur / 2, w = 680;
  const d = `M${x} ${y + 18}q0 -18 18 -18h${w - 36}q18 0 18 18v${epaisseur - 36}q0 18 -18 18h-${w - 36}q-18 0 -18 -18Z`;
  const rnd = alea(graine);
  let mieDots = "";
  for (let i = 0; i < 160; i++) mieDots += `<circle cx="${(x + 20 + rnd() * (w - 40)).toFixed(1)}" cy="${(y + 10 + rnd() * (epaisseur - 20)).toFixed(1)}" r="${(2 + rnd() * 3).toFixed(1)}" fill="${points}" opacity=".55"/>`;
  return `<path d="${d}" fill="${bord}" transform="translate(0 12)"/><path d="${d}" fill="${fond}"/><path d="M${x + 14} ${y + 12}h${w - 28}v${epaisseur - 24}h-${w - 28}Z" fill="${mie}" opacity=".55"/>${mieDots}${extra}${trait(d)}`;
}
const produitsCoupe = {
  "sable-dune": () => coupe({ fond: C.dore, bord: C.doreF, epaisseur: 90, extra: [120, 210, 330, 420, 540, 640].map((a) => `<rect x="${a}" y="394" width="12" height="12" rx="2" fill="${C.coco}" transform="rotate(20 ${a + 6} 400)"/>`).join("") }),
  "palet-maree": () => coupe({ fond: C.dore, bord: C.doreF, epaisseur: 190, mie: C.caramel, points: C.caramel, extra: `<path d="M130 500c90 -40 180 40 270 0s180 40 270 0" fill="none" stroke="${C.caramel}" stroke-width="60" stroke-linecap="round"/>` }),
  "sable-pignada": () => coupe({ fond: C.dore, bord: C.doreF, epaisseur: 100, extra: [140, 270, 400, 530, 640].map((a, i) => `<ellipse cx="${a}" cy="${480 + (i % 2) * 40}" rx="30" ry="15" fill="${C.beurre}" stroke="${C.doreF}" stroke-width="3"/>`).join("") }),
  "croquant-lagune": () => coupe({ fond: C.dore, bord: C.doreF, epaisseur: 120, extra: [150, 290, 430, 570, 680].map((a, i) => `<path d="M${a} ${455 + (i % 2) * 40}c36 12 36 50 0 62c-36 -12 -36 -50 0 -62Z" fill="${C.coco}" stroke="${C.doreF}" stroke-width="3"/>`).join("") }),
  "sable-ecume": () => coupe({ fond: "#F2DCA6", bord: "#D9B77A", epaisseur: 90, mie: C.coco, points: C.beurre }),
  "biscuit-vague": () => coupe({ fond: C.choco, bord: C.chocoF, epaisseur: 90, mie: C.chocoF, points: C.chocoF }),
  "sable-lagon": () => coupe({ fond: "#F4E3B8", bord: "#DCC08A", epaisseur: 90, mie: C.coco, points: C.coco }),
};

// ---------- Boîte en fer, coffrets, carte ----------
function scene(w, h, { soleil = true } = {}) {
  // Petite scène d'Hossegor pour couvercles (dans un repère w × h)
  return `<rect width="${w}" height="${h}" fill="${C.beurre}"/>` +
    (soleil ? `<circle cx="${w * 0.7}" cy="${h * 0.42}" r="${h * 0.2}" fill="${C.corail}"/>` : "") +
    `<rect y="${h * 0.5}" width="${w}" height="${h * 0.06}" fill="${C.rose}"/><rect y="${h * 0.56}" width="${w}" height="${h * 0.16}" fill="${C.lagune}"/>` +
    `<path d="M0 ${h * 0.74}C${w * 0.3} ${h * 0.6} ${w * 0.6} ${h * 0.66} ${w} ${h * 0.7}V${h}H0Z" fill="${C.sable}"/>` +
    `<rect x="${w * 0.14}" y="${h * 0.44}" width="${w * 0.012}" height="${h * 0.3}" fill="${C.pin}"/>` + couronne(w * 0.146, h * 0.44, w / 1000);
}
function boite(x, y, w, h, { titre = "MAISON SABLE", couvercle = true } = {}) {
  const d = `M${x + 16} ${y}h${w - 32}q16 0 16 16v${h - 32}q0 16 -16 16h-${w - 32}q-16 0 -16 -16v-${h - 32}q0 -16 16 -16Z`;
  return `<g><path d="${d}" fill="${C.pin}" transform="translate(0 18)"/><path d="${d}" fill="${C.sable}"/>` +
    (couvercle ? `<svg x="${x + 18}" y="${y + 18}" width="${w - 36}" height="${h - 36}" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">${scene(400, 260)}</svg>` : "") +
    `<rect x="${x + w * 0.22}" y="${y + 30}" width="${w * 0.56}" height="${h * 0.14}" rx="4" fill="${C.sauge}"/>` +
    `<text x="${x + w / 2}" y="${y + 30 + h * 0.1}" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="${h * 0.075}" letter-spacing="3" fill="${C.encre}">${titre}</text>` +
    `<rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 20}" rx="10" fill="none" stroke="${C.encre}" stroke-width="3" opacity=".6"/>${trait(d, 4, 3, 6)}</g>`;
}
function sachet(x, y, w, h, couleur, etiquette) {
  const d = `M${x} ${y + 30}l${w * 0.08} -30h${w * 0.84}l${w * 0.08} 30v${h - 30}h-${w}Z`;
  return `<g><path d="${d}" fill="${C.papier}"/><path d="M${x} ${y + 30}h${w}" stroke="${C.encre}" stroke-width="3" stroke-dasharray="6 6"/>` +
    `<rect x="${x + w * 0.14}" y="${y + h * 0.36}" width="${w * 0.72}" height="${h * 0.36}" rx="6" fill="${couleur}"/>` +
    `<text x="${x + w / 2}" y="${y + h * 0.58}" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="${h * 0.09}" fill="${C.encre}">${etiquette}</text>${trait(d, 3, 3, 4)}</g>`;
}
const produitsObjets = {
  "boite-grande-plage": () => boite(110, 250, 580, 460) + `<g opacity=".95">${pile({ fond: C.dore, bord: C.doreF, garniture: grains(C.coco, 8, 7) }).replace(/<g>/g, '<g transform="translate(500 690) scale(.28)">')}</g>`,
  "coffret-ete-indien": () =>
    `<path d="M80 420h640v420h-640Z" fill="${C.rose}"/><path d="M80 420h640" stroke="${C.encre}" stroke-width="5"/>${trait("M80 420h640v420h-640Z")}` +
    boite(140, 300, 330, 260, { titre: "GRANDE PLAGE" }) + sachet(480, 380, 170, 250, C.sauge, "PIGNADA") + sachet(250, 560, 170, 250, C.corail, "LAGUNE") +
    `<path d="M80 600h640" stroke="${C.laguneP}" stroke-width="14" opacity=".8"/>`,
  "coffret-decouverte": () => {
    let out = `<path d="M90 230h620v600h-620Z" fill="${C.sauge}"/>${trait("M90 230h620v600h-620Z")}<path d="M120 260h560v540h-560Z" fill="${C.papier}"/>`;
    const cs = [[C.beurre, "DUNE"], [C.caramel, "MARÉE"], [C.sauge, "PIGNADA"], [C.corail, "LAGUNE"], [C.rose, "ÉCUME"], [C.lagune, "VAGUE"]];
    cs.forEach(([c, n], i) => { out += sachet(140 + (i % 3) * 180, 290 + Math.floor(i / 3) * 260, 150, 220, c, n); });
    return out;
  },
  "carte-cadeau": () =>
    `<g transform="rotate(-6 400 500)"><rect x="110" y="300" width="580" height="370" rx="26" fill="${C.pin}" transform="translate(0 16)"/><rect x="110" y="300" width="580" height="370" rx="26" fill="${C.lagune}"/>` +
    `<svg x="130" y="320" width="540" height="330" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">${scene(400, 260)}</svg>` +
    `<rect x="200" y="410" width="400" height="120" rx="8" fill="${C.papier}"/><text x="400" y="465" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="40" letter-spacing="4" fill="${C.encre}">CARTE CADEAU</text>` +
    `<text x="400" y="505" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="${C.encre}">Maison Sable · Hossegor</text>${trait("M136 300h528a26 26 0 0 1 26 26v318a26 26 0 0 1 -26 26h-528a26 26 0 0 1 -26 -26v-318a26 26 0 0 1 26 -26Z")}</g>`,
};

export function illustrationProduit(handle, vue = 1) {
  const f = vue === 2 ? produitsCoupe[handle] : produitsVue[handle] || produitsObjets[handle];
  return f ? svg(800, 1000, f()) : null;
}

// Couronne de pin parasol : bouquets irréguliers, dessous plus sombre
function couronne(px, py, k = 1) {
  const touffes = [[-95, 8, 70, 30], [-30, -18, 80, 34], [45, -8, 78, 32], [105, 12, 60, 26], [10, 16, 110, 28]];
  let o = "";
  for (const [dx, dy, rx, ry] of touffes) o += `<ellipse cx="${px + dx * k}" cy="${py + dy * k + 10 * k}" rx="${rx * k}" ry="${ry * k}" fill="${C.pin}"/>`;
  for (const [dx, dy, rx, ry] of touffes) o += `<ellipse cx="${px + dx * k}" cy="${py + dy * k}" rx="${rx * k * 0.92}" ry="${ry * k * 0.8}" fill="${C.sauge}"/>`;
  return o;
}

// ---------- Grande scène du couvercle (accueil) ----------
export function sceneCouvercle(format = "large") {
  const [w, h] = format === "large" ? [1600, 900] : [900, 1300];
  const L = format === "large";
  const s = (v) => v; // repère direct
  const horizon = L ? 470 : 360;
  let out = `<defs><pattern id="trame" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.4" fill="${C.encre}" opacity=".07"/></pattern></defs>`;
  out += `<rect width="${w}" height="${h}" fill="${C.beurre}"/>`;
  // soleil rayé
  const sx = L ? 1150 : 610, sy = L ? 330 : 230, sr = L ? 165 : 140;
  out += `<circle cx="${sx}" cy="${sy}" r="${sr}" fill="${C.corail}"/>`;
  [0.35, 0.55, 0.75].forEach((k, i) => { out += `<rect x="${sx - sr - 10}" y="${sy + sr * k - 8 + i * 4}" width="${2 * sr + 20}" height="${10 + i * 7}" fill="${C.beurre}"/>`; });
  // oiseaux
  out += `<g fill="none" stroke="${C.encre}" stroke-width="5" stroke-linecap="round" opacity=".7"><path d="M${L ? 520 : 160} ${L ? 210 : 150}q18 -16 36 0q18 -16 36 0"/><path d="M${L ? 610 : 250} ${L ? 170 : 110}q13 -12 26 0q13 -12 26 0"/></g>`;
  // horizon rose, océan et vagues
  out += `<rect y="${horizon - 36}" width="${w}" height="40" fill="${C.rose}"/><rect y="${horizon}" width="${w}" height="${L ? 150 : 170}" fill="${C.lagune}"/>`;
  for (let r = 0; r < 3; r++) {
    let d = `M0 ${horizon + 40 + r * 38}`;
    for (let x = 0; x < w; x += 80) d += `q20 -14 40 0t40 0`;
    out += `<path d="${d}" fill="none" stroke="${C.laguneP}" stroke-width="4" opacity="${0.55 - r * 0.12}"/>`;
  }
  // dunes (métal nu = sable) et ombre
  const dy = horizon + (L ? 130 : 120);
  out += `<path d="M0 ${dy}C${w * 0.18} ${dy - 90} ${w * 0.38} ${dy - 70} ${w * 0.55} ${dy - 10}S${w * 0.85} ${dy - 60} ${w} ${dy - 20}V${h}H0Z" fill="${C.sable}"/>`;
  for (let r = 0; r < 5; r++) {
    const yy = dy + 40 + r * (L ? 34 : 60);
    out += `<path d="M${w * (0.42 + r * 0.03)} ${yy}q${w * 0.08} -18 ${w * 0.16} 0t${w * 0.16} 0" fill="none" stroke="${C.encre}" stroke-width="3" opacity=".12"/>`;
  }
  const oyats = L ? [[200, dy - 20], [360, dy - 30], [1040, dy - 30], [1480, dy - 8]] : [[70, dy + 10], [440, dy - 10], [840, dy - 6]];
  for (const [ox, oy] of oyats) {
    out += `<g stroke="${C.pin}" stroke-width="5" stroke-linecap="round" fill="none"><path d="M${ox} ${oy}q-6 -30 -24 -46"/><path d="M${ox} ${oy}q2 -34 -2 -58"/><path d="M${ox} ${oy}q10 -28 28 -40"/><path d="M${ox} ${oy}q-14 -18 -34 -22"/></g>`;
  }
  // ganivelles (clôtures de bois des dunes) avec fils
  const gx0 = L ? 620 : 90, n = L ? 14 : 10, pas = L ? 34 : 38;
  let g = "";
  for (let i = 0; i < n; i++) {
    const x = gx0 + i * pas, y = dy - 8 + Math.sin(i / 2.2) * 10 + i * 1.5;
    g += `<rect x="${x}" y="${y - 70}" width="11" height="78" rx="3" fill="${C.encre}"/>`;
  }
  out += g + `<path d="M${gx0 - 6} ${dy - 50}Q${gx0 + (n * pas) / 2} ${dy - 34} ${gx0 + n * pas} ${dy - 30}M${gx0 - 6} ${dy - 22}Q${gx0 + (n * pas) / 2} ${dy - 6} ${gx0 + n * pas} ${dy - 2}" fill="none" stroke="${C.laguneP}" stroke-width="4"/>`;
  // lac marin au premier plan
  const ly = L ? 760 : 1060;
  out += `<path d="M0 ${ly}C${w * 0.15} ${ly - 60} ${w * 0.32} ${ly - 30} ${w * 0.42} ${ly + 30}S${w * 0.4} ${h} ${w * 0.4} ${h}H0Z" fill="${C.lagune}"/>`;
  out += `<path d="M30 ${ly + 40}q80 -30 180 -6M60 ${ly + 90}q90 -24 200 -2" fill="none" stroke="${C.papier}" stroke-width="5" stroke-linecap="round" opacity=".8"/>`;
  // pins parasols (sauge + pin profond)
  const pins = L ? [[1330, 430, 1.1], [1470, 470, 0.9], [1215, 520, 0.7]] : [[740, 300, 0.95], [600, 370, 0.7]];
  for (const [px, py, k] of pins) {
    out += `<path d="M${px} ${py}c-6 90 4 180 -10 ${260 * k}h${22 * k}c-10 -80 -8 -170 4 -${260 * k}Z" fill="${C.pin}"/>`;
    out += couronne(px, py, k);
  }
  out += `<rect width="${w}" height="${h}" fill="url(#trame)"/>`;
  void s;
  return svg(w, h, out);
}

// ---------- Autres illustrations ----------
export function illustrationAtelier() {
  let out = scene(1200, 800, { soleil: true }).replace(/<rect width="1200" height="800" fill="#F6D98E"\/>/, `<rect width="1200" height="800" fill="${C.beurre}"/>`);
  // maison basse aux volets ouverts
  out += `<path d="M380 470l220 -130l220 130Z" fill="${C.corail}"/><rect x="420" y="470" width="360" height="200" fill="${C.papier}"/>` +
    `<path d="M420 470h360M420 530h360M500 470v200M700 470v200" stroke="${C.encre}" stroke-width="7"/>` +
    `<rect x="560" y="560" width="80" height="110" fill="${C.laguneP}"/>` +
    `<rect x="450" y="500" width="40" height="50" fill="${C.lagune}"/><rect x="430" y="500" width="18" height="50" fill="${C.sauge}"/><rect x="492" y="500" width="18" height="50" fill="${C.sauge}"/>` +
    `<rect x="710" y="500" width="40" height="50" fill="${C.lagune}"/><rect x="690" y="500" width="18" height="50" fill="${C.sauge}"/><rect x="752" y="500" width="18" height="50" fill="${C.sauge}"/>` +
    trait("M380 470l220 -130l220 130v200h-440Z", 5, 4, 6);
  return svg(1200, 800, out);
}

export function illustrationCoupeTrois() {
  // Galette fine, sablé, palet épais, avec leurs épaisseurs
  let out = `<rect width="1200" height="560" fill="${C.papier}"/>`;
  const items = [["Galette", "environ 5 mm", 20, 90], ["Sablé", "variable", 55, 480], ["Palet", "1 à 1,5 cm", 110, 870]];
  for (const [nom, ep, h, x] of items) {
    const y = 300 - h;
    const d = `M${x} ${y + 10}q0 -10 10 -10h240q10 0 10 10v${h - 20}q0 10 -10 10h-240q-10 0 -10 -10Z`;
    out += `<path d="${d}" fill="${C.doreF}" transform="translate(0 8)"/><path d="${d}" fill="${C.dore}"/>${trait(d, 3, 2, 4)}`;
    out += `<path d="M${x + 280} ${y}v${h}" stroke="${C.encre}" stroke-width="3"/><path d="M${x + 272} ${y}h16M${x + 272} ${y + h}h16" stroke="${C.encre}" stroke-width="3"/>`;
    out += `<text x="${x + 130}" y="380" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="44" fill="${C.encre}">${nom.toUpperCase()}</text>`;
    out += `<text x="${x + 130}" y="425" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="${C.encre}">${ep}</text>`;
  }
  return svg(1200, 560, out);
}

export function imagePartage() {
  // Image de partage 1200 × 630 : scène + étiquette (texte dessiné en capitales)
  let out = `<svg x="0" y="0" width="1200" height="630" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">${sceneCouvercle("large").replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</svg>`;
  out += `<rect x="70" y="330" width="680" height="220" rx="6" fill="${C.papier}"/><rect x="82" y="342" width="656" height="196" rx="3" fill="none" stroke="${C.encre}" stroke-width="2" opacity=".5"/>`;
  out += `<text x="110" y="420" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="64" fill="${C.encre}">MAISON SABLE</text>`;
  out += `<text x="110" y="480" font-family="Arial, sans-serif" font-size="30" fill="${C.encre}">Biscuits artisanaux de bord de mer</text>`;
  out += `<text x="110" y="520" font-family="Arial, sans-serif" font-size="24" fill="${C.laguneP}">Hossegor · boutique fictive, étude de cas Mokom Studio</text>`;
  return svg(1200, 630, out);
}

export const pinDebord = () => svg(520, 300, `<rect x="250" y="120" width="16" height="180" fill="${C.pin}"/>` + couronne(260, 110, 1.9));

export const frises = {
  vagues: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="28"><path d="M0 18 Q12 4 24 18 T48 18" fill="none" stroke="${C.laguneP}" stroke-width="3"/></svg>`,
  ganivelles: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="28"><rect x="6" y="3" width="5" height="24" rx="1.5" fill="${C.encre}"/><path d="M0 10H18M0 21H18" stroke="${C.laguneP}" stroke-width="1.6"/></svg>`,
  pignes: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="28"><ellipse cx="20" cy="14" rx="7" ry="10" fill="${C.beurre}"/><path d="M14 10H26M13 14H27M14 18H26" stroke="${C.pin}" stroke-width="1.6"/></svg>`,
};
