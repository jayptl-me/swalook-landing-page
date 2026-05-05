'use client';
import { FiLayout } from 'react-icons/fi';
import FeaturePage from '@/components/FeaturePage';

export default function DashboardPage() {
  return (
    <FeaturePage
      currentSlug="salon-dashboard-software"
      icon={<FiLayout />}
      title="Smart Salon Dashboard Software"
      heroDesc="Stay on top of your business with Swalook's real-time dashboard. Monitor key performance indicators, analyze staff productivity, and track revenue trends with an all-in-one view."
      whyTitle="Why Dashboards Matter for Salons"
      whyDesc="Without visibility, salons struggle with growth. Swalook empowers owners with instant access to sales, bookings, and performance metrics. Make faster, smarter decisions that drive profits."
      keyFeatures={[
        { title: 'Real-Time KPIs', desc: 'Monitor bookings, revenue, and staff performance instantly.' },
        { title: 'Customizable Views', desc: 'Focus on the data that matters most to your salon.' },
        { title: 'Comparative Analytics', desc: 'Compare monthly and seasonal performance trends.' },
        { title: 'Multi-Branch Monitoring', desc: 'Track multiple salon locations from one dashboard.' },
        { title: 'Data Export', desc: 'Export insights for reports and presentations.' },
      ]}
      compareTitle="Why Choose Swalook Over Generic Tools?"
      compareDesc="Swalook's dashboard isn't just a graph generator; it integrates appointments, inventory, and finances for a true 360° salon view."
      withPoints={[
        'Get real-time visibility of your business.',
        'Make data-driven decisions faster.',
        'Track growth with confidence.',
      ]}
      withCta="Ready to simplify your salon's performance with real-time analytics and key metrics? Start your journey with Swalook."
    />
  );
}
