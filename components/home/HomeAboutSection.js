'use client';

import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import styles from '@/components/home/Home.module.css';

export default function HomeAboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.sectionShell}>
        <div className={styles.aboutGrid}>
          <AnimatedSection direction="left">
            <div className={styles.aboutImage}>
              <Image
                src="/images/team-about.png"
                alt="Swalook team and salon product story"
                width={600}
                height={450}
                className={styles.aboutImg}
                priority={false}
              />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className={styles.aboutContent}>
              <span className="section-label">About Swalook</span>
              <h2>Built to Grow Revenue for the Beauty Industry</h2>
              <p>
                Swalook is designed for salons, spas, beauty studios, and multi-branch businesses that want to grow
                smarter. We combine customer retention, marketing automation, appointments, billing, and operations
                into one simple platform so your team can focus on service, not spreadsheets.
              </p>
              <p>
                From repeat visits to branch reporting, Swalook helps you turn everyday operations into better
                customer experiences and stronger business results.
              </p>
              <div className={styles.aboutActions}>
                <Link href="/book-demo" className="btn btn-primary">
                  Book a Demo
                </Link>
                <Link href="/about" className="btn btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
