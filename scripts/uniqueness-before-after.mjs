#!/usr/bin/env node
/**
 * Честный «до/после» внутреннего шингл-анализа.
 * «До» — старые metadata title/description всех 12 статей (запечатлены при
 * первом запуске extract-blog-seo.mjs до переписи). H1 и тексты статей
 * не менялись, поэтому до/после отличаются только title и description.
 * «После» берётся из свежего data/seo/registry.jsonl.
 *
 * Пишет:
 *   data/seo/uniqueness-internal-before.md  (правдивый снимок «до»)
 *   data/seo/uniqueness-before-after.md     (сравнительная таблица)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const OUT_DIR = join(ROOT, "data", "seo");

// ---------- «ДО»: старые метаданные (до переписи 2026-10-25) ----------

const OLD = {
  "doska-dlya-podachi": {
    title: "Доска для подачи: 5 расстановок (сырная, стейк, закуски) | Крупки Мастер",
    description:
      "Как красиво подать еду на деревянной доске: сырная плато, стейк, закуски к вину, завтрак и праздничный стол. Какая доска для подачи подходит, какой размер нужен и почему дуб.",
  },
  "kak-delayut-dosku-pod-zakaz": {
    title: "Как делают доску под заказ: этапы от лога до готовой доски | Крупки Мастер",
    description:
      "Этапы работы мастерской: выбор дуба, раскрой на ламели, склеивание и пресс, шлифовка, покрытие маслом и воском, гравировка, упаковка и отправка. Почему сделать доску руками самим дольше и дороже.",
  },
  "kak-vybrat-razdelochnuyu-dosku": {
    title: "Как выбрать разделочную доску: дуб, бамбук, пластик, сталь | Крупки Мастер",
    description:
      "Из какого материала выбрать разделочную доску: честное сравнение дуба, бамбука, пластика и стали. Какая доска лучше для мяса, рыба и овощей, какая безопаснее и сколько она служит. Доски из массива дуба под заказ в Беларуси.",
  },
  "menazhnitsa-podarok": {
    title: "Менажница как подарок: 7 сценариев на новоселье, свадьбу и праздник | Крупки Мастер",
    description:
      "Кому и почему дарят менажницу: новоселье, свадьба, юбилей, 8 марта, Новый год. Как выбрать деревянную менажницу из дуба в подарок, что написать при гравировке и в чём она лучше набора посуды.",
  },
  "tortsevaya-razdelochnaya-doska": {
    title: "Торцевая разделочная доска: что это, чем отличается и почему дороже | Крупки Мастер",
    description:
      "Торцевая доска (end grain): что это такое, чем отличается от обычной ламинированной, чем хороша и почему стоит дороже. Строение древесины, срок службы, уход — и где заказать доску из дуба в Беларуси.",
  },
  "uhod-za-doskoy-iz-duba": {
    title: "Как ухаживать за доской из дуба: масло, воск, что нельзя делать | Крупки Мастер",
    description:
      "Как обработать новую деревянную доску, чем покрыть (масло, воск), как часто обновлять пропитку и почему нельзя мыть доску из дуба в посудомойке. Практический гайд с доставкой досок по Беларуси.",
  },
  "chto-takoe-menazhnitsa": {
    title: "Что такое менажница и для чего она нужна | Крупки Мастер",
    description:
      "Менажница — доска для подачи блюд: сыра, мяса, закусок. Что это такое, чем отличается от разделочной доски, как выбрать и использовать. Сервировочные менажницы из дуба с доставкой по Беларуси.",
  },
  "zatochka-cepi-benzopily": {
    title: "Заточка цепи бензопилы: цена, признаки затупления | Крупки Мастер",
    description:
      "Как понять, что цепь бензопилы затупилась, чем опасно пилить тупой цепью и сколько стоит заточка в Беларуси. Углы, станок, ручная работа — доставка почтой по всей РБ.",
  },
  "ugol-zatochki-nozha": {
    title: "Угол заточки ножа: таблица для кухонных, охотничьих ножей | Крупки Мастер",
    description:
      "Какой угол заточки нужен кухонному, охотничьему, складному ножу и ножу мясорубки. Таблица углов, что будет при ошибке в 5 градусов и как мастерская выдерживает угол по всей длине.",
  },
  "ruchnaya-ili-mashinnaya-zatochka": {
    title: "Ручная или машинная заточка ножей: что выбрать в 2026 | Крупки Мастер",
    description:
      "Честное сравнение ручной и машинной заточки ножей: почему машинная за 3 BYN быстро тупится, что такое прецизионная заточка на стемах и когда дешёвая заточка — разумный выбор.",
  },
  "kak-otpravit-instrument-belpochtoy": {
    title: "Как отправить нож на заточку Белпочтой: инструкция | Крупки Мастер",
    description:
      "Пошагово: как упаковать нож, цепь бензопилы или нож мясорубки и отправить на заточку Белпочтой или Европочтой. Стоимость пересылки, наложенный платёж, сроки.",
  },
  "skolko-stoit-zatochka": {
    title: "Сколько стоит заточка ножей в Беларуси: цены 2026 | Крупки Мастер",
    description:
      "Цены на заточку ножей, цепей бензопил и инструмента в Беларуси 2026: Минск, областные города, частные мастера. Таблица цен и за что вы платите.",
  },
};

// ---------- шинглы (та же методика, что в extract-blog-seo.mjs) ----------

const STOP = new Set([
  "и", "в", "на", "с", "о", "а", "не", "для", "по", "от", "до", "у", "к",
  "же", "то", "что", "это", "как", "или",
]);
const tokenize = (s) =>
  s.toLowerCase().replace(/[«»—–"“”,.:;!?()[\]、]/g, " ").split(/\s+/).filter(Boolean).filter((w) => !STOP.has(w));

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

// ---------- new data ----------

const NEW = readFileSync(join(OUT_DIR, "registry.jsonl"), "utf8")
  .trim()
  .split("\n")
  .map((l) => JSON.parse(l));
const newBySlug = Object.fromEntries(NEW.map((a) => [a.slug, a]));
const nShort = 3;

// ---------- вычисления ----------

function analyze(meta) {
  const slugs = Object.keys(meta).sort();
  const pairs = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      const tSim = jaccard(shingles(meta[slugs[i]].title, nShort), shingles(meta[slugs[j]].title, nShort));
      const tdSim = jaccard(
        shingles(`${meta[slugs[i]].title} ${meta[slugs[i]].description}`, nShort),
        shingles(`${meta[slugs[j]].title} ${meta[slugs[j]].description}`, nShort)
      );
      if (tSim > 0.02 || tdSim > 0.02) {
        pairs.push({ a: slugs[i], b: slugs[j], tSim, tdSim });
      }
    }
  }
  pairs.sort((x, y) => y.tSim - x.tSim || y.tdSim - x.tdSim);
  // средний и максимальный уровень
  const allT = [], allTd = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      allT.push(jaccard(shingles(meta[slugs[i]].title, nShort), shingles(meta[slugs[j]].title, nShort)));
      allTd.push(
        jaccard(
          shingles(`${meta[slugs[i]].title} ${meta[slugs[i]].description}`, nShort),
          shingles(`${meta[slugs[j]].title} ${meta[slugs[j]].description}`, nShort)
        )
      );
    }
  }
  const avg = (arr) => arr.reduce((s, x) => s + x, 0) / arr.length;
  const max = (arr) => Math.max(...arr);
  // формулы: 3-граммы в ≥2 статьях (из title+description; префикс | крупки мастер убрать из подсчёта)
  const formulaCount = new Map();
  slugs.forEach((slug) => {
    shingles(`${meta[slug].title.replace(/\s*\|?\s*Крупки Мастер\s*$/, "")} ${meta[slug].description}`, nShort).forEach((g) => {
      formulaCount.set(g, (formulaCount.get(g) || 0) + 1);
    });
  });
  const formulas = [...formulaCount.entries()]
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([g, c]) => ({ g, c }));
  return { pairs, avgT: avg(allT), maxT: max(allT), avgTd: avg(allTd), maxTd: max(allTd), formulas };
}

const before = analyze(OLD);
const afterMeta = Object.fromEntries(NEW.map((a) => [a.slug, { title: a.metadataTitle, description: a.metadataDescription }]));
const after = analyze(afterMeta);

// ---------- отчёты ----------

function renderInternal(label, res) {
  const fmt = (x, field) => `${(x[field] * 100).toFixed(1)}%`;
  return [
    `# Внутренний замер уникальности (${label})`,
    "",
    "Метод: нормализация (стоп-слова удалены), шингл 3 слова, Jaccard. Пары с совпадением >2%.",
    "",
    "## title",
    "",
    "| Пара статей | Сходство |",
    "|---|---|",
    ...res.pairs
      .filter((p) => p.tSim > 0.02)
      .map((p) => `| ${p.a} ↔ ${p.b} | ${fmt(p, "tSim")} |`),
    "",
    "## title+description",
    "",
    "| Пара статей | Сходство |",
    "|---|---|",
    ...res.pairs
      .filter((p) => p.tdSim > 0.02)
      .sort((x, y) => y.tdSim - x.tdSim)
      .map((p) => `| ${p.a} ↔ ${p.b} | ${fmt(p, "tdSim")} |`),
    "",
    "## Шаблонные 3-граммы (без суффикса «| Крупки Мастер», в ≥2 статьях)",
    "",
    ...res.formulas.map((f) => `- "${f.g}" — в ${f.c} статьях`),
    "",
  ].join("\n");
}

writeFileSync(join(OUT_DIR, "uniqueness-internal-before.md"), renderInternal("до переписи (исходные метаданные от 2026-09/10)", before));

const pct = (x) => `${(x * 100).toFixed(1)}%`;

before.pairs.sort((x, y) => y.tdSim - x.tdSim);
after.pairs.sort((x, y) => y.tdSim - x.tdSim);

writeFileSync(
  join(OUT_DIR, "uniqueness-before-after.md"),
  [
    "# Сравнение «до/после» переписи title и description (внутренний замер)",
    "",
    `Методика идентична: стоп-слова удалены, шингл 3 слова, Jaccard; «до» — восстановленные исходные метаданные, «после» — свежий registry.jsonl.`,
    "",
    "| Метрика | Было | Стало |",
    "|---|---|---|",
    `| Средняя парная близость title | ${pct(before.avgT)} | ${pct(after.avgT)} |`,
    `| Максимум парной близости title | ${pct(before.maxT)} | ${pct(after.maxT)} |`,
    `| Средняя парная близость title+description | ${pct(before.avgTd)} | ${pct(after.avgTd)} |`,
    `| Максимум парной близости title+description | ${pct(before.maxTd)} | ${pct(after.maxTd)} |`,
    `| Пары title >5% | ${before.pairs.filter((p) => p.tSim > 0.05).length} | ${after.pairs.filter((p) => p.tSim > 0.05).length} |`,
    `| Шаблонных формул (3-граммы в ≥2, без «| Крупки Мастер») | ${before.formulas.length} | ${after.formulas.length} |`,
    "",
    "## Топ пар «после» (title+description)",
    "",
    "| Пара | Было | Стало |",
    "|---|---|---|",
    ...after.pairs
      .slice(0, 6)
      .map((p) => {
        const was = before.pairs.find((q) => (q.a === p.a && q.b === p.b) || (q.a === p.b && q.b === p.a));
        return `| ${p.a} ↔ ${p.b} | ${was ? pct(Math.max(was.tdSim, was.tSim)) : "—"} | ${pct(p.tdSim)} |`;
      }),
    "",
    "## Формулы «после»",
    "",
    ...after.formulas.map((f) => `- "${f.g}" — в ${f.c} статьях`),
    "",
  ].join("\n")
);

console.log("=== ДО/ПОСЛЕ (внутренний шингл-анализ метаданных) ===");
console.log(`title      avg: ${pct(before.avgT)} -> ${pct(after.avgT)}  max: ${pct(before.maxT)} -> ${pct(after.maxT)}`);
console.log(`title+desc avg: ${pct(before.avgTd)} -> ${pct(after.avgTd)}  max: ${pct(before.maxTd)} -> ${pct(after.maxTd)}`);
console.log(`формул (>=2 статей, без суффикса бренда): ${before.formulas.length} -> ${after.formulas.length}`);
before.formulas.forEach((f) => console.log(`  ДО: "${f.g}" x${f.c}`));
after.formulas.forEach((f) => console.log(`  ПОСЛЕ: "${f.g}" x${f.c}`));
