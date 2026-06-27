import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://swalook.in';
const API_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

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
        slugs = items.map((p) => p.slug);
      }
    }
  } catch {
    // Fallback to known slugs
    slugs = [
      '7-key-factors-for-choosing-salon-crm-software',
      'why-salons-fall-behind-without-crm-software',
      'the-importance-of-integrated-marketing',
      'how-to-automate-your-salon-marketing-with-swalook',
    ];
  }

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
    { loc: '/privacy-policy', priority: '0.6', changefreq: 'yearly' },
    { loc: '/terms-conditions', priority: '0.6', changefreq: 'yearly' },
    { loc: '/shipping-policy', priority: '0.5', changefreq: 'yearly' },
    { loc: '/cancellation-policy', priority: '0.5', changefreq: 'yearly' },
  ];

  const blogUrls = slugs.map((slug) => ({
    loc: `/blog/${slug}`,
    priority: '0.7',
    changefreq: 'weekly',
  }));

  const allUrls = [...staticUrls, ...blogUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <priority>${u.priority}</priority>
    ${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ''}
  </url>`).join('\n')}
</urlset>`;

  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`Sitemap written to ${outPath} (${allUrls.length} URLs)`);
}

generateSitemap().catch(console.error);
