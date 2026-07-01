# Blog Migration & Content Quality Plan — July 2026

> **Date:** 2026-07-01  
> **Goal:** Migrate all 8 blogs to the backend DB, make every post 1,500+ words, validate through Super Admin, and establish a block schema that is backend-transferable JSON

---

## 1. Current State Assessment

### Blog Inventory (8 Total)

| # | Title | Words | Status | Source |
|---|-------|-------|--------|--------|
| 1 | 7 Key Factors for Choosing Salon CRM Software | 1,802 ✅ | Rendered via blogData.js | blogData.js |
| 2 | Why Salons Need CRM Software: Swalook Solutions | 1,665 ✅ | Rendered via blogData.js | blogData.js |
| 3 | Integrated Marketing for Salons with Swalook CRM | 1,669 ✅ | Rendered via blogData.js | blogData.js |
| 4 | How to Automate Your Salon Marketing with Swalook | 1,688 ✅ | Rendered via blogData.js | blogData.js |
| 5 | Salon CRM vs Excel — Why Spreadsheets Can't Scale | 206 ❌ | seed-blogs.ts only | seed-blogs.ts |
| 6 | How to Reduce Salon No-Shows in India | 173 ❌ | seed-blogs.ts only | seed-blogs.ts |
| 7 | Salon Billing Software Explained — GST, Commissions, Clean Accounts | 192 ❌ | seed-blogs.ts only | seed-blogs.ts |
| 8 | Salon Marketing Guide India — Real Strategies That Work | 174 ❌ | seed-blogs.ts only | seed-blogs.ts |

### Architecture Triangle

```
SUPER ADMIN (Editor)         BACKEND (API/DB)           LANDING PAGE (Renderer)
┌───────────────────┐       ┌──────────────────┐       ┌─────────────────────┐
│ BlogEditorPage.tsx │──────→│ blogPosts table  │←──────│ blog/[slug]/page.js │
│ 8 block types     │  POST │ contentBlocks     │  GET  │ BlockRenderer.js     │
│ CRUD + publish    │       │ (JSON column)     │       │ 8 block types       │
│ SEO meta fields   │       │ Revisions table   │       │ + highlight type    │
│ Category/Tag mgmt │       │ Media assets      │       │ BlogJsonLd          │
└───────────────────┘       └──────────────────┘       └─────────────────────┘
         ↑                           ↑                          ↑
         │    Current gap:           │                          │
         │    4 thin posts           │   Current gap:           │
         │    not in backend         │   blogData.js fallback   │
         │                           │   bypasses API entirely  │
```

---

## 2. Unified Content Block Schema (Backend-Transferable JSON)

### Core Block Types — Supported by ALL THREE layers

The following 8 block types are already fully supported by the editor, the backend DB schema, and the frontend renderer. **These are the safe, immediately-transferable types.**

```json
{
  "contentBlocks": [
    {
      "id": "block-1719849600000-1",
      "type": "heading",
      "data": { "level": 2, "text": "Why Salons Need CRM Software" }
    },
    {
      "id": "block-1719849600000-2",
      "type": "paragraph",
      "data": { "text": "Manual salon management leads to..." }
    },
    {
      "id": "block-1719849600000-3",
      "type": "list",
      "data": { "style": "unordered", "items": ["Item 1", "Item 2"] }
    },
    {
      "id": "block-1719849600000-4",
      "type": "quote",
      "data": { "text": "Increasing retention by 5%...", "cite": "Bain & Company" }
    },
    {
      "id": "block-1719849600000-5",
      "type": "callout",
      "data": { "variant": "info", "title": "Quick take", "text": "The best CRM..." }
    },
    {
      "id": "block-1719849600000-6",
      "type": "divider",
      "data": {}
    },
    {
      "id": "block-1719849600000-7",
      "type": "image",
      "data": {
        "src": "https://swalook.in/images/blog-crm-guide.svg",
        "alt": "7 key factors for choosing salon CRM software",
        "caption": "The 7 essential factors",
        "width": 800,
        "height": 450
      }
    },
    {
      "id": "block-1719849600000-8",
      "type": "code",
      "data": { "language": "javascript", "code": "console.log('hello');" }
    }
  ]
}
```

### Extended Block Types — ONLY in Editor + Backend (not yet in renderer)

These 6 additional block types exist in the editor's `BLOCK_TYPES` array. They need matching renderer components in `BlockRenderer.js`:

```json
{
  "type": "cta",
  "data": {
    "title": "Ready to get started?",
    "text": "Book a free demo with Swalook's team.",
    "buttonLabel": "Book Free Demo",
    "buttonHref": "/book-demo"
  }
}
```

### Migration-Ready JSON Document (Full Post)

```json
{
  "title": "7 Key Factors When Choosing Salon CRM Software",
  "slug": "7-key-factors-for-choosing-salon-crm-software",
  "excerpt": "A complete guide to the 7 essential factors for choosing salon CRM software.",
  "contentType": "guide",
  "status": "published",
  "featured": true,
  "seoTitle": "7 Key Factors When Choosing Salon CRM Software | Swalook Guide",
  "seoDescription": "A complete guide to the 7 essential factors for choosing salon CRM software — client retention, marketing automation, billing, inventory, analytics, scalability, and more.",
  "coverImage": "https://swalook.in/images/blog-crm-guide.svg",
  "ogImage": "https://swalook.in/images/blog-crm-guide.svg",
  "canonicalUrl": "https://swalook.in/blog/7-key-factors-for-choosing-salon-crm-software",
  "readingTimeMinutes": 12,
  "categories": ["Salon CRM & Software Guide"],
  "tags": ["salon CRM", "salon software", "Indian salon"],
  "contentBlocks": [
    {
      "id": "block-1",
      "type": "paragraph",
      "data": { "text": "Choosing the right CRM for your salon..." }
    }
  ]
}
```

**This JSON is directly POST-able to:** `POST /api/v1/admin/blog/posts`  
**And directly renderable by:** `BlockRenderer.js` with the 8 existing block types.

---

## 3. Super Admin Editor — Current Block Types

The editor at `crm-super-admin/apps/web/app/admin/blog/content/[postId]/page.tsx` already supports:

| Block | Editor Has It | Backend Stores It | Renderer Displays It | Gap |
|-------|:---:|:---:|:---:|:---:|
| heading (H2/H3/H4) | ✅ | ✅ | ✅ | No H1 support in editor |
| paragraph | ✅ | ✅ | ✅ | None |
| list (ordered/unordered) | ✅ | ✅ | ✅ | No nested lists |
| quote | ✅ | ✅ | ✅ | None |
| callout (info/warning/success) | ✅ | ✅ | ✅ | Renderer has 4 variants, editor has 3 |
| divider | ✅ | ✅ | ✅ | None |
| image | ✅ | ✅ | ✅ | Missing width/height in renderer |
| code | ✅ | ✅ | ✅ | None |
| **highlight** | ❌ | ❌ | ✅ | Editor cannot create, renderer displays |
| **cta** | ❌ | ❌ | ❌ | Not implemented anywhere yet |
| **faq** | ❌ | ❌ | ❌ | Not implemented anywhere yet |

### Required Fix: Add `highlight` block type to editor

Add to the `BLOCK_TYPES` array in `BlogEditorPage.tsx`:
```js
{ type: "highlight", label: "Highlight", icon: Highlighter, defaultData: { label: "", text: "" } },
```

---

## 4. Migration Plan — Phase 1: Move All 8 Posts to Backend DB

### Step 1.1: Convert 4 blogData.js posts to JSON blocks

Each of the 4 rich posts in `blogData.js` has `contentBlocks` already in the correct schema. Extract them directly.

**Script:** `/home/odoo/Development/swalook/swalook-node/src/scripts/migrate-blogdata-to-db.ts`

What it does:
1. Reads `blogData.js` (or its exported JSON)
2. For each post, calls `blogService.createPost()` + `blogService.publishPost()`
3. Creates categories (`Salon CRM & Software Guide`, `CRM Benefits for Salons`, etc.)
4. Tags each post appropriately
5. Logs success/failure for each

### Step 1.2: Convert 4 seed-only posts to JSON blocks with enriched content

Current state: seed posts have 126-239 words. Need to **expand to 1,500+ words**.

For each of the 4 posts, the `seed-blogs.ts` file has markdown that generates thin content blocks via `mdToBlocks()`. Instead, write proper `contentBlocks` arrays matching the schema.

**Expansion targets:**

| Seed Post | Current Words | Target Words | New Blocks Needed |
|-----------|:---:|:---:|:---|
| Salon CRM vs Excel | 206 | 1,500+ | 6-8 paragraphs, 2 callouts, 2 lists, 1 image |
| Reduce No-Shows India | 173 | 1,500+ | Same pattern |
| Salon Billing Software | 192 | 1,500+ | Same pattern |
| Salon Marketing Guide India | 174 | 1,500+ | Same pattern |

**Writing approach:** Use the existing seed content as the outline, then flesh out each section with:
- An opening paragraph (50-70 words setting up the problem)
- 3-5 body paragraphs per H2 section (80-120 words each)
- A callout or statistic embed for credibility
- A closing paragraph with CTA
- 1 image per blog with alt text
- 2-3 contextual internal links to feature pages

### Step 1.3: Verify end-to-end flow

1. `POST /api/v1/admin/blog/posts` with full JSON payload → 200, returns post with id
2. `GET /api/v1/public/blog/posts/:slug` → 200, returns blocks
3. Landing page `blog/[slug]/page.js` fetches from API → renders correctly
4. Sitemap includes all 8 slugs at priority 0.8

### Step 1.4: Keep blogData.js as cold-start fallback ONLY

Don't delete it — the landing page should try API first, then fallback to static data. But add the 4 missing posts to `blogData.js` so they render even if API is down.

---

## 5. Image Strategy — Static Now, Firebase Later

### Current State
- Images live at `https://swalook.in/images/blog-*.svg` (static repo files)
- `blogMediaAssets` table supports full upload pipeline with status tracking
- Editor accepts URL strings for `coverImage` and image block `src`

### Phase A (Now): Static Images
```json
{
  "coverImage": "https://swalook.in/images/blog-crm-guide.svg",
  "contentBlocks": [
    {
      "type": "image",
      "data": {
        "src": "https://swalook.in/images/blog-crm-guide.svg",
        "alt": "Description here",
        "caption": "Optional caption"
      }
    }
  ]
}
```
- Upload new blog images (PNG/JPG/WebP) to `swalook-landing-page/public/images/`
- Reference them as `https://swalook.in/images/blog-filename.svg`
- Keep images small (<200KB) with descriptive filenames

### Phase B (Future): Firebase/S3
When the decision to move to Firebase is made, the flow is:
1. Upload to Firebase Storage → get `publicUrl`
2. Create `blogMediaAssets` record via `POST /api/v1/admin/blog/media`
3. Use returned `publicUrl` in block data
4. Update `coverImage` and `ogImage` fields concurrently

**No schema changes needed** — the `contentBlocks[].data.src` field is a string URL regardless of storage backend.

---

## 6. Content Expansion Playbook — Getting from <200 Words to 1,500+ Words

For each of the 4 thin seed posts, use this template to expand:

### Structure Template (1,500+ words)

```json
[
  { "type": "paragraph", "data": { "text": "Problem intro — 80-100 words hooking the reader" } },
  { "type": "callout", "data": { "variant": "info", "title": "Quick fact", "text": "Key statistic that proves the problem exists" } },
  { "type": "heading", "data": { "level": 2, "text": "The Core Issue" } },
  { "type": "paragraph", "data": { "text": "120-150 words explaining the problem in detail" } },
  { "type": "paragraph", "data": { "text": "120-150 words with real-world example" } },
  { "type": "image", "data": { "src": "https://swalook.in/images/blog-related-image.svg", "alt": "Relevant description", "caption": "What this shows" } },
  { "type": "heading", "data": { "level": 3, "text": "Sub-section of the core issue" } },
  { "type": "paragraph", "data": { "text": "100-120 words" } },
  { "type": "list", "data": { "style": "unordered", "items": ["Point 1 with explanation", "Point 2 with explanation", "Point 3 with explanation"] } },
  { "type": "heading", "data": { "level": 2, "text": "How Swalook Solves This" } },
  { "type": "paragraph", "data": { "text": "120-150 words" } },
  // Internallink: "Swalook's [feature page](https://swalook.in/salon-crm-features) addresses this"
  { "type": "heading", "data": { "level": 2, "text": "Step-by-Step Implementation" } },
  { "type": "paragraph", "data": { "text": "100 words" } },
  { "type": "list", "data": { "style": "ordered", "items": ["Step 1", "Step 2", "Step 3", "Step 4"] } },
  { "type": "callout", "data": { "variant": "success", "title": "Pro tip", "text": "Real actionable advice" } },
  { "type": "heading", "data": { "level": 2, "text": "Measuring Results" } },
  { "type": "paragraph", "data": { "text": "80-120 words on metrics/KPIs" } },
  { "type": "heading", "data": { "level": 2, "text": "Getting Started with Swalook" } },
  { "type": "paragraph", "data": { "text": "80-100 words CTA to book demo or start trial" } },
  { "type": "paragraph", "data": { "text": "Include: 'Ready to get started? Book a free demo at swalook.in/book-demo or start your 14-day free trial at swalook.in/free-trial.'" } }
]
```

This template produces approximately 1,500 words with:
- 1 callout block
- 1 image block with alt text
- 2 heading blocks (1 H2 + 1 H3 — adds heading hierarchy depth)
- 2 list blocks (1 ordered + 1 unordered)
- 8-10 paragraph blocks
- 1 contextual internal link to feature page
- 1 CTA in the conclusion

---

## 7. Validation Rules for Super Admin

Currently, the editor validates:
- ✅ Title is required
- ✅ Slug is required
- ✅ Excerpt is required
- ✅ Cover image recommended
- ✅ At least one category required
- ✅ Content blocks non-empty
- ✅ SEO title ≤ 120 chars
- ✅ SEO description ≤ 300 chars

**Add these validations (in `getPublishValidationErrors()`):**

```ts
// 1. Word count minimum (1,500)
function getWordCount(blocks: BlockData[]): number {
  return blocks
    .filter(b => ["paragraph", "heading", "quote", "callout", "highlight", "list"].includes(b.type))
    .reduce((sum, b) => {
      const text = [
        b.data.text || "",
        b.data.title || "",
        ...(Array.isArray(b.data.items) ? b.data.items : []),
      ].join(" ");
      return sum + text.split(/\s+/).filter(Boolean).length;
    }, 0);
}

if (getWordCount(post.contentBlocks) < 1500) {
  errors.push(`Word count must be at least 1,500 (current: ${getWordCount(post.contentBlocks)})`);
}

// 2. At least 1 image in content blocks
const imageCount = (post.contentBlocks || []).filter(b => b.type === "image").length;
if (imageCount < 1) {
  errors.push("At least 1 image block is required in the content");
}

// 3. At least 1 internal link
const allText = (post.contentBlocks || [])
  .filter(b => b.data?.text)
  .map(b => b.data.text)
  .join(" ");
const hasInternalLink = /swalook\.in\/(?!images)/.test(allText) || /\/(salon-|blog|book-demo|free-trial)/.test(allText);
if (!hasInternalLink) {
  errors.push("At least 1 internal link to a Swalook feature page is required");
}

// 4. At least 1 H3 sub-heading (for heading hierarchy depth)
const headingBlocks = (post.contentBlocks || []).filter(b => b.type === "heading");
const hasH3 = headingBlocks.some(b => b.data.level === 3);
if (!hasH3) {
  errors.push("At least 1 H3 sub-heading is recommended for proper heading hierarchy");
}

// 5. All images must have alt text
const imagesMissingAlt = (post.contentBlocks || []).filter(
  b => b.type === "image" && !b.data.alt?.trim()
);
if (imagesMissingAlt.length > 0) {
  errors.push(`All images must have alt text (${imagesMissingAlt.length} image(s) missing)`);
}

// 6. Cover image required
if (!post.coverImage?.trim()) {
  errors.push("Cover image is required");
}
```

### Validation Summary Table

| Rule | Current | Target | Severity |
|------|---------|--------|----------|
| Word count ≥ 1,500 | ❌ | ✅ Block publish | Critical |
| At least 1 image in blocks | ❌ | ✅ Block publish | High |
| All images have alt text | ❌ | ✅ Block publish | High |
| At least 1 internal link | ❌ | ✅ Warning / block | High |
| At least 1 H3 heading | ❌ | ✅ Warning | Medium |
| Cover image required | ⚠️ Warning | ✅ Required | Medium |
| SEO title 50-65 chars | ❌ | ✅ Warning | Medium |
| SEO description 120-160 chars | ❌ | ✅ Warning | Medium |

---

## 8. Block Renderer Enhancements Needed

### Add width/height to image rendering (fix CLS)

Current BlockRenderer image renderer lacks `width` and `height` attributes:

```jsx
// BEFORE — causes CLS
<img src={src} alt={data.alt || ""} loading="lazy" />

// AFTER — prevents CLS
<img 
  src={src} 
  alt={data.alt || ""} 
  width={data.width || 800} 
  height={data.height || 450} 
  loading="lazy" 
  decoding="async" 
/>
```

### Add CTA block type to renderer

```jsx
case "cta": return renderCta(block.data, key);

function renderCta(data, key) {
  return (
    <div key={key} className={styles.cta}>
      <h3>{d(data.title)}</h3>
      {data.text && <p>{d(data.text)}</p>}
      {data.buttonLabel && data.buttonHref && (
        <a href={data.buttonHref} className={styles.ctaButton}>
          {d(data.buttonLabel)}
        </a>
      )}
    </div>
  );
}
```

### Add FAQ block type to renderer

```jsx
case "faq": return renderFaq(block.data, key);

function renderFaq(data, key) {
  return (
    <details key={key} className={styles.faq}>
      <summary>{d(data.question)}</summary>
      <p>{d(data.answer)}</p>
    </details>
  );
}
```

---

## 9. Sitemap & Robots — Post-Migration Updates

### Update `app/sitemap.js` to add all 8 posts
```js
const blogPosts = [
  { path: '/blog/7-key-factors-for-choosing-salon-crm-software', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/why-salons-fall-behind-without-crm-software', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/the-importance-of-integrated-marketing', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/how-to-automate-your-salon-marketing-with-swalook', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/salon-crm-vs-excel', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/how-to-reduce-salon-no-shows-india', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/salon-billing-software-explained', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
  { path: '/blog/salon-marketing-guide-india', priority: '0.8', changefreq: 'weekly', lastModified: '2026-07-01' },
];
```

### Update `scripts/generate-sitemap.mjs` static slugs array
Add the 4 seed-only slugs to `STATIC_SLUGS`.

---

## 10. Implementation Roadmap

### Week 1: Backend Migration & Content Expansion

| Day | Task | Files | Owner |
|-----|------|-------|-------|
| Day 1-2 | Write migration script for blogData.js → DB | `swalook-node/src/scripts/migrate-blogdata-to-db.ts` | Backend |
| Day 2-3 | Expand 4 thin seed posts to 1,500+ words each with full block JSON | `swalook-node/src/scripts/seed-blogs.ts` (update POSTS array) | Content |
| Day 3-4 | Write migration script for seed posts → DB | Same migration script | Backend |
| Day 4 | Run migrations, verify all 8 posts accessible via public API | — | QA |
| Day 5 | Add 4 missing posts to `blogData.js` as cold-start fallback | `swalook-landing-page/components/blog/blogData.js` | Frontend |

### Week 2: Super Admin Validation & Editor Updates

| Day | Task | Files | Owner |
|-----|------|-------|-------|
| Day 1-2 | Add 6 validation rules to `getPublishValidationErrors()` | `crm-super-admin/apps/web/app/admin/blog/content/[postId]/page.tsx` | Frontend |
| Day 2 | Add `highlight` block type to editor BLOCK_TYPES | Same file | Frontend |
| Day 3 | Add `cta` block type to editor BLOCK_TYPES | Same file | Frontend |
| Day 3 | Add `faq` block type to editor BLOCK_TYPES | Same file | Frontend |
| Day 4 | Add width/height to BlockRenderer image rendering | `swalook-landing-page/components/blog/BlockRenderer.js` | Frontend |
| Day 4 | Add CTA and FAQ renderers to BlockRenderer | Same file | Frontend |

### Week 3: Geo-Targeting, Sitemap & Schema

| Day | Task | Files | Owner |
|-----|------|-------|-------|
| Day 1 | Update robots.txt with Googlebot-Image/News rules | `swalook-landing-page/app/robots.js` | Frontend |
| Day 1 | Add all 8 posts to sitemap at priority 0.8 | `swalook-landing-page/app/sitemap.js` + `scripts/generate-sitemap.mjs` | Frontend |
| Day 2 | Add `lang="en-IN"` to layout | `swalook-landing-page/app/layout.js` | Frontend |
| Day 2 | Add hreflang to layout metadata + blog generateMetadata | `layout.js` + `blog/[slug]/page.js` | Frontend |
| Day 3 | Add BreadcrumbList JSON-LD to blog posts | `blog/[slug]/page.js` or `BlogPostLayout.js` | Frontend |
| Day 3 | Add SoftwareApplication schema to layout | `layout.js` | Frontend |
| Day 4 | Add RSS alternate link to layout `<head>` | `layout.js` | Frontend |

### Week 4: SEO Metadata Fixes & Internal Links

| Day | Task | Files | Owner |
|-----|------|-------|-------|
| Day 1 | Fix Blog 2 seoTitle to include " | Swalook" | `blogData.js` + seed migration | Content |
| Day 2 | Expand seed post descriptions to 150-160 chars | seed migration script | Content |
| Day 3 | Add 2-3 contextual internal links per blog within contentBlocks | seed migration script + blogData.js | Content |
| Day 4 | Add meta robots directives to blog generateMetadata | `blog/[slug]/page.js` | Frontend |

---

## 11. Files Modified Summary

| File | Change Type | What to Change |
|------|:---:|---------------|
| `swalook-node/src/scripts/seed-blogs.ts` | 🔄 Update | Expand 4 posts to 1,500+ words; update their contentBlocks |
| `swalook-node/src/scripts/migrate-blogdata-to-db.ts` | 🆕 Create | Migrate all 8 posts to DB via blogService |
| `swalook-landing-page/components/blog/blogData.js` | 🔄 Update | Add 4 missing posts as cold-start fallback |
| `swalook-landing-page/components/blog/BlockRenderer.js` | 🔄 Update | Add width/height to images; add CTA + FAQ renderers |
| `swalook-landing-page/app/sitemap.js` | 🔄 Update | Add all 8 posts at priority 0.8 |
| `swalook-landing-page/scripts/generate-sitemap.mjs` | 🔄 Update | Add all 8 slugs to STATIC_SLUGS |
| `swalook-landing-page/app/robots.js` | 🔄 Update | Add Googlebot-Image/News rules |
| `swalook-landing-page/app/layout.js` | 🔄 Update | lang="en-IN", hreflang, RSS link, SoftwareApplication schema |
| `swalook-landing-page/app/blog/[slug]/page.js` | 🔄 Update | hreflang, BreadcrumbList schema, robots directives |
| `crm-super-admin/apps/web/app/admin/blog/content/[postId]/page.tsx` | 🔄 Update | Add validation rules + highlight/cta/faq block types |

---

## 12. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|:---:|:---:|-----------|
| API goes down → blogs 404 | Medium | High | blogData.js fallback stays in place |
| Migrated blocks render differently | Low | Medium | Visual QA on all 8 posts after migration |
| Seed-post slugs conflict with existing | Low | High | `ensureUniqueSlug()` in blogService handles this |
| Content expansion misses 1,500-word target | Medium | Low | Measure word count before publishing; enforce in validation |
| Image URLs break after Firebase migration | Low | Medium | Use relative paths in data layer, swap base URL once |
