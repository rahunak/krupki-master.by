"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

/**
 * Свайп-галерея карточки изделия — mobile-first (Вариант B).
 * Механика: нативный scroll-snap + touch — без JS-свайпов и без зависимостей.
 * Десктоп: тот же track (свайп мышью/тачпадом) + кликабельные точки-индикаторы.
 *
 * Фото: реальные файлы из /public/images/<slug>.avif (см. data/boards.ts → photos).
 * Плейсхолдеров больше нет; alt и подписи-ракурсы генерируются из altBase.
 */

export interface GalleryPhoto {
  /** Путь в /public/images/ без префикса и расширения, напр. "small_board_1.avif" */
  slug: string;
  /** Подпись-ракурс, напр. "Доска целиком" */
  label: string;
}

export default function ProductPhotoGallery({
  photos,
  altBase,
  labels,
  priority = false,
}: {
  photos: string[];
  labels: string[];
  altBase: string;
  /** Первый слайд карточек первого экрана — LCP-кандидат, пропускает lazy-loading */
  priority?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setCurrent(Math.max(0, Math.min(photos.length - 1, idx)));
  }, [photos.length]);

  const goTo = useCallback((idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  }, []);

  return (
    <div className="relative -mx-6 -mt-6 mb-4 select-none">
      {/* Track: scroll-snap, один слайд = ширина карточки */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: "none" }}
        role="group"
        aria-label={`Фото изделия: ${altBase}`}
        tabIndex={0}
      >
        {photos.map((slug, i) => (
          <div
            key={slug}
            className="w-full shrink-0 snap-center"
            style={{ scrollSnapAlign: "center" }}
          >
            {/* Пропорции квадратно-портретного оригинала — фото не обрезается,
                товар целиком в кадре; фон повторяет фон карточки */}
            <div className="relative aspect-[5/5.2] max-h-[420px] w-full bg-[#191613] border-y border-white/[0.06]">
              <Image
                src={`/${slug}`}
                alt={`${altBase} — ракурс ${i + 1}: ${labels[i] ?? "фото"}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 32rem"
                priority={priority && i === 0}
                loading={priority && i === 0 ? undefined : "lazy"}
                className="object-contain"
              />
              <span className="m-4 absolute bottom-0 left-0 rounded-[2px] bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#8B94A3] backdrop-blur-sm z-10">
                {labels[i] ?? "Фото"} · {i + 1}/{photos.length}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Точки-индикатор (кликабельны, белый с тёмной обводкой — контраст на любом фото) */}
      {photos.length > 1 && (
        <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
          {photos.map((slug, i) => (
            <button
              key={slug}
              onClick={() => goTo(i)}
              aria-label={`Фото ${i + 1} из ${photos.length}`}
              aria-current={current === i}
              className="cursor-pointer"
            >
              <span
                className={`block h-1.5 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.6)] transition-all duration-200 ${current === i
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/85"
                  }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
