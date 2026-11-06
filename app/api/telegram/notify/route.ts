import { NextRequest, NextResponse } from "next/server";
import { notifyChannel } from "@/lib/telegram";
import type { OrderNotification } from "@/lib/types/telegram";

/** ID заявки: клиент форма не генерирует — создаём серверно (число+случайный суффикс) */
function makeOrderId(): string {
  return `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/** Обрезает пользовательскую строку до разумной длины (защита от мусора) */
function clean(value: unknown, max = 200): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

/**
 * Простой лимит заявок по IP: не больше RATE_LIMIT_MAX за RATE_LIMIT_WINDOW_MS.
 * Хранится в памяти процесса — этого достаточно, чтобы один бот не забил канал;
 * за точным лимитом (общий счётчик) идти в Supabase/Redis не требуется.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);

  // Чистка старых записей, чтобы Map не рос бесконечно
  if (requestLog.size > 1000) {
    for (const [key, timestamps] of requestLog) {
      if (timestamps.every((ts) => now - ts >= RATE_LIMIT_WINDOW_MS)) {
        requestLog.delete(key);
      }
    }
  }

  return false;
}

/**
 * POST /api/telegram/notify — заявка с сайта уходит в Telegram-канал.
 *
 * Тело: { phone: string, service?: string, city?: string, contactMethod?: "viber" | "call" }
 *
 * Конфигурация (env):
 *  - TELEGRAM_BOT_TOKEN — токен бота;
 *  - TELEGRAM_CHANNEL_ID — @username публичного канала или -100... ID приватного.
 *    Бот должен быть добавлен в канал админом с правом «Публикация сообщений».
 * Fallback: если TELEGRAM_CHANNEL_ID не задан, но есть ADMIN_WHITELIST —
 * уходим на старую схему (личные чаты), чтобы заявки не терялись.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация: телефон обязателен (минимум 9 цифр — номер РБ без кода страны)
    const { phone, contactMethod, service, productType, address, city, description, website } =
      body as {
        phone?: string;
        contactMethod?: "viber" | "call";
        service?: string;
        productType?: string;
        address?: string;
        city?: string;
        description?: string;
        /** Honeypot: скрытое поле, люди его не видят и не заполняют */
        website?: string;
      };

    // Honeypot: отвечаем «успехом», чтобы бот не подбирал обход
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true, message: "Notification sent to channel" });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Слишком много заявок с этого адреса. Попробуйте через 10 минут или позвоните." },
        { status: 429 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.replace(/\D/g, "").length < 9) {
      return NextResponse.json(
        { error: "Valid phone is required (min 9 digits)" },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const channelId = process.env.TELEGRAM_CHANNEL_ID;
    const adminWhitelist = process.env.ADMIN_WHITELIST;

    if (!botToken) {
      console.error("TELEGRAM_BOT_TOKEN missing in environment variables");
      return NextResponse.json(
        { error: "Telegram notification not configured" },
        { status: 500 }
      );
    }

    const order: OrderNotification = {
      orderId: makeOrderId(),
      phone: phone.trim().slice(0, 30),
      contactMethod:
        contactMethod === "call" || contactMethod === "viber" ? contactMethod : undefined,
      service: clean(service),
      productType: clean(productType),
      address: clean(address, 300),
      city: clean(city, 80),
      description: clean(description, 1000),
      createdAt: new Date().toISOString(),
    };

    // Основной путь — канал. Fallback — старые личные чаты админов.
    const result = channelId
      ? await notifyChannel(order, botToken, channelId)
      : adminWhitelist
        ? await (async () => {
            const { notifyAdmins } = await import("@/lib/telegram");
            return notifyAdmins(order, botToken, adminWhitelist);
          })()
        : null;

    if (!result) {
      console.error("Neither TELEGRAM_CHANNEL_ID nor ADMIN_WHITELIST configured");
      return NextResponse.json(
        { error: "Telegram notification not configured" },
        { status: 500 }
      );
    }

    if (!result.success) {
      console.error("Telegram notification errors:", result.errors);
      // 502, а не 207: для формы это ошибка, клиент не должен показывать успех
      return NextResponse.json(
        {
          success: false,
          message: "Failed to deliver the request",
          errors: result.errors,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      message: "Notification sent to channel",
    });
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
