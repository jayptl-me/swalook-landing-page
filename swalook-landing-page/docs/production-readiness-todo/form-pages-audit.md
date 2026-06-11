# 15 — Form Pages Audit

> **Priority:** P1 (High)  
> **Goal:** Shared LeadForm component, working validation, submission wired to backend, loading/success/error states.

---

## Current State

3 form pages, all broken:
- `contact/page.js` — "Send Message" with 5 fields
- `book-demo/page.js` — "Book Demo" with 7 fields (reuses Contact.module.css)
- `free-trial/page.js` — "Start Free Trial" with 6 fields (reuses Contact.module.css)

All use `onSubmit={e => e.preventDefault()}` — no actual submission.

---

## Required Shared Component: LeadForm

```jsx
<LeadForm
  formType="demo" // 'demo' | 'trial' | 'contact'
  title="Book Your Free Demo"
  description="See how Swalook helps you..."
  bullets={[...]}
  fields={[
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    // ... page-specific fields
  ]}
  submitLabel="Book Demo"
  successMessage="Thanks! We'll be in touch within 24 hours."
/>
```

---

## Checklist

### Component Creation
- [ ] Create `components/marketing/LeadForm.js`
- [ ] Create `components/marketing/LeadForm.module.css`
- [ ] Support configurable fields (type, label, required, placeholder)
- [ ] Support configurable bullets in info column
- [ ] Support configurable title, description, submitLabel

### Validation
- [ ] Required field validation
- [ ] Email format validation
- [ ] Phone number format validation (Indian mobile: 10 digits)
- [ ] Show inline error messages below each field
- [ ] Prevent submission until valid

### States
- [ ] Idle state — form ready to fill
- [ ] Loading state — submit button shows spinner, fields disabled
- [ ] Success state — thank-you message, form hidden or reset
- [ ] Error state — error message, form still editable for retry

### Submission
- [ ] Determine submission endpoint (backend API, Formspree, Netlify, Google Forms)
- [ ] POST form data to endpoint
- [ ] Handle network errors gracefully
- [ ] Log submissions (analytics event)

### Page Updates
- [ ] Refactor `contact/page.js` to use LeadForm
- [ ] Refactor `book-demo/page.js` to use LeadForm
- [ ] Refactor `free-trial/page.js` to use LeadForm
- [ ] Delete shared `Contact.module.css` form classes (now in LeadForm.module.css)
- [ ] Keep `Contact.module.css` for contact-specific styles only (cards, newsletter)

### Newsletter Form
- [ ] The newsletter section in `contact/page.js` should also be a working form
- [ ] Extract to `NewsletterSection` component
- [ ] Add email validation + submission

---

## Success Criteria
- All 3 form pages use shared LeadForm component
- All forms validate client-side before submission
- All forms show loading/success/error states
- Form submission is wired to a real endpoint
- No `e.preventDefault()` stubs remain
