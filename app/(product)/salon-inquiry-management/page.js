'use client';
import { FiMessageSquare } from 'react-icons/fi';
import FeaturePage from '@/components/product/FeaturePage';

export default function InquiriesPage() {
  return (
    <FeaturePage
      currentSlug="salon-inquiry-management"
      icon={<FiMessageSquare />}
      title="Salon Inquiry Management Software"
      heroDesc="Track salon inquiries, manage leads, and never miss a potential client with Swalook's inquiry management software."
      whyTitle="Why Inquiry Management Matters"
      whyDesc="Every unanswered inquiry is a lost client. Swalook helps you capture, organize, and follow up on every inquiry so no opportunity slips through the cracks."
      keyFeatures={[
        { title: 'Lead Capture', desc: 'Automatically capture inquiries from your website, social media, and walk-ins.' },
        { title: 'Follow-up Reminders', desc: 'Set automated follow-up reminders so leads never go cold.' },
        { title: 'Communication Logs', desc: 'Keep a complete history of all interactions with each lead.' },
        { title: 'Lead Status Tracking', desc: 'Track where each inquiry stands in your sales pipeline.' },
        { title: 'Conversion Analytics', desc: 'Measure inquiry-to-client conversion rates.' },
      ]}
      compareTitle="Why Choose Swalook for Inquiry Management?"
      compareDesc="Most salon tools focus only on existing clients. Swalook helps you nurture leads from first contact to loyal customer."
      withPoints={[
        'Never miss a potential client.',
        'Automate follow-ups for better conversion.',
        'Track inquiry sources and conversion rates.',
      ]}
      withCta="Ready to capture and convert more leads? Start your journey with Swalook."
    />
  );
}
