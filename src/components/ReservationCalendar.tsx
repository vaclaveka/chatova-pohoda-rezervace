import { useState } from "react";
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

const ReservationCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  // Mock reserved dates - in real app this would come from backend
  const reservedDates = [
    new Date(2024, 11, 15), // December 15, 2024
    new Date(2024, 11, 16), // December 16, 2024
    new Date(2024, 11, 22), // December 22, 2024
    new Date(2024, 11, 23), // December 23, 2024
    new Date(2024, 11, 29), // December 29, 2024
    new Date(2024, 11, 30), // December 30, 2024
    new Date(2024, 11, 31), // December 31, 2024 (New Year)
    new Date(2025, 0, 1),   // January 1, 2025
    new Date(2025, 0, 18),  // January 18, 2025
    new Date(2025, 0, 19),  // January 19, 2025
  ];

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
                  <Button variant="booking" size="lg" className="w-full">
                    <CalendarIcon className="h-5 w-5" />
                    Rezervovat od tohoto data
                  </Button>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationCalendar;