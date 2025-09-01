-- To make a user admin, run this after they sign up:
-- Replace 'your-email@example.com' with the actual email

-- Example: To promote admin@chalosik.cz to admin role:
-- UPDATE user_roles SET role = 'admin' WHERE user_id = (SELECT id FROM auth.users WHERE email = 'admin@chalosik.cz');

-- Function to easily promote users to admin
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Get user ID from email
  SELECT id INTO user_uuid FROM auth.users WHERE email = user_email;
  
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
  
  -- Update their role to admin
  UPDATE user_roles 
  SET role = 'admin' 
  WHERE user_id = user_uuid;
  
  -- Insert admin role if it doesn't exist
  INSERT INTO user_roles (user_id, role)
  SELECT user_uuid, 'admin'
  WHERE NOT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = user_uuid AND role = 'admin'
  );
  
  RETURN true;
END;
$$;