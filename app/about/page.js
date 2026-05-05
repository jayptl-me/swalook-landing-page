'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiCheck, FiCpu, FiHeart, FiZap, FiRefreshCw } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './About.module.css';

const bullets = [
  'Salon POS: You can create and manage bills for your customers and send them via WhatsApp',
  'Online Appointments: Your customers can schedule appointments with a few clicks',
  'Membership: We help you manage membership in your salon and provide customer loyalty benefits',
  'Reports & Feedback: You can get feedback from your customers on how they felt about their visit',
  'Digital Catalog: Customers can browse through the digital catalog of services provided by your salon',
];

const values = [
  { icon: <FiCpu />, text: 'Leveraging the latest technology to provide modern, effective solutions.' },
  { icon: <FiHeart />, text: 'Understanding and meeting the unique needs of salon owners and your clients.' },
  { icon: <FiZap />, text: 'Delivering easy-to-use features that simplify complex processes.' },
  { icon: <FiRefreshCw />, text: 'Constantly improving to ensure salons receive the best tools and support.' },
];

const highlights = [
  'Trusted by 50+ salons and spas across India and growing.',
  'Built by a team that understands the beauty industry inside-out.',
  'Designed for simplicity — no technical expertise required.',
  'Continuous innovation with regular feature updates and improvements.',
];

const detailFeatures = [
  { title: 'From Idea to Impact', desc: 'Swalook was born from a simple observation — salon owners were spending more time on admin tasks than on their craft. We set out to change that by building a platform that handles the complexity, so you can focus on what you do best.', image: '/images/about-idea.png' },
  { title: 'Built for the Beauty Industry', desc: 'Unlike generic business tools, every feature in Swalook is designed specifically for salons and spas. From appointment flows to loyalty programs, we speak your language and understand your daily challenges.', image: '/images/about-beauty.png' },
  { title: 'Customer-Centric Development', desc: 'We build features based on real feedback from salon owners. Every update is shaped by the needs of our users, ensuring Swalook evolves alongside your business.', image: '/images/about-customer.png' },
  { title: 'Security & Reliability First', desc: 'Your data is protected with enterprise-grade encryption and hosted on secure cloud infrastructure. With 99% uptime, Swalook is always there when you need it.', image: '/images/about-security.png' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="THE ULTIMATE SALON MANAGEMENT SOLUTION —"
        highlight="Boost Your Performance With Our Platform"
        description="Discover why Swalook is the best salon CRM software for salons worldwide."
      />

      {/* Company Info */}
      <section className={styles.companyInfo}>
        <div className={styles.companyGrid}>
          <AnimatedSection direction="left">
            <div className={styles.companyText}>
              <h3>Company Info</h3>
              <h2>The Ultimate Salon Management Solution</h2>
              <p>
                Welcome to Swalook, the ultimate solution for salons looking to streamline their operations and enhance 
                customer experience. Swalook is an intuitive, user-friendly, cloud-based innovative software and mobile 
                app that helps salons manage appointments, billing, inventory, and customer relationships. You can also 
                use integrated marketing to reach out to your customers better.
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
                Our mission is to empower salons with innovative tools and technology that make management effortless. 
                We strive to help salon owners focus on what they do best—delivering exceptional beauty services—while we handle the rest.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.missionCard}>
              <h3>Our Vision</h3>
              <p>
                Our vision is to revolutionize the salon industry by providing seamless management solutions that create 
                thriving businesses and exceptional client experiences.
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
            <h2 className="section-title">Our Journey, Your Trust</h2>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className={styles.journeyContent}>
            <p>
              Swalook started as a small project by a team passionate about the beauty and wellness industry. 
              We noticed that salon owners were juggling multiple disconnected tools — from paper appointment books 
              to scattered spreadsheets for billing and inventory. We knew there had to be a better way.
            </p>
            <p>
              Today, Swalook serves 50+ salons across India, helping them save hours every week on admin work 
              while delivering better experiences to their clients. Our journey is just getting started, and 
              with every new feature, we&apos;re one step closer to our vision of empowering every salon to thrive.
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
              At Swalook, we believe that technology should be accessible and easy to use for everyone. That&apos;s 
              why we&apos;ve designed our software and app to be as user-friendly and intuitive as possible, with a 
              sleek and modern interface that&apos;s easy to navigate. We&apos;re committed to providing the best 
              possible experience and striving to improve and innovate our software to meet customers&apos; evolving needs.
            </p>
            <p>
              We&apos;re dedicated to empowering salon owners to take their businesses to the next level. Whether 
              you&apos;re a small independent salon or a large chain, we have the tools and expertise to help you succeed.
            </p>
            <p>
              But our mission continues after business operations. We also believe in serving our customers from 
              acquisition to service. That&apos;s why our software includes features to help salon owners acquire new 
              customers and keep them coming back, such as automated appointment reminders and targeted marketing campaigns.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className={styles.aboutCta}>
        <AnimatedSection>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ready to Get Started?</p>
          <h3 style={{ fontSize: '1.3rem', marginBottom: 24 }}>Book a free demo today</h3>
          <span className={styles.ctaPhone}>+91 98701 03761</span>
          <p className={styles.ctaTagline}>Engage. Enhance. Empower.</p>
        </AnimatedSection>
      </section>
    </>
  );
}
