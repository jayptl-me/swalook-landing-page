import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import styles from './BlogSidebarRail.module.css';

export default function BlogSidebarRail({ quickRoutes, insights, primaryActions, id = 'blog-reading-rail' }) {
  return (
    <aside id={id} className={styles.rail}>
      <section className={styles.card}>
        <span className={styles.eyebrow}>Start here</span>
        <h2>Move from reading to action</h2>
        <p>Use the blog as a learning path, then continue into the feature pages and conversion routes.</p>

        <div className={styles.quickRoutes}>
          {quickRoutes.map((route) => (
            <Link key={route.href} href={route.href} className={styles.quickRoute}>
              <span>{route.label}</span>
              <FiArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <span className={styles.eyebrow}>Why read this blog</span>
        <h3>Designed for salon growth</h3>

        <div className={styles.insightList}>
          {insights.map((item) => (
            <div key={item.title} className={styles.insightItem}>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <span className={styles.eyebrow}>Primary actions</span>
        <h3>Get closer to the product</h3>

        <div className={styles.actionStack}>
          {primaryActions.map((action) => (
            <Link key={action.href} href={action.href} className={styles.actionLink}>
              <span>{action.label}</span>
              <FiArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
