'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiSearch, FiRefreshCw } from 'react-icons/fi';
import BlogHero from '@/components/blog/BlogHero';
import BlogCategoryTabs from '@/components/blog/BlogCategoryTabs';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import BlogSidebarRail from '@/components/blog/BlogSidebarRail';
import {
  blogPosts as staticPosts,
  blogCategories as staticCategories,
  blogQuickRoutes,
  blogInsights,
  blogCTAItems,
} from '@/components/blog/blogData';
import { fetchPublishedPosts, fetchCategories } from '@/lib/blog-public';
import styles from './Blogs.module.css';

function normalizePost(post, index = 0) {
  const category = post.category || post.categories?.[0]?.name || 'Salon Growth';
  const readTime = post.readTime || (post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '6 min read');
  const image =
    post.coverImage ||
    post.ogImage ||
    post.heroMedia?.publicUrl ||
    post.image ||
    null;

  return {
    ...post,
    href: post.href || `/blog/${post.slug}`,
    category,
    readTime,
    author: post.author?.name || post.author || 'Swalook Editorial',
    publishedAt: post.publishedAt || post.published_at || post.createdAt,
    eyebrow: post.eyebrow || (post.featured ? 'Featured guide' : 'Salon insight'),
    coverImage: image,
    imageAlt: post.coverImageAlt || post.heroMedia?.altText || `${post.title} article cover`,
    featured: Boolean(post.featured) || index === 0,
  };
}

export default function BlogsPage() {
  const [apiPosts, setApiPosts] = useState(null);
  const [apiCategories, setApiCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial data from API on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setApiError(false);
      try {
        const [postsResult, categoriesResult] = await Promise.all([
          fetchPublishedPosts({ limit: 50 }),
          fetchCategories(),
        ]);
        if (cancelled) return;
        if (postsResult.posts && postsResult.posts.length > 0) {
          setApiPosts(postsResult.posts);
        }
        if (categoriesResult && categoriesResult.length > 0) {
          setApiCategories(categoriesResult);
        }
      } catch {
        if (!cancelled) setApiError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Determine which data to render
  const posts = useMemo(
    () => (apiPosts || staticPosts).map((post, index) => normalizePost(post, index)),
    [apiPosts]
  );
  const categories = apiCategories || staticCategories;

  const filteredPosts = useMemo(() => {
    const byCategory = activeCategory === 'All Posts' ? posts : posts.filter((post) => {
      const catNames = post.categories
        ? post.categories.map((c) => c.name)
        : [post.category];
      return catNames.includes(activeCategory);
    });

    const query = searchQuery.trim().toLowerCase();
    if (!query) return byCategory;
    return byCategory.filter((post) =>
      [post.title, post.excerpt, post.category, ...(post.tags || []).map((tag) => tag.name)]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [posts, activeCategory, searchQuery]);

  const displayCategories = categories.map((c) => {
    const name = c.name || c.label;
    const slug = c.slug || name.toLowerCase().replace(/\s+/g, '-');
    return { label: name, slug };
  });

  // Ensure "All Posts" is first
  const tabs = [
    { label: 'All Posts', slug: 'all-posts' },
    ...displayCategories.filter((c) => c.label !== 'All Posts'),
  ];

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
                categories={tabs}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />

              <label className={styles.searchBox}>
                <FiSearch aria-hidden="true" />
                <span className="sr-only">Search articles</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search salon CRM, marketing, billing..."
                />
              </label>
            </div>

            {loading ? (
              <div className={styles.loadingState}>
                <div className={styles.gridSkeleton}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={styles.skeletonCard}>
                      <div className={styles.skeletonImage} />
                      <div className={styles.skeletonLine} />
                      <div className={styles.skeletonLineShort} />
                    </div>
                  ))}
                </div>
              </div>
            ) : apiError && !apiPosts ? (
              <div className={styles.errorState}>
                <FiRefreshCw className={styles.errorIcon} aria-hidden="true" />
                <p>Could not load the latest articles.</p>
                <button
                  onClick={() => window.location.reload()}
                  className={styles.retryButton}
                >
                  Try again
                </button>
              </div>
            ) : (
              <BlogPostGrid
                posts={filteredPosts}
                emptyState={
                  <div className={styles.emptyState}>
                    <h2>No posts found</h2>
                    <p>Try another category or return to all posts.</p>
                  </div>
                }
              />
            )}

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
