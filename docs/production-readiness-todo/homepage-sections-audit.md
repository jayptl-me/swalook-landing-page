# 14 — Homepage Sections Audit

> **Priority:** P1 (High)  
> **Goal:** Section order matches the blueprint, all data is extracted to a separate file, mobile CTA visibility is ensured.

---

## Current Section Order vs Blueprint

| # | Current Section | Blueprint Spec | Match? |
|---|----------------|----------------|--------|
| 1 | `HomeHeroSection` | Hero / Primary Value Proposition | ✅ |
| 2 | `HomeRouteSection` | (Extra — route index) | ⚠️ Not in blueprint |
| 3 | `HomeAboutSection` | Trust Strip / Core Positioning | ✅ |
| 4 | `HomeServicesSection` | Featured Capabilities / Use Cases | ✅ |
| 5 | `HomeProvideSection` | Core Benefits / Value Props | ✅ |
| 6 | `HomeWhySection` | Product Overview | ✅ |
| 7 | `HomeRetentionSection` | Proof / Evidence | ✅ |
| 8 | `HomeTestimonialsSection` | No-show proof | ✅ |
| 9 | `HomeCTASection` | Mid-page CTA | ✅ |
| 10 | `HomeFeaturesOverviewSection` | Use Cases (audience segmentation) | ✅ |
| 11 | `HomeFAQSection` | FAQ / Objection Handling | ✅ |

**Missing from blueprint's recommendation:** Final CTA after FAQ. The page ends with FAQ — no closing conversion block.

---

## Data Extraction

`app/(marketing)/page.js` currently contains ~120 lines of data arrays:
- `heroHighlights`
- `featureGroups`
- `whatSwalookHelps`
- `whyReasons`
- `retentionItems`
- `noShowItems`
- `useCases`
- `faqItems`
- `routeConnections`

**Action:** Move all data to `components/home/homeData.js`, import into page file.

---

## Mobile CTA Visibility

Check homepage at 375px viewport:
- [ ] Hero CTA buttons visible in first viewport
- [ ] Mid-page CTA section (`HomeCTASection`) clearly visible
- [ ] FAQ section is scannable with touch-friendly accordions
- [ ] Final CTA is present after FAQ (currently missing!)

---

## Checklist

### Data Extraction
- [ ] Create `components/home/homeData.js`
- [ ] Export all data arrays as named exports
- [ ] Update `app/(marketing)/page.js` to import data
- [ ] Verify homepage renders identically after extraction
- [ ] Homepage page file is < 40 lines

### Section Order
- [ ] Verify section order matches blueprint
- [ ] Consider moving `HomeRouteSection` lower or removing it (it's a nav index, not a value section)
- [ ] Add final CTA section after FAQ

### Mobile
- [ ] Verify all sections stack cleanly on 375px
- [ ] Hero CTA buttons are thumb-tappable
- [ ] Feature cards don't overflow
- [ ] Testimonial/retention grids collapse properly

---

## Success Criteria
- Homepage data is in a separate file
- Page file is component-composition only (< 40 lines)
- Section order is logical and conversion-optimized
- Final CTA exists after FAQ
- Mobile layout is clean at all breakpoints
