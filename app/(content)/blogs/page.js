'use client';

import { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import BlogHero from '@/components/blog/BlogHero';
import BlogCategoryTabs from '@/components/blog/BlogCategoryTabs';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import BlogSidebarRail from '@/components/blog/BlogSidebarRail';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogFeaturedPost from '@/components/blog/BlogFeaturedPost';
import BlogPagination from '@/components/blog/BlogPagination';
import { getAllPosts, getCategories } from '@/lib/blog';
import blogConfig from '@/data/blog-config.json';

const blogPosts = getAllPosts().map((post) => ({
  ...post,
  href: `/blogs/${post.slug}`,
}));
const blogCategories = getCategories();
const blogQuickRoutes = blogConfig.quickRoutes;
const blogInsights = blogConfig.insights;
const blogCTAItems = blogConfig.ctaItems;
import styles from './Blogs.module.css';

const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Category filter
    if (activeCategory !== 'All Posts') {
      posts = posts.filter((post) => post.category === activeCategory);
    }

    // Search filter (fuzzy match on title + excerpt)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Featured post: first post when no filters active, otherwise none
  const showFeatured = activeCategory === 'All Posts' && !searchQuery && currentPage === 1;
  const featuredPost = showFeatured ? blogPosts[0] : null;

  // Remove featured post from grid when showing it
  const gridPosts = showFeatured
    ? paginatedPosts.filter((p) => p.slug !== featuredPost.slug)
    : paginatedPosts;

  return (
    <>
      <BlogHero
        label="Blog"
        title={<>Insights and strategies for salon success</>}
        description="Practical CRM, marketing, and growth guidance for salon owners who want more repeat clients, cleaner operations, and stronger revenue."
        stats={[
          { value: '4+', label: 'In-depth guides' },
          { value: '5 min', label: 'Avg. read time' },
          { value: 'Weekly', label: 'New articles' },
        ]}
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
              <div className={styles.toolbarTop}>
                <BlogCategoryTabs
                  categories={blogCategories}
                  activeCategory={activeCategory}
                  onChange={handleCategoryChange}
                />
                <BlogSearch onSearch={handleSearch} />
              </div>

              {searchQuery && (
                <p className={styles.searchResultInfo}>
                  {filteredPosts.length === 0
                    ? `No results for "${searchQuery}"`
                    : `Found ${filteredPosts.length} result${filteredPosts.length === 1 ? '' : 's'} for "${searchQuery}"`}
                </p>
              )}
            </div>

            {showFeatured && featuredPost && (
              <BlogFeaturedPost post={featuredPost} />
            )}

            {filteredPosts.length === 0 && searchQuery ? (
              <div className={styles.emptyState}>
                <h2>No articles found</h2>
                <p>
                  Try a different search term or browse by category.
                </p>
                <button
                  onClick={() => handleSearch('')}
                  className="btn btn-outline btn-sm"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <>
                <BlogPostGrid
                  posts={gridPosts}
                  emptyState={
                    <div className={styles.emptyState}>
                      <h2>No posts in this category yet</h2>
                      <p>Check back soon or browse all articles.</p>
                    </div>
                  }
                />

                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
