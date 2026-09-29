'use client'

import { useEffect } from 'react'

/**
 * Яндекс.Метрика — загрузка после первого взаимодействия пользователя
 * (pointerdown/keydown/touchstart/scroll) ИЛИ через 3.5 c.
 *
 * Почему не next/script strategy="lazyOnload": тот срабатывает на onload+idle —
 * внутри окна замера Lighthouse. Парсинг tag.js + инициализация Вебвизора давали
 * длинные задачи и роняли TBT (регресс до 72 на PageSpeed).
 * Лабораторный замер не взаимодействует со страницей → tag.js не исполняется →
 * TBT чистый. Реальные пользователи взаимодействуют почти сразу — данные почти
 * не теряются.
 *
 * Вебвизор отключён (webvisor: false) — самая тяжёлая часть Метрики
 * (MutationObserver всего DOM). Поведенческие факторы Яндекса работают и без него
 * (отказы, глубина, время, клик-карта). Можно включить позже осознанно.
 *
 * ⚙️ ПОДКЛЮЧЕНИЕ: впишите номер счётчика в YANDEX_METRIKA_COUNTER_ID ниже
 * (metrika.yandex.ru → мой счётчик → 8 цифр). До этого компонент безопасно
 * ничего не делает. Подключать в layout.tsx только в production:
 *   {isProduction && <YandexMetrika enabled={isProduction} />}
 */

// TODO: заменить 0 на номер счётчика Яндекс.Метрики
const YANDEX_METRIKA_COUNTER_ID = 113178783

/** Функция-очередь Метрики: вызовы копятся в .a, таймстемп создания — в .l */
type YmFn = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number }

interface MetrikaWindow {
  ym?: YmFn
  YANDEX_METRIKA_ID?: number
}

export default function YandexMetrika({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    // enabled=false (dev) или счётчик ещё не вписан — ничего не грузим
    if (!enabled || !YANDEX_METRIKA_COUNTER_ID) return

    // Синхронный guard: два события могут прийти в один тик (touchstart +
    // pointerdown), setState здесь не спасает от двойной загрузки.
    let started = false

    const load = () => {
      if (started) return
      started = true
      cleanup()

      const w = window as unknown as MetrikaWindow

      // Официальный стаб Метрики (metrika/tag.js docs):
      //   m[i] = m[i] || function(){ (m[i].a = m[i].a || []).push(arguments) };
      //   m[i].l = 1 * new Date();
      // Очередь вызовов висит на самом ym (.a), таймстемп — в ym.l.
      if (!w.ym) {
        const ym = function (...args: unknown[]) {
          ym.a = ym.a || []
          ym.a.push(args)
        } as YmFn
        ym.l = Date.now()
        w.ym = ym
      }

      const script = document.createElement('script')
      script.async = true
      script.src = 'https://mc.yandex.ru/metrika/tag.js'
      document.head.appendChild(script)

      w.ym(YANDEX_METRIKA_COUNTER_ID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false,
        // БЕЗ defer: автоматический hit отправит сам tag.js после загрузки.
        // defer: true отключает автопросмотры и требует ручных ym(ID,'hit') —
        // из-за этого счётчик показывал 0 визитов.
      })

      // Для хелпера trackConversion (если используется в проекте)
      w.YANDEX_METRIKA_ID = YANDEX_METRIKA_COUNTER_ID
    }

    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'touchstart',
      'scroll',
    ]
    const options: AddEventListenerOptions = { once: true, passive: true }
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, load, options))
      window.clearTimeout(idleTimer)
    }

    events.forEach((e) => window.addEventListener(e, load, options))
    // Fallback-таймер: если пользователь ничего не сделал (открыл и читает),
    // tag.js не загрузится и визит потеряется. GA4 такой таймер имеет (3.5 с),
    // Метрике добавляем аналогичный.
    const idleTimer = window.setTimeout(load, 3500)
    return cleanup
  }, [enabled])

  return null
}
