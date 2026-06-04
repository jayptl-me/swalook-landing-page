'use client';

import PageHero from '@/components/marketing/PageHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import styles from '../contact/Contact.module.css';

export default function FreeTrialPage() {
  return (
    <>
      <PageHero
        label="Free Trial"
        title="Try Swalook Before You Decide"
        highlight="Start using Swalook to improve retention, reduce no-shows, and manage growth."
        description="Explore the platform with a free trial and see how Swalook fits your salon workflow."
      />

      <section className={styles.formSection}>
        <div className={styles.formGrid}>
          <AnimatedSection direction="left">
            <div className={styles.formInfo}>
              <h2>Try Swalook Before You Decide</h2>
              <p>
                Experience the tools that help beauty businesses grow with better customer retention, smarter marketing,
                and simpler operations.
              </p>
              <div className={styles.infoBullets}>
                <div className={styles.infoBullet}>
                  <span className={styles.infoBulletIcon}>•</span>
                  <span>See how automation saves time on follow-ups and reminders.</span>
                </div>
                <div className={styles.infoBullet}>
                  <span className={styles.infoBulletIcon}>•</span>
                  <span>Test the tools for appointments, marketing, and reporting.</span>
                </div>
                <div className={styles.infoBullet}>
                  <span className={styles.infoBulletIcon}>•</span>
                  <span>Discover how Swalook can support your business growth.</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className={styles.formGroup}>
                <label>Salon Name</label>
                <input type="text" placeholder="Salon name" />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className={styles.formGroup}>
                <label>City</label>
                <input type="text" placeholder="Your city" />
              </div>
              <div className={styles.formGroup}>
                <label>Business Type</label>
                <input type="text" placeholder="Salon, spa, studio, clinic" />
              </div>
              <button type="submit" className={styles.submitBtn}>Start Free Trial</button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
