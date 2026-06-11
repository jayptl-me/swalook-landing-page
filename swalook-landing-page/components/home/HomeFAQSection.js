'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FAQAccordion from '@/components/ui/FAQAccordion';
import styles from '@/components/home/Home.module.css';

export default function HomeFAQSection({ items }) {
  return (
    <section className={styles.faqPreview}>
      <div className={styles.sectionShell}>
        <div className={styles.sectionHeading}>
          <AnimatedSection>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </AnimatedSection>
        </div>

        <FAQAccordion items={items} styles={styles} />

        <div className={styles.faqMoreLink}>
          <Link href="/faq" className="btn btn-outline">
            People Also Ask <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
