import HeroSection from '@/components/home/hero-section';
import RecommendationSection from '@/components/home/recommendation-section';
import ServicesSection from '@/components/home/services-section';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <Separator className="my-12 md:my-24" />
      <RecommendationSection />
    </div>
  );
}
