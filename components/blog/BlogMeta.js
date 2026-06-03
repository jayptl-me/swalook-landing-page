import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';
import styles from './BlogMeta.module.css';

function formatPublishedDate(value) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function BlogMeta({ category, readTime, author, publishedAt, compact = false }) {
  const formattedDate = formatPublishedDate(publishedAt);

  return (
    <div className={`${styles.meta} ${compact ? styles.compact : ''}`}>
      {category ? <span className={styles.category}>{category}</span> : null}
      {readTime ? (
        <span className={styles.item}>
          <FiClock aria-hidden="true" />
          <span>{readTime}</span>
        </span>
      ) : null}
      {author ? (
        <span className={styles.item}>
          <FiUser aria-hidden="true" />
          <span>{author}</span>
        </span>
      ) : null}
      {formattedDate ? (
        <span className={styles.item}>
          <FiCalendar aria-hidden="true" />
          <span>{formattedDate}</span>
        </span>
      ) : null}
    </div>
  );
}
