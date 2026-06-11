'use client';

import PageHero from '@/components/marketing/PageHero';
import LeadForm from '@/components/marketing/LeadForm';

export default function FreeTrialPage() {
  return (
    <>
      <PageHero
        label="Free Trial"
        title="Try Swalook Before You Decide"
        highlight="Start using Swalook to improve retention, reduce no-shows, and manage growth."
        description="Explore the platform with a free trial and see how Swalook fits your salon workflow."
      />

      <LeadForm
        title="Try Swalook Before You Decide"
        description="Experience the tools that help beauty businesses grow with better customer retention, smarter marketing, and simpler operations."
        bullets={[
          { text: 'See how automation saves time on follow-ups and reminders.' },
          { text: 'Test the tools for appointments, marketing, and reporting.' },
          { text: 'Discover how Swalook can support your business growth.' },
        ]}
        fields={[
          { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
          { name: 'salonName', label: 'Salon Name', type: 'text', placeholder: 'Salon name' },
          { name: 'mobile', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
          { name: 'city', label: 'City', type: 'text', placeholder: 'Your city' },
          { name: 'businessType', label: 'Business Type', type: 'text', placeholder: 'Salon, spa, studio, clinic' },
        ]}
        submitLabel="Start Free Trial"
      />
    </>
  );
}
