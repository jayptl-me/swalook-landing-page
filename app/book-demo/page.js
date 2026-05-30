'use client';

import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '../contact/Contact.module.css';

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        label="Book Demo"
        title="See Swalook in Action"
        highlight="Grow your salon with better retention, smarter marketing, and fewer no-shows."
        description="Book a free demo to see how Swalook can help your beauty business grow with one simple platform."
      />

      <section className={styles.formSection}>
        <div className={styles.formGrid}>
          <AnimatedSection direction="left">
            <div className={styles.formInfo}>
              <h2>Book Your Free Demo</h2>
              <p>
                See how Swalook helps you manage customers, appointments, marketing, and branch performance from one place.
              </p>
              <div className={styles.infoBullets}>
                <div className={styles.infoBullet}>
                  <span className={styles.infoBulletIcon}>•</span>
                  <span>Improve repeat visits with better retention and follow-up.</span>
                </div>
                <div className={styles.infoBullet}>
                  <span className={styles.infoBulletIcon}>•</span>
                  <span>Reduce no-shows with reminders, confirmations, and automation.</span>
                </div>
                <div className={styles.infoBullet}>
                  <span className={styles.infoBulletIcon}>•</span>
                  <span>Track staff, sales, and branch performance with clarity.</span>
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
                <label>Mobile Number</label>
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
                <label>Number Of Branches</label>
                <input type="text" placeholder="1" />
              </div>
              <div className={styles.formGroup}>
                <label>Business Type</label>
                <input type="text" placeholder="Salon, spa, studio, clinic" />
              </div>
              <button type="submit" className={styles.submitBtn}>Book Demo</button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
