import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://swalook.in';

const STATIC_ROUTES = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/book-demo', changefreq: 'weekly', priority: 0.9 },
  { url: '/free-trial', changefreq: 'weekly', priority: 0.9 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/faq', changefreq: 'monthly', priority: 0.6 },
  { url: '/careers', changefreq: 'monthly', priority: 0.5 },
  { url: '/mobile-app', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms-conditions', changefreq: 'yearly', priority: 0.3 },
  { url: '/cancellation-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/shipping-policy', changefreq: 'yearly', priority: 0.3 },

  // Product pages
  { url: '/salon-crm-features', changefreq: 'monthly', priority: 0.8 },
  { url: '/salon-appointment-scheduling-software', changefreq: 'monthly', priority: 0.8 },
  { url: '/salon-inventory-management-software', changefreq: 'monthly', priority: 0.7 },
  { url: '/salon-invoice-software', changefreq: 'monthly', priority: 0.7 },
  { url: '/salon-loyalty-program-software', changefreq: 'monthly', priority: 0.7 },
  { url: '/salon-staff-attendance-software', changefreq: 'monthly', priority: 0.7 },
  { url: '/salon-expense-management-software', changefreq: 'monthly', priority: 0.7 },
  { url: '/salon-analytics-software', changefreq: 'monthly', priority: 0.7 },
  { url: '/salon-dashboard-software', changefreq: 'monthly', priority: 0.7 },
  { url: '/salon-marketing-templates', changefreq: 'monthly', priority: 0.7 },
  { url: '/salon-inquiry-management', changefreq: 'monthly', priority: 0.7 },

  // Blog index
  { url: '/blogs', changefreq: 'weekly', priority: 0.9 },
];

export default async function sitemap() {
  const posts = getAllPosts();

  const blogRoutes = posts.map((post) => ({
    url: `/blogs/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  return [...staticRoutes, ...blogRoutes];
}
