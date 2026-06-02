# Asset and Motion Plan

## Status
- **State:** Draft planning spec
- **Source basis:** `master-roadmap.md`, `execution-pack.md`, `asset-and-motion-system.md`, `home-page-sections.md`
- **Scope:** Media hierarchy, motion hierarchy, asset usage, reuse policy, and mobile performance constraints for the landing-page system
- **Use:** Implementation guide for homepage, feature pages, blog assets, and supporting visuals
- **Guardrail:** Public claims and visuals must stay aligned with backend / CRM truth and approved proof sources

---

## Purpose

This file turns the audit-layer asset and motion guidance into a production-plan workstream.

The goal is to keep the site:
- visually consistent
- motion-light enough for mobile performance
- clear about where proof visuals are required
- disciplined about when to reuse, generate, or screenshot assets
- aligned with the page hierarchy and claims matrix

---

## Current-state truth

The current site already uses:
- section reveal motion
- staggered card motion
- FAQ accordion interactions
- mobile menu state changes
- product-led imagery on selected pages
- icon-led feature grids where screenshots are not required

That is a workable base. The production plan should preserve that lightweight approach.

---

## Motion hierarchy

### 1) Micro-interactions
Use for:
- button hover states
- card hover emphasis
- FAQ expand / collapse
- nav open / close
- small icon movement
- form feedback

Rules:
- keep transitions short
- prefer transform and opacity
- avoid layout shifts
- avoid heavy blur or expensive paint effects
- keep timings consistent across the site

### 2) Section motion
Use for:
- homepage sections
- feature grids
- use-case rows
- blog support sections
- proof blocks
- FAQ previews

Rules:
- motion should guide reading order
- stagger should only be used where there are multiple meaningful items
- alternating left/right reveals are appropriate for longer narrative sections
- keep motion secondary to content

### 3) Hero motion
Use only where it clarifies the primary value proposition.

Recommended use:
- homepage hero
- at most one or two flagship feature pages if needed

Rules:
- hero motion must support clarity
- avoid slideshow behavior unless the message genuinely changes
- keep content legible on first paint
- do not let motion bury the primary CTA on mobile

### 4) 3D / heavy motion
Treat as optional and uncommon.

Rules:
- only use if the asset improves comprehension
- only use if mobile performance is protected
- only use if the visual can be code-split or lazy loaded
- do not use on blog pages or low-intent utility pages unless there is a clear reason

---

## Asset hierarchy

### Asset type 1: Reused assets
Use across multiple pages when the message is the same or closely related.

Examples:
- homepage hero image
- about / trust image
- recurring product screenshots
- consistent icon sets
- supporting brand textures or shapes

### Asset type 2: Screenshot / UI proof assets
Use when a page needs to show an actual workflow or product surface.

Examples:
- dashboard screenshots
- appointment workflow screenshots
- billing or invoice screenshots
- analytics or reports screenshots
- mobile app screens

Rules:
- prefer real or realistically represented product screens
- do not use screenshots as proof unless they reflect the true current state
- keep captions and alt text concise and factual

### Asset type 3: Generated assets
Use only when there is no suitable real product visual.

Examples:
- abstract hero art
- section-specific background art
- social card backgrounds
- cluster-specific illustrations

Rules:
- generate only with a placement plan
- keep the visual language consistent with the site
- do not let generated art imply unsupported functionality

### Asset type 4: Support assets
Use sparingly to improve scannability.

Examples:
- icons
- badges
- workflow diagrams
- simple charts
- separators / background shapes

---

## Placement rules

### Homepage
Preferred asset pattern:
- one hero visual
- one about/trust visual
- one or two workflow visuals in retention/no-show sections
- optional use-case visuals if they add clarity

### Feature pages
Preferred asset pattern:
- one feature-specific screenshot or mockup
- optional proof or workflow visual
- keep visuals tightly tied to the feature and the page intent

### Blog pages
Preferred asset pattern:
- article OG image
- optional inline illustration only when it improves comprehension
- avoid decorative overload

### Trust and utility pages
Preferred asset pattern:
- minimal or no imagery
- keep the page focused on clarity and conversion

---

## Continuity rules

### Visual continuity
All assets should feel like one system.

Keep consistent:
- border radius
- shadow treatment
- crop logic
- contrast levels
- spacing and framing

Avoid:
- mixed illustration styles
- stock imagery that breaks trust
- heavy visual noise on conversion pages
- inconsistent iconography

### Reuse policy
Reuse assets when:
- the same message appears in multiple sections
- the same feature is described in more than one place
- the asset already supports the right proof or trust role

Generate new assets when:
- the page needs a unique visual argument
- no real product screenshot is available
- the cluster needs a distinct identity
- the section needs stronger clarity than text can provide

---

## Alt text rules

Alt text should:
- describe the purpose of the asset
- stay concise
- avoid keyword stuffing
- not repeat the caption verbatim
- reflect the actual content shown

If the image is decorative only, leave the alt text empty in implementation.

---

## Mobile performance constraints

- Keep motion transform/opacity-based where possible.
- Avoid heavy parallax.
- Avoid long-running loops unless they are essential to the page narrative.
- Ensure images do not push the main CTA below the fold unnecessarily.
- Respect reduced-motion users.
- Keep first-view content readable without waiting for animation.

---

## Governance

- Do not add assets without a placement reason.
- Do not add motion without a readability reason.
- Do not use proof visuals that overstate product maturity.
- If a section cannot be supported with the right asset, keep it text-led and minimal.
- Any new visual pattern should be checked against the claims matrix before launch.

---

## Related files
- `asset-and-motion-system.md`
- `home-page-sections.md`
- `page-hierarchy.md`
- `claims-matrix.md`
- `proof-map.md`

## Completion criteria
This file is complete when:
- the homepage and feature pages have a clear motion hierarchy
- asset types are defined and reusable
- proof visuals are tied to actual product surfaces
- the plan stays lightweight enough for mobile performance
- the visual system is consistent across the landing-page ecosystem
