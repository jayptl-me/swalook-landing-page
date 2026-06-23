import { NextResponse } from 'next/server';

const BASE_URL = 'https://swalook.in';

export async function GET() {
  const body = `# robots.txt for swalook.in
# Last updated: June 23, 2026

User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /admin/
Disallow: /_next/
Disallow: /images/

# Crawl-delay: 10

Sitemap: ${BASE_URL}/sitemap.xml
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
