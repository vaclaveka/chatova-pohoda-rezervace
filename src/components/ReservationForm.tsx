import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ReservationFormProps {
  selectedDate: Date | undefined;
  onSuccess: () => void;
}

const ReservationForm = ({ selectedDate, onSuccess }: ReservationFormProps) => {
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_out_date: '',
    number_of_guests: 1,
    special_requests: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    
    setLoading(true);
    
    try {
      const checkInDate = format(selectedDate, 'yyyy-MM-dd');
      const nights = Math.ceil((new Date(formData.check_out_date).getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24));
      const pricePerNight = 150; // Base price
      const totalPrice = nights * pricePerNight;

      const { error } = await supabase
        .from('reservations')
        .insert([{
          user_id: user?.id,
          guest_name: formData.guest_name,
          guest_email: formData.guest_email,
          guest_phone: formData.guest_phone,
          check_in_date: checkInDate,
          check_out_date: formData.check_out_date,
          number_of_guests: formData.number_of_guests,
          total_price: totalPrice,
          special_requests: formData.special_requests,
        }]);

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Your reservation has been submitted successfully.',
      });

      setFormData({
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        check_out_date: '',
        number_of_guests: 1,
        special_requests: '',
      });

      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit reservation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!selectedDate) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Make a Reservation</CardTitle>
          <CardDescription>Please select a date to continue</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Reservation</CardTitle>
        <CardDescription>
          Selected date: {format(selectedDate, 'MMMM dd, yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guest_name">Full Name *</Label>
              <Input
                id="guest_name"
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guest_email">Email *</Label>
              <Input
                id="guest_email"
                type="email"
                value={formData.guest_email}
                onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guest_phone">Phone Number</Label>
              <Input
                id="guest_phone"
                type="tel"
                value={formData.guest_phone}
                onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check_out_date">Check-out Date *</Label>
              <Input
                id="check_out_date"
                type="date"
                value={formData.check_out_date}
                onChange={(e) => setFormData({ ...formData, check_out_date: e.target.value })}
                min={format(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd')}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="number_of_guests">Number of Guests</Label>
            <Input
              id="number_of_guests"
              type="number"
              min="1"
              max="8"
              value={formData.number_of_guests}
              onChange={(e) => setFormData({ ...formData, number_of_guests: parseInt(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_requests">Special Requests</Label>
            <Textarea
              id="special_requests"
              value={formData.special_requests}
              onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
              placeholder="Any special requests or requirements..."
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Reservation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;