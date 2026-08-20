# Настройка Supabase для Krupki Master

## 1. Создание проекта Supabase

1. Перейдите на https://supabase.com и войдите в аккаунт (или зарегистрируйтесь)
2. Создайте новый проект:
   - Project Name: `krupki-master`
   - Database Password: (сохраните пароль в надёжном месте)
   - Region: выберите ближайший (для Беларуси: `eu-central-1` Frankfurt)
3. Дождитесь завершения создания проекта (~2 минуты)

---

## 2. Получение credentials

После создания проекта:

1. Перейдите в **Settings** → **API**
2. Скопируйте:
   - **Project URL** (например: `https://xxxxx.supabase.co`)
   - **anon public key** (например: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

---

## 3. Настройка переменных окружения

Обновите файл `.env.local` в корне `site_nextjs/`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Важно:** 
- Замените значения на свои из шага 2
- Перезапустите dev сервер после изменения: `npm run dev`

---

## 4. Создание таблицы orders

### Вариант A: Через SQL Editor (рекомендуется)

1. В Supabase перейдите в **SQL Editor**
2. Нажмите **New query**
3. Скопируйте содержимое файла `supabase/migrations/001_create_orders_table.sql`
4. Вставьте в редактор и нажмите **Run**

### Вариант B: Через Table Editor

1. Перейдите в **Table Editor**
2. Нажмите **New table**
3. Создайте таблицу `orders` со следующими полями:

| Column | Type | Default | Nullable | Key |
|--------|------|---------|----------|-----|
| id | uuid | gen_random_uuid() | ❌ | PRIMARY |
| phone | varchar(50) | - | ❌ | - |
| name | varchar(255) | - | ✅ | - |
| city | varchar(255) | - | ✅ | - |
| description | text | - | ✅ | - |
| contact_method | varchar(20) | - | ✅ | - |
| created_at | timestamptz | now() | ❌ | - |
| updated_at | timestamptz | now() | ❌ | - |

4. Добавьте constraint для `contact_method`:
   ```sql
   ALTER TABLE orders 
   ADD CONSTRAINT orders_contact_method_check 
   CHECK (contact_method IN ('telegram', 'viber', 'phone', 'email'));
   ```

---

## 5. Настройка Row Level Security (RLS)

**Важно:** RLS уже настроен в SQL миграции (шаг 4, вариант A).

Если вы создавали таблицу через Table Editor, выполните в SQL Editor:

```sql
-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can insert orders"
  ON orders
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view/update/delete
CREATE POLICY "Authenticated users can view orders"
  ON orders FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete orders"
  ON orders FOR DELETE
  USING (auth.role() = 'authenticated');
```

---

## 6. Проверка работы

### Тест через Supabase Dashboard

1. Перейдите в **Table Editor** → `orders`
2. Нажмите **Insert** → **Insert row**
3. Добавьте тестовую запись:
   ```json
   {
     "phone": "+375291234567",
     "name": "Тестовый заказ",
     "city": "Минск",
     "description": "3 кухонных ножа",
     "contact_method": "telegram"
   }
   ```
4. Если запись создалась — всё работает!

### Тест через форму на сайте

1. Запустите dev сервер: `npm run dev`
2. Откройте http://localhost:3000
3. Прокрутите до секции "Оформить заявку"
4. Заполните форму (минимум — номер телефона)
5. Нажмите "Отправить заявку мастеру"
6. Проверьте в Supabase Table Editor — должна появиться новая запись

---

## 7. Структура данных

### Поля таблицы orders

| Поле | Тип | Обязательное | Описание |
|------|-----|--------------|----------|
| `id` | UUID | ✅ | Уникальный ID заказа (auto) |
| `phone` | string | ✅ | Номер телефона клиента |
| `name` | string | ❌ | Имя клиента |
| `city` | string | ❌ | Город отправки |
| `description` | text | ❌ | Описание инструмента для заточки |
| `contact_method` | enum | ❌ | Способ связи: `telegram`, `viber`, `phone`, `email` |
| `created_at` | timestamp | ✅ | Дата создания заказа (auto) |
| `updated_at` | timestamp | ✅ | Дата обновления (auto) |

### Пример записи

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "phone": "+375291234567",
  "name": "Иван Петров",
  "city": "Минск",
  "description": "3 кухонных ножа, сильно затуплены",
  "contact_method": "telegram",
  "created_at": "2026-08-20T11:30:47.275Z",
  "updated_at": "2026-08-20T11:30:47.275Z"
}
```

---

## 8. Безопасность

### ✅ Что настроено:

1. **Row Level Security (RLS)** включен
2. **Public insert** — любой может создать заказ через форму
3. **Authenticated access** — просмотр/изменение только для авторизованных админов
4. **Validation** — `contact_method` ограничен 4 значениями
5. **Indexes** — быстрый поиск по `created_at` и `phone`

### 🔒 Рекомендации:

1. **Не коммитьте `.env.local`** в git (уже в .gitignore)
2. **Rate limiting** — добавьте на production (например, через Vercel или Cloudflare)
3. **Spam protection** — добавьте Google reCAPTCHA v3 на форму
4. **Notifications** — настройте Webhook/Email при новом заказе

---

## 9. Production Deployment

### Для Vercel:

1. Создайте проект на Vercel
2. Подключите GitHub репозиторий
3. Добавьте Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. Deploy!

### Для других хостингов:

Убедитесь, что переменные окружения доступны в runtime:
- Vercel/Netlify: через Dashboard
- Docker: через `.env` файл или env vars
- VPS: через `export` или systemd environment file

---

## 10. Мониторинг и уведомления

### Настройка Email уведомлений (опционально)

1. В Supabase перейдите в **Database** → **Webhooks**
2. Создайте webhook на событие `INSERT` для таблицы `orders`
3. URL: ваш API endpoint для отправки email (например, через SendGrid/Mailgun)

### Пример webhook endpoint (Next.js API route):

Создайте `app/api/webhooks/new-order/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json();
  
  // Отправка email админу
  // await sendEmail({
  //   to: 'admin@krupki-master.by',
  //   subject: 'Новый заказ на заточку',
  //   body: `Телефон: ${payload.record.phone}...`
  // });
  
  return NextResponse.json({ success: true });
}
```

---

## Готово! 🎉

Теперь форма на сайте сохраняет заказы в Supabase PostgreSQL.

**Следующие шаги:**
1. Протестируйте форму в браузере
2. Проверьте записи в Supabase Table Editor
3. Настройте админ-панель для просмотра заказов (опционально)
4. Добавьте уведомления о новых заказах (опционально)
