import { fetchPublishedPosts } from '@/lib/blog-public';

const SITE_URL = 'https://swalook.in';

export async function GET() {
  let posts = [];
  try {
    const result = await fetchPublishedPosts({ limit: 50 });
    posts = result.posts || [];
  } catch {}
  
  const items = posts.map(post => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${SITE_URL}/blog/${post.slug}</link>
    <description><![CDATA[${post.excerpt || ''}]]></description>
    <pubDate>${new Date(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
    <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
  </item>`).join('\n');
  
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Swalook Blog</title>
  <link>${SITE_URL}/blogs</link>
  <description>Salon CRM, marketing, and growth insights from Swalook</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`,
    {
      headers: {
        'Content-Type': 'application/rss+xml',
      },
    }
  );
}