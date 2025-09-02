import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DayAvailability {
  am: 'available' | 'booked'; // Before 10:00
  pm: 'available' | 'booked'; // After 15:00
}

const ReservationCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availability, setAvailability] = useState<Map<string, DayAvailability>>(new Map());
  const { isAdmin } = useAuth();

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('date, period, status');

      if (error) throw error;

      const availabilityMap = new Map<string, DayAvailability>();
      
      data?.forEach((reservation) => {
        const dateStr = reservation.date;
        if (!availabilityMap.has(dateStr)) {
          availabilityMap.set(dateStr, { am: 'available', pm: 'available' });
        }
        
        const dayData = availabilityMap.get(dateStr)!;
        if (reservation.period === 'full') {
          dayData.am = reservation.status === 'booked' ? 'booked' : 'available';
          dayData.pm = reservation.status === 'booked' ? 'booked' : 'available';
        } else if (reservation.period === 'am' || reservation.period === 'pm') {
          dayData[reservation.period as 'am' | 'pm'] = reservation.status === 'booked' ? 'booked' : 'available';
        }
      });

      setAvailability(availabilityMap);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  useEffect(() => {
    fetchAvailability();

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
          fetchAvailability();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getDayAvailability = (date: Date): DayAvailability => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availability.get(dateStr) || { am: 'available', pm: 'available' };
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const openWhatsApp = () => {
    const phone = '+420724216298';
    const message = selectedDate 
      ? `Dobrý den, chtěl(a) bych se zeptat na dostupnost chaty na ${format(selectedDate, 'dd.MM.yyyy')}.`
      : 'Dobrý den, chtěl(a) bych se zeptat na dostupnost chaty.';
    
    const whatsappUrl = `https://wa.me/${phone.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="reservation" className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Dostupnost a rezervace</h2>
          <p className="text-muted-foreground">
            Vyberte datum a kontaktujte nás přes WhatsApp
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Kalendář dostupnosti</CardTitle>
              <CardDescription>
                Půldenní dostupnost: ráno (do 10:00), odpoledne (od 15:00)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => !isDateSelectable(date)}
                components={{
                  Day: ({ date }) => {
                    const dayAvailability = getDayAvailability(date);
                    const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                    
                    return (
                      <button
                        className={`relative w-9 h-9 text-sm rounded-sm transition-colors ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                        onClick={() => setSelectedDate(date)}
                        disabled={!isDateSelectable(date)}
                      >
                        <span className="relative z-10">{format(date, 'd')}</span>
                        {/* Morning availability indicator */}
                        <div className={`absolute top-0 left-0 w-full h-1/2 rounded-t-sm ${
                          dayAvailability.am === 'available' ? 'bg-green-200' : 'bg-red-200'
                        } ${isSelected ? 'opacity-60' : 'opacity-80'}`} />
                        {/* Afternoon availability indicator */}
                        <div className={`absolute bottom-0 left-0 w-full h-1/2 rounded-b-sm ${
                          dayAvailability.pm === 'available' ? 'bg-green-200' : 'bg-red-200'
                        } ${isSelected ? 'opacity-60' : 'opacity-80'}`} />
                      </button>
                    );
                  }
                }}
                className="rounded-md border w-full"
              />
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
                  <span className="text-sm">Dostupné</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
                  <span className="text-sm">Obsazené</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-green-200 border border-green-300"></div>
                  <span className="text-sm">Ráno (do 10:00)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-red-200 border border-red-300"></div>
                  <span className="text-sm">Odpoledne (od 15:00)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rezervace přes WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                <div className="space-y-4">
                  <p><strong>Vybrané datum:</strong> {format(selectedDate, 'dd.MM.yyyy')}</p>
                  <div className="space-y-2">
                    <p><strong>Dostupnost:</strong></p>
                    <div className="pl-4 space-y-1">
                      <p>Ráno (do 10:00): <span className={`font-medium ${getDayAvailability(selectedDate).am === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                        {getDayAvailability(selectedDate).am === 'available' ? 'Dostupné' : 'Obsazené'}
                      </span></p>
                      <p>Odpoledne (od 15:00): <span className={`font-medium ${getDayAvailability(selectedDate).pm === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                        {getDayAvailability(selectedDate).pm === 'available' ? 'Dostupné' : 'Obsazené'}
                      </span></p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={openWhatsApp}
                    className="w-full gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Rezervovat přes WhatsApp
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Vyberte datum v kalendáři nebo nás kontaktujte přímo.
                  </p>
                  <Button 
                    onClick={openWhatsApp}
                    className="w-full gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Kontaktovat přes WhatsApp
                  </Button>
                </div>
              )}
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Informace</h4>
                <ul className="text-sm space-y-1">
                  <li>• Check-in: od 15:00</li>
                  <li>• Check-out: do 10:00</li>
                  <li>• Cena: 150€/noc</li>
                  <li>• Maximální kapacita: 8 osob</li>
                  <li>• Rezervace pouze přes WhatsApp</li>
                </ul>
              </div>

              {isAdmin && (
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = '/admin'}
                    className="w-full"
                  >
                    Admin Panel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReservationCalendar;