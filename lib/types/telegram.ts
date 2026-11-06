export interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: "Markdown" | "HTML";
}

export interface TelegramResponse {
  ok: boolean;
  result?: {
    message_id: number;
    date: number;
    chat: {
      id: number;
      type: string;
    };
  };
  description?: string;
  error_code?: number;
}

export interface OrderNotification {
  orderId: string;
  name?: string;
  phone: string;
  city?: string;
  description?: string;
  /** Канал связи (legacy): новые заявки его не передают, мастер уточняет звонком */
  contactMethod?: "viber" | "call";
  /** Услуга мастерская/бытовые услуги (для заявок с /uslugi/* и /zatochka/*) */
  service?: string;
  /** Адрес доставки (для заказов изделий из дерева) */
  address?: string;
  /** Тип изделия (для заказов изделий из дерева) */
  productType?: string;
  createdAt: string;
}
