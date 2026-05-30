'use client';

import { FiMail, FiPhone, FiGlobe, FiCheckCircle, FiCalendar, FiCreditCard } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './Contact.module.css';

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact Us"
        title="Ready to Grow Your Beauty Business?"
        highlight="Contact Swalook Today!"
        description="Talk to us about retention, marketing, no-shows, and salon growth."
      />

      {/* Contact Cards */}
      <section className={styles.contactCards}>
        <StaggerContainer className={styles.cardsGrid}>
          <StaggerItem>
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}><FiMail /></div>
              <h3>Email</h3>
              <p>support@swalook.in</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}><FiMail /></div>
              <h3>Sales</h3>
              <p>sales@swalook.in</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}><FiPhone /></div>
              <h3>Phone</h3>
              <p>+91-XXXXXXXXXX</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Form Section */}
      <section className={styles.formSection}>
        <div className={styles.formGrid}>
          <AnimatedSection direction="left">
            <div className={styles.formInfo}>
              <h2>Get In Touch with Us!</h2>
              <p>Tell us about your beauty business and our team will get back to you soon.</p>
              <div className={styles.infoBullets}>
                <div className={styles.infoBullet}>
                  <FiCheckCircle className={styles.infoBulletIcon} />
                  <span>Learn how Swalook can help improve retention and repeat visits.</span>
                </div>
                <div className={styles.infoBullet}>
                  <FiCalendar className={styles.infoBulletIcon} />
                  <span>See how reminders and follow-ups can reduce no-shows.</span>
                </div>
                <div className={styles.infoBullet}>
                  <FiCreditCard className={styles.infoBulletIcon} />
                  <span>Explore tools for billing, marketing, staff, and branch tracking.</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <form className={styles.contactForm} onSubmit={e => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="Your full name" />
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
                <label>Business Name</label>
                <input type="text" placeholder="Your business name" />
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea placeholder="Tell us what you need help with..." />
              </div>
              <button type="submit" className={styles.submitBtn}>Send Message</button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <AnimatedSection>
          <div className={styles.newsletterContent}>
            <h2>Subscribe for Newsletter!</h2>
            <p>
              Stay updated with product updates, salon growth tips, and feature releases from Swalook.
            </p>
            <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
