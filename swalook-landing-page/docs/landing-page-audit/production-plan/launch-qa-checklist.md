# Launch QA Checklist

> Status: production readiness gate  
> Purpose: define the final go/no-go checks for the Swalook landing-page system before public release.

## Source basis
This checklist is grounded in the following repo evidence:
- `../proof-map.md`
- `../claims-matrix.md`
- `../brand-connectivity-map.md`
- `../backend-contract-map.md`
- `../crm-product-map.md`
- `../asset-motion-plan.md`
- `../homepage-blueprint.md`
- `../feature-page-system.md`
- `../blog-growth-system.md`
- `../measurement-plan.md`
- `../page-hierarchy.md`

## Scope
This checklist applies to the production-plan deliverables in this folder and the audit docs that feed them.

It is the final gate before shipping:
- homepage changes
- feature-page changes
- blog-system changes
- claims / proof changes
- motion / asset changes
- CTA / funnel changes
- measurement wiring

## QA principles
- Verify against source docs, not memory.
- Separate current-state from future-state.
- If a claim cannot be proven, remove it or mark it future-state.
- If a page cannot be reached or measured, it is not launch-ready.
- If a dependency is unresolved, block release until it is resolved.

---

## 1) Content and claims QA

### Claims
- [ ] Every public claim is classified as market-now, market-carefully, or future-state in `claims-matrix.md`
- [ ] Every claim maps to a proof source in `proof-map.md`
- [ ] No quantified outcome claims are published without approved evidence
- [ ] No future-state feature is presented as current-state fact
- [ ] Brand language matches the approved narrative in `brand-connectivity-map.md`

### Copy consistency
- [ ] Product naming is consistent across homepage, feature pages, and blog
- [ ] CTA labels are consistent across the funnel
- [ ] Support pages do not contradict money pages
- [ ] Page copy matches the route’s role in `page-hierarchy.md`
- [ ] FAQ answers stay within supported product truth
- [ ] Copy does not promote any claim beyond its proof-map support tier

---

## 2) Route and hierarchy QA

### Navigation and reachability
- [ ] Homepage links to the correct money pages and conversion pages
- [ ] Feature pages link back to the feature hub and to a conversion route
- [ ] Blog posts link to at least one money page and one related article
- [ ] Trust pages do not become dead ends
- [ ] Contact, demo, and trial routes are reachable from all high-intent pages

### Canonical and hierarchy
- [ ] One canonical route exists per core intent
- [ ] No duplicate page targets compete for the same query family
- [ ] Future pages are not allowed to override current-state money pages
- [ ] Page priorities match the hierarchy plan
- [ ] Index/noindex decisions are documented where needed

---

## 3) Homepage QA

### Above the fold
- [ ] Hero communicates the product in one sentence
- [ ] Primary CTA is visible without confusion
- [ ] Secondary CTA does not compete with the primary CTA
- [ ] Hero proof is minimal and source-backed
- [ ] Mobile view keeps the main CTA within the first viewport

### Section flow
- [ ] Section order matches `homepage-blueprint.md`
- [ ] Proof appears before over-explaining features
- [ ] Feature grouping is clear and scannable
- [ ] No section introduces unsupported claims
- [ ] Final CTA is visually distinct and easy to find

### Mobile behavior
- [ ] No horizontal overflow
- [ ] No text clipping in buttons, cards, or badges
- [ ] Cards stack cleanly
- [ ] Motion is reduced or softened on mobile
- [ ] Images or hero media do not push CTA below the fold unnecessarily

---

## 4) Feature-page QA

- [ ] One feature per page
- [ ] Hero makes the feature obvious immediately
- [ ] Proof block maps to a real product surface
- [ ] Business outcome section does not overstate results
- [ ] Related feature links are present
- [ ] CTA routing matches the feature-page system
- [ ] FAQ is present only when it adds value
- [ ] No feature page duplicates another page’s intent

---

## 5) Blog and SEO QA

### Content structure
- [ ] Every post has one primary query family
- [ ] Every post has one primary money-page target
- [ ] Every post belongs to a cluster
- [ ] No two posts target the same intent without a clear reason
- [ ] FAQ sections appear only where useful

### Technical SEO
- [ ] Metadata is unique
- [ ] Canonical URLs are correct
- [ ] Schema matches visible content
- [ ] Sitemap coverage includes the intended indexable pages
- [ ] Robots rules match the intended crawl strategy

### Internal linking
- [ ] Posts link to money pages
- [ ] Posts link to related content
- [ ] Blog hubs route users into conversion paths
- [ ] Anchor text is descriptive and non-duplicative
- [ ] No orphan content remains

---

## 6) Motion and asset QA

### Motion
- [ ] Motion is limited to the approved hierarchy
- [ ] Micro-interactions are short and predictable
- [ ] Section motion supports reading order
- [ ] Hero motion is justified by clarity, not decoration
- [ ] No motion pattern creates distraction near the primary CTA

### Assets
- [ ] All meaningful images have alt text
- [ ] All images are verified for public use
- [ ] Proof images are real artifacts or clearly labeled mockups
- [ ] Reused visuals keep consistent meaning
- [ ] Assets do not create layout shift or slow the page unnecessarily

---

## 7) Measurement QA

- [ ] Key CTA clicks are tracked
- [ ] Blog-to-money-page clicks are tracked
- [ ] Page-type performance can be reviewed
- [ ] Refresh and consolidation decisions can be measured
- [ ] Analytics implementation matches `measurement-plan.md`
- [ ] Any pages promised as measurable are actually wired for measurement

---

## 8) Accessibility and performance QA

### Accessibility
- [ ] Headings are hierarchical and sensible
- [ ] Buttons and links are labelled clearly
- [ ] Images have appropriate alt text
- [ ] Interactive controls are keyboard accessible
- [ ] Focus states are visible

### Performance
- [ ] Mobile load is acceptable
- [ ] Media is optimized
- [ ] Motion does not create obvious jank
- [ ] No large asset blocks delay the first meaningful view
- [ ] Critical content remains readable if motion is disabled

---

## 9) Funnel QA

- [ ] Primary CTA is the clearest action on the page
- [ ] Secondary CTA is intentionally lower emphasis
- [ ] Conversion pages match the intent of the source page
- [ ] Forms are short enough for the funnel stage
- [ ] Reassurance copy is present where users need it
- [ ] No page over-rotates into competing CTAs

---

## 10) Go / no-go decision

### Go
Only mark the release ready if:
- claims are source-backed
- routes are correct
- CTAs are consistent
- QA items are complete
- measurement is wired
- mobile is clean
- no unresolved dependency remains

### No-go
Block launch if any of the following is true:
- a public claim has no proof source
- a page is missing its canonical route or internal links
- a CTA goes to the wrong funnel step
- a future-state concept is being treated as live
- a critical page is not measurable
- mobile layout is broken

---

## Handoff
Before release, the agent responsible for QA should leave:
- QA status summary
- blocked items
- proof gaps
- route gaps
- measurement gaps
- final go / no-go recommendation

## Completion criteria
This file is complete when:
- it can be used as the final release gate
- it references the production-plan source docs cleanly
- it blocks unsupported claims and broken routes
- it is specific enough to execute without interpretation
