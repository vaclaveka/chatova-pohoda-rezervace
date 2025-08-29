import { Button } from "@/components/ui/button";
import { Calendar, Users, Star, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-cabin.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-mountain-snow">
          {/* Rating and Location */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-mountain-snow/90">4.9 z 5 hvězd</span>
            </div>
            <div className="flex items-center gap-2 text-mountain-snow/90">
              <MapPin className="h-5 w-5" />
              <span>Jindřichov - Nové Losiny, Jeseníky</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Stylová Horská Chata
            <span className="block text-mountain-sky">v Srdci Jeseníků</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-mountain-snow/90 max-w-3xl mx-auto leading-relaxed">
            Prostorný, stylový chalet v klidném prostředí blízko ski areálů, termálních lázní a turistických tras. 
            Ideální pro větší skupiny v létě i v zimě.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-mountain-snow/90">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="text-lg font-semibold">Až 20 osob</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-mountain-snow/30" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">5 ložnic + společenská místnost</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-mountain-snow/30" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Venkovní zázemí</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button variant="booking" size="xl" className="w-full md:w-auto">
              <Calendar className="h-6 w-6" />
              Zkontrolovat dostupnost
            </Button>
            <Button variant="outline" size="xl" className="w-full md:w-auto border-mountain-snow text-mountain-snow hover:bg-mountain-snow hover:text-mountain-forest">
              Prohlédnout fotky
            </Button>
          </div>

          {/* Price Preview */}
          <div className="mt-10 p-6 bg-mountain-snow/10 backdrop-blur-sm rounded-xl border border-mountain-snow/20 inline-block">
            <p className="text-mountain-snow/80 mb-2">Od</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">3.000 Kč</span>
              <span className="text-mountain-snow/80">/ noc</span>
            </div>
            <p className="text-sm text-mountain-snow/70 mt-1">Pro víkendové pobyty až 10 osob</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-mountain-snow/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-mountain-snow/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;