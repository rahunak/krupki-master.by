-- Setup script for local Supabase development
-- This creates the necessary roles and schemas before running migrations

-- Create anon role (required for PostgREST)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN;
  END IF;
END
$$;

-- Grant permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT ON TABLES TO anon;

-- Create authenticated role (for future admin features)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN;
  END IF;
END
$$;

-- Grant permissions to authenticated role
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
