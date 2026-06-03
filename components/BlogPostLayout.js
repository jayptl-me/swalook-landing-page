'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import BlogBreadcrumb from '@/components/blog/BlogBreadcrumb';
import BlogMeta from '@/components/blog/BlogMeta';
import { getRelatedBlogPosts } from '@/components/blog/blogData';
import styles from './BlogPost.module.css';

export default function BlogPostLayout({
  title,
  category,
  children,
  currentSlug,
  readTime = '6 min read',
  publishedAt = '2026-01-01',
  author = 'Swalook Editorial',
}) {
  const relatedPosts = getRelatedBlogPosts(currentSlug);

  return (
    <article className={styles.post}>
      <div className={styles.container}>
        <div className={styles.content}>
          <BlogBreadcrumb title={title} />

          <header className={styles.header}>
            <BlogMeta
              category={category}
              readTime={readTime}
              author={author}
              publishedAt={publishedAt}
            />
            <h1 className={styles.title}>{title}</h1>
          </header>

          <div className={styles.body}>{children}</div>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.sidebarCard}>
            <span className={styles.sidebarEyebrow}>About Swalook</span>
            <h2>Built for salon growth</h2>
            <p>
              Swalook helps salons improve retention, simplify operations, and turn everyday workflows into
              more repeat revenue.
            </p>
          </section>

          <section className={styles.sidebarCard}>
            <span className={styles.sidebarEyebrow}>Related posts</span>
            <h3>Continue reading</h3>
            <div className={styles.relatedList}>
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={post.href} className={styles.relatedLink}>
                  <span>{post.title}</span>
                  <FiArrowRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.sidebarCard}>
            <span className={styles.sidebarEyebrow}>Next step</span>
            <h3>See the product in action</h3>
            <p>Book a demo or start a trial to explore the workflows behind these insights.</p>
            <div className={styles.actionStack}>
              <Link href="/book-demo" className="btn btn-primary btn-sm">
                Book Free Demo <FiArrowRight />
              </Link>
              <Link href="/free-trial" className="btn btn-outline btn-sm">
                Start Free Trial
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
