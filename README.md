# Krupki Master — Next.js 16.3.1

Сайт мастерской по заточке ножей в Крупках с доставкой по Беларуси.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Создайте `.env.local` (или обновите существующий):

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

**Важно:** Получите credentials из [Supabase Dashboard](https://supabase.com) → Settings → API

Подробная инструкция: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### 3. Запуск dev сервера

```bash
npm run dev
```

Откройте http://localhost:3000

---

## 📦 Технологии

- **Next.js 16.3.1** — React framework (App Router)
- **TypeScript** — Type safety
- **Tailwind CSS 4.x** — Styling
- **Supabase** — PostgreSQL database
- **Radix UI** — Headless UI components
- **Lucide React** — Icons
- **Motion** — Animations

---

## 📁 Структура проекта

```
site_nextjs/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Главная страница
│   └── globals.css         # Глобальные стили
├── components/
│   ├── header/             # Header + Logo
│   ├── sections/           # Hero, Pricing, OrderForm, etc.
│   └── footer/             # Footer
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Утилиты (cn функция)
├── supabase/
│   └── migrations/         # SQL миграции для БД
└── public/                 # Статические файлы
```

---

## 🗄️ База данных

### Таблица `orders`

Поля:
- `id` (UUID, primary key) — auto
- `phone` (string, **required**) — номер телефона
- `name` (string, optional) — имя клиента
- `city` (string, optional) — город отправки
- `description` (text, optional) — описание инструмента
- `created_at` (timestamp) — auto
- `updated_at` (timestamp) — auto

### Настройка БД

Следуйте инструкции: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

---

## 🛠️ Команды

```bash
# Development
npm run dev          # Запуск dev сервера

# Production
npm run build        # Build для production
npm run start        # Запуск production сервера

# Code Quality
npm run lint         # ESLint проверка
```

---

## 📝 Основные компоненты

### Server Components (SSR/SSG)
- `Hero` — главный экран с фоном
- `HowItWorks` — шаги доставки
- `Pricing` — прайс-лист услуг
- `Footer` — контакты и навигация

### Client Components (`'use client'`)
- `Header` — навигация с мобильным меню
- `OrderForm` — форма заказа с отправкой в Supabase

---

## 🎨 Дизайн

- **Цветовая схема:** Тёмная тема (background: `#0C0C0E`, accent: `#D97706`)
- **Шрифты:** Geist Sans + Geist Mono
- **Responsive:** Desktop, Tablet, Mobile
- **Smooth scroll:** HTML attribute

---

## 🚢 Deployment

### Vercel (рекомендуется)

1. Подключите GitHub репозиторий к Vercel
2. Добавьте Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
3. Deploy!

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### VPS

```bash
npm run build
pm2 start npm --name "krupki-master" -- start
```

---

## 📚 Документация

- [Отчёт о миграции](./MIGRATION_REPORT.md) — как проект портирован с Vite на Next.js
- [Настройка Supabase](./SUPABASE_SETUP.md) — полная инструкция по БД
- [Next.js Docs](https://nextjs.org/docs) — официальная документация

---

## 🐛 Troubleshooting

### Ошибка: "supabaseUrl is required"

**Причина:** Не заданы переменные окружения

**Решение:**
1. Создайте `.env.local`
2. Добавьте `NEXT_PUBLIC_SUPABASE_URL` и `SUPABASE_PUBLISHABLE_KEY`
3. Перезапустите dev сервер

### Форма не отправляется

**Причина:** Неправильные credentials или таблица `orders` не создана

**Решение:**
1. Проверьте credentials в `.env.local`
2. Выполните SQL миграцию из `supabase/migrations/001_create_orders_table.sql`
3. Проверьте RLS policies в Supabase

### Dev сервер не запускается

**Причина:** Зависимости не установлены

**Решение:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📞 Контакты

- **Проект:** Krupki Master — заточка ножей Крупки
- **Технологии:** Next.js 16.3.1 + Supabase + TypeScript
- **Дата миграции:** 2026-08-20

---

## ✅ Что работает

- ✅ Landing page с Hero, Pricing, Order Form
- ✅ Адаптивный дизайн (Desktop/Tablet/Mobile)
- ✅ Мобильное меню
- ✅ Smooth scroll навигация
- ✅ Форма заказа с валидацией
- ✅ Сохранение заказов в Supabase PostgreSQL
- ✅ Loading state и error handling
- ✅ SEO metadata и Open Graph
- ✅ Image optimization (next/image)

---

**Готово к production! 🚀**
