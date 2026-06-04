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

function SectionHeading() {
  return (
    <div className={styles.sectionHeading}>
      <AnimatedSection>
        <span className="section-label">What Swalook Helps You Do</span>
        <h2 className="section-title">A Clear Growth System For Your Beauty Business</h2>
      </AnimatedSection>
    </div>
  );
}

export default function HomeProvideSection({ items }) {
  return (
    <section className={styles.provideSection}>
      <div className={styles.sectionShell}>
        <SectionHeading />
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
