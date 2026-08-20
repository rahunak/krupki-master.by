export type ContactMethod = "telegram" | "viber" | "phone" | "email";

export interface Order {
  id?: string;
  phone: string;
  name?: string | null;
  city?: string | null;
  description?: string | null;
  contact_method?: ContactMethod | null;
  created_at?: string;
}
