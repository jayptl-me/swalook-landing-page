'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './FAQ.module.css';

const salonInfo = [
  {
    q: 'What can Swalook help my salon manage?',
    a: 'Swalook is built around appointment scheduling, billing and invoices, dashboards and analytics, inventory, staff and attendance visibility, loyalty, inquiry management, and branch control.',
  },
  {
    q: 'Can I manage multiple salon branches?',
    a: 'Yes. The public product story and backend route surface both support branch visibility and multi-location operational control.',
  },
  {
    q: 'Does Swalook support appointments and follow-ups?',
    a: 'Yes. Swalook supports appointment scheduling workflows and helps salons keep their calendars organized with reminders, confirmations, and follow-up-oriented messaging.',
  },
  {
    q: 'Can I review performance from one place?',
    a: 'Yes. Swalook includes dashboard and analytics surfaces so teams can review operational visibility, branch performance, and business reporting in one system.',
  },
];

const clientInfo = [
  {
    q: 'How do I explore Swalook before deciding?',
    a: 'Start with the product pages, then use the Book Demo or Free Trial routes to see how Swalook fits your salon workflow.',
  },
  {
    q: 'Where can I learn more about specific features?',
    a: 'The feature hub links into appointment scheduling, billing, inventory, analytics, marketing templates, staff attendance, loyalty, and other product pages.',
  },
  {
    q: 'Can I contact the team with questions?',
    a: 'Yes. You can use the contact page to reach the team directly, or use the demo and trial flows if you want a guided product discussion.',
  },
  {
    q: 'Where can I read supporting material?',
    a: 'The blog and FAQ sections are designed to support product education, evaluation, and internal linking across the site.',
  },
];

const generalFaqs = [
  {
    q: 'What makes Swalook more than a basic booking page?',
    a: 'Swalook is positioned as a broader beauty-business operations platform, covering retention, marketing, appointments, billing, analytics, and branch visibility rather than a single booking feature.',
  },
  {
    q: 'Which parts of the site should I visit first?',
    a: 'Start with the homepage for the overview, the feature hub for product depth, and the demo or trial routes if you want to continue toward evaluation.',
  },
  {
    q: 'Does Swalook support loyalty and repeat-customer workflows?',
    a: 'Yes. Loyalty and repeat-customer workflows are part of the market-now claim set and are reflected in the product and landing-page structure.',
  },
  {
    q: 'How should I contact Swalook for product questions?',
    a: 'Use the contact page for general questions, or the demo and trial pages if your next step is product evaluation.',
  },
  {
    q: 'Where can I see related product content?',
    a: 'The blog, feature pages, and FAQ are connected to help visitors move from education to product exploration without getting stuck in a dead end.',
  },
  {
    q: 'What if I want a more detailed product walkthrough?',
    a: 'The current public routes are built around the homepage, feature hub, blog, FAQ, demo, trial, and contact pages, so those are the best places to start.',
  },
];

function FAQAccordion({ items, category }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      {category && <h2 className={styles.faqCategoryTitle}>{category}</h2>}
      {items.map((item, i) => {
        const questionId = `faq-question-${category ? category.toLowerCase().replace(/\s+/g, '-') : 'general'}-${i}`;
        const answerId = `faq-answer-${category ? category.toLowerCase().replace(/\s+/g, '-') : 'general'}-${i}`;
        const isOpen = open === i;

        return (
          <AnimatedSection key={i} delay={i * 0.05}>
            <div className={styles.faqItem}>
              <button
                type="button"
                id={questionId}
                className={styles.faqQuestion}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                {item.q}
                <FiPlus className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`} />
              </button>
              <div
                id={answerId}
                className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ''}`}
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
              >
                <div className={styles.faqAnswerInner}>{item.a}</div>
              </div>
            </div>
          </AnimatedSection>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <PageHero
        label="FAQ"
        title="Frequently Asked Questions"
        highlight="Find the right page, feature, or next step."
        description="Browse common questions about Swalook, the product surface, and the best route for evaluation."
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
          <FAQAccordion items={clientInfo} category="For Visitors" />
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
            <h2 className="section-title">Product, Route, and Evaluation Help</h2>
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
