import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wifi, 
  Car, 
  Users, 
  Bed, 
  Bath, 
  Tv, 
  ChefHat, 
  Gamepad2, 
  TreePine, 
  Car as ParkingIcon,
  Waves,
  Baby
} from "lucide-react";

const AmenitiesSection = () => {
  const mainFeatures = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Kapacita až 20 osob",
      description: "5 čtyřlůžkových pokojů s TV a ložním prádlem"
    },
    {
      icon: <ChefHat className="h-8 w-8" />,
      title: "Plně vybavená kuchyň",
      description: "Sporáková deska, lednice, mrazák, mikrovlnka, myčka nádobí"
    },
    {
      icon: <Bath className="h-8 w-8" />,
      title: "3 koupelny",
      description: "2 se sprchou, 1 s vanou a WC, 3 samostatná WC"
    },
    {
      icon: <TreePine className="h-8 w-8" />,
      title: "Venkovní zázemí",
      description: "Krytá terasa, trampolína, houpačky, pískoviště, ping pong"
    },
    {
      icon: <Waves className="h-8 w-8" />,
      title: "Bazén a gril",
      description: "Venkovní bazén, ohniště, udírna pro letní grilovačky"
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "Wi-Fi připojení",
      description: "Vysokorychlostní internet v celém objektu"
    }
  ];

  const additionalAmenities = [
    { icon: <Tv className="h-6 w-6" />, text: "Plazma TV s kabelovou TV" },
    { icon: <Gamepad2 className="h-6 w-6" />, text: "Kulečník v společenské místnosti" },
    { icon: <ParkingIcon className="h-6 w-6" />, text: "Oplocené parkování" },
    { icon: <Baby className="h-6 w-6" />, text: "Dětská postýlka k dispozici" },
    { icon: <ChefHat className="h-6 w-6" />, text: "Výčepní zařízení k pronájmu" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mountain-forest mb-4">
            Vybavení a Služby
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Moderní chata s kompletním vybavením pro pohodlný pobyt větších skupin
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-mountain transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-forest rounded-full text-mountain-snow group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg text-mountain-forest">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Gallery with Details */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {/* Interior */}
          <Card className="overflow-hidden group hover:shadow-mountain transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src="/interior-common.jpg" 
                alt="Interiér společenské místnosti s kuchyní" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-mountain-forest text-base">Společenská místnost</CardTitle>
            </CardHeader>
          </Card>

          {/* Bedroom */}
          <Card className="overflow-hidden group hover:shadow-mountain transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src="/bedroom.jpg" 
                alt="Pokoj s lůžky a TV" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-mountain-forest text-base">Pokoje</CardTitle>
            </CardHeader>
          </Card>

          {/* Outdoor */}
          <Card className="overflow-hidden group hover:shadow-mountain transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src="/outdoor-facilities.jpg" 
                alt="Venkovní zázemí s hracími prvky" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-mountain-forest text-base">Venkovní areál</CardTitle>
            </CardHeader>
          </Card>

          {/* Additional Images */}
          <Card className="overflow-hidden group hover:shadow-mountain transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src="/07.JPG" 
                alt="Pohled na chatu" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-mountain-forest text-base">Exteriér</CardTitle>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden group hover:shadow-mountain transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src="/19.jpg" 
                alt="Vnitřní prostory" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-mountain-forest text-base">Interiér</CardTitle>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden group hover:shadow-mountain transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src="/3.jpg" 
                alt="Pohled na objekt" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-mountain-forest text-base">Chata</CardTitle>
            </CardHeader>
          </Card>

          <Card className="overflow-hidden group hover:shadow-mountain transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src="/IMG_20191013_151234.jpg" 
                alt="Venkovní prostředí" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-mountain-forest text-base">Okolí chaty</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Additional Amenities */}
        <Card className="bg-gradient-to-r from-mountain-stone/20 to-mountain-sky/10 border-mountain-forest/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-mountain-forest">Další vybavení</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalAmenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="text-mountain-forest">{amenity.icon}</div>
                  <span className="text-sm text-muted-foreground">{amenity.text}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-mountain-forest/5 rounded-xl">
              <h4 className="font-semibold text-mountain-forest mb-3">Důležité informace:</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Dřevěné podlahy - doporučujeme vzít si přezůvky</li>
                <li>• Zákaz kouření v interiéru - vyhrazené místo venku</li>
                <li>• Domácí zvířata po domluvě (500 Kč za pobyt)</li>
                <li>• Děti do 4 let zdarma</li>
                <li>• Centrální plynové topení + kachlová kamna</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AmenitiesSection;