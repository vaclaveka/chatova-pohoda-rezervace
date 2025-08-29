import { Button } from "@/components/ui/button";
import { Phone, Calendar, MapPin } from "lucide-react";

const CabinHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-mountain-forest">Chata Jindřichov</h1>
            <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Nové Losiny, Jeseníky</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <Button variant="outline-mountain" size="sm" className="hidden md:flex">
              <Phone className="h-4 w-4" />
              Kontakt
            </Button>
            <Button variant="booking" size="sm">
              <Calendar className="h-4 w-4" />
              Rezervovat
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CabinHeader;