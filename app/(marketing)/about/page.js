'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiCheck, FiCpu, FiHeart, FiZap, FiRefreshCw } from 'react-icons/fi';
import PageHero from '@/components/marketing/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import styles from './About.module.css';

const bullets = [
  'Help salons improve repeat visits with smarter follow-ups, loyalty, and retargeting.',
  'Reduce no-shows with reminders, confirmations, and easier appointment communication.',
  'Make team performance visible with better staff, branch, and business tracking.',
  'Bring billing, inventory, marketing, and operations into one simple platform.',
  'Support salons, spas, beauty studios, and multi-branch businesses as they grow.',
];

const values = [
  { icon: <FiCpu />, text: 'Build practical tools that make salon operations simpler and more effective.' },
  { icon: <FiHeart />, text: 'Put customer retention and long-term business growth at the center of every feature.' },
  { icon: <FiZap />, text: 'Keep the platform fast, easy to use, and focused on measurable business impact.' },
  { icon: <FiRefreshCw />, text: 'Continuously improve based on real salon workflows, feedback, and industry needs.' },
];

const highlights = [
  'Designed to help beauty businesses grow revenue, not just manage tasks.',
  'Focused on retention, retargeting, and repeat bookings.',
  'Built to reduce no-shows and improve daily team efficiency.',
  'Made for single locations and multi-branch businesses alike.',
];

const detailFeatures = [
  { title: 'Our Vision', desc: 'To become the most trusted revenue generation engine for the beauty industry by helping every salon grow with smarter retention, stronger marketing, and simpler operations.', image: '/images/about-idea.png' },
  { title: 'Our Mission', desc: 'To empower salons, spas, and beauty businesses with one connected platform that improves customer retention, reduces no-shows, tracks performance, and makes growth easier.', image: '/images/about-beauty.png' },
  { title: 'How We Work', desc: 'We focus on simple workflows, practical automation, and business insights that help salon owners make better decisions every day.', image: '/images/about-customer.png' },
  { title: 'Why It Matters', desc: 'When salons keep more clients, run better campaigns, and operate more efficiently, they create stronger relationships and more reliable revenue.', image: '/images/about-security.png' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="SWALOOK"
        highlight="Revenue Generation Engine For The Beauty Industry"
        description="Swalook helps beauty businesses grow through better retention, smarter marketing, and simpler operations."
      />

      {/* Company Info */}
      <section className={styles.companyInfo}>
        <div className={styles.companyGrid}>
          <AnimatedSection direction="left">
            <div className={styles.companyText}>
              <h3>About Swalook</h3>
              <h2>Built for Growth, Retention, and Repeat Revenue</h2>
              <p>
                Swalook is a modern platform created for salons, spas, beauty studios, and wellness businesses that
                want to grow with more clarity and less manual work. We help teams manage customer relationships,
                operations, and marketing from one connected system.
              </p>
              <div className={styles.bulletList}>
                {bullets.map((b, i) => (
                  <div key={i} className={styles.bulletItem}>
                    <span className={styles.bulletIcon}><FiCheck /></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className={styles.companyImage}>
              <Image src="/images/team-about.png" alt="Swalook team working together" width={600} height={450} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-xl)' }} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.missionSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Our Purpose</span>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.missionGrid}>
          <StaggerItem>
            <div className={styles.missionCard}>
              <h3>Our Mission</h3>
              <p>
                To help beauty businesses increase repeat customers, reduce no-shows, and manage operations more
                easily with practical tools that support daily growth.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.missionCard}>
              <h3>Our Vision</h3>
              <p>
                To become the most useful growth platform for the beauty industry by combining retention, marketing,
                performance tracking, and operational clarity in one place.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Core Values */}
      <section className={styles.valuesSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Core Values</span>
            <h2 className="section-title">What Drives Us</h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.valuesGrid}>
          {values.map((v, i) => (
            <StaggerItem key={i}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <p>{v.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Journey */}
      <section className={styles.journeySection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Journey</span>
            <h2 className="section-title">Why Swalook Exists</h2>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className={styles.journeyContent}>
            <p>
              Swalook was created to solve a common problem in the beauty industry: too many disconnected tools and
              too much time spent on manual follow-up. We wanted to build a platform that helps salons keep customers
              coming back while making day-to-day management easier.
            </p>
            <p>
              Today, Swalook is focused on helping beauty businesses strengthen retention, improve marketing
              performance, track business results, and reduce missed appointments — all with one platform.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Feature Highlights */}
      <section className={styles.highlightsSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Why Swalook</span>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.highlightsGrid}>
          {highlights.map((h, i) => (
            <StaggerItem key={i}>
              <div className={styles.highlightCard}>
                <p>{h}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Detail Features */}
        <div className={styles.detailSection}>
          {detailFeatures.map((f, i) => (
            <div key={f.title} className={`${styles.detailRow} ${i % 2 !== 0 ? styles.detailRowReverse : ''}`}>
              <AnimatedSection direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className={styles.detailImage}>
                  <Image src={f.image} alt={f.title} width={560} height={350} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-xl)' }} />
                </div>
              </AnimatedSection>
              <AnimatedSection direction={i % 2 === 0 ? 'right' : 'left'}>
                <div className={styles.detailText}>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </section>

      {/* Learn More */}
      <section className={styles.learnMore}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Our Philosophy</span>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className={styles.learnContent}>
            <p>
              We believe beauty businesses should have the same level of growth tools that larger industries use,
              without the complexity. Swalook makes retention, reactivation, reporting, and marketing easier to manage
              so owners can spend more time serving clients.
            </p>
            <p>
              Our platform is designed to support businesses at every stage — from a single salon looking for more
              repeat visits to a multi-branch brand that needs clearer control and better visibility.
            </p>
            <p>
              Every feature is built to help salons grow revenue, improve customer relationships, and keep operations
              running smoothly in the background.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className={styles.aboutCta}>
        <AnimatedSection>
          <p className={styles.ctaLead}>Ready to Get Started?</p>
          <h3 className={styles.ctaHeading}>Book a free demo today</h3>
          <span className={styles.ctaPhone}>+91 98701 03761</span>
          <p className={styles.ctaTagline}>Grow. Retain. Repeat.</p>
        </AnimatedSection>
      </section>
    </>
  );
}
