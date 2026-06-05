# 01 — Modular Components Audit

> **Priority:** P0 (Critical)  
> **Goal:** Every section on every page should be backed by a reusable component. Zero duplicated layout markup between pages of the same family.

---

## Current Component Inventory

### Shared (Good)
| Component | Location | Used By |
|-----------|----------|---------|
| `Navbar` | `components/layout/Navbar.js` | Root layout |
| `Footer` | `components/layout/Footer.js` | Root layout |
| `PageHero` | `components/marketing/PageHero.js` | All marketing & product pages |
| `FeaturePage` | `components/product/FeaturePage.js` | 10 of 11 product pages |
| `AnimatedSection` | `components/ui/AnimatedSection.js` | All pages |
| `BlogPostLayout` | `components/blog/BlogPostLayout.js` | All 4 blog posts |
| `BlogHero` | `components/blog/BlogHero.js` | Blog index |
| `BlogCategoryTabs` | `components/blog/BlogCategoryTabs.js` | Blog index |
| `BlogPostGrid` | `components/blog/BlogPostGrid.js` | Blog index |
| `BlogSidebarRail` | `components/blog/BlogSidebarRail.js` | Blog index |
| `HomeHeroSection` | `components/home/HomeHeroSection.js` | Homepage |
| `HomeRouteSection` | `components/home/HomeRouteSection.js` | Homepage |
| `HomeAboutSection` | `components/home/HomeAboutSection.js` | Homepage |
| `HomeServicesSection` | `components/home/HomeServicesSection.js` | Homepage |
| `HomeProvideSection` | `components/home/HomeProvideSection.js` | Homepage |
| `HomeWhySection` | `components/home/HomeWhySection.js` | Homepage |
| `HomeRetentionSection` | `components/home/HomeRetentionSection.js` | Homepage |
| `HomeTestimonialsSection` | `components/home/HomeTestimonialsSection.js` | Homepage |
| `HomeCTASection` | `components/home/HomeCTASection.js` | Homepage |
| `HomeFeaturesOverviewSection` | `components/home/HomeFeaturesOverviewSection.js` | Homepage |
| `HomeFAQSection` | `components/home/HomeFAQSection.js` | Homepage |

### Duplicated / Needs Extraction

| Pattern | Where It's Duplicated | Recommended Fix |
|---------|----------------------|-----------------|
| Policy page layout | `privacy-policy`, `terms-conditions`, `cancellation-policy`, `shipping-policy` — all 4 pages duplicate breadcrumb + title + date + content wrapper | Extract `PolicyPageLayout` component |
| Contact/demo/trial form | `book-demo/page.js` and `free-trial/page.js` both import `Contact.module.css` and duplicate the entire form grid layout | Extract `LeadForm` component |
| Form info with bullets | `contact/page.js`, `book-demo/page.js`, `free-trial/page.js` all duplicate the left-column info + bullet pattern | Include in shared form layout |
| Newsletter section | Only in `contact/page.js` — should be a reusable `NewsletterSection` | Extract for potential reuse |
| "Product proof" card with image + checkmarks | Duplicated inline in `salon-crm-features/page.js` and `mobile-app/page.js` | Extract `ProductProofCard` component |
| FAQ accordion | `faq/page.js` has its own `FAQAccordion` component; `HomeFAQSection` has inline FAQ logic | Extract shared `FAQAccordion` |
| CTA section with label + title + buttons | Duplicated pattern in `about`, `careers`, `mobile-app` closing sections | Extract `CTABanner` or use consistent pattern |
| Mission/vision card grid | `about/page.js` has inline mission cards | Extract to reusable if used elsewhere |
| "Why work here" card grid | `careers/page.js` — generic card grid pattern | Already uses `StaggerContainer` — acceptable |
| Team testimonials | `careers/page.js` — quote cards | Could extract `TestimonialCard` |

---

## Specific Issues Found

### 1. Wrong Import Path (BUILD-BREAKING)
- `salon-inventory-management-software/page.js` imports `FeaturePage` from `@/components/FeaturePage`
- `salon-staff-attendance-software/page.js` imports `FeaturePage` from `@/components/FeaturePage`
- Correct path: `@/components/product/FeaturePage`
- These may still resolve due to the barrel `components/FeaturePage.js` existing — verify both.

### 2. Footer CSS Import Mismatch
- `components/layout/Footer.js` imports `../Footer.module.css`
- But the file lives at `components/layout/Footer.module.css`
- The import should be `./Footer.module.css`
- This works only because the old `components/Footer.module.css` still exists — will break when cleaned up.

### 3. Stale Duplicate Files
- `components/Footer.js` + `components/Footer.module.css` — old versions, still present
- `components/Navbar.js` + `components/Navbar.module.css` — old versions, still present
- `components/AnimatedSection.js` — old version, still present
- `components/PageHero.js` + `components/PageHero.module.css` — old versions, still present
- `components/FeaturePage.js` + `components/FeaturePage.module.css` — old versions, still present
- `components/PolicyPage.module.css` — old version, still present
- `components/BlogPostLayout.js` — old version, still present
- `components/BlogPost.module.css` — old version, still present
- These are stale duplicates that exist alongside their properly-located versions in `components/layout/`, `components/ui/`, `components/product/`, `components/marketing/`, `components/blog/`, `components/legal/`.

### 4. Homepage Data In Page File
- `app/(marketing)/page.js` is ~150 lines, ~120 of which are data arrays
- All data (`heroHighlights`, `featureGroups`, `whatSwalookHelps`, `whyReasons`, `retentionItems`, `noShowItems`, `useCases`, `faqItems`, `routeConnections`) should move to `components/home/homeData.js`

---

## Checklist

### Immediate Fixes
- [ ] Fix `salon-inventory-management-software/page.js` import: `@/components/FeaturePage` → `@/components/product/FeaturePage`
- [ ] Fix `salon-staff-attendance-software/page.js` import: `@/components/FeaturePage` → `@/components/product/FeaturePage`
- [ ] Fix `components/layout/Footer.js` import: `../Footer.module.css` → `./Footer.module.css`
- [ ] Delete stale duplicate files from `components/` root (Footer.js, Navbar.js, AnimatedSection.js, PageHero.js, FeaturePage.js, BlogPostLayout.js, PolicyPage.module.css, BlogPost.module.css + their .module.css files)
- [ ] Extract homepage data to `components/home/homeData.js`

### Component Extraction
- [ ] Create `components/legal/PolicyPageLayout.js` — shared shell for all 4 legal pages
- [ ] Create `components/marketing/LeadForm.js` — shared form for book-demo, free-trial, contact
- [ ] Create `components/marketing/LeadFormInfo.js` — shared left-column info + bullet pattern
- [ ] Create `components/marketing/NewsletterSection.js` — extract from contact page
- [ ] Create `components/marketing/ProductProofCard.js` — extract from salon-crm-features + mobile-app inline styles
- [ ] Create `components/ui/FAQAccordion.js` — unify FAQ accordion logic from faq/page.js and HomeFAQSection

### Verification
- [ ] Run `npm run build` after each major change
- [ ] Confirm all import paths resolve
- [ ] Verify no component is imported from a stale path
- [ ] Check that all pages still render correctly

---

## Success Criteria
- Zero duplicated layout markup between pages of the same family
- Every section is backed by a named, reusable component
- No stale/duplicate component files exist
- All imports use canonical paths
- Homepage page file is ~30 lines (data-free, component-composition only)
