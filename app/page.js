'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlus, FiCheckCircle } from 'react-icons/fi';
import {
  FiLayout, FiCalendar, FiFileText, FiBarChart2, FiMessageSquare,
  FiPackage, FiUsers, FiDollarSign, FiHeart, FiMail,
  FiTrendingDown, FiSettings, FiClock, FiTrendingUp,
  FiGift, FiBell
} from 'react-icons/fi';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './Home.module.css';

const heroHighlights = [
  'Retention-first workflows',
  'Appointment, billing, and branch visibility',
  'Built for salons, spas, and multi-branch teams',
];

const featureGroups = [
  { icon: <FiLayout />, title: 'Dashboard & Analytics', desc: 'See sales, bookings, retention, and daily performance at a glance.', link: '/salon-dashboard-software' },
  { icon: <FiBarChart2 />, title: 'Branch Performance', desc: 'Compare branches, track growth, and spot what drives revenue.', link: '/salon-dashboard-software' },
  { icon: <FiUsers />, title: 'Staff Target & Performance', desc: 'Measure staff targets, service output, and contribution to growth.', link: '/salon-staff-attendance-software' },
  { icon: <FiFileText />, title: 'Smart Billing & POS', desc: 'Create fast bills, manage payments, and keep billing accurate.', link: '/salon-invoice-software' },
  { icon: <FiCalendar />, title: 'Appointment Management', desc: 'Schedule, confirm, reschedule, and reduce booking confusion.', link: '/salon-appointment-scheduling-software' },
  { icon: <FiMessageSquare />, title: 'Inquiry & Lead Management', desc: 'Track every lead, follow up faster, and convert more enquiries.', link: '/salon-inquiry-management' },
  { icon: <FiPackage />, title: 'Inventory & Utilisation', desc: 'Monitor stock, usage, and replenishment before products run out.', link: '/salon-inventory-management-software' },
  { icon: <FiDollarSign />, title: 'Payroll & Salary', desc: 'Handle payroll, salary planning, and staff payouts with clarity.', link: '/salon-staff-attendance-software' },
  { icon: <FiClock />, title: 'Time & Attendance', desc: 'Track attendance, shifts, and working hours in one place.', link: '/salon-staff-attendance-software' },
  { icon: <FiHeart />, title: 'Loyalty & Combo Offers', desc: 'Build repeat visits with rewards, combos, and special offers.', link: '/salon-loyalty-program-software' },
  { icon: <FiMail />, title: 'Marketing Automation', desc: 'Run WhatsApp, SMS, and email campaigns without manual follow-up.', link: '/salon-marketing-templates' },
  { icon: <FiTrendingUp />, title: 'Purchase & Expense Tracking', desc: 'Track expenses, purchases, and costs to protect margins.', link: '/salon-expense-management-software' },
];

const whatSwalookHelps = [
  { icon: <FiTrendingUp />, title: 'Increase Repeat Customers', desc: 'Bring clients back with better retention, loyalty, and targeted follow-ups.' },
  { icon: <FiTrendingDown />, title: 'Reduce No-Shows', desc: 'Use reminders, confirmations, and timely follow-ups to protect your schedule.' },
  { icon: <FiBarChart2 />, title: 'Track Business Performance', desc: 'View branch, staff, and sales data clearly so you can make better decisions.' },
  { icon: <FiMail />, title: 'Run Marketing Campaigns', desc: 'Send offers and reactivation campaigns across WhatsApp, SMS, and email.' },
  { icon: <FiSettings />, title: 'Manage Operations Easily', desc: 'Keep appointments, billing, stock, and staff processes simple and connected.' },
];

const whyReasons = [
  { icon: <FiUsers />, title: 'Manage staff better', desc: 'Keep team roles, targets, and accountability clear across your salon.' },
  { icon: <FiPackage />, title: 'Control inventory', desc: 'Track stock and usage so products are always available when needed.' },
  { icon: <FiMessageSquare />, title: 'Follow up with clients', desc: 'Automate post-visit follow-ups and reactivation messages.' },
  { icon: <FiBell />, title: 'Reduce no-shows', desc: 'Send reminders and confirmations that help customers keep appointments.' },
  { icon: <FiMail />, title: 'Run marketing campaigns', desc: 'Reach customers with offers, reminders, and reactivation campaigns.' },
  { icon: <FiBarChart2 />, title: 'See branch performance', desc: 'Compare locations and understand which branch drives the most growth.' },
  { icon: <FiHeart />, title: 'Increase repeat visits', desc: 'Build loyalty and keep customers coming back more often.' },
];

const retentionItems = [
  { icon: <FiHeart />, title: 'Re-engage lapsed clients', desc: 'Target clients who have not visited recently with the right offer at the right time.' },
  { icon: <FiMessageSquare />, title: 'Personalize every follow-up', desc: 'Use visit history and preferences to make your messages more relevant.' },
  { icon: <FiGift />, title: 'Use loyalty and offers', desc: 'Reward repeat customers and encourage them to book again sooner.' },
  { icon: <FiMail />, title: 'Stay in touch automatically', desc: 'Keep your salon top of mind with scheduled WhatsApp, SMS, and email campaigns.' },
];

const noShowItems = [
  { icon: <FiBell />, title: 'Automated reminders', desc: 'Send appointment reminders before visits so customers do not forget.' },
  { icon: <FiCalendar />, title: 'Easy confirmations', desc: 'Let customers confirm or reschedule quickly to protect your calendar.' },
  { icon: <FiClock />, title: 'Timely follow-up', desc: 'Nudge clients before and after appointments to keep the schedule full.' },
  { icon: <FiCheckCircle />, title: 'Better front-desk visibility', desc: 'Help your team manage the day with clear booking and status updates.' },
];

const useCases = [
  {
    title: 'Single Salons and Studios',
    desc: 'Ideal for independent teams that want simpler operations, stronger retention, and more repeat bookings.',
    image: '/images/feature-appointments.png',
  },
  {
    title: 'Spas, Clinics, and Wellness Centers',
    desc: 'Great for appointment-led businesses that need better follow-up, clearer reporting, and smooth daily coordination.',
    image: '/images/feature-marketing.png',
  },
  {
    title: 'Multi-Branch Beauty Brands',
    desc: 'Built for growing brands that need branch visibility, staff targets, and centralized control across locations.',
    image: '/images/feature-profiles.png',
  },
];

const faqItems = [
  { q: 'What is Swalook?', a: 'Swalook is a revenue generation engine for the beauty industry that helps salons grow through better retention, smarter marketing, and simpler operations.' },
  { q: 'How does Swalook help reduce no-shows?', a: 'Swalook helps you send reminders, confirmations, and follow-ups so customers are less likely to miss appointments.' },
  { q: 'Can Swalook help multi-branch businesses?', a: 'Yes. Swalook helps you track branch performance, staff output, and business results across multiple locations.' },
  { q: 'Who should use Swalook?', a: 'Swalook is built for salons, spas, beauty studios, wellness centers, and growing multi-branch beauty businesses.' },
  { q: 'Can I try Swalook before deciding?', a: 'Yes. You can book a free demo or start a free trial to see how Swalook fits your business.' },
];

const routeConnections = [
  {
    title: 'Feature Hub',
    desc: 'Start with the product map and move into the depth pages that explain each growth workflow.',
    href: '/salon-crm-features',
    cta: 'Explore Features',
  },
  {
    title: 'Blog Index',
    desc: 'Read educational content that supports evaluation, search intent, and product discovery.',
    href: '/blogs',
    cta: 'Read the Blog',
  },
  {
    title: 'FAQ',
    desc: 'Use the FAQ to handle objections and route visitors back into the funnel.',
    href: '/faq',
    cta: 'Browse FAQs',
  },
  {
    title: 'Book Demo',
    desc: 'See Swalook in action with a guided conversion path for salon owners.',
    href: '/book-demo',
    cta: 'Book Free Demo',
  },
  {
    title: 'Free Trial',
    desc: 'Try the platform before you decide and see how it fits your workflow.',
    href: '/free-trial',
    cta: 'Start Free Trial',
  },
  {
    title: 'Contact Us',
    desc: 'Reach the team directly if you want a conversation instead of a self-serve path.',
    href: '/contact',
    cta: 'Contact Us',
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroShape1} />
          <div className={styles.heroShape2} />
          <div className={styles.heroShape3} />
          {[...Array(6)].map((_, i) => <div key={i} className={styles.heroParticle} />)}
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <motion.div
              className={styles.heroCopy}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.heroLabel}>Revenue Generation Engine For The Beauty Industry</span>
              <h1 className={styles.heroTitle}>
                Grow Your Salon Business{' '}
                <span className={styles.heroHighlight}>With Better Retention, Smarter Marketing & Fewer No-Shows.</span>
              </h1>
              <p className={styles.heroDesc}>
                One platform for retention, marketing, appointments, billing, and follow-ups so your team can focus on service, not spreadsheets.
              </p>

              <div className={styles.heroActions}>
                <Link href="/book-demo" className="btn btn-primary btn-lg">
                  Book Free Demo <FiArrowRight />
                </Link>
                <Link href="/free-trial" className="btn btn-outline btn-lg">
                  Start Free Trial
                </Link>
                <Link href="/salon-crm-features" className="btn btn-outline btn-lg">
                  Explore Features
                </Link>
              </div>

              <div className={styles.heroTrustStrip}>
                {heroHighlights.map((item) => (
                  <div key={item} className={styles.heroTrustItem}>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <AnimatedSection direction="right">
              <div className={styles.heroVisual}>
                <div className={styles.heroVisualFrame}>
                  <Image
                    src="/images/salon-hero.png"
                    alt="Swalook salon operations and customer management visual"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 520px"
                    className={styles.heroVisualImage}
                  />
                </div>
                <div className={styles.heroVisualCard}>
                  <p className={styles.heroVisualLabel}>Core platform</p>
                  <ul className={styles.heroVisualList}>
                    <li>Appointment scheduling and confirmations</li>
                    <li>Retention, loyalty, and follow-up workflows</li>
                    <li>Billing, analytics, and branch visibility</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <AnimatedSection direction="left">
            <div className={styles.aboutImage}>
              <Image
                src="/images/team-about.png"
                alt="Swalook team and salon product story"
                width={600}
                height={450}
                className={styles.aboutImg}
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-xl)' }}
              />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className={styles.aboutContent}>
              <h3>About Swalook</h3>
              <h2>Built to Grow Revenue for the Beauty Industry</h2>
              <p>
                Swalook is designed for salons, spas, beauty studios, and multi-branch businesses that want to grow
                smarter. We combine customer retention, marketing automation, appointments, billing, and operations
                into one simple platform so your team can focus on service, not spreadsheets.
              </p>
              <p>
                From repeat visits to branch reporting, Swalook helps you turn everyday operations into better
                customer experiences and stronger business results.
              </p>
              <div className={styles.aboutActions}>
                <Link href="/book-demo" className="btn btn-primary">Book a Demo</Link>
                <Link href="/about" className="btn btn-outline">Learn More</Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className={styles.servicesSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Features</span>
            <h2 className="section-title">12 Feature Groups That Drive Growth</h2>
            <p className="section-subtitle">
              Everything you need to improve retention, reduce no-shows, track performance, and manage your beauty business with confidence.
            </p>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.servicesGrid}>
          {featureGroups.map((feature) => (
            <StaggerItem key={feature.title}>
              <Link href={feature.link} style={{ display: 'block' }}>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                  <span className={styles.serviceLink}>Learn More <FiArrowRight /></span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ===== WHAT SWALOOK HELPS YOU DO ===== */}
      <section className={styles.provideSection}>
        <div className={styles.provideContent}>
          <AnimatedSection>
            <span className="section-label">What Swalook Helps You Do</span>
            <h2 className="section-title">A Clear Growth System For Your Beauty Business</h2>
            <div className={styles.whyGrid} style={{ marginTop: 32 }}>
              {whatSwalookHelps.map((item) => (
                <div key={item.title} className={styles.whyCard}>
                  <div className={styles.whyIcon}>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY SWALOOK ===== */}
      <section className={styles.whySection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Why Swalook</span>
            <h2 className="section-title">Why Beauty Businesses Choose Swalook</h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.whyGrid}>
          {whyReasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ===== CUSTOMER RETENTION & RETARGETING ===== */}
      <section className={styles.mobileAppSection}>
        <div className={styles.mobileAppGrid}>
          <div className="section-header">
            <AnimatedSection>
              <span className="section-label">Customer Retention & Retargeting</span>
              <h2 className="section-title">Bring Customers Back More Often</h2>
            </AnimatedSection>
          </div>

          <div className={styles.splitGrid}>
            <AnimatedSection direction="left">
              <div className={styles.splitMedia}>
                <Image
                  src="/images/feature-marketing.png"
                  alt="Retention and marketing workflow visual for Swalook"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className={styles.splitMediaImage}
                />
              </div>
            </AnimatedSection>

            <StaggerContainer className={styles.featureList}>
              {retentionItems.map((item) => (
                <StaggerItem key={item.title}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureItemIcon}>{item.icon}</div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <AnimatedSection delay={0.3}>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 28, fontSize: '0.92rem' }}>
              Use retention-focused follow-ups to turn one-time visitors into repeat customers.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== REDUCE NO-SHOWS ===== */}
      <section className={styles.testimonialsSection}>
        <AnimatedSection>
          <div className={styles.trustBadge}>
            <span className={styles.trustNumber}>Less</span>
            <h3>Reduce No-Shows and Protect Your Calendar</h3>
            <p>
              Keep your schedules fuller with reminders, confirmations, and easy follow-up workflows.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.splitGrid}>
          <StaggerContainer className={styles.testimonialGrid}>
            {noShowItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className={styles.testimonialCard}>
                  <div className={styles.whyIcon} style={{ marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ marginBottom: 10, fontSize: '1rem' }}>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection direction="right">
            <div className={styles.splitMedia}>
              <Image
                src="/images/feature-appointments.png"
                alt="Appointment reminder and confirmation workflow visual for Swalook"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className={styles.splitMediaImage}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHO CAN USE SWALOOK ===== */}
      <section className={styles.featuresOverview}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Who Can Use Swalook</span>
            <h2 className="section-title">Built For Every Kind of Beauty Business</h2>
            <p className="section-subtitle">
              Swalook works for small studios, busy wellness centers, and growing multi-branch brands that want better control and more repeat revenue.
            </p>
          </AnimatedSection>
        </div>
        {useCases.map((item, i) => (
          <div key={item.title} className={`${styles.featureRow} ${i % 2 !== 0 ? styles.featureRowReverse : ''}`}>
            <AnimatedSection direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className={styles.featureImageBox}>
                <Image src={item.image} alt={item.title} width={560} height={350} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-xl)' }} priority={i === 0} />
              </div>
            </AnimatedSection>
            <AnimatedSection direction={i % 2 === 0 ? 'right' : 'left'}>
              <div className={styles.featureTextBox}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </AnimatedSection>
          </div>
        ))}
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <AnimatedSection>
          <div className={styles.ctaContent}>
            <h2>See Swalook in Action</h2>
            <p>Book a free demo or start a free trial to see how Swalook can grow your beauty business.</p>
            <Link href="/book-demo" className="btn btn-primary btn-lg">
              Book Free Demo <FiArrowRight />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* ===== FAQ ===== */}
      <section className={styles.faqPreview}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </AnimatedSection>
        </div>
        <div className={styles.faqList}>
          {faqItems.map((item, i) => {
            const faqButtonId = `faq-question-${i}`;
            const faqPanelId = `faq-answer-${i}`;

            return (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className={styles.faqItem}>
                  <button
                    type="button"
                    id={faqButtonId}
                    className={styles.faqQuestion}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={faqPanelId}
                  >
                    {item.q}
                    <FiPlus className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ''}`} />
                  </button>
                  <div
                    id={faqPanelId}
                    className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ''}`}
                    role="region"
                    aria-labelledby={faqButtonId}
                    hidden={openFaq !== i}
                  >
                    <div className={styles.faqAnswerInner}>{item.a}</div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
          <div className={styles.faqMoreLink}>
            <Link href="/faq" className="btn btn-outline">People Also Ask <FiArrowRight /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
