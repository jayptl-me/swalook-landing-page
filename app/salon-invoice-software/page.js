'use client';
import { FiFileText } from 'react-icons/fi';
import FeaturePage from '@/components/FeaturePage';

export default function InvoicesPage() {
  return (
    <FeaturePage
      currentSlug="salon-invoice-software"
      icon={<FiFileText />}
      title="Smart Salon Invoice Software"
      heroDesc="Generate digital invoices, track payments, and simplify billing with Swalook's salon invoicing software. GST-ready and globally compliant."
      whyTitle="Why Digital Invoicing Matters for Salons"
      whyDesc="Manual invoicing leads to errors, delayed payments, and poor record-keeping. Swalook automates the entire billing workflow so you can focus on your craft while finances stay organized."
      keyFeatures={[
        { title: 'Professional Invoices', desc: 'Generate branded, professional-looking digital invoices instantly.' },
        { title: 'GST & Tax Ready', desc: 'Built-in tax calculations for GST and other regional tax formats.' },
        { title: 'Payment Tracking', desc: 'Track paid, pending, and overdue invoices in real-time.' },
        { title: 'WhatsApp Invoicing', desc: 'Send invoices directly to clients via WhatsApp.' },
        { title: 'Multi-Currency Support', desc: 'Handle international clients with multi-currency billing.' },
      ]}
      compareTitle="Why Choose Swalook Over Generic Billing Tools?"
      compareDesc="Swalook's invoicing is connected to your appointment calendar, inventory, and client profiles — meaning automatic line items, accurate pricing, and seamless financial tracking."
      withPoints={[
        'Automate your billing workflow completely.',
        'Send professional invoices via WhatsApp.',
        'Stay GST compliant effortlessly.',
      ]}
      withCta="Ready to simplify your salon's billing with professional digital invoices? Start your journey with Swalook."
    />
  );
}
