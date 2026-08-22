# Локальная Supabase БД через Docker

## 🐳 Быстрый старт

### 1. Запуск БД

```bash
# В директории site_nextjs/
docker-compose up -d
```

**Что запускается:**
- PostgreSQL 15 на порту `5432`
- PostgREST API на порту `3001`
- Supabase Studio (UI) на порту `3002`

### 2. Проверка статуса

```bash
docker-compose ps
```

Все 3 сервиса должны быть `Up`:
```
NAME                IMAGE                          STATUS
krupki_postgres     supabase/postgres:15.1.0.147   Up (healthy)
krupki_postgrest    postgrest/postgrest:v11.2.2    Up
krupki_studio       supabase/studio:20231123       Up
```

### 3. Проверка миграций

SQL миграции из `supabase/migrations/` автоматически применяются при первом запуске.

Проверьте логи:
```bash
docker-compose logs postgres | grep "CREATE TABLE"
```

### 4. Запуск Next.js приложения

```bash
npm run dev
```

Откройте http://localhost:3000 и протестируйте форму заказа.

---

## 🔗 Endpoints

| Сервис | URL | Описание |
|--------|-----|----------|
| Next.js App | http://localhost:3000 | Веб-сайт |
| PostgREST API | http://localhost:3001 | REST API для БД |
| Supabase Studio | http://localhost:3002 | Admin UI для БД |
| PostgreSQL | localhost:5432 | Прямое подключение к БД |

---

## 🎨 Supabase Studio (Admin UI)

1. Откройте http://localhost:3002
2. Введите credentials:
   - **API URL:** `http://localhost:3001`
   - **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNjQxNzY5MjAwLCJleHAiOjE5NTczNDUyMDB9.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE`
3. Перейдите в **Table Editor** → `orders` для просмотра заказов

---

## 🗄️ Прямое подключение к PostgreSQL

Если нужен прямой доступ через psql или GUI клиент:

```bash
# psql
docker exec -it krupki_postgres psql -U postgres -d postgres

# или через host
psql -h localhost -p 5432 -U postgres -d postgres
```

**Credentials:**
- Host: `localhost`
- Port: `5432`
- Database: `postgres`
- User: `postgres`
- Password: `postgres`

---

## 📊 Проверка данных

### Через SQL
```sql
-- Подключитесь к БД и выполните:
SELECT * FROM orders ORDER BY created_at DESC;
```

### Через curl
```bash
# GET all orders
curl http://localhost:3001/orders

# POST new order
curl -X POST http://localhost:3001/orders \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+375291234567",
    "name": "Тест",
    "city": "Минск",
    "description": "3 ножа",
  }'
```

---

## 🛑 Остановка и очистка

### Остановка
```bash
docker-compose down
```

### Остановка + удаление данных
```bash
docker-compose down -v
```

**Внимание:** `-v` удалит все данные из БД!

---

## 🔄 Перезапуск с новыми миграциями

Если вы обновили SQL миграции:

```bash
# 1. Остановка и удаление БД
docker-compose down -v

# 2. Запуск заново (миграции применятся автоматически)
docker-compose up -d

# 3. Проверка логов
docker-compose logs postgres
```

---

## 🐛 Troubleshooting

### Порты заняты

**Ошибка:** `port is already allocated`

**Решение:** Измените порты в `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # PostgreSQL
  - "3011:3000"  # PostgREST
  - "3012:3000"  # Studio
```

И обновите `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:3011
```

### Контейнеры не запускаются

**Решение:**
```bash
# Проверьте логи
docker-compose logs

# Пересоздайте контейнеры
docker-compose down
docker-compose up -d --force-recreate
```

### Миграции не применились

**Проверка:**
```bash
docker exec -it krupki_postgres psql -U postgres -d postgres -c "\dt"
```

Должна быть таблица `orders`.

**Если таблицы нет:**
```bash
# Вручную примените миграции
docker exec -i krupki_postgres psql -U postgres -d postgres < supabase/migrations/000_setup_roles.sql
docker exec -i krupki_postgres psql -U postgres -d postgres < supabase/migrations/001_create_orders_table.sql
```

### Форма не отправляется

**Причина:** PostgREST ещё не запустился

**Решение:** Подождите 10-15 секунд после `docker-compose up -d`

**Проверка:**
```bash
curl http://localhost:3001/orders
# Должен вернуть: []
```

---

## 📝 Переменные окружения

`.env.local` уже настроен для локальной разработки:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:3001
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Для production** замените на облачный Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-real-key
```

---

## 🔐 Безопасность

**Для локальной разработки:**
- JWT secret: публичный (только для dev)
- Password: `postgres` (только для dev)
- Порты: открыты на localhost

**Для production:**
- Используйте облачный Supabase (https://supabase.com)
- Или настройте production Docker setup с настоящими credentials

---

## ✅ Готово!

Теперь у вас локальная Supabase БД для разработки.

**Workflow:**
1. `docker-compose up -d` — запуск БД
2. `npm run dev` — запуск Next.js
3. Тестируйте форму на http://localhost:3000
4. Просматривайте заказы на http://localhost:3002
5. `docker-compose down` — остановка БД

---

**Happy coding! 🚀**
