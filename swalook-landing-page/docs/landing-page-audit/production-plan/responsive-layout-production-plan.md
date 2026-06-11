# Swalook Landing Page Responsive Layout Production Plan

> Status: research complete, implementation pending  
> Purpose: audit the current landing page system, identify repetition and responsive gaps, and define a production-grade route, component, and folder structure for all screen sizes.

---

## 1) Executive summary

The Swalook landing page project is **not yet fully production-grade in responsive layout coverage**.

It already has:
- a strong route inventory,
- reusable shells for homepage, feature pages, blog posts, FAQ, demo/trial/contact, and policy pages,
- a consistent brand direction,
- and enough structure to support a serious marketing and SEO system.

What it does **not** yet have:
- page-type-specific layouts,
- device-specific responsive variants per page family,
- a clearly separated folder structure,
- a proof-led feature-page system,
- a documented content hierarchy,
- or a formal way to keep page compositions non-repetitive.

In short:

- **The site works**
- **The site is reusable**
- **The site is not yet organized like a production-grade multi-page marketing system**

This document records what was found and defines the path to fix it.

---

## 2) What I inspected

### Shared shells and core route files
- `app/layout.js`
- `app/page.js`
- `components/FeaturePage.js`
- `components/PageHero.js`
- `components/BlogPostLayout.js`
- `components/Navbar.js`
- `components/Footer.js`

### Existing audit docs
- `docs/landing-page-audit/master-roadmap.md`
- `docs/landing-page-audit/page-system.md`
- `docs/landing-page-audit/home-page-sections.md`
- `docs/landing-page-audit/crm-product-map.md`
- `docs/landing-page-audit/brand-connectivity-map.md`
- `docs/landing-page-audit/agent-plan.md`

### Route inventory
Observed routes include:
- homepage
- about
- blogs and blog posts
- feature hub
- 10 feature depth pages
- mobile app
- book demo
- free trial
- contact
- FAQ
- policies
- `/crm` redirect

---

## 3) Current-state summary

### What works
- The site already has a meaningful public route ecosystem.
- Shared shells reduce duplication.
- Blog and feature pages are connected to conversion surfaces.
- The homepage already carries a full marketing story.
- The CRM shell and backend maps support real product claims.

### What is weak
- The site is still **template-led**, not **page-led**.
- Feature pages are too similar to each other.
- The homepage is large and monolithic.
- The shared `FeaturePage` shell is too generic.
- Responsive behavior is not formalized per page type.
- The folder structure does not yet reflect marketing architecture.

### What is missing
- route groups for page families,
- page-specific component variants,
- a proof/screenshot system for feature pages,
- a responsive design matrix,
- a documented hierarchy for content and conversion,
- and a production scaffold that future pages can follow.

---

## 4) Route classification

### Tier 1 — core conversion and brand routes
These are the highest-value routes:
- `/`
- `/salon-crm-features`
- `/book-demo`
- `/free-trial`
- `/contact`

Role:
- primary entry
- product explanation
- conversion

### Tier 2 — feature depth routes
These pages explain product value and capture search intent:
- `/salon-dashboard-software`
- `/salon-appointment-scheduling-software`
- `/salon-analytics-software`
- `/salon-invoice-software`
- `/salon-inventory-management-software`
- `/salon-loyalty-program-software`
- `/salon-marketing-templates`
- `/salon-expense-management-software`
- `/salon-inquiry-management`
- `/salon-staff-attendance-software`
- `/mobile-app`

Role:
- feature proof
- SEO intent capture
- funnel bridge

### Tier 3 — educational and trust routes
- `/blogs`
- blog post routes
- `/about`
- `/faq`

Role:
- education
- trust
- objection handling

### Tier 4 — utility/legal routes
- `/terms-conditions`
- `/privacy-policy`
- `/cancellation-policy`
- `/shipping-policy`

Role:
- compliance
- footer utility
- trust

### Tier 5 — future growth routes
Not yet in the repo, but recommended later:
- pricing
- comparison pages
- city pages
- use-case pages
- case studies
- demo walkthrough pages

---

## 5) Current page family analysis

## A) Homepage

### What it does now
The homepage already functions as:
- brand statement
- feature overview
- outcome story
- conversion page

### What is strong
- clear CTA flow
- good product breadth
- good retention/no-show narrative
- good route connectivity

### What is repetitive or too heavy
- many sections are structurally similar
- large file size
- repeated card/grid patterns
- no formal section variant system
- some content blocks could be split into smaller modules

### Responsive issue pattern
- likely too much vertical stacking on mobile
- some grids need stronger breakpoint behavior
- section order is good, but section density needs control
- content needs a more formal mobile-first hierarchy

---

## B) Feature hub

### What it should be
`/salon-crm-features` should become the **product directory and navigation hub**.

### Current concern
If it remains visually generic, it becomes just another landing page instead of the architecture page for the product system.

### Needed behavior
- clearer feature grouping
- stronger visual hierarchy
- mobile-safe card grid behavior
- explicit routing into depth pages
- proof snippets or screenshot entry points
- no repetition of the homepage layout pattern

---

## C) Feature depth pages

### What they are now
All feature pages currently appear to be variations of one shared template.

### Why that is a problem
Different features have different user intents:
- dashboard = visibility
- appointments = scheduling
- analytics = data
- invoices = finance
- inventory = operations
- loyalty = retention
- marketing templates = communication
- staff attendance = workforce control
- inquiry management = lead flow
- expense management = cost control
- mobile app = compact access

These should not feel like the same page with different text.

### What should change
Each feature page should:
- keep a shared base system
- use a distinct content rhythm
- use feature-specific proof blocks
- have a feature-specific visual treatment
- have unique responsive stacking priorities
- still share design tokens and CTA language

---

## D) Blog pages

### What works
The blog layout is the strongest current page architecture.

### Why
It already has:
- breadcrumb
- meta information
- main content area
- sidebar
- related posts
- CTA areas
- structured reading flow

### What it needs
- stronger cluster strategy
- more distinct mobile/sidebar behavior
- canonical and SEO rules
- internal linking discipline to money pages

---

## E) Utility pages
Pages like demo, trial, contact, FAQ, and policies are functional, but they should be simplified into their own route family so they do not inherit the complexity of marketing pages.

---

## 6) Findings from the research pass

### Repetitive patterns
The biggest repetition is in:
1. feature pages
2. CTA patterns
3. hero patterns
4. grid sections
5. shared layout language without enough page-specific variation

### Strong reusable patterns
These should be preserved:
- Navbar
- Footer
- BlogPostLayout
- shared CTA styles
- shared motion system
- shared section spacing tokens

### Missing responsive system
The project does **not** yet define:
- mobile-first page variants
- tablet-specific composition rules
- desktop vs large-desktop layout differences
- component-level responsive variants
- page-type-specific max-width and rhythm rules

### Missing structure
The current route organization does not map cleanly to:
- marketing pages
- product pages
- content pages
- utility pages
- legal pages

That is the core architectural issue.

---

## 7) Production-grade folder restructure plan

## Recommended app structure

```txt
app/
  (marketing)/
    page.js
    about/page.js
    contact/page.js
    careers/page.js
    faq/page.js
    book-demo/page.js
    free-trial/page.js
    mobile-app/page.js

  (product)/
    salon-crm-features/page.js
    salon-dashboard-software/page.js
    salon-appointment-scheduling-software/page.js
    salon-analytics-software/page.js
    salon-invoice-software/page.js
    salon-inventory-management-software/page.js
    salon-loyalty-program-software/page.js
    salon-marketing-templates/page.js
    salon-expense-management-software/page.js
    salon-inquiry-management/page.js
    salon-staff-attendance-software/page.js

  (content)/
    blogs/page.js
    blogs/[slug]/page.js
    7-key-factors-for-choosing-salon-crm-software/page.js
    why-salons-fall-behind-without-crm-software/page.js
    the-importance-of-integrated-marketing/page.js
    how-to-automate-your-salon-marketing-with-swalook/page.js

  (legal)/
    privacy-policy/page.js
    terms-conditions/page.js
    cancellation-policy/page.js
    shipping-policy/page.js

  crm/page.js
```

## Recommended component structure

```txt
components/
  layout/
    Navbar.js
    Footer.js
    SiteShell.js

  marketing/
    Hero/
    CTA/
    Stats/
    SplitSection/
    FeatureGrid/
    TrustStrip/

  product/
    FeaturePage/
      FeatureHero.js
      FeatureProof.js
      FeatureBenefits.js
      FeatureComparison.js
      FeatureMedia.js
      FeatureCTA.js
      RelatedLinks.js

  blog/
    BlogPostLayout.js
    BlogBreadcrumb.js
    BlogMeta.js

  ui/
    Button.js
    Card.js
    Badge.js
    SectionHeading.js
    ResponsiveImage.js
```

## Recommended documentation structure

```txt
docs/landing-page-audit/
  master-roadmap.md
  page-system.md
  home-page-sections.md
  blog-seo-geo-strategy.md
  asset-and-motion-system.md
  brand-connectivity-map.md
  backend-contract-map.md
  crm-product-map.md
  content-ops-checklist.md
  seo-measurement-plan.md
  responsive-layout-production-plan.md
```

---

## 8) Responsive layout strategy by screen size

## Mobile
Rules:
- single column first
- stack all split sections
- avoid dense multi-column layouts
- keep CTAs visible early
- increase tap target size
- reduce decorative motion
- keep text blocks compact

## Tablet
Rules:
- use 2-column layouts only when content benefits from it
- preserve generous spacing
- keep cards readable without crowding
- allow section pairing where useful

## Desktop
Rules:
- use multi-column layouts
- add split hero blocks where appropriate
- use stronger visual rhythm
- support side content for blog and feature proof

## Large desktop
Rules:
- maintain controlled max widths
- prevent overly long line lengths
- use asymmetry deliberately
- keep the layout premium, not stretched

---

## 9) Page-by-page layout recommendations

## Homepage
Needs:
- component split
- clearer hierarchy
- stronger responsive control
- section modules extracted
- mobile-friendly density management

## Feature hub
Needs:
- product directory treatment
- grouped feature cards
- unique layout that does not mimic homepage
- a cleaner path to depth pages

## Feature depth pages
Needs:
- page-specific variants
- unique proof sections
- feature-specific content rhythm
- responsive variants by feature type

## Blog pages
Needs:
- editorial structure preserved
- mobile-safe sidebar behavior
- better internal linking
- SEO cluster system

## Utility pages
Needs:
- simpler layouts
- single-intent conversions
- minimal distraction

## Legal pages
Needs:
- narrow content width
- strong readability
- simple, low-friction structure

---

## 10) Production plan for each page family

### Home page
Goal:
- one cohesive story, not a block list

Actions:
- split into reusable sections
- define per-section responsive behavior
- keep motion restrained and meaningful
- add a formal asset plan

### Feature hub
Goal:
- route users into the right capability quickly

Actions:
- make the feature taxonomy obvious
- add card grouping by business function
- use a different layout from the home page

### Feature depth pages
Goal:
- make each feature feel unique while still systemized

Actions:
- build feature-specific hero + proof + benefits + CTA variants
- create a shared base with page overrides
- use screenshots or proof visuals where appropriate

### Blog pages
Goal:
- a real editorial engine

Actions:
- keep blog layout separate from product pages
- enforce one intent per article
- link to matching feature pages
- preserve strong reading comfort

### Utility/legal pages
Goal:
- simple, fast, and readable

Actions:
- separate them into their own route group
- reduce layout noise
- keep content width controlled

---

## 11) What should be reusable vs unique

## Reusable across the site
- navigation shell
- footer shell
- button styles
- spacing tokens
- typography system
- animation primitives
- icon style rules
- grid system base
- CTA language

## Unique by page family
- hero layout
- proof section type
- content ordering
- section density
- sidebar usage
- media strategy
- responsive composition

This is the core principle:
**reuse components, not identical pages**

---

## 12) Claim and product truth boundaries

The public site should be aligned to what the CRM and backend can support.

### Market now
Safe to market now:
- appointment scheduling
- dashboards
- analytics
- billing / invoices
- inventory
- loyalty
- staff and attendance
- inquiry management
- marketing templates
- mobile app positioning

### Market carefully
Check before strong claims:
- real-time depth
- advanced automation
- mobile booking claims
- enterprise positioning
- AI-like wording

### Future-state
Should remain labeled future-state until proven:
- case studies
- comparison pages
- city pages
- pricing page
- advanced walkthroughs

---

## 13) Prioritized backlog

### P0
- Audit and classify all public routes by page family
- Refactor shared feature template into smaller feature modules
- Create route groups for marketing, product, content, and legal pages
- Define responsive rules for mobile, tablet, desktop, and large desktop
- Align page claims with CRM/backend truth

### P1
- Split the homepage into section components
- Rebuild the feature hub as a true product directory
- Add page-specific variants for feature depth pages
- Improve blog connectivity and SEO cluster structure
- Add proof/screenshot blocks to key feature pages

### P2
- Introduce location pages
- Add comparison pages
- Add case studies
- Add richer motion only where it helps comprehension
- Expand documentation for future page creation

---

## 14) Risks identified

- too much repetition across feature pages
- inconsistent responsive behavior between page families
- overpromising beyond backend/frontend support
- breaking internal linking if restructuring is rushed
- creating a folder structure that looks cleaner but does not improve layout quality
- overusing animation and harming mobile performance
- making the homepage do too much work

---

## 15) Recommended rollout sequence

1. Lock route taxonomy.
2. Split folder structure by page family.
3. Modularize the homepage.
4. Redesign the feature page system.
5. Standardize blog layout rules.
6. Separate utility/legal page scaffolds.
7. Add responsive variants and device-specific rules.
8. Verify each page visually on mobile and desktop.
9. Then expand into new pages.

---

## 16) Final answer to the original question

No — the project is **not yet fully responsive across all screen sizes in a production-grade way**.

It has:
- enough routes,
- enough reusable components,
- and enough product truth to become that system,

but it still needs:
- route grouping,
- page-specific variants,
- responsive composition rules,
- and a production scaffold that avoids repetition.

That is the plan captured in this document.

---

## 17) Next implementation file candidates

Recommended next docs to create or update:
- `docs/landing-page-audit/production-plan/page-family-map.md`
- `docs/landing-page-audit/production-plan/responsive-breakpoint-rules.md`
- `docs/landing-page-audit/production-plan/feature-page-variants.md`
- `docs/landing-page-audit/production-plan/homepage-modularization-plan.md`
