/**
 * Портфолио выполненных работ — SSOT /raboty/ и блоков «примеры работ».
 *
 * ВАЖНО (SDD 4.3, T-09): обязательны реальные фото «до/после». Пока владелец
 * не передал фотографии, массив пуст — страница показывает честный блок
 * «портфолио пополняется», а не выдуманные объекты.
 * Как только появятся объекты — добавить сюда записи, страница и sitemap
 * подхватят их автоматически.
 */

export interface WorkItem {
  slug: string;
  title: string;
  /** slug услуги: elektrik | shtukaturka | remont | santehnik | demontazh */
  service: string;
  city: string;
  description: string;
  /** Пути от /public, например images/works/borisov-elektrik-1.avif */
  photosBefore: string[];
  photosAfter: string[];
  area?: number;
  duration?: string;
}

export const WORKS: WorkItem[] = [];

/** Фильтр портфолио по услуге (для страниц услуг и /raboty/) */
export function worksByService(service: string): WorkItem[] {
  return WORKS.filter((w) => w.service === service);
}
