# Docker Setup Completed ✅

**Дата:** 2026-08-20
**Время:** 18:45 UTC
**Статус:** Успешно

---

## Что запущено

### 1. PostgreSQL (Supabase)
- **Container:** `krupki_postgres`
- **Image:** `supabase/postgres:15.1.0.147`
- **Port:** `5433:5432` (изменён с 5432, т.к. порт был занят)
- **Status:** ✅ Healthy
- **Credentials:**
  - User: `postgres`
  - Password: `postgres`
  - Database: `postgres`

### 2. PostgREST API
- **Container:** `krupki_postgrest`
- **Image:** `postgrest/postgrest:v11.2.2`
- **Port:** `3001:3000`
- **Status:** ✅ Running
- **API URL:** http://localhost:3001

### 3. Supabase Studio (Admin UI)
- **Container:** `krupki_studio`
- **Image:** `supabase/studio:20231123-64a766a`
- **Port:** `3002:3000`
- **Status:** ✅ Running
- **URL:** http://localhost:3002

### 4. Next.js App
- **Port:** `3000`
- **Status:** ✅ Running
- **URL:** http://localhost:3000

---

## Проверка БД

### Таблица `orders` создана успешно

```sql
Table "public.orders"
     Column     |           Type           | Nullable |      Default      
----------------+--------------------------+----------+-------------------
 id             | uuid                     | not null | gen_random_uuid()
 phone          | character varying(50)    | not null | 
 name           | character varying(255)   |          | 
 city           | character varying(255)   |          | 
 description    | text                     |          | 
 contact_method | character varying(20)    |          | 
 created_at     | timestamp with time zone | not null | now()
 updated_at     | timestamp with time zone | not null | now()
```

### Индексы
- ✅ `orders_pkey` — PRIMARY KEY на `id`
- ✅ `idx_orders_created_at` — для сортировки по дате
- ✅ `idx_orders_phone` — для поиска по телефону

### Constraints
- ✅ `contact_method` CHECK — только: telegram, viber, phone, email

### RLS Policies
- ✅ **Anyone can insert orders** — публичная форма
- ✅ **Anon can view orders** — чтение для локальной разработки
- ✅ **Authenticated users can update/delete** — админ-панель

### Triggers
- ✅ `update_orders_updated_at` — автообновление `updated_at`

---

## API Endpoints

### GET /orders (список заказов)
```bash
curl http://localhost:3001/orders
# Ответ: []
```

### POST /orders (создать заказ)
```bash
curl -X POST http://localhost:3001/orders \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+375291234567",
    "name": "Тест",
    "city": "Минск",
    "description": "3 ножа",
    "contact_method": "telegram"
  }'
```

---

## Environment Variables

`.env.local` настроен для локальной БД:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:3001
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Команды управления

### Запуск
```bash
docker compose up -d
```

### Статус
```bash
docker compose ps
```

### Логи
```bash
docker compose logs postgres
docker compose logs postgrest
docker compose logs studio
```

### Остановка
```bash
docker compose down
```

### Остановка + удаление данных
```bash
docker compose down -v
```

---

## Тестирование формы

1. Откройте http://localhost:3000
2. Прокрутите до секции "Оформить заявку"
3. Заполните форму:
   - **Телефон:** обязательное поле (например: `+375291234567`)
   - **Имя, Город, Описание:** необязательные
   - **Способ связи:** выберите один из 4 вариантов
4. Нажмите "Отправить заявку мастеру"
5. Дождитесь сообщения "Заявка отправлена!"

### Проверка в БД
```bash
docker exec -i krupki_postgres psql -U postgres -d postgres -c "SELECT * FROM orders;"
```

### Проверка через API
```bash
curl http://localhost:3001/orders
```

### Проверка через Studio
Откройте http://localhost:3002 → Table Editor → `orders`

---

## Изменения в файлах

### 1. docker-compose.yml
- Создан с 3 сервисами (postgres, postgrest, studio)
- PostgreSQL порт изменён на `5433` (5432 был занят)

### 2. supabase/migrations/
- `000_setup_roles.sql` — создание ролей `anon` и `authenticated`
- `001_create_orders_table.sql` — обновлён для работы с локальной БД (заменён `auth.role()` на `current_user`)

### 3. .env.local
- Обновлён для локальной БД:
  - URL: `http://localhost:3001`
  - Anon Key: публичный для dev

### 4. DOCKER_SETUP.md
- Полная инструкция по работе с Docker

---

## Что работает

✅ PostgreSQL БД запущена и доступна
✅ Таблица `orders` создана с правильной структурой
✅ PostgREST API работает (http://localhost:3001)
✅ Supabase Studio доступен (http://localhost:3002)
✅ Next.js dev сервер запущен (http://localhost:3000)
✅ Форма заказа готова к тестированию

---

## Следующие шаги

1. **Протестируйте форму:**
   - Откройте http://localhost:3000
   - Заполните и отправьте заказ
   - Проверьте в БД или Studio

2. **Опционально: Настройте уведомления**
   - Email при новом заказе
   - Telegram webhook
   - Admin dashboard

3. **Production deployment:**
   - Используйте облачный Supabase (https://supabase.com)
   - Или настройте production Docker setup
   - Обновите `.env.local` для production

---

## Порты (summary)

| Сервис | Порт | URL |
|--------|------|-----|
| PostgreSQL | 5433 | localhost:5433 |
| PostgREST API | 3001 | http://localhost:3001 |
| Supabase Studio | 3002 | http://localhost:3002 |
| Next.js App | 3000 | http://localhost:3000 |

---

**Локальная БД готова к работе! 🎉**

Можете тестировать форму на http://localhost:3000
