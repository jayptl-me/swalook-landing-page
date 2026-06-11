'use client';

import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

export default function FAQAccordion({ items, styles }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={styles.faqList}>
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `faq-q-${i}`;
        const panelId = `faq-a-${i}`;

        return (
          <div key={i} className={styles.faqItem}>
            <button
              type="button"
              id={buttonId}
              className={styles.faqQuestion}
              onClick={() => toggle(i)}
              aria-expanded={open}
              aria-controls={panelId}
            >
              <span>{item.q}</span>
              <FiPlus className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ''}`} />
            </button>
            <div
              id={panelId}
              className={`${styles.faqAnswer} ${open ? styles.faqAnswerOpen : ''}`}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
            >
              <div className={styles.faqAnswerInner}>{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
