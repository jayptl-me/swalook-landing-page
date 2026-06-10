import Link from 'next/link';
import BlogIcon from './BlogIcon';
import BlogMeta from './BlogMeta';
import styles from './BlogPostCard.module.css';

export default function BlogPostCard({ post }) {
  return (
    <Link href={post.href || `/blogs/${post.slug}`} className={styles.card}>
      <div className={styles.visual}>
        <BlogIcon icon={post.icon} accent={post.accent} />
        <div className={styles.visualText}>
          <span className={styles.eyebrow}>{post.eyebrow}</span>
          <span className={styles.category}>{post.category}</span>
        </div>
      </div>

      <div className={styles.content}>
        <BlogMeta
          compact
          category={null}
          readTime={post.readTime}
          author={post.author}
          publishedAt={post.publishedAt}
        />
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.readMore}>Read article</span>
      </div>
    </Link>
  );
}
