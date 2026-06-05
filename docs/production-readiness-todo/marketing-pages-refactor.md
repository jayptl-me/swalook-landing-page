# 04 — Marketing Pages Refactor

> **Priority:** P0 (Critical)  
> **Goal:** Eliminate duplicate form markup, inline styles, and repeated layout patterns across all marketing pages.

---

## Current State

### Pages in Scope
| Page | File | Status |
|------|------|--------|
| About | `app/(marketing)/about/page.js` | Custom layout with `About.module.css` — acceptable, page-specific content |
| Careers | `app/(marketing)/careers/page.js` | Custom layout with `Careers.module.css` — acceptable |
| Contact | `app/(marketing)/contact/page.js` | Has form — uses `Contact.module.css` |
| FAQ | `app/(marketing)/faq/page.js` | Custom layout with `FAQ.module.css` — acceptable |
| Mobile App | `app/(marketing)/mobile-app/page.js` | Has inline styles — needs extraction |
| Book Demo | `app/(marketing)/book-demo/page.js` | Duplicates form from Contact — uses `Contact.module.css` |
| Free Trial | `app/(marketing)/free-trial/page.js` | Duplicates form from Contact — uses `Contact.module.css` |

---

## Issue 1: Duplicated Form Markup

`book-demo/page.js` and `free-trial/page.js` both:
- Import `Contact.module.css` (not their own styles)
- Duplicate the entire `formGrid` + `formInfo` + `contactForm` layout
- Have identical form structure with different field counts and labels
- All use `e.preventDefault()` with no actual submission logic

### Current duplication (~50 lines each):
```jsx
<section className={styles.formSection}>
  <div className={styles.formGrid}>
    <AnimatedSection direction="left">
      <div className={styles.formInfo}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.infoBullets}>
          {/* bullet items */}
        </div>
      </div>
    </AnimatedSection>
    <AnimatedSection direction="right">
      <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
        {/* form fields */}
        <button type="submit" className={styles.submitBtn}>{cta}</button>
      </form>
    </AnimatedSection>
  </div>
</section>
```

### Target: Shared `LeadForm` component
```jsx
// components/marketing/LeadForm.js
export default function LeadForm({
  title,
  description,
  bullets = [],
  fields = [],
  submitLabel = 'Submit',
  onSubmit,
}) { ... }
```

---

## Issue 2: Inline Styles in mobile-app/page.js

Two large inline `style={{}}` blocks:

**Block 1:** "Product proof" section with image + checkmarks card
- Hardcoded `gridTemplateColumns`, `gap`, `border`, `borderRadius`, `boxShadow`, `overflow`
- Checkmark items with inline `display: flex`, `gap`, `padding`, `border`, `borderRadius`, `background`, `color`

**Block 2:** Features section intro with hardcoded grid layout

**Fix:** Both blocks should be extracted to `MobileApp.module.css` with proper class names and responsive rules.

---

## Issue 3: About Page — Acceptable but Has Repeated Patterns

The About page has a `detailRow` pattern (image + text, alternating sides) that could potentially be extracted as `AlternatingFeature` if needed elsewhere. For now, this is page-specific content and acceptable to keep as-is.

The CTA section at the bottom duplicates the pattern of "label + heading + CTA buttons" seen in other pages.

---

## Issue 4: Careers Page — Table + Card Duplication

Careers has both a `<table>` and `<div className={styles.openingsCards}>` rendering the same data. The cards are for mobile. This is acceptable responsive strategy but should be verified that both render the same source data.

---

## Issue 5: FAQ Accordion Duplication

`faq/page.js` defines a `FAQAccordion` component inline. The homepage `HomeFAQSection.js` also has FAQ accordion logic inline. These should share one `components/ui/FAQAccordion.js` component.

---

## Issue 6: No Form Functionality

All 3 form pages (contact, book-demo, free-trial) use:
```jsx
<form onSubmit={e => e.preventDefault()}>
```
There is:
- No form state management
- No input validation
- No error states
- No loading states
- No success feedback
- No actual submission endpoint

This must be wired up before production. Options:
1. POST to backend API endpoint
2. Use a third-party form service (Formspree, Netlify Forms, etc.)
3. Use Google Forms embed

---

## Checklist

### Form Extraction
- [ ] Create `components/marketing/LeadForm.js` — shared form layout with configurable fields, bullets, and CTA
- [ ] Create `components/marketing/LeadForm.module.css` — form styles (moved from Contact.module.css form classes)
- [ ] Create `components/marketing/LeadFormInfo.js` — shared left-column info pattern
- [ ] Refactor `contact/page.js` to use LeadForm
- [ ] Refactor `book-demo/page.js` to use LeadForm
- [ ] Refactor `free-trial/page.js` to use LeadForm
- [ ] Add form state management (useState for each field)
- [ ] Add basic client-side validation (required fields, email format, phone format)
- [ ] Add loading state during submission
- [ ] Add success/error feedback messages
- [ ] Wire to actual submission endpoint

### Inline Style Removal
- [ ] Extract mobile-app product-proof block to `MobileApp.module.css`
- [ ] Extract mobile-app features intro block to `MobileApp.module.css`
- [ ] Add responsive breakpoints for all extracted styles
- [ ] Verify mobile-app renders identically after extraction

### FAQ Unification
- [ ] Create `components/ui/FAQAccordion.js` — single accordion component
- [ ] Update `faq/page.js` to use shared FAQAccordion
- [ ] Update `components/home/HomeFAQSection.js` to use shared FAQAccordion
- [ ] Ensure accordion supports ARIA attributes (aria-expanded, aria-controls, role="region")

### Newsletter Extraction
- [ ] Create `components/marketing/NewsletterSection.js`
- [ ] Extract from `contact/page.js`
- [ ] Add basic email validation
- [ ] Wire to subscription endpoint

### Verification
- [ ] Build passes
- [ ] All 3 form pages render correctly with shared component
- [ ] Forms show validation errors
- [ ] Forms show loading/success states
- [ ] Mobile-app page renders without inline layout styles
- [ ] FAQ accordion works identically on homepage and /faq

---

## Success Criteria
- Zero duplicated form markup across contact, book-demo, free-trial
- Single `LeadForm` component drives all 3 form pages
- Zero inline `style={{}}` blocks for layout in mobile-app/page.js
- Forms have validation, loading, and success states
- FAQ accordion is a single shared component
- All pages build and render correctly
