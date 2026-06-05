# 13 — Product Pages Audit

> **Priority:** P1 (High)  
> **Goal:** All 11 product pages use the canonical FeaturePage template consistently. salon-crm-features outlier is handled.

---

## Current State

### FeaturePage Template (`components/product/FeaturePage.js`)
Sections: Hero → Summary Grid → Key Features → Compare → CTA → Other Features

Props contract:
- `icon`, `title`, `heroDesc`, `whyTitle`, `whyDesc`
- `keyFeatures[]` — 5-6 items with `title` + `desc`
- `compareTitle`, `compareDesc`
- `withPoints[]` — 3 bullet points
- `withCta` — closing CTA text
- `currentSlug` — for filtering "other features"

### Pages Using FeaturePage ✅
| # | Page | Status |
|---|------|--------|
| 1 | `salon-analytics-software` | ✅ |
| 2 | `salon-appointment-scheduling-software` | ✅ |
| 3 | `salon-dashboard-software` | ✅ |
| 4 | `salon-invoice-software` | ✅ |
| 5 | `salon-inventory-management-software` | ⚠️ Wrong import path |
| 6 | `salon-loyalty-program-software` | ✅ |
| 7 | `salon-staff-attendance-software` | ⚠️ Wrong import path |
| 8 | `salon-marketing-templates` | ✅ |
| 9 | `salon-inquiry-management` | ✅ |
| 10 | `salon-expense-management-software` | ✅ |

### Outlier: `salon-crm-features` ❌
- Custom page with `Features.module.css`
- Has inline `style={{}}` blocks
- Own hero, feature grid, why section, with section
- Feature grid duplicates what `FeaturePage`'s "Other Features" section does
- Has its own nav-style links to feature pages (10 cards)

**Recommendation:** Keep as custom hub — it's a directory/navigation page, not a feature page. But:
- Extract inline styles to CSS module
- Consider using a shared `FeatureHubTemplate` if more hub pages are planned

---

## Checklist

### Import Fixes
- [ ] Fix `salon-inventory-management-software/page.js` import path
- [ ] Fix `salon-staff-attendance-software/page.js` import path
- [ ] Verify all 10 FeaturePage pages build correctly

### Content Consistency Audit
- [ ] Verify each page has unique `heroDesc` (not boilerplate)
- [ ] Verify each page has unique `whyTitle` + `whyDesc`
- [ ] Verify each page has 5-6 relevant `keyFeatures`
- [ ] Verify each page has 3 unique `withPoints`
- [ ] Verify `compareTitle` + `compareDesc` are unique per page
- [ ] Check for duplicate/overlapping claims across pages

### Feature Hub (salon-crm-features)
- [ ] Extract all inline `style={{}}` blocks to `Features.module.css`
- [ ] Add responsive breakpoints to extracted styles
- [ ] Verify feature card links point to correct product pages
- [ ] Verify "Why Choose" and "With Swalook" sections don't repeat product page content

### Duplicate Content Risk
The feature hub summarizes all 10 features. Each feature page goes deep on one. Risk: hub and depth pages competing for same keywords.

- [ ] Feature hub targets broad "salon CRM features" intent
- [ ] Feature pages target specific "salon [feature] software" intent
- [ ] No two feature pages target the same keyword
- [ ] Feature hub links to depth pages clearly

---

## Success Criteria
- All 10 product pages use FeaturePage with correct imports
- Feature hub has zero inline layout styles
- No duplicate keyword targeting across feature pages
- Feature hub routes visitors to correct depth pages
