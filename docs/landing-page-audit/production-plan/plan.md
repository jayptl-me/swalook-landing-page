# Swalook Landing Page Production Plan

## Goal

Make the landing project fully modular, reusable, and responsive across mobile, tablet, desktop, and large desktop while keeping page families consistent and maintainable.

## Current State

### Already in good shape
- Root layout is centralized in `app/layout.js`
- Global design system exists in `app/globals.css`
- Homepage is split into reusable section components under `components/home/`
- Most product pages use the shared `components/product/FeaturePage.js`
- Blog/content routes already have a reusable component system
- Shared navbar and footer are centralized under `components/layout/`

### Still incomplete
- Marketing pages still contain repeated section and layout patterns
- `salon-crm-features` is a custom product outlier
- Legal pages are duplicated even though they share the same structure
- Some pages still mix content, layout, and presentation in a single file
- Responsive behavior has not been verified across the full page set

---

## What Needs to Be Done

## 1. Project-wide audit and normalization
- [ ] Review every route family and classify each page as shared, partially shared, or fully custom
- [ ] Identify all repeated section patterns across marketing, product, legal, and content routes
- [ ] Map which pages should be driven by shared components vs page-specific content only
- [ ] Create a final page-family inventory with reuse recommendations

## 2. Marketing family refactor
- [ ] Extract repeated hero, CTA, form, and grid patterns into shared marketing components
- [ ] Normalize `about`, `careers`, `contact`, `faq`, `mobile-app`, `book-demo`, and `free-trial`
- [ ] Convert repeated page sections into reusable section shells
- [ ] Remove inline layout styles where shared classes or components can handle them
- [ ] Make mobile and tablet layouts consistent across all marketing pages

## 3. Product family refactor
- [ ] Review all product routes for consistency with `FeaturePage`
- [ ] Reduce the custom complexity in `salon-crm-features`
- [ ] Move repeated product proof / intro / CTA blocks into shared subcomponents if needed
- [ ] Check whether feature pages can be driven from route configuration data
- [ ] Ensure every product page follows the same responsive shell behavior

## 4. Legal family refactor
- [ ] Build a shared policy page component for breadcrumb, title, date, and content layout
- [ ] Move all legal pages onto that shared shell
- [ ] Keep only policy text and metadata unique per page
- [ ] Ensure legal pages remain readable and well-spaced on mobile

## 5. Blog/content system review
- [ ] Verify the blog list, post layout, and article components are consistently reusable
- [ ] Confirm the article blocks are sufficiently modular for future posts
- [ ] Check the sidebar, tabs, and card system for responsive stability
- [ ] Normalize any remaining blog-specific layout duplication

## 6. Responsive hardening
- [ ] Audit the pages most likely to break on mobile or tablet
- [ ] Replace fixed grid assumptions with responsive card/flex fallbacks where needed
- [ ] Verify long text wrapping, buttons, and cards do not overflow
- [ ] Confirm tables or wide layouts degrade gracefully on smaller screens
- [ ] Test the project at mobile, tablet, desktop, and large desktop widths

## 7. Build and routing verification
- [ ] Run a production build after each major refactor phase
- [ ] Confirm all routes still resolve correctly
- [ ] Verify shared imports resolve to existing modules
- [ ] Fix any prop contract mismatches introduced by refactoring
- [ ] Re-check prerendering for pages that use dynamic content or shared shells

## 8. Cleanup and maintainability
- [ ] Remove obsolete one-off layout code after shared components replace it
- [ ] Keep components small and single-purpose
- [ ] Split files that become too large
- [ ] Document the final component structure so future pages follow the same pattern

---

## Recommended Execution Order

1. Final project-wide audit  
2. Marketing refactor  
3. Product normalization  
4. Legal shell extraction  
5. Blog/content consistency pass  
6. Responsive hardening across all page families  
7. Build verification and cleanup  

---

## Priority Pages to Review First

### Highest priority
- `app/(marketing)/about/page.js`
- `app/(marketing)/careers/page.js`
- `app/(marketing)/contact/page.js`
- `app/(marketing)/faq/page.js`
- `app/(marketing)/mobile-app/page.js`
- `app/(product)/salon-crm-features/page.js`
- all legal policy pages

### Medium priority
- `app/(marketing)/book-demo/page.js`
- `app/(marketing)/free-trial/page.js`
- product depth pages using `FeaturePage`
- blog list and article pages

### Lower priority
- pages already fully backed by shared components with minimal page-specific layout

---

## Success Criteria

The landing project is finished when:
- page families are built from reusable components instead of repeated inline layouts
- mobile, tablet, desktop, and large desktop layouts are stable
- legal, marketing, product, and blog systems all follow a consistent structure
- build verification passes after the refactor
- the codebase is easier to extend without copy-pasting page shells

## Notes

This plan is intentionally incremental. The goal is not to rewrite everything at once, but to move each route family toward the same reusable, responsive architecture without breaking the site.
