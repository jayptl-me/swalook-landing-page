# 10 — Accessibility Audit

> **Priority:** P1 (High)  
> **Goal:** WCAG 2.1 AA compliance. Keyboard navigable, screen-reader friendly, sufficient color contrast, logical heading hierarchy.

---

## Checklist

### Semantic HTML
- [ ] Every page has exactly one `<h1>`
- [ ] Headings follow logical order (h1 → h2 → h3, no skips)
- [ ] `<main>` landmark is present (✅ in root layout)
- [ ] `<nav>` landmark for navigation (✅ Navbar)
- [ ] `<footer>` landmark (✅ Footer)
- [ ] `<article>` for blog posts (✅)
- [ ] `<aside>` for sidebars (✅)
- [ ] `<section>` for page sections — verify all pages use semantic sections
- [ ] Lists use `<ul>`/`<ol>`/`<li>` (✅ legal pages, ⚠️ verify others)

### Keyboard Navigation
- [ ] All interactive elements are keyboard focusable
- [ ] Tab order is logical
- [ ] Focus indicators are visible (✅ `:focus-visible` in globals.css)
- [ ] Mobile nav hamburger is keyboard operable (Enter/Space)
- [ ] Dropdown menus are keyboard navigable
- [ ] FAQ accordions work with Enter/Space
- [ ] Forms can be completed with keyboard only
- [ ] No keyboard traps

### ARIA Attributes
- [ ] Navbar hamburger has `aria-expanded` and `aria-controls` (✅)
- [ ] Mobile menu has `aria-hidden` toggle (✅)
- [ ] FAQ accordions have `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby` (✅ homepage FAQ, ⚠️ /faq page)
- [ ] Forms have `aria-label` or `<label>` for all inputs (⚠️ verify all form pages)
- [ ] Icons used as buttons have `aria-label` (⚠️ verify social links, search icon)
- [ ] Decorative images have `alt=""` or are CSS backgrounds
- [ ] Content images have descriptive `alt` text (⚠️ audit all `<Image>` components)
- [ ] Cards used as links have appropriate role/label

### Color Contrast
- [ ] All text meets WCAG AA contrast (4.5:1 for normal, 3:1 for large)
  - Primary cyan `#00BCD4` on white — ⚠️ needs verification (cyan on white often fails)
  - Text `#1A2332` on white — ✅ passes
  - Secondary text `#546E7A` on white — ⚠️ needs verification
  - Gradient text — ⚠️ may fail if background is similar
- [ ] Focus indicators have sufficient contrast
- [ ] Button text on gradient backgrounds passes contrast

### Forms
- [ ] All inputs have associated `<label>` elements
- [ ] Required fields are indicated visually and programmatically
- [ ] Error messages are announced to screen readers
- [ ] Submit buttons have clear, action-oriented text

### Motion & Animation
- [ ] Respects `prefers-reduced-motion` media query
- [ ] No content flashes more than 3 times/second
- [ ] Animations can be paused

### Touch Targets
- [ ] All interactive elements are at least 44×44px on mobile
- [ ] Links in nav/footer have sufficient spacing

### Screen Reader Testing
- [ ] Page titles are announced correctly
- [ ] Navigation landmarks are announced
- [ ] Dynamic content changes are announced (FAQ accordion toggles)
- [ ] Form validation errors are announced

---

## Success Criteria
- Lighthouse Accessibility score ≥ 90
- All pages navigable by keyboard alone
- All interactive elements properly labeled
- Color contrast passes WCAG AA for all text
- `prefers-reduced-motion` is respected
