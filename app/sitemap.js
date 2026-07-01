export const dynamic = 'force-static';

const BASE_URL = 'https://swalook.in';

const featurePages = [
  { path: '/salon-crm-features', priority: '0.9', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-dashboard-software', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-appointment-scheduling-software', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-invoice-software', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-analytics-software', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-inquiry-management', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-inventory-management-software', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-staff-attendance-software', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-expense-management-software', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-loyalty-program-software', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/salon-marketing-templates', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
];

const corePages = [
  { path: '', priority: '1.0', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/about', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-15' },
  { path: '/blogs', priority: '0.9', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/book-demo', priority: '0.9', changefreq: 'monthly', lastModified: '2026-06-15' },
  { path: '/free-trial', priority: '0.9', changefreq: 'monthly', lastModified: '2026-06-15' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/careers', priority: '0.5', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/mobile-app', priority: '0.6', changefreq: 'monthly', lastModified: '2026-06-01' },
  { path: '/crm', priority: '0.8', changefreq: 'monthly', lastModified: '2026-06-01' },
];

const legalPages = [
  { path: '/privacy-policy', priority: '0.6', changefreq: 'yearly', lastModified: '2026-01-01' },
  { path: '/terms-conditions', priority: '0.6', changefreq: 'yearly', lastModified: '2026-01-01' },
  { path: '/shipping-policy', priority: '0.5', changefreq: 'yearly', lastModified: '2026-01-01' },
  { path: '/cancellation-policy', priority: '0.5', changefreq: 'yearly', lastModified: '2026-01-01' },
];

const blogPosts = [
  { path: '/blog/7-key-factors-for-choosing-salon-crm-software', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/why-salons-fall-behind-without-crm-software', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/the-importance-of-integrated-marketing', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/how-to-automate-your-salon-marketing-with-swalook', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/salon-crm-vs-excel', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/how-to-reduce-salon-no-shows-india', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/salon-billing-software-explained', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/salon-marketing-guide-india', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  // Future blog topics (pre-register in sitemap for indexing velocity)
  { path: '/blog/salon-loyalty-program-guide-india', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
  { path: '/blog/salon-whatsapp-marketing-strategies', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
  { path: '/blog/salon-inventory-management-best-practices', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
  { path: '/blog/salon-employee-management-and-retention', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
  { path: '/blog/salon-expense-tracking-profitability-guide', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
  { path: '/blog/salon-online-booking-benefits-guide', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
  { path: '/blog/salon-gst-compliance-billing-guide', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
  { path: '/blog/salon-client-retention-strategies', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
  { path: '/blog/salon-analytics-kpi-tracking', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
  { path: '/blog/salon-multi-branch-management-software', priority: '0.7', changefreq: 'weekly', lastModified: '2026-06-01' },
];

const staticRoutes = [...corePages, ...featurePages, ...legalPages, ...blogPosts];

export default async function sitemap() {
  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: route.lastModified ? new Date(route.lastModified) : new Date(),
    changeFrequency: route.changefreq,
    priority: parseFloat(route.priority),
  }));
}
