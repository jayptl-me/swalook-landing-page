import Image from 'next/image';
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
      <Image src={src} alt={data.alt || ''} width={800} height={450} className={styles.image} loading="lazy" unoptimized={true} />
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
  let html = data.html || "";
  if (!html) return null;
  // Sanitize HTML to prevent XSS — strip script tags, event handlers, and dangerous elements
  html = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\bon\w+\s*=/gi, 'data-stripped=')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, 'data-stripped:')
    .replace(/data:text\/html/gi, 'data-stripped:text/html');
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
      </div>
    );
  }

  if (provider === "instagram") {
    // Extract the Instagram post/permalink from the URL
    const instaUrl = url.replace(/\/+$/, "");
    return (
      <div key={key} className={styles.embedContainer}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={instaUrl}
          data-instgrm-version="14"
          style={{ background: "#FFF", border: 0, borderRadius: "3px", boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)", margin: "1px", maxWidth: "540px", minWidth: "326px", padding: 0, width: "calc(100% - 2px)" }}
        >
          <a href={instaUrl} target="_blank" rel="noopener noreferrer">
            View on Instagram
          </a>
        </blockquote>
        <script async src="//www.instagram.com/embed.js" />
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
