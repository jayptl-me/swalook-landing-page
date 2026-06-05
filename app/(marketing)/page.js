'use client';

import HomeHeroSection from '@/components/home/HomeHeroSection';
import HomeRouteSection from '@/components/home/HomeRouteSection';
import HomeAboutSection from '@/components/home/HomeAboutSection';
import HomeServicesSection from '@/components/home/HomeServicesSection';
import HomeProvideSection from '@/components/home/HomeProvideSection';
import HomeWhySection from '@/components/home/HomeWhySection';
import HomeRetentionSection from '@/components/home/HomeRetentionSection';
import HomeTestimonialsSection from '@/components/home/HomeTestimonialsSection';
import HomeCTASection from '@/components/home/HomeCTASection';
import HomeFeaturesOverviewSection from '@/components/home/HomeFeaturesOverviewSection';
import HomeFAQSection from '@/components/home/HomeFAQSection';
import {
  heroHighlights,
  featureGroups,
  whatSwalookHelps,
  whyReasons,
  retentionItems,
  noShowItems,
  useCases,
  faqItems,
  routeConnections,
} from '@/components/home/homeData';

export default function HomePage() {
  return (
    <>
      <HomeHeroSection heroHighlights={heroHighlights} />
      <HomeRouteSection routes={routeConnections} />
      <HomeAboutSection />
      <HomeServicesSection featureGroups={featureGroups} />
      <HomeProvideSection items={whatSwalookHelps} />
      <HomeWhySection items={whyReasons} />
      <HomeRetentionSection items={retentionItems} />
      <HomeTestimonialsSection items={noShowItems} />
      <HomeCTASection />
      <HomeFeaturesOverviewSection useCases={useCases} />
      <HomeFAQSection items={faqItems} />
    </>
  );
}
