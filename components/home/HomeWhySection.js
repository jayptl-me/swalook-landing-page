'use client';

import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from '@/components/home/Home.module.css';

function InfoCard({ icon, title, desc }) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default function HomeWhySection({ items }) {
  return (
    <section className={styles.whySection}>
      <div className={styles.sectionShell}>
        <div className={styles.sectionHeading}>
          <AnimatedSection>
            <span className="section-label">Why Swalook</span>
            <h2 className="section-title">Why Beauty Businesses Choose Swalook</h2>
          </AnimatedSection>
        </div>

        <StaggerContainer className={styles.whyGrid}>
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <InfoCard {...item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
