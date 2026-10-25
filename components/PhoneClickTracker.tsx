'use client'

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Глобальный трекер кликов по телефонным ссылкам: делегированный слушатель на
 * document ловит все клики по a[href^="tel:"] — не нужно править каждую кнопку
 * отдельно (шапка, футер, статьи и т.д.). Клики по уже обёрнутым обработчикам не
 * задваиваются: событие шлёт либо обработчик, либо этот трекер.
 *
 * Кнопки, которые сами шлют tel_click, помечаются data-tel-tracked — трекер их
 * пропускает.
 */
export default function PhoneClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;
      if ((link as HTMLElement).dataset.telTracked) return;

      const label = (link as HTMLElement).dataset.telSource || "link";
      trackEvent("tel_click", { location: label, page_path: window.location.pathname });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
