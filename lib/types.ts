export interface Order {
  id?: string;
  phone: string;
  name?: string | null;
  city?: string | null;
  description?: string | null;
  created_at?: string;
}
