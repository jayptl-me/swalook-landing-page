'use client';
import { FiBarChart2 } from 'react-icons/fi';
import FeaturePage from '@/components/FeaturePage';

export default function AnalyticsPage() {
  return (
    <FeaturePage
      currentSlug="salon-analytics-software"
      icon={<FiBarChart2 />}
      title="Salon Analytics Software"
      heroDesc="Track sales trends, client behavior, and staff performance with Swalook's powerful salon analytics tools."
      whyTitle="Why Analytics Matter for Salon Growth"
      whyDesc="Data-driven salons grow faster. Swalook gives you actionable insights into what's working, what's not, and where to focus for maximum impact."
      keyFeatures={[
        { title: 'Sales Analytics', desc: 'Monitor daily, weekly, and monthly revenue trends.' },
        { title: 'Client Behavior Insights', desc: 'Understand client preferences, visit frequency, and spending.' },
        { title: 'Staff Performance', desc: 'Track each stylist\'s revenue, bookings, and client ratings.' },
        { title: 'Service Popularity', desc: 'See which services drive the most revenue and bookings.' },
        { title: 'Revenue Forecasting', desc: 'Predict future revenue based on historical trends.' },
      ]}
      compareTitle="Why Choose Swalook Over Spreadsheets?"
      compareDesc="Spreadsheets can't give you real-time insights connected to your bookings, inventory, and client data. Swalook pulls it all together automatically."
      withPoints={[
        'Make data-driven business decisions.',
        'Identify top-performing services and staff.',
        'Predict and plan for future growth.',
      ]}
      withCta="Ready to leverage powerful analytics for your salon? Start your journey with Swalook."
    />
  );
}
