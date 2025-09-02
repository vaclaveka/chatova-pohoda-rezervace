import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Mountain, Facebook, Instagram, MessageCircle } from "lucide-react";
const Footer = () => {
  const quickLinks = [{
    label: "Rezervace",
    href: "#rezervace"
  }, {
    label: "Vybavení",
    href: "#vybaveni"
  }, {
    label: "Cenník",
    href: "#cenik"
  }, {
    label: "Poloha",
    href: "#poloha"
  }, {
    label: "Recenze",
    href: "#recenze"
  }];
  const nearbyPlaces = ["Ski areál Přemyslov", "Ski areál Branná", "Termální lázně Velké Losiny", "Jesenický hřeben", "Hanušovice", "Šumperk"];
  return <footer className="bg-gradient-to-b from-mountain-forest to-mountain-pine text-mountain-snow">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Chata Jindřichov</h3>
            </div>
            <p className="text-mountain-snow/80 mb-6 leading-relaxed">
              Stylový horský chalet v klidném prostředí Jeseníků. 
              Ideální pro rodinné dovolené, firemní akce a přátelské pobyty.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-mountain-snow/80 hover:text-mountain-snow hover:bg-mountain-snow/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-mountain-snow/80 hover:text-mountain-snow hover:bg-mountain-snow/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-mountain-snow/80 hover:text-mountain-snow hover:bg-mountain-snow/10">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Rychlé odkazy</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => <li key={index}>
                  <a href={link.href} className="text-mountain-snow/80 hover:text-mountain-snow transition-colors duration-200 text-sm">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Nearby Places */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Okolní atrakce</h4>
            <ul className="space-y-3">
              {nearbyPlaces.map((place, index) => <li key={index} className="text-mountain-snow/80 text-sm">
                  {place}
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-mountain-snow/60" />
                <div className="text-sm text-mountain-snow/80">
                  <p>Nové Losiny</p>
                  <p>788 25 Jindřichov</p>
                  <p>Jeseníky</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-mountain-snow/60" />
                <a href="tel:+420123456789" className="text-sm text-mountain-snow/80 hover:text-mountain-snow transition-colors">+420 724 216 298</a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-mountain-snow/60" />
                <a href="mailto:rezervace@chatajindrichov.cz" className="text-sm text-mountain-snow/80 hover:text-mountain-snow transition-colors">
                  rezervace@chatajindrichov.cz
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-mountain-snow/60" />
                <div className="text-sm text-mountain-snow/80">
                  <p>Check-in: 15:00</p>
                  <p>Check-out: 10:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking CTA */}
        <Card className="mt-12 bg-mountain-snow/10 backdrop-blur-sm border-mountain-snow/20">
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Připraveni na horskou dovolenou?</h3>
            <p className="text-mountain-snow/80 mb-6 max-w-2xl mx-auto">
              Rezervujte si pobyt v našem chaletu a užijte si krásy Jeseníků v každém ročním období
            </p>
            <Button variant="hero" size="xl" className="bg-mountain-snow text-mountain-forest hover:bg-mountain-snow/90">
              Rezervovat nyní
            </Button>
          </div>
        </Card>

        {/* Bottom Bar */}
        <div className="border-t border-mountain-snow/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-mountain-snow/60">© 2025 Chata Jindřichov. Všechna práva vyhrazena.</p>
            <div className="flex gap-6 text-sm text-mountain-snow/60">
              
              
              
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;