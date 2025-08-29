import CabinHeader from "@/components/CabinHeader";
import HeroSection from "@/components/HeroSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import PricingSection from "@/components/PricingSection";
import ReservationCalendar from "@/components/ReservationCalendar";
import LocationSection from "@/components/LocationSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CabinHeader />
      <main>
        <HeroSection />
        <AmenitiesSection />
        <PricingSection />
        <ReservationCalendar />
        <LocationSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;