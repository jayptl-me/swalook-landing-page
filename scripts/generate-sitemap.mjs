import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://swalook.in';
const API_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

// Static data for when the API is unreachable
const STATIC_SLUGS = [
  { slug: '7-key-factors-for-choosing-salon-crm-software', date: '2026-07-01' },
  { slug: 'why-salons-fall-behind-without-crm-software', date: '2026-07-01' },
  { slug: 'the-importance-of-integrated-marketing', date: '2026-07-01' },
  { slug: 'how-to-automate-your-salon-marketing-with-swalook', date: '2026-07-01' },
  { slug: 'salon-crm-vs-excel', date: '2026-07-01' },
  { slug: 'how-to-reduce-salon-no-shows-india', date: '2026-07-01' },
  { slug: 'salon-billing-software-explained', date: '2026-07-01' },
  { slug: 'salon-marketing-guide-india', date: '2026-07-01' },
];

const staticUrls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/about', priority: '0.8', changefreq: 'monthly' },
  { loc: '/blogs', priority: '0.9', changefreq: 'weekly' },
  { loc: '/book-demo', priority: '0.9', changefreq: 'monthly' },
  { loc: '/free-trial', priority: '0.9', changefreq: 'monthly' },
  { loc: '/faq', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
  { loc: '/careers', priority: '0.5', changefreq: 'monthly' },
  { loc: '/mobile-app', priority: '0.6', changefreq: 'monthly' },
  { loc: '/crm', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-crm-features', priority: '0.9', changefreq: 'monthly' },
  { loc: '/salon-dashboard-software', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-appointment-scheduling-software', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-invoice-software', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-analytics-software', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-inquiry-management', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-inventory-management-software', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-staff-attendance-software', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-expense-management-software', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-loyalty-program-software', priority: '0.8', changefreq: 'monthly' },
  { loc: '/salon-marketing-templates', priority: '0.8', changefreq: 'monthly' },
  { loc: '/privacy-policy', priority: '0.6', changefreq: 'yearly' },
  { loc: '/terms-conditions', priority: '0.6', changefreq: 'yearly' },
  { loc: '/shipping-policy', priority: '0.5', changefreq: 'yearly' },
  { loc: '/cancellation-policy', priority: '0.5', changefreq: 'yearly' },
];

async function generateSitemap() {
  // Fetch blog slugs from API
  let slugs = [];
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${API_ROOT}/api/v1/public/blog/posts?limit=100`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        const items = Array.isArray(json.data) ? json.data : (json.data?.items || []);
        slugs = items.map((p) => ({ slug: p.slug, date: p.publishedAt || p.published_at || '' }));
      }
    }
  } catch {
    // Fallback to known slugs with dates
    slugs = STATIC_SLUGS;
  }

  // Blog URLs use /blog/ prefix
  const blogUrls = (slugs.length > 0 ? slugs : STATIC_SLUGS).map((entry) => ({
    loc: `/blog/${entry.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: entry.date || new Date().toISOString().split('T')[0],
  }));

  const allUrls = [...staticUrls, ...blogUrls];

  const urlElements = allUrls.map((u) => {
    let xml = '  <url>\n';
    xml += `    <loc>${SITE_URL}${u.loc}</loc>\n`;
    if (u.lastmod) xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    if (u.changefreq) xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += '  </url>';
    return xml;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements.join('\n')}
</urlset>`;

  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`Sitemap written to ${outPath} (${allUrls.length} URLs)`);
}

generateSitemap().catch(console.error);
