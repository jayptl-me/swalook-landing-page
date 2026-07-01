'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiSearch, FiRefreshCw, FiLoader } from 'react-icons/fi';
import BlogHero from '@/components/blog/BlogHero';
import BlogCategoryTabs from '@/components/blog/BlogCategoryTabs';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import BlogSidebarRail from '@/components/blog/BlogSidebarRail';
import { fetchPublishedPosts, fetchCategories } from '@/lib/blog-public';
import {
  blogPosts as staticPosts,
  blogQuickRoutes,
  blogInsights,
  blogCTAItems,
} from '@/components/blog/blogData';
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const categorySlug = useMemo(() => {
    if (activeCategory === 'All Posts') return undefined;
    const found = (apiCategories || []).find(
      (c) => (c.name || c.label) === activeCategory
    );
    return found?.slug || activeCategory.toLowerCase().replace(/\s+/g, '-');
  }, [activeCategory, apiCategories]);

  // Debounce search to avoid excessive API calls
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load initial data from API on mount and when category or search changes
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setApiError(false);
      setPage(1);
      try {
        const params = { limit: 12, page: 1 };
        if (categorySlug) params.category = categorySlug;
        if (debouncedSearch.trim()) params.search = debouncedSearch.trim();

        const [postsResult, categoriesResult] = await Promise.all([
          fetchPublishedPosts(params),
          (apiCategories || []).length === 0 ? fetchCategories() : Promise.resolve(null),
        ]);
        if (cancelled) return;
        if (postsResult.posts && postsResult.posts.length > 0) {
          setApiPosts(postsResult.posts);
          setTotalPosts(postsResult.total || 0);
          setHasMore(postsResult.page * 12 < (postsResult.total || 0));
        }
        // Don't set apiPosts to [] — leaving it null means static fallback kicks in
        if (categoriesResult && categoriesResult.length > 0) {
          setApiCategories(categoriesResult);
        }
        if ((!postsResult.posts || postsResult.posts.length === 0) && (!apiCategories || apiCategories.length === 0)) {
          setApiError(true);
        }
      } catch {
        if (!cancelled) setApiError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [categorySlug, debouncedSearch]);

  // Load more posts
  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const params = { limit: 12, page: nextPage };
      if (categorySlug) params.category = categorySlug;
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
      const result = await fetchPublishedPosts(params);
      if (result.posts && result.posts.length > 0) {
        setApiPosts((prev) => [...(prev || []), ...result.posts]);
        setPage(nextPage);
        setHasMore(nextPage * 12 < (result.total || 0));
      } else {
        setHasMore(false);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingMore(false);
    }
  }, [page, hasMore, loadingMore, categorySlug]);

  // Determine which data to render
  // Fall back to static blogData if API is unavailable
  const posts = useMemo(
    () => (apiPosts || staticPosts).map((post, index) => normalizePost(post, index)),
    [apiPosts]
  );

  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) return apiCategories;
    // Derive categories from posts if API didn't return them
    const unique = new Map();
    for (const post of (apiPosts || staticPosts)) {
      const cat = post.categories?.[0];
      if (cat && cat.name && !unique.has(cat.name)) {
        unique.set(cat.name, cat);
      }
    }
    if (unique.size > 0) return Array.from(unique.values());
    return [];
  }, [apiCategories, apiPosts]);

  // Client-side filtering — applies to both API posts and static fallback
  const filteredPosts = useMemo(() => {
    const byCategory = activeCategory === 'All Posts'
      ? posts
      : posts.filter((post) => {
          const catNames = post.categories
            ? post.categories.map((c) => c.name)
            : [post.category];
          return catNames.includes(activeCategory);
        });

    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return byCategory;
    return byCategory.filter((post) =>
      [post.title, post.excerpt, post.category, ...(post.tags || []).map((tag) => tag.name)]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [posts, activeCategory, debouncedSearch]);

  const displayCategories = categories.map((c) => {
    const name = c.name || c.label;
    const slug = c.slug || name.toLowerCase().replace(/\s+/g, '-');
    return { label: name, slug };
  });

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

            {loading && !apiPosts ? (
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
              <>
                <BlogPostGrid
                  posts={filteredPosts}
                  emptyState={
                    <div className={styles.emptyState}>
                      <h2>No posts found</h2>
                      <p>Try another category or return to all posts.</p>
                    </div>
                  }
                />

                {/* Load More */}
                {hasMore && !loading && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-navy-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-navy-700 dark:text-slate-300 hover:border-brand-300 transition-colors disabled:opacity-50"
                    >
                      {loadingMore ? (
                        <><FiLoader className="animate-spin" /> Loading...</>
                      ) : (
                        'Load More Articles'
                      )}
                    </button>
                  </div>
                )}
              </>
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
