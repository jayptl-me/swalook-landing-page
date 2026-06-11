# 03 — Legal Pages Refactor

> **Priority:** P0 (Critical)  
> **Goal:** Replace 4 nearly identical legal page files with a single shared `PolicyPageLayout` component. Only the title, date, and content body should vary per page.

---

## Current State

4 legal pages, each ~80-120 lines, all duplicating this structure:

```jsx
<div className={styles.policyPage}>
  <div className={styles.policyContainer}>
    <div className={styles.policyBreadcrumb}>
      <Link href="/">Home</Link><span>/</span><span>{TITLE}</span>
    </div>
    <h1 className={styles.policyTitle}>{TITLE}</h1>
    <p className={styles.policyDate}>Last updated: {DATE}</p>
    <div className={styles.policyContent}>
      {/* unique content */}
    </div>
  </div>
</div>
```

| Page | File | Title | Date |
|------|------|-------|------|
| Privacy Policy | `app/(legal)/privacy-policy/page.js` | Privacy Policy | April 12, 2025 |
| Terms & Conditions | `app/(legal)/terms-conditions/page.js` | Terms & Conditions | April 12, 2025 |
| Cancellation Policy | `app/(legal)/cancellation-policy/page.js` | Cancellation Policy | April 12, 2025 |
| Shipping Policy | `app/(legal)/shipping-policy/page.js` | Shipping Policy | April 12, 2025 |

All 4 import `@/components/PolicyPage.module.css` — the old root-level file that should be moved to `components/legal/PolicyPage.module.css`.

---

## Target Architecture

### New shared component: `components/legal/PolicyPageLayout.js`
```jsx
'use client';
import Link from 'next/link';
import styles from './PolicyPage.module.css';

export default function PolicyPageLayout({ title, lastUpdated, children }) {
  return (
    <div className={styles.policyPage}>
      <div className={styles.policyContainer}>
        <div className={styles.policyBreadcrumb}>
          <Link href="/">Home</Link><span>/</span><span>{title}</span>
        </div>
        <h1 className={styles.policyTitle}>{title}</h1>
        <p className={styles.policyDate}>Last updated: {lastUpdated}</p>
        <div className={styles.policyContent}>{children}</div>
      </div>
    </div>
  );
}
```

### CSS: `components/legal/PolicyPage.module.css`
Move contents from `components/PolicyPage.module.css` to `components/legal/PolicyPage.module.css`. Add responsive rules if missing.

### Updated page files
Each legal page becomes ~6 lines:
```jsx
import PolicyPageLayout from '@/components/legal/PolicyPageLayout';

export default function PrivacyPolicy() {
  return (
    <PolicyPageLayout title="Privacy Policy" lastUpdated="April 12, 2025">
      <p>This Privacy Policy describes...</p>
      {/* rest of content */}
    </PolicyPageLayout>
  );
}
```

---

## Content Concerns

### Cancellation & Shipping Policies
These reference "orders," "products," "shipping," and "perishable items" — concepts that don't directly apply to a SaaS/CRM platform. These were likely generated from a generic e-commerce template.

**Recommended actions:**
- [ ] Review cancellation policy content — does it apply to Swalook's SaaS subscription?
- [ ] Review shipping policy content — does Swalook ship physical products? If not, replace with a service-delivery policy
- [ ] Consult with legal/business team on what policies are actually needed
- [ ] If shipping and cancellation are not applicable, consider removing those pages entirely

---

## Checklist

### Component Creation
- [ ] Create `components/legal/PolicyPageLayout.js`
- [ ] Move `components/PolicyPage.module.css` content to `components/legal/PolicyPage.module.css`
- [ ] Add responsive rules to PolicyPage.module.css (mobile padding, font sizes)
- [ ] Delete `components/PolicyPage.module.css` (stale root file)

### Page Refactors
- [ ] Refactor `app/(legal)/privacy-policy/page.js` to use PolicyPageLayout
- [ ] Refactor `app/(legal)/terms-conditions/page.js` to use PolicyPageLayout
- [ ] Refactor `app/(legal)/cancellation-policy/page.js` to use PolicyPageLayout
- [ ] Refactor `app/(legal)/shipping-policy/page.js` to use PolicyPageLayout

### Content Audit
- [ ] Review privacy policy for accuracy (contact details, company name, address)
- [ ] Review terms & conditions for accuracy (contact details, governing law)
- [ ] Review cancellation policy — is it applicable to a SaaS business?
- [ ] Review shipping policy — is it applicable? Replace with service-delivery terms if needed
- [ ] Update all "Last updated" dates to the actual last review date

### Verification
- [ ] Run `npm run build` — confirm no import errors
- [ ] Navigate to all 4 legal pages in browser
- [ ] Verify breadcrumb, title, and date display correctly
- [ ] Verify all policy content renders
- [ ] Check mobile readability (especially long lists and paragraphs)

---

## Success Criteria
- Zero duplicated layout markup across legal pages
- Single `PolicyPageLayout` component drives all 4 policy pages
- Old stale `components/PolicyPage.module.css` deleted
- Policy content reviewed for business applicability
- All dates reflect actual last review
