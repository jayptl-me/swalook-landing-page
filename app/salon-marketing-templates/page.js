'use client';
import { FiMail } from 'react-icons/fi';
import FeaturePage from '@/components/FeaturePage';

export default function TemplatesPage() {
  return (
    <FeaturePage
      currentSlug="salon-marketing-templates"
      icon={<FiMail />}
      title="Ready-to-Use Salon Marketing Templates"
      heroDesc="Save time with Swalook's salon marketing templates. Send emails, SMS, and promotions that drive repeat bookings."
      whyTitle="Why Marketing Templates Matter"
      whyDesc="Consistent, professional communication builds trust. Swalook provides pre-designed templates so you can run marketing campaigns in minutes, not hours."
      keyFeatures={[
        { title: 'Email Templates', desc: 'Professional email templates for promotions, reminders, and newsletters.' },
        { title: 'SMS Templates', desc: 'Ready-to-send SMS templates for quick client communication.' },
        { title: 'Promotional Campaigns', desc: 'Launch seasonal promotions with pre-built campaign templates.' },
        { title: 'Custom Branding', desc: 'Customize templates with your salon\'s logo, colors, and messaging.' },
        { title: 'Automated Sending', desc: 'Schedule campaigns to send automatically at optimal times.' },
      ]}
      compareTitle="Why Choose Swalook Over Generic Marketing Tools?"
      compareDesc="Swalook's templates are designed specifically for salons and connected to your client data — enabling personalized, relevant communication that drives results."
      withPoints={[
        'Launch marketing campaigns in minutes.',
        'Personalize communication for better engagement.',
        'Drive repeat bookings with automated promotions.',
      ]}
      withCta="Ready to automate your salon marketing? Start your journey with Swalook."
    />
  );
}
