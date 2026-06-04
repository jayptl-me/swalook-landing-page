'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FiLayout, FiCalendar, FiFileText, FiBarChart2, FiMessageSquare,
  FiPackage, FiUsers, FiDollarSign, FiHeart, FiMail, FiArrowRight, FiCheck,
  FiCheckCircle
} from 'react-icons/fi';
import PageHero from '@/components/marketing/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import styles from './Features.module.css';

const features = [
  { icon: <FiLayout />, title: 'Dashboard', href: '/salon-dashboard-software', desc: 'Gain valuable insights into your salon\'s performance with real-time analytics.' },
  { icon: <FiCalendar />, title: 'Appointments', href: '/salon-appointment-scheduling-software', desc: 'Simplify scheduling with our intuitive calendar.' },
  { icon: <FiFileText />, title: 'Invoices', href: '/salon-invoice-software', desc: 'Generate professional digital invoices and track payments.' },
  { icon: <FiBarChart2 />, title: 'Analysis', href: '/salon-analytics-software', desc: 'Track sales trends and client behavior with powerful tools.' },
  { icon: <FiMessageSquare />, title: 'Inquiries', href: '/salon-inquiry-management', desc: 'Track customer inquiries and manage lead follow-ups.' },
  { icon: <FiPackage />, title: 'Inventory', href: '/salon-inventory-management-software', desc: 'Monitor product levels and set low-stock alerts.' },
  { icon: <FiUsers />, title: 'Staff & Attendance', href: '/salon-staff-attendance-software', desc: 'Manage your team\'s roles, shifts, and performance.' },
  { icon: <FiDollarSign />, title: 'Expense & Purchasing', href: '/salon-expense-management-software', desc: 'Track expenses, purchases, and payment history.' },
  { icon: <FiHeart />, title: 'Customer Loyalty', href: '/salon-loyalty-program-software', desc: 'Boost retention with customized loyalty programs.' },
  { icon: <FiMail />, title: 'Templates', href: '/salon-marketing-templates', desc: 'Ready-to-use marketing templates for emails and SMS.' },
];

const whyPoints = [
  'Save time with automation',
  'Increase revenue with smarter insights',
  'Improve client satisfaction with personalization',
  'Stay compliant with tax and multi-location needs',
];

const withPoints = [
  'Run your entire salon from one platform.',
  'Eliminate operational inefficiencies.',
  'Focus more on clients, less on admin work.',
];

export default function SalonCrmFeaturesPage() {
  return (
    <>
      <PageHero
        label="CRM Features"
        title="Salon CRM Software"
        highlight="Features"
        description="Explore Swalook's all-in-one salon CRM features — appointments, invoices, inventory, staff management, analytics, loyalty, and more."
      />

      {/* Intro */}
      <section className={styles.introSection}>
        <AnimatedSection>
          <div className={styles.introContent}>
            <p>
              Swalook is more than just a CRM. It's a comprehensive salon management system designed to help 
              salons grow smarter. From scheduling to billing, loyalty to inventory, every tool is built to 
              simplify your daily operations and maximize profitability.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <section style={{ padding: '24px 0 56px', background: 'var(--bg-white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <AnimatedSection>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
                gap: '24px',
                alignItems: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xl)',
                background: '#fff',
                boxShadow: 'var(--shadow-xs)',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'relative', minHeight: '320px' }}>
                <Image
                  src="/images/feature-profiles.png"
                  alt="Swalook client profile and salon workflow screen"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '28px' }}>
                <span className="section-label">Product proof</span>
                <h2 className="section-title" style={{ marginTop: '12px' }}>
                  Real client profiles, not generic CRM copy
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '14px' }}>
                  The CRM experience starts with the customer record. This view gives salon teams one place to keep
                  notes, visit history, and important context so every interaction feels more personal.
                </p>
                <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
                  {[
                    'Keep client history and preferences in one place',
                    'Reduce manual follow-up and context switching',
                    'Support better service with easier access to data',
                  ].map((point) => (
                    <div
                      key={point}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '12px 14px',
                        border: '1px solid rgba(0, 188, 212, 0.12)',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(0, 188, 212, 0.04)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                      }}
                    >
                      <FiCheckCircle style={{ flexShrink: 0, color: 'var(--primary)', marginTop: '2px' }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Grid */}
      <section className={styles.featuresSection}>
        <StaggerContainer className={styles.featuresGrid}>
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <Link href={f.href} style={{ display: 'block' }}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                  <span className={styles.learnBtn}>
                    Learn More <FiArrowRight />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Why Choose */}
      <section className={styles.whySection}>
        <div className="section-header">
          <AnimatedSection>
            <h2 className="section-title">Why Choose Swalook&apos;s All-in-One CRM?</h2>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className={styles.whyContent}>
            <p>
              Most salon tools cover one or two needs, while Swalook covers them all. With a unified platform, 
              you can manage your operations end-to-end without juggling multiple apps.
            </p>
            <div className={styles.whyList}>
              {whyPoints.map((p, i) => (
                <div key={i} className={styles.whyItem}>
                  <FiCheckCircle className={styles.whyItemIcon} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* With Swalook */}
      <section className={styles.withSection}>
        <div className="section-header">
          <AnimatedSection>
            <h2 className="section-title">With Swalook You Can:</h2>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className={styles.withContent}>
            <div className={styles.withList}>
              {withPoints.map((p, i) => (
                <div key={i} className={styles.withItem}>
                  <FiCheck className={styles.withItemIcon} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
            <p className={styles.withCta}>
              Ready to transform your salon management? Start your journey with Swalook.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Book a Free Demo <FiArrowRight />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
