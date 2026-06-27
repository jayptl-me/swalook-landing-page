const SITE_URL = 'https://swalook.in';

export default function BlogJsonLd({
  title,
  description,
  url,
  publishedAt,
  category,
  coverImage,
  updatedAt,
}) {
  const imageUrl = coverImage || `${SITE_URL}/swalook-logo.webp`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
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
        url: `${SITE_URL}/swalook-logo.webp`,
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

  // Use BlogPosting for richer structured data
  if (category) {
    jsonLd['@type'] = 'BlogPosting';
    jsonLd.articleSection = category;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
