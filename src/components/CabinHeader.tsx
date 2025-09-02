import { Button } from "@/components/ui/button";
import { Phone, Calendar, MapPin, User, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CabinHeader = () => {
  const {
    user,
    isAdmin,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  
  const scrollToReservation = () => {
    const reservationSection = document.getElementById('reservation');
    reservationSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-mountain-forest">Chata Losík</h1>
            <div className="hidden lg:flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Jindřichov, Jeseníky</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden lg:flex">
              <Phone className="h-4 w-4" />
              Kontakt
            </Button>
            {user ? <div className="flex items-center gap-2">
                {isAdmin && <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
                    Admin Panel
                  </Button>}
                <span className="text-sm hidden lg:inline">
                  Admin: {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Odhlásit
                </Button>
              </div> : <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
              <User className="h-4 w-4" />
              Admin
            </Button>}
            <Button variant="default" size="sm" onClick={scrollToReservation} className="bg-mountain-forest hover:bg-mountain-forest/90">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Rezervovat</span>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="default" size="sm" onClick={scrollToReservation} className="bg-mountain-forest hover:bg-mountain-forest/90">
              <Calendar className="h-4 w-4" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 text-muted-foreground pb-4 border-b">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Jindřichov, Jeseníky</span>
                  </div>
                  
                  <Button variant="outline" className="justify-start">
                    <Phone className="h-4 w-4" />
                    Kontakt
                  </Button>
                  
                  {user ? (
                    <div className="space-y-3">
                      {isAdmin && (
                        <Button variant="outline" onClick={() => navigate('/admin')} className="w-full justify-start">
                          Admin Panel
                        </Button>
                      )}
                      <div className="text-sm text-muted-foreground px-3">
                        Admin: {user.email}
                      </div>
                      <Button variant="outline" onClick={signOut} className="w-full justify-start">
                        Odhlásit
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => navigate('/auth')} className="justify-start">
                      <User className="h-4 w-4" />
                      Admin přihlášení
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>;
};
export default CabinHeader;