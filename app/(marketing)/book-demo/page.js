'use client';

import PageHero from '@/components/marketing/PageHero';
import LeadForm from '@/components/marketing/LeadForm';

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        label="Book Demo"
        title="See Swalook in Action"
        highlight="Grow your salon with better retention, smarter marketing, and fewer no-shows."
        description="Book a free demo to see how Swalook can help your beauty business grow with one simple platform."
      />

      <LeadForm
        title="Book Your Free Demo"
        description="See how Swalook helps you manage customers, appointments, marketing, and branch performance from one place."
        bullets={[
          { text: 'Improve repeat visits with better retention and follow-up.' },
          { text: 'Reduce no-shows with reminders, confirmations, and automation.' },
          { text: 'Track staff, sales, and branch performance with clarity.' },
        ]}
        fields={[
          { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
          { name: 'salonName', label: 'Salon Name', type: 'text', placeholder: 'Salon name' },
          { name: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
          { name: 'city', label: 'City', type: 'text', placeholder: 'Your city' },
          { name: 'branches', label: 'Number Of Branches', type: 'text', placeholder: '1' },
          { name: 'businessType', label: 'Business Type', type: 'text', placeholder: 'Salon, spa, studio, clinic' },
        ]}
        submitLabel="Book Demo"
      />
    </>
  );
}
