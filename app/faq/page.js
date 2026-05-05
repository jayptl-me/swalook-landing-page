'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './FAQ.module.css';

const salonInfo = [
  { q: 'How do I set up Swalook for my salon?', a: 'Getting started is simple — sign up through our website, and our onboarding team will help you configure your salon profile, import existing client data, set up services, and train your staff. The entire process typically takes less than a day.' },
  { q: 'Can I manage multiple salon branches?', a: 'Yes! Swalook supports multi-location management. You can monitor performance, manage staff, and track inventory across all your branches from a single unified dashboard.' },
  { q: 'How does Swalook handle billing and GST?', a: 'Swalook generates professional, GST-compliant invoices automatically. Tax calculations are built-in, and you can send digital invoices to clients via WhatsApp or email with a single click.' },
  { q: 'What reports and analytics are available?', a: 'Swalook provides detailed reports on revenue trends, staff performance, service popularity, client retention rates, inventory usage, and more. All reports can be filtered by date range and exported for your records.' },
];

const clientInfo = [
  { q: 'How do I book an appointment through Swalook?', a: 'You can book appointments online through your salon\'s Swalook-powered booking page or via the mobile app. Simply select your preferred service, stylist, date, and time — and you\'ll receive instant confirmation.' },
  { q: 'Is my personal data safe with Swalook?', a: 'Absolutely. Swalook uses industry-standard encryption and secure cloud storage. Your personal data is never shared with third parties and can be deleted upon your request at any time.' },
  { q: 'Will I get reminders for my appointments?', a: 'Yes! You\'ll receive automated SMS and email reminders before your appointment so you never miss a visit. You can also reschedule directly from the reminder notification.' },
  { q: 'How do loyalty rewards work?', a: 'Your salon may offer a Swalook-powered loyalty program where you earn points for every visit or purchase. These points can be redeemed for discounts, free services, or special offers — ask your salon for details.' },
];

const generalFaqs = [
  { q: 'What marketing tools does Swalook offer?', a: 'Swalook provides automated marketing features such as SMS and email campaigns, client re-engagement tools, loyalty programs, birthday reminders, and promotional offers to keep your clients coming back.' },
  { q: 'Can I access Swalook on my mobile device?', a: 'Absolutely! Swalook is available on both iOS and Android devices, so you and your team can manage appointments, view reports, and access client details on the go.' },
  { q: 'Does Swalook support multiple salon locations?', a: 'Yes, Swalook can manage multiple branches or salon locations under one account. You can easily switch between branches and monitor performance individually or collectively.' },
  { q: 'Is client data secure with Swalook?', a: 'We take data security seriously. Swalook uses industry-standard encryption and secure cloud storage to ensure your data is protected at all times.' },
  { q: 'Do I need any technical expertise to use Swalook?', a: 'Not at all. Swalook is designed to be user-friendly with an intuitive interface. Our onboarding team and support resources will guide you every step of the way.' },
  { q: 'How can I get started with Swalook?', a: 'You can Book a Demo or Sign Up through our website. Our team will help set up your account, import your data, and get your salon up and running smoothly.' },
];

function FAQAccordion({ items, category }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      {category && <h2 className={styles.faqCategoryTitle}>{category}</h2>}
      {items.map((item, i) => (
        <AnimatedSection key={i} delay={i * 0.05}>
          <div className={styles.faqItem}>
            <button className={styles.faqQuestion} onClick={() => setOpen(open === i ? null : i)}>
              {item.q}
              <FiPlus className={`${styles.faqIcon} ${open === i ? styles.faqIconOpen : ''}`} />
            </button>
            <div className={`${styles.faqAnswer} ${open === i ? styles.faqAnswerOpen : ''}`}>
              <div className={styles.faqAnswerInner}>{item.a}</div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <PageHero
        label="FAQ"
        title="Frequently Asked Questions"
        highlight="Find Your Answers Here"
        description="Browse common questions from salon owners and clients about Swalook."
      />

      {/* Salon Info */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <FAQAccordion items={salonInfo} category="For Salon Owners" />
        </div>
      </section>

      {/* Client Info */}
      <section className={`${styles.faqSection} ${styles.faqSectionAlt}`}>
        <div className={styles.faqContainer}>
          <FAQAccordion items={clientInfo} category="For Salon Clients" />
          <div className={styles.askBtn}>
            <Link href="/contact" className="btn btn-outline btn-sm">
              Have More Questions? <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* General FAQ */}
      <section className={styles.generalFaq}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">General</span>
            <h2 className="section-title">You Can Find All Answers Here</h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.generalFaqGrid}>
          {generalFaqs.map((faq, i) => (
            <StaggerItem key={i}>
              <div className={styles.generalFaqCard}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
}
