'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiBell, FiSmartphone, FiStar, FiMessageCircle, FiShield, FiClock } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
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
              <h2 className="section-title">AI Mobile App: Cutting-Edge Solutions for Your Salon</h2>
              <p>
                The Swalook mobile app puts the full power of salon management in your pocket. 
                From real-time appointment tracking to instant client notifications, manage every 
                aspect of your business on the go — whether you&apos;re at the salon, commuting, or at home.
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
