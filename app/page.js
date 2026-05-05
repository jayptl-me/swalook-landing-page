'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlus, FiCheckCircle } from 'react-icons/fi';
import {
  FiLayout, FiCalendar, FiFileText, FiBarChart2, FiMessageSquare,
  FiPackage, FiUsers, FiDollarSign, FiHeart, FiMail,
  FiTrendingDown, FiSettings, FiClock, FiSmile, FiLink, FiTrendingUp,
  FiSearch, FiGift, FiEye, FiShoppingBag
} from 'react-icons/fi';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './Home.module.css';

const heroSlides = [
  {
    subtitle: 'Salon CRM Software',
    title: 'Are you looking for ways to',
    highlight: 'manage customer relationships',
    titleEnd: 'using multiple tools and spreadsheets?',
    desc: 'Do you find it challenging to keep track of customer interactions and sales opportunities? Then, look no further than Swalook CRM system!',
  },
  {
    subtitle: 'All-in-One Platform',
    title: 'Managing a salon becomes chaotic',
    highlight: 'without the right CRM software',
    titleEnd: '',
    desc: 'Missed appointments, scattered spreadsheets, inventory mismanagement, and inconsistent client follow-ups. Swalook solves this with a powerful all-in-one platform designed to streamline your operations.',
  },
];

const services = [
  { icon: <FiLayout />, title: 'Dashboard', desc: 'Gain valuable insights into your salon\'s performance with real-time analytics and key metrics.', link: '/salon-dashboard-software' },
  { icon: <FiCalendar />, title: 'Appointments', desc: 'Simplify scheduling with our intuitive calendar, enabling clients to book appointments online.', link: '/salon-appointment-scheduling-software' },
  { icon: <FiFileText />, title: 'Invoices', desc: 'Generate professional digital invoices, track payments, and manage billing seamlessly.', link: '/salon-invoice-software' },
  { icon: <FiBarChart2 />, title: 'Analysis', desc: 'Utilize powerful analytics tools to track sales trends and client behavior, helping you make informed decisions.', link: '/salon-analytics-software' },
  { icon: <FiMessageSquare />, title: 'Inquiries', desc: 'Easily track customer inquiries and manage lead follow-ups in one place. Never miss a potential client.', link: '/salon-inquiry-management' },
  { icon: <FiPackage />, title: 'Inventory', desc: 'Keep full control of your salon stock. Monitor product levels, set low-stock alerts, and streamline purchasing.', link: '/salon-inventory-management-software' },
  { icon: <FiUsers />, title: 'Staff & Attendance', desc: 'Effortlessly manage your team\'s roles, shifts, and performance while tracking attendance.', link: '/salon-staff-attendance-software' },
  { icon: <FiDollarSign />, title: 'Expense & Purchasing', desc: 'Track business expenses, purchases, and payment history with complete transparency.', link: '/salon-expense-management-software' },
  { icon: <FiHeart />, title: 'Customer Loyalty', desc: 'Boost client retention with customized loyalty programs. Track visits, reward frequent clients.', link: '/salon-loyalty-program-software' },
  { icon: <FiMail />, title: 'Templates', desc: 'Access ready-to-use marketing templates for emails, SMS, and promotions. Drive repeat bookings.', link: '/salon-marketing-templates' },
];

const whyReasons = [
  { icon: <FiTrendingDown />, title: 'Reduce Operational Costs', desc: 'By streamlining operations and automating tasks, you can significantly cut down on operational costs.' },
  { icon: <FiSettings />, title: 'Highly Customizable', desc: 'Every salon is unique, and our highly customizable system allows you to tailor it to your specific needs and branding.' },
  { icon: <FiClock />, title: 'Time Management', desc: 'Our system helps you manage your time more effectively, allowing you to focus on high-value tasks that drive business growth.' },
  { icon: <FiSmile />, title: 'Client Satisfaction', desc: 'With easier appointment booking, automated reminders, and personalized loyalty programs, you can enhance client satisfaction.' },
  { icon: <FiLink />, title: 'Seamless Integration', desc: 'Swalook integrates seamlessly with popular payment gateways, accounting tools, and communication platforms for a connected workflow.' },
  { icon: <FiTrendingUp />, title: 'Scalable', desc: 'As your salon grows, Swalook can scale with you, providing the functionality you need to manage your expanding business.' },
];

const mobileFeatures = [
  { icon: <FiSearch />, title: 'Search Salons Near You', desc: 'Discover nearby salons, compare services, and book your next appointment in just a few taps.' },
  { icon: <FiGift />, title: 'Get Personalized Offers', desc: 'Receive exclusive deals and discounts tailored to your visit history and preferences.' },
  { icon: <FiEye />, title: 'AI-Powered Style Suggestions', desc: 'Explore trending hairstyles and get personalized recommendations based on your preferences — smart beauty at your fingertips.' },
  { icon: <FiShoppingBag />, title: 'Shop Beauty Products', desc: 'Browse and purchase salon-recommended beauty products directly from the app.' },
];

const testimonials = [
  'Swalook has completely transformed how we manage appointments. The automated reminders have significantly reduced no-shows, and we\'re able to track customer preferences and provide personalized service. Our clients love the improved communication!',
  'The personalized service we can now offer thanks to Swalook\'s CRM is incredible. We can track client preferences, send tailored promotions, and follow up on their last visit with precision. It\'s really boosted our reputation.',
  'Managing inventory used to be a nightmare — we\'d constantly run out of products mid-service. With Swalook\'s real-time stock tracking and low-stock alerts, we\'ve eliminated wastage and our purchasing is now perfectly optimized.',
  'Before Swalook, it was hard to keep track of all our client details and market to them effectively. Now, with centralized data and integrated marketing tools, we\'ve seen a 25% increase in returning customers in just a few months.',
];

const features = [
  { title: 'Streamlined Appointment Booking', desc: 'Let your customers select their preferred service, date, time, and stylist online or via the app. Reduce scheduling conflicts and no-shows with automated reminders.', image: '/images/feature-appointments.png' },
  { title: 'Customizable Customer Profiles', desc: 'Build detailed profiles with service preferences, visit history, and personal notes — empowering your team to deliver a truly personalised experience every time.', image: '/images/feature-profiles.png' },
  { title: 'Marketing & Loyalty Programs', desc: 'Run targeted email, SMS, and WhatsApp campaigns. Reward loyal clients with points-based programs and keep them coming back with personalized offers.', image: '/images/feature-marketing.png' },
  { title: 'Mobile App Access', desc: 'Give customers the power to book, reschedule, and explore your salon services on the go — anytime, anywhere from their smartphones.', image: '/images/feature-mobile.png' },
];

const faqItems = [
  { q: 'What is Swalook?', a: 'Swalook is an all-in-one salon management CRM platform designed to help salon owners streamline operations, manage appointments, engage clients, track inventory, and grow their business – all from one dashboard.' },
  { q: 'Who is Swalook for?', a: 'Swalook is ideal for salons, spas, beauty parlors, and wellness centers of all sizes – whether you\'re a solo stylist, a boutique salon, or a multi-location chain.' },
  { q: 'Can clients book online?', a: 'Yes! With Swalook, your clients can book appointments online or via the mobile app. They can select services, choose stylists, pick a time, and get instant confirmations.' },
  { q: 'How does inventory tracking work?', a: 'Swalook offers real-time inventory tracking, low-stock alerts, and detailed product usage reports so you always have the right products in stock without over-ordering.' },
];

const stats = [
  { number: '50+', label: 'Trusted Clients' },
  { number: '10+', label: 'CRM Features' },
  { number: '24/7', label: 'Support' },
  { number: '99%', label: 'Uptime' },
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[heroIndex];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroShape1} />
          <div className={styles.heroShape2} />
          <div className={styles.heroShape3} />
          {[...Array(6)].map((_, i) => <div key={i} className={styles.heroParticle} />)}
        </div>
        <div className={styles.heroContent}>
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.heroLabel}>{slide.subtitle}</span>
            <h1 className={styles.heroTitle}>
              {slide.title}{' '}
              <span className={styles.heroHighlight}>{slide.highlight}</span>
              {slide.titleEnd && ` ${slide.titleEnd}`}
            </h1>
            <p className={styles.heroDesc}>{slide.desc}</p>
          </motion.div>
          <div className={styles.heroActions}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Request a Demo <FiArrowRight />
            </Link>
            <Link href="/about" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
          {/* Slide indicators */}
          <div className={styles.heroIndicators}>
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`${styles.indicator} ${i === heroIndex ? styles.indicatorActive : ''}`}
                onClick={() => setHeroIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <AnimatedSection direction="left">
            <div className={styles.aboutImage}>
              <Image src="/images/salon-hero.png" alt="Modern salon management with Swalook" width={600} height={450} className={styles.aboutImg} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-xl)' }} />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className={styles.aboutContent}>
              <h3>About Company</h3>
              <h2>Transform Your Salon Management with Swalook</h2>
              <p>
                Swalook is a cloud-based salon management software trusted by salons and spas globally. 
                With a centralized dashboard, you can manage appointments, payments, inventory, staff schedules, 
                and customer relationships with ease. Our advanced analytics provide actionable insights to grow 
                your revenue, improve client satisfaction, and automate routine tasks.
              </p>
              <p>
                Whether you run a single salon or multiple locations, Swalook empowers you to operate efficiently, 
                reduce errors, and deliver exceptional service every day.
              </p>
              <div className={styles.aboutActions}>
                <Link href="/contact" className="btn btn-primary">Contact Us Now</Link>
                <Link href="/about" className="btn btn-outline">Learn More</Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className={styles.servicesSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Our Services</span>
            <h2 className="section-title">Swalook&apos;s All-in-One Salon CRM Software Features</h2>
            <p className="section-subtitle">
              Explore powerful tools designed to simplify daily operations, enhance client engagement, 
              and scale your business—all from one easy-to-use platform.
            </p>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.servicesGrid}>
          {services.map((svc) => (
            <StaggerItem key={svc.title}>
              <Link href={svc.link} style={{ display: 'block' }}>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{svc.icon}</div>
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                  <span className={styles.serviceLink}>Learn More <FiArrowRight /></span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ===== WHAT WE PROVIDE ===== */}
      <section className={styles.provideSection}>
        <div className={styles.provideContent}>
          <AnimatedSection>
            <span className="section-label">What We Provide You</span>
            <h2 className="section-title">Everything You Need, One Unified Platform</h2>
            <p>
              From appointment scheduling and billing to inventory tracking and marketing automation — 
              Swalook consolidates every aspect of salon management into a single, easy-to-use system. 
              Spend less time on admin work and more time delivering exceptional client experiences.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className={styles.whySection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Why Us</span>
            <h2 className="section-title">Why Choose Swalook — The Best Salon CRM Software</h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.whyGrid}>
          {whyReasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ===== MOBILE APP ===== */}
      <section className={styles.mobileAppSection}>
        <div className={styles.mobileAppGrid}>
          <div className="section-header">
            <AnimatedSection>
              <span className="section-label">Mobile App</span>
              <h2 className="section-title">Your Beauty Transformation at your Fingertips</h2>
            </AnimatedSection>
          </div>
          <StaggerContainer className={styles.featureList}>
            {mobileFeatures.map((f) => (
              <StaggerItem key={f.title}>
                <div className={styles.featureItem}>
                  <div className={styles.featureItemIcon}>{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection delay={0.3}>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 28, fontSize: '0.92rem' }}>
              Stay tuned for new and exciting features that will continuously enhance your experience with Swalook.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className={styles.testimonialsSection}>
        <AnimatedSection>
          <div className={styles.trustBadge}>
            <span className={styles.trustNumber}>50+</span>
            <h3>More Than 50 Clients Trust Us</h3>
            <p>
              Transform Your Salon Business with Swalook: Boost Efficiency, Increase Revenue, 
              and Deliver Exceptional Customer Experience.
            </p>
          </div>
        </AnimatedSection>
        <div className="section-header">
          <AnimatedSection>
            <h2 className="section-title">Happy Stories</h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.testimonialGrid}>
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className={styles.testimonialCard}>
                <p>{t}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className={styles.featuresOverview}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Key Features</span>
            <h2 className="section-title">Explore Our Key Features</h2>
            <p className="section-subtitle">
              Discover the tools that power smarter salon operations — from effortless booking 
              to personalized client engagement and data-driven growth.
            </p>
          </AnimatedSection>
        </div>
        {features.map((f, i) => (
          <div key={f.title} className={`${styles.featureRow} ${i % 2 !== 0 ? styles.featureRowReverse : ''}`}>
            <AnimatedSection direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className={styles.featureImageBox}>
                <Image src={f.image} alt={f.title} width={560} height={350} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-xl)' }} />
              </div>
            </AnimatedSection>
            <AnimatedSection direction={i % 2 === 0 ? 'right' : 'left'}>
              <div className={styles.featureTextBox}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </AnimatedSection>
          </div>
        ))}
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <AnimatedSection>
          <div className={styles.ctaContent}>
            <h2>Get Started with Swalook</h2>
            <p>Ready to transform your salon? Book a free demo and see Swalook in action.</p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Click here for free demo <FiArrowRight />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* ===== FAQ ===== */}
      <section className={styles.faqPreview}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </AnimatedSection>
        </div>
        <div className={styles.faqList}>
          {faqItems.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className={styles.faqItem}>
                <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}
                  <FiPlus className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ''}`} />
                </button>
                <div className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ''}`}>
                  <div className={styles.faqAnswerInner}>{item.a}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
          <div className={styles.faqMoreLink}>
            <Link href="/faq" className="btn btn-outline">People Also Ask <FiArrowRight /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
