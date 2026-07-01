import { notFound } from 'next/navigation';
import BlogPostLayout from '@/components/BlogPostLayout';
import BlogJsonLd from '@/components/blog/BlogJsonLd';
import BlockRenderer from '@/components/blog/BlockRenderer';
import { fetchPublishedPosts, fetchPostBySlug } from '@/lib/blog-public';

const SITE_URL = 'https://swalook.in';

function normalizeContentBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks.map((block) => {
    if (!block || !block.type) return null;
    // Already in {type, data: {...}} format
    if (block.data && typeof block.data === 'object') {
      return { id: block.id || `block-${Math.random().toString(36).slice(2, 8)}`, ...block };
    }
    const base = { id: block.id || `block-${Math.random().toString(36).slice(2, 8)}` };
    switch (block.type) {
      case 'heading':
        return { ...base, type: 'heading', data: { level: block.level || 2, text: block.text || '' } };
      case 'paragraph':
        return { ...base, type: 'paragraph', data: { text: block.text || '' } };
      case 'list':
        return { ...base, type: 'list', data: { style: block.style || 'unordered', items: block.items || [] } };
      case 'quote':
        return { ...base, type: 'quote', data: { text: block.text || '', cite: block.cite || '' } };
      case 'callout':
        return { ...base, type: 'callout', data: { variant: block.variant || 'info', title: block.title || '', text: block.text || '' } };
      case 'image':
        return { ...base, type: 'image', data: { src: block.src || '', alt: block.alt || '', caption: block.caption || '' } };
      case 'code':
        return { ...base, type: 'code', data: { code: block.code || '', language: block.language || '' } };
      case 'divider':
        return { ...base, type: 'divider', data: {} };
      case 'highlight':
        return { ...base, type: 'highlight', data: { label: block.label || '', text: block.text || '' } };
      default:
        return { ...base, type: block.type, data: block.data || { text: block.text || '' } };
    }
  }).filter(Boolean);
}

function contentTypeToOgType(contentType) {
  const map = {
    article: 'article',
    guide: 'article',
    announcement: 'article',
    case_study: 'article',
    faq: 'article',
    other: 'article',
  };
  return map[contentType] || 'article';
}

async function getPost(slug) {
  let post = null;

  // Try API first
  try {
    const result = await fetchPostBySlug(slug);
    // If API was reached and returned null (404), do NOT fall back to static data.
    // The post legitimately doesn't exist (deleted, unpublished, never created).
    // Only fall back to static data if the API was unreachable (network error).
    if (!result.post && !result.apiReached) {
      const { getBlogPostBySlug } = await import('@/components/blog/blogData');
      post = getBlogPostBySlug(slug);
    } else {
      post = result.post;
    }
  } catch {
    // Fetch threw unexpectedly — fall back to static data
    const { getBlogPostBySlug } = await import('@/components/blog/blogData');
    post = getBlogPostBySlug(slug);
  }

  if (post) {
    post.contentBlocks = normalizeContentBlocks(post.contentBlocks);
  }

  return post;
}

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function generateStaticParams() {
  const slugs = new Set();

  // 1. Try API-published posts
  try {
    const { posts } = await fetchPublishedPosts({ limit: 100 });
    if (posts && posts.length > 0) {
      for (const p of posts) {
        if (p.slug) slugs.add(p.slug);
      }
    }
  } catch {
    // API unavailable — continue to static fallback
  }

  // 2. Merge with static fallback data (ensures build-time coverage
  //    even when API is down or hasn't been seeded yet)
  try {
    const { blogPosts } = await import('@/components/blog/blogData');
    for (const p of blogPosts) {
      if (p.slug) slugs.add(p.slug);
    }
  } catch {
    // No static fallback data — use whatever we got from API
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seoTitle || post.seo_title || post.title;
  const description = post.seoDescription || post.seo_description || post.excerpt || '';
  const canonical = post.canonicalUrl || post.canonical_url || `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.ogImage || post.og_image || '/swalook-logo.webp';
  const ogType = contentTypeToOgType(post.contentType);

  return {
    title,
    description,
    alternates: { canonical, languages: { 'en-IN': canonical } },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: ogType,
      publishedTime: post.publishedAt || post.published_at,
      modifiedTime: post.updatedAt || post.updated_at,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const title = post.title;
  const excerpt = post.excerpt || '';
  const publishedAt = post.publishedAt || post.published_at || post.createdAt || '';
  const author = post.author?.name || post.author || 'Swalook Editorial';
  const readTime = post.readTime || (post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '6 min read');
  const category = post.category || (post.categories && post.categories[0]?.name) || '';
  const contentBlocks = post.contentBlocks || [];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://swalook.in' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://swalook.in/blogs' },
      { '@type': 'ListItem', position: 3, name: title, item: `https://swalook.in/blog/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogJsonLd
        title={title}
        description={excerpt}
        url={`${SITE_URL}/blog/${slug}`}
        publishedAt={publishedAt}
        updatedAt={post.updatedAt || post.updated_at}
        category={category}
        coverImage={post.ogImage || post.og_image || post.coverImage}
      />
      <BlogPostLayout
        title={title}
        category={category}
        currentSlug={slug}
        readTime={readTime}
        publishedAt={publishedAt}
        author={author}
      >
        <BlockRenderer blocks={contentBlocks} />
      </BlogPostLayout>
    </>
  );
}
