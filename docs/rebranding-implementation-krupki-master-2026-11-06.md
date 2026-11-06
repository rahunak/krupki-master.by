# Ребрендинг krupki-master.by: отчёт по имплементации SDD

**Дата:** 6 ноября 2026
**Документ-источник:** `krupki-master.by/sdd.html` (пометки о выполнении внесены в раздел 9)
**Проект:** `krupki-master.by/krupki-master_by_nextjs` (Next.js 16.3.1, App Router)
**Статус:** код готов и проверен на локальной production-сборке. **Не закоммичен и не задеплоен** — коммит и деплой делает владелец.

---

## 1. Что сделано

### Этап 0 — фундамент (T-01, T-05, T-06)

| Задача | Статус | Что сделано |
|---|---|---|
| T-01 | ПРОВЕРЕНО | Из `app/layout.tsx` удалён жёсткий `<link rel="canonical">` и hreflang. Единственный источник canonical — `lib/seo.ts::pageAlternates(path)`; все 18 существующих страниц переведены на него |
| T-02 | ПРОВЕРЕНО (локально) | На всех 31 публичных URL ровно один self-referencing canonical. В Search Console результат не зафиксирован — нет доступа |
| T-03, T-04 | БЛОКЕР | Нет доступа к GSC и Яндекс.Вебмастеру: переобход и проверка индексации через 7 дней — за владельцем |
| T-05 | ПРОВЕРЕНО | Единый формат URL со слэшем: `trailingSlash: true`, 301 на слэш-форму для известных маршрутов из `data/routes.ts`, 301 `/elektrik` и `/elektrik/` → `/uslugi/elektrik/` |
| T-06 | ПРОВЕРЕНО | Полезная страница `app/not-found.tsx`; несуществующий путь отдаёт 404 напрямую, без прежней 308-цепочки |

### Этап 2 — раздел услуг (T-12…T-17)

- `data/services.ts` — единый источник трёх услуг: слаг, заголовки, интенты, список работ, города, FAQ.
- `components/services/`: `ServicePageLayout`, `ServiceCard`, `ServiceForm`, `ServiceZone`, `PriceBlock`, `TrustBar`, `FAQBlock`, `CTA`.
- Страницы: `/uslugi/` (хаб), `/uslugi/elektrik/`, `/uslugi/shtukaturka/`, `/uslugi/remont/`.
- T-17: форма заявки упрощена до трёх полей — услуга, город (необязательно), телефон; комментарий и выбор канала связи убраны. В `lib/types/telegram.ts` и `lib/telegram.ts` добавлено поле `service`, заголовок уведомления — «Новая заявка с сайта».
- **Цены услуг не выдуманы:** `priceFrom: null` → в интерфейсе «по запросу», в Service JSON-LD блок `offers` не выводится. Меняется одной правкой `data/services.ts` после прайса владельца.
- T-15 частично: страница штукатурки готова, портфолио пустое — реальных фото нет. Для страниц услуг подобраны иллюстрации с открытой лицензией (см. раздел «Фото услуг»).

### Этап 3 — мастерская (T-18, T-19)

- `data/zatochka.ts` — прайс мастерской (4 / 12 / 9 / 9 / 5 BYN), этапы доставки, FAQ, три подстраницы.
- Страницы: `/zatochka/`, `/zatochka/nozhi/`, `/zatochka/cepi-benzopil/`, `/zatochka/instrument/`; компоненты `zatochka/PriceTable`, `zatochka/ZatochkaPageLayout`.

### Этап 4 — главная (T-20, T-21)

- `app/page.tsx` и `components/sections/Hero.tsx` переписаны под заказ услуг: электрика, штукатурка, отделка. Убраны блок равноправных направлений `DirectionSplit` и витрина цен мастерской — главная продаёт только услуги с выездом. Контент заточки полностью доступен на `/zatochka/`, дерево — на `/doski/`.

### Фото услуг

- Подобраны иллюстрации с открытой лицензией (Unsplash License / Pexels License): `public/images/services/elektrik.webp`, `shtukaturka.webp`, `remont.webp`; фон главной — `public/hero-uslugi.webp`. Источники и авторы — `public/images/services/SOURCES.md`.
- На страницах услуг фото подписано «Иллюстрация вида работ, а не пример выполненного объекта» — стоковые снимки не выдаются за портфолио. OG-изображения страниц услуг также заменены на профильные фото.

### Этап 5 — служебные страницы (T-22…T-25)

- `/raboty/` — галерея работ с честным пустым состоянием (`data/works.ts` → `WORKS = []`).
- `/ceny/` — сводная таблица: средние цены по рынку Беларуси для услуг с выездом (`data/market-prices.ts`) и точный прайс мастерской. На странице прямо указано, что средние цифры — ориентир, а не оферта.
- `/o-mastere/`, `/kontakty/` — зона выезда, контакты, реквизиты; карта — ссылкой на Яндекс.Карты.

### Этап 6 — навигация и разметка (T-26…T-30)

- Меню: Услуги / Работы / Цены / Мастерская; футер с двумя направлениями (`Header.tsx`, `Footer.tsx`, `MobileCTA.tsx`).
- JSON-LD: `Service`, `BreadcrumbList`, `OfferCatalog`, `FAQPage`; `LocalBusiness` — `areaServed` на 4 города, `priceRange` = «от 4 BYN».
- `app/sitemap.ts` и `app/api/indexnow/route.ts` генерируются из `data/routes.ts` (31 URL, все со слэшем). `robots.ts` не менялся — новые разделы не блокируются.

### Этап 7 — контент (T-31)

- Блог разбит на категории «Дерево и посуда» / «Заточка» (`app/blog/page.tsx`), внутренние ссылки приведены к слэш-форме.

---

## 2. Как проверено

Локальная production-сборка: `npm run build` → `next start -p 3210`.

| Проверка | Результат |
|---|---|
| `npx tsc --noEmit` | 0 ошибок |
| `npm run build` | успешно, 37 маршрутов + Proxy |
| Все 31 URL из `data/routes.ts` | 200, ровно 1 `rel="canonical"`, self-referencing, со слэшем |
| `hreflang` | ru / ru-BY / x-default → тот же URL (в HTML выводятся как `hrefLang`) |
| `sitemap.xml` | 31 `<url>`, все со слэшем, `lastmod` из `data/routes.ts` |
| `/uslugi`, `/doski`, `/blog`, `/blog/<slug>`, `/ceny`, `/raboty`, `/kontakty` | 301 → слэш-форма, один хоп, финал 200 |
| `/CENY` | 301 → `/ceny/` |
| `/elektrik`, `/elektrik/` | 301 → `/uslugi/elektrik/`, 200 |
| `/net-takoy-stranicy` и `/net-takoy-stranicy/` | 404 напрямую, 0 редиректов |
| `/api/redirect?to=https://evil.com` | 404 (whitelist путей, открытого редиректа нет) |

---

## 3. Отклонения от SDD и технические решения

1. **301 на слэш-форму отдаёт `app/api/redirect/route.ts`, а не `redirects()`/`proxy` напрямую.**
   Причина (проверено): Next 16 переписывает `Location` у редиректа, если цель отличается от запроса только завершающим слэшем (`/uslugi` → `Location: /uslugi`), — получалась бесконечная петля. Ответ route-хендлера отдаётся как есть. Proxy делает внутренний rewrite на хендлер, для клиента и поисковика это один обычный 301. Whitelist целей — `PUBLIC_PATHS` из `data/routes.ts`.
2. **Два флага в `next.config.ts` обязательны:** `skipTrailingSlashRedirect: true` (иначе Next ставит 308 на любой путь, включая несуществующие) и `skipProxyUrlNormalize: true`. Убирать их нельзя — сломается канонизация.
3. **Карта на `/kontakty/` — ссылка на Яндекс.Карты, а не iframe.** Iframe без ключа API нестабилен, точные координаты не подтверждены владельцем. ДОПУЩЕНИЕ.
4. **`priceRange` = «от 4 BYN»** — по действующему прайсу заточки. ДОПУЩЕНИЕ до прайса владельца.
5. **`/uslugi/santehnik/` и `/uslugi/demontazh/` не создавались** (этап 8). На хабе показаны текстом без ссылок, чтобы не плодить 404.
6. **Отзывы (Review) не размечены** — реальных отзывов нет, выдумывать нельзя.
7. **Расхождение в ценах заточки требует решения владельца:** прайс-блок даёт «кухонный нож от 4 BYN», статья `/blog/skolko-stoit-zatochka/` — «от 10 BYN». На `/zatochka/` использованы цены прайс-блока.

---

## 4. Порядок релиза (коммиты делает владелец)

SDD 3.8 требует не выкатывать фикс canonical и канонизацию слэшей одним коммитом. Предлагаемое разбиение:

**Шаг 1 — только canonical (T-01):**
`app/layout.tsx`, `lib/seo.ts`, миграция `alternates` в 18 существующих страницах (`app/blog/**`, `app/doski/**`), `components/blog/ArticleLayout.tsx`.

**Шаг 2 — слэши, 404, новые разделы (через 3–7 дней после проверки шага 1):**
`next.config.ts`, `proxy.ts`, `app/api/redirect/`, `app/not-found.tsx`, `data/{routes,services,works,zatochka}.ts`, `components/{services,zatochka}/**`, `app/{uslugi,zatochka,raboty,ceny,o-mastere,kontakty}/**`, `app/sitemap.ts`, `app/api/indexnow/route.ts`, `app/page.tsx`, `app/blog/page.tsx`, `components/{header,footer,sections}/**`, `lib/types/telegram.ts`, `lib/telegram.ts`, `app/api/telegram/notify/route.ts`.

После деплоя шага 2: переобход sitemap в GSC и Вебмастере, проверка 301 на живом домене (`curl -I`), проверка отправки формы в Telegram.

---

## 5. Что осталось и чей это блокер

| Задача | Блокер |
|---|---|
| T-03, T-04 — переобход и индексация | доступ к GSC / Вебмастеру |
| T-07, T-08 — Google Business Profile, Яндекс.Бизнес | владелец |
| T-09 — 10+ фото работ | владелец (иллюстрации услуг уже стоят, но портфолио требует реальных объектов) |
| T-10 — прайс по услугам | владелец; сейчас на `/ceny/` стоят средние по рынку (`data/market-prices.ts`), их нужно заменить утверждённым прайсом |
| T-11 — подрядчики | владелец |
| T-22 — 5+ объектов в `/raboty/` | фото и описания от владельца |
| T-30 — Core Web Vitals | Lighthouse не запускался, нужен замер на живом домене |
| T-32 — 5 статей под услуги | контент, нужен фактаж владельца |
| T-33…T-37 — внешние площадки, соцсети, отзывы | владелец |
| T-38, T-39 — этап 8 | решение владельца, данные за 2–3 месяца |

---

## 6. Замечания по коду

- `scripts/apply-alternates.mjs` — разовый скрипт миграции `alternates`; после ревью его можно удалить (удаление в `scripts/**` разрешено, в app-коде — нет).
- После переписывания главной не используются `components/sections/HowItWorks.tsx`, `Pricing.tsx`, `FAQ.tsx`, `OrderForm.tsx`. Удалять их запрещено правилами проекта — оставлены как есть.
