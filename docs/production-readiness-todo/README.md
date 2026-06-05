# Swalook Landing Page — Production Readiness Audit & Action Plan

> **Created:** June 2026  
> **Purpose:** Comprehensive production-grade checklist for the Swalook landing page before going live.  
> **Scope:** Every page, component, section, route, asset, SEO concern, accessibility requirement, and performance budget.

---

## How To Use This Folder

Each `.md` file below is a focused audit topic. Work through them in priority order (P0 → P1 → P2).

1. Read the topic file.
2. Check each item against the actual codebase.
3. Mark completed items with `[x]` as you fix them.
4. Move to the next topic only when the current one is fully resolved.

---

## Index of Topics

### P0 — MUST FIX BEFORE LAUNCH (Critical)

| # | File | What It Covers |
|---|------|----------------|
| 01 | [modular-components.md](./modular-components.md) | Component reusability, duplication audit, shared vs custom components |
| 02 | [responsive-hardening.md](./responsive-hardening.md) | Mobile/tablet/desktop/large-desktop responsive audit for every page |
| 03 | [legal-pages-refactor.md](./legal-pages-refactor.md) | Legal pages duplication fix, shared policy shell |
| 04 | [marketing-pages-refactor.md](./marketing-pages-refactor.md) | Marketing pages — duplicate patterns, inline styles, form reuse |
| 05 | [page-layout-architecture.md](./page-layout-architecture.md) | Layout consistency per page family, section reuse, data-driven pages |
| 06 | [cta-funnel-consistency.md](./cta-funnel-consistency.md) | CTA hierarchy, placement, labels, destinations across all pages |
| 07 | [seo-metadata-audit.md](./seo-metadata-audit.md) | Metadata, canonicals, sitemap, schema, robots, geo-tags per page |
| 08 | [broken-links-routing.md](./broken-links-routing.md) | Route verification, dead links, import resolution, 404 handling |

### P1 — SHOULD FIX BEFORE LAUNCH (High)

| # | File | What It Covers |
|---|------|----------------|
| 09 | [performance-optimization.md](./performance-optimization.md) | Bundle size, lazy loading, image optimization, font loading, code splitting |
| 10 | [accessibility-audit.md](./accessibility-audit.md) | ARIA labels, keyboard nav, heading hierarchy, color contrast, focus states |
| 11 | [asset-inventory.md](./asset-inventory.md) | Image audit, alt text, unused assets, resolution, formats, lazy loading |
| 12 | [blog-system-audit.md](./blog-system-audit.md) | Blog scalability, article data structure, internal linking, schema |
| 13 | [product-pages-audit.md](./product-pages-audit.md) | FeaturePage usage, salon-crm-features outlier, data-driven config |
| 14 | [homepage-sections-audit.md](./homepage-sections-audit.md) | Section order, data separation, mobile CTA visibility, trust signals |
| 15 | [form-pages-audit.md](./form-pages-audit.md) | Book-demo, free-trial, contact — form reuse, validation, submission |

### P2 — NICE TO HAVE BEFORE LAUNCH (Medium)

| # | File | What It Covers |
|---|------|----------------|
| 16 | [brand-consistency.md](./brand-consistency.md) | Tone, terminology, visual language, logo usage, color consistency |
| 17 | [motion-performance.md](./motion-performance.md) | Framer Motion audit, reduce-motion support, performance impact |
| 18 | [analytics-measurement.md](./analytics-measurement.md) | Event tracking plan, conversion tracking, page-type reporting |
| 19 | [build-deploy-verification.md](./build-deploy-verification.md) | Build output, env vars, deploy config, Dockerfile, CI/CD readiness |
| 20 | [content-claims-proof.md](./content-claims-proof.md) | Claims-matrix alignment, proof-gap audit, future-state labeling |
| 21 | [legal-compliance.md](./legal-compliance.md) | Cookie consent, GDPR/DPDP, terms accuracy, business registration |
| 22 | [qa-smoke-tests.md](./qa-smoke-tests.md) | Browser test matrix, mobile devices, interaction tests, visual regression |

---

## Quick Summary of Findings

### What's Already Good
- Centralized design system in `globals.css` with CSS custom properties
- Shared `Navbar` and `Footer` in `components/layout/`
- Homepage split into 11 reusable section components under `components/home/`
- Product pages use `components/product/FeaturePage.js` (10 of 11 product pages)
- Blog system uses shared `BlogPostLayout`, `blogData.js`, and article components
- `AnimatedSection` / `StaggerContainer` / `StaggerItem` shared across all pages
- `PageHero` component shared by all marketing and feature pages
- Strong audit documentation already exists in `docs/landing-page-audit/`

### What Needs Immediate Attention (Critical Gaps)
1. **Legal pages** — 4 nearly identical pages duplicating breadcrumb/title/date/layout markup
2. **book-demo & free-trial** — reuse `Contact.module.css` but duplicate all form markup
3. **Inline styles** — `mobile-app/page.js` and `salon-crm-features/page.js` contain large inline `style={{}}` blocks
4. **salon-crm-features** — has its own `Features.module.css` + custom sections, not using `FeaturePage`
5. **No responsive testing** has been done across device breakpoints
6. **No metadata per page** — only root `layout.js` has metadata, child pages lack unique titles/descriptions
7. **2 FeaturePage imports use wrong path** — `salon-inventory-management-software` and `salon-staff-attendance-software` import from `@/components/FeaturePage` instead of `@/components/product/FeaturePage`
8. **Homepage data is in page file** — `featureGroups`, `whatSwalookHelps`, `whyReasons`, etc. should be in a separate data file
9. **Contact form has no validation or submission logic** — all three form pages use `e.preventDefault()` only
10. **Footer imports from old path** — `components/layout/Footer.js` imports `../Footer.module.css` instead of `./Footer.module.css`

### Architecture Scorecard
| Category | Score | Notes |
|----------|-------|-------|
| Component Modularity | 7/10 | Good foundation, 3 outliers to fix |
| Responsive Design | 5/10 | Global CSS has breakpoints, but pages not tested |
| SEO Readiness | 4/10 | Only root metadata, no per-page SEO |
| Performance | 6/10 | No lazy loading, no image optimization configured |
| Accessibility | 5/10 | Some ARIA on FAQ/accordion, needs full audit |
| Code Quality | 7/10 | Clean patterns, some inline styles, 2 import bugs |
| Content/Claims | 7/10 | Claims matrix exists, needs per-page verification |
| Build/Deploy | 5/10 | Basic Next.js config, no env validation, no CI |

---

## Execution Order

1. Fix the 2 broken imports (immediate build fix)
2. Refactor legal pages into shared shell
3. Extract shared form component for book-demo / free-trial / contact
4. Extract homepage data to separate file
5. Fix Footer CSS import
6. Remove inline styles from mobile-app and salon-crm-features
7. Add per-page metadata
8. Responsive audit & hardening
9. Accessibility pass
10. Performance optimization
11. Build verification
12. QA smoke tests
