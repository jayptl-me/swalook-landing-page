'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import BlogHero from '@/components/blog/BlogHero';
import BlogCategoryTabs from '@/components/blog/BlogCategoryTabs';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import BlogSidebarRail from '@/components/blog/BlogSidebarRail';
import {
  blogCategories,
  blogPosts,
  blogQuickRoutes,
  blogInsights,
  blogCTAItems,
} from '@/components/blog/blogData';
import styles from './Blogs.module.css';

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All Posts');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All Posts') {
      return blogPosts;
    }

    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <BlogHero
        label="Blog"
        title={<>Insights and strategies for salon success</>}
        description="Practical CRM, marketing, and growth guidance for salon owners who want more repeat clients, cleaner operations, and stronger revenue."
      />

      <section className={styles.blogsLayout}>
        <div className={styles.blogsContainer}>
          <BlogSidebarRail
            quickRoutes={blogQuickRoutes}
            insights={blogInsights}
            primaryActions={[
              { label: 'Book Free Demo', href: '/book-demo' },
              { label: 'Start Free Trial', href: '/free-trial' },
            ]}
          />

          <main className={styles.blogMain}>
            <div className={styles.blogToolbar}>
              <BlogCategoryTabs
                categories={blogCategories}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />

              <div className={styles.searchHint} aria-label="Category browser">
                <FiSearch aria-hidden="true" />
                <span>Browse articles by category</span>
              </div>
            </div>

            <BlogPostGrid
              posts={filteredPosts}
              emptyState={
                <div className={styles.emptyState}>
                  <h2>No posts found</h2>
                  <p>Try another category or return to all posts.</p>
                </div>
              }
            />

            <section className={`${styles.ctaSection} section section-alt`}>
              <div className={`container ${styles.ctaShell}`}>
                <div className={styles.ctaIntro}>
                  <span className="section-label">Need help choosing?</span>
                  <h2 className="section-title">See how Swalook fits your salon.</h2>
                  <p className="section-subtitle">
                    Book a demo or start a trial to explore the CRM, marketing, and retention workflows in action.
                  </p>
                </div>

                <div className={styles.ctaGrid}>
                  {blogCTAItems.map((item) => (
                    <article key={item.href} className={`${styles.ctaCard} glass-card`}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                      <Link href={item.href} className={`btn btn-outline btn-sm ${styles.ctaButton}`}>
                        Continue <FiArrowRight aria-hidden="true" />
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </section>
    </>
  );
}
