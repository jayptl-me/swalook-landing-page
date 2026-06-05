'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import styles from '@/components/home/Home.module.css';

export default function HomeFeaturesOverviewSection({ useCases }) {
  return (
    <section className={styles.featuresOverview}>
      <div className={styles.sectionShell}>
        <div className={styles.sectionHeading}>
          <AnimatedSection>
            <span className="section-label">Who Can Use Swalook</span>
            <h2 className="section-title">Built For Every Kind of Beauty Business</h2>
            <p className="section-subtitle">
              Swalook works for small studios, busy wellness centers, and growing multi-branch brands that want
              better control and more repeat revenue.
            </p>
          </AnimatedSection>
        </div>

        <div className={styles.featureRows}>
          {useCases.map((item, i) => (
            <div key={item.title} className={`${styles.featureRow} ${i % 2 !== 0 ? styles.featureRowReverse : ''}`}>
              <AnimatedSection direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className={styles.featureImageBox}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className={styles.featureImage}
                    priority={i === 0}
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection direction={i % 2 === 0 ? 'right' : 'left'}>
                <div className={styles.featureTextBox}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
