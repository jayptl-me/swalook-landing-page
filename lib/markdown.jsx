import React from 'react';
import Link from 'next/link';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseInline(text) {
  const combinedRegex = /(`[^`]+`|\*\*.+?\*\*|\*.+?\*|\[[^\]]+\]\([^)]+\))/g;
  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const matched = match[1];

    if (matched.startsWith('`') && matched.endsWith('`')) {
      nodes.push(
        <code key={key++} className="inline-code">
          {matched.slice(1, -1)}
        </code>
      );
    } else if (matched.startsWith('**') && matched.endsWith('**')) {
      nodes.push(<strong key={key++}>{parseInline(matched.slice(2, -2))}</strong>);
    } else if (matched.startsWith('*') && matched.endsWith('*') && matched.length > 2) {
      nodes.push(<em key={key++}>{parseInline(matched.slice(1, -1))}</em>);
    } else {
      const linkMatch = matched.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const linkText = linkMatch[1];
        const href = linkMatch[2];
        if (href.startsWith('/') || href.startsWith('#')) {
          nodes.push(
            <Link key={key++} href={href}>
              {parseInline(linkText)}
            </Link>
          );
        } else {
          nodes.push(
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
              {parseInline(linkText)}
            </a>
          );
        }
      } else {
        nodes.push(matched);
      }
    }

    lastIndex = match.index + matched.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
}

function classifyBlock(line) {
  if (!line.trim()) return { type: 'empty' };

  // Image figure: > ![alt](url)
  const figureMatch = line.match(/^>\s*!\[([^\]]*)\]\(([^)]+)\)\s*$/);
  if (figureMatch) {
    return { type: 'image-figure', items: [figureMatch[1], figureMatch[2]] };
  }

  // Heading
  const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
  if (headingMatch) {
    return { type: 'heading', content: headingMatch[2], level: headingMatch[1].length };
  }

  // Unordered list
  if (/^[-*+]\s+/.test(line)) {
    return { type: 'list-item', content: line.replace(/^[-*+]\s+/, '') };
  }

  // Ordered list
  const orderedMatch = line.match(/^\d+[.)]\s+(.+)$/);
  if (orderedMatch) {
    return { type: 'ordered-list-item', content: orderedMatch[1] };
  }

  // Blockquote
  if (line.startsWith('> ')) {
    return { type: 'blockquote', content: line.slice(2) };
  }

  // Paragraph
  return { type: 'paragraph', content: line };
}

export function extractHeadings(content) {
  const lines = content.split('\n');
  const headings = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      headings.push({
        id: slugify(match[2]),
        text: match[2],
        level: match[1].length,
      });
    }
  }

  return headings;
}

export function countWords(content) {
  return content
    .replace(/[#*>\-`\[\]()!]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export function renderMarkdown(content) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const block = classifyBlock(line);

    if (block.type === 'empty') {
      i++;
      continue;
    }

    // Image figure
    if (block.type === 'image-figure' && block.items) {
      const alt = block.items[0];
      const src = block.items[1];

      let caption = '';
      if (i + 1 < lines.length) {
        const next = classifyBlock(lines[i + 1]);
        if (next.type === 'blockquote') {
          caption = next.content;
          i++;
        }
      }

      elements.push(
        <figure key={key++} className="blog-proof-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" />
          {caption ? <figcaption>{parseInline(caption)}</figcaption> : null}
        </figure>
      );

      i++;
      continue;
    }

    // Headings
    if (block.type === 'heading' && block.level) {
      const id = slugify(block.content);
      switch (block.level) {
        case 1:
          elements.push(<h1 key={key++} id={id}>{parseInline(block.content)}</h1>);
          break;
        case 2:
          elements.push(<h2 key={key++} id={id}>{parseInline(block.content)}</h2>);
          break;
        case 3:
          elements.push(<h3 key={key++} id={id}>{parseInline(block.content)}</h3>);
          break;
        default:
          elements.push(<h4 key={key++} id={id}>{parseInline(block.content)}</h4>);
      }
      i++;
      continue;
    }

    // Unordered list (consecutive)
    if (block.type === 'list-item') {
      const items = [];
      while (i < lines.length && classifyBlock(lines[i]).type === 'list-item') {
        items.push(classifyBlock(lines[i]).content);
        i++;
      }
      elements.push(
        <ul key={key++}>
          {items.map((item, idx) => (
            <li key={idx}>{parseInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list (consecutive)
    if (block.type === 'ordered-list-item') {
      const items = [];
      while (i < lines.length && classifyBlock(lines[i]).type === 'ordered-list-item') {
        items.push(classifyBlock(lines[i]).content);
        i++;
      }
      elements.push(
        <ol key={key++}>
          {items.map((item, idx) => (
            <li key={idx}>{parseInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Blockquote
    if (block.type === 'blockquote') {
      elements.push(
        <blockquote key={key++}>
          <p>{parseInline(block.content)}</p>
        </blockquote>
      );
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++}>{parseInline(block.content)}</p>
    );
    i++;
  }

  return elements;
}
