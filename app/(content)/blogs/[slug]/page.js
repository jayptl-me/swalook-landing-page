import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getAuthor } from '@/lib/blog';
import { renderMarkdown, extractHeadings } from '@/lib/markdown';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/blog-schema';
import BlogPostLayout from '@/components/blog/BlogPostLayout';
import TableOfContents from '@/components/blog/TableOfContents';
import ReadingProgress from '@/components/blog/ReadingProgress';
import SocialShare from '@/components/blog/SocialShare';
import AuthorBio from '@/components/blog/AuthorBio';
import styles from './Post.module.css';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo?.title || `${post.title} | Swalook Blog`,
    description: post.seo?.description || post.excerpt,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      url: `https://swalook.in/blogs/${post.slug}`,
      images: post.coverImage ? [`https://swalook.in${post.coverImage}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      images: post.coverImage ? [`https://swalook.in${post.coverImage}`] : [],
    },
    alternates: {
      canonical: `https://swalook.in/blogs/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthor(post.author);
  const renderedContent = renderMarkdown(post.content);
  const headings = extractHeadings(post.content);

  const articleSchema = generateArticleSchema(post, author);
  const breadcrumbSchema = generateBreadcrumbSchema(post.slug, post.title);

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReadingProgress />

      <div className={styles.postWrapper}>
        <BlogPostLayout
          title={post.title}
          category={post.category}
          currentSlug={post.slug}
          readTime={post.readTime}
          publishedAt={post.publishedAt}
          author={author?.name || post.author}
          summary={post.summary}
          highlights={post.highlights}
          primaryCtaLabel={post.primaryCta?.label}
          primaryCtaHref={post.primaryCta?.href}
          secondaryCtaLabel={post.secondaryCta?.label}
          secondaryCtaHref={post.secondaryCta?.href}
        >
          {renderedContent}

          <AuthorBio author={author} />
          <SocialShare slug={post.slug} title={post.title} />
        </BlogPostLayout>

        <aside className={styles.tocSidebar}>
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </>
  );
}
