'use client';

import { useState } from 'react';
import Link from 'next/link';
import BlogMeta from './BlogMeta';
import styles from './BlogPostCard.module.css';

export default function BlogPostCard({ post }) {
  const [imgError, setImgError] = useState(false);
  const hasCover = !!(post.coverImage || post.ogImage);
  const showFallback = !hasCover || imgError;

  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      {/* Image side */}
      <div className={styles.imageSide}>
        {showFallback ? (
          <div className={styles.imageFallback}>
            <span className={styles.eyebrow}>{post.eyebrow}</span>
            <span className={styles.categoryLabel}>{post.category}</span>
          </div>
        ) : (
          <div className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage || post.ogImage}
              alt={post.imageAlt || `${post.title} cover`}
              className={styles.image}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Content side */}
      <div className={styles.content}>
        <BlogMeta
          category={post.category}
          readTime={post.readTime}
          author={post.author}
          publishedAt={post.publishedAt}
        />

        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.footer}>
          {post.categories?.length > 0 && (
            <div className={styles.chips}>
              {post.categories.slice(0, 2).map((cat) => (
                <span key={cat.slug || cat.name} className={styles.chip}>
                  {cat.name}
                </span>
              ))}
            </div>
          )}
          <span className={styles.readMore}>Read article →</span>
        </div>
      </div>
    </Link>
  );
}
