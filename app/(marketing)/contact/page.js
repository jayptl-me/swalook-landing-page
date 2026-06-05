'use client';

import { FiMail, FiPhone, FiCheckCircle, FiCalendar, FiCreditCard } from 'react-icons/fi';
import PageHero from '@/components/marketing/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import LeadForm from '@/components/marketing/LeadForm';
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
              <p>+91 98701 03761</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      <LeadForm
        title="Get In Touch with Us!"
        description="Tell us about your beauty business and our team will get back to you soon."
        bullets={[
          { icon: <FiCheckCircle />, text: 'Learn how Swalook can help improve retention and repeat visits.' },
          { icon: <FiCalendar />, text: 'See how reminders and follow-ups can reduce no-shows.' },
          { icon: <FiCreditCard />, text: 'Explore tools for billing, marketing, staff, and branch tracking.' },
        ]}
        fields={[
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
          { name: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
          { name: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Your business name' },
          { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us what you need help with...' },
        ]}
        submitLabel="Send Message"
      />

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
