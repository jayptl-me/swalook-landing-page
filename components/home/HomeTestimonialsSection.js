'use client';

import Image from 'next/image';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from '@/components/home/Home.module.css';

function TestimonialCard({ icon, title, desc }) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default function HomeTestimonialsSection({ items }) {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.sectionShell}>
        <AnimatedSection>
          <div className={styles.trustBadge}>
            <span className={styles.trustNumber}>Less</span>
            <h3>Reduce No-Shows and Protect Your Calendar</h3>
            <p>Keep your schedules fuller with reminders, confirmations, and easy follow-up workflows.</p>
          </div>
        </AnimatedSection>

        <div className={styles.splitGrid}>
          <StaggerContainer className={styles.testimonialGrid}>
            {items.map((item) => (
              <StaggerItem key={item.title}>
                <TestimonialCard {...item} />
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
  );
}
