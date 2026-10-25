#!/usr/bin/env node
/**
 * Этап 1-2 задачи уникальности: извлечение title/h1/description/текста
 * всех статей блога в реестр + внутренний шингл-анализ совпадений.
 *
 * Usage: node scripts/extract-blog-seo.mjs
 * Output:
 *   data/seo/registry.jsonl                 — реестр (1 строка = 1 статья)
 *   data/seo/registry.md                    — читаемая сводка
 *   data/seo/uniqueness-internal.md         — отчёт внутреннего шингл-анализа
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const BLOG_DIR = join(ROOT, "app", "blog");
const OUT_DIR = join(ROOT, "data", "seo");

// ---------- вспомогательные ----------

function matchStr(src, name, rangeStart, rangeEnd) {
  // ищет name: "..."/'...'/`...` внутри диапазона [rangeStart..rangeEnd)
  const re = new RegExp(`${name}\\s*:\\s*\\n?\\s*(?:"([^"]*)"|'([^']*)'|\`([^\`]*)\`)`, "s");
  const seg = src.slice(rangeStart, rangeEnd);
  const m = seg.match(re);
  if (!m) return undefined;
  return m[1] ?? m[2] ?? m[3];
}

/** Извлечение полей metadata- и META-блоков из TSX статьи */
function extractArticle(slug, src) {
  const metaStart = src.indexOf("export const metadata");
  const metaEnd = src.indexOf("};", metaStart);
  const metaStart2 = src.indexOf("const META");
  const metaEnd2 = src.indexOf("};", metaStart2);

  const mdTitle = matchStr(src, "title", metaStart, metaEnd);
  const mdDescription = matchStr(src, "description", metaStart, metaEnd);
  const metaTitle = matchStr(src, "title", metaStart2, metaEnd2);
  const metaDescription = matchStr(src, "description", metaStart2, metaEnd2);
  const h1 = matchStr(src, "h1", metaStart2, metaEnd2);
  const publishedAt = matchStr(src, "publishedAt", metaStart2, metaEnd2);

  // тело статьи: содержимое <ArticleLayout ...> ... </ArticleLayout>
  const bodyStart = src.indexOf("<ArticleLayout");
  const bodyEnd = src.lastIndexOf("</ArticleLayout>");
  let bodyHtml = "";
  if (bodyStart !== -1 && bodyEnd > bodyStart) {
    bodyHtml = src.slice(src.indexOf(">", bodyStart) + 1, bodyEnd);
  }

  // чистим JSX: удаляем теги, <br/>, выражения в фигурных скобках; Link -> текст ссылки
  const text = bodyHtml
    .replace(/<Link\b[^>]*>((?:[^<]|<(?!\/Link>))*?)<\/Link>/gs, "$1")
    .replace(/<h([1-6])\b[^>]*>/gi, "\n\n[[H$1]] ")
    .replace(/<\/h[1-6]>/gi, " \n\n")
    .replace(/<li\b[^>]*>/gi, "\n- ")
    .replace(/<\/(p|li|ul|table|thead|tr)>/gi, "\n")
    .replace(/<\/tr>|<\/td>|<\/th>/gi, " | ")
    .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
    .replace(/\{[^{}]*\}/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return {
    slug,
    path: `app/blog/${slug}/page.tsx`,
    metadataTitle: mdTitle,
    metadataDescription: mdDescription,
    cardTitle: metaTitle,
    cardDescription: metaDescription,
    h1,
    publishedAt,
    titleMismatch: mdTitle !== metaTitle,
    descriptionMismatch: mdDescription !== metaDescription,
    bodyText: text,
    bodyWordCount: text.split(/\s+/).filter(Boolean).length,
  };
}

// ---------- шинглы ----------

const STOP = new Set(["и", "в", "на", "с", "о", "а", "не", "для", "по", "от", "до", "у", "к", "о", "же", "то", "что", "это", "как", "или"]);
const tokenize = (s) =>
  s.toLowerCase().replace(/[«»—–"“”,.:;!?()\[\]、]/g, " ").split(/\s+/).filter(Boolean).filter((w) => !STOP.has(w));

/** шинглы n слов */
function shingles(text, n) {
  const words = tokenize(text);
  const out = new Set();
  for (let i = 0; i + n <= words.length; i++) out.add(words.slice(i, i + n).join(" "));
  return out;
}

function jaccard(a, b) {
  if (a.size === 0 && b.size === 0) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

/** самый длинный общий n-граммный кусок (в словах) */
function longestCommonRun(textA, textB, minN = 4) {
  const wa = tokenize(textA);
  const wb = tokenize(textB);
  let best = null;
  for (let i = 0; i < wa.length - minN + 1; i++) {
    for (let j = 0; j < wb.length - minN + 1; j++) {
      let len = 0;
      while (i + len < wa.length && j + len < wb.length && wa[i + len] === wb[j + len]) len++;
      if (len >= minN && (!best || len > best.len)) best = { len, a: wa.slice(i, i + len).join(" ") };
    }
  }
  return best;
}

// ---------- main ----------

mkdirSync(OUT_DIR, { recursive: true });

const slugs = readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "node_modules")
  .map((d) => d.name)
  .sort();

const articles = slugs
  .filter((s) => existsSync(join(BLOG_DIR, s, "page.tsx")))
  .map((s) => extractArticle(s, readFileSync(join(BLOG_DIR, s, "page.tsx"), "utf8")));

const nText = 5; // шингл 5 слов для текстов
const nShort = 3; // шингл 3 слов для title/h1/description

articles.forEach((a) => {
  a.shinglesText = [...shingles(a.bodyText, nText)];
  a.shinglesH1 = [...shingles(a.h1 ?? "", nShort)];
  a.shinglesCard = [...shingles(`${a.cardTitle ?? ""} ${a.h1 ?? ""} ${a.cardDescription ?? ""}`, nShort)];
});

// --- реестр ---
const registryPath = join(OUT_DIR, "registry.jsonl");
writeFileSync(
  registryPath,
  articles
    .map((a) =>
      JSON.stringify({
        slug: a.slug,
        path: a.path,
        metadataTitle: a.metadataTitle,
        metadataDescription: a.metadataDescription,
        cardTitle: a.cardTitle,
        cardDescription: a.cardDescription,
        h1: a.h1,
        publishedAt: a.publishedAt,
        titleMismatch: a.titleMismatch,
        descriptionMismatch: a.descriptionMismatch,
        bodyWords: a.bodyWordCount,
        bodyText: a.bodyText,
      })
    )
    .join("\n") + "\n"
);

// --- md-сводка реестра ---
const mdRows = articles
  .map(
    (a) =>
      `| ${a.slug} | ${a.titleMismatch ? "⚠️" : "✅"} | ${a.descriptionMismatch ? "⚠️" : "✅"} | ${a.bodyWordCount} | [[${a.metadataTitle}]] |`
  )
  .join("\n");

writeFileSync(
  join(OUT_DIR, "registry.md"),
  [
    "# Реестр статей блога krupki-master.by",
    "",
    `Статей: ${articles.length}. Полнотекстовые данные — в registry.jsonl.`,
    "",
    "| slug | title metadata==META | desc metadata==META | слов в статье | metadata.title |",
    "|---|---|---|---|---|",
    mdRows,
    "",
    "## Полные тексты метаданных по статьям",
    "",
    ...articles.map(
      (a) =>
        `### ${a.slug}\n- **metadata.title:** ${a.metadataTitle}\n- **metadata.description:** ${a.metadataDescription}\n- **META.title (карточка):** ${a.cardTitle}\n- **h1:** ${a.h1}\n- **META.description:** ${a.cardDescription}\n- **итог:** metadata==META title: ${a.titleMismatch ? "РАЗНОЧТЕНИЕ" : "совпадает"}; description: ${a.descriptionMismatch ? "РАЗНОЧТЕНИЕ" : "совпадает"}`
    ),
  ].join("\n")
);

// --- внутренний шингл-анализ ---

function pairwise(fieldGetter, label, shingleN, list) {
  const rows = [];
  const per = new Map();
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const A = shingles(fieldGetter(list[i]), shingleN);
      const B = shingles(fieldGetter(list[j]), shingleN);
      const sim = jaccard(A, B);
      if (sim > 0.02) rows.push({ a: list[i].slug, b: list[j].slug, sim });
      per.set(list[i].slug, per.get(list[i].slug) || 0);
      per.set(list[j].slug, per.get(list[j].slug) || 0);
    }
  }
  rows.sort((x, y) => y.sim - x.sim);
  return { rows, label };
}

const comparisons = [
  pairwise((a) => a.metadataTitle ?? "", "title (metadata)", nShort, articles),
  pairwise((a) => `${a.metadataTitle ?? ""} ${a.metadataDescription ?? ""}`, "title+description (metadata)", nShort, articles),
  pairwise((a) => a.h1 ?? "", "H1", nShort, articles),
  pairwise((a) => a.bodyText, `текст статьи (шингл ${nText} слов)`, nText, articles),
];

// самый длинный общий кусок для топ-пересечений текстов
const textComp = comparisons[3];
const topTextPairs = textComp.rows.slice(0, 8).map((r) => {
  const A = articles.find((a) => a.slug === r.a).bodyText;
  const B = articles.find((a) => a.slug === r.b).bodyText;
  const lcs = longestCommonRun(A, B, 5);
  return { ...r, common: lcs ? lcs.a : "—" };
});

// шаблонные n-граммы: встречаются в ≥2 статьях (по metadata title+h1+description)
const formulaCount = new Map();
articles.forEach((a) => {
  const grams = shingles(`${a.metadataTitle ?? ""} ${a.h1 ?? ""} ${a.metadataDescription ?? ""}`, 3);
  grams.forEach((g) => {
    formulaCount.set(g, (formulaCount.get(g) || 0) + 1);
  });
});
const formulas = [...formulaCount.entries()]
  .filter(([, c]) => c >= 2)
  .sort((a, b) => b[1] - a[1])
  .map(([g, c]) => `- "${g}" — в ${c} статьях`);

writeFileSync(
  join(OUT_DIR, "uniqueness-internal.md"),
  [
    "# Внутренний замер уникальности (шингл-анализ)",
    "",
    `Метод: нормализация (стоп-слова «и/в/на/...» удалены), шинглы: тексты — ${nText} слов, метаданные — ${nShort} слов; метрика — Jaccard. Показаны пары с совпадением > 2%.`,
    "",
    ...comparisons.map(
      (c) =>
        [
          `## ${c.label}`,
          "",
          "| Пара статей | Сходство |",
          "|---|---|",
          ...c.rows.map(
            (r) =>
              `| ${r.a} ↔ ${r.b} | ${(r.sim * 100).toFixed(1)}% |`
          ),
          "",
        ].join("\n")
    ),
    "## Самые длинные общие куски текстов (топ-8 пар)",
    "",
    ...topTextPairs.map((r) => `- ${r.a} ↔ ${r.b} (${(r.sim * 100).toFixed(1)}%): «${r.common}»`),
    "",
    "## Шаблонные 3-граммы в метаданных (встречаются в ≥2 статьях)",
    "",
    ...formulas,
  ].join("\n")
);

console.log(`Извлечено статей: ${articles.length}`);
console.log(`Реестр: ${registryPath}`);
articles.forEach((a) => {
  const flags = [a.titleMismatch ? "title≠" : "", a.descriptionMismatch ? "desc≠" : ""].filter(Boolean).join(' ');
  console.log(`  ${a.slug.padEnd(36)} ${String(a.bodyWordCount).padStart(4)} слов ${flags}`);
});
