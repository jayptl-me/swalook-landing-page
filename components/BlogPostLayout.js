'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import styles from './BlogPost.module.css';

const allPosts = [
  { slug: '7-key-factors-for-choosing-salon-crm-software', title: '7 Key Factors When Choosing Salon CRM Software' },
  { slug: 'why-salons-fall-behind-without-crm-software', title: 'Why Salons Need CRM Software: Swalook Solutions' },
  { slug: 'the-importance-of-integrated-marketing', title: 'Integrated Marketing for Salons with Swalook CRM' },
  { slug: 'how-to-automate-your-salon-marketing-with-swalook', title: 'How to Automate Your Salon Marketing with Swalook' },
];

export default function BlogPostLayout({ title, category, children, currentSlug }) {
  const relatedPosts = allPosts.filter(p => p.slug !== currentSlug);

  return (
    <article className={styles.blogPost}>
      <div className={styles.blogContainer}>
        {/* Main Content */}
        <div>
          <div className={styles.blogBreadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blogs">Blog</Link>
            <span>/</span>
            <span>{title}</span>
          </div>
          <span className={styles.blogCategory}>{category}</span>
          <h1 className={styles.blogTitle}>{title}</h1>
          <div className={styles.blogMeta}>
            <span>By Swalook</span>
            <span>•</span>
            <span>0 Comments</span>
          </div>
          <div className={styles.blogContent}>
            {children}
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.blogSidebar}>
          <div className={styles.sidebarWidget}>
            <h3>About Company</h3>
            <p>
              Swalook is a powerful, cloud-based CRM platform designed specifically for the salon industry. 
              It empowers salon owners to streamline operations, enhance customer experiences, and optimize 
              business performance.
            </p>
          </div>

          <div className={styles.sidebarWidget}>
            <h3>Related Posts</h3>
            <div className={styles.relatedList}>
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/${post.slug}`} className={styles.relatedLink}>
                  {post.title}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.blogCta}>
            <h3>Ready to grow?</h3>
            <p>Try Swalook free and transform your salon management.</p>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Get a Demo <FiArrowRight />
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
