import type { OrderNotification, TelegramMessage, TelegramResponse } from "./types/telegram";

const TELEGRAM_API_BASE = "https://api.telegram.org/bot";

/**
 * Форматирует данные заказа в красивое сообщение для Telegram
 */
export function formatOrderMessage(order: OrderNotification): string {
  const date = new Date(order.createdAt).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });


  let message = `🔔 <b>Новая заявка на заточку</b>\n\n`;

  if (order.name) {
    message += `👤 <b>Имя:</b> ${order.name}\n`;
  }

  message += `📱 <b>Телефон:</b> ${order.phone}\n`;

  if (order.city) {
    message += `🏙 <b>Город:</b> ${order.city}\n`;
  }

  if (order.description) {
    message += `\n📋 <b>Описание:</b>\n${order.description}\n`;
  }

  message += `\n⏰ <b>Дата:</b> ${date}\n`;
  message += `🆔 <b>ID заказа:</b> ${order.orderId}`;

  return message;
}

/**
 * Отправляет сообщение в Telegram
 */
export async function sendTelegramMessage(
  botToken: string,
  message: TelegramMessage
): Promise<TelegramResponse> {
  const url = `${TELEGRAM_API_BASE}${botToken}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description || "Telegram API error");
  }

  return response.json();
}

/**
 * Проверяет, является ли пользователь администратором
 */
export function isAdmin(chatId: number | string, whitelist: string): boolean {
  const adminIds = whitelist.split(",").map((id) => id.trim());
  return adminIds.includes(String(chatId));
}

/**
 * Отправляет уведомление о новом заказе всем администраторам
 */
export async function notifyAdmins(
  order: OrderNotification,
  botToken: string,
  adminWhitelist: string
): Promise<{ success: boolean; errors: string[] }> {
  const adminIds = adminWhitelist.split(",").map((id) => id.trim()).filter(Boolean);
  const message = formatOrderMessage(order);
  const errors: string[] = [];

  await Promise.allSettled(
    adminIds.map(async (chatId) => {
      try {
        await sendTelegramMessage(botToken, {
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        });
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        errors.push(`Failed to send to ${chatId}: ${errorMsg}`);
      }
    })
  );

  return {
    success: errors.length === 0,
    errors,
  };
}
