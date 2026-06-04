'use client';

import Link from 'next/link';
import { FiArrowRight, FiHeart, FiMail } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/components/home/Home.module.css';

export default function HomeCTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.sectionShell}>
        <AnimatedSection>
          <div className={styles.ctaContent}>
            <div className={styles.ctaIntro}>
              <span className="section-label">Ready to grow?</span>
              <h2>Turn more visits into repeat clients.</h2>
              <p>Book a short demo to see how Swalook keeps bookings full, follow-ups simple, and revenue moving.</p>
            </div>

            <div className={styles.ctaGrid}>
              <div className={styles.ctaBenefit}>
                <FiHeart />
                <div>
                  <h3>Retention that works</h3>
                  <p>Bring clients back with reminders, loyalty, and smarter follow-ups.</p>
                </div>
              </div>
              <div className={styles.ctaBenefit}>
                <FiMail />
                <div>
                  <h3>Marketing on autopilot</h3>
                  <p>Run WhatsApp, SMS, and email campaigns without extra effort.</p>
                </div>
              </div>
            </div>

            <div className={styles.ctaActions}>
              <Link href="/book-demo" className="btn btn-primary btn-lg">
                Book Free Demo <FiArrowRight />
              </Link>
              <Link href="/free-trial" className="btn btn-outline btn-lg">
                Start Free Trial
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
