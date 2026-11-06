import type { Metadata } from "next";
import { SITE_URL } from "@/data/contacts";

/**
 * Единый источник canonical + hreflang для страниц.
 *
 * Зачем: до 2026-11-06 canonical выводился дважды — жёстко прописанный тег
 * в <head> root layout (всегда на главную) плюс alternates.canonical из
 * метаданных страницы. Поисковик получал противоречивый сигнал.
 * Теперь canonical задаётся ТОЛЬКО здесь, на каждой странице, и всегда
 * self-referencing (см. sdd.html, T-01).
 *
 * hreflang: ru / ru-BY / x-default указывают на тот же URL (self-referencing),
 * а не на главную — требование SDD 3.6.
 *
 * path всегда передаётся с завершающим слэшем (единый формат URL, SDD 2.4).
 */
export function pageAlternates(path: string): Metadata["alternates"] {
  const url = `${SITE_URL}${path}`;
  return {
    canonical: url,
    languages: {
      ru: url,
      "ru-BY": url,
      "x-default": url,
    },
  };
}
