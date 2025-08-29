import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, Zap } from "lucide-react";

const PricingSection = () => {
  const pricingPlans = [
    {
      title: "Víkendový pobyt",
      subtitle: "Ideální pro krátké odpočinky",
      icon: <Clock className="h-8 w-8" />,
      capacity: "Až 10 osob",
      basePrice: "3.000 - 6.000 Kč",
      period: "/ noc",
      features: [
        "Základní cena pro víkendové pobyty",
        "Dodatečně 300 Kč/osoba/noc nad 10 osob",
        "Energetické náklady navíc",
        "Min. 2 noci o víkendu"
      ],
      highlight: false
    },
    {
      title: "Týdenní pobyt",
      subtitle: "Nejoblíbenější volba",
      icon: <Calendar className="h-8 w-8" />,
      capacity: "Až 15 osob",
      basePrice: "21.000 - 28.000 Kč",
      period: "/ týden",
      features: [
        "Letní i zimní sezóna",
        "Dodatečně 1.400 Kč/osoba/týden nad 15 osob", 
        "Energetické náklady navíc",
        "Ideální pro dovolenou"
      ],
      highlight: true
    },
    {
      title: "Silvestr",
      subtitle: "Speciální novoroční pobyt",
      icon: <Zap className="h-8 w-8" />,
      capacity: "Až 20 osob",
      basePrice: "40.000 Kč",
      period: "/ týden",
      features: [
        "Novoroční týden",
        "Energetické náklady navíc",
        "Rezervace s předstihem",
        "Nezapomenutelný Silvestr"
      ],
      highlight: false
    }
  ];

  const additionalServices = [
    {
      service: "Výčepní zařízení LINDR PIGMY 25/K",
      weekendPrice: "250 Kč",
      weeklyPrice: "500 Kč"
    },
    {
      service: "Domácí zvířata (po domluvě)",
      weekendPrice: "500 Kč",
      weeklyPrice: "500 Kč"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mountain-forest mb-4">
            Cenník a Rezervace
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparentní ceny pro všechny typy pobytů. Děti do 4 let zdarma.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden group hover:shadow-mountain transition-all duration-300 hover:-translate-y-2 ${
                plan.highlight ? 'border-mountain-sky shadow-mountain bg-gradient-to-b from-mountain-sky/5 to-background' : ''
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-sky text-mountain-snow text-center py-2 text-sm font-semibold">
                  Nejoblíbenější
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.highlight ? 'pt-12' : ''}`}>
                <div className={`mx-auto mb-4 p-4 rounded-full text-mountain-snow ${
                  plan.highlight ? 'bg-mountain-sky' : 'bg-gradient-forest'
                } group-hover:scale-110 transition-transform duration-300`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-xl text-mountain-forest">{plan.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-mountain-forest" />
                    <span className="text-sm text-mountain-forest font-medium">{plan.capacity}</span>
                  </div>
                  <div className="text-3xl font-bold text-mountain-forest">{plan.basePrice}</div>
                  <div className="text-sm text-muted-foreground">{plan.period}</div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-mountain-forest rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.highlight ? "booking" : "outline-mountain"} 
                  size="lg" 
                  className="w-full"
                >
                  <Calendar className="h-4 w-4" />
                  Rezervovat
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <Card className="bg-gradient-to-r from-mountain-stone/20 to-mountain-sky/10 border-mountain-forest/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-mountain-forest">Dodatečné služby</CardTitle>
            <p className="text-muted-foreground">Rozšiřte si pobyt o další služby</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-mountain-forest/20">
                    <th className="text-left py-3 text-mountain-forest font-semibold">Služba</th>
                    <th className="text-center py-3 text-mountain-forest font-semibold">Víkend</th>
                    <th className="text-center py-3 text-mountain-forest font-semibold">Týden</th>
                  </tr>
                </thead>
                <tbody>
                  {additionalServices.map((service, index) => (
                    <tr key={index} className="border-b border-mountain-forest/10">
                      <td className="py-4 text-muted-foreground">{service.service}</td>
                      <td className="text-center py-4 font-semibold text-mountain-forest">{service.weekendPrice}</td>
                      <td className="text-center py-4 font-semibold text-mountain-forest">{service.weeklyPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-6 bg-mountain-forest/5 rounded-xl">
              <h4 className="font-semibold text-mountain-forest mb-3">Platební podmínky:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Záloha 50% při rezervaci</li>
                <li>• Doplatek při příjezdu</li>
                <li>• Energetické náklady se počítají podle skutečné spotřeby</li>
                <li>• Kauce 5.000 Kč (vrácena po kontrole objektu)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;