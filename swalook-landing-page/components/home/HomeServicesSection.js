'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import styles from '@/components/home/Home.module.css';

function InfoCard({ icon, title, desc, link }) {
  return (
    <Link href={link} className={styles.serviceCard}>
      <div className={styles.serviceIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className={styles.serviceLink}>Learn More <FiArrowRight /></span>
    </Link>
  );
}

export default function HomeServicesSection({ featureGroups }) {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.sectionShell}>
        <div className={styles.sectionHeading}>
          <AnimatedSection>
            <span className="section-label">Features</span>
            <h2 className="section-title">12 Feature Groups That Drive Growth</h2>
            <p className="section-subtitle">
              Everything you need to improve retention, reduce no-shows, track performance, and manage your beauty
              business with confidence.
            </p>
          </AnimatedSection>
        </div>

        <StaggerContainer className={styles.servicesGrid}>
          {featureGroups.map((feature) => (
            <StaggerItem key={feature.title}>
              <InfoCard {...feature} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
