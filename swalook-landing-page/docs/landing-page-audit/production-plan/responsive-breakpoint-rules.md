# Swalook Landing Page Responsive Breakpoint Rules

> Status: implementation scaffold  
> Purpose: define how the landing page should adapt across screen sizes so future page work stays consistent, readable, and non-repetitive.

---

## 1) Breakpoint philosophy

The Swalook landing page should follow a **mobile-first, content-led, layout-adaptive** approach.

That means:
- mobile layout is the default mental model
- tablet is a controlled expansion, not a separate redesign
- desktop introduces richer composition
- large desktop increases breathing room, not visual complexity

The goal is not to make every page identical at every width.  
The goal is to make every page feel intentionally designed for its screen size.

---

## 2) Device tiers

### Mobile
Suggested range:
- up to 767px

Primary goals:
- one-column readability
- large tap targets
- minimal horizontal pressure
- stacked content blocks
- compressed motion and decoration
- clear CTA visibility

### Tablet
Suggested range:
- 768px to 1024px

Primary goals:
- selective two-column layouts
- readable card grids
- controlled sidebar behavior
- balanced spacing
- no overcrowding

### Desktop
Suggested range:
- 1025px to 1439px

Primary goals:
- meaningful split layouts
- stronger page hierarchy
- side content where useful
- richer visual rhythm
- stable max-width control

### Large desktop
Suggested range:
- 1440px and above

Primary goals:
- keep content centered
- prevent stretched line lengths
- allow premium spacing without extra clutter
- use asymmetry intentionally, not by default

---

## 3) Global responsive rules

### Rule 1 — content must never depend on a fixed width
Use flexible layout containers, grid minmax values, and safe wrapping behavior.

Avoid:
- fixed card widths
- rigid multi-column structures on small screens
- layout assumptions that break when text grows

Use:
- `minmax(0, 1fr)`
- `width: 100%`
- `max-width` on content wrappers
- flexible gaps

---

### Rule 2 — stack before you shrink
If a section becomes cramped, stack it instead of squeezing it.

Examples:
- hero split sections
- content/sidebar layouts
- feature proof blocks
- form grids
- blog card media/content layouts

---

### Rule 3 — preserve content hierarchy
Responsive behavior should never flatten the story.

Even on mobile:
- the main message comes first
- proof follows
- detail comes after
- CTA remains visible

---

### Rule 4 — keep tap targets touch-safe
Interactive elements should be comfortably tappable on mobile.

Minimum practical behavior:
- tall buttons
- spaced tabs
- clear accordion rows
- accessible card links
- no tiny click targets packed together

---

### Rule 5 — avoid layout jumps from decorative elements
Background orbs, gradients, and motion should not affect reading order or cause overflow.

Decorations must:
- sit behind content
- not create horizontal scrolling
- not interfere with clickable elements

---

## 4) Layout rules by page family

### A. Marketing pages
Includes:
- homepage
- about
- contact
- careers
- faq
- book demo
- free trial
- mobile app

Rules:
- hero should compress cleanly on mobile
- split sections stack at tablet and below
- cards should become one column as content gets dense
- CTA blocks should always remain visible and obvious
- use a more editorial feel on desktop, not a dense dashboard

### B. Product pages
Includes:
- feature hub
- feature depth pages

Rules:
- desktop can use proof + summary splits
- mobile should prioritize the feature promise first
- proof visual should appear before deep lists if it supports understanding
- feature cards should group into readable rows on tablet and stack on mobile
- repeated CTA language should not feel copy-pasted

### C. Content pages
Includes:
- blogs
- blog posts

Rules:
- long-form text must stay comfortable to read
- sidebar should drop below content on smaller screens
- article cards should become single-column on mobile
- category tabs should horizontally scroll only if necessary
- line length should be controlled on desktop

### D. Legal pages
Rules:
- narrow content width
- minimal decorative motion
- consistent heading spacing
- long paragraphs should stay easy to scan
- keep layouts calm and predictable

---

## 5) Section-level responsive rules

### Hero sections
Mobile:
- stack content
- reduce decorative pressure
- make CTA buttons full width where needed

Tablet:
- allow hero splits only if they remain readable

Desktop:
- hero may use split composition or visual panel

Large desktop:
- keep hero content centered and readable

---

### Split sections
Examples:
- hero + visual
- text + image
- explanation + proof
- content + sidebar

Rules:
- stack at tablet or below if either column becomes visually crowded
- avoid leaving the text side too narrow
- make sure media height stays controlled
- preserve order so the primary content remains first on mobile

---

### Card grids
Rules:
- 3-column grids can become 2-column on tablet
- 2-column grids should collapse to 1 column on mobile
- card content should wrap cleanly
- do not rely on card widths that force overflow
- keep card heights flexible unless strict alignment is necessary

---

### Tables
Tables are the weakest mobile pattern.

Rules:
- do not rely on full desktop tables for mobile-first pages
- convert tables into stacked cards or responsive rows where possible
- if a table must remain, provide a mobile alternative layout

This is especially important for:
- careers openings
- any future admin-style data blocks

---

### Forms
Rules:
- form fields should stack on mobile
- avoid multi-column forms unless the device width justifies it
- CTA buttons should be full width or near-full width on smaller screens
- labels must remain readable and associated with inputs

---

## 6) Spacing rules

### Mobile
- tighter vertical rhythm
- reduced section padding
- smaller card padding
- short gaps between related elements

### Tablet
- moderate spacing
- keep breathing room between columns
- avoid huge empty whitespace

### Desktop
- stronger section separation
- keep the overall flow clear
- allow more room for media and supporting content

### Large desktop
- expand spacing carefully
- do not increase line length too much
- maintain a centered content block

---

## 7) Typography rules

### Mobile
- use clamp-based title sizing where possible
- avoid titles that become too tall or too wide
- keep body text comfortable to scan

### Tablet
- preserve hierarchy while preventing oversized headers from dominating

### Desktop
- allow stronger display typography
- ensure body copy still supports quick reading

### Large desktop
- control line length first, then increase type scale if needed

---

## 8) Motion rules

Motion must support comprehension, not compete with it.

Rules:
- keep motion subtle on mobile
- avoid large floating orbs that create clutter
- use reveal timing sparingly
- do not animate layout-critical elements in a way that shifts content unexpectedly

---

## 9) Content-specific rules

### Home page
- keep the hero strong on mobile
- reduce section density
- preserve clear route links and CTA flow

### Feature pages
- place the feature promise before the detailed list
- keep the proof panel readable on smaller screens
- vary section ordering when the feature intent demands it

### Blog pages
- preserve reading comfort above all else
- make sidebar behavior predictable
- keep internal links clearly distinct

### Careers
- replace or augment the openings table on mobile with stacked cards if possible
- keep roles scannable and actions obvious

### Contact and forms
- avoid cramped input layouts
- keep submit actions prominent
- stack newsletter and lead form controls on small screens

---

## 10) Implementation guardrails

When editing layouts, follow these rules:

- do not fix one page by breaking the family system
- do not introduce page-specific CSS that duplicates the same breakpoint logic everywhere
- do not let a component define its own unique responsive system unless it truly needs one
- prefer shared responsive primitives over one-off overrides
- if a page needs a different layout pattern, create a variant instead of stretching the old one

---

## 11) Recommended next steps

1. Split the shared product feature template into smaller variant blocks.
2. Create a responsive section primitive set for marketing pages.
3. Add a mobile-safe alternative for careers openings.
4. Normalize the homepage into composable sections.
5. Keep blog and legal layout behavior isolated.
6. Verify each family on mobile, tablet, desktop, and large desktop.

---

## 12) Outcome

If these rules are followed, the Swalook landing page will become:

- easier to maintain
- easier to extend
- more consistent across devices
- less repetitive in composition
- more professional in layout quality
- better aligned with production marketing standards
