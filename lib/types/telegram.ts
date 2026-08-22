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
  createdAt: string;
}
