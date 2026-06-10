import Link from 'next/link';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import BlogIcon from './BlogIcon';
import styles from './BlogFeaturedPost.module.css';

export default function BlogFeaturedPost({ post }) {
  if (!post) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.badge}>
        <span>Featured Article</span>
      </div>

      <div className={styles.card}>
        <div className={styles.visual}>
          <BlogIcon icon={post.icon} accent={post.accent} />
          <span className={styles.eyebrow}>{post.eyebrow}</span>
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.readTime}>
              <FiClock aria-hidden="true" />
              {post.readTime}
            </span>
            <span className={styles.date}>{post.publishedAt}</span>
          </div>

          <h2 className={styles.title}>
            <Link href={post.href || `/blogs/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className={styles.excerpt}>{post.excerpt}</p>

          {post.highlights?.length ? (
            <ul className={styles.highlights}>
              {post.highlights.slice(0, 3).map((h) => (
                <li key={h.title}>
                  <strong>{h.title}:</strong> {h.text}
                </li>
              ))}
            </ul>
          ) : null}

          <div className={styles.actions}>
            <Link href={post.href || `/blogs/${post.slug}`} className="btn btn-primary btn-sm">
              Read full article <FiArrowRight aria-hidden="true" />
            </Link>
            {post.primaryCta && (
              <Link href={post.primaryCta.href} className="btn btn-outline btn-sm">
                {post.primaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
