'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import BlogBreadcrumb from '@/components/blog/BlogBreadcrumb';
import BlogMeta from '@/components/blog/BlogMeta';
import { getRelatedBlogPosts } from '@/components/blog/blogData';
import { fetchPublishedPosts } from '@/lib/blog-public';
import styles from './BlogPost.module.css';

const API_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

export default function BlogPostLayout({
  title,
  category,
  children,
  currentSlug,
  readTime = '6 min read',
  publishedAt = '2026-01-01',
  author = 'Swalook Editorial',
}) {
  const [relatedPosts, setRelatedPosts] = useState(null);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const viewRecorded = useRef(false);

  // Fetch related posts from API first, fall back to static data
  useEffect(() => {
    let cancelled = false;
    async function loadRelated() {
      setRelatedLoading(true);
      try {
        if (category) {
          const result = await fetchPublishedPosts({ category: category.toLowerCase().replace(/\s+/g, '-'), limit: 4 });
          if (cancelled) return;
          if (result.posts && result.posts.length > 0) {
            const filtered = result.posts
              .filter((p) => p.slug !== currentSlug)
              .slice(0, 3);
            setRelatedPosts(
              filtered.map((p) => ({
                slug: p.slug,
                title: p.title,
                href: `/blog/${p.slug}`,
              }))
            );
            setRelatedLoading(false);
            return;
          }
        }
      } catch {
        // Fall through to static data
      }
      if (!cancelled) {
        // Fall back to static blogData
        setRelatedPosts(getRelatedBlogPosts(currentSlug));
        setRelatedLoading(false);
      }
    }
    loadRelated();
    return () => { cancelled = true; };
  }, [category, currentSlug]);

  // Use static data while loading or if API fails
  const displayRelatedPosts = relatedPosts || getRelatedBlogPosts(currentSlug);

  // Record a blog view once when the post first renders
  useEffect(() => {
    if (viewRecorded.current) return;
    viewRecorded.current = true;

    // Create a privacy-safe visitor key using a hash of session data
    const rawKey = [navigator.language || 'en', screen.width || 0].join('|');
    const visitorKey = Array.from(
      new TextEncoder().encode(rawKey)
    ).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);

    fetch(`${API_ROOT}/api/v1/public/blog/posts/${encodeURIComponent(currentSlug)}/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorKey,
        referrer: document.referrer?.slice(0, 1000) || null,
      }),
    }).catch(() => {
      // Silently ignore — view tracking is non-critical
    });
  }, [currentSlug]);

  return (
    <article className={styles.post}>
      <div className={styles.container}>
        <div className={styles.content}>
          <BlogBreadcrumb title={title} />

          <header className={styles.header}>
            <BlogMeta
              category={category}
              readTime={readTime}
              author={author}
              publishedAt={publishedAt}
            />
            <h1 className={styles.title}>{title}</h1>
          </header>

          <div className={styles.body}>{children}</div>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.sidebarCard}>
            <span className={styles.sidebarEyebrow}>About Swalook</span>
            <h2>Built for salon growth</h2>
            <p>
              Swalook helps salons improve retention, simplify operations, and turn everyday workflows into
              more repeat revenue.
            </p>
          </section>

          <section className={styles.sidebarCard}>
            <span className={styles.sidebarEyebrow}>Related posts</span>
            <h3>Continue reading</h3>
            <div className={styles.relatedList}>
              {displayRelatedPosts.map((post) => (
                <Link key={post.slug} href={post.href} className={styles.relatedLink}>
                  <span>{post.title}</span>
                  <FiArrowRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.sidebarCard}>
            <span className={styles.sidebarEyebrow}>Next step</span>
            <h3>See the product in action</h3>
            <p>Book a demo or start a trial to explore the workflows behind these insights.</p>
            <div className={styles.actionStack}>
              <Link href="/book-demo" className="btn btn-primary btn-sm">
                Book Free Demo <FiArrowRight />
              </Link>
              <Link href="/free-trial" className="btn btn-outline btn-sm">
                Start Free Trial
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
</content>

<write_to_file>
<path>current/swalook-landing-page/components/blog/BlockRenderer.js</path>
<content>import Image from 'next/image';
import styles from "./BlockRenderer.module.css";

function d(t) {
  if (!t) return "";
  return t;
}

function extractVideoId(url, platform) {
  if (platform === "youtube") {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
    );
    return match ? match[1] : url;
  }
  if (platform === "vimeo") {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : url;
  }
  return url;
}

export default function BlockRenderer({ blocks }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <div className={styles.renderer}>
      {blocks.map((block, index) => {
        const key = block.id || `block-${index}`;
        switch (block.type) {
          case "heading": return renderHeading(block.data, key);
          case "paragraph": return renderParagraph(block.data, key);
          case "list": return renderList(block.data, key);
          case "quote": return renderQuote(block.data, key);
          case "callout": return renderCallout(block.data, key);
          case "image": return renderImage(block.data, key);
          case "code": return renderCode(block.data, key);
          case "divider": return <hr key={key} className={styles.divider} />;
          case "highlight": return renderHighlight(block.data, key);
          case "richText": return renderRichText(block.data, key);
          case "cta": return renderCta(block.data, key);
          case "faq": return renderFaq(block.data, key);
          case "embed": return renderEmbed(block.data, key);
          case "video": return renderVideo(block.data, key);
          default: return null;
        }
      })}
    </div>
  );
}

function renderHeading(data, key) {
  const level = data.level || 2;
  const text = d(data.text);
  if (level === 2) return <h2 key={key} className={styles.h2}>{text}</h2>;
  if (level === 3) return <h3 key={key} className={styles.h3}>{text}</h3>;
  return <h4 key={key} className={styles.h4}>{text}</h4>;
}

function renderParagraph(data, key) {
  return <p key={key} className={styles.paragraph}>{d(data.text)}</p>;
}

function renderList(data, key) {
  const items = data.items || [];
  const style = data.style || "unordered";
  if (items.length === 0) return null;
  const listItems = items.map((item, i) => (
    <li key={i} className={styles.listItem}>{d(item)}</li>
  ));
  if (style === "ordered") return <ol key={key} className={styles.orderedList}>{listItems}</ol>;
  return <ul key={key} className={styles.unorderedList}>{listItems}</ul>;
}

function renderQuote(data, key) {
  return (
    <blockquote key={key} className={styles.quote}>
      <p className={styles.quoteText}>{d(data.text)}</p>
      {data.cite && <cite className={styles.quoteCite}>{d(data.cite)}</cite>}
    </blockquote>
  );
}

function renderCallout(data, key) {
  const variant = data.variant || "info";
  return (
    <div key={key} className={`${styles.callout} ${styles[`callout--${variant}`] || ""}`}>
      {data.title && <strong className={styles.calloutTitle}>{d(data.title)}</strong>}
      {data.text && <p className={styles.calloutText}>{d(data.text)}</p>}
    </div>
  );
}

function renderImage(data, key) {
  const src = data.src || "";
  if (!src) return null;
  return (
    <figure key={key} className={styles.imageFigure}>
      <Image
        src={src}
        alt={data.alt || ""}
        width={800}
        height={450}
        className={styles.image}
        loading="lazy"
        unoptimized={true}
      />
      {data.caption && <figcaption className={styles.imageCaption}>{d(data.caption)}</figcaption>}
    </figure>
  );
}

function renderCode(data, key) {
  return (
    <pre key={key} className={styles.codeBlock}>
      {data.language && <span className={styles.codeLanguage}>{data.language}</span>}
      <code className={styles.code}>{data.code || ""}</code>
    </pre>
  );
}

function renderHighlight(data, key) {
  const label = d(data.label || "");
  const text = d(data.text || "");
  if (!label) return <p key={key} className={styles.paragraph}>{text}</p>;
  return (
    <p key={key} className={styles.highlight}>
      <strong className={styles.highlightLabel}>{label}</strong>
      {text && ` ${text}`}
    </p>
  );
}

function renderRichText(data, key) {
  const html = data.html || "";
  if (!html) return null;
  return (
    <div key={key} className={styles.richText} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function renderCta(data, key) {
  const heading = d(data.heading || "");
  const description = d(data.description || "");
  const buttonLabel = d(data.buttonLabel || "Get Started");
  const buttonUrl = data.buttonUrl || "";
  const variant = data.variant || "primary";

  if (!heading && !description) return null;

  return (
    <div key={key} className={`${styles.cta} ${styles[`cta--${variant}`] || ""}`}>
      {heading && <h3 className={styles.ctaHeading}>{heading}</h3>}
      {description && <p className={styles.ctaDescription}>{description}</p>}
      {buttonUrl && (
        <a href={buttonUrl} className={`${styles.ctaButton} ${styles[`ctaButton--${variant}`] || ""}`}>
          {buttonLabel}
        </a>
      )}
    </div>
  );
}

function renderFaq(data, key) {
  const items = data.items || [];
  if (!Array.isArray(items) || items.length === 0) return null;
  const hasContent = items.some((item) => item.question || item.answer);
  if (!hasContent) return null;

  return (
    <div key={key} className={styles.faq}>
      {items.map((item, i) => (
        <details key={i} className={styles.faqItem}>
          <summary className={styles.faqQuestion}>{d(item.question || "")}</summary>
          <div className={styles.faqAnswer}>
            <p>{d(item.answer || "")}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

function renderEmbed(data, key) {
  const url = data.url || "";
  if (!url) return null;
  const provider = data.provider || "generic";

  if (provider === "youtube" || provider === "vimeo") {
    const videoId = extractVideoId(url, provider);
    const embedUrl = provider === "youtube"
      ? `https://www.youtube.com/embed/${videoId}`
      : `https://player.vimeo.com/video/${videoId}`;
    return (
      <div key={key} className={styles.embedContainer}>
        <iframe
          src={embedUrl}
          title="Embedded content"
          className={styles.embedIframe}
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (provider === "twitter") {
    return (
      <div key={key} className={styles.embedContainer}>
        <blockquote className="twitter-tweet" data-dnt="true">
          <a href={url}>View on X</a>
        </blockquote>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
      </div>
    );
  }

  // Generic embed as a link card
  return (
    <div key={key} className={styles.embedLinkCard}>
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.embedLink}>
        <span className={styles.embedLinkIcon}>🔗</span>
        <span className={styles.embedLinkUrl}>{url}</span>
      </a>
    </div>
  );
}

function renderVideo(data, key) {
  const src = data.src || "";
  const caption = data.caption || "";
  const platform = data.platform || "youtube";

  if (!src) return null;

  let embedUrl = src;
  if (platform === "youtube") {
    const videoId = extractVideoId(src, "youtube");
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (platform === "vimeo") {
    const videoId = extractVideoId(src, "vimeo");
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  }

  return (
    <figure key={key} className={styles.videoFigure}>
      <div className={styles.videoContainer}>
        <iframe
          src={embedUrl}
          title={caption || "Video"}
          className={styles.videoIframe}
          allowFullScreen
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      {caption && <figcaption className={styles.videoCaption}>{d(caption)}</figcaption>}
    </figure>
  );
}
