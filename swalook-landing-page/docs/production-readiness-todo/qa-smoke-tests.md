# 22 — QA Smoke Tests

> **Priority:** P2 (Medium)  
> **Goal:** Structured browser/device test matrix, interaction verification, visual regression baseline.

---

## Test Matrix

### Browsers
| Browser | Version | Desktop | Mobile |
|---------|---------|---------|--------|
| Chrome | Latest | ✅ Test | ✅ Test |
| Firefox | Latest | ✅ Test | — |
| Safari | Latest | ✅ Test | ✅ Test (iOS) |
| Edge | Latest | ✅ Test | — |
| Samsung Internet | Latest | — | ✅ Test |

### Devices
| Device | Viewport | Test |
|--------|----------|------|
| iPhone SE | 375×667 | ✅ |
| iPhone 14 | 390×844 | ✅ |
| iPhone 14 Pro Max | 430×932 | ✅ |
| iPad | 768×1024 | ✅ |
| iPad Pro | 1024×1366 | ✅ |
| Samsung Galaxy S22 | 360×780 | ✅ |
| Google Pixel 7 | 412×915 | ✅ |
| Desktop HD | 1280×720 | ✅ |
| Desktop Full HD | 1920×1080 | ✅ |
| Desktop 4K | 2560×1440 | ✅ |

---

## Smoke Test Checklist Per Page

### Homepage
- [ ] Hero renders correctly, no layout shifts
- [ ] 3 CTA buttons visible and clickable
- [ ] Feature cards grid loads correctly
- [ ] Use case cards with images render correctly
- [ ] All animations trigger on scroll (no jank)
- [ ] FAQ accordion opens/closes
- [ ] All internal links navigate correctly
- [ ] Footer renders all 4 columns
- [ ] Mobile nav opens, links work, closes on route change

### About
- [ ] Company image loads
- [ ] Detail rows (image+text) alternate correctly
- [ ] Mission/vision cards render
- [ ] Values grid renders
- [ ] Bullet checkmarks align correctly

### Careers
- [ ] Table renders on desktop
- [ ] Cards render on mobile (table hidden)
- [ ] "Apply Now" links open mail client
- [ ] LinkedIn link opens in new tab

### Contact
- [ ] Contact cards render (3 cards)
- [ ] Form renders all fields
- [ ] Newsletter section renders
- [ ] Form validation works (after implementation)

### FAQ
- [ ] Accordion items open/close independently
- [ ] FAQ category sections are separated
- [ ] General FAQ cards grid renders

### Mobile App
- [ ] Intro section image+text renders
- [ ] Product proof card renders correctly
- [ ] Feature grid (7 cards) renders
- [ ] CTA button works

### Book Demo / Free Trial
- [ ] Form renders all fields correctly
- [ ] Info bullets render with icons
- [ ] Submit button present
- [ ] Form validation works (after implementation)

### Salon CRM Features
- [ ] Feature grid (10 cards) renders
- [ ] Each card links to correct feature page
- [ ] "Learn More" links work
- [ ] Why/With sections render

### Product Pages (all 10)
- [ ] Hero renders with icon, title, description
- [ ] Key features grid renders
- [ ] Compare section renders
- [ ] "Other features" navigation renders (9 links, excluding current)
- [ ] CTA buttons link correctly

### Blog Index
- [ ] Blog hero renders
- [ ] Sidebar rail renders with all sections
- [ ] Category tabs filter posts correctly
- [ ] Post cards render with all metadata
- [ ] CTA section renders at bottom

### Blog Posts (all 4)
- [ ] Breadcrumb renders
- [ ] Article header with metadata renders
- [ ] Article body content renders fully
- [ ] Sidebar renders related posts + quick routes
- [ ] Footer CTA renders

### Legal Pages (all 4)
- [ ] Breadcrumb renders correctly
- [ ] Title and date display
- [ ] All content renders (lists, paragraphs, links)
- [ ] Email links open mail client

---

## Interaction Tests

### Navigation
- [ ] Navbar links highlight active page
- [ ] Dropdown menus open on hover (desktop)
- [ ] Dropdown menus open on tap (mobile)
- [ ] Mobile hamburger opens/closes
- [ ] Mobile overlay closes menu on tap
- [ ] Body scroll locks when mobile menu is open
- [ ] All footer links navigate correctly

### Forms
- [ ] Tab order through form fields is logical
- [ ] Required field validation shows errors
- [ ] Email format validation works
- [ ] Submit shows loading state
- [ ] Submit shows success state
- [ ] Submit shows error state

### Animations
- [ ] Scroll-triggered animations fire at correct scroll position
- [ ] Stagger animations sequence correctly
- [ ] No animation flash on page load
- [ ] Reduced motion preference disables animations

---

## Visual Regression

- [ ] Take screenshots of all pages at 375px and 1440px
- [ ] Store as baseline in `docs/production-readiness-todo/screenshots/`
- [ ] Compare after each major refactor phase
- [ ] Flag any visual differences for review

---

## Performance Smoke Tests

- [ ] Run Lighthouse on homepage (mobile + desktop)
- [ ] Run Lighthouse on largest feature page
- [ ] Run Lighthouse on blog post
- [ ] All scores ≥ 80 (Performance), ≥ 90 (Accessibility), ≥ 90 (Best Practices), ≥ 90 (SEO)
- [ ] No blocking requests
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

---

## Success Criteria
- All pages render correctly in Chrome, Firefox, Safari, Edge
- All pages render correctly on iPhone SE and iPad viewports
- All navigation, links, and CTAs work correctly
- All forms validate and submit
- Lighthouse scores meet minimum thresholds
- No visual regressions from baseline
