import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Car, 
  Train, 
  Mountain, 
  Waves, 
  TreePine,
  Utensils,
  ShoppingCart,
  Clock,
  Navigation
} from "lucide-react";

const LocationSection = () => {
  const nearbyAttractions = [
    {
      name: "Ski areál Přemyslov",
      distance: "5 km",
      type: "Lyžování",
      icon: <Mountain className="h-5 w-5" />,
      description: "Rodinný ski areál s umělým zasněžováním"
    },
    {
      name: "Ski areál Branná", 
      distance: "8 km",
      type: "Lyžování",
      icon: <Mountain className="h-5 w-5" />,
      description: "Větší ski areál s různými trasami"
    },
    {
      name: "Termální lázně Velké Losiny",
      distance: "12 km", 
      type: "Wellness",
      icon: <Waves className="h-5 w-5" />,
      description: "Léčebné termální prameny a wellness"
    },
    {
      name: "Jesenický hřeben",
      distance: "15 km",
      type: "Turistika",
      icon: <TreePine className="h-5 w-5" />,
      description: "Nejkrásnější turistické trasy Jeseníků"
    }
  ];

  const nearbyServices = [
    {
      name: "Penzion Trojkámen",
      distance: "200 m",
      type: "Restaurace",
      icon: <Utensils className="h-5 w-5" />
    },
    {
      name: "X-Park Františkov", 
      distance: "2 km",
      type: "Restaurace",
      icon: <Utensils className="h-5 w-5" />
    },
    {
      name: "Jednota Coop",
      distance: "700 m", 
      type: "Obchod",
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      name: "Penny Market Hanušovice",
      distance: "8 km",
      type: "Supermarket",
      icon: <ShoppingCart className="h-5 w-5" />
    }
  ];

  const transportOptions = [
    {
      type: "Vlakem",
      icon: <Train className="h-6 w-6" />,
      description: "Železniční zastávka 200 m od chaty",
      details: "Přímé spojení z Olomouce, Šumperka"
    },
    {
      type: "Autobusem", 
      icon: <Car className="h-6 w-6" />,
      description: "Autobusová zastávka 200 m od chaty",
      details: "Regionální linky do okolních měst"
    },
    {
      type: "Autem",
      icon: <Car className="h-6 w-6" />, 
      description: "Oplocené parkování u chaty",
      details: "2,5 hod z Prahy, 1,5 hod z Brna"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mountain-forest mb-4">
            Poloha a Okolí
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Jindřichov - Nové Losiny v srdci Jeseníků. Ideální výchozí bod pro zimní i letní aktivity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map Placeholder */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden shadow-mountain h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-mountain-forest">
                  <MapPin className="h-6 w-6" />
                  Interaktivní mapa
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-square lg:aspect-[4/5] bg-gradient-mountain rounded-b-lg flex items-center justify-center relative overflow-hidden">
                  {/* Map placeholder - in real implementation, use Google Maps */}
                  <div className="text-center text-mountain-snow p-8">
                    <MapPin className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-semibold mb-2">Chata Jindřichov</h3>
                    <p className="mb-4 opacity-90">Nové Losiny, Jeseníky</p>
                    <Button variant="hero" size="lg">
                      <Navigation className="h-5 w-5" />
                      Zobrazit v mapě
                    </Button>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-mountain-snow rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-2 h-2 bg-mountain-snow/60 rounded-full"></div>
                  <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-mountain-snow/40 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Info */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-mountain-forest">Adresa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">Chata Jindřichov</p>
                  <p className="text-muted-foreground">Nové Losiny</p>
                  <p className="text-muted-foreground">788 25 Jindřichov</p>
                  <p className="text-muted-foreground">Jeseníky, Česká republika</p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Check-in: 15:00 | Check-out: 10:00
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Transport */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-mountain-forest">Doprava</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transportOptions.map((transport, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="text-mountain-forest">{transport.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-mountain-forest">{transport.type}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{transport.description}</p>
                      <p className="text-xs text-muted-foreground">{transport.details}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nearby Cities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-mountain-forest">Okolní města</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Hanušovice", distance: "8 km" },
                    { name: "Velké Losiny", distance: "12 km" },
                    { name: "Branná", distance: "8 km" },
                    { name: "Staré Město", distance: "15 km" },
                    { name: "Jeseník", distance: "25 km" },
                    { name: "Šumperk", distance: "30 km" }
                  ].map((city, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm">{city.name}</span>
                      <Badge variant="secondary" className="text-xs">{city.distance}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Attractions & Services */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Attractions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl text-mountain-forest">Okolní atrakce</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nearbyAttractions.map((attraction, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-mountain-sky/5 to-transparent rounded-lg border border-mountain-sky/20">
                  <div className="text-mountain-sky">{attraction.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-mountain-forest">{attraction.name}</h4>
                      <Badge variant="outline">{attraction.distance}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{attraction.description}</p>
                    <Badge variant="secondary" className="text-xs">{attraction.type}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl text-mountain-forest">Služby v okolí</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nearbyServices.map((service, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-mountain-forest/5 to-transparent rounded-lg border border-mountain-forest/20">
                  <div className="text-mountain-forest">{service.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-mountain-forest">{service.name}</h4>
                      <Badge variant="outline" className="text-xs">{service.distance}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.type}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;