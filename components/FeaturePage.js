'use client';

import Link from 'next/link';
import { FiArrowRight, FiCheck, FiCheckCircle } from 'react-icons/fi';
import {
  FiLayout, FiCalendar, FiFileText, FiBarChart2, FiMessageSquare,
  FiPackage, FiUsers, FiDollarSign, FiHeart, FiMail
} from 'react-icons/fi';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import styles from './FeaturePage.module.css';

const allFeatures = [
  { slug: 'salon-dashboard-software', title: 'Dashboard', icon: <FiLayout /> },
  { slug: 'salon-appointment-scheduling-software', title: 'Appointments', icon: <FiCalendar /> },
  { slug: 'salon-invoice-software', title: 'Invoices', icon: <FiFileText /> },
  { slug: 'salon-analytics-software', title: 'Analysis', icon: <FiBarChart2 /> },
  { slug: 'salon-inquiry-management', title: 'Inquiries', icon: <FiMessageSquare /> },
  { slug: 'salon-inventory-management-software', title: 'Inventory', icon: <FiPackage /> },
  { slug: 'salon-staff-attendance-software', title: 'Staff & Attendance', icon: <FiUsers /> },
  { slug: 'salon-expense-management-software', title: 'Expense & Purchasing', icon: <FiDollarSign /> },
  { slug: 'salon-loyalty-program-software', title: 'Customer Loyalty', icon: <FiHeart /> },
  { slug: 'salon-marketing-templates', title: 'Templates', icon: <FiMail /> },
];

export default function FeaturePage({
  icon,
  title,
  heroDesc,
  whyTitle,
  whyDesc,
  keyFeatures = [],
  compareTitle,
  compareDesc,
  withPoints = [],
  withCta,
  currentSlug,
}) {
  const otherFeatures = allFeatures.filter(f => f.slug !== currentSlug);

  return (
    <>
      {/* Hero */}
      <section className={styles.featureHero}>
        <div className={styles.featureHeroBg} />
        <div className={styles.featureHeroContent}>
          <AnimatedSection>
            <div className={styles.featureHeroIcon}>{icon}</div>
            <h1 className={styles.featureHeroTitle}>{title}</h1>
            <p className={styles.featureHeroDesc}>{heroDesc}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Section */}
      <section className={styles.whySection}>
        <AnimatedSection>
          <div className={styles.whyContent}>
            <h2>{whyTitle}</h2>
            <p>{whyDesc}</p>
          </div>
        </AnimatedSection>
      </section>

      {/* Key Features */}
      {keyFeatures.length > 0 && (
        <section className={styles.keyFeatures}>
          <div className="section-header">
            <AnimatedSection>
              <span className="section-label">Key Features</span>
              <h2 className="section-title">What Makes This Feature Powerful</h2>
            </AnimatedSection>
          </div>
          <StaggerContainer className={styles.featuresGrid}>
            {keyFeatures.map((f) => (
              <StaggerItem key={f.title}>
                <div className={styles.fCard}>
                  <div className={styles.fCardIcon}><FiCheckCircle /></div>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* Compare Section */}
      {compareTitle && (
        <section className={styles.compareSection}>
          <AnimatedSection>
            <div className={styles.compareContent}>
              <h2>{compareTitle}</h2>
              <p>{compareDesc}</p>
            </div>
          </AnimatedSection>
        </section>
      )}

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
                  <FiCheck className={styles.withIcon} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
            {withCta && <p className={styles.withCta}>{withCta}</p>}
            <Link href="/contact" className="btn btn-primary btn-lg">
              Book a Free Demo <FiArrowRight />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* Other Features */}
      <section className={styles.otherFeatures}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Explore More</span>
            <h2 className="section-title">Other CRM Features</h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.otherGrid}>
          {otherFeatures.map((f) => (
            <StaggerItem key={f.slug}>
              <Link href={`/${f.slug}`} className={styles.otherCard}>
                <span className={styles.otherIcon}>{f.icon}</span>
                {f.title}
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
}
