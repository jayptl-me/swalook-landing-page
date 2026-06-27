import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://swalook.in';
const API_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

function escapeXml(s) {
  if (!s) return '';
  return s
    .replace(/[&]/g, '&amp;')
    .replace(/[<]/g, '&lt;')
    .replace(/[>]/g, '&gt;')
    .replace(/["]/g, '&quot;')
    .replace(/[']/g, '&apos;');
}

async function generateFeed() {
  let posts = [];
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${API_ROOT}/api/v1/public/blog/posts?limit=50`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        posts = Array.isArray(json.data) ? json.data : (json.data?.items || []);
      }
    }
  } catch {
    // Fallback - empty feed
  }

  if (posts.length === 0) {
    // Static fallback when API is unreachable
    const fallback = [
      { title: '7 Key Factors When Choosing Salon CRM Software', slug: '7-key-factors-for-choosing-salon-crm-software', excerpt: 'A clean framework for comparing salon CRM tools based on retention, automation, reporting, and team workflow.', publishedAt: '2026-01-15' },
      { title: 'Why Salons Need CRM Software: Swalook Solutions', slug: 'why-salons-fall-behind-without-crm-software', excerpt: 'Understand why manual operations stall growth and how a CRM can create a more organized salon system.', publishedAt: '2026-01-10' },
      { title: 'Integrated Marketing for Salons with Swalook CRM', slug: 'the-importance-of-integrated-marketing', excerpt: 'See how retention marketing, offers, and audience segmentation work together.', publishedAt: '2026-01-07' },
      { title: 'How to Automate Your Salon Marketing with Swalook', slug: 'how-to-automate-your-salon-marketing-with-swalook', excerpt: 'A practical breakdown of automated campaigns and follow-ups.', publishedAt: '2026-01-02' },
    ];
    posts = fallback;
  }

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <description>${escapeXml(p.excerpt || '')}</description>
      <pubDate>${new Date(p.publishedAt || p.published_at || Date.now()).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Swalook Blog</title>
    <link>${SITE_URL}/blogs</link>
    <description>CRM, marketing, and growth insights for salon owners</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  const outPath = path.join(process.cwd(), 'public', 'feed.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`RSS feed written to ${outPath} (${posts.length} items)`);
}

generateFeed().catch(console.error);
