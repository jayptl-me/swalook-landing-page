'use client';

import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './Careers.module.css';

const whyReasons = [
  { title: 'Startup Culture, Big Vision', desc: "You'll be part of a fast-growing startup where your ideas matter and your contributions make an impact from day one." },
  { title: 'Purpose-Driven Work', desc: "We're not just building software; we're transforming how salons operate and thrive. You'll help local businesses grow faster and smarter." },
  { title: 'Hybrid & Remote-Friendly', desc: 'Flexibility is part of who we are. Depending on the role, we offer hybrid or fully remote work options.' },
  { title: 'Collaborative Team Culture', desc: 'Work alongside passionate professionals in product, engineering, design, and marketing who are dedicated to pushing boundaries.' },
  { title: 'Growth Opportunities', desc: "Whether you're an intern or a full-time hire, we invest in your learning and career growth through mentorship and hands-on experience." },
];

const traits = [
  'Passionate about technology and beauty/wellness',
  'Curious, creative, and not afraid to experiment',
  'Focused on solving customer problems with empathy',
  'Great communicators and team collaborators',
];

const openings = [
  { role: 'Graphic Designer Intern', type: 'Internship', location: 'Remote' },
  { role: 'SEO Intern', type: 'Internship', location: 'Remote' },
];

const teamSays = [
  {
    quote: 'My internship at Swalook was an incredible learning experience. I worked on designing and integrating features in the CRM software, gaining hands-on skills in full-stack development and understanding complex CRM systems. The positive culture and continuous support from my supervisor helped me grow both technically and professionally.',
    name: '– Former Frontend Developer Intern',
  },
  {
    quote: 'During my time at Swalook, I learned a lot about front-end development for mobile apps. The team was incredibly helpful, skilled, and always ready to guide me. I feel lucky to have worked with such a talented group and truly valued the experience.',
    name: '– Former Mobile App Developer Intern',
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers"
        title="Build the Future of Beauty Tech."
        highlight="Join the Swalook Team"
        description="Be part of the innovation that's redefining the salon industry."
      />

      {/* Who Are We */}
      <section className={styles.whoSection}>
        <div className="section-header">
          <AnimatedSection>
            <h2 className="section-title">Who are we?</h2>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className={styles.whoContent}>
            <p>
              We&apos;re Swalook — a fast-growing startup on a mission to modernize the salon and beauty industry 
              through technology. Our tight-knit team of engineers, designers, and marketers builds tools that 
              real salon owners use every day to run their businesses more efficiently. If you&apos;re looking for 
              a place where your work has a direct, visible impact — you&apos;re in the right place.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Why Work Here */}
      <section className={styles.whyWorkSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Why Work Here</span>
            <h2 className="section-title">Why You&apos;ll Love Working Here</h2>
            <p className="section-subtitle">
              At Swalook, we&apos;re more than just a tech company — we&apos;re a team of thinkers, creators, 
              doers, and dreamers working to solve real-world challenges.
            </p>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.whyGrid}>
          {whyReasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className={styles.whyCard}>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Who We're Looking For */}
      <section className={styles.lookingSection}>
        <div className="section-header">
          <AnimatedSection>
            <h2 className="section-title">Who we&apos;re looking for?</h2>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className={styles.lookingContent}>
            <p>We&apos;re always on the lookout for people who are:</p>
            <div className={styles.traitsList}>
              {traits.map((t, i) => (
                <div key={i} className={styles.traitItem}>
                  <FiCheck className={styles.traitIcon} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <p>
              If you love what we do and want to be part of an exciting team, send us your resume at{' '}
              <a href="mailto:hr@swalook.in" className={styles.emailLink}>hr@swalook.in</a>
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Current Openings */}
      <section className={styles.openingsSection}>
        <div className="section-header">
          <AnimatedSection>
            <span className="section-label">Open Positions</span>
            <h2 className="section-title">Current Openings at Swalook</h2>
            <p className="section-subtitle">Browse our current roles and internships</p>
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <div className={styles.openingsContainer}>
            <div className={styles.openingsTableWrapper}>
              <table className={styles.openingsTable}>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {openings.map((o) => (
                    <tr key={o.role}>
                      <td>{o.role}</td>
                      <td>{o.type}</td>
                      <td>{o.location}</td>
                      <td>
                        <a href="mailto:hr@swalook.in" className={styles.applyBtn}>Apply Now</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.noRole}>
              <p>
                Didn&apos;t see a role that fits? We still want to hear from you! Drop us a line at{' '}
                <a href="mailto:hr@swalook.in" className={styles.emailLink}>hr@swalook.in</a>{' '}
                and tell us why you&apos;d love to work with us.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Team Testimonials */}
      <section className={styles.teamSection}>
        <div className="section-header">
          <AnimatedSection>
            <h2 className="section-title">What Our Team Says</h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className={styles.teamGrid}>
          {teamSays.map((t, i) => (
            <StaggerItem key={i}>
              <div className={styles.teamCard}>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <span>{t.name}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Join CTA */}
      <section className={styles.joinCta}>
        <AnimatedSection>
          <h2>Ready to Join the Journey?</h2>
          <p>Be part of the innovation that&apos;s redefining the salon industry.</p>
          <div className={styles.joinActions}>
            <a href="mailto:hr@swalook.in" className="btn btn-primary">
              Apply Now <FiArrowRight />
            </a>
            <a href="https://www.linkedin.com/company/swalook/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Follow on LinkedIn
            </a>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
