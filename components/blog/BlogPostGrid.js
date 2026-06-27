import BlogPostCard from './BlogPostCard';
import styles from './BlogPostGrid.module.css';

export default function BlogPostGrid({ posts, emptyState }) {
  if (!posts.length) {
    return <div className={styles.emptyState}>{emptyState}</div>;
  }

  return (
    <div className={styles.grid}>
      {posts.map((post, index) => (
        <BlogPostCard
          key={post.slug}
          post={post}
          featured={post.featured || index === 0}
        />
      ))}
    </div>
  );
}
