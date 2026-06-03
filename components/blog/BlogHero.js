import BlogMotionSection from './BlogMotionSection';
import styles from './BlogHero.module.css';

export default function BlogHero({ label, title, description, stats }) {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.content}>
        <BlogMotionSection className={styles.copy}>
          {label ? <span className={styles.label}>{label}</span> : null}
          <h1 className={styles.title}>{title}</h1>
          {description ? <p className={styles.description}>{description}</p> : null}

          {stats?.length ? (
            <div className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span>{stat.value}</span>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </BlogMotionSection>
      </div>
    </section>
  );
}
