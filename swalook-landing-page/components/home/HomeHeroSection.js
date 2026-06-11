'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import AnimatedSection from '@/components/ui/AnimatedSection';
import styles from '@/components/home/Home.module.css';

export default function HomeHeroSection({ heroHighlights }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackdrop} aria-hidden="true">
        <span className={styles.heroOrbOne} />
        <span className={styles.heroOrbTwo} />
        <span className={styles.heroGrid} />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroInner}>
          <AnimatedSection className={styles.heroCopy} direction="left">
            <span className={styles.heroLabel}>Growth platform for salons</span>
            <h1 className={styles.heroTitle}>
              Grow Your Salon Business
              <span className={styles.heroHighlight}> with retention, marketing, and fewer no-shows.</span>
            </h1>
            <p className={styles.heroDesc}>One place for bookings, follow-ups, and billing.</p>

            <div className={styles.heroActions}>
              <Link href="/book-demo" className="btn btn-primary btn-lg">
                Book Free Demo <FiArrowRight />
              </Link>
              <Link href="/free-trial" className="btn btn-outline btn-lg">
                Start Free Trial
              </Link>
              <Link href="/salon-crm-features" className="btn btn-ghost btn-lg">
                Explore Features
              </Link>
            </div>

            <div className={styles.heroTrustStrip}>
              {heroHighlights.map((item) => (
                <div key={item} className={styles.heroTrustItem}>
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className={styles.heroVisualWrap} direction="right">
            <div className={styles.heroVisual}>
              <div className={styles.heroVisualFrame}>
                <div className={styles.heroDeviceBar}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.heroDeviceBody}>
                  <div className={styles.heroDeviceHeader}>
                    <div>
                      <p className={styles.visualKicker}>Live CRM snapshot</p>
                      <h3>Operations moving in one place</h3>
                    </div>
                    <span className={styles.visualStatus}>Active today</span>
                  </div>

                  <div className={styles.heroMetricRow}>
                    <div className={styles.heroMetric}>
                      <span>124</span>
                      <p>Appointments</p>
                    </div>
                    <div className={styles.heroMetric}>
                      <span>38%</span>
                      <p>Repeat visits</p>
                    </div>
                    <div className={styles.heroMetric}>
                      <span>92%</span>
                      <p>Reminder reach</p>
                    </div>
                  </div>

                  <div className={styles.heroPanel}>
                    <div className={styles.panelHeader}>
                      <h4>Today’s workflow</h4>
                      <span>Salons • spas • multi-branch</span>
                    </div>
                    <div className={styles.panelList}>
                      <div>
                        <FiCheckCircle />
                        <span>Confirmations sent</span>
                      </div>
                      <div>
                        <FiCheckCircle />
                        <span>Billing synced</span>
                      </div>
                      <div>
                        <FiCheckCircle />
                        <span>Retention follow-ups scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
