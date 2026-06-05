# 05 — Page Layout Architecture

> **Priority:** P0 (Critical)  
> **Goal:** Define the canonical layout patterns for each page family. Every page should fit into its family's shared layout with only page-specific content/data varying.

---

## Page Families & Their Layout Contracts

### Family 1: Homepage
**Layout:** 11 section components composed in order  
**Data:** Should be in `components/home/homeData.js`  
**Variation:** None — single page  
**Status:** ✅ Good architecture, ⚠️ Data needs extraction

### Family 2: Feature Pages (10 pages)
**Layout:** `components/product/FeaturePage.js`  
**Data:** Props: `icon`, `title`, `heroDesc`, `whyTitle`, `whyDesc`, `keyFeatures`, `compareTitle`, `compareDesc`, `withPoints`, `withCta`, `currentSlug`  
**Variation:** Controlled via props, not custom sections  
**Status:** ✅ 10 of 11 pages use FeaturePage. ⚠️ `salon-crm-features` is the outlier

### Family 3: Feature Hub (`salon-crm-features`)
**Layout:** Custom — uses `Features.module.css` + inline styles  
**Status:** ⚠️ Outlier — should either use FeaturePage or become its own reusable hub template  
**Recommendation:** Keep as custom hub since it's a directory page, not a feature page. But extract inline styles.

### Family 4: Marketing Pages
**Layout Pattern:** `PageHero` → sections → CTA  
**Shared components:** `PageHero`, `AnimatedSection`, `StaggerContainer`  
**Status:** ⚠️ Form pages (contact, book-demo, free-trial) duplicate layout — need `LeadForm`  
**Acceptable custom pages:** About, Careers, FAQ, Mobile App (page-specific content is fine)

### Family 5: Legal Pages (4 pages)
**Layout Pattern:** Breadcrumb → Title → Date → Content  
**Status:** ❌ All 4 duplicate the same layout markup — need `PolicyPageLayout`

### Family 6: Blog System
**Blog Index Layout:** BlogHero → SidebarRail + Main (CategoryTabs → PostGrid → CTA)  
**Blog Post Layout:** `BlogPostLayout` → Article body → Sidebar  
**Status:** ✅ Good modular architecture. Blog data centralized in `blogData.js`

---

## Page-to-Family Mapping

| Page | Family | Template | Status |
|------|--------|----------|--------|
| `/` | Homepage | Home sections | ✅ Needs data extraction |
| `/about` | Marketing | Custom | ✅ Acceptable |
| `/careers` | Marketing | Custom | ✅ Acceptable |
| `/contact` | Marketing | Needs LeadForm | ⚠️ Duplication |
| `/faq` | Marketing | Custom + FAQAccordion | ⚠️ Accordion duplication |
| `/mobile-app` | Marketing | Custom | ⚠️ Inline styles |
| `/book-demo` | Marketing | Needs LeadForm | ❌ Duplication |
| `/free-trial` | Marketing | Needs LeadForm | ❌ Duplication |
| `/salon-crm-features` | Feature Hub | Custom | ⚠️ Inline styles |
| 10 product pages | Feature | FeaturePage | ✅ Good, fix 2 imports |
| `/blogs` | Blog Index | Blog components | ✅ Good |
| 4 blog posts | Blog Post | BlogPostLayout | ✅ Good |
| 4 legal pages | Legal | Needs PolicyPageLayout | ❌ Duplication |

---

## Data-Driven Page Pattern

Pages that could be data-driven (render from config, not custom JSX):

### Already Data-Driven
- **Feature pages** — 10 pages driven by props to `FeaturePage`
- **Blog posts** — article content passed as children to `BlogPostLayout`
- **Blog index** — data from `blogData.js`
- **Homepage sections** — data passed as props to section components

### Should Become Data-Driven
- **Legal pages** — `PolicyPageLayout` with title + date + content children
- **Form pages** — `LeadForm` with field config, bullet items, CTA label
- **FAQ page** — FAQ items are already data arrays, just need shared accordion component

---

## Layout Inconsistencies

### CTA Section Pattern
Multiple pages end with a CTA section that varies in structure:
- About: `styles.aboutCta` with label, heading, phone, tagline
- Careers: `styles.joinCta` with heading, description, 2 buttons
- Mobile App: `styles.ctaSection` with heading, 1 button
- Contact: no closing CTA (has newsletter instead)

**Recommendation:** Standardize the closing CTA pattern — either accept variation per page or create a `CTABanner` component with configurable slots.

### Section Spacing
- Homepage sections consistently use `styles.sectionShell`
- Marketing pages mix `section-header` global class with page-specific styles
- Product pages use `styles.sectionShell` pattern from FeaturePage.module.css

**Recommendation:** Ensure consistent vertical rhythm — all sections should use the same spacing tokens from globals.

---

## Checklist

### Data Extraction
- [ ] Extract homepage data arrays to `components/home/homeData.js`
- [ ] Import data in `app/(marketing)/page.js`
- [ ] Verify homepage page file is < 40 lines

### Layout Standardization
- [ ] Document the canonical layout for each page family in a shared conventions doc
- [ ] Ensure consistent section spacing tokens across all pages
- [ ] Standardize CTA section pattern or accept deliberate variation per page
- [ ] Remove all inline `style={{}}` layout blocks

### Page Family Alignment
- [ ] Legal pages → all use `PolicyPageLayout`
- [ ] Form pages → all use `LeadForm`
- [ ] FAQ → shared `FAQAccordion`
- [ ] Product pages → all use `FeaturePage` (fix the 2 broken imports)
- [ ] Feature hub → extract inline styles

---

## Success Criteria
- Every page clearly belongs to a documented page family
- Layout markup is never duplicated within a family
- Page files contain only: imports, data/config, and component composition
- Zero inline layout styles
- Consistent section spacing across all pages
