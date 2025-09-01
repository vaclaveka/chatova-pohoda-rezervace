-- Update reservations table for half-day bookings
-- Drop existing reservations table and recreate with new structure
DROP TABLE IF EXISTS public.reservations;

-- Create new reservations table for admin-managed availability
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('am', 'pm', 'full')), -- am = before 10:00, pm = after 15:00, full = entire day
  status TEXT NOT NULL DEFAULT 'booked' CHECK (status IN ('available', 'booked')),
  guest_info TEXT, -- Optional info about the guest (for admin reference)
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date, period)
);

-- Enable RLS
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Only admins can manage availability
CREATE POLICY "Only admins can manage reservations" 
ON public.reservations 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Public can view availability (for the calendar display)
CREATE POLICY "Public can view availability" 
ON public.reservations 
FOR SELECT 
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO public.reservations (date, period, status) VALUES 
('2025-01-15', 'am', 'booked'),
('2025-01-15', 'pm', 'available'),
('2025-01-16', 'full', 'booked'),
('2025-01-17', 'am', 'available'),
('2025-01-17', 'pm', 'booked');