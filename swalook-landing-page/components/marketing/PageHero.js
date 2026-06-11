'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import styles from './PageHero.module.css';

export default function PageHero({ label, title, highlight, description }) {
  return (
    <section className={styles.pageHero}>
      <div className={styles.pageHeroBg} />
      <div className={styles.pageHeroContent}>
        <AnimatedSection>
          {label && <span className={styles.pageHeroLabel}>{label}</span>}
          <h1 className={styles.pageHeroTitle}>
            {title}{' '}
            {highlight && <span className={styles.pageHeroGradient}>{highlight}</span>}
          </h1>
          {description && <p className={styles.pageHeroDesc}>{description}</p>}
        </AnimatedSection>
      </div>
    </section>
  );
}
