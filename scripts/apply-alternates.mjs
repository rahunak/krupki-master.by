/**
 * Разовая миграция: canonical/hreflang существующих страниц → pageAlternates()
 * (SDD 3.1, 3.6, T-01/T-05/T-30).
 *
 * Меняет `alternates: { canonical: "..." }` на `alternates: pageAlternates("/path/")`
 * и добавляет импорт хелпера. Запуск: node scripts/apply-alternates.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const blogDirs = readdirSync("app/blog", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => `app/blog/${d.name}/page.tsx`);

const files = [
  "app/doski/page.tsx",
  "app/doski/razdelochnye/page.tsx",
  "app/doski/menazhnitsy/page.tsx",
  "app/blog/page.tsx",
  ...blogDirs,
];

const SITE = "https://krupki-master.by";

for (const file of files) {
  let src = readFileSync(file, "utf8");
  const re = /alternates:\s*\{\s*canonical:\s*(`[^`]+`|"[^"]+")\s*\}/;
  const m = src.match(re);
  if (!m) {
    console.log(`SKIP (нет alternates): ${file}`);
    continue;
  }

  let raw = m[1].trim();
  raw = raw.replace(/^[`"]|[`"]$/g, "");
  const path = raw.replace("${SITE_URL}", SITE).replace(SITE, "");
  const normalized = path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;

  src = src.replace(re, `alternates: pageAlternates("${normalized}")`);

  if (!src.includes('from "@/lib/seo"')) {
    // вставляем импорт после последней строки импорта
    const lines = src.split("\n");
    let last = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("import ")) last = i;
      // многострочный импорт: закрывающая `} from "...";`
      if (last >= 0 && /^\} from ["'].*;?$/.test(lines[i])) last = i;
    }
    lines.splice(last + 1, 0, 'import { pageAlternates } from "@/lib/seo";');
    src = lines.join("\n");
  }

  writeFileSync(file, src);
  console.log(`OK ${file} → ${normalized}`);
}
