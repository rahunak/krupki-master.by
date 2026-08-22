import { NextRequest, NextResponse } from "next/server";
import { notifyAdmins } from "@/lib/telegram";
import type { OrderNotification } from "@/lib/types/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация обязательных полей
    const { orderId, phone, createdAt } = body as OrderNotification;

    if (!orderId || !phone || !createdAt) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, phone, createdAt" },
        { status: 400 }
      );
    }

    // Получаем конфигурацию из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const adminWhitelist = process.env.ADMIN_WHITELIST;

    if (!botToken || !adminWhitelist) {
      console.error("Telegram configuration missing in environment variables");
      return NextResponse.json(
        { error: "Telegram notification not configured" },
        { status: 500 }
      );
    }

    // Отправляем уведомления всем администраторам
    const result = await notifyAdmins(body, botToken, adminWhitelist);

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
      message: "Notifications sent successfully",
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
