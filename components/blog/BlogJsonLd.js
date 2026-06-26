const SITE_URL = 'https://swalook.in';

export default function BlogJsonLd({ title, description, url, publishedAt, category }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: `${SITE_URL}/og-default.svg`,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Swalook',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Swalook',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-default.svg`,
      },
    },
    about: {
      '@type': 'Thing',
      name: category,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
