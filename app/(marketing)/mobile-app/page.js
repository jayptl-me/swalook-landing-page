'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiBell, FiSmartphone, FiStar, FiMessageCircle, FiShield, FiClock, FiCheckCircle } from 'react-icons/fi';
import PageHero from '@/components/marketing/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import styles from './MobileApp.module.css';

const features = [
  { icon: <FiCalendar />, title: 'Manage Appointments Anywhere', desc: 'Access the appointment calendar from mobile devices, allowing you to schedule or reschedule appointments from anywhere.' },
  { icon: <FiBell />, title: 'Mobile Notifications & Reminders', desc: 'Stay updated with real-time notifications and timely updates for upcoming appointments.' },
  { icon: <FiSmartphone />, title: 'Easy-to-Use Interface', desc: 'Navigate effortlessly with a clean, modern design. Book services, view history, and manage preferences in just a few taps — no learning curve needed.' },
  { icon: <FiStar />, title: 'Personalized Recommendations', desc: 'Receive tailored suggestions based on your previous visits, preferences, and ratings, helping you discover new styles and treatments.' },
  { icon: <FiMessageCircle />, title: 'In-App Reviews and Ratings', desc: 'Share your experiences and read feedback from other users to make informed choices about services and stylists.' },
  { icon: <FiShield />, title: 'Secure Payment Options', desc: 'Simplify your checkout process with secure payment methods, including credit/debit cards and mobile wallets.' },
  { icon: <FiClock />, title: 'Order History and Reminders', desc: 'Easily keep track of your past appointments and receive reminders for upcoming visits.' },
];

export default function MobileAppPage() {
  return (
    <>
      <PageHero
        label="Mobile App"
        title="Your Salon, In Your Pocket."
        highlight="Always Connected."
        description="Manage appointments, track performance, and stay connected with clients — all from your smartphone."
      />

      {/* Intro */}
      <section className={styles.introSection}>
        <AnimatedSection>
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <h2 className="section-title">Mobile access for real salon work</h2>
              <p>
                The Swalook mobile app puts the full power of salon management in your pocket. 
                From real-time appointment tracking to instant client notifications, manage every 
                aspect of your business on the go — whether you're at the salon, commuting, or at home.
              </p>
            </div>
            <AnimatedSection direction="right">
              <div className={styles.introImage}>
                <Image src="/images/feature-mobile.png" alt="Swalook Mobile App" width={600} height={450} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </section>

      <section className={styles.servicesSection} style={{ paddingTop: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 20px' }}>
          <AnimatedSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)', gap: '24px', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', background: '#fff', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', minHeight: '280px' }}>
                <Image src="/images/feature-mobile.png" alt="Swalook mobile app proof" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '28px' }}>
                <span className="section-label">Product proof</span>
                <h2 className="section-title" style={{ marginTop: '12px' }}>A real app surface for appointments and updates</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '14px' }}>
                  This screen grounds the mobile app story in an interface that teams can actually use for reminders,
                  quick updates, and checking schedule details away from the desk.
                </p>
                <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
                  {[
                    'Check appointments without opening a laptop',
                    'Stay connected to client activity while away from the counter',
                    'Keep the mobile experience aligned with salon operations',
                  ].map((point) => (
                    <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', border: '1px solid rgba(0, 188, 212, 0.12)', borderRadius: 'var(--radius-md)', background: 'rgba(0, 188, 212, 0.04)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <FiCheckCircle style={{ flexShrink: 0, color: 'var(--primary)', marginTop: '2px' }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className={styles.servicesSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">App Features</span>
            <h2 className="section-title">What You Can Do with the Swalook App</h2>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className={styles.servicesContent}>
            <p>
              The Swalook mobile app extends the CRM&apos;s capabilities to your fingertips. 
              Clients can manage their appointments seamlessly, while salon owners get instant 
              access to dashboards, notifications, and business insights from anywhere.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className={styles.featureGrid}>
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <AnimatedSection>
          <div className={styles.ctaContent}>
            <h2>Book A Free Demo</h2>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get Started <FiArrowRight />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
