import { getPostBySlug } from '@/lib/blog';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post | Swalook',
      description: 'Read the latest salon CRM insights from Swalook.',
    };
  }

  return {
    title: post.seo?.title || `${post.title} | Swalook Blog`,
    description: post.seo?.description || post.excerpt,
    openGraph: {
      title: post.seo?.title || `${post.title} | Swalook Blog`,
      description: post.seo?.description || post.excerpt,
      images: post.seo?.ogImage ? [{ url: post.seo.ogImage }] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
    },
    alternates: {
      canonical: `https://swalook.in/blogs/${post.slug}`,
    },
  };
}

export default function BlogPostLayout({ children }) {
  return children;
}
