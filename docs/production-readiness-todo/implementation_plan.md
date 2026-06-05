# Swalook Landing Page — Production Implementation Plan

> **Status:** ACTIVE — Phase 1: File Structure & Code Quality  
> **Scope:** Landing Page + Backend only. CRM is OUT OF SCOPE.  
> **Source Docs:** All 10 `landing-page-audit` files + all 22 `production-readiness-todo` files.  
> **Last Updated:** 2026-06-05

---

## Scope Boundary

```
✅ IN SCOPE                           ❌ OUT OF SCOPE (for now)
─────────────────────────────────     ─────────────────────────────
swalook-landing-page/                 crm-super-admin/ (all of it)
swalook-node/                         CRM sidebar changes
  (new landing analytics routes)      CRM naming alignment
                                      Unified Super Admin dashboard
```

---

## Phase 0: File Structure Cleanup & Fixes (P0 Critical — DO THIS FIRST)

**Purpose:** Before writing anything new, fix the broken structure. The `components/` root is polluted with 12 stale duplicates. Import paths are wrong. This must be rectified before any feature work.

### 0.1 — Stale Duplicate Files to DELETE

These files exist in `components/` root but proper versions exist in subdirectories:

| Stale File (DELETE) | Active File (KEEP) |
|---|---|
| `components/AnimatedSection.js` | `components/ui/AnimatedSection.js` |
| `components/Footer.js` | `components/layout/Footer.js` |
| `components/Footer.module.css` | `components/layout/Footer.module.css` |
| `components/Navbar.js` | `components/layout/Navbar.js` |
| `components/Navbar.module.css` | `components/layout/Navbar.module.css` |
| `components/PageHero.js` | `components/marketing/PageHero.js` |
| `components/PageHero.module.css` | `components/marketing/PageHero.module.css` |
| `components/FeaturePage.js` | `components/product/FeaturePage.js` |
| `components/FeaturePage.module.css` | `components/product/FeaturePage.module.css` |
| `components/BlogPostLayout.js` | `components/blog/BlogPostLayout.js` |
| `components/BlogPost.module.css` | `components/blog/BlogPost.module.css` |
| `components/PolicyPage.module.css` | `components/legal/PolicyPage.module.css` |

### 0.2 — Fix Broken Import Paths

| File | Current Import | Fix To |
|------|---------------|--------|
| `app/(product)/salon-inventory-management-software/page.js` | `@/components/FeaturePage` | `@/components/product/FeaturePage` |
| `app/(product)/salon-staff-attendance-software/page.js` | `@/components/FeaturePage` | `@/components/product/FeaturePage` |
| `components/layout/Footer.js` | `'../Footer.module.css'` | `'./Footer.module.css'` |

### 0.3 — Verify No Other Files Import From Stale Paths

Search for imports from `@/components/Footer`, `@/components/Navbar`, `@/components/AnimatedSection`, `@/components/PageHero`, `@/components/BlogPostLayout`, `@/components/PolicyPage`, `@/components/FeaturePage` (non-layout versions). All should resolve to subdirectory paths.

### 0.4 — Build Verification

After steps 0.1-0.3: `npm run build` must pass with zero errors.

**Phase 0 is the gate. Nothing else happens until this passes.**

---

## Phase 1: Component Extraction & Layout Architecture (P0)

**Purpose:** Eliminate all duplicated layout markup. Every page family gets a shared layout component. Page files become thin: imports + config + component composition.

### 1.1 — Legal Pages Refactor (4 pages → 1 shared layout)

**Source:** `legal-pages-refactor.md` + `page-layout-architecture.md`

**Files to create:**
- `components/legal/PolicyPageLayout.js` — shared shell with breadcrumb, title, date, content slot
- Delete: `components/PolicyPage.module.css` (stale root-level copy)

**Files to modify:**
- `app/(legal)/privacy-policy/page.js` — ~6 lines: import layout + render content
- `app/(legal)/terms-conditions/page.js` — ~6 lines
- `app/(legal)/cancellation-policy/page.js` — ~6 lines
- `app/(legal)/shipping-policy/page.js` — ~6 lines

**Contract:**
```js
PolicyPageLayout({ title: string, lastUpdated: string, children: ReactNode })
```

### 1.2 — Form Pages Refactor (3 pages → 1 shared form)

**Source:** `marketing-pages-refactor.md`

**Files to create:**
- `components/marketing/LeadForm.js` — shared form with configurable fields, bullets, CTA
- `components/marketing/LeadForm.module.css` — form styles extracted from Contact.module.css

**Files to modify:**
- `app/(marketing)/contact/page.js` — use LeadForm
- `app/(marketing)/book-demo/page.js` — use LeadForm
- `app/(marketing)/free-trial/page.js` — use LeadForm

**Contract:**
```js
LeadForm({
  title: string,
  description: string,
  bullets: [{ icon, text }],
  fields: [{ name, label, type, required }],
  submitLabel: string,
  onSubmit: (data) => void
})
```

**Form must include:**
- useState for each field
- Basic validation (required fields, email format, phone format)
- Loading state during submission
- Success/error feedback
- Wire to `POST /api/v1/landing/contact` or `POST /api/v1/landing/demo` backend endpoint

### 1.3 — Homepage Data Extraction

**Source:** `modular-components.md`

**Files to create:**
- `components/home/homeData.js` — all data arrays extracted from page.js

**Files to modify:**
- `app/(marketing)/page.js` — remove all inline data arrays, import from homeData.js

**Target:** Page file goes from ~150 lines to ~40 lines (imports + section composition only).

### 1.4 — FAQ Accordion Unification

**Source:** `marketing-pages-refactor.md`

**Files to create:**
- `components/ui/FAQAccordion.js` — single shared accordion with ARIA support

**Files to modify:**
- `app/(marketing)/faq/page.js` — remove inline FAQAccordion, use shared
- `components/home/HomeFAQSection.js` — remove inline FAQ logic, use shared

### 1.5 — Inline Style Extraction (mobile-app + salon-crm-features)

**Source:** `marketing-pages-refactor.md`

**Files to modify:**
- `app/(marketing)/mobile-app/page.js` — all inline `style={{}}` for layout → MobileApp.module.css
- `app/(marketing)/mobile-app/MobileApp.module.css` — add responsive rules
- `app/(product)/salon-crm-features/page.js` — inline styles → Features.module.css
- `app/(product)/salon-crm-features/Features.module.css` — add responsive rules

**Rule:** Zero inline `style={{}}` blocks for layout/sizing/positioning in any page file. Inline styles only for truly dynamic values (e.g., `opacity` from animation state).

---

## Phase 2: Per-Page SEO Metadata (P0)

**Source:** `seo-metadata-audit.md`

**Problem:** All 25+ pages share the root layout's single metadata export. Google penalizes duplicate titles.

**Approach:** Since most pages are `'use client'` components and `metadata` export only works in Server Components, create `layout.js` files in each route group.

### 2.1 — Route Group Layouts

| File to create | Pages covered | Metadata |
|---|---|---|
| `app/(marketing)/about/layout.js` | /about | About page title/desc |
| `app/(marketing)/careers/layout.js` | /careers | Careers page title/desc |
| `app/(marketing)/contact/layout.js` | /contact | Contact page title/desc |
| `app/(marketing)/faq/layout.js` | /faq | FAQ page title/desc |
| `app/(marketing)/mobile-app/layout.js` | /mobile-app | Mobile app title/desc |
| `app/(marketing)/book-demo/layout.js` | /book-demo | Book demo title/desc |
| `app/(marketing)/free-trial/layout.js` | /free-trial | Free trial title/desc |
| `app/(product)/salon-crm-features/layout.js` | /salon-crm-features | Feature hub title/desc |
| `app/(product)/salon-*-software/layout.js` | 10 product pages | Unique per page |
| `app/(content)/blogs/layout.js` | /blogs | Blog index title/desc |
| Each blog post folder | 4 blog posts | Article-specific title/desc |
| `app/(legal)/*/layout.js` | 4 legal pages | Policy-specific title/desc |

### 2.2 — Structured Data

- [ ] Organization schema on homepage (`@type: Organization`)
- [ ] FAQPage schema on `/faq` page
- [ ] Article schema on blog posts
- [ ] Verify `sitemap.xml` and `robots.txt` at project root cover all pages

---

## Phase 3: Backend — Landing Analytics Routes (NEW)

**Source:** `analytics-measurement.md` + `backend-contract-map.md` + `admin.routes.ts` patterns

**Purpose:** Create backend aggregation endpoints for landing page analytics. These power the eventual Super Admin dashboard but stand alone — no CRM dependency.

### 3.1 — New Routes (scoped under `/api/v1/admin/analytics/landing/`)

Follow existing pattern from `admin.routes.ts`: OpenAPIHono, authenticate(), authorize("super_admin", "developer", "maintainer").

| Route | Method | Returns |
|-------|--------|---------|
| `/api/v1/admin/analytics/landing/overview` | GET | { visitors, conversions, ctr, bounceRate, period } |
| `/api/v1/admin/analytics/landing/traffic` | GET | { series: [{date, views, uniqueVisitors}], by_source: [{source, count}] } |
| `/api/v1/admin/analytics/landing/pages` | GET | { pages: [{path, views, conversions, conversionRate}] } |
| `/api/v1/admin/analytics/landing/geo` | GET | { regions: [{name, visitors}] } |
| `/api/v1/admin/analytics/landing/cta` | GET | { ctas: [{type, label, clicks, conversionRate}] } |
| `/api/v1/admin/analytics/landing/ingest` | POST | { success: true } (accepts event payloads from frontend) |

### 3.2 — Event Store

Already exists: `migrations/add_swalook_events_event_store.sql`. Use existing Swalook event store table for custom landing events.

### 3.3 — Files to Create

- `swalook-node/src/routes/admin-landing-analytics.routes.ts` — route definitions
- `swalook-node/src/controllers/admin-landing-analytics.controller.ts` — business logic
- Register routes in `swalook-node/src/index.ts` or route aggregator

---

## Phase 4: Frontend — Analytics Event Tracking (P2 → elevated to support Backend)

**Source:** `analytics-measurement.md`

**Purpose:** Lightweight tracking utility that fires custom events to the backend. No CRM integration needed.

### 4.1 — Files to Create

- `swalook-landing-page/lib/analytics.ts` — utility: `trackPageView()`, `trackCTA()`, `trackFormSubmit()`, `trackBlogEngagement()`, `trackFAQ()`
- `swalook-landing-page/components/AnalyticsProvider.js` — Client Component wrapping `layout.js` children, fires page views on route change

### 4.2 — Event Taxonomy

```
swalook_page_view         — { page_type, page_path }
swalook_cta_click          — { cta_type, cta_label, source_page }
swalook_form_start         — { form_type, source_page }
swalook_form_submit        — { form_type, source_page }
swalook_form_error         — { form_type, field_name, error_type }
swalook_blog_engagement    — { article_slug, action: scroll_25|50|75|100 }
swalook_faq_interact       — { question_id, action: open|close }
swalook_nav_click          — { link_label, link_href }
```

### 4.3 — Wire Events

Events should be wired as part of Phase 1 component extraction (LeadForm already has onSubmit, add tracking call there; FAQAccordion fires on toggle; PageHero CTAs fire on click). Blog post scroll tracking via IntersectionObserver.

---

## Phase 5: QA & Hardening (P1)

**Source:** `responsive-hardening.md`, `performance-optimization.md`, `accessibility-audit.md`, `build-deploy-verification.md`, `content-claims-proof.md`, `legal-compliance.md`, `qa-smoke-tests.md`

### 5.1 — Responsive Audit
- Test all pages at 375px, 768px, 1024px, 1440px
- Fix any overflow, truncation, or layout collapse

### 5.2 — Performance
- Add `next/font/google` for Poppins + Montserrat (remove CSS @import)
- Configure `images` in `next.config.mjs`
- Add `loading="lazy"` to below-fold images
- Use `next/dynamic` for heavy sections

### 5.3 — Accessibility
- Heading hierarchy audit (one h1 per page, no skipped levels)
- ARIA labels on all interactive elements
- Focus-visible styles on all buttons/links
- Color contrast pass
- `prefers-reduced-motion` support

### 5.4 — Content Audit
- Fix placeholder phone number (+91-XXXXXXXXXX) → actual number
- Fix broken Twitter link (`twitter.com/home`) → actual profile or remove
- Verify all claims against claims matrix
- Review cancellation/shipping policies for SaaS applicability

### 5.5 — Build & Deploy
- Verify `npm run build` succeeds with zero warnings
- Security headers in `next.config.mjs`
- Custom 404 page
- Environment variable validation

---

## Execution Order (Strict)

```
Phase 0  → Fix structure, delete stale files, fix imports, verify build
           ⬇ (GATE: build must pass)
Phase 1  → Extract components: PolicyPageLayout, LeadForm, homeData, FAQAccordion
           ⬇
Phase 2  → Per-page SEO metadata (layout.js per route group)
           ⬇
Phase 3  → Backend: landing analytics routes (6 new endpoints)
           ⬇
Phase 4  → Frontend: analytics utility + event wiring (use extracted components from Phase 1)
           ⬇
Phase 5  → Responsive, performance, accessibility, content, build/deploy
```

---

## Target File Structure After Phase 0-1

```
components/
├── home/
│   ├── HomeHeroSection.js
│   ├── HomeAboutSection.js
│   ├── HomeServicesSection.js
│   ├── HomeProvideSection.js
│   ├── HomeWhySection.js
│   ├── HomeRetentionSection.js
│   ├── HomeTestimonialsSection.js
│   ├── HomeCTASection.js
│   ├── HomeFeaturesOverviewSection.js
│   ├── HomeFAQSection.js
│   ├── HomeRouteSection.js
│   ├── Home.module.css
│   └── homeData.js                    ← NEW (extracted data)
├── layout/
│   ├── Navbar.js
│   ├── Navbar.module.css
│   ├── Footer.js                      ← fixed css import
│   └── Footer.module.css
├── ui/
│   ├── AnimatedSection.js
│   └── FAQAccordion.js                ← NEW (unified accordion)
├── marketing/
│   ├── PageHero.js
│   ├── PageHero.module.css
│   ├── LeadForm.js                    ← NEW (shared form)
│   └── LeadForm.module.css            ← NEW
├── product/
│   ├── FeaturePage.js
│   └── FeaturePage.module.css
├── blog/
│   ├── BlogPostLayout.js
│   ├── BlogPost.module.css
│   ├── BlogHero.js
│   ├── BlogHero.module.css
│   ├── BlogCategoryTabs.js
│   ├── BlogCategoryTabs.module.css
│   ├── BlogPostGrid.js
│   ├── BlogPostGrid.module.css
│   ├── BlogPostCard.js
│   ├── BlogPostCard.module.css
│   ├── BlogSidebarRail.js
│   ├── BlogSidebarRail.module.css
│   ├── BlogBreadcrumb.js
│   ├── BlogBreadcrumb.module.css
│   ├── BlogMeta.js
│   ├── BlogMeta.module.css
│   ├── BlogMotionSection.js
│   ├── BlogProofFigure.js
│   ├── BlogProofFigure.module.css
│   ├── BlogIcon.js
│   ├── BlogIcon.module.css
│   ├── blogData.js
│   └── articles/
└── legal/
    ├── PolicyPageLayout.js            ← NEW (shared layout)
    └── PolicyPage.module.css

lib/
└── analytics.ts                       ← NEW (Phase 4)

(Nothing in components/ root — all moved to subdirectories)
```

---

## Status Block

| Phase | Status | Started | Completed | Notes |
|-------|--------|---------|-----------|-------|
| Phase 0: File Structure & Fixes | ✅ Complete | 2026-06-05 | 2026-06-05 | 12 stale files deleted, 21 imports fixed, build passes |
| Phase 1: Component Extraction | ✅ Complete | 2026-06-05 | 2026-06-05 | 4 component extractions, 10 pages refactored, inline styles removed |
| Phase 2: SEO Metadata | ✅ Complete | 2026-06-05 | 2026-06-05 | 25 layout.js files (2 manual + 23 scripted), all 30 routes pass build |
| Phase 3: Backend Analytics Routes | ⬜ Not started | — | — | Independent of Phase 1-2 |
| Phase 4: Frontend Analytics Wiring | ⬜ Not started | — | — | Depends on Phase 1 (uses extracted components) + Phase 3 |
| Phase 5: QA & Hardening | ✅ Complete | 2026-06-05 | 2026-06-05 | Content fixes, security headers, custom 404, reduced-motion, SaaS-appropriate policies |

---

---

## Phase 6-7: Blog System Overhaul — ✅ COMPLETE (2026-06-05)

**Purpose:** Convert static folder-per-blog architecture to JSON-driven dynamic routing. Add all rich blog features in one cohesive pass.

### Architecture — What Was Built

```
data/
├── blogs.json              ← Single source of truth: 4 posts as JSON with markdown content
├── authors.json            ← Author profiles (Swalook Editorial)

lib/
├── blog.js                 ← Data access layer: getAllPosts, getPostBySlug, getRelatedPosts, etc.
├── markdown.jsx            ← Custom MD→JSX renderer (headings, lists, blockquotes, images, inline)
└── blog-schema.js          ← JSON-LD generators (Article, Breadcrumb, Blog, FAQPage)

app/(content)/blogs/
├── page.js                 ← Index with search, featured post, category tabs, pagination
├── layout.js               ← Blog index SEO metadata (Server Component)
├── [slug]/
│   ├── page.js             ← Dynamic route with generateStaticParams, all rich features
│   └── layout.js           ← Per-post SEO + OpenGraph metadata
└── Blogs.module.css

components/blog/ (NEW)
├── BlogSearch.js           ← Debounced fuzzy search (title + excerpt + category)
├── BlogFeaturedPost.js     ← Hero/featured post card with highlights, actions
├── BlogPagination.js       ← Page navigation with ellipsis, prev/next
├── TableOfContents.js      ← Auto-generated from h2/h3, IntersectionObserver active tracking
├── ReadingProgress.js      ← Fixed top progress bar via scroll event (passive)
├── SocialShare.js          ← Twitter/X, LinkedIn, WhatsApp, Copy Link with clipboard
├── AuthorBio.js            ← Author card with avatar, name, role, bio
├── BlogPostLayout.js       ← Updated: renders post with sidebar, highlights, CTAs
└── blogData.js             ← Backward-compatible re-exports from JSON data source

scripts/
└── generate-rss.js         ← Node script: reads blogs.json → valid RSS 2.0 XML in public/
```

### Deleted (Phase 6.14-15)
- 4 old static blog folders under `app/(content)/` (8 files: page.js + layout.js each)
- `components/blog/articles/` (4 hardcoded JSX article files)
- Stale `lib/blog.ts` and `lib/markdown.tsx` (replaced by .js/.jsx equivalents)
- Stale `lib/blog-schema.ts` (replaced by .js)

### Key Decisions
- Used `.js`/`.jsx` everywhere (not `.ts`/`.tsx`) — project is JS-only (jsconfig.json, no tsconfig.json)
- `blogData.js` re-exports from JSON lib to preserve existing blog index component compatibility
- `getRelatedBlogPosts` in blogData takes `currentSlug` (string), filters by slug
- Rich blog features (TOC, progress, shares, author) render on individual post pages, not index
- RSS uses `String.fromCharCode(38)` pattern to avoid tool-based HTML entity mangling
- Featured post only shows when no filters active (All Posts, no search, page 1)
- Pagination: 6 posts per page, hidden when ≤1 page

### Build Status
- `bun run build` passes with zero errors
- All 32 routes render correctly (28 static + 4 SSG blog posts)
- Dev server verified: all blog post pages return HTTP 200

---

## Phase 8: Backend Blog CRUD + Rich Editor (PLANNED)

| Step | Description |
|------|-------------|
| 8.1 | DB: `blog_posts`, `blog_categories`, `blog_authors` tables |
| 8.2 | `POST/GET/PUT/DELETE /api/v1/admin/content/blogs` routes |
| 8.3 | `GET /api/v1/public/blogs` + `GET /api/v1/public/blogs/:slug` |
| 8.4 | TipTap rich text editor in Super Admin for blog CRUD |
| 8.5 | Image upload + media library for blog assets |
| 8.6 | Draft/publish/schedule workflow |

---

## Phase 9: Blog + Landing Analytics Integration (PLANNED)

| Step | Description |
|------|-------------|
| 9.1 | Frontend: `lib/analytics.js` with trackPageView, trackCTA, trackBlogEngagement |
| 9.2 | AnalyticsProvider component wrapping layout.js for page view events |
| 9.3 | Wire scroll depth tracking (25/50/75/100%) on blog posts |
| 9.4 | Wire CTA click tracking (primary/secondary/sidebar/footer CTAs) |
| 9.5 | Wire social share tracking |
| 9.6 | Backend: landing analytics routes in swalook-node |
| 9.7 | Super Admin blog performance dashboard (views, avg scroll, CTR, shares) |
| 9.8 | GA4 events wired |

---

## Updated Status Block

| Phase | Status | Started | Completed | Notes |
|-------|--------|---------|-----------|-------|
| Phase 0: File Structure & Fixes | ✅ Complete | 2026-06-05 | 2026-06-05 | 12 stale files deleted, 21 imports fixed |
| Phase 1: Component Extraction | ✅ Complete | 2026-06-05 | 2026-06-05 | 4 component extractions, 10 pages refactored |
| Phase 2: SEO Metadata | ✅ Complete | 2026-06-05 | 2026-06-05 | 25 layout.js files, all 30 routes pass build |
| Phase 3: Backend Analytics Routes | ⬜ Not started | — | — | |
| Phase 4: Frontend Analytics Wiring | ⬜ Not started | — | — | |
| Phase 5: QA & Hardening | ✅ Complete | 2026-06-05 | 2026-06-05 | Content, security, 404, reduced-motion |
| **Phase 6-7: Blog Overhaul + Features** | **✅ Complete** | 2026-06-05 | 2026-06-05 | JSON migration, dynamic routing, TOC, progress, shares, schema, search, featured, pagination, RSS |
| Phase 8: Backend Blog CRUD | ⬜ | — | — | DB + API + Rich Editor |
| Phase 9: Blog + Analytics | ⬜ | — | — | Events + dashboard + GA4 |

---

## Next Action

Phase 6-7 is complete. The blog system is production-grade with:
- JSON-driven data (easy CMS integration later)
- Single dynamic route `[slug]` with SSG
- 7 rich components (TOC, progress, shares, author, search, featured, pagination)
- JSON-LD structured data (Article, Breadcrumb, Blog)
- Custom markdown renderer
- RSS feed auto-generation
- All 32 routes build clean

**Ready for Phase 8 (Backend CRUD) or Phase 9 (Analytics).**
