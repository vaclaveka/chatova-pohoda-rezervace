-- Fix security issues identified by the linter

-- Fix 1: Set proper search_path for all functions to prevent security issues
ALTER FUNCTION public.has_role(_user_id uuid, _role app_role) SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.promote_user_to_admin(user_email text) SET search_path = public;