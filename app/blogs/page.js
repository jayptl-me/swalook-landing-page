'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '@/components/PageHero';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './Blogs.module.css';

const categories = ['All Posts', 'CRM Benefits for Salons', 'Marketing Automation Tools', 'Salon CRM & Software Guide', 'Salon Marketing & Engagement'];

const blogs = [
  {
    title: '7 Key Factors When Choosing Salon CRM Software',
    slug: '/7-key-factors-for-choosing-salon-crm-software',
    category: 'Salon CRM & Software Guide',
    excerpt: 'In the fast-paced world of salon management, staying organized and delivering exceptional customer experiences are vital for success. The use of cloud-based salon CRM software can streamline operations and improve customer relationships.',
    emoji: '🔑',
  },
  {
    title: 'Why Salons Need CRM Software: Swalook Solutions',
    slug: '/why-salons-fall-behind-without-crm-software',
    category: 'CRM Benefits for Salons',
    excerpt: 'In today\'s competitive salon industry, providing exceptional service alone is not enough to ensure long-term success. Salons need to leverage technology to stay organized and drive growth.',
    emoji: '💡',
  },
  {
    title: 'Integrated Marketing for Salons with Swalook CRM',
    slug: '/the-importance-of-integrated-marketing',
    category: 'Salon Marketing & Engagement',
    excerpt: 'Effective marketing is key for salons to attract new clients, retain existing ones, and build a strong brand. Swalook salon CRM software provides integrated marketing tools.',
    emoji: '🎯',
  },
  {
    title: 'How to Automate Your Salon Marketing with Swalook',
    slug: '/how-to-automate-your-salon-marketing-with-swalook',
    category: 'Marketing Automation Tools',
    excerpt: 'Salon marketing with Swalook makes it easy to automate your campaigns, engage clients, and save time. In today\'s fast-paced salon industry, manual marketing is ineffective.',
    emoji: '🤖',
  },
];

const featuredRoutes = [
  { label: 'Salon CRM Features', href: '/salon-crm-features' },
  { label: 'Book Free Demo', href: '/book-demo' },
  { label: 'Start Free Trial', href: '/free-trial' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const filtered = activeCategory === 'All Posts' ? blogs : blogs.filter((b) => b.category === activeCategory);

  return (
    <>
      <PageHero
        label="Blog"
        title="Insights & Strategies for"
        highlight="Salon Success"
        description="Expert advice on salon management, CRM tips, and marketing strategies to grow your business."
      />

      <section className={styles.blogsLayout} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '24px' }}>
            <div className={styles.sidebarCard} style={{ marginBottom: 0 }}>
              <h3>Start Here</h3>
              <p>
                Move from education into product exploration with the core routes already present in the site.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
                {featuredRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={styles.categoryTab}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.sidebarCard} style={{ marginBottom: 0 }}>
              <h3>Primary Conversion Actions</h3>
              <p>
                Every blog visit should have a clear next step into a money page or conversion route.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <Link href="/book-demo" className="btn btn-primary btn-sm">
                  Book Free Demo <FiArrowRight />
                </Link>
                <Link href="/free-trial" className="btn btn-outline btn-sm">
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.blogsContainer}>
          <div>
            {/* Category Tabs */}
            <div className={styles.categoryTabs}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.categoryTab} ${activeCategory === cat ? styles.categoryTabActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog Cards */}
            <StaggerContainer className={styles.blogGrid}>
              {filtered.map((blog) => (
                <StaggerItem key={blog.slug}>
                  <Link href={blog.slug} className={styles.blogCard}>
                    <div className={styles.blogImage}>{blog.emoji}</div>
                    <div className={styles.blogContent}>
                      <div className={styles.blogMeta}>
                        <span className={styles.blogTag}>{blog.category}</span>
                      </div>
                      <h3>{blog.title}</h3>
                      <p>{blog.excerpt}</p>
                      <span className={styles.readMore}>
                        Read More <FiArrowRight />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3>About Company</h3>
              <p>
                Swalook is a powerful, cloud-based CRM platform designed specifically for the salon industry.
                It empowers salon owners to streamline operations, enhance customer experiences, and optimize
                business performance.
              </p>
            </div>

            <div className={styles.sidebarCard}>
              <h3>Money Pages</h3>
              <div className={styles.recentList}>
                {featuredRoutes.map((route) => (
                  <Link key={route.href} href={route.href} className={styles.recentItem}>
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h3>Most Recent Posts</h3>
              <div className={styles.recentList}>
                {blogs.map((blog) => (
                  <Link key={blog.slug} href={blog.slug} className={styles.recentItem}>
                    {blog.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
