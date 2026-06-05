# 02 — Responsive Hardening

> **Priority:** P0 (Critical)  
> **Goal:** Every page must render correctly at 320px, 375px, 414px, 768px, 1024px, 1280px, 1440px, and 1920px widths. No horizontal overflow, no clipped text, no broken layouts.

---

## Current Breakpoint Strategy

`globals.css` defines 3 breakpoints:
- `max-width: 1024px` — tablet (grid-4 → 2-col, grid-3 → 2-col)
- `max-width: 768px` — mobile (grid-2/3/4 → 1-col, reduced section padding)
- `max-width: 480px` — small mobile (tighter section padding)

**Gap:** These are global fallbacks. Page-specific CSS modules may or may not have their own responsive rules. Many pages use custom grid layouts that aren't covered by the global breakpoints.

---

## Page-by-Page Responsive Audit

### Homepage (`/`)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| 320px | ⚠️ Untested | Hero CTA buttons may stack poorly (3 buttons in a row) |
| 375px | ⚠️ Untested | Same as above |
| 414px | ⚠️ Untested | Hero visual mockup may overflow |
| 768px | ⚠️ Untested | Service card grid (12 cards) needs 2-col fallback |
| 1024px | ⚠️ Untested | 3-col grids should work |
| 1280px+ | ⚠️ Untested | Should be fine with 1200px max-width container |

**Specific concerns:**
- Hero section: 3 CTA buttons side-by-side on mobile → must stack vertically
- Hero visual: the CRM mockup device frame may overflow on < 400px
- Services grid: 12 feature cards in 3-col → must become 2-col at tablet, 1-col at mobile
- Use cases: 3 cards with images + text → must stack cleanly
- Retention/Testimonials grids: 4-column layouts per section → must collapse

### About (`/about`)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | `About.module.css` — `companyGrid`, `missionGrid`, `valuesGrid`, `highlightsGrid` need responsive verification |
| < 768px | ⚠️ Untested | `detailRow` (image + text alternating) must stack vertically |
| < 480px | ⚠️ Untested | Bullet icons + text alignment check |

### Careers (`/careers`)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | `Careers.module.css` — `whyGrid` (5 cards), `teamGrid` (2 cards), openings table |
| < 768px | ⚠️ Untested | Table must become cards (already partially handled with `openingsCards`) |
| < 480px | ⚠️ Untested | Join CTA buttons may need stacking |

### Contact (`/contact`)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | `Contact.module.css` — `cardsGrid` (3 contact cards), `formGrid` (2-col form) |
| < 768px | ⚠️ Untested | Form grid must become single column |
| < 480px | ⚠️ Untested | Newsletter form input + button may need stacking |

### FAQ (`/faq`)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | `FAQ.module.css` — accordion items, `generalFaqGrid` (6 cards) |
| < 768px | ⚠️ Untested | 6-card grid must collapse to 1-2 columns |

### Mobile App (`/mobile-app`)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | **Large inline `style={{}}` blocks with hardcoded grid columns** — `gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)'` |
| < 768px | ⚠️ Untested | These inline grids will NOT respond — they have no media queries |
| < 480px | ⚠️ Untested | Feature grid (7 cards) must collapse |

**Critical:** The inline `style={{}}` blocks with hardcoded `gridTemplateColumns` are a responsiveness anti-pattern. They must be moved to CSS modules with proper media queries.

### Book Demo & Free Trial (`/book-demo`, `/free-trial`)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | Reuse `Contact.module.css` — `formGrid` needs responsive check |
| < 768px | ⚠️ Untested | Form fields + info must stack |

### Salon CRM Features (`/salon-crm-features`)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | **Large inline `style={{}}` blocks** — same issue as mobile-app |
| < 768px | ⚠️ Untested | Feature grid (10 cards) + why/with sections |

### Product Pages (10 pages using FeaturePage)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | `FeaturePage.module.css` — `heroInner`, `summaryGrid`, `featuresGrid`, `otherGrid` |
| < 768px | ⚠️ Untested | Hero 2-col layout must stack. Feature cards must collapse. Other-features grid must collapse. |

### Blog Index (`/blogs`)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | `Blogs.module.css` — sidebar + main layout, post grid, CTA grid |
| < 1024px | ⚠️ Untested | Sidebar may need to move below content |
| < 768px | ⚠️ Untested | Post cards, category tabs, CTA cards |

### Blog Posts (4 articles)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | `BlogPost.module.css` — article + sidebar layout |
| < 1024px | ⚠️ Untested | Sidebar must move below article |
| < 768px | ⚠️ Untested | Highlights grid, meta grid, related posts |

### Legal Pages (4 policies)
| Breakpoint | Status | Issues |
|-----------|--------|--------|
| All | ⚠️ Untested | `PolicyPage.module.css` — single column layout, should be fine |
| < 480px | ⚠️ Untested | Long text readability, list indentation |

---

## Common Responsive Issues by Pattern

### 1. Inline Styles with Hardcoded Grids
**Locations:**
- `mobile-app/page.js` — line ~50: `gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)'`
- `salon-crm-features/page.js` — line ~65: `gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)'`

**Fix:** Move to CSS module with `@media (max-width: 768px) { grid-template-columns: 1fr; }`

### 2. Multi-Button CTAs on Mobile
**Locations:** Homepage hero (3 buttons), careers join section (2 buttons), blog article header (2 buttons)

**Fix:** Ensure buttons stack vertically on < 480px with full width and adequate spacing.

### 3. Card Grids Without Mobile Fallback
**Locations:** Homepage services (12 cards), feature pages other-features (9 cards), FAQ general grid (6 cards), careers why-grid (5 cards), mobile-app features (7 cards), about values (4 cards), about highlights (4 cards)

**Fix:** Verify `.grid-3`, `.grid-4` global classes apply, or add module-level responsive rules.

### 4. Image + Text Split Layouts
**Locations:** About `detailRow`, mobile-app intro, salon-crm-features proof section, FeaturePage hero

**Fix:** These must stack image above text on < 768px.

### 5. Tables on Mobile
**Locations:** Careers openings table

**Fix:** Hide table on mobile, show card alternatives (already partially implemented with `openingsCards`).

### 6. Sidebar Layouts
**Locations:** Blog index (sidebar rail), blog posts (article sidebar)

**Fix:** Sidebar must move below main content on < 1024px.

---

## Checklist

### Global Fixes
- [ ] Audit all pages for `style={{}}` blocks containing layout properties (display, grid, flex, width, etc.)
- [ ] Move all inline layout styles to CSS modules with responsive breakpoints
- [ ] Verify global `.grid-2`, `.grid-3`, `.grid-4` classes are actually used or add equivalent module rules

### Page-by-Page Testing
- [ ] Homepage — test at 320, 375, 414, 768, 1024, 1280, 1440, 1920
- [ ] About — test at all breakpoints
- [ ] Careers — test at all breakpoints, verify table→cards transition
- [ ] Contact — test at all breakpoints
- [ ] FAQ — test at all breakpoints
- [ ] Mobile App — test at all breakpoints (fix inline styles first)
- [ ] Book Demo — test at all breakpoints
- [ ] Free Trial — test at all breakpoints
- [ ] Salon CRM Features — test at all breakpoints (fix inline styles first)
- [ ] All 10 FeaturePage product pages — test at 375, 768, 1024, 1440
- [ ] Blog index — test at all breakpoints
- [ ] All 4 blog posts — test at all breakpoints
- [ ] All 4 legal pages — test at 320, 768, 1024

### Specific Checks Per Page
- [ ] No horizontal scrollbar at any breakpoint
- [ ] No text clipping inside buttons, cards, or badges
- [ ] All CTAs visible without excessive scrolling
- [ ] Images don't overflow containers
- [ ] Font sizes are readable at 320px (min 14px for body text)
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Padding/margins don't collapse to zero on small screens

### Mobile-Specific
- [ ] Navbar hamburger menu opens/closes correctly
- [ ] Mobile dropdown links are tappable
- [ ] Footer columns stack vertically
- [ ] Forms are single-column with full-width inputs
- [ ] FAQ accordion touch targets are large enough

---

## Success Criteria
- Zero horizontal overflow at any viewport from 320px to 1920px
- All inline `style={{}}` layout blocks moved to CSS modules
- Every grid/card layout has a documented mobile fallback
- All interactive elements meet minimum touch target size
- Text is readable at all breakpoints without zooming
