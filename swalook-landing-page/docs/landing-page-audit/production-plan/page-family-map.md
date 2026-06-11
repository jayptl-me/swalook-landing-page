# Swalook Landing Page Page Family Map

> Status: implementation scaffold  
> Purpose: define how the public routes should be grouped so layout, responsive behavior, and reusable components can be standardized without making every page look the same.

---

## 1) Why this map exists

The current landing page is functional, but most routes are still organized as standalone pages with duplicated layout logic.  
This map defines the production structure the site should follow so that:

- related pages share the same layout system
- mobile, tablet, desktop, and large-desktop behavior can be handled consistently
- marketing, product, content, and legal pages do not fight each other visually
- reusable components stay reusable without forcing identical page compositions

This is the first scaffold document for the restructure.

---

## 2) Route families

### A. Marketing family
These pages are conversion-led and should share a polished promotional shell.

Routes:
- `/`
- `/about`
- `/contact`
- `/careers`
- `/faq`
- `/book-demo`
- `/free-trial`
- `/mobile-app`

Layout goals:
- strong hero
- clear section rhythm
- CTA visibility
- split sections where useful
- mobile-first stacking on smaller screens

---

### B. Product family
These pages explain the product system and should feel related, but not identical.

Routes:
- `/salon-crm-features`
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

Layout goals:
- shared base product shell
- feature-specific proof blocks
- feature-specific responsive emphasis
- clear cross-linking between feature pages
- less repetition in hero and CTA sections

---

### C. Content family
These pages are educational and should support SEO, trust, and internal linking.

Routes:
- `/blogs`
- `/7-key-factors-for-choosing-salon-crm-software`
- `/how-to-automate-your-salon-marketing-with-swalook`
- `/the-importance-of-integrated-marketing`
- `/why-salons-fall-behind-without-crm-software`

Layout goals:
- editorial reading flow
- strong typography
- stable sidebar behavior where needed
- article-to-product routing
- better mobile readability than marketing pages

---

### D. Legal family
These pages should stay simple, readable, and low distraction.

Routes:
- `/privacy-policy`
- `/terms-conditions`
- `/cancellation-policy`
- `/shipping-policy`

Layout goals:
- narrow content width
- consistent policy shell
- easy scanning
- strong paragraph and list rhythm
- minimal decorative noise

---

### E. Redirect/utility routes
Routes:
- `/crm`

Layout goals:
- act as a routing helper
- never become a visual destination page

---

## 3) Current layout behavior by family

### Marketing
Current state:
- mixed layout patterns
- several pages reuse `PageHero`
- some pages are visually stronger than others
- mobile behavior is acceptable but not fully standardized

Primary issues:
- repeated section structures
- inconsistent density
- no shared marketing section primitives

---

### Product
Current state:
- most routes reuse `FeaturePage`
- the product pages are too copy-driven
- visual rhythm is consistent, but content hierarchy is not distinct enough per feature

Primary issues:
- one template is doing too much
- feature types are not separated into variants
- proof visuals are not standardized per feature type

---

### Content
Current state:
- blog post layout is the strongest system in the repo
- blog index is solid
- responsive collapse is decent
- sidebar/content behavior needs consistent mobile rules

Primary issues:
- article and index layouts should be separated more cleanly
- content pages need stricter SEO and internal-link rules

---

### Legal
Current state:
- stable and simple
- already reusable
- likely low-risk on mobile

Primary issues:
- visual consistency can still be improved
- the shared policy shell should remain separate from marketing templates

---

## 4) Recommended scaffold direction

### Route groups
The app should eventually be organized into route groups so the page family is obvious in the folder tree.

Recommended groups:
- `(marketing)`
- `(product)`
- `(content)`
- `(legal)`

This does not change URLs.  
It changes structure.

---

### Shared layout layers

#### Layer 1 — site shell
- navbar
- footer
- global tokens
- page container rules

#### Layer 2 — family shell
- marketing shell
- product shell
- content shell
- legal shell

#### Layer 3 — page composition
- hero
- proof section
- benefits section
- comparison section
- CTA section
- related links
- article body

#### Layer 4 — responsive variants
- mobile
- tablet
- desktop
- large desktop

---

## 5) What should be reusable vs page-specific

### Reusable
- nav
- footer
- buttons
- section headings
- card primitives
- grid spacing
- motion utilities
- icon treatment
- container widths

### Page-specific
- hero structure
- content ordering
- media placement
- proof blocks
- CTA styling emphasis
- sidebar usage
- responsive density

Rule:
**Reuse the components, not the entire page composition.**

---

## 6) Responsive standards for the restructure

### Mobile
- single column first
- stack split layouts
- avoid dense side rails
- keep tap targets large
- reduce decorative noise
- prioritize CTA and core message

### Tablet
- allow 2-column layouts only when useful
- keep spacing generous
- preserve readability
- avoid hard-to-scan card walls

### Desktop
- use split layouts where they improve comprehension
- keep strong section rhythm
- allow side content for articles and comparison sections

### Large desktop
- keep line lengths controlled
- prevent stretched whitespace
- use larger compositions only when they help hierarchy

---

## 7) Immediate implementation sequence

1. Lock this page-family map as the structure reference.
2. Create a responsive breakpoint rules doc.
3. Split the shared product template into smaller variant blocks.
4. Refactor the homepage into section modules.
5. Normalize marketing pages into one family shell.
6. Keep blog and legal layouts isolated.
7. Verify each route family on mobile and desktop.

---

## 8) Outcome expected from this scaffold

When this structure is applied, the site should become:

- easier to extend
- easier to keep responsive
- less repetitive
- more professional across device sizes
- clearer for future contributors
- better aligned to product, content, and conversion goals

This file is the starting point for that refactor.
