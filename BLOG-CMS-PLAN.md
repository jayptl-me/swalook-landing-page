# Blog CMS — Production Implementation Plan

## Table of Contents
1. System Context (3 Repos)
2. Database Schema
3. API Surface
4. Current State Assessment
5. Phase 1: Seed Database
6. Phase 2: Landing Page API Client
7. Phase 3: Dynamic Blog Listing
8. Phase 4: Dynamic Blog Articles + Block Renderer
9. Phase 5: Sitemap + RSS
10. Phase 6: Super Admin Taxonomy + Media Pages
11. Phase 7: Deployment & Verification
12. Implementation Status

---

## 1. System Context

### Repo A: swalook-node (Backend API)
- **Location:** `current/swalook-node/`
- **Runtime:** Bun, Hono.js, Drizzle ORM, MySQL (Aiven)
- **Auth:** JWT, platform roles (super_admin, developer, maintainer)
- **Blog routes:** Admin at `/api/v1/admin/blog/*`, Public at `/api/v1/public/blog/*`
- **Deploy:** Render (web service), blueprint in `render.yaml`

### Repo B: swalook-landing-page (Public Marketing Site)
- **Location:** `current/swalook-landing-page/`
- **Runtime:** Next.js (static export via `bun run build`), Tailwind
- **Current state:** Hardcoded blog data in `components/blog/blogData.js`
- **Deploy:** Render (static site), blueprint in `render.yaml`
- **Env placeholder:** `.env.example` has `NEXT_PUBLIC_API_URL`

### Repo C: crm-super-admin (Admin Panel)
- **Location:** `current/swalook-super-admin/`
- **Runtime:** Next.js (Turborepo), Tailwind, Framer Motion
- **Blog admin pages:**
  - `/admin/blog` — Dashboard (KPI cards, pipeline, recent posts)
  - `/admin/blog/content` — Content library (search, filter, actions)
  - `/admin/blog/content/[postId]` — Block editor (rich text, SEO fields)
  - `/admin/blog/content/new` — New post creation
  - `/admin/blog/taxonomy` — **NOT BUILT** (link exists)
  - `/admin/blog/media` — **NOT BUILT** (link exists)
- **API client:** `/apps/web/lib/blog-api.ts` — full typed client
- **Deploy:** Render

---

## 2. Database Schema (swalook-node, MySQL via Drizzle)

### Table: blog_posts
| Column | Type | Purpose |
|--------|------|---------|
| id | char(32) | UUID |
| slug | varchar(255) | URL path (unique index) |
| title | varchar(255) | Display title |
| subtitle | varchar(255) | Optional subtitle |
| excerpt | varchar(500) | Card preview / meta description fallback |
| status | varchar(20) | draft / review / scheduled / published / archived |
| content_type | varchar(30) | article / guide / announcement / case_study / faq / other |
| content_blocks | json | Structured block array (see schema below) |
| author_id | int -> users.id | FK to auth user |
| cover_image | varchar(500) | Optional hero image URL |
| seo_title | varchar(120) | Custom meta title (overrides title) |
| seo_description | varchar(300) | Custom meta description (overrides excerpt) |
| og_image | varchar(500) | OpenGraph image URL |
| canonical_url | varchar(500) | Override canonical URL |
| featured | tinyint(1) | Promoted flag |
| reading_time_minutes | int | Estimated read time |
| scheduled_at | datetime | Future publish date |
| published_at | datetime | Actual publish timestamp |
| created_at | datetime(6) | Auto timestamp |
| updated_at | datetime(6) | Auto timestamp |
| deleted_at | datetime(6) | Soft delete |

### Table: blog_categories
| Column | Type |
|--------|------|
| id | char(32) |
| slug | varchar(255) (unique) |
| name | varchar(255) |
| description | varchar(500) |
| deleted_at | datetime(6) |

### Table: blog_tags
| Column | Type |
|--------|------|
| id | char(32) |
| slug | varchar(255) (unique) |
| name | varchar(255) |
| deleted_at | datetime(6) |

### Table: blog_post_categories (M2M)
| Column | Type |
|--------|------|
| post_id | char(32) FK -> blog_posts |
| category_id | char(32) FK -> blog_categories |
| Unique on (post_id, category_id) |

### Table: blog_post_tags (M2M)
| Column | Type |
|--------|------|
| post_id | char(32) FK -> blog_posts |
| tag_id | char(32) FK -> blog_tags |
| Unique on (post_id, tag_id) |

### Table: blog_revisions
| Column | Type |
|--------|------|
| id | char(32) |
| post_id | char(32) FK -> blog_posts |
| revision_number | int |
| action | varchar(40) |
| snapshot | json (full post state) |
| created_by | int -> users.id |
| created_at | datetime(6) |

### Table: blog_media_assets
| Column | Type |
|--------|------|
| id | char(32) |
| storage_key | varchar(500) |
| public_url | varchar(1000) |
| mime_type | varchar(100) |
| media_kind | varchar(20) |
| original_filename | varchar(500) |
| size_bytes | int |
| width | int |
| height | int |
| alt_text | varchar(500) |
| caption | varchar(500) |
| folder | varchar(255) |
| status | varchar(20) (pending/ready/failed/archived) |
| deleted_at | datetime(6) |

---

## 3. API Surface

### Public Routes (no auth, only published posts)

| Method | Path | Purpose |
|--------|------|---------|
| GET | /api/v1/public/blog/posts | List published (filter: search, category, tag, featured, page, limit) |
| GET | /api/v1/public/blog/posts/:slug | Single post by slug |
| GET | /api/v1/public/blog/categories | List categories |
| GET | /api/v1/public/blog/categories/:slug | Posts by category |
| GET | /api/v1/public/blog/tags | List tags |
| GET | /api/v1/public/blog/tags/:slug | Posts by tag |
| GET | /api/v1/public/blog/media/:mediaId | Get media asset |

### Admin Routes (requires auth, super_admin/developer/maintainer)

| Method | Path | Purpose |
|--------|------|---------|
| GET | /api/v1/admin/blog/posts | List all (filter: status, author, search, category) |
| POST | /api/v1/admin/blog/posts | Create post |
| GET | /api/v1/admin/blog/posts/:postId | Get post by id |
| PATCH | /api/v1/admin/blog/posts/:postId | Update post |
| DELETE | /api/v1/admin/blog/posts/:postId | Soft delete |
| POST | /api/v1/admin/blog/posts/:postId/publish | Publish (optionally scheduled) |
| POST | /api/v1/admin/blog/posts/:postId/unpublish | Unpublish |
| POST | /api/v1/admin/blog/posts/:postId/archive | Archive |
| GET | /api/v1/admin/blog/posts/:postId/revisions | List revisions |
| GET | /api/v1/admin/blog/posts/:postId/revisions/:revisionId | Get revision |
| POST | /api/v1/admin/blog/posts/:postId/revisions/:revisionId/restore | Restore revision |
| GET | /api/v1/admin/blog/categories | List categories |
| POST | /api/v1/admin/blog/categories | Create category |
| PATCH | /api/v1/admin/blog/categories/:categoryId | Update category |
| DELETE | /api/v1/admin/blog/categories/:categoryId | Delete category |
| GET | /api/v1/admin/blog/tags | List tags |
| POST | /api/v1/admin/blog/tags | Create tag |
| PATCH | /api/v1/admin/blog/tags/:tagId | Update tag |
| DELETE | /api/v1/admin/blog/tags/:tagId | Delete tag |
| GET | /api/v1/admin/blog/media | List media |
| POST | /api/v1/admin/blog/media | Create media asset |
| POST | /api/v1/admin/blog/media/:mediaId/complete | Mark upload complete |
| DELETE | /api/v1/admin/blog/media/:mediaId | Delete media |
| GET | /api/v1/admin/blog/analytics/overview | Analytics dashboard |
| GET | /api/v1/admin/blog/analytics/posts/:postId | Per-post analytics |

---

## 4. Current State Assessment

### What Works (Deployed & Live)
- Landing page (swalook.in) with 4 hardcoded blog articles
- Static page files for each article slug
- Blog listing page at `/blogs` with category filter
- Full blog component set (hero, grid, card, tabs, sidebar, breadcrumb, meta, icon)
- BlogJsonLd component for structured data

### What Works (Backend, Not Yet Used)
- All DB tables exist in schema (may or may not have been migrated)
- All API routes registered in router
- Blog service layer with full CRUD, publish/unpublish/archive
- Super admin blog editor (create, edit, publish, archive)
- API client in super admin connecting to backend

### What Does Not Exist
- Database has NOT been seeded (no blog posts in DB)
- Landing page has zero API calls (all static)
- No dynamic `[slug]` routing for blog articles
- No BlockRenderer component to render `content_blocks` JSON
- No taxonomy management page in super admin
- No media library page in super admin
- Sitemap is hardcoded (not dynamic from API)

### Content Block JSON Structure

The seed script converts markdown into this block structure:
```json
[
  { "type": "heading", "level": 2, "text": "..." },
  { "type": "paragraph", "text": "..." },
  { "type": "list", "style": "unordered", "items": ["...", "..."] },
  { "type": "highlight", "label": "Term", "text": "..." },
  { "type": "paragraph", "text": "..." }
]
```

The super admin editor uses a richer block set:
heading (level 2/3/4), paragraph, list (unordered/ordered), quote, callout (info/warning/success), divider, image, code.

The BlockRenderer must handle ALL these types.

---

## Phase 1: Seed Database

### Task
Insert all blog posts into the MySQL database via the seed script.

### Files to Read
- `swalook-node/src/scripts/seed-blogs.ts` — seed script
- `swalook-node/src/services/blog.service.ts` — service layer
- `swalook-node/.env.example` — env reference
- `swalook-node/drizzle.config.ts` — drizzle config

### Steps
1. Ensure `DATABASE_URL` is set in swalook-node .env (points to Aiven MySQL)
2. Ensure blog tables exist (run drizzle migrations if needed: `bun run db:migrate`)
3. Run seed: `bun run src/scripts/seed-blogs.ts --live`
4. Verify: check `SELECT COUNT(*) FROM blog_posts WHERE status = 'published'`
5. If tables don't exist: generate + run migrations first

### Verification
- 8 blog posts should be in DB with status "published"
- 8 categories
- 19 tags
- All M2M relationships set

---

## Phase 2: Landing Page API Client

### Task
Create a typed API client in the landing page to fetch blog data from the backend.

### Files to Read
- `swalook-super-admin/apps/web/lib/blog-api.ts` — reference for pattern
- `swalook-landing-page/.env.example` — env setup
- `swalook-landing-page/components/blog/blogData.js` — current static data
- `swalook-landing-page/app/blogs/page.js` — current listing page
- `swalook-landing-page/components/blog/BlogPostGrid.js` — uses posts data

### Files to Create
- `swalook-landing-page/lib/blog-public.ts` — API client

### Implementation
```typescript
// lib/blog-public.ts
const API_ROOT = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  status: string;
  contentType: string;
  contentBlocks: BlockData[];
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  featured: boolean;
  readingTimeMinutes?: number;
  publishedAt?: string;
  authorId?: string;
  categories?: { id: string; name: string; slug: string }[];
  tags?: { id: string; name: string; slug: string }[];
}

interface BlockData {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

// All typed fetch functions
export async function fetchPublishedPosts(params?: {
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}): Promise<{ posts: BlogPost[]; total: number; page: number; totalPages: number }>

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null>
```

### Key Design Decisions
- All fetch functions catch errors and return null/empty fallback
- The landing page should never crash if backend is unreachable
- Use `fetch` with AbortController for timeout protection (5s)
- Always prefer `content_blocks` from API; fall back to static blogData.js if API fails

---

## Phase 3: Dynamic Blog Listing

### Task
Convert `/blogs` page from static blogData.js import to live API data.

### Files to Read
- `swalook-landing-page/app/blogs/page.js` — current page
- `swalook-landing-page/components/blog/blogData.js` — current data shape
- `swalook-landing-page/components/blog/BlogPostGrid.js` — renderer
- `swalook-landing-page/components/blog/BlogCategoryTabs.js` — category filter
- `swalook-landing-page/components/blog/BlogSidebarRail.js` — sidebar

### Changes Required
1. Replace `import { blogPosts, blogCategories } from '@/components/blog/blogData'`
2. Add `useEffect` + `fetchPublishedPosts()` on mount
3. Wire `activeCategory` filter to API `?category=slug`
4. Add loading state (skeleton)
5. Add error state (retry button or fallback to static data)
6. Add empty state (already exists: "No posts found")

### Key Design Decisions
- On first load, show skeleton grid
- If API succeeds, render live data
- If API fails after timeout, fall back to `blogData.js` static data silently
- Category tabs filter via API query param, not client-side filter

---

## Phase 4: Dynamic Blog Articles + Block Renderer

### Task
Remove all static article page files. Create a dynamic `[slug]` route. Build a BlockRenderer component.

### Files to Delete
- `app/7-key-factors-for-choosing-salon-crm-software/`
- `app/why-salons-fall-behind-without-crm-software/`
- `app/the-importance-of-integrated-marketing/`
- `app/how-to-automate-your-salon-marketing-with-swalook/`

### Files to Create
- `app/blog/[slug]/page.js` — dynamic route (server component)
- `components/blog/BlockRenderer.js` — renders content_blocks JSON
- `components/blog/BlockRenderer.module.css` — block styles

### Dynamic Route Implementation
```javascript
// app/blog/[slug]/page.js
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blog/BlockRenderer';
import BlogJsonLd from '@/components/blog/BlogJsonLd';

// Server component that fetches post data
async function getPost(slug) {
  const API_ROOT = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${API_ROOT}/api/v1/public/blog/posts/${slug}`, {
      next: { revalidate: 3600 }  // ISR: revalidate every hour
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    // Fallback: check static blogData.js for the slug
    const { getBlogPostBySlug } = await import('@/components/blog/blogData');
    return getBlogPostBySlug(slug);
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle || `${post.title} | Swalook`,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: post.canonicalUrl || `https://swalook.in/${post.slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `https://swalook.in/${post.slug}`,
      type: post.contentType === 'guide' ? 'article' : 'article',
      publishedTime: post.publishedAt,
      images: [post.ogImage || '/swalook-logo.webp'],
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <BlogJsonLd {...} />
      <BlogPostLayout title={post.title} category={...} currentSlug={params.slug}>
        <BlockRenderer blocks={post.contentBlocks} />
      </BlogPostLayout>
    </>
  );
}
```

### BlockRenderer Implementation

Must render these block types:
- `heading` — level 2 (h2), 3 (h3), 4 (h4)
- `paragraph` — standard p tag
- `list` — ol (ordered) or ul (unordered) with li items
- `quote` — blockquote with optional cite
- `callout` — styled div with variant (info/warning/success)
- `image` — img with src, alt, optional caption
- `code` — pre > code with language label
- `divider` — hr
- `highlight` — bold label + text (legacy from seed script)

Each block type must map to semantic HTML for SEO.

### SEO Metadata Mapping (DB -> HTML)

| Database Field | Rendered As |
|----------------|-------------|
| post.seoTitle | `<title>`, `og:title`, `twitter:title` |
| post.seoDescription | `<meta name="description">`, `og:description`, `twitter:description` |
| post.canonicalUrl | `<link rel="canonical">` |
| post.ogImage | `og:image`, `twitter:image` |
| post.publishedAt | `article:published_time`, `article:modified_time` |
| post.contentType | `og:type` |
| post.slug | URL path `/<slug>` |

---

## Phase 5: Sitemap + RSS

### Task
Make the sitemap dynamic by fetching blog posts from API.

### Files to Read
- `swalook-landing-page/app/sitemap.js` — current static sitemap
- `swalook-landing-page/app/robots.js` — references sitemap.xml

### ### Changes
1. Modify `sitemap.js` to fetch published posts from API
2. Append dynamic blog URLs alongside existing static routes
3. If API fails, fall back to hardcoded list
4. robots.js already correctly references `/sitemap.xml` — no change needed

---

## Phase 6: Super Admin Taxonomy + Media Pages

### Task
Build the missing Category/Tag management page and Media library page in the super admin.

### Files to Read
- `crm-super-admin/apps/web/lib/blog-api.ts` — API client already has all needed functions: `listBlogCategories`, `createBlogCategory`, `updateBlogCategory`, `deleteBlogCategory`, `listBlogTags`, `createBlogTag`, `updateBlogTag`, `deleteBlogTag`, `listBlogMedia`, `createBlogMediaAsset`, `deleteBlogMedia`
- `crm-super-admin/apps/web/app/admin/blog/page.tsx` — pattern for page layout, header, async state
- `crm-super-admin/apps/web/app/admin/blog/content/page.tsx` — pattern for table, search, filters

### Files to Create
- `crm-super-admin/apps/web/app/admin/blog/taxonomy/page.tsx` — Category & Tag management
- `crm-super-admin/apps/web/app/admin/blog/media/page.tsx` — Media library

### Taxonomy Page Implementation
- Two-panel layout: left panel for categories, right panel for tags
- Each panel has: create form (name input), list with edit/delete actions, confirmation dialogs
- Async state handling for loading, error, empty, ready states
- Inline editing for quick rename

### Media Library Page Implementation
- Grid view of uploaded images with thumbnails
- Upload button that creates media asset via API
- Alt text and caption inline editing
- Folder view filter (if folders are used)
- Drag-and-drop or file picker upload

---

## Phase 7: Deployment & Verification

### Task
Deploy the blog seed, verify all APIs work end-to-end, and confirm landing page renders correctly.

### Steps

1. **Seed the database**
   ```bash
   cd swalook-node
   bun run src/scripts/seed-blogs.ts --live
   ```

2. **Verify backend API**
   ```bash
   curl http://localhost:8000/api/v1/public/blog/posts
   curl http://localhost:8000/api/v1/public/blog/posts/7-key-factors-for-choosing-salon-crm-software
   ```

3. **Verify landing page locally**
   ```bash
   cd swalook-landing-page
   NEXT_PUBLIC_API_URL=http://localhost:8000 bun run dev
   ```
   - Open `/blogs` — should show 8 posts from API
   - Open `/blog/7-key-factors-for-choosing-salon-crm-software` — should render article

4. **Verify super admin blog**
   ```bash
   cd crm-super-admin
   bun run dev
   ```
   - Open `/admin/blog` — should show dashboard with 8 posts
   - Open `/admin/blog/content` — should list all posts with status

5. **Verify meta tags on article page**
   ```bash
   curl http://localhost:3000/blog/salon-crm-vs-excel | grep -E '<title|<meta name="description|<link rel="canonical|<meta property="og:'
   ```

6. **Build production bundle**
   ```bash
   cd swalook-landing-page
   bun run build  # static export
   ```

---

## 12. Implementation Status

| Phase | Status | Owner | Notes |
|-------|--------|-------|-------|
| 1. Seed Database | Not started | — | Requires DB connection + migration check |
| 2. API Client | Not started | — | Create `lib/blog-public.ts` |
| 3. Dynamic Listing | Not started | — | Modify `/app/blogs/page.js` |
| 4a. Dynamic Routes | Not started | — | Create `app/blog/[slug]/page.js` |
| 4b. BlockRenderer | Not started | — | Create `components/blog/BlockRenderer.js` |
| 4c. Delete static files | Not started | — | Remove 4 static slug directories |
| 5a. Sitemap | Not started | — | Add dynamic blog URLs |
| 5b. RSS feed | Not started | — | Create `app/feed.xml/route.js` |
| 6a. Taxonomy page | Not started | — | Super admin cat/tag mgmt |
| 6b. Media library | Not started | — | Super admin image upload |
| 7. Verification | Not started | — | Backend + frontend + admin |

---

## Agentic Prompt Context for Each Phase

### Phase 1 Context: Seed Database
```
You are implementing Phase 1 of the Blog CMS production plan.
Read the file BLOG-CMS-PLAN.md sections 1-4 for full context.

Files to read:
- swalook-node/src/scripts/seed-blogs.ts
- swalook-node/src/services/blog.service.ts
- swalook-node/drizzle.config.ts
- swalook-node/package.json (for scripts)

Tasks:
1. Check if blog tables exist in database (run drizzle:check or query information_schema)
2. If not, generate and run drizzle migrations
3. Verify DATABASE_URL is set in .env
4. Run seed script with --live flag
5. Verify 8 posts, 8 categories, 19 tags were created

The seed script creates 8 posts, 8 categories, and 19 tags.
It auto-converts markdown content to JSON content_blocks.
Duplicates are skipped (checks slug uniqueness).
```

### Phase 2 Context: Landing Page API Client
```
You are implementing Phase 2 of the Blog CMS production plan.
Read BLOG-CMS-PLAN.md sections 1-4 for full context.

Files to read:
- swalook-landing-page/.env.example
- swalook-landing-page/components/blog/blogData.js
- swalook-super-admin/apps/web/lib/blog-api.ts (reference)

Files to create:
- swalook-landing-page/lib/blog-public.ts

Tasks:
1. Create typed API client with fetchPublishedPosts() and fetchPostBySlug()
2. API_ROOT from NEXT_PUBLIC_API_URL env var
3. All functions must have error handling + timeout
4. Return null/empty fallback on failure (never throw)
5. Types must match the DB schema (see BLOG-CMS-PLAN.md section 2)
6. Categories and tags are M2M — include their names in the response
```

### Phase 3 Context: Dynamic Blog Listing
```
You are implementing Phase 3 of the Blog CMS production plan.
Read BLOG-CMS-PLAN.md sections 1-4 for full context.

Files to read:
- swalook-landing-page/app/blogs/page.js
- swalook-landing-page/components/blog/blogData.js
- swalook-landing-page/components/blog/BlogPostGrid.js
- swalook-landing-page/components/blog/BlogCategoryTabs.js
- swalook-landing-page/components/blog/BlogSidebarRail.js

Files to modify:
- swalook-landing-page/app/blogs/page.js

Tasks:
1. Replace static blogPosts import with API fetch
2. Replace static blogCategories import with API categories fetch
3. Add loading state (skeleton grid while fetching)
4. Add error state (fall back to static blogData.js)
5. Wire category filter to API query param
6. Must maintain existing UI/UX exactly
```

### Phase 4 Context: Dynamic Blog Articles + BlockRenderer (CRITICAL)
```
You are implementing Phase 4 of the Blog CMS production plan.
This is the most important phase. Read BLOG-CMS-PLAN.md sections 1-4 for full context.

Files to DELETE (permanently):
- app/7-key-factors-for-choosing-salon-crm-software/
- app/why-salons-fall-behind-without-crm-software/
- app/the-importance-of-integrated-marketing/
- app/how-to-automate-your-salon-marketing-with-swalook/
WARNING: These contain the original article content. Before deleting,
verify that the seed script (Phase 1) successfully inserted all content
into the database, or copy the content to blogData.js as fallback.

Files to create:
- app/blog/[slug]/page.js — Dynamic server component with:
  - generateMetadata() pulling from DB seoTitle, seoDescription, canonicalUrl, ogImage, publishedAt
  - getPost() that fetches from API, falls back to blogData.js
  - Renders BlockRenderer with post.contentBlocks
- components/blog/BlockRenderer.js — Must handle ALL block types:
  heading (level 2,3,4), paragraph, list (ordered/unordered), quote,
  callout (info/warning/success), image, code, divider, highlight
  Each block type must use semantic HTML for SEO.
- components/blog/BlockRenderer.module.css

Files to read (for component pattern reference):
- app/the-importance-of-integrated-marketing/page.js
- components/blog/BlogPostLayout.js
- components/blog/BlogJsonLd.js

IMPORTANT: The existing BlogPostLayout component is a 'use client' component.
The dynamic route page is a server component. BlogPostLayout must remain
a client component (it handles interactive elements).
```

### Phase 5 Context: Sitemap
```
You are implementing Phase 5 of the Blog CMS production plan.
Read BLOG-CMS-PLAN.md sections 1-4 for full context.

Files to read:
- swalook-landing-page/app/sitemap.js
- swalook-landing-page/app/robots.js

Files to modify:
- swalook-landing-page/app/sitemap.js

Tasks:
1. Fetch published posts from API
2. Append each post's URL to sitemap
3. Include each post's publishedAt as lastmod date
4. Handle API failure — fall back to static list
5. robots.js already correct — verify it
```

### Phase 6 Context: Super Admin Taxonomy + Media Pages
```
You are implementing Phase 6 of the Blog CMS production plan.
Read BLOG-CMS-PLAN.md sections 1-4 for full context.

Files to read:
- crm-super-admin/apps/web/lib/blog-api.ts — all needed API functions exist
- crm-super-admin/apps/web/app/admin/blog/page.tsx — pattern for layout/header
- crm-super-admin/apps/web/app/admin/blog/content/page.tsx — pattern for table/search
- crm-super-admin/apps/web/components/ui/ — reusable components

Files to create:
- crm-super-admin/apps/web/app/admin/blog/taxonomy/page.tsx
- crm-super-admin/apps/web/app/admin/blog/media/page.tsx

Taxonomy page requirements:
- Two panel layout: categories (left) + tags (right)
- Create form with name input + submit
- List with edit (inline) + delete (with confirmation)
- Loading / error / empty / ready states via AdminAsyncStateBanner

Media page requirements:
- Grid of image thumbnails with alt text
- Upload button
- Alt text + caption editing
- Delete with confirmation
- Folder filter if applicable
```

### Phase 7 Context: Verification
```
You are implementing Phase 7 of the Blog CMS production plan.
Read BLOG-CMS-PLAN.md sections 1-4 for full context.

Tasks:
1. Run backend seed: cd swalook-node && bun run src/scripts/seed-blogs.ts --live
2. Verify backend API: curl /api/v1/public/blog/posts returns 8 posts
3. Verify landing page: open /blogs shows all 8, open /blog/:slug renders article
4. Verify super admin: open /admin/blog shows dashboard with data
5. Verify meta tags: curl article page and check title, description, canonical, OG
6. Build production: bun run build succeeds
```

---

## File Reference Map

| File | Repo | Purpose |
|------|------|---------|
| `src/db/schema.ts` | swalook-node | Blog table definitions (bottom of file) |
| `src/services/blog.service.ts` | swalook-node | All blog business logic |
| `src/routes/blog.routes.ts` | swalook-node | Admin route registration |
| `src/routes/blog-public.routes.ts` | swalook-node | Public route registration |
| `src/controllers/blog.controller.ts` | swalook-node | Request handlers |
| `src/scripts/seed-blogs.ts` | swalook-node | 8-post seed script |
| `src/index.ts` (lines 139-143) | swalook-node | Route mounting |
| `apps/web/lib/blog-api.ts` | crm-super-admin | Full typed API client |
| `apps/web/app/admin/blog/page.tsx` | crm-super-admin | Dashboard |
| `apps/web/app/admin/blog/content/page.tsx` | crm-super-admin | Content library |
| `apps/web/app/admin/blog/content/[postId]/page.tsx` | crm-super-admin | Block editor |
| `.env.example` | swalook-landing-page | NEXT_PUBLIC_API_URL config |
| `app/blogs/page.js` | swalook-landing-page | Blog listing (static — needs Ph3) |
| `app/sitemap.js` | swalook-landing-page | Sitemap (static — needs Ph5) |
| `components/blog/blogData.js` | swalook-landing-page | Static data (will become fallback) |
| `components/blog/BlogPostLayout.js` | swalook-landing-page | Article layout (client component) |
| `components/blog/BlogJsonLd.js` | swalook-landing-page | JSON-LD schema (already built) |
| `components/blog/BlogPostGrid.js` | swalook-landing-page | Grid renderer (accepts posts array) |
| `components/blog/BlogCategoryTabs.js` | swalook-landing-page | Category filter |
| `components/blog/BlogHero.js` | swalook-landing-page | Hero section |
| `components/blog/BlogSidebarRail.js` | swalook-landing-page | Sidebar |
| `render.yaml` | swalook-node | Backend deploy config |
| `render.yaml` | swalook-landing-page | Static site deploy config |
