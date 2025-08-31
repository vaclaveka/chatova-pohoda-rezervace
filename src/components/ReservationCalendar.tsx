import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarCheck, 
  CalendarX, 
  Info,
  Calendar as CalendarIcon 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ReservationForm from "./ReservationForm";

const ReservationCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservedDates();
  }, []);

  const fetchReservedDates = async () => {
    try {
      const { data } = await supabase
        .from('reservations')
        .select('check_in_date, check_out_date')
        .eq('status', 'confirmed');

      const dates: Date[] = [];
      data?.forEach(reservation => {
        const checkIn = new Date(reservation.check_in_date);
        const checkOut = new Date(reservation.check_out_date);
        
        for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d));
        }
      });

      setReservedDates(dates);
    } catch (error) {
      console.error('Error fetching reserved dates:', error);
    }
  };

  const isDateReserved = (date: Date) => {
    return reservedDates.some(reservedDate => 
      date.getDate() === reservedDate.getDate() &&
      date.getMonth() === reservedDate.getMonth() &&
      date.getFullYear() === reservedDate.getFullYear()
    );
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && !isDateReserved(date);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mountain-forest mb-4">
            Rezervace a Dostupnost
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Zkontrolujte dostupné termíny a rezervujte si svůj pobyt v našem horském chaletu
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-mountain-forest">
                  <CalendarIcon className="h-6 w-6" />
                  Kalendář dostupnosti
                </CardTitle>
                <p className="text-muted-foreground">
                  Klikněte na dostupný datum pro začátek rezervace
                </p>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="pointer-events-auto"
                  disabled={(date) => !isDateAvailable(date)}
                  modifiers={{
                    reserved: reservedDates,
                    available: (date) => isDateAvailable(date),
                  }}
                  modifiersClassNames={{
                    reserved: "bg-destructive/20 text-destructive line-through",
                    available: "bg-mountain-sky/20 text-mountain-sky hover:bg-mountain-sky hover:text-mountain-snow",
                    selected: "bg-mountain-forest text-mountain-snow",
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Booking Info */}
          <div className="space-y-6">
            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-mountain-forest">Legenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-mountain-sky/20 border border-mountain-sky rounded"></div>
                  <span className="text-sm">Dostupné</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-destructive/20 border border-destructive rounded"></div>
                  <span className="text-sm">Obsazené</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-mountain-forest rounded"></div>
                  <span className="text-sm">Vybrané</span>
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Info */}
            {selectedDate && (
              <Card className="border-mountain-sky/30 bg-mountain-sky/5">
                <CardHeader>
                  <CardTitle className="text-lg text-mountain-forest flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5" />
                    Vybraný datum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold mb-4">
                    {selectedDate.toLocaleDateString('cs-CZ', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {user ? (
                    <Button 
                      variant="booking" 
                      size="lg" 
                      className="w-full"
                      onClick={() => setShowForm(true)}
                    >
                      <CalendarIcon className="h-5 w-5" />
                      Rezervovat od tohoto data
                    </Button>
                  ) : (
                    <Button 
                      variant="booking" 
                      size="lg" 
                      className="w-full"
                      onClick={() => navigate('/auth')}
                    >
                      <CalendarIcon className="h-5 w-5" />
                      Přihlásit se pro rezervaci
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-mountain-forest flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Rezervační podmínky
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">Min</Badge>
                  <span>Minimální pobyt 2 noci o víkendu, 7 nocí v hlavní sezóně</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">Záloha</Badge>
                  <span>50% při rezervaci, zbytek při příjezdu</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">Kauce</Badge>
                  <span>5.000 Kč (vrácena po kontrole objektu)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">Storno</Badge>
                  <span>Zdarma do 14 dní před příjezdem</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-gradient-to-br from-mountain-forest/5 to-mountain-sky/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-mountain-forest mb-3">
                  Potřebujete poradit s rezervací?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Rádi vám pomůžeme s výběrem termínu a zodpovíme všechny vaše otázky.
                </p>
                <div className="space-y-2">
                  <Button variant="outline-mountain" size="sm" className="w-full">
                    📞 Zavolejte nám
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full">
                    ✉️ Napište email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin Panel */}
            {isAdmin && (
              <Card className="bg-gradient-to-br from-secondary/5 to-accent/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-mountain-forest mb-3">
                    Admin Panel
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Spravujte rezervace a zobrazte statistiky.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate('/admin')}
                  >
                    Otevřít Admin Dashboard
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Reservation Form */}
        {showForm && (
          <div className="mt-8">
            <ReservationForm 
              selectedDate={selectedDate} 
              onSuccess={() => {
                setShowForm(false);
                fetchReservedDates();
                setSelectedDate(undefined);
              }} 
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservationCalendar;