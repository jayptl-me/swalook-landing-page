# 18 — Analytics & Measurement

> **Priority:** P2 (Medium)  
> **Goal:** Event tracking plan defined, conversion tracking wired, page-type reporting possible.

---

## Required Tracking Events

### Page Views
- [ ] All page loads tracked (GA4 or equivalent)
- [ ] Page type metadata sent with each page view (homepage, feature, blog, legal, marketing)

### CTA Clicks
- [ ] "Book Free Demo" button clicks — track source page
- [ ] "Start Free Trial" button clicks — track source page
- [ ] "Explore Features" clicks
- [ ] "Contact Us" clicks
- [ ] Navbar "Request a Demo" clicks
- [ ] Footer link clicks

### Form Interactions
- [ ] Form field focus events (which fields are interacted with)
- [ ] Form validation errors (which fields fail)
- [ ] Form submission success
- [ ] Form submission failure

### Blog Engagement
- [ ] Article scroll depth (25%, 50%, 75%, 100%)
- [ ] Blog CTA clicks (from article header and footer)
- [ ] Related post clicks
- [ ] Blog category filter changes

### FAQ Engagement
- [ ] FAQ accordion opens (which questions are most opened)
- [ ] FAQ CTA clicks

### Homepage Engagement
- [ ] Feature card clicks (which features get most interest)
- [ ] CTA section clicks
- [ ] Scroll milestones per section

---

## Implementation Options

### Option 1: Google Analytics 4 (GA4)
- Free, widely used
- Install via `next/script` or `@next/third-parties/google`
- `gtag` event tracking

### Option 2: Plausible / Fathom
- Privacy-focused, lightweight
- Simpler event model

### Option 3: PostHog
- Product analytics + session recording
- Good for SaaS

**Recommendation:** Start with GA4 + Google Tag Manager for flexibility.

---

## Checklist

### Setup
- [ ] Choose analytics platform
- [ ] Install tracking script (via `app/layout.js` or `next/script`)
- [ ] Verify page views are tracked
- [ ] Create Google Tag Manager container (if using GTM)

### Event Tracking
- [ ] Define event naming convention
- [ ] Implement CTA click tracking
- [ ] Implement form submission tracking
- [ ] Implement blog engagement tracking
- [ ] Test all events in debug mode

### Conversion Goals
- [ ] Define conversion goals in analytics platform
- [ ] Demo form submission = primary conversion
- [ ] Trial form submission = secondary conversion
- [ ] Contact form submission = engagement goal

### Dashboard
- [ ] Create basic reporting dashboard
- [ ] Page-type performance view
- [ ] Conversion funnel view
- [ ] Blog performance view

---

## Success Criteria
- All key CTA clicks are tracked
- Form submissions are tracked as conversions
- Blog engagement metrics are measurable
- Reporting dashboard exists for ongoing iteration
