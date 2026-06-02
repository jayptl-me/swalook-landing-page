'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiArrowRight,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiGift,
  FiHeart,
  FiLayout,
  FiMail,
  FiMessageSquare,
  FiPackage,
  FiPlus,
  FiSettings,
  FiTrendingDown,
  FiTrendingUp,
  FiUsers,
  FiFileText,
} from 'react-icons/fi';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './Home.module.css';

const heroHighlights = [
  'Retention-led workflows',
  'Simple booking and follow-up',
];

const heroStats = [
  { value: '12', label: 'Feature groups' },
  { value: '3', label: 'Growth levers' },
  { value: '1', label: 'CRM system' },
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

function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`${styles.sectionHeading} ${align === 'left' ? styles.sectionHeadingLeft : ''}`}>
      <AnimatedSection>
        {eyebrow ? <span className="section-label">{eyebrow}</span> : null}
        <h2 className="section-title">{title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </AnimatedSection>
    </div>
  );
}

function StatPill({ value, label }) {
  return (
    <div className={styles.statPill}>
      <span>{value}</span>
      <p>{label}</p>
    </div>
  );
}

function InfoCard({ icon, title, desc }) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function RouteCard({ title, desc, href, cta }) {
  return (
    <Link href={href} className={styles.routeCard}>
      <div className={styles.routeCardTop}>
        <h3>{title}</h3>
        <FiArrowRight />
      </div>
      <p>{desc}</p>
      <span className={styles.routeCardLink}>{cta}</span>
    </Link>
  );
}

function FAQItem({ question, answer, id, open, onToggle }) {
  const buttonId = `faq-question-${id}`;
  const panelId = `faq-answer-${id}`;

  return (
    <div className={styles.faqItem}>
      <button
        type="button"
        id={buttonId}
        className={styles.faqQuestion}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>{question}</span>
        <FiPlus className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ''}`} />
      </button>
      <div
        id={panelId}
        className={`${styles.faqAnswer} ${open ? styles.faqAnswerOpen : ''}`}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
      >
        <div className={styles.faqAnswerInner}>{answer}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBackdrop} aria-hidden="true">
          <span className={styles.heroOrbOne} />
          <span className={styles.heroOrbTwo} />
          <span className={styles.heroGrid} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <AnimatedSection className={styles.heroCopy} direction="left">
              <span className={styles.heroLabel}>Growth platform for salons</span>
              <h1 className={styles.heroTitle}>
                Grow Your Salon Business
                <span className={styles.heroHighlight}> with retention, marketing, and fewer no-shows.</span>
              </h1>
              <p className={styles.heroDesc}>
                One place for bookings, follow-ups, and billing.
              </p>

              <div className={styles.heroStats}>
                {heroStats.map((stat) => (
                  <StatPill key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>

              <div className={styles.heroActions}>
                <Link href="/book-demo" className="btn btn-primary btn-lg">
                  Book Free Demo <FiArrowRight />
                </Link>
                <Link href="/free-trial" className="btn btn-outline btn-lg">
                  Start Free Trial
                </Link>
                <Link href="/salon-crm-features" className="btn btn-ghost btn-lg">
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
            </AnimatedSection>

            <AnimatedSection className={styles.heroVisualWrap} direction="right">
              <div className={styles.heroVisual}>
                <div className={styles.heroVisualFrame}>
                  <div className={styles.heroDeviceBar}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.heroDeviceBody}>
                    <div className={styles.heroDeviceHeader}>
                      <div>
                        <p className={styles.visualKicker}>Live CRM snapshot</p>
                        <h3>Operations moving in one place</h3>
                      </div>
                      <span className={styles.visualStatus}>Active today</span>
                    </div>

                    <div className={styles.heroMetricRow}>
                      <div className={styles.heroMetric}>
                        <span>124</span>
                        <p>Appointments</p>
                      </div>
                      <div className={styles.heroMetric}>
                        <span>38%</span>
                        <p>Repeat visits</p>
                      </div>
                      <div className={styles.heroMetric}>
                        <span>92%</span>
                        <p>Reminder reach</p>
                      </div>
                    </div>

                    <div className={styles.heroPanel}>
                      <div className={styles.panelHeader}>
                        <h4>Today’s workflow</h4>
                        <span>Salons • spas • multi-branch</span>
                      </div>
                      <div className={styles.panelList}>
                        <div>
                          <FiCheckCircle />
                          <span>Confirmations sent</span>
                        </div>
                        <div>
                          <FiCheckCircle />
                          <span>Billing synced</span>
                        </div>
                        <div>
                          <FiCheckCircle />
                          <span>Retention follow-ups scheduled</span>
                        </div>
                      </div>
                    </div>
                  </div>
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

      <section className={styles.routeSection}>
        <div className={styles.sectionShell}>
          <SectionHeading
            eyebrow="Navigation"
            title="Jump Into The Right Part Of The Product"
            subtitle="Use the product map to move into the feature pages, FAQ, blog content, and conversion paths."
          />
          <StaggerContainer className={styles.routeGrid}>
            {routeConnections.map((route) => (
              <StaggerItem key={route.title}>
                <RouteCard {...route} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.sectionShell}>
          <div className={styles.aboutGrid}>
            <AnimatedSection direction="left">
              <div className={styles.aboutImage}>
                <Image
                  src="/images/team-about.png"
                  alt="Swalook team and salon product story"
                  width={600}
                  height={450}
                  className={styles.aboutImg}
                  priority={false}
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className={styles.aboutContent}>
                <span className="section-label">About Swalook</span>
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
                  <Link href="/book-demo" className="btn btn-primary">
                    Book a Demo
                  </Link>
                  <Link href="/about" className="btn btn-outline">
                    Learn More
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.sectionShell}>
          <SectionHeading
            eyebrow="Features"
            title="12 Feature Groups That Drive Growth"
            subtitle="Everything you need to improve retention, reduce no-shows, track performance, and manage your beauty business with confidence."
          />
          <StaggerContainer className={styles.servicesGrid}>
            {featureGroups.map((feature) => (
              <StaggerItem key={feature.title}>
                <Link href={feature.link} className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                  <span className={styles.serviceLink}>Learn More <FiArrowRight /></span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className={styles.provideSection}>
        <div className={styles.sectionShell}>
          <SectionHeading
            eyebrow="What Swalook Helps You Do"
            title="A Clear Growth System For Your Beauty Business"
          />
          <StaggerContainer className={styles.whyGrid}>
            {whatSwalookHelps.map((item) => (
              <StaggerItem key={item.title}>
                <InfoCard {...item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.sectionShell}>
          <SectionHeading
            eyebrow="Why Swalook"
            title="Why Beauty Businesses Choose Swalook"
          />
          <StaggerContainer className={styles.whyGrid}>
            {whyReasons.map((reason) => (
              <StaggerItem key={reason.title}>
                <InfoCard {...reason} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className={styles.mobileAppSection}>
        <div className={styles.sectionShell}>
          <SectionHeading
            eyebrow="Customer Retention & Retargeting"
            title="Bring Customers Back More Often"
            align="left"
          />

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

          <AnimatedSection delay={0.2}>
            <p className={styles.sectionNote}>
              Use retention-focused follow-ups to turn one-time visitors into repeat customers.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <div className={styles.sectionShell}>
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
                    <div className={styles.testimonialIcon}>{item.icon}</div>
                    <h3>{item.title}</h3>
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
        </div>
      </section>

      <section className={styles.featuresOverview}>
        <div className={styles.sectionShell}>
          <SectionHeading
            eyebrow="Who Can Use Swalook"
            title="Built For Every Kind of Beauty Business"
            subtitle="Swalook works for small studios, busy wellness centers, and growing multi-branch brands that want better control and more repeat revenue."
          />
          <div className={styles.featureRows}>
            {useCases.map((item, i) => (
              <div key={item.title} className={`${styles.featureRow} ${i % 2 !== 0 ? styles.featureRowReverse : ''}`}>
                <AnimatedSection direction={i % 2 === 0 ? 'left' : 'right'}>
                  <div className={styles.featureImageBox}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className={styles.featureImage}
                      priority={i === 0}
                    />
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
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.sectionShell}>
          <AnimatedSection>
            <div className={styles.ctaContent}>
              <h2>See Swalook in Action</h2>
              <p>Book a free demo or start a free trial to see how Swalook can grow your beauty business.</p>
              <div className={styles.ctaActions}>
                <Link href="/book-demo" className="btn btn-primary btn-lg">
                  Book Free Demo <FiArrowRight />
                </Link>
                <Link href="/free-trial" className="btn btn-outline btn-lg">
                  Start Free Trial
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.faqPreview}>
        <div className={styles.sectionShell}>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
          />
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <AnimatedSection key={item.q} delay={i * 0.05}>
                <FAQItem
                  id={i}
                  question={item.q}
                  answer={item.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </AnimatedSection>
            ))}
            <div className={styles.faqMoreLink}>
              <Link href="/faq" className="btn btn-outline">
                People Also Ask <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
