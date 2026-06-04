'use client';

import Link from 'next/link';
import { FiArrowRight, FiCheck, FiCheckCircle, FiLayout, FiCalendar, FiFileText, FiBarChart2, FiMessageSquare, FiPackage, FiUsers, FiDollarSign, FiHeart, FiMail } from 'react-icons/fi';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
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

function getFeatureSnapshot(keyFeatures = [], withPoints = []) {
  const firstThreeFeatures = keyFeatures.slice(0, 3).map((feature) => feature.title);
  return withPoints.length > 0 ? withPoints.slice(0, 3) : firstThreeFeatures;
}

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
  const otherFeatures = allFeatures.filter((feature) => feature.slug !== currentSlug);
  const snapshotItems = getFeatureSnapshot(keyFeatures, withPoints);
  const hasKeyFeatures = keyFeatures.length > 0;
  const hasCompareSection = Boolean(compareTitle || compareDesc);
  const hasSnapshot = snapshotItems.length > 0;

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroInner}>
          <AnimatedSection className={styles.heroCopy}>
            <span className={styles.heroBadge}>CRM Feature</span>
            <div className={styles.heroIcon}>{icon}</div>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDesc}>{heroDesc}</p>

            <div className={styles.heroActions}>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Book a Free Demo <FiArrowRight />
              </Link>
              <Link href="/salon-crm-features" className={styles.heroSecondaryLink}>
                Explore all features
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className={styles.heroPanel} direction="right">
            <div className={styles.heroPanelCard}>
              <span className={styles.panelLabel}>Why this feature matters</span>
              <h2 className={styles.panelTitle}>{whyTitle}</h2>
              <p className={styles.panelText}>{whyDesc}</p>

              {hasSnapshot && (
                <div className={styles.snapshotList}>
                  {snapshotItems.map((item) => (
                    <div key={item} className={styles.snapshotItem}>
                      <FiCheckCircle className={styles.snapshotIcon} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.sectionShell}>
        <div className={styles.summaryGrid}>
          <AnimatedSection className={styles.summaryCard}>
            <span className={styles.sectionEyebrow}>What it solves</span>
            <h2 className={styles.sectionTitle}>{whyTitle}</h2>
            <p className={styles.sectionBody}>{whyDesc}</p>
          </AnimatedSection>

          <AnimatedSection className={styles.summaryCardAlt} direction="right">
            <span className={styles.sectionEyebrow}>Quick snapshot</span>
            <h2 className={styles.sectionTitle}>Built for salon operations</h2>
            <p className={styles.sectionBody}>
              Designed to remove manual work, reduce missed follow-ups, and give owners a clearer view of day-to-day activity.
            </p>
            {hasSnapshot && (
              <div className={styles.summaryList}>
                {snapshotItems.map((item) => (
                  <div key={item} className={styles.summaryItem}>
                    <FiCheck className={styles.summaryIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {hasKeyFeatures && (
        <section className={styles.sectionShellAlt}>
          <div className={styles.sectionHeader}>
            <AnimatedSection>
              <span className={styles.sectionEyebrow}>Core capabilities</span>
              <h2 className={styles.sectionTitle}>What makes this feature useful</h2>
            </AnimatedSection>
          </div>

          <StaggerContainer className={styles.featuresGrid}>
            {keyFeatures.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <FiCheckCircle />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {hasCompareSection && (
        <section className={styles.sectionShell}>
          <AnimatedSection className={styles.compareCard}>
            <span className={styles.sectionEyebrow}>Why Swalook</span>
            <h2 className={styles.sectionTitle}>{compareTitle}</h2>
            <p className={styles.sectionBody}>{compareDesc}</p>
          </AnimatedSection>
        </section>
      )}

      <section className={styles.sectionShellAlt}>
        <AnimatedSection className={styles.ctaCard}>
          <span className={styles.sectionEyebrow}>How teams use it</span>
          <h2 className={styles.sectionTitle}>With Swalook you can</h2>

          <div className={styles.withList}>
            {(withPoints.length > 0 ? withPoints : snapshotItems).map((point) => (
              <div key={point} className={styles.withItem}>
                <FiCheck className={styles.withItemIcon} />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {withCta && <p className={styles.ctaCopy}>{withCta}</p>}

          <div className={styles.ctaActions}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Book a Free Demo <FiArrowRight />
            </Link>
            <Link href="/free-trial" className={styles.heroSecondaryLink}>
              Start a free trial
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <section className={styles.sectionShell}>
        <div className={styles.sectionHeader}>
          <AnimatedSection>
            <span className={styles.sectionEyebrow}>Explore more</span>
            <h2 className={styles.sectionTitle}>Other CRM features</h2>
          </AnimatedSection>
        </div>

        <StaggerContainer className={styles.otherGrid}>
          {otherFeatures.map((feature) => (
            <StaggerItem key={feature.slug}>
              <Link href={`/${feature.slug}`} className={styles.otherCard}>
                <span className={styles.otherIcon}>{feature.icon}</span>
                <span className={styles.otherTitle}>{feature.title}</span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
}
