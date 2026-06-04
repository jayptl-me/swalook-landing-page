'use client';

import Link from 'next/link';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import AnimatedSection from '@/components/AnimatedSection';
import styles from '@/components/home/Home.module.css';

function FAQItem({ question, answer, id, open, onToggle }) {
  const buttonId = `faq-question-${id}`;
  const panelId = `faq-answer-${id}`;

  return (
    <div className={styles.faqItem}>
      <button
        type="button"
        id={buttonId}
        className={styles.faqQuestion}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>{question}</span>
        <FiPlus className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ''}`} />
      </button>
      <div
        id={panelId}
        className={`${styles.faqAnswer} ${open ? styles.faqAnswerOpen : ''}`}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
      >
        <div className={styles.faqAnswerInner}>{answer}</div>
      </div>
    </div>
  );
}

export default function HomeFAQSection({ items, openFaq, onToggle }) {
  return (
    <section className={styles.faqPreview}>
      <div className={styles.sectionShell}>
        <div className={styles.sectionHeading}>
          <AnimatedSection>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </AnimatedSection>
        </div>

        <div className={styles.faqList}>
          {items.map((item, i) => (
            <AnimatedSection key={item.q} delay={i * 0.05}>
              <FAQItem
                id={i}
                question={item.q}
                answer={item.a}
                open={openFaq === i}
                onToggle={() => onToggle(i)}
              />
            </AnimatedSection>
          ))}
          <div className={styles.faqMoreLink}>
            <Link href="/faq" className="btn btn-outline">
              People Also Ask <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
