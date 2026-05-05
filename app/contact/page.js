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
        title="Ready for your Success."
        highlight="Contact Us Today!"
        description="Discover how Swalook can simplify your salon management."
      />

      {/* Contact Cards */}
      <section className={styles.contactCards}>
        <StaggerContainer className={styles.cardsGrid}>
          <StaggerItem>
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}><FiMail /></div>
              <h3>Email</h3>
              <p>info@swalook.in</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}><FiPhone /></div>
              <h3>Phone</h3>
              <p>+91 98701 03761</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}><FiGlobe /></div>
              <h3>Website</h3>
              <p>www.swalook.in</p>
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
              <p>Have questions about Swalook? Fill out the form and our team will get back to you within 24 hours.</p>
              <div className={styles.infoBullets}>
                <div className={styles.infoBullet}>
                  <FiCheckCircle className={styles.infoBulletIcon} />
                  <span>Discover how Swalook can simplify your salon management.</span>
                </div>
                <div className={styles.infoBullet}>
                  <FiCalendar className={styles.infoBulletIcon} />
                  <span>Manage appointments, staff, and billing — all in one place.</span>
                </div>
                <div className={styles.infoBullet}>
                  <FiCreditCard className={styles.infoBulletIcon} />
                  <span>Track your inventory, manage employee schedules, and process payments online.</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <form className={styles.contactForm} onSubmit={e => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea placeholder="Tell us about your salon..." />
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
              Stay updated with the latest salon industry tips, product updates, feature releases, 
              and exclusive offers. Join our community of salon owners who are growing smarter.
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
