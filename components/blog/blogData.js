export const blogCategories = [
  { label: 'All Posts', slug: 'all-posts' },
  { label: 'Salon CRM & Software Guide', slug: 'salon-crm-software-guide' },
  { label: 'CRM Benefits for Salons', slug: 'crm-benefits-for-salons' },
  { label: 'Salon Marketing & Engagement', slug: 'salon-marketing-engagement' },
  { label: 'Marketing Automation Tools', slug: 'marketing-automation-tools' },
];

export const blogPosts = [
  {
    title: '7 Key Factors When Choosing Salon CRM Software',
    slug: '7-key-factors-for-choosing-salon-crm-software',
    href: '/7-key-factors-for-choosing-salon-crm-software',
    category: 'Salon CRM & Software Guide',
    excerpt:
      'A clean framework for comparing salon CRM tools based on retention, automation, reporting, and team workflow.',
    readTime: '6 min read',
    publishedAt: '2026-01-15',
    author: 'Swalook Editorial',
    eyebrow: 'Featured guide',
    accent: 'Emerald',
    icon: 'Key',
  },
  {
    title: 'Why Salons Need CRM Software: Swalook Solutions',
    slug: 'why-salons-fall-behind-without-crm-software',
    href: '/why-salons-fall-behind-without-crm-software',
    category: 'CRM Benefits for Salons',
    excerpt:
      'Understand why manual operations stall growth and how a CRM can create a more organized, repeatable salon system.',
    readTime: '5 min read',
    publishedAt: '2026-01-10',
    author: 'Swalook Editorial',
    eyebrow: 'Operational clarity',
    accent: 'Amber',
    icon: 'Spark',
  },
  {
    title: 'Integrated Marketing for Salons with Swalook CRM',
    slug: 'the-importance-of-integrated-marketing',
    href: '/the-importance-of-integrated-marketing',
    category: 'Salon Marketing & Engagement',
    excerpt:
      'See how retention marketing, offers, and audience segmentation work together to improve repeat business.',
    readTime: '7 min read',
    publishedAt: '2026-01-07',
    author: 'Swalook Editorial',
    eyebrow: 'Campaign strategy',
    accent: 'Cyan',
    icon: 'Target',
  },
  {
    title: 'How to Automate Your Salon Marketing with Swalook',
    slug: 'how-to-automate-your-salon-marketing-with-swalook',
    href: '/how-to-automate-your-salon-marketing-with-swalook',
    category: 'Marketing Automation Tools',
    excerpt:
      'A practical breakdown of automated campaigns, follow-ups, and reminders that save time and improve conversions.',
    readTime: '6 min read',
    publishedAt: '2026-01-02',
    author: 'Swalook Editorial',
    eyebrow: 'Automation playbook',
    accent: 'Violet',
    icon: 'Bolt',
  },
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

export const blogArticleMap = blogPosts.reduce((map, post) => {
  map[post.slug] = post;
  return map;
}, {});

export function getBlogPostBySlug(slug) {
  return blogArticleMap[slug] || null;
}

export function getRelatedBlogPosts(currentSlug) {
  return blogPosts.filter((post) => post.slug !== currentSlug);
}
