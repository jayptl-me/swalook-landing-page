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

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const filtered = activeCategory === 'All Posts' ? blogs : blogs.filter(b => b.category === activeCategory);

  return (
    <>
      <PageHero
        label="Blog"
        title="Insights & Strategies for"
        highlight="Salon Success"
        description="Expert advice on salon management, CRM tips, and marketing strategies to grow your business."
      />

      <section className={styles.blogsLayout}>
        <div className={styles.blogsContainer}>
          <div>
            {/* Category Tabs */}
            <div className={styles.categoryTabs}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.categoryTab} ${activeCategory === cat ? styles.categoryTabActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
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
                      <span className={styles.readMore}>Read More <FiArrowRight /></span>
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
              <h3>Most Recent Posts</h3>
              <div className={styles.recentList}>
                {blogs.map(blog => (
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
