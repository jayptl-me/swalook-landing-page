# Blog System Refactoring: Analysis & Production Roadmap

> **Date**: 2026-06-05  
> **Status**: Planning Complete — Awaiting Implementation Approval  
> **Related Docs**: `docs/landing-page-audit/blog-seo-geo-strategy.md`, `docs/landing-page-audit/backend-contract-map.md`

---

## Current State Assessment

### Architecture Overview

The `swalook-landing-page` blog is **already partially dynamic** — it uses a centralized JSON datastore with Next.js dynamic `[slug]` routing. It is **not** a collection of static folder-per-post files.

```mermaid
graph TD
    A[data/blogs.json] --> B[lib/blog.js]
    C[data/authors.json] --> B
    B --> D[lib/blog-schema.js - JSON-LD]
    B --> E[lib/markdown.jsx - Custom Parser]
    B --> F[components/blog/blogData.js - Redundant Wrapper]
    F --> G[app/(content)/blogs/page.js - Index]
    B --> H[app/(content)/blogs/&#91slug&#93/page.js - Post]
    H --> I[components/blog/BlogPostLayout.js]
    H --> J[components/blog/TableOfContents.js]
    H --> K[components/blog/SocialShare.js]
    H --> L[components/blog/ReadingProgress.js]
```

### What's In Place

| Layer | Implementation | Status |
|---|---|---|
| **Data** | `data/blogs.json` (4 posts) + `data/authors.json` | Centralized JSON — done |
| **Data access** | `lib/blog.js` — `getAllPosts()`, `getPostBySlug()`, `getCategories()`, `getRelatedPosts()`, `getPostsByCategory()` | Clean service layer |
| **Markdown engine** | `lib/markdown.jsx` — custom parser for headings, lists, blockquotes, images, inline formatting (~180 lines) | Functional but fragile |
| **Routing** | `app/(content)/blogs/[slug]/page.js` — single dynamic route | Already dynamic |
| **Meta/SEO** | `[slug]/layout.js` — dynamic `generateMetadata` per post + JSON-LD structured data | In place |
| **Components** | 30+ modular components in `components/blog/` | Well-structured |
| **Backend API** | `swalook-node` has full blog CMS: CRUD posts, categories, tags, media, revisions, public endpoints | **Already production-ready** |
| **RBAC** | Blog admin routes locked to `super_admin`, `developer`, `maintainer` | Secure |

### The Long Slug Name "Problem"

Slugs like `7-key-factors-for-choosing-salon-crm-software` are **intentional SEO-optimized URL slugs**. They:
- Carry keyword value for search engines
- Are human-readable and shareable
- Follow standard content marketing practices

This is **not** a code smell. The concern about "individual folders with 20+ character names" was a red herring — the system already uses a single `[slug]` dynamic route, not physical folders per post.

### Critical Issues Identified

1. **4 posts is not a content engine** — the system needs scale to build topical authority
2. **Custom markdown parser is fragile** — no table support, no footnotes, no MDX components, potential edge-case bugs
3. **No backend connectivity** — landing page reads local JSON, not the production API that already exists
4. **No admin UI** — backend API is complete but there is no dashboard to manage content
5. **No rich text editor** — content is written as raw markdown strings in JSON files
6. **blogData.js duplicates lib/blog.js** — redundant re-export layer with no added value
7. **`[slug]/layout.js` and `[slug]/page.js` both call `getPostBySlug`** — double database fetch on every request

---

## Phase 1: Data Refactoring → Centralized Backend-Backed System

**Goal**: Move from local JSON files to the production backend API. The backend already supports this architecture — we just need to connect the landing page to it.

### Step 1.1 — Create Blog Database Tables

The `swalook-node/src/db/schema.ts` file does not yet contain blog CMS table definitions. Create a migration that adds:

```sql
-- Core tables
blog_posts (
  id CHAR(32) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  content_md LONGTEXT NOT NULL,
  content_html LONGTEXT,
  excerpt TEXT,
  summary TEXT,
  cover_image VARCHAR(500),
  status ENUM('draft','published','archived') DEFAULT 'draft',
  author_id INT REFERENCES auth_user(id),
  published_at DATETIME,
  scheduled_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  meta_title VARCHAR(500),
  meta_description TEXT,
  og_image VARCHAR(500),
  read_time VARCHAR(20),
  is_featured TINYINT DEFAULT 0,
  accent VARCHAR(20),
  icon VARCHAR(50),
  primary_cta_label VARCHAR(200),
  primary_cta_href VARCHAR(500),
  secondary_cta_label VARCHAR(200),
  secondary_cta_href VARCHAR(500)
)

blog_categories (
  id CHAR(32) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)

blog_tags (
  id CHAR(32) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)

-- Junction tables
blog_post_categories (post_id, category_id, PRIMARY KEY)
blog_post_tags (post_id, tag_id, PRIMARY KEY)

-- Supporting tables
blog_post_highlights (
  id CHAR(32) PRIMARY KEY,
  post_id CHAR(32) REFERENCES blog_posts(id),
  title VARCHAR(200),
  text TEXT,
  sort_order INT DEFAULT 0
)

blog_revisions (
  id CHAR(32) PRIMARY KEY,
  post_id CHAR(32) REFERENCES blog_posts(id),
  content_md LONGTEXT NOT NULL,
  content_html LONGTEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INT REFERENCES auth_user(id),
  change_summary VARCHAR(500)
)

blog_media (
  id CHAR(32) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100),
  size_bytes BIGINT,
  width INT,
  height INT,
  alt_text VARCHAR(500),
  status ENUM('uploading','ready','failed') DEFAULT 'uploading',
  uploaded_by INT REFERENCES auth_user(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Step 1.2 — Implement Blog Service Layer

Ensure `swalook-node/src/services/blog.service.ts` exists with full CRUD operations using Drizzle ORM. The controller at `swalook-node/src/controllers/blog.controller.ts` already imports from this service — verify it is implemented with:

| Function | Purpose |
|---|---|
| `listPosts(opts)` | Admin post listing with filters, pagination |
| `getPostById(id)` | Single post by ID |
| `createPost(data)` | Create with automatic revision |
| `updatePost(id, data)` | Update with revision tracking |
| `softDeletePost(id)` | Archive (soft delete) |
| `publishPost(id, scheduledAt?)` | Status → published |
| `unpublishPost(id)` | Status → draft |
| `archivePost(id)` | Status → archived |
| `listRevisions(postId)` | Revision history |
| `getRevision(revisionId)` | Single revision |
| `restoreRevision(postId, revisionId)` | Rollback |
| `listCategories(opts)` | Category CRUD |
| `createCategory(data)` | |
| `updateCategory(id, data)` | |
| `deleteCategory(id)` | |
| `listTags(opts)` | Tag CRUD |
| `createTag(data)` | |
| `updateTag(id, data)` | |
| `deleteTag(id)` | |
| `listMedia(opts)` | Media library |
| `createMediaAsset(data)` | Initiate upload |
| `completeMediaUpload(mediaId)` | Mark ready |
| `deleteMediaAsset(mediaId)` | Remove |
| `listPublishedPosts(opts)` | Public endpoint — published only |
| `getPublishedPostBySlug(slug)` | Public single post with categories/tags |
| `getPostCategories(postId)` | Junction table lookup |
| `getPostTags(postId)` | Junction table lookup |
| `setPostCategories(postId, ids)` | Replace category assignments |
| `setPostTags(postId, ids)` | Replace tag assignments |

### Step 1.3 — Seed Existing Posts

Write a migration/seed script that reads `swalook-landing-page/data/blogs.json` and inserts all existing posts, categories, and tags into the database:

```bash
bun run src/scripts/seed-blog-from-json.ts --live
```

This ensures zero content loss during migration.

### Step 1.4 — Create Landing Page API Client

Create `swalook-landing-page/lib/blog-api.js`:

```js
const API_BASE = process.env.BLOG_API_URL || 'http://localhost:3001/api/v1/public/blog';

export async function fetchPublishedPosts(opts = {}) {
  const params = new URLSearchParams();
  if (opts.category) params.set('category', opts.category);
  if (opts.tag) params.set('tag', opts.tag);
  if (opts.search) params.set('search', opts.search);
  if (opts.page) params.set('page', opts.page);
  if (opts.limit) params.set('limit', opts.limit);
  if (opts.featured) params.set('featured', 'true');

  const res = await fetch(`${API_BASE}/posts?${params}`);
  if (!res.ok) throw new Error(`Blog API error: ${res.status}`);
  return res.json();
}

export async function fetchPostBySlug(slug) {
  const res = await fetch(`${API_BASE}/posts/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blog API error: ${res.status}`);
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  return res.json();
}

export async function fetchTags() {
  const res = await fetch(`${API_BASE}/tags`);
  return res.json();
}
```

### Step 1.5 — Feature Flag for Backend Toggle

Add to `.env.example`:

```env
# Set to 'local' to use JSON files, 'api' to use backend
NEXT_PUBLIC_BLOG_DATA_SOURCE=local
BLOG_API_URL=http://localhost:3001/api/v1/public/blog
```

Update `lib/blog.js` to delegate to `lib/blog-api.js` when `BLOG_DATA_SOURCE=api`.

---

## Phase 2: Component Architecture Refactor

**Goal**: Single modular `[slug]` page with server-side data fetching. Eliminate duplication. Prepare for MDX migration.

### Step 2.1 — Eliminate blogData.js Duplication

`components/blog/blogData.js` is a thin wrapper around `lib/blog.js` that adds no value. It:
- Re-exports `getPostsBySlug` as `getBlogPostBySlug`
- Re-exports `getRelatedPosts` as `getRelatedBlogPosts`
- Wraps posts with `href` property (easily computed inline)
- Holds hardcoded `blogQuickRoutes`, `blogInsights`, `blogCTAItems` (should be in a config file)

**Action**: Move the hardcoded config arrays to `data/blog-config.json`. Update all imports in `app/(content)/blogs/page.js` to use `lib/blog.js` directly. Delete `blogData.js`.

### Step 2.2 — Server Component Refactor for Post Page

Convert `app/(content)/blogs/[slug]/page.js` from a client component that renders client-side to a **React Server Component**:

```js
// [slug]/page.js — SERVER COMPONENT
import { notFound } from 'next/navigation';
import { getPostBySlug, getAuthor } from '@/lib/blog';
import { renderMarkdown, extractHeadings } from '@/lib/markdown';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/blog-schema';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);
  const renderedContent = renderMarkdown(post.content);
  const headings = extractHeadings(post.content);
  const articleSchema = generateArticleSchema(post, author);
  const breadcrumbSchema = generateBreadcrumbSchema(post.slug, post.title);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BlogPostClient
        post={post}
        author={author}
        renderedContent={renderedContent}
        headings={headings}
      />
    </>
  );
}
```

Interactive components (`ReadingProgress`, `SocialShare`, `TableOfContents`) move to `BlogPostClient.js` — a `'use client'` component that receives serialized data from the server.

### Step 2.3 — Fix Double Fetch in Layout + Page

Currently both `[slug]/layout.js` and `[slug]/page.js` call `getPostBySlug(slug)`. 

**Solution**: Use React `cache()` to memoize the data access functions:

```js
// lib/blog.js
import { cache } from 'react';

export const getPostBySlug = cache((slug) => {
  return posts.find((p) => p.slug === slug);
});
```

This ensures only one lookup per slug per request even when called from multiple components.

### Step 2.4 — Blog Index SSR Migration

Convert `app/(content)/blogs/page.js` to fetch initial data server-side:

- Category list → server props
- Initial posts → server props (first page)
- Search and pagination remain client-side state
- Category filter uses URL search params for shareable filtered URLs

### Step 2.5 — MDX Migration Plan

Replace the custom `lib/markdown.jsx` parser with `next-mdx-remote` or `@next/mdx`:

**Benefits over custom parser**:
- Full CommonMark + GFM compliance (tables, strikethrough, task lists, footnotes)
- Component injection (custom `<CTABlock>`, `<ProductEmbed>`, `<FAQSection>`)
- No `dangerouslySetInnerHTML` — all content goes through React's reconciliation
- Built-in syntax highlighting via `rehype-pretty-code`
- Automatic heading ID generation
- Plugin ecosystem (reading time, table of contents, slug generation)

**Migration approach**:
1. Install `next-mdx-remote` (for server-side MDX rendering)
2. Write a thin adapter that accepts the same content format
3. Register custom components that match current blog needs
4. Update `[slug]/page.js` to use the new renderer
5. Remove `lib/markdown.jsx`

---

## Phase 3: Backend & CMS Roadmap

**Goal**: Super Admin dashboard with full CRUD for blog content management.

### Step 3.1 — Blog Admin UI Pages

The `crm-super-admin` Next.js app already has the auth/RBAC infrastructure, UI kit, and API patterns. Add blog management under `apps/web/app/(admin)/blog/`:

| Route | Component | Purpose |
|---|---|---|
| `/blog` | `BlogDashboard.tsx` | Post list with status filters, search, pagination |
| `/blog/new` | `BlogEditor.tsx` | Create new post |
| `/blog/[id]/edit` | `BlogEditor.tsx` | Edit existing post |
| `/blog/categories` | `BlogCategories.tsx` | CRUD category manager |
| `/blog/tags` | `BlogTags.tsx` | CRUD tag manager |
| `/blog/media` | `BlogMediaLibrary.tsx` | Upload, browse, delete media |
| `/blog/analytics` | `BlogAnalytics.tsx` | Post performance dashboard |

### Step 3.2 — API Client for Super Admin

Create `crm-super-admin/apps/web/lib/blog-api.ts` with typed fetch wrappers:

```typescript
import { apiClient } from './api-client'; // existing auth-aware client

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  contentMd: string;
  contentHtml: string | null;
  excerpt: string | null;
  coverImage: string | null;
  status: 'draft' | 'published' | 'archived';
  authorId: number;
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  readTime: string | null;
  isFeatured: boolean;
  categories: BlogCategory[];
  tags: BlogTag[];
}

// ... typed functions for all endpoints
```

### Step 3.3 — Post Status Workflow

Implement the status state machine in the admin UI:

```
         ┌─────────┐
         │  draft  │
         └────┬────┘
              │ publish
              ▼
       ┌──────────────┐
       │  published   │
       └───┬──────┬───┘
           │      │ archive
  unpublish │      ▼
           │  ┌──────────┐
           ▼  │ archived │
      ┌─────────┐       │
      │  draft  │◄──────┘
      └─────────┘  unarchive
```

The backend already supports `POST /posts/:postId/publish`, `/unpublish`, `/archive`. The UI needs to expose these as buttons with confirmation dialogs.

---

## Phase 4: Rich Text Editor Implementation

**Goal**: Professional-grade editor with advanced SEO tooling integrated into the Super Admin dashboard.

### Step 4.1 — Editor Selection: TipTap

**Recommendation**: [TipTap](https://tiptap.dev/) (ProseMirror-based)

**Why TipTap over alternatives**:
- Battle-tested ProseMirror foundation
- Excellent React 19 support
- Extensive extension ecosystem (tables, images, code blocks, mention, placeholder)
- Custom node/extension API for Swalook-specific blocks
- Markdown shortcut support built-in
- Collaboration extensions available for future multi-user editing
- MIT license with optional pro extensions

### Step 4.2 — Editor Feature Set

| Feature | Implementation |
|---|---|
| **Markdown shortcuts** | `#` → heading, `>` → blockquote, `*` → list, ` ``` ` → code block |
| **Rich formatting** | Bold, italic, strikethrough, underline, superscript, subscript, code, links |
| **Headings** | H1-H4 with automatic anchor IDs |
| **Lists** | Ordered, unordered, task lists |
| **Tables** | Full table editing with column/row management |
| **Images** | Drag-and-drop upload → backend media endpoint, alt text editor |
| **Blockquotes** | With optional citation |
| **Horizontal rules** | Visual section breaks |
| **Custom Swalook blocks** | ProductEmbed, CTABlock, FAQBlock, ProofFigure, PricingTable |
| **Auto-save** | Debounced (3s) → creates/updates revision on backend |
| **Word count** | Real-time display in toolbar |
| **Reading time** | Auto-calculated from word count ÷ 250 WPM |
| **Preview mode** | Split-view: editor + rendered preview (desktop + mobile viewport toggle) |

### Step 4.3 — SEO Optimization Sidebar

Build a right-side panel in the editor with:

```
┌─────────────────────────────────────────────────────────────┐
│  SEO Analysis                                    [minimize] │
├─────────────────────────────────────────────────────────────┤
│  SERP Preview                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Your Title Here          https://swalook.in/blo... │   │
│  │ Meta description preview appears here with keywo... │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [OK] Title: 58/60 chars -- Optimal                        │
│  [OK] Meta Description: 148/160 chars -- Optimal           │
│  [WARN] Slug: already taken -- try different slug           │
│                                                             │
│  Content Analysis                                          │
│  • Keyword density: "salon CRM" appears 12x (2.1%)         │
│  • Heading structure: H2×4, H3×6 — Well structured         │
│  • Internal links: 3 found, 2 suggested                    │
│  • Readability: Grade 8 (Good)                             │
│                                                             │
│  Internal Link Suggestions                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ → /salon-crm-features (match: 87%)                  │   │
│  │ → /blogs/salon-marketing-automation (match: 72%)    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Social Preview                                            │
│  • OG Image: Set (1200x630px) [OK]                         │
│  • Generate from template  [Generate]                       │
└─────────────────────────────────────────────────────────────┘
```

### Step 4.4 — AI-Assisted Writing (Future Phase)

OpenAI/Claude integration for:
- **Tone adjustment**: "Make this more professional" / "Simplify for beginners"
- **Content expansion**: "Expand this section with 3 more examples"
- **FAQ generation**: Auto-generate FAQ section from body content
- **Internal link suggestions**: Semantic search across existing posts
- **Title variants**: Generate 5 alternative headlines with SEO scores

---

## Phase 5: Feature Expansion

**Goal**: Sub-pages, professional layouts, analytics integration.

### Step 5.1 — Topic Cluster Pages

Based on the `blog-seo-geo-strategy.md` audit, implement topic cluster landing pages:

| Route | Cluster | Parent Intent |
|---|---|---|
| `/blogs/salon-crm` | CRM / Software Evaluation | Commercial investigation |
| `/blogs/marketing` | Salon Marketing & Engagement | Informational |
| `/blogs/retention` | Retention & Repeat Business | Informational |
| `/blogs/operations` | Billing, Inventory & Operations | Informational |
| `/blogs/comparisons` | Comparisons & Alternatives | Commercial investigation |

Each cluster page:
- Hero with cluster description and CTA
- Featured pillar post
- Sub-posts in card grid
- Related product feature links
- FAQ section

### Step 5.2 — Author Pages

`/blogs/author/[slug]` — Author bio, post list, social links.

### Step 5.3 — Enhanced Blog Index

Transform from flat grid to:
1. **Hero section**: Featured post carousel (latest 3 featured posts)
2. **Topic clusters bar**: Horizontal scroll of cluster cards
3. **Latest posts grid**: Remaining posts in masonry/grid layout
4. **CTA interstitials**: Between post sections
5. **Newsletter signup**: Embedded form
6. **Category quick filters**: Chips/tabs at top

### Step 5.4 — Analytics Integration

The backend already has placeholder analytics endpoints (`blogAnalyticsOverview`, `blogAnalyticsForPost`). Wire them up:

**Data tracked per post**:
- Page views (server-side via event store + GA4)
- Unique visitors
- Average time on page
- Scroll depth (25%, 50%, 75%, 100%)
- CTA clicks (by CTA type)
- Related post clicks
- Social shares
- Bounce rate
- Conversion attribution (blog → demo booking → trial start)

**Dashboard metrics** (in Super Admin):
- Top performing posts (by traffic, engagement, conversion)
- Content decay alerts (posts with declining traffic)
- Topic cluster performance comparison
- Conversion funnel: Blog visit → CTA click → Demo booked → Trial started
- Publishing calendar view

---

## Phase 6: SEO & Performance Hardening

**Goal**: Production-grade SEO, Core Web Vitals compliance, and automated content distribution.

### Step 6.1 — Automated Sitemap Generation

Create `app/sitemap.ts`:

```js
export default async function sitemap() {
  const posts = await fetchPublishedPosts({ limit: 1000 });

  const staticRoutes = [
    { url: 'https://swalook.in', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://swalook.in/blogs', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    // ... marketing pages, feature pages, legal pages
  ];

  const blogRoutes = posts.items.map((post) => ({
    url: `https://swalook.in/blogs/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
```

Split sitemaps if post count exceeds 50,000.

### Step 6.2 — RSS Feed Automation

Automate `scripts/generate-rss.js`:
- Regenerate on post publish via webhook
- Include full HTML content (not just excerpts)
- Add media enclosures for podcast/audio content (future)
- Validate against W3C Feed Validator

### Step 6.3 — ISR (Incremental Static Regeneration)

```js
// app/(content)/blogs/[slug]/page.js
export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true; // Allow new slugs without full rebuild
```

This gives:
- Static-speed serving (CDN cache hit)
- Automatic cache invalidation after content updates
- No full site rebuild needed when adding posts

### Step 6.4 — Image Optimization Pipeline

- All post images use `next/image` with explicit `width`/`height`
- Generate blur placeholder (LQIP) at upload time — store as `blur_data_url` on blog_media
- Convert uploads to WebP + AVIF (already configured in `next.config.mjs`)
- Add `priority` attribute to hero/cover images (above-fold LCP optimization)

### Step 6.5 — Core Web Vitals Checklist

| Metric | Target | Implementation |
|---|---|---|
| **LCP** | < 2.5s | Preload cover image, font subsetting, inline critical CSS |
| **FID** | < 100ms | Defer non-critical JS, code-split editor components |
| **CLS** | < 0.1 | Explicit image dimensions, font-display swap, reserve ad slots |
| **INP** | < 200ms | Debounced search, virtualized post lists, passive scroll listeners |

### Step 6.6 — Canonical & Meta Strategy

Every blog route must have:
- Self-referencing canonical URL
- `og:title`, `og:description`, `og:image`, `og:type: article`
- `article:published_time`, `article:modified_time`
- `twitter:card: summary_large_image`
- Breadcrumb JSON-LD
- Article JSON-LD (BlogPosting schema) with author, publisher, wordCount, articleSection

---

## Execution Roadmap (Priority-Ordered)

| # | Step | Phase | Effort | Dependency | Impact |
|---|---|---|---|---|---|
| 1 | Create blog DB schema + Drizzle migration | 1 | 1 day | None | Foundation |
| 2 | Implement `blog.service.ts` with full CRUD | 1 | 1 day | #1 | Core |
| 3 | Seed existing 4 posts to DB | 1 | 0.5 day | #2 | Content migration |
| 4 | Add `cache()` to lib/blog.js (fix double fetch) | 2 | 0.5 hour | None | Quick win |
| 5 | Merge `blogData.js` into `lib/blog.js` | 2 | 0.5 day | None | Cleanup |
| 6 | Create `lib/blog-api.js` in landing page | 1 | 0.5 day | #2 | Connectivity |
| 7 | Refactor `[slug]/page.js` to Server Component | 2 | 1 day | #6 | Performance |
| 8 | Refactor blog index to SSR | 2 | 0.5 day | #6 | Performance |
| 9 | Replace custom markdown parser with MDX | 2 | 1 day | #7 | Quality |
| 10 | Build blog admin UI — post list + editor shell | 3 | 2 days | #2 | CMS |
| 11 | Integrate TipTap editor into admin UI | 4 | 2 days | #10 | Editor |
| 12 | Build SEO sidebar panel | 4 | 1.5 days | #11 | SEO tools |
| 13 | Add topic cluster / category / tag pages | 5 | 2 days | #6 | Content architecture |
| 14 | Build analytics tracking + admin dashboard | 5 | 2 days | #2 | Measurement |
| 15 | ISR config + sitemap + RSS automation | 6 | 1 day | #6 | SEO |
| 16 | Core Web Vitals audit + fixes | 6 | 1 day | #11, #9 | Performance |

**Total estimated effort**: ~18 days for a single senior engineer.

### Quick Wins (Do Immediately — Under 1 Hour Total)

| # | Task | Time | Impact |
|---|---|---|---|
| 1 | Add `cache()` to `getPostBySlug` in `lib/blog.js` | 5 min | Eliminates double DB fetch |
| 2 | Add `export const revalidate = 3600` to blog pages | 5 min | Instant ISR for all posts |
| 3 | Add missing canonical tags to blog index page | 10 min | SEO hygiene |
| 4 | Remove `blogData.js` and fix imports | 30 min | Eliminates redundancy |

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Custom markdown parser breaks with complex content | Medium | High | MDX migration (#9) scheduled early |
| Backend API downtime breaks landing page | Low | Critical | Keep JSON fallback with feature flag |
| Content migration data loss | Low | High | Seed script is idempotent; JSON files kept as backup |
| Admin UI scope creep | Medium | Medium | Strict phased approach; MVP = list + editor |
| ISR cache serving stale content | Low | Medium | On-demand revalidation webhook from backend on publish |
| SEO rankings drop during migration | Low | High | Keep same URLs, same schema, same content structure |

---

## Dependencies Between Repositories

```
┌──────────────────────────────────────────────────────────────────┐
│  swalook-node (Backend)                                         │
│  ├── New: blog schema + migration                               │
│  ├── New/Verify: blog.service.ts                                │
│  ├── Existing: blog.controller.ts                                │
│  ├── Existing: blog.routes.ts                                    │
│  ├── Existing: blog-public.routes.ts                             │
│  └── New: seed-blog-posts.ts                                    │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  swalook-landing-page (Marketing Site)                          │
│  ├── New: lib/blog-api.js                                       │
│  ├── Modify: lib/blog.js (cache + api delegation)               │
│  ├── Remove: components/blog/blogData.js                        │
│  ├── Modify: app/(content)/blogs/[slug]/page.js (RSC refactor)  │
│  ├── Modify: app/(content)/blogs/page.js (SSR refactor)         │
│  └── New: lib/mdx-renderer.jsx (replace markdown.jsx)           │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  crm-super-admin (Admin Dashboard)                              │
│  ├── New: apps/web/app/(admin)/blog/*                           │
│  ├── New: lib/blog-api.ts                                       │
│  ├── New: components/blog-editor/* (TipTap + SEO panel)         │
│  └── Modify: Navigation (add Blog link for platform roles)      │
└──────────────────────────────────────────────────────────────────┘
```

---

## Success Criteria

The refactoring is complete when:

1. All blog content is served from the database via API (local JSON is dev-only fallback)
2. Blog posts are authored through the Super Admin TipTap editor — no manual JSON editing
3. SEO panel provides real-time feedback and scores >= 80/100 for all published posts
4. Blog index and post pages achieve Lighthouse scores >= 90 (Performance, SEO, Accessibility)
5. ISR serves cached pages in < 200ms (CDN edge)
6. Analytics dashboard shows per-post traffic, engagement, and conversion metrics
7. All existing URLs return 200 (no broken links after migration)
8. RSS feed auto-updates on publish
9. Sitemap includes all published posts automatically
10. Zero `blogData.js` imports remain in the codebase
