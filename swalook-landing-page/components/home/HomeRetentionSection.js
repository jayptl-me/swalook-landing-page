'use client';

import Image from 'next/image';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import styles from '@/components/home/Home.module.css';

export default function HomeRetentionSection({ items }) {
  return (
    <section className={styles.mobileAppSection}>
      <div className={styles.sectionShell}>
        <div className={styles.sectionHeadingLeft}>
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
            {items.map((item) => (
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
  );
}
