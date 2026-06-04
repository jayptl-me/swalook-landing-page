# Blog Folder Structure Plan

> Status: production refactor proposal  
> Purpose: make the blog system maintainable, reusable, and easy to extend without breaking current URLs.

## 1) Why this plan exists

The current blog implementation is functional, but the structure mixes:
- route files
- article content
- shared UI
- blog navigation
- CTA logic

That makes the system harder to maintain as the content set grows.

This plan keeps public URLs stable while reorganizing the implementation into reusable layers.

---

## 2) Non-negotiable rules

- Do **not** change existing public blog URLs unless a redirect plan exists.
- Do **not** move pages in a way that breaks current routes.
- Do **not** duplicate article UI inside each route page.
- Do **not** mix homepage logic with blog logic.
- Keep article content thin and page-specific.
- Keep shared blog UI in shared components.

---

## 3) Current-state blog route set

### Blog index
- `/blogs`

### Blog article routes
- `/7-key-factors-for-choosing-salon-crm-software`
- `/why-salons-fall-behind-without-crm-software`
- `/the-importance-of-integrated-marketing`
- `/how-to-automate-your-salon-marketing-with-swalook`

These routes should stay live and stable.

---

## 4) Recommended production structure

### 4.1 Route layer
Keep route files in `app/` only for routing and page composition.

Recommended:
- `app/blogs/page.js`
- `app/[article-slug]/page.js` for existing articles only if the team later consolidates routes
- or keep current top-level article route folders if URLs must remain exactly as-is

For now, the safest choice is:
- keep current route folders
- make each `page.js` thin
- move reusable article markup into shared blog templates

### 4.2 Shared blog components
Keep shared blog UI in:

- `components/blog/`

Recommended substructure:
- `components/blog/BlogHero.js`
- `components/blog/BlogPostGrid.js`
- `components/blog/BlogPostCard.js`
- `components/blog/BlogSidebarRail.js`
- `components/blog/BlogCategoryTabs.js`
- `components/blog/BlogBreadcrumb.js`
- `components/blog/BlogMeta.js`
- `components/blog/BlogMotionSection.js`
- `components/blog/BlogIcon.js`
- `components/blog/blogData.js`

Add if the blog grows:
- `components/blog/BlogIndexLayout.js`
- `components/blog/BlogArticleLayout.js`
- `components/blog/BlogArticleCTA.js`
- `components/blog/BlogArticleHighlights.js`

### 4.3 Article content layer
Create a content-only layer for articles so each route file stops carrying large amounts of markup.

Recommended:
- `components/blog/articles/`
  - `components/blog/articles/7-key-factors.js`
  - `components/blog/articles/why-salons-fall-behind-without-crm-software.js`
  - `components/blog/articles/the-importance-of-integrated-marketing.js`
  - `components/blog/articles/how-to-automate-your-salon-marketing-with-swalook.js`

Each file should export:
- article title
- category
- summary
- highlights
- body content
- CTA labels
- metadata

Route pages should import that content and pass it into `BlogPostLayout`.

### 4.4 Layout/template layer
Keep a single article shell:

- `components/BlogPostLayout.js`

If the blog expands, split into:
- `components/blog/BlogArticleLayout.js`
- `components/blog/BlogArticleSidebar.js`
- `components/blog/BlogArticleMeta.js`

The current `BlogPostLayout` can remain the base template for now.

### 4.5 Docs layer
Keep production decisions in:
- `docs/landing-page-audit/production-plan/`

Recommended blog docs:
- `blog-growth-system.md`
- `page-hierarchy.md`
- `blog-folder-structure-plan.md` ← this file
- `launch-qa-checklist.md`
- `measurement-plan.md`

---

## 5) Recommended final folder layout

```txt
swalook-landing-page/
├─ app/
│  ├─ blogs/
│  │  └─ page.js
│  ├─ 7-key-factors-for-choosing-salon-crm-software/
│  │  └─ page.js
│  ├─ why-salons-fall-behind-without-crm-software/
│  │  └─ page.js
│  ├─ the-importance-of-integrated-marketing/
│  │  └─ page.js
│  └─ how-to-automate-your-salon-marketing-with-swalook/
│     └─ page.js
├─ components/
│  ├─ BlogPostLayout.js
│  └─ blog/
│     ├─ blogData.js
│     ├─ BlogBreadcrumb.js
│     ├─ BlogCategoryTabs.js
│     ├─ BlogHero.js
│     ├─ BlogIcon.js
│     ├─ BlogMeta.js
│     ├─ BlogMotionSection.js
│     ├─ BlogPostCard.js
│     ├─ BlogPostGrid.js
│     ├─ BlogSidebarRail.js
│     └─ articles/
│        ├─ 7-key-factors.js
│        ├─ why-salons-fall-behind-without-crm-software.js
│        ├─ the-importance-of-integrated-marketing.js
│        └─ how-to-automate-your-salon-marketing-with-swalook.js
└─ docs/
   └─ landing-page-audit/
      └─ production-plan/
         ├─ blog-growth-system.md
         ├─ page-hierarchy.md
         ├─ launch-qa-checklist.md
         ├─ measurement-plan.md
         └─ blog-folder-structure-plan.md
```

---

## 6) What to refactor first

### Phase 1
- Keep URLs unchanged.
- Remove unnecessary `'use client'` from article route pages that only render static content.
- Keep `/blogs` as the only interactive blog page.
- Keep article routes as thin wrappers around `BlogPostLayout`.

### Phase 2
- Move article content into `components/blog/articles/`.
- Keep `BlogPostLayout` as the reusable shell.
- Keep `blogData.js` as the source for index cards and related-posts.

### Phase 3
- If the article count grows, split article content into:
  - metadata
  - summary/highlights
  - body content
  - related CTAs

### Phase 4
- If route consolidation becomes necessary, introduce redirects before renaming URLs.
- Only then consider a unified route strategy such as a dynamic article route.

---

## 7) File responsibilities

### `app/blogs/page.js`
- Blog index page only
- Filtering/search/navigation
- CTA to product and conversion pages
- No article content

### `app/*article*/page.js`
- Page composition only
- Import content and pass it to the shared layout
- No blog index logic
- No duplicated sidebar logic

### `components/BlogPostLayout.js`
- Shared article shell
- Breadcrumb
- Metadata
- Highlights
- Sidebar
- CTA blocks

### `components/blog/blogData.js`
- Blog cards
- category data
- related route data
- quick routes
- article lookup helpers

### `components/blog/articles/*`
- Article content and page-specific data
- No shared layout code
- No route logic

---

## 8) Migration checklist

- [x] Preserve current public URLs
- [x] Keep blog index and article routes reachable
- [x] Identify reusable blog components
- [ ] Remove unnecessary client directives from static article pages
- [ ] Extract article content into reusable content modules
- [ ] Keep `BlogPostLayout` as the shared shell
- [ ] Validate all article routes after refactor
- [ ] Capture screenshots again after the final structure settles

---

## 9) Production-grade rules for future blog additions

Every new blog article should:
- use the shared article template
- export structured metadata
- provide a summary and highlights
- link to at least one money page
- link to related posts
- avoid duplicating another article’s intent
- stay inside the content cluster defined in `blog-growth-system.md`

Every new blog route should:
- be added to `blogData.js`
- be added to the related-posts set
- be tested in browser
- get a screenshot if it is a major content page

---

## 10) Recommendation

Keep the current public route structure for now.

Refactor internally using:
- thin route pages
- one shared article layout
- shared blog data
- article content modules

That gives us:
- cleaner maintenance
- easier content scaling
- less duplication
- no URL breakage
- a production-ready blog system

## Next step
Refactor the article pages so they only compose shared content modules and the reusable blog layout.
