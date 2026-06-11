'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import BlogBreadcrumb from '@/components/blog/BlogBreadcrumb';
import BlogMeta from '@/components/blog/BlogMeta';
import { getRelatedPosts, getAllPosts } from '@/lib/blog';

function getRelatedBlogPosts(currentSlug) {
  return getRelatedPosts(currentSlug).map((post) => ({
    ...post,
    href: `/blogs/${post.slug}`,
  }));
}
import styles from './BlogPost.module.css';

export default function BlogPostLayout({
  title,
  category,
  children,
  currentSlug,
  readTime = '6 min read',
  publishedAt = '2026-01-01',
  author = 'Swalook Editorial',
  summary = 'Practical guidance that helps salon owners turn everyday operations into repeat revenue, cleaner workflows, and stronger retention.',
  highlights = [],
  primaryCtaLabel = 'Book Free Demo',
  primaryCtaHref = '/book-demo',
  secondaryCtaLabel = 'Start Free Trial',
  secondaryCtaHref = '/free-trial',
}) {
  const relatedPosts = getRelatedBlogPosts(currentSlug);

  return (
    <article className={styles.post}>
      <div className={styles.container}>
        <main className={styles.content}>
          <header className={styles.header}>
            <div className={styles.articleHero}>
              <BlogBreadcrumb title={title} />

              <div className={styles.heroMetaRow}>
                <BlogMeta
                  category={category}
                  readTime={readTime}
                  author={author}
                  publishedAt={publishedAt}
                />
                {category ? <span className={styles.sidebarEyebrow}>{category}</span> : null}
              </div>

              <h1 className={styles.title}>{title}</h1>
              <p className={styles.summary}>{summary}</p>

              {highlights.length ? (
                <div className={styles.highlights}>
                  {highlights.map((item) => (
                    <div key={item.title} className={styles.highlightItem}>
                      <span>{item.title}</span>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className={styles.articleActions}>
                <Link href={primaryCtaHref} className="btn btn-primary btn-sm">
                  {primaryCtaLabel} <FiArrowRight />
                </Link>
                <Link href={secondaryCtaHref} className="btn btn-outline btn-sm">
                  {secondaryCtaLabel}
                </Link>
              </div>
            </div>
          </header>

          <section className={styles.body}>{children}</section>

          <footer className={styles.articleFooter}>
            <div className={styles.articleCta}>
              <div>
                <span className={styles.sidebarEyebrow}>Next step</span>
                <h2>See how this strategy works inside Swalook.</h2>
                <p>
                  Explore the product workflows behind the guidance, or book a demo to see how Swalook fits your salon.
                </p>
              </div>
              <div className={styles.articleActions}>
                <Link href={primaryCtaHref} className="btn btn-primary btn-sm">
                  {primaryCtaLabel} <FiArrowRight />
                </Link>
                <Link href={secondaryCtaHref} className="btn btn-outline btn-sm">
                  {secondaryCtaLabel}
                </Link>
              </div>
            </div>
          </footer>
        </main>

        <aside className={styles.sidebar}>
          <section className={styles.sidebarCard}>
            <span className={styles.sidebarEyebrow}>Article snapshot</span>
            <h2>Read with context</h2>

            <div className={styles.metaGrid}>
              <div className={styles.metaCard}>
                <span>Category</span>
                <strong>{category}</strong>
              </div>
              <div className={styles.metaCard}>
                <span>Read time</span>
                <strong>{readTime}</strong>
              </div>
              <div className={styles.metaCard}>
                <span>Published</span>
                <strong>{publishedAt}</strong>
              </div>
              <div className={styles.metaCard}>
                <span>Author</span>
                <strong>{author}</strong>
              </div>
            </div>
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
            <span className={styles.sidebarEyebrow}>Quick routes</span>
            <h3>Move into the product</h3>
            <div className={styles.actionStack}>
              <Link href="/salon-crm-features" className={styles.actionLink}>
                <span>Salon CRM Features</span>
                <FiArrowRight aria-hidden="true" />
              </Link>
              <Link href="/book-demo" className={styles.actionLink}>
                <span>Book Free Demo</span>
                <FiArrowRight aria-hidden="true" />
              </Link>
              <Link href="/free-trial" className={styles.actionLink}>
                <span>Start Free Trial</span>
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className={styles.sidebarCard}>
            <span className={styles.sidebarEyebrow}>Key takeaways</span>
            <h3>What this article covers</h3>
            <div className={styles.recapList}>
              <div className={styles.recapItem}>
                <strong>Problem</strong>
                <span>Why the salon workflow needs a better system.</span>
              </div>
              <div className={styles.recapItem}>
                <strong>Approach</strong>
                <span>How Swalook supports repeat visits, follow-up, and clarity.</span>
              </div>
              <div className={styles.recapItem}>
                <strong>Next step</strong>
                <span>Where to go in the product after reading.</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
