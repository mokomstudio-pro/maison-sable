// Publication sur GitHub Pages : contrôles, construction, puis envoi de dist/ sur la branche gh-pages.
// Usage : npm run publier (seulement après /mokom:audit). Le dépôt source reste sur la branche master.
import { execSync } from "node:child_process";
import { cpSync, rmSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const sh = (c, cwd) => execSync(c, { cwd, stdio: "inherit" });
sh("npm run check");
sh("npm run build");
sh("node scripts/verifier-seo.mjs");
const version = execSync("git rev-parse --short HEAD").toString().trim();
const depot = execSync("git remote get-url origin").toString().trim();
const dossier = mkdtempSync(join(tmpdir(), "maison-sable-pages-"));
cpSync("dist", dossier, { recursive: true });
sh("git init -q -b gh-pages", dossier);
sh("git add -A", dossier);
sh(`git commit -q -m "Publication du site Maison Sable (${version})"`, dossier);
sh(`git push -q -f ${depot} gh-pages`, dossier);
rmSync(dossier, { recursive: true, force: true });
console.log("✓ Publié : https://mokomstudio-pro.github.io/maison-sable/ (mise à jour en ligne sous 1 à 2 minutes)");
