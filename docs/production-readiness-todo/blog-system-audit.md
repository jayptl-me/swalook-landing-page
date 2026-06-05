# 12 — Blog System Audit

> **Priority:** P1 (High)  
> **Goal:** Blog is scalable, articles are data-driven, internal linking is strong, schema is present.

---

## Current State

### Architecture ✅ Good
- `blogData.js` — centralized data for posts, categories, routes, insights, CTAs
- `BlogPostLayout.js` — shared layout for all articles
- Article content in `components/blog/articles/` — separate files per article
- Blog index: `BlogHero` → `BlogSidebarRail` + `BlogCategoryTabs` → `BlogPostGrid`

### Gaps
- Only 4 articles — need more for SEO authority
- No article schema (JSON-LD)
- No RSS feed integration (rss.xml exists at root — verify it's connected)
- No geo-targeted content
- No comparison/"vs" articles
- No content refresh workflow implemented

---

## Checklist

### Article Data & Scalability
- [ ] Add more articles (target: 12+ for initial launch, 20+ for topical authority)
- [ ] Each article has: unique slug, category, excerpt, readTime, publishedAt, author
- [ ] Article content uses semantic HTML (h2, h3, lists, etc.)
- [ ] Each article has at least one internal link to a money page
- [ ] Each article has at least one internal link to a related article

### Categories & Clusters
- [ ] Verify category structure supports planned content expansion
- [ ] Each category has at least 3 articles
- [ ] Categories map to business-relevant topics (not generic buckets)

### Internal Linking
- [ ] Blog index CTA section routes to money pages correctly
- [ ] Blog sidebar has quick routes to demo/trial/features
- [ ] Blog post sidebar has related posts + quick routes
- [ ] Article footer CTA links to product/demo

### Technical
- [ ] Add Article/BlogPosting JSON-LD schema to each blog post
- [ ] Add Blog JSON-LD schema to blog index
- [ ] Verify rss.xml includes blog posts
- [ ] Blog posts have unique metadata (title, description)
- [ ] Blog post URLs are descriptive and SEO-friendly
- [ ] Category pages (if implemented) have proper canonical/prev-next

### Content Quality
- [ ] No thin content (target 1000+ words per article)
- [ ] Articles answer specific user queries
- [ ] No duplicate content across articles
- [ ] All claims stay within market-now boundaries
- [ ] Proof claims are source-backed

---

## Success Criteria
- 12+ articles across 4+ categories
- Every article links to at least one money page
- Article schema validates in Google Rich Results Test
- Blog index is discoverable from nav, footer, and homepage
