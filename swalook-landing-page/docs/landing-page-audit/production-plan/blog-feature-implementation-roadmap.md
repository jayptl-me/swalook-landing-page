# Blog + Feature Implementation Roadmap

> Status: implementation-ready roadmap  
> Purpose: turn the blog plan and feature-page plan into a clear execution sequence the team can build from without guessing.

## 1) What this roadmap covers

This roadmap combines:
- blog implementation,
- CRM feature-page implementation,
- screenshot proof,
- route-safe cleanup,
- and production verification.

It is the working plan for the next build cycle.

---

## 2) Reference plans this roadmap depends on

- `blog-crm-integration-plan.md`
- `feature-page-production-plan.md`
- `blog-folder-structure-plan.md`
- `blog-growth-system.md`
- `page-hierarchy.md`
- `claims-matrix.md`
- `proof-map.md`
- `backend-contract-map.md`
- `crm-product-map.md`
- `page-system.md`

These docs define what is safe to say and what needs proof.

---

## 3) Execution rule

Do the work in this order:
1. make the blog proof-ready,
2. make the feature pages proof-ready,
3. connect blog → feature → demo routes,
4. capture screenshots,
5. verify build and browser behavior,
6. only then consider cleanup or deeper refactors.

Do not skip straight to visual polish without proof.

---

## 4) Required implementation order

## Phase 1 — Blog proof upgrade
Start with the blog because it now has the cleaner shell and is ready to support product proof.

### 1.1 Add a reusable proof block component
Create a reusable content block for article screenshots and captions.

Suggested location:
- `components/blog/BlogProofFigure.js`
- optional style file if needed

Responsibilities:
- render screenshot
- render caption
- render optional proof note
- keep layout responsive

### 1.2 Add CRM proof screenshots to the first 2–4 blog posts
Use real CRM screenshots only.

Recommended first posts:
- `app/7-key-factors-for-choosing-salon-crm-software/page.js`
- `app/why-salons-fall-behind-without-crm-software/page.js`
- `app/the-importance-of-integrated-marketing/page.js`
- `app/how-to-automate-your-salon-marketing-with-swalook/page.js`

Screenshot types to use:
- CRM dashboard
- appointments
- marketing templates
- analytics or reports

### 1.3 Update blog content to reference the matching feature page
Each article should point to one primary product surface:
- CRM guide → `/salon-crm-features`
- CRM benefits → `/salon-crm-features`
- integrated marketing → `/salon-marketing-templates`
- automation → `/salon-marketing-templates`
- appointment content → `/salon-appointment-scheduling-software`
- analytics content → `/salon-analytics-software`

### 1.4 Add proof captions and alt text
Every screenshot block should have:
- short caption,
- descriptive alt text,
- and a clear reason why it matters.

### 1.5 Keep blog layout stable
Do not break:
- `components/BlogPostLayout.js`
- article route URLs
- blog index behavior

---

## Phase 2 — Feature page proof upgrade
After the blog is proof-led, make the feature pages look like real product pages.

### 2.1 Redesign the shared feature shell
Focus on:
- `components/FeaturePage.js`
- `components/FeaturePage.module.css`

Needed improvements:
- stronger visual hierarchy
- screenshot/media block
- proof section
- better CTA structure
- better differentiation by feature
- better mobile spacing

### 2.2 Add feature-specific media blocks
Feature pages should be able to show:
- dashboard screenshot
- appointments screenshot
- invoice screenshot
- inventory screenshot
- loyalty screenshot
- staff attendance screenshot
- inquiry screenshot
- marketing screenshot

### 2.3 Make the feature hub more directional
Improve:
- `app/salon-crm-features/page.js`

The hub should:
- act as a directory,
- route to depth pages,
- and feel more like a product map.

### 2.4 Add related blog links on feature pages
Every feature page should link back to:
- a blog article,
- the feature hub,
- and a conversion route.

### 2.5 Keep feature claims contract-backed
Only use language supported by:
- `backend-contract-map.md`
- `crm-product-map.md`
- `claims-matrix.md`

---

## Phase 3 — Screenshot capture workflow
This is the operational proof step.

### 3.1 Use approved local auth for CRM / super-admin screenshots
For local verification and screenshots, use:
- username: `9900000001`
- password: `Swalook@123`

Use only for local capture and verification.

### 3.2 Capture screenshots in this order
1. feature hub
2. dashboard
3. appointments
4. marketing templates
5. analytics
6. inventory
7. loyalty
8. staff attendance
9. inquiry management
10. invoice / billing
11. mobile app if needed

### 3.3 Store screenshots in a non-junk location
Do not leave generated screenshots in `public/`.

Preferred location:
- temporary verification folder or
- dedicated docs/proof assets folder if the repo standard allows it

### 3.4 Regenerate blog screenshots after proof blocks are added
Once screenshots are embedded into articles:
- recapture the updated blog pages,
- verify layout,
- verify mobile behavior,
- verify no overflow,
- and confirm screenshots look intentional.

---

## Phase 4 — Cleanup and structural hardening
Only after the core proof work is in place.

### 4.1 Keep only real routes
Do not remove:
- `app/careers`
- `app/mobile-app`
- feature folders
- redirect routes like `/crm`

### 4.2 Remove only true junk
Safe cleanup targets:
- unused default assets
- temporary screenshot artifacts
- verification-only files that are not meant for production

### 4.3 Remove unnecessary client wrappers
Review route files and remove `'use client'` where not needed:
- article route pages
- static feature routes
- redirect pages

### 4.4 Split the shared templates only if needed
If the shell becomes too large:
- split `FeaturePage`
- split blog proof figure blocks
- keep route pages thin

---

## 5) Concrete file list for the first build pass

### Blog files
- `components/blog/BlogPostLayout.js`
- `components/blog/blogData.js`
- `components/blog/articles/7-key-factors.js`
- `components/blog/articles/why-salons-fall-behind-without-crm-software.js`
- `components/blog/articles/the-importance-of-integrated-marketing.js`
- `components/blog/articles/how-to-automate-your-salon-marketing-with-swalook.js`
- `app/7-key-factors-for-choosing-salon-crm-software/page.js`
- `app/why-salons-fall-behind-without-crm-software/page.js`
- `app/the-importance-of-integrated-marketing/page.js`
- `app/how-to-automate-your-salon-marketing-with-swalook/page.js`
- `app/blogs/page.js`

### Feature files
- `components/FeaturePage.js`
- `components/FeaturePage.module.css`
- `app/salon-crm-features/page.js`
- `app/salon-dashboard-software/page.js`
- `app/salon-appointment-scheduling-software/page.js`
- `app/salon-analytics-software/page.js`
- `app/salon-invoice-software/page.js`
- `app/salon-inventory-management-software/page.js`
- `app/salon-loyalty-program-software/page.js`
- `app/salon-marketing-templates/page.js`
- `app/salon-expense-management-software/page.js`
- `app/salon-inquiry-management/page.js`
- `app/salon-staff-attendance-software/page.js`
- `app/mobile-app/page.js`

### Planning files
- `docs/landing-page-audit/production-plan/blog-crm-integration-plan.md`
- `docs/landing-page-audit/production-plan/feature-page-production-plan.md`
- `docs/landing-page-audit/production-plan/blog-feature-implementation-roadmap.md`

---

## 6) Recommended implementation sequence

### Sprint 1
- Add blog proof figure component
- Add CRM screenshots to 2 blog posts
- Update blog copy to tie into feature pages

### Sprint 2
- Redesign shared `FeaturePage`
- Add screenshot blocks to feature pages
- Improve the feature hub

### Sprint 3
- Re-run build
- Re-run browser verification
- Capture updated screenshots
- Remove any remaining junk assets

### Sprint 4
- Review blog index hierarchy
- Add related blog links to feature pages
- Tighten claims and metadata

---

## 7) Acceptance criteria

The roadmap is implementation-ready when:
- blog posts include real CRM proof where relevant,
- feature pages show proof and feel production-grade,
- the feature hub routes cleanly into depth pages,
- screenshots are captured and stored cleanly,
- public routes remain stable,
- and the build passes under Node 20.

---

## 8) Definition of done for the first implementation pass

The first pass is done when:
- at least 2–4 blog posts include CRM proof blocks,
- the first feature-page redesign pass is complete,
- screenshots are re-captured,
- the blog index still works,
- the build still passes,
- and no junk assets remain in the production public folder.

## Next step
Implement the blog proof block and add the first CRM screenshots to the highest-impact articles.
