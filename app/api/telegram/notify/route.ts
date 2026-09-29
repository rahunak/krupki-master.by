import { NextRequest, NextResponse } from "next/server";
import { notifyChannel } from "@/lib/telegram";
import type { OrderNotification } from "@/lib/types/telegram";

/** ID заявки: клиент форма не генерирует — создаём серверно (число+случайный суффикс) */
function makeOrderId(): string {
  return `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/**
 * POST /api/telegram/notify — заявка с сайта уходит в Telegram-канал.
 *
 * Тело: { phone: string, contactMethod?: "viber" | "call" }
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
    const { phone, contactMethod } = body as {
      phone?: string;
      contactMethod?: "viber" | "call";
    };

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
      phone: phone.trim(),
      contactMethod: contactMethod === "call" ? "call" : "viber",
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
      return NextResponse.json(
        {
          success: false,
          message: "Some notifications failed to send",
          errors: result.errors,
        },
        { status: 207 } // Multi-Status
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
