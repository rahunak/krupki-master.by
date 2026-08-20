-- Create orders table for Krupki Master knife sharpening service
-- This table stores customer orders submitted through the website form

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Required field
  phone VARCHAR(50) NOT NULL,

  -- Optional fields
  name VARCHAR(255),
  city VARCHAR(255),
  description TEXT,
  contact_method VARCHAR(20) CHECK (contact_method IN ('telegram', 'viber', 'phone', 'email')),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Create index on phone for quick lookup
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow anyone to insert orders (public form submission)
CREATE POLICY "Anyone can insert orders"
  ON orders
  FOR INSERT
  WITH CHECK (true);

-- Create policy: Anon role can view all orders (for local development)
-- In production, replace with authenticated-only access
CREATE POLICY "Anon can view orders"
  ON orders
  FOR SELECT
  USING (current_user = 'anon' OR current_user = 'authenticated');

-- Create policy: Authenticated users can update orders (admin panel)
CREATE POLICY "Authenticated users can update orders"
  ON orders
  FOR UPDATE
  USING (current_user = 'authenticated');

-- Create policy: Authenticated users can delete orders (admin panel)
CREATE POLICY "Authenticated users can delete orders"
  ON orders
  FOR DELETE
  USING (current_user = 'authenticated');

-- Comments for documentation
COMMENT ON TABLE orders IS 'Customer orders from the Krupki Master website';
COMMENT ON COLUMN orders.phone IS 'Customer phone number (required)';
COMMENT ON COLUMN orders.name IS 'Customer name (optional)';
COMMENT ON COLUMN orders.city IS 'City where the item will be sent from (optional)';
COMMENT ON COLUMN orders.description IS 'Description of items to sharpen (optional)';
COMMENT ON COLUMN orders.contact_method IS 'Preferred contact method: telegram, viber, phone, or email';
