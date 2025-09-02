-- Create admin user function to set up the specific admin account
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Check if admin already exists
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'chatalosik@seznam.cz';
  
  -- If admin doesn't exist, we'll need to create them via signup
  -- For now, just ensure the role system is ready
  IF admin_user_id IS NOT NULL THEN
    -- Update user to admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Enable realtime for reservations table
ALTER TABLE public.reservations REPLICA IDENTITY FULL;

-- Add reservations table to realtime publication
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE public.reservations;

-- Call the function to set up admin if they exist
SELECT create_admin_user();