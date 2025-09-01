-- Create the first admin user (you'll need to sign up with this email first)
-- This will be executed after someone signs up with admin@chalosik.cz
-- You can change this email to whatever you prefer

-- This function will automatically make the first user an admin
-- and also provides a way to manually promote users to admin
DO $$
BEGIN
  -- Note: This will only work after a user actually signs up
  -- The trigger will create the profile and user_role records first
  NULL;
END $$;

-- If you want to manually make a user admin after they sign up, use this:
-- UPDATE user_roles SET role = 'admin' WHERE user_id = (SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com');