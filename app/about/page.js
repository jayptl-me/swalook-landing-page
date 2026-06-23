'use client';

import Link from 'next/link';
import { 
  FiLayout, FiCalendar, FiFileText, FiBarChart2, FiMessageSquare,
  FiPackage, FiUsers, FiDollarSign, FiHeart, FiMail, FiArrowRight,
  FiCheckCircle, FiTarget, FiTrendingUp, FiShield 
} from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './About.module.css';

const swalookFeatures = [
  { icon: <FiLayout />, name: 'Dashboard & Analytics', desc: 'Real-time KPIs, branch comparison, sales trends, and staff performance at a glance.' },
  { icon: <FiCalendar />, name: 'Appointment Management', desc: 'Schedule, reschedule, confirm, and reduce no-shows with automated reminders.' },
  { icon: <FiFileText />, name: 'Smart Billing & POS', desc: 'Generate digital invoices, track payments, and manage GST-compliant billing.' },
  { icon: <FiMessageSquare />, name: 'Inquiry & Lead Management', desc: 'Track every lead, follow up faster, and convert more enquiries into clients.' },
  { icon: <FiPackage />, name: 'Inventory & Utilisation', desc: 'Monitor stock levels, usage, and set low-stock alerts for products.' },
  { icon: <FiUsers />, name: 'Staff Management & Payroll', desc: 'Track attendance, shifts, performance targets, and process payroll with clarity.' },
  { icon: <FiDollarSign />, name: 'Expense & Purchasing', desc: 'Track every expense, purchase order, and payment to protect your margins.' },
  { icon: <FiHeart />, name: 'Loyalty & Retention', desc: 'Build repeat visits with loyalty programs, combo offers, and automated follow-ups.' },
  { icon: <FiMail />, name: 'Marketing Automation', desc: 'Run WhatsApp, SMS, and email campaigns from pre-built templates.' },
  { icon: <FiBarChart2 />, name: 'Multi-Branch Reporting', desc: 'Compare location performance, staff output, and revenue across branches.' },
];

const milestones = [
  { 
    title: 'Customer Retention Engine', 
    desc: 'Built for beauty businesses struggling with one-time clients. Focused on turning first visits into repeat loyal customers.',
    icon: <FiHeart /> 
  },
  { 
    title: 'No-Show Reduction System', 
    desc: 'Automated reminders, confirmations, and re-booking workflows that help salons protect their daily schedule.',
    icon: <FiTarget /> 
  },
  { 
    title: 'Unified Operations Platform', 
    desc: 'Replaced spreadsheets and disconnected tools with one integrated platform for billing, inventory, staff, and marketing.',
    icon: <FiTrendingUp /> 
  },
  { 
    title: 'India-First SaaS', 
    desc: 'Designed for Indian salons, spas, and beauty brands — GST-ready, India-hosted, and built for local business workflows.',
    icon: <FiShield /> 
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="SWALOOK"
        highlight="All-in-One Salon Management Software and Marketing Platform"
        description="We help beauty businesses grow with smarter retention, marketing automation, and simpler operations — all from one platform."
      />

      {/* Company Info */}
      <section className={styles.companyInfo}>
        <div className={styles.companyGrid}>
          <AnimatedSection direction="left">
            <div className={styles.companyText}>
              <h3>About Swalook</h3>
              <h2>Built for Growth, Retention, and Repeat Revenue</h2>
              <p>
                Swalook is a modern, all-in-one salon management software and marketing platform created for salons, 
                spas, beauty studios, and multi-branch wellness businesses across India. We help beauty businesses 
                grow by combining customer retention, marketing automation, appointment management, billing, inventory, 
                staff management, and business analytics into one connected platform.
              </p>
              <p>
                From a single independent studio to a multi-location beauty brand, Swalook replaces disconnected 
                spreadsheets and tools with one unified system that drives repeat visits, reduces no-shows, and 
                makes daily operations simpler.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className={styles.companyImage}>
              <img 
                src="/images/team-about.png" 
                alt="Swalook team working together" 
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-xl)' }} 
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* All Features */}
      <section className={styles.featuresSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Features</span>
            <h2 className="section-title">10 Feature Groups That Drive Growth</h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.featuresGrid}>
          {swalookFeatures.map((f) => (
            <StaggerItem key={f.name}>
              <div className={styles.featureCard}>
                <div className={styles.featureCardIcon}>{f.icon}</div>
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/salon-crm-features" className="btn btn-primary btn-lg">
            Explore All Features <FiArrowRight />
          </Link>
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
                To help beauty businesses across India increase repeat customers, reduce no-shows, and manage 
                operations from one simple platform — so owners can focus on growing their business instead of 
                juggling spreadsheets.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.missionCard}>
              <h3>Our Vision</h3>
              <p>
                To become India&rsquo;s most trusted all-in-one salon management and marketing platform — powering 
                every beauty business from a single-location studio to multi-branch brands with retention, 
                automation, and clarity.
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
          <StaggerItem>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}><FiCheckCircle /></div>
              <p>Build practical tools that make salon operations simpler and more effective &mdash; not more complex.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}><FiHeart /></div>
              <p>Put customer retention and long-term business growth at the center of every feature we build.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}><FiTrendingUp /></div>
              <p>Keep the platform fast, easy to use, and focused on measurable business impact, not feature bloat.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}><FiShield /></div>
              <p>Protect our customers&rsquo; data with security-first practices and full compliance with Indian data protection laws.</p>
            </div>
          </StaggerItem>
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
              Swalook was built to solve a problem we saw in the Indian beauty industry: too many disconnected tools, 
              too much time on manual follow-up, and too many one-time clients walking out the door.
            </p>
            <p>
              We wanted to build one platform that helps salons keep customers coming back, automate marketing, 
              simplify billing and inventory, and give owners real visibility into their business &mdash; without 
              requiring a team of IT experts to run it.
            </p>
            <p>
              Today, Swalook serves salons, spas, clinics, and multi-branch beauty brands across India with a 
              comprehensive platform that covers appointments, billing, inventory, staff management, loyalty 
              programs, and marketing automation.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Milestones */}
      <section className={styles.milestonesSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">What We&rsquo;ve Built</span>
            <h2 className="section-title">Four Pillars of the Platform</h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.milestonesGrid}>
          {milestones.map((m) => (
            <StaggerItem key={m.title}>
              <div className={styles.milestoneCard}>
                <div className={styles.milestoneIcon}>{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA */}
      <section className={styles.aboutCta}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Ready to Get Started?
            </p>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 24 }}>
              See Swalook in Action — Book a Free Demo
            </h3>
            <Link href="/book-demo" className="btn btn-primary btn-lg">
              Book Free Demo <FiArrowRight />
            </Link>
            <p style={{ marginTop: 16, color: 'var(--text-tertiary)' }}>
              Grow. Retain. Repeat.
            </p>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
