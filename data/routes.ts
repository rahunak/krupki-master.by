/**
 * Публичные URL сайта — единый источник для sitemap.xml, proxy (канонизация
 * слэшей) и IndexNow. Все пути — со завершающим слэшем (SDD 2.4, 3.4).
 *
 * lastmod — реальная дата изменения страницы, а не дата генерации sitemap
 * (SDD 3.4). При правке контента страницы дату нужно обновлять.
 */

export const BLOG_POSTS = [
  // Новое направление — услуги с выездом (позиционирование с 06.11.2026)
  "skolko-stoit-zamena-provodki",
  "chto-podarit-na-novyi-god",
  "uspet-zakazat-podarok-na-novyi-god",
  "doska-dlya-podachi",
  "kak-delayut-dosku-pod-zakaz",
  "kak-vybrat-razdelochnuyu-dosku",
  "menazhnitsa-podarok",
  "tortsevaya-razdelochnaya-doska",
  "uhod-za-doskoy-iz-duba",
  "chto-takoe-menazhnitsa",
  "zatochka-cepi-benzopily",
  "ugol-zatochki-nozha",
  "ruchnaya-ili-mashinnaya-zatochka",
  "kak-otpravit-instrument-belpochtoy",
  "skolko-stoit-zatochka",
] as const;

export interface PublicRoute {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  lastModified: string;
}

const NEW_PAGE_DATE = "2026-11-06";
const OLD_PAGE_DATE = "2026-11-04";

/** Даты новых статей для sitemap: остальные статьи остаются на OLD_PAGE_DATE */
const BLOG_POST_DATES: Record<string, string> = {
  "skolko-stoit-zamena-provodki": "2026-11-06",
};

export const PUBLIC_ROUTES: PublicRoute[] = [
  // Главная — заказ бытовых услуг
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },

  // Направление 1 — бытовые услуги
  { path: "/uslugi/", priority: 0.9, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },
  { path: "/uslugi/elektrik/", priority: 0.8, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },
  { path: "/uslugi/santehnik/", priority: 0.8, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },
  { path: "/uslugi/shtukaturka/", priority: 0.8, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },
  { path: "/uslugi/remont/", priority: 0.8, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },

  // Направление 2 — мастерская (заточка)
  { path: "/zatochka/", priority: 0.9, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },
  { path: "/zatochka/nozhi/", priority: 0.8, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },
  { path: "/zatochka/cepi-benzopil/", priority: 0.8, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },
  { path: "/zatochka/instrument/", priority: 0.8, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },

  // Служебные страницы
  // /raboty/ убрана из sitemap: портфолио пустое (data/works.ts), страница в noindex.
  // Вернуть строку, когда появятся реальные объекты.
  { path: "/ceny/", priority: 0.7, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },
  { path: "/o-mastere/", priority: 0.6, changeFrequency: "monthly", lastModified: NEW_PAGE_DATE },
  { path: "/kontakty/", priority: 0.6, changeFrequency: "monthly", lastModified: NEW_PAGE_DATE },

  // Изделия из дерева — без изменений
  { path: "/doski/", priority: 0.8, changeFrequency: "weekly", lastModified: OLD_PAGE_DATE },
  { path: "/doski/razdelochnye/", priority: 0.7, changeFrequency: "weekly", lastModified: OLD_PAGE_DATE },
  { path: "/doski/menazhnitsy/", priority: 0.7, changeFrequency: "weekly", lastModified: OLD_PAGE_DATE },

  // Блог (обновлён под услуги 06.11.2026)
  { path: "/blog/", priority: 0.8, changeFrequency: "weekly", lastModified: NEW_PAGE_DATE },
  ...BLOG_POSTS.map<PublicRoute>((slug) => ({
    path: `/blog/${slug}/`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: BLOG_POST_DATES[slug] ?? OLD_PAGE_DATE,
  })),
];

/** Все публичные пути как есть (со слэшем) — whitelist целей редиректа */
export const PUBLIC_PATHS: ReadonlySet<string> = new Set(PUBLIC_ROUTES.map((r) => r.path));

/** Пути без завершающего слэша — для канонизации в proxy */
export const ROUTES_WITHOUT_SLASH: ReadonlySet<string> = new Set(
  PUBLIC_ROUTES.map((r) => r.path).filter((p) => p !== "/").map((p) => p.replace(/\/$/, ""))
);
