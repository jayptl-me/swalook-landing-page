# Blog Technical & Content SEO Audit — July 2026

> **Audit Date:** 2026-07-01  
> **Scope:** All 8 existing blogs (4 in blogData.js, 4 in seed-blogs.ts), sitemap, robots.txt, geo-indexing, structured data, internal linking, CMS alignment  
> **Methodology:** Source code analysis, word count verification, heading extraction, web research (2026 SEO best practices), CRM backend review

---

## 0. Complete Blog Inventory

The project has **8 blog posts total** across two sources:

| # | Title | Slug | Source | Words | Status |
|---|-------|------|--------|-------|--------|
| 1 | 7 Key Factors When Choosing Salon CRM Software | 7-key-factors-for-choosing-salon-crm-software | blogData.js | 1,802 ✅ | Rich blocks, images, CTAs |
| 2 | Why Salons Need CRM Software: Swalook Solutions | why-salons-fall-behind-without-crm-software | blogData.js | 1,665 ✅ | Rich blocks, images, CTAs |
| 3 | Integrated Marketing for Salons with Swalook CRM | the-importance-of-integrated-marketing | blogData.js | 1,669 ✅ | Rich blocks, images, CTAs |
| 4 | How to Automate Your Salon Marketing with Swalook | how-to-automate-your-salon-marketing-with-swalook | blogData.js | 1,688 ✅ | Rich blocks, images, CTAs |
| 5 | Salon CRM vs Excel — Why Spreadsheets Can't Scale | salon-crm-vs-excel | seed-blogs.ts only | 206 ❌ | Thin markdown, no images |
| 6 | How to Reduce Salon No-Shows in India | how-to-reduce-salon-no-shows-india | seed-blogs.ts only | 173 ❌ | Thin markdown, no images |
| 7 | Salon Billing Software Explained | salon-billing-software-explained | seed-blogs.ts only | 192 ❌ | Thin markdown, no images |
| 8 | Salon Marketing Guide India | salon-marketing-guide-india | seed-blogs.ts only | 174 ❌ | Thin markdown, no images |

**Critical discovery:** Posts 5-8 exist ONLY in the backend seed script. They are **not present** in `blogData.js` (static frontend data). If the API is unreachable, these posts vanish. Also, their word counts (126-239) are **catastrophically below** even the 1,500-word minimum.

---

## Executive Summary

The Swalook blog has 8 posts total, but only the 4 in `blogData.js` are production-ready (1,600+ words, structured data, images, SEO metadata). The 4 seed-only posts are dangerously thin (126-239 words) and will hurt SEO if indexed. Across all 8: zero H3 sub-headings in 6/8, zero in-body images in 8/8, zero contextual internal links in 8/8, and no hreflang geo-targeting. The technical foundation (robots.txt, sitemap, schema base) is solid but needs expansion.

---

## 1. Robots.txt Configuration

### Current State
- **File:** `app/robots.js` (dynamic Next.js generation)
- Allows: `/`, `/blog/`, `/images/`
- Disallows: `/api/`, `/dashboard/`, `/admin/`, `/_next/`
- References sitemap and declares `host`
- **Score: 7/10**

### Issues Found
| # | Issue | Severity |
|---|-------|----------|
| 1 | No `hreflang` support or language targeting for India (`en_IN`) | Medium |
| 2 | No crawl-delay directive (not critical for small site but good practice) | Low |
| 3 | No reference to image sitemap or blog-specific sitemap entries | Low |

### Recommendations
```js
// Add — Google-specific crawl rules for optimal budget
rules: [
  { userAgent: '*', allow: ['/', '/blog/', '/images/'],
    disallow: ['/api/', '/dashboard/', '/admin/', '/_next/'] },
  { userAgent: 'Googlebot-Image', allow: ['/images/'] },
  { userAgent: 'Googlebot-News', allow: ['/blog/'] },
]
```

---

## 2. Sitemap Implementation

### Current State
- **File:** `app/sitemap.js` (Next.js dynamic route) + `scripts/generate-sitemap.mjs` (post-build fallback)
- 28 static routes + **only 4 blog posts** = 32 total URLs
- Blog posts 5-8 (seed-only) are **absent** from sitemap
- **Score: 5/10**

### Issues Found
| # | Issue | Severity |
|---|-------|----------|
| 1 | **Blog posts 5-8 missing from sitemap entirely** | Critical |
| 2 | Blog priority 0.7 should be 0.8 | Medium |
| 3 | No image sitemap (for blog cover images) | Medium |
| 4 | No tag/category archive URLs | Low |

### Recommendations
```js
// Add all 8 blog posts to sitemap.js blogPosts array with priority 0.8
// Add image:image entries for each post's coverImage
```

---

## 3. Geo-Indexing Audit

### Current State
- `locale: 'en_IN'` in OpenGraph ✓
- Indian city keywords in `<head>` ✓
- Blog content references INR, GST, Indian cities ✓
- **Missing:** No hreflang, no `lang="en-IN"`, no geo-sitemaps
- **Score: 5/10**

### Recommendations
**1. Update layout.js:**
```jsx
<html lang="en-IN">
```
**2. Add hreflang to metadata:**
```js
alternates: {
  canonical: SITE_URL,
  languages: { 'en-IN': SITE_URL, 'x-default': SITE_URL },
},
```
**3. Add hreflang to blog generateMetadata.**

---

## 4. Heading Hierarchy Audit

### Per-Blog Analysis

| # | Blog | H2s | H3s | H3 Present? | Issue |
|---|------|-----|-----|-------------|-------|
| 1 | 7 Key Factors | 8 | 0 | ❌ | Flat hierarchy, 8 long H2 sections |
| 2 | Why Salons Need CRM | 3 | 4 | ✅ | Good — only rich-post with H3s |
| 3 | Integrated Marketing | 2 | 5 | ✅ | Good H3 structure |
| 4 | Automation Playbook | 6 | 0 | ❌ | No H3s in long sections |
| 5 | CRM vs Excel | 6 | 0 | ❌ | No H3s |
| 6 | Reduce No-Shows | 6 | 0 | ❌ | No H3s |
| 7 | Billing Software | 3 | 0 | ❌ | No H3s |
| 8 | Marketing Guide | 7 | 0 | ❌ | No H3s |

**Total: 6/8 posts have ZERO H3 sub-headings.**

### 2026 Best Practice
Per web research, 2026 heading best practices require H3s every 150-200 words within H2 sections. Only posts 2 and 3 follow this.

---

## 5. Meta Titles & Descriptions Audit

### Per-Blog Analysis

| # | Title Length | Desc Length | Brand Pipe | Issues |
|---|-------------|-------------|------------|--------|
| 1 | 58 chars ✓ | 157 chars ✓ | ✅ Has "| Swalook Guide" | Good |
| 2 | 66 chars ✓ | 168 chars ✓ | ✅ Has "| Swalook" | Good in seed, missing in blogData |
| 3 | 67 chars ✓ | 157 chars ✓ | ✅ Has "| Swalook" | Good |
| 4 | 65 chars ✓ | 181 chars ✓ | ✅ Has "| Swalook" | Good |
| 5 | ~60 chars ✓ | ~75 chars ✓ | ✅ | Good but desc too short |
| 6 | ~75 chars ✓ | ~80 chars ✓ | ✅ | Good but desc too short |
| 7 | ~80 chars ✓ | ~70 chars ✓ | ✅ | Good but desc too short |
| 8 | ~70 chars ✓ | ~55 chars ✓ | ✅ | Good but desc too short |

**Issue:** Seed-only posts (5-8) have overly short descriptions (55-80 chars vs recommended 150-160).

---

## 6. Image Integration Audit

| # | In-Body Images | Alt Text | Width/Height | Issues |
|---|---------------|----------|-------------|--------|
| 1 | 1 | ✅ | ❌ Not in BlockRenderer | Needs 3-4 more images |
| 2 | 1 | ✅ | ❌ Same | Needs more images |
| 3 | 1 | ✅ | ❌ Same | Needs more images |
| 4 | 1 | ✅ | ❌ Same | Needs more images |
| 5 | **0** | N/A | N/A | **ZERO images** |
| 6 | **0** | N/A | N/A | **ZERO images** |
| 7 | **0** | N/A | N/A | **ZERO images** |
| 8 | **0** | N/A | N/A | **ZERO images** |

**All 8 posts have ZERO images in the seed data.** The 4 rich blogData.js posts have 1 image each (the hero infographic) — still far below the 3-5 minimum for 1,600+ word content.

**Critical:** BlockRenderer's image component lacks `width` and `height` attributes, causing CLS (Cumulative Layout Shift).

---

## 7. Word Count Audit

| Blog | Words | ≥1,500? | ≥2,000? (2026 target) |
|------|-------|---------|----------------------|
| 1. 7 Key Factors | **1,802** | ✅ | ❌ |
| 2. Why Salons Need CRM | **1,665** | ✅ | ❌ |
| 3. Integrated Marketing | **1,669** | ✅ | ❌ |
| 4. Automation Playbook | **1,688** | ✅ | ❌ |
| 5. Salon CRM vs Excel | **206** | **❌ CRITICAL** | ❌ |
| 6. Reduce No-Shows India | **173** | **❌ CRITICAL** | ❌ |
| 7. Salon Billing Software | **192** | **❌ CRITICAL** | ❌ |
| 8. Salon Marketing Guide India | **174** | **❌ CRITICAL** | ❌ |

**Only 4/8 posts meet the 1,500-word minimum. Posts 5-8 are 173-206 words — they will be penalized by Google's thin content algorithms.**

---

## 8. Structured Data / Schema Audit

### Current State
- BlogJsonLd generates Article/BlogPosting schema ✓
- **Missing:** BreadcrumbList (breadcrumbs exist visually but have no JSON-LD)
- **Missing:** SoftwareApplication on homepage
- **Missing:** FAQPage on FAQ section
- **Score: 6/10**

### Recommendations
1. Add `BreadcrumbList` JSON-LD to `blog/[slug]/page.js`
2. Add `SoftwareApplication` schema to `layout.js`
3. Update BlogJsonLd `about` field from `Thing` to `SoftwareApplication`

---

## 9. Internal Linking Audit

### Per-Blog Analysis
| # | Sidebar Links | Contextual Inline Links | Feature Page Links | Score |
|---|--------------|------------------------|-------------------|-------|
| 1-4 | ✅ Yes | **❌ ZERO** | **❌ ZERO** | 5/10 |
| 5-8 | ❌ No (not rendered) | **❌ ZERO** | **❌ ZERO** | 0/10 |

**All 8 posts have ZERO contextual internal links within content blocks.** The sidebar links exist only on the 4 rich blog pages.

---

## 10. Content Dual-Source Problem

The most significant architectural finding:

| Aspect | blogData.js (4 posts) | seed-blogs.ts (8 posts) |
|--------|----------------------|------------------------|
| Content | Rich BlockRenderer blocks | Thin markdown (126-239 words) |
| Images | 1 in-body image each | ZERO |
| SEO metadata | Custom seoTitle/seoDescription | Basic seoTitle/seoDescription |
| Internal links | Sidebar only | None |
| Rendering | Full layout + schema | Database-only until fetched via API |
| Sitemap presence | ✅ In sitemap.js | ❌ Not in sitemap |

**Problem:** The 4 seed-only posts are only accessible via the API (`/api/v1/public/blog/posts/...`). If the API is down, they 404. They lack rich content blocks, images, and proper SEO metadata depth. They also are not in the sitemap.

**Fix:** Either (a) promote them to `blogData.js` with proper content blocks, or (b) ensure the API is always available and has enriched content.

---

## Summary Priority Matrix

| Priority | Issue | Current Score | Action |
|----------|-------|--------------|--------|
| **P0** | 4 seed-only posts (5-8) have 173-206 words — **thin content, SEO poison** | ❌ Critical | Expand to 1,500+ words each with full content blocks |
| **P0** | No contextual internal links in any post content | ❌ Critical | Add 2-3 links per blog within content blocks |
| **P0** | No H3 sub-headings in 6/8 posts | ❌ High | Restructure headings with H3s every 150-200 words |
| **P0** | No hreflang / geo-targeting for India | ❌ High | Add `lang="en-IN"`, hreflang to layout + blog pages |
| **P0** | No BreadcrumbList schema | ❌ High | Add BreadcrumbList JSON-LD to all blog posts |
| **P0** | 4 seed-only posts not in sitemap | ❌ Critical | Add all 8 posts to sitemap |
| **P1** | ZERO in-body images in seed posts (5-8) | ❌ High | Add 3-4 images per post with width/height |
| **P1** | Only 1 in-body image per rich post (1-4) | ❌ Medium | Add 3-4 images per post |
| **P1** | Image CLS from missing width/height attributes | ❌ High | Add dimensions to BlockRenderer image rendering |
| **P1** | Blog priority 0.7 in sitemap (should be 0.8) | ❌ Medium | Update sitemap.js priority values |
| **P1** | All 4 rich posts below 2,000-word 2026 target | ⚠️ Warning | Expand to 2,000+ words with FAQ sections |
| **P1** | Seed posts (5-8) have short descriptions (55-80 chars) | ❌ Medium | Expand to 150-160 chars |
| **P2** | No image sitemap | ❌ Medium | Add image entries to sitemap |
| **P2** | No SoftwareApplication schema on homepage | ❌ Medium | Add global SoftwareApplication structured data |
| **P2** | `<html lang="en">` should be `en-IN` | ❌ Medium | Update layout.js |
| **P2** | RSS feed not linked in `<head>` | ❌ Low | Add RSS alternate link to layout |

---

## 10 New Blog Topics — Production-Grade (2,000+ words, SEO-optimized)

Since there are only 8 posts (4 production-ready, 4 needing rescue), these 10 topics will bring the total to **18** — a solid base for topical authority.

### Topic 1: How to Reduce Salon No-Shows in India — A Data-Backed Strategy
*Expand the existing seed post (173 words → 2,000+)*
- **Target keyword:** "reduce salon no-shows India"
- **Category:** Salon Appointment Management
- **Suggested H2s:** The True Cost of No-Shows in Indian Salons, Why Traditional Reminder Methods Fail, Building an Automated Multi-Channel Reminder System, What to Do When a Client Doesn't Show, Measuring No-Show Reduction ROI

### Topic 2: Salon CRM vs Excel — Why Spreadsheets Can't Scale Your Beauty Business
*Expand the existing seed post (206 words → 2,000+)*
- **Target keyword:** "salon CRM vs Excel"
- **Category:** Salon Software Comparison
- **Suggested H2s:** When Excel Works (and When It Doesn't), The 5 Critical Gaps in Spreadsheet Management, Cost Comparison: Excel vs CRM Over 12 Months, Real Stories from Salons That Made the Switch, Migration Guide: Moving from Excel to CRM

### Topic 3: GST-Compliant Billing for Salons — A Complete Guide for Indian Beauty Businesses
*Expand the existing seed post (192 words → 2,000+)*
- **Target keyword:** "GST compliant billing software salons India"
- **Category:** Salon Operations & Efficiency
- **Suggested H2s:** Understanding GST for Salon Services vs Products, HSN Codes Every Salon Owner Should Know, How to Generate GST-Compliant Invoices Automatically, Common GST Mistakes That Trigger Notices, Choosing Software That Simplifies GST Compliance

### Topic 4: Salon Marketing Guide India — How to Get More Clients Without Spending a Fortune
*Expand the existing seed post (174 words → 2,000+)*
- **Target keyword:** "salon marketing India"
- **Category:** Salon Marketing & Engagement
- **Suggested H2s:** Google Business Profile Optimization for Salons, Instagram Marketing Strategies, WhatsApp Marketing Automation, Referral Programs That Actually Work, Local Partnerships and Cross-Promotions

### Topic 5: How Salon Loyalty Programs Drive Repeat Business in India
- **Target keyword:** "salon loyalty program India"
- **Category:** Client Retention & Loyalty
- **Suggested H2s:** Why Indian Salons Need Different Loyalty Models, Points-Based vs Tier-Based vs Paid Programs, Designing Offers That Actually Get Redeemed, Technology That Powers Modern Loyalty Programs, Case Study: Loyalty Program ROI for a Mumbai Salon

### Topic 6: The Complete Guide to Salon Staff Scheduling & Attendance Management
- **Target keyword:** "salon staff scheduling software"
- **Category:** Salon Operations & Efficiency
- **Suggested H2s:** Why Manual Staff Scheduling Fails in Growing Salons, Features of Effective Staff Management Software, Managing Leaves, Swaps, and Shift Preferences, Tracking Staff Performance Metrics, Multi-Branch Staff Management Strategies

### Topic 7: Salon Analytics & Reporting — Key Metrics Every Owner Should Track
- **Target keyword:** "salon analytics software dashboard"
- **Category:** Salon CRM & Software Guide
- **Suggested H2s:** Beyond Revenue: The Metrics That Reveal Your Salon's Health, Client Retention Rate and How to Calculate It, Staff Utilization and Service Profitability, Marketing ROI Per Channel and Per Campaign, Building a Monthly Review Dashboard

### Topic 8: WhatsApp Marketing for Salons — Strategies That Convert in 2026
- **Target keyword:** "WhatsApp marketing for salons India"
- **Category:** Marketing Automation Tools
- **Suggested H2s:** Why WhatsApp Dominates Salon Client Communication in India, Building a Permission-Based WhatsApp Subscriber List, Automated WhatsApp Campaigns That Drive Bookings, Rich Media Messaging: Images and Interactive Menus, Measuring WhatsApp Campaign Performance

### Topic 9: Choosing Between Cloud vs On-Premise Salon Software in India
- **Target keyword:** "cloud vs on premise salon software India"
- **Category:** Salon Software Comparison
- **Suggested H2s:** Understanding the Two Deployment Models, Cost Comparison Across 1-5 Year TCO, Data Security and Backup Considerations, Internet Reliability Considerations for Indian Salons, Migration and Switching Costs

### Topic 10: Salon Lead Management — How to Convert More Inquiries into Bookings
- **Target keyword:** "salon lead management inquiry tracking"
- **Category:** Salon CRM & Software Guide
- **Suggested H2s:** Where Salons Lose Leads Today, Building a Lead Capture System That Works, Automating Follow-Up Without Being Annoying, Tracking Lead Sources to Optimize Ad Spend, From Inquiry to Booking: A Complete Workflow

---

## Appendix: 2026 SEO Best Practices Summary

Based on web research (DesignInDC, Svitla Systems, Bynder, VanDenBerg):

1. **Heading hierarchy:** One H1, clear H2 structure, H3s for sub-topics every 150-200 words
2. **Word count:** 2,000-3,000 words for competitive informational content; absolute minimum 1,500
3. **First 150-200 words:** Focused on the problem statement (not preamble)
4. **Structured data:** Article/BlogPosting + BreadcrumbList + FAQPage as applicable
5. **Internal links:** Every post links to 1-2 money pages and 1 related post
6. **Image alt text:** Descriptive, includes target keyword variation where natural
7. **Images per post:** Minimum 3-5 for content over 1,500 words
8. **Geo-targeting:** hreflang for regional content, `lang` attribute, locale-specific OpenGraph
9. **Sitemap priority:** Blog posts 0.8, feature pages 0.8-0.9, homepage 1.0
10. **Content freshness:** `lastmod` dates in sitemap, regular content refresh every 6 months
11. **Thin content penalty:** Any page under 300 words risks demotion in SERPs; under 200 words is critical
