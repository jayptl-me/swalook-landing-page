# 07 — SEO Metadata Audit

> **Priority:** P0 (Critical)  
> **Goal:** Every page must have unique, well-crafted metadata (title, description, keywords), proper canonical URLs, structured data where applicable, and correct sitemap/robots coverage.

---

## Current State

### Root Layout (`app/layout.js`)
- Has a single global `metadata` export
- Same title and description for ALL pages
- Keywords include generic terms + city names (Mumbai, Delhi, Bangalore, etc.) — good for homepage, wrong for sub-pages
- OpenGraph defined only once globally

**Problem:** Every page on the site currently has the exact same `<title>` and `<meta name="description">` — this is an SEO disaster. Google will penalize duplicate metadata.

### Per-Page Metadata
**None.** No page file exports its own `metadata` object. In Next.js App Router, pages can export `metadata` to override the root layout.

---

## Required Metadata Per Page

### Homepage (`/`)
```js
export const metadata = {
  title: 'Swalook — Revenue Generation Engine For The Beauty Industry | Salon CRM Software',
  description: 'Grow your salon business with Swalook. Better customer retention, smarter marketing, fewer no-shows. All-in-one salon CRM for appointments, billing, inventory, and staff management.',
  alternates: { canonical: 'https://swalook.in/' },
  openGraph: {
    title: 'Swalook — Revenue Generation Engine For The Beauty Industry',
    description: 'Grow your salon business with Swalook. Better customer retention, smarter marketing, fewer no-shows.',
    url: 'https://swalook.in/',
  },
};
```

### About (`/about`)
```js
export const metadata = {
  title: 'About Swalook — Our Mission, Vision & Values | Beauty Industry Growth Platform',
  description: 'Learn about Swalook\'s mission to help salons grow through retention, marketing, and simpler operations. Built for the beauty industry.',
  alternates: { canonical: 'https://swalook.in/about' },
};
```

### Careers (`/careers`)
```js
export const metadata = {
  title: 'Careers at Swalook — Join the Beauty Tech Revolution | Swalook Jobs',
  description: 'Explore career opportunities at Swalook. Join our team of engineers, designers, and marketers building the future of salon technology. Internships and full-time roles available.',
  alternates: { canonical: 'https://swalook.in/careers' },
};
```

### Contact (`/contact`)
```js
export const metadata = {
  title: 'Contact Swalook — Get In Touch | Salon CRM Support & Sales',
  description: 'Contact the Swalook team for product questions, demo requests, or support. Reach us by email, phone, or the contact form.',
  alternates: { canonical: 'https://swalook.in/contact' },
};
```

### FAQ (`/faq`)
```js
export const metadata = {
  title: 'Frequently Asked Questions — Swalook Salon CRM | Product & Features FAQ',
  description: 'Find answers to common questions about Swalook salon CRM software. Learn about features, pricing, multi-branch support, and how to get started.',
  alternates: { canonical: 'https://swalook.in/faq' },
};
```

### Mobile App (`/mobile-app`)
```js
export const metadata = {
  title: 'Swalook Mobile App — Salon Management On The Go | iOS & Android',
  description: 'Manage your salon from anywhere with the Swalook mobile app. Appointments, notifications, client management, and business insights on your phone.',
  alternates: { canonical: 'https://swalook.in/mobile-app' },
};
```

### Book Demo (`/book-demo`)
```js
export const metadata = {
  title: 'Book a Free Demo — See Swalook Salon CRM In Action | Schedule Demo',
  description: 'Book a free personalized demo of Swalook salon CRM. See how our platform helps you improve retention, reduce no-shows, and grow your beauty business.',
  alternates: { canonical: 'https://swalook.in/book-demo' },
};
```

### Free Trial (`/free-trial`)
```js
export const metadata = {
  title: 'Start Free Trial — Try Swalook Salon CRM Risk-Free | Free Trial Sign Up',
  description: 'Start your free trial of Swalook salon CRM. Experience the tools that help beauty businesses grow with better retention and simpler operations.',
  alternates: { canonical: 'https://swalook.in/free-trial' },
};
```

### Salon CRM Features (`/salon-crm-features`)
```js
export const metadata = {
  title: 'Salon CRM Software Features — All-in-One Salon Management | Swalook',
  description: 'Explore all Swalook salon CRM features — appointments, billing, inventory, staff management, analytics, loyalty, marketing templates, and more.',
  alternates: { canonical: 'https://swalook.in/salon-crm-features' },
};
```

### Product Feature Pages (10 pages)
Each needs unique title and description based on the feature. Example for analytics:
```js
export const metadata = {
  title: 'Salon Analytics Software — Track Performance & Grow Revenue | Swalook',
  description: 'Track sales trends, client behavior, and staff performance with Swalook\'s salon analytics. Make data-driven decisions to grow your beauty business.',
  alternates: { canonical: 'https://swalook.in/salon-analytics-software' },
};
```

### Blog Index (`/blogs`)
```js
export const metadata = {
  title: 'Salon Business Blog — CRM Tips, Marketing Guides & Growth Strategies | Swalook',
  description: 'Read Swalook\'s blog for salon CRM guides, marketing strategies, retention tips, and growth advice for beauty business owners.',
  alternates: { canonical: 'https://swalook.in/blogs' },
};
```

### Blog Posts (4 articles)
Each needs unique metadata matching the article title and excerpt.

### Legal Pages (4 pages)
Minimal metadata — these are not SEO pages but still need unique titles:
```js
export const metadata = {
  title: 'Privacy Policy — Swalook Global Private Limited',
  description: 'Privacy Policy for Swalook Global Private Limited. Learn how we collect, use, and protect your personal data.',
  alternates: { canonical: 'https://swalook.in/privacy-policy' },
};
```

---

## Structured Data Requirements

| Page Type | Schema Type | Priority |
|-----------|-------------|----------|
| Homepage | `Organization` / `WebSite` | P0 |
| Blog Index | `Blog` | P1 |
| Blog Posts | `Article` / `BlogPosting` | P1 |
| FAQ | `FAQPage` | P1 |
| Product Pages | `SoftwareApplication` | P2 |
| About | `Organization` (detailed) | P2 |
| Legal Pages | `WebPage` | P3 |

### Organization Schema (for homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Swalook Global Private Limited",
  "url": "https://swalook.in",
  "description": "Revenue Generation Engine For The Beauty Industry",
  "sameAs": [
    "https://www.facebook.com/people/SwaLook/100082780576167/",
    "https://www.linkedin.com/company/swalook/",
    "https://www.instagram.com/swalook_official/",
    "https://www.youtube.com/channel/UCQj9_wk87-iDb9h9TdxjHYg"
  ]
}
```

### FAQPage Schema (for /faq page)
Map the existing FAQ items to FAQPage structured data.

### Article Schema (for blog posts)
Each blog post should include: headline, datePublished, dateModified, author, description.

---

## Technical SEO Checklist

### Sitemap
- [ ] Verify `sitemap.xml` at project root includes all public pages
- [ ] Exclude admin, CRM, and API routes from sitemap
- [ ] Set appropriate `<priority>` values (homepage 1.0, product 0.8, blog 0.6, legal 0.3)
- [ ] Set appropriate `<changefreq>` values
- [ ] Ensure sitemap is referenced in `robots.txt`

### Robots.txt
- [ ] Create or verify `robots.txt` (not seen in file listing — may be generated by Next.js)
- [ ] Allow: all public routes
- [ ] Disallow: /crm, /api, /admin paths if any
- [ ] Reference sitemap URL

### Canonical URLs
- [ ] Every page has a self-referencing canonical URL
- [ ] Canonical domain is `https://swalook.in` (not http, not www)
- [ ] No canonical pointing to a different page (unless intentional consolidation)

### Meta Tags
- [ ] Every page has a unique `<title>` (50-65 characters)
- [ ] Every page has a unique `<meta name="description">` (120-160 characters)
- [ ] OpenGraph `og:title`, `og:description`, `og:url`, `og:image` set for key pages
- [ ] Twitter card meta tags for key pages
- [ ] `viewport` meta tag is present (handled by Next.js)
- [ ] `charset` meta tag is present (handled by Next.js)

### Heading Hierarchy
- [ ] Every page has exactly one `<h1>`
- [ ] `<h2>` through `<h6>` are used in logical descending order
- [ ] No skipped heading levels
- [ ] Homepage section headings use consistent levels

### Image SEO
- [ ] All content images have descriptive `alt` text
- [ ] Decorative images use `alt=""` or are CSS backgrounds
- [ ] Key images have descriptive filenames (not IMG_001.jpg)

### URL Structure
- [ ] URLs are descriptive and contain target keywords
- [ ] URLs use hyphens, not underscores
- [ ] No uppercase letters in URLs
- [ ] No trailing slashes inconsistency

---

## Next.js Metadata Implementation

In the App Router, page-level metadata is exported as:
```js
// In page.js (Server Component) or layout.js
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

Or dynamically:
```js
export async function generateMetadata({ params }) {
  return {
    title: `Dynamic Title for ${params.slug}`,
  };
}
```

**Note:** Many current pages are `'use client'` components. In Next.js App Router, `metadata` export only works in Server Components. Options:
1. Move metadata to a `layout.js` in each route group
2. Create a shared `generateMetadata` utility

---

## Checklist

### Per-Page Metadata
- [ ] Homepage (`/`)
- [ ] About (`/about`)
- [ ] Careers (`/careers`)
- [ ] Contact (`/contact`)
- [ ] FAQ (`/faq`)
- [ ] Mobile App (`/mobile-app`)
- [ ] Book Demo (`/book-demo`)
- [ ] Free Trial (`/free-trial`)
- [ ] Salon CRM Features (`/salon-crm-features`)
- [ ] All 10 product feature pages (unique per page)
- [ ] Blog Index (`/blogs`)
- [ ] All 4 blog posts (unique per article)
- [ ] Privacy Policy (`/privacy-policy`)
- [ ] Terms & Conditions (`/terms-conditions`)
- [ ] Cancellation Policy (`/cancellation-policy`)
- [ ] Shipping Policy (`/shipping-policy`)

### Structured Data
- [ ] Organization schema on homepage
- [ ] FAQPage schema on /faq
- [ ] Article schema on blog posts
- [ ] BreadcrumbList schema on applicable pages

### Technical SEO
- [ ] Verify sitemap.xml coverage
- [ ] Verify robots.txt configuration
- [ ] Verify canonical URLs on all pages
- [ ] Verify heading hierarchy on all pages
- [ ] Verify image alt text
- [ ] Verify URL structure consistency

---

## Success Criteria
- Zero duplicate `<title>` tags across the site
- Every page has unique, keyword-optimized metadata
- All canonical URLs point to correct pages
- Structured data validates in Google's Rich Results Test
- Sitemap covers all public, indexable pages
- Heading hierarchy is logical on every page
