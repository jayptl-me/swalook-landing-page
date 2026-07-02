// ─── Shared blog configuration ───────────────────────────────────────────────
// Categories, quick routes, insights, and CTA items shared across all blogs.
// Blog posts are now in /posts/ directory — see index.js for barrel export.

export const IMAGE_BASE = '/images';

export const blogCategories = [
  { label: 'All Posts', slug: 'all-posts' },
  { label: 'Salon CRM & Software Guide', slug: 'salon-crm-software-guide' },
  { label: 'CRM Benefits for Salons', slug: 'crm-benefits-for-salons' },
  { label: 'Salon Marketing & Engagement', slug: 'salon-marketing-engagement' },
  { label: 'Marketing Automation Tools', slug: 'marketing-automation-tools' },
  { label: 'Salon Operations & Efficiency', slug: 'salon-operations-efficiency' },
  { label: 'Salon Software Comparison', slug: 'salon-software-comparison' },
  { label: 'Salon Appointment Management', slug: 'salon-appointment-management' },
];

export const blogQuickRoutes = [
  { label: 'Salon CRM Features', href: '/salon-crm-features' },
  { label: 'Book Free Demo', href: '/book-demo' },
  { label: 'Start Free Trial', href: '/free-trial' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
];

export const blogInsights = [
  {
    title: 'Growth-focused content',
    desc: 'Each article should move readers toward retention, revenue, and repeat visits.',
  },
  {
    title: 'Practical, not fluffy',
    desc: 'Clear examples and simple steps beat long, vague marketing advice.',
  },
  {
    title: 'Built for conversion',
    desc: 'Every post should have a natural next step into a demo, feature page, or FAQ.',
  },
];

export const blogCTAItems = [
  {
    title: 'See the product',
    desc: 'Explore the core feature pages behind the blog content.',
    href: '/salon-crm-features',
  },
  {
    title: 'Book a demo',
    desc: 'Talk through your salon goals and see Swalook in action.',
    href: '/book-demo',
  },
  {
    title: 'Start a trial',
    desc: 'Try the platform and see the workflows yourself.',
    href: '/free-trial',
  },
];

// ─── Re-export barrel for posts ──────────────────────────────────────────────
// blogPosts, getBlogPostBySlug, and getRelatedBlogPosts now live in index.js
export {
  allPosts as blogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from './index';
