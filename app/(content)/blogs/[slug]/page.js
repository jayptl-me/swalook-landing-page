import { notFound } from 'next/navigation';
import { getPublicPost } from '@/lib/blog-cms';
import { getPostBySlug, getAuthor, getAllPosts } from '@/lib/blog';
import { renderMarkdown, extractHeadings } from '@/lib/markdown';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/blog-schema';
import BlogPostLayout from '@/components/blog/BlogPostLayout';
import TableOfContents from '@/components/blog/TableOfContents';
import ReadingProgress from '@/components/blog/ReadingProgress';
import SocialShare from '@/components/blog/SocialShare';
import AuthorBio from '@/components/blog/AuthorBio';
import styles from './Post.module.css';

export const revalidate = 600; // ISR: revalidate every 10 minutes

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Try CMS API first, fall back to local JSON
  let post = null;
  try {
    post = await getPublicPost(slug);
  } catch {}
  if (!post) post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo?.title || post.seoTitle || `${post.title} | Swalook Blog`,
    description: post.seo?.description || post.seoDescription || post.excerpt || '',
    openGraph: {
      title: post.seo?.title || post.seoTitle || post.title,
      description: post.seo?.description || post.seoDescription || post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      url: `https://swalook.in/blogs/${post.slug}`,
      images: post.coverImage ? [`https://swalook.in${post.coverImage}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.title || post.seoTitle || post.title,
      description: post.seo?.description || post.seoDescription || post.excerpt || '',
      images: post.coverImage ? [`https://swalook.in${post.coverImage}`] : [],
    },
    alternates: {
      canonical: `https://swalook.in/blogs/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const localPosts = getAllPosts();
  return localPosts.map((post) => ({ slug: post.slug }));
}

function renderContentBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'heading':
        const Tag = `h${block.level}`;
        return <Tag key={idx}>{block.text}</Tag>;
      case 'paragraph':
        return <p key={idx}>{block.text}</p>;
      case 'list':
        return (
          <ul key={idx}>
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      case 'highlight':
        return (
          <div key={idx} className={styles.highlightBlock}>
            <strong>{block.label}:</strong> {block.text}
          </div>
        );
      default:
        return <p key={idx}>{block.text}</p>;
    }
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  // Try CMS API first, fall back to local JSON
  let post = null;
  try {
    post = await getPublicPost(slug);
  } catch {}
  if (!post) post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthor(post.author || post.authorSlug || 'swalook-editorial');

  // Render content: prefer contentBlocks from CMS, fall back to markdown
  let renderedContent;
  let headings = [];

  if (post.blocks && Array.isArray(post.blocks)) {
    // CMS contentBlocks — render directly
    renderedContent = renderContentBlocks(post.blocks);
    headings = post.blocks
      .filter((b) => b.type === 'heading')
      .map((b) => ({ id: b.text?.toLowerCase().replace(/\s+/g, '-'), text: b.text, level: b.level }));
  } else if (post.content) {
    // Local JSON with markdown content
    renderedContent = renderMarkdown(post.content);
    headings = extractHeadings(post.content);
  }

  const articleSchema = generateArticleSchema(post, author);
  const breadcrumbSchema = generateBreadcrumbSchema(post.slug, post.title);

  return (
    <>
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
          readTime={post.readTime || (post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : '5 min read')}
          publishedAt={post.publishedAt}
          author={author?.name || 'Swalook Editorial'}
          summary={post.summary || post.excerpt}
          highlights={post.highlights}
          primaryCtaLabel={post.primaryCta?.label || 'Explore CRM Features'}
          primaryCtaHref={post.primaryCta?.href || '/salon-crm-features'}
          secondaryCtaLabel={post.secondaryCta?.label || 'Book Free Demo'}
          secondaryCtaHref={post.secondaryCta?.href || '/book-demo'}
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
