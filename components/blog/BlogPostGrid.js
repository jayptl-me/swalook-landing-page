import BlogPostCard from './BlogPostCard';
import styles from './BlogPostGrid.module.css';

export default function BlogPostGrid({ posts, emptyState }) {
  if (!posts.length) {
    return <div className={styles.emptyState}>{emptyState}</div>;
  }

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
