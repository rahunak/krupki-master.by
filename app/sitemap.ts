import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES } from "@/data/routes";
import { SITE_URL } from "@/data/contacts";

/**
 * sitemap.xml (SDD 3.4, T-29).
 *
 * Источник — data/routes.ts (тот же список использует proxy для канонизации
 * слэшей и /api/indexnow). Единый формат: все URL со слэшем в конце.
 * lastmod — реальная дата изменения страницы из списка, а не дата генерации.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
