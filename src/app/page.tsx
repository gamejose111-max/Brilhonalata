import HeroSection from '@/components/home/hero-section';
import GallerySection from '@/components/home/gallery-section';
import RecommendationSection from '@/components/home/recommendation-section';
import AnimatedServicesSection from '@/components/home/animated-services-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AnimatedServicesSection />
      <GallerySection />
      <RecommendationSection />
    </div>
  );
}
