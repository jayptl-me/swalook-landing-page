import { countWords } from '@/lib/markdown';

export function generateArticleSchema(post, author) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? `https://swalook.in${post.coverImage}` : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: author?.name || 'Swalook Editorial',
      url: 'https://swalook.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Swalook',
      url: 'https://swalook.in',
    },
    url: `https://swalook.in/blogs/${post.slug}`,
    wordCount: post.content ? countWords(post.content) : undefined,
    articleSection: post.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://swalook.in/blogs/${post.slug}`,
    },
    about: post.category,
  };
}

export function generateBreadcrumbSchema(slug, title) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://swalook.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://swalook.in/blogs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `https://swalook.in/blogs/${slug}`,
      },
    ],
  };
}

export function generateBlogIndexSchema(posts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Swalook Blog',
    description: 'Practical CRM, marketing, and growth guidance for salon owners.',
    url: 'https://swalook.in/blogs',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `https://swalook.in/blogs/${post.slug}`,
    })),
  };
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
