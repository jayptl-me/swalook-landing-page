'use client';
import { FiCalendar } from 'react-icons/fi';
import FeaturePage from '@/components/FeaturePage';

export default function AppointmentsPage() {
  return (
    <FeaturePage
      currentSlug="salon-appointment-scheduling-software"
      icon={<FiCalendar />}
      title="Smart Salon Appointment Scheduling Software"
      heroDesc="Streamline your salon's appointment bookings with Swalook's advanced scheduling software. Enhance client satisfaction with easy-to-use tools."
      whyTitle="Why Appointment Scheduling Matters"
      whyDesc="Missed appointments cost salons thousands annually. Swalook's scheduling system reduces no-shows with automated reminders, enables online booking, and keeps your calendar organized 24/7."
      keyFeatures={[
        { title: 'Online Booking', desc: 'Let clients book appointments anytime from your website or app.' },
        { title: 'Automated Reminders', desc: 'Send SMS and email reminders to reduce no-shows.' },
        { title: 'Staff Calendar View', desc: 'See each stylist\'s availability at a glance.' },
        { title: 'Service Selection', desc: 'Clients choose services, stylists, date and time easily.' },
        { title: 'Walk-in Management', desc: 'Handle walk-ins alongside scheduled appointments seamlessly.' },
        { title: 'Recurring Appointments', desc: 'Set up repeated bookings for regular clients.' },
      ]}
      compareTitle="Why Choose Swalook Over Other Schedulers?"
      compareDesc="Unlike standalone schedulers, Swalook connects appointments directly to invoicing, client profiles, and analytics — giving you a seamless workflow from booking to billing."
      withPoints={[
        'Reduce no-shows with automated reminders.',
        'Let clients self-book online 24/7.',
        'Manage staff schedules effortlessly.',
      ]}
      withCta="Ready to simplify your salon's appointment scheduling? Start your journey with Swalook."
    />
  );
}
