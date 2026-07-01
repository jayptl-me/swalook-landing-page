import styles from "./BlockRenderer.module.css";

function d(t) {
  if (!t) return "";
  return t
    .replace(/\x26amp;/g, "\x26")
    .replace(/\x26lt;/g, "\x3C")
    .replace(/\x26gt;/g, "\x3E")
    .replace(/\x26quot;/g, '\x22')
    .replace(/\x26#x27;/g, "'")
    .replace(/\x26#39;/g, "'")
    .replace(/\x26apos;/g, "'");
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
          case "cta": return renderCta(block.data, key);
          case "faq": return renderFaq(block.data, key);
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
      <img 
        src={src} 
        alt={data.alt || ""} 
        width={data.width || 800} 
        height={data.height || 450} 
        className={styles.image} 
        loading="lazy" 
        decoding="async" 
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

function renderCta(data, key) {
  return (
    <div key={key} className={styles.cta}>
      {data.title && <h3>{d(data.title)}</h3>}
      {data.text && <p>{d(data.text)}</p>}
      {data.buttonLabel && data.buttonHref && (
        <a href={d(data.buttonHref)} className={styles.ctaButton}>
          {d(data.buttonLabel)}
        </a>
      )}
    </div>
  );
}

function renderFaq(data, key) {
  return (
    <details key={key} className={styles.faq}>
      <summary>{d(data.question)}</summary>
      <p>{d(data.answer)}</p>
    </details>
  );
}
