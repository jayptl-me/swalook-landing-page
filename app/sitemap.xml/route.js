import { fetchPublishedPosts } from '@/lib/blog-public';

const SITE_URL = 'https://swalook.in';

export async function GET() {
    const today = new Date().toISOString().split('T')[0];
  const staticPages = ['/', '/blogs', '/salon-crm-features', '/book-demo', '/free-trial', '/faq', '/contact'];
  
  let blogSlugs = [];
  try {
    const result = await fetchPublishedPosts({ limit: 100 });
    if (result.posts) {
      blogSlugs = result.posts.map(p => p.slug);
    }
  } catch {}
  
  const urls = [
    ...staticPages.map(path => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`),
    ...blogSlugs.map(slug => `
  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`)
  ];
  
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
}
