'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen, FiSearch, FiTrendingUp, FiMessageSquare, FiCalendar } from 'react-icons/fi';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import styles from './Blogs.module.css';

const categories = [
  'All Posts',
  'CRM Benefits for Salons',
  'Marketing Automation Tools',
  'Salon CRM & Software Guide',
  'Salon Marketing & Engagement',
];

const blogs = [
  {
    title: '7 Key Factors When Choosing Salon CRM Software',
    slug: '/7-key-factors-for-choosing-salon-crm-software',
    category: 'Salon CRM & Software Guide',
    excerpt:
      'A clean framework for comparing salon CRM tools based on retention, automation, reporting, and team workflow.',
    emoji: '🔑',
    readTime: '6 min read',
  },
  {
    title: 'Why Salons Need CRM Software: Swalook Solutions',
    slug: '/why-salons-fall-behind-without-crm-software',
    category: 'CRM Benefits for Salons',
    excerpt:
      'Understand why manual operations stall growth and how a CRM can create a more organized, repeatable salon system.',
    emoji: '💡',
    readTime: '5 min read',
  },
  {
    title: 'Integrated Marketing for Salons with Swalook CRM',
    slug: '/the-importance-of-integrated-marketing',
    category: 'Salon Marketing & Engagement',
    excerpt:
      'See how retention marketing, offers, and audience segmentation work together to improve repeat business.',
    emoji: '🎯',
    readTime: '7 min read',
  },
  {
    title: 'How to Automate Your Salon Marketing with Swalook',
    slug: '/how-to-automate-your-salon-marketing-with-swalook',
    category: 'Marketing Automation Tools',
    excerpt:
      'A practical breakdown of automated campaigns, follow-ups, and reminders that save time and improve conversions.',
    emoji: '🤖',
    readTime: '6 min read',
  },
];

const featuredRoutes = [
  { label: 'Salon CRM Features', href: '/salon-crm-features' },
  { label: 'Book Free Demo', href: '/book-demo' },
  { label: 'Start Free Trial', href: '/free-trial' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
];

const featuredInsights = [
  {
    icon: <FiTrendingUp />,
    title: 'Growth-focused content',
    desc: 'Each article should move readers toward retention, revenue, and repeat visits.',
  },
  {
    icon: <FiMessageSquare />,
    title: 'Practical, not fluffy',
    desc: 'Clear examples and simple steps beat long, vague marketing advice.',
  },
  {
    icon: <FiCalendar />,
    title: 'Built for conversion',
    desc: 'Every post should have a natural next step into a demo, feature page, or FAQ.',
  },
];

const blogStats = [
  { value: '4', label: 'Featured reads' },
  { value: '5', label: 'Conversion routes' },
  { value: '1', label: 'Content funnel' },
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All Posts');

  const filteredBlogs = useMemo(() => {
    return activeCategory === 'All Posts'
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <section className={styles.blogHero}>
        <div className={styles.blogHeroBg} aria-hidden="true" />
        <div className={styles.blogHeroContent}>
          <AnimatedSection>
            <span className={styles.blogHeroLabel}>
              <FiBookOpen /> Blog
            </span>
            <h1 className={styles.blogHeroTitle}>
              Insights and strategies for
              <span> salon success</span>
            </h1>
            <p className={styles.blogHeroDesc}>
              Practical CRM, marketing, and growth guidance for salon owners who want more repeat clients,
              cleaner operations, and stronger revenue.
            </p>

            <div className={styles.blogStats}>
              {blogStats.map((stat) => (
                <div key={stat.label} className={styles.blogStat}>
                  <span>{stat.value}</span>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.blogsLayout}>
        <div className={styles.blogsContainer}>
          <aside className={styles.blogIntroRail}>
            <AnimatedSection>
              <div className={styles.sidebarCard}>
                <span className={styles.sidebarEyebrow}>Start here</span>
                <h2>Move from reading to action</h2>
                <p>
                  Use the blog as a learning path, then continue into the feature pages and conversion routes.
                </p>

                <div className={styles.quickRoutes}>
                  {featuredRoutes.map((route) => (
                    <Link key={route.href} href={route.href} className={styles.quickRoute}>
                      <span>{route.label}</span>
                      <FiArrowRight />
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <div className={styles.sidebarCard}>
                <span className={styles.sidebarEyebrow}>Why read this blog</span>
                <h3>Designed for salon growth</h3>
                <div className={styles.insightList}>
                  {featuredInsights.map((item) => (
                    <div key={item.title} className={styles.insightItem}>
                      <div className={styles.insightIcon}>{item.icon}</div>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.16}>
              <div className={styles.sidebarCard}>
                <span className={styles.sidebarEyebrow}>Primary actions</span>
                <h3>Get closer to the product</h3>
                <div className={styles.actionStack}>
                  <Link href="/book-demo" className="btn btn-primary btn-sm">
                    Book Free Demo <FiArrowRight />
                  </Link>
                  <Link href="/free-trial" className="btn btn-outline btn-sm">
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </aside>

          <main className={styles.blogMain}>
            <div className={styles.blogToolbar}>
              <div className={styles.categoryTabs}>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`${styles.categoryTab} ${activeCategory === category ? styles.categoryTabActive : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className={styles.searchHint}>
                <FiSearch />
                <span>Browse articles by category</span>
              </div>
            </div>

            <StaggerContainer className={styles.blogGrid}>
              {filteredBlogs.map((blog) => (
                <StaggerItem key={blog.slug}>
                  <Link href={blog.slug} className={styles.blogCard}>
                    <div className={styles.blogImage}>
                      <span aria-hidden="true">{blog.emoji}</span>
                    </div>

                    <div className={styles.blogContent}>
                      <div className={styles.blogMeta}>
                        <span className={styles.blogTag}>{blog.category}</span>
                        <span className={styles.blogReadTime}>{blog.readTime}</span>
                      </div>

                      <h3>{blog.title}</h3>
                      <p>{blog.excerpt}</p>

                      <span className={styles.readMore}>
                        Read article <FiArrowRight />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimatedSection>
              <div className={styles.blogFooterCta}>
                <div>
                  <span className={styles.sidebarEyebrow}>Need help choosing?</span>
                  <h2>See how Swalook fits your salon.</h2>
                  <p>
                    Book a demo or start a trial to explore the CRM, marketing, and retention workflows in action.
                  </p>
                </div>

                <div className={styles.blogFooterActions}>
                  <Link href="/book-demo" className="btn btn-primary btn-lg">
                    Book Free Demo <FiArrowRight />
                  </Link>
                  <Link href="/free-trial" className="btn btn-outline btn-lg">
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </main>
        </div>
      </section>
    </>
  );
}
