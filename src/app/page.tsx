import HeroSection from '@/components/home/hero-section';
import RecommendationSection from '@/components/home/recommendation-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <RecommendationSection />
    </div>
  );
}
