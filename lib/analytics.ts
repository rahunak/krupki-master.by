/**
 * Отправка конверсионных событий в GA4 (gtag.js подключён в components/GoogleAnalytics.tsx).
 * gtag может быть ещё не инициализирован (ленивая загрузка после первого
 * взаимодействия) — тогда событие кладём в dataLayer: gtag.js разберёт очередь
 * после загрузки.
 */
interface GtagWindow {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  } else {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(["event", name, params ?? {}]);
  }
}
