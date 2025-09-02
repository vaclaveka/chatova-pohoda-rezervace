import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { LogOut } from 'lucide-react';

interface Reservation {
  id: string;
  date: string;
  period: 'am' | 'pm' | 'full';
  status: 'available' | 'booked';
  guest_info: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReservation, setNewReservation] = useState({
    date: '',
    period: '',
    status: 'booked',
    guest_info: ''
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchReservations();

    // Set up realtime subscription
    const channel = supabase
      .channel('reservations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reservations'
        },
        (payload) => {
          console.log('Reservations updated:', payload);
          fetchReservations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, navigate]);

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setReservations((data || []) as Reservation[]);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: 'Chyba',
        description: 'Nepodařilo se načíst rezervace.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateReservation = async () => {
    if (!newReservation.date || !newReservation.period) {
      toast({
        title: 'Chyba',
        description: 'Vyplňte všechna povinná pole.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('reservations')
        .upsert({
          date: newReservation.date,
          period: newReservation.period,
          status: newReservation.status,
          guest_info: newReservation.guest_info || null,
        }, {
          onConflict: 'date,period'
        });

      if (error) throw error;

      toast({
        title: 'Úspěch',
        description: 'Rezervace byla aktualizována.',
      });

      setNewReservation({ date: '', period: '', status: 'booked', guest_info: '' });
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast({
        title: 'Chyba',
        description: 'Nepodařilo se aktualizovat rezervaci.',
        variant: 'destructive',
      });
    }
  };

  const deleteReservation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Úspěch',
        description: 'Rezervace byla smazána.',
      });

      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast({
        title: 'Chyba',
        description: 'Nepodařilo se smazat rezervaci.',
        variant: 'destructive',
      });
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Načítání...</p>
        </div>
      </div>
    );
  }

  const bookedDays = reservations.filter(r => r.status === 'booked').length;
  const availableDays = reservations.filter(r => r.status === 'available').length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Správa dostupnosti chaty</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              Odhlásit
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Zpět na web
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Celkem záznamů</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Obsazené</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{bookedDays}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Dostupné</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{availableDays}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add/Update Reservation */}
          <Card>
            <CardHeader>
              <CardTitle>Přidat/Upravit dostupnost</CardTitle>
              <CardDescription>
                Nastavte dostupnost pro konkrétní datum a období
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Datum</Label>
                <Input
                  id="date"
                  type="date"
                  value={newReservation.date}
                  onChange={(e) => setNewReservation({...newReservation, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="period">Období</Label>
                <Select value={newReservation.period} onValueChange={(value) => setNewReservation({...newReservation, period: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte období" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="am">Ráno (do 10:00)</SelectItem>
                    <SelectItem value="pm">Odpoledne (od 15:00)</SelectItem>
                    <SelectItem value="full">Celý den</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newReservation.status} onValueChange={(value) => setNewReservation({...newReservation, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Dostupné</SelectItem>
                    <SelectItem value="booked">Obsazené</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guest_info">Informace o hostovi (volitelné)</Label>
                <Textarea
                  id="guest_info"
                  value={newReservation.guest_info}
                  onChange={(e) => setNewReservation({...newReservation, guest_info: e.target.value})}
                  placeholder="Jméno hosta, poznámky..."
                />
              </div>
              
              <Button onClick={addOrUpdateReservation} className="w-full">
                Uložit
              </Button>
            </CardContent>
          </Card>

          {/* Reservations List */}
          <Card>
            <CardHeader>
              <CardTitle>Seznam rezervací</CardTitle>
              <CardDescription>
                Aktuální stav dostupnosti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{format(new Date(reservation.date), 'dd.MM.yyyy')}</span>
                        <Badge variant={reservation.period === 'full' ? 'default' : 'secondary'}>
                          {reservation.period === 'am' ? 'Ráno' : reservation.period === 'pm' ? 'Odpoledne' : 'Celý den'}
                        </Badge>
                        <Badge variant={reservation.status === 'booked' ? 'destructive' : 'default'}>
                          {reservation.status === 'booked' ? 'Obsazené' : 'Dostupné'}
                        </Badge>
                      </div>
                      {reservation.guest_info && (
                        <p className="text-sm text-muted-foreground">{reservation.guest_info}</p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteReservation(reservation.id)}
                    >
                      Smazat
                    </Button>
                  </div>
                ))}
                {reservations.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Žádné rezervace nenalezeny
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;