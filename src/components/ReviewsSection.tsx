import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Marie Novotná",
      location: "Praha",
      rating: 5,
      date: "Listopad 2024",
      text: "Úžasná chata s krásným výhledem na hory! Vybavení bylo perfektní pro naši velkou rodinu. Děti si užily trampolínu a my klidné večery u krbu. Určitě se vrátíme!",
      highlight: "Perfektní pro rodiny"
    },
    {
      name: "Tomáš Svoboda",
      location: "Brno", 
      rating: 5,
      date: "Říjen 2024",
      text: "Skvělé místo pro firemní akce. Prostorná společenská místnost, kulečník a venkovní zázemí - všichni byli nadšení. Organizace byla bezproblémová.",
      highlight: "Ideální pro firmy"
    },
    {
      name: "Petra Horáková",
      location: "Ostrava",
      rating: 5, 
      date: "Září 2024",
      text: "Chata je ještě krásnější než na fotkách! Čisté, moderní vybavení a úžasná poloha blízko ski areálů. Majitelé byli velmi vstřícní a ochotní.",
      highlight: "Krásná poloha"
    },
    {
      name: "Jan Dvořák",
      location: "Olomouc",
      rating: 5,
      date: "Srpen 2024", 
      text: "Perfektní dovolená s přáteli! Bazén, gril, ping pong - zábava pro celý týden. Kuchyň má vše potřebné a pokoje jsou pohodlné. Doporučujeme!",
      highlight: "Skvělá zábava"
    },
    {
      name: "Eva Černá",
      location: "České Budějovice",
      rating: 5,
      date: "Červenec 2024",
      text: "Nádherné místo pro odpočinek v přírodě. Ticho, čerstvý vzduch a krásné výhledy. Termální lázně v okolí jsou bonus. Už plánujeme další návštěvu!",
      highlight: "Krásná příroda"
    },
    {
      name: "Martin Procházka",
      location: "Pardubice",
      rating: 5,
      date: "Březen 2024",
      text: "Zimní pobyt byl fantastický! Blízko ski areálů, teplá chata s kamny a vše co potřebujete. Skvělé místo pro lyžařskou dovolenou s kamarády.",
      highlight: "Top pro lyžování"
    }
  ];

  const stats = [
    { label: "Průměrné hodnocení", value: "4.9", unit: "/5" },
    { label: "Počet recenzí", value: "127", unit: "" },
    { label: "Doporučuje", value: "98", unit: "%" },
    { label: "Opakovaní hosté", value: "76", unit: "%" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mountain-forest mb-4">
            Recenze Hostů
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Přečtěte si, co o našem chaletu říkají spokojení hosté
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-soft transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-mountain-forest mb-2">
                  {stat.value}<span className="text-lg text-muted-foreground">{stat.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="group hover:shadow-mountain transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 text-mountain-forest/20">
                <Quote className="h-8 w-8" />
              </div>
              
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {review.highlight}
                  </Badge>
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-mountain-forest/10">
                  <div>
                    <p className="font-semibold text-mountain-forest">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="inline-block bg-gradient-to-r from-mountain-forest/5 to-mountain-sky/5 border-mountain-forest/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-mountain-forest mb-3">
                Přidejte se k našim spokojeným hostům
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Rezervujte si pobyt v našem horském chaletu a vytvořte si nezapomenutelné vzpomínky
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Průměrné hodnocení 4.9 z 5 hvězd
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;