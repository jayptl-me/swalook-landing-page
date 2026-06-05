'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import styles from '@/components/home/Home.module.css';

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

export default function HomeRouteSection({ routes }) {
  return (
    <section className={styles.routeSection}>
      <div className={styles.sectionShell}>
        <div className={styles.sectionHeading}>
          <AnimatedSection>
            <span className="section-label">Navigation</span>
            <h2 className="section-title">Jump Into The Right Part Of The Product</h2>
            <p className="section-subtitle">
              Use the product map to move into the feature pages, FAQ, blog content, and conversion paths.
            </p>
          </AnimatedSection>
        </div>

        <StaggerContainer className={styles.routeGrid}>
          {routes.map((route) => (
            <StaggerItem key={route.title}>
              <RouteCard {...route} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
