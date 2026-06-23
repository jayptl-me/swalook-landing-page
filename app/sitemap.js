import { NextResponse } from 'next/server';

const BASE_URL = 'https://swalook.in';

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.7', changefreq: 'weekly' },
  { path: '/book-demo', priority: '0.9', changefreq: 'monthly' },
  { path: '/free-trial', priority: '0.9', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/careers', priority: '0.5', changefreq: 'monthly' },
  { path: '/mobile-app', priority: '0.6', changefreq: 'monthly' },
  { path: '/crm', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-crm-features', priority: '0.9', changefreq: 'monthly' },
  { path: '/salon-dashboard-software', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-appointment-scheduling-software', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-invoice-software', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-analytics-software', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-inquiry-management', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-inventory-management-software', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-staff-attendance-software', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-expense-management-software', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-loyalty-program-software', priority: '0.8', changefreq: 'monthly' },
  { path: '/salon-marketing-templates', priority: '0.8', changefreq: 'monthly' },
  // Legal & policy pages
  { path: '/privacy-policy', priority: '0.6', changefreq: 'yearly' },
  { path: '/terms-conditions', priority: '0.6', changefreq: 'yearly' },
  { path: '/shipping-policy', priority: '0.5', changefreq: 'yearly' },
  { path: '/cancellation-policy', priority: '0.5', changefreq: 'yearly' },
  // Blog articles
  { path: '/7-key-factors-for-choosing-salon-crm-software', priority: '0.6', changefreq: 'monthly' },
  { path: '/how-to-automate-your-salon-marketing-with-swalook', priority: '0.6', changefreq: 'monthly' },
  { path: '/the-importance-of-integrated-marketing', priority: '0.6', changefreq: 'monthly' },
  { path: '/why-salons-fall-behind-without-crm-software', priority: '0.6', changefreq: 'monthly' },
];

export async function GET() {
  const staticXml = staticRoutes
    .map(
      (route) =>
        `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
