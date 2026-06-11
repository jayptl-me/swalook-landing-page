"use client";

import Image from "next/image";
import styles from "./BlogBlockRenderer.module.css";

/**
 * BlogBlockRenderer
 *
 * Renders CMS-authored content blocks for blog articles.
 * Each block has a `type` discriminator and structured `data`.
 *
 * Supported block types:
 *   heading, paragraph, list, quote, callout, image, code, divider, cta, faq, embed
 *
 * Unknown blocks are silently skipped.
 */
export default function BlogBlockRenderer({ blocks = [] }) {
    if (!blocks || blocks.length === 0) {
        return null;
    }

    return (
        <div className={styles.blockRenderer}>
            {blocks.map((block) => {
                if (!block || !block.type) return null;
                return <Block key={block.id || block._id} block={block} />;
            })}
        </div>
    );
}

function Block({ block }) {
    const { type, data = {} } = block;

    switch (type) {
        case "heading":
            return <HeadingBlock data={data} />;
        case "paragraph":
        case "richText":
        case "text":
            return <ParagraphBlock data={data} />;
        case "list":
            return <ListBlock data={data} />;
        case "quote":
            return <QuoteBlock data={data} />;
        case "image":
            return <ImageBlock data={data} />;
        case "callout":
            return <CalloutBlock data={data} />;
        case "code":
            return <CodeBlock data={data} />;
        case "divider":
            return <hr className={styles.divider} />;
        case "cta":
            return <CtaBlock data={data} />;
        case "embed":
            return <EmbedBlock data={data} />;
        case "table":
            return <TableBlock data={data} />;
        case "video":
            return <VideoBlock data={data} />;
        default:
            // Unknown block types are silently skipped in production
            return null;
    }
}

// ─── Heading ────────────────────────────────────────────────────────────────

function HeadingBlock({ data }) {
    const level = Math.min(Math.max(Number(data.level) || 2, 2), 4);
    const Tag = `h${level}`;
    const cls =
        level === 2 ? styles.h2 : level === 3 ? styles.h3 : styles.h4;

    return <Tag className={cls}>{data.text || ""}</Tag>;
}

// ─── Paragraph ──────────────────────────────────────────────────────────────

function ParagraphBlock({ data }) {
    const text = data.text || data.content || "";
    const align = data.align;

    return (
        <p
            className={styles.paragraph}
            style={align ? { textAlign: align } : undefined}
        >
            {text}
        </p>
    );
}

// ─── List ────────────────────────────────────────────────────────────────────

function ListBlock({ data }) {
    const items = Array.isArray(data.items) ? data.items : data.items ? [data.items] : [];
    const style = data.style || "unordered";
    const ListEl = style === "ordered" ? "ol" : "ul";

    if (items.length === 0) return null;

    return (
        <ListEl className={style === "ordered" ? styles.orderedList : styles.list}>
            {items.map((item, i) => (
                <li key={i} className={styles.listItem}>
                    {typeof item === "string" ? item : item.text || item.content || ""}
                </li>
            ))}
        </ListEl>
    );
}

// ─── Quote ──────────────────────────────────────────────────────────────────

function QuoteBlock({ data }) {
    return (
        <blockquote className={styles.quote}>
            <p className={styles.quoteText}>{data.text || ""}</p>
            {data.cite && (
                <cite className={styles.quoteCite}>— {data.cite}</cite>
            )}
        </blockquote>
    );
}

// ─── Callout ────────────────────────────────────────────────────────────────

function CalloutBlock({ data }) {
    const variant = data.variant || "info";
    const cls =
        variant === "warning"
            ? `${styles.calloutWarning}`
            : variant === "success"
            ? `${styles.calloutSuccess}`
            : `${styles.calloutInfo}`;

    return (
        <div className={`${styles.callout} ${cls}`}>
            {data.title && <strong className={styles.calloutTitle}>{data.title}</strong>}
            <p className={styles.calloutText}>{data.text || ""}</p>
        </div>
    );
}

// ─── Image ──────────────────────────────────────────────────────────────────

function ImageBlock({ data }) {
    const src = data.src || data.url || "";
    const alt = data.alt || data.altText || "";
    const caption = data.caption || "";

    if (!src) return null;

    return (
        <figure className={styles.imageFigure}>
            <div className={styles.imageWrapper}>
                <Image
                    src={src}
                    alt={alt}
                    width={data.width || 800}
                    height={data.height || 450}
                    className={styles.image}
                    loading="lazy"
                />
            </div>
            {caption && <figcaption className={styles.imageCaption}>{caption}</figcaption>}
        </figure>
    );
}

// ─── Code ────────────────────────────────────────────────────────────────────

function CodeBlock({ data }) {
    return (
        <div className={styles.codeBlock}>
            {data.language && (
                <div className={styles.codeLang}>{data.language}</div>
            )}
            <pre className={styles.codePre}>
                <code>{data.code || ""}</code>
            </pre>
        </div>
    );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CtaBlock({ data }) {
    return (
        <div className={styles.ctaBlock}>
            {data.title && <h3 className={styles.ctaTitle}>{data.title}</h3>}
            <p className={styles.ctaText}>{data.text || ""}</p>
            {data.buttonLabel && data.buttonHref && (
                <a
                    href={data.buttonHref}
                    className={`btn btn-primary btn-sm ${styles.ctaButton}`}
                    target={data.buttonHref.startsWith("http") ? "_blank" : undefined}
                    rel={data.buttonHref.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                    {data.buttonLabel}
                </a>
            )}
        </div>
    );
}

// ─── Embed ──────────────────────────────────────────────────────────────────

function EmbedBlock({ data }) {
    const provider = data.provider || data.source || "";
    const url = data.url || "";

    // Only allowlisted providers render
    if (provider === "youtube" || url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = extractYouTubeId(url);
        if (!videoId) return <FallbackEmbed url={url} />;
        return (
            <div className={styles.embedWrapper}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={data.title || "YouTube video"}
                    className={styles.embedIframe}
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        );
    }

    // Fallback for unknown providers — just show a link
    return <FallbackEmbed url={url} provider={provider} />;
}

function extractYouTubeId(url) {
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtube.com")) {
            return u.searchParams.get("v");
        }
        if (u.hostname.includes("youtu.be")) {
            return u.pathname.slice(1);
        }
    } catch {
        // Not a valid URL — try regex
        const match = url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? match[1] : null;
    }
    return null;
}

function FallbackEmbed({ url, provider }) {
    return (
        <div className={styles.embedFallback}>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.embedLink}
            >
                {provider ? `Open ${provider} content` : "Open external content"} ↗
            </a>
        </div>
    );
}

// ─── Video ──────────────────────────────────────────────────────────────────

function VideoBlock({ data }) {
    const src = data.src || data.url || "";
    return (
        <div className={styles.videoWrapper}>
            <video src={src} controls className={styles.video} />
        </div>
    );
}

// ─── Table ──────────────────────────────────────────────────────────────────

function TableBlock({ data }) {
    const headers = data.headers || [];
    const rows = data.rows || [];

    if (rows.length === 0) return null;

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                {headers.length > 0 && (
                    <thead>
                        <tr>
                            {headers.map((h, i) => (
                                <th key={i} className={styles.th}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {rows.map((row, ri) => (
                        <tr key={ri}>
                            {(Array.isArray(row) ? row : Object.values(row)).map(
                                (cell, ci) => (
                                    <td key={ci} className={styles.td}>
                                        {cell}
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
