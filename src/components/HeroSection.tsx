import { Button } from "@/components/ui/button";
import { Calendar, Users, Star, MapPin, ChevronDown } from "lucide-react";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-gradient-mountain bg-contain sm:bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `url(/3.jpg)`
        }} 
      />
      
      {/* Smooth seamless blend - starts with background color */}
      <div className="absolute inset-0 bg-gradient-to-b from-mountain-earth/20 via-transparent to-mountain-earth/90" />
      
      {/* Mobile additional overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-mountain-forest/40 via-transparent to-transparent sm:hidden" />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-mountain-snow">
          {/* Rating and Location */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <span className="text-mountain-snow/90">4.9 z 5 hvězd</span>
            </div>
            <div className="flex items-center gap-2 text-mountain-snow/90">
              <MapPin className="h-5 w-5" />
              <span>Jindřichov - Nové Losiny, Jeseníky</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Stylová Horská Chata
            <span className="block text-mountain-sky">v Srdci Jeseníků</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-mountain-snow/90 max-w-3xl mx-auto leading-relaxed px-4">Prostorná, stylová chata v klidném prostředí blízko ski areálů, termálních lázní a turistických tras. Ideální pro větší skupiny v létě i v zimě.</p>

          {/* Key Features */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 text-mountain-snow/90 px-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-base sm:text-lg font-semibold">Až 20 osob</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-mountain-snow/30" />
            <div className="flex items-center gap-2 text-center">
              <span className="text-base sm:text-lg font-semibold">5 ložnic + společenská místnost</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-mountain-snow/30" />
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-semibold">Venkovní zázemí</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Button size="lg" className="w-full sm:w-auto bg-mountain-snow text-mountain-forest hover:bg-mountain-snow/90" onClick={() => {
              const reservationSection = document.getElementById('reservation');
              reservationSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">Zkontrolovat dostupnost</span>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-mountain-snow bg-mountain-snow/20 text-white font-semibold hover:bg-mountain-snow hover:text-mountain-forest">
              <span className="text-sm sm:text-base">Prohlédnout fotky</span>
            </Button>
          </div>

          {/* Price Preview */}
          <div className="mt-10 mx-4 p-4 sm:p-6 bg-mountain-snow/10 backdrop-blur-sm rounded-xl border border-mountain-snow/20 inline-block">
            <p className="text-mountain-snow/80 mb-2 text-sm sm:text-base">Od</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold">3.000 Kč</span>
              <span className="text-mountain-snow/80 text-sm sm:text-base">/ noc</span>
            </div>
            <p className="text-xs sm:text-sm text-mountain-snow/70 mt-1">Pro víkendové pobyty až 10 osob</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-mountain-snow/50" />
      </div>
    </section>;
};
export default HeroSection;