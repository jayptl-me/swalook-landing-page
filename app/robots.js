const BASE_URL = 'https://swalook.in';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/blog/', '/images/'],
        disallow: ['/api/', '/dashboard/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/blog/', '/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: ['/blog/'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: ['/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    additionalSitemaps: [],
    host: BASE_URL,
  };
}
