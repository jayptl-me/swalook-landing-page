# 08 — Broken Links & Routing Audit

> **Priority:** P0 (Critical)  
> **Goal:** Verify every internal link resolves, every import resolves, no 404s, no dead ends, and proper error handling.

---

## Import Verification

### Critical: Wrong Import Paths
| File | Current Import | Correct Import | Status |
|------|---------------|----------------|--------|
| `app/(product)/salon-inventory-management-software/page.js` | `@/components/FeaturePage` | `@/components/product/FeaturePage` | ⚠️ Wrong |
| `app/(product)/salon-staff-attendance-software/page.js` | `@/components/FeaturePage` | `@/components/product/FeaturePage` | ⚠️ Wrong |
| `components/layout/Footer.js` | `../Footer.module.css` | `./Footer.module.css` | ⚠️ Wrong path |

### Dependency on Stale Files
These pages may resolve only because stale duplicates exist at `components/` root:
- `components/FeaturePage.js` (stale) — if deleted, the 2 wrong imports above will break
- `components/Footer.module.css` (stale) — if deleted, the footer CSS import will break

### Stale Duplicate Files to Delete (After Fixing Imports)
| File | Reason |
|------|--------|
| `components/Footer.js` | Moved to `components/layout/Footer.js` |
| `components/Footer.module.css` | Moved to `components/layout/Footer.module.css` |
| `components/Navbar.js` | Moved to `components/layout/Navbar.js` |
| `components/Navbar.module.css` | Moved to `components/layout/Navbar.module.css` |
| `components/AnimatedSection.js` | Moved to `components/ui/AnimatedSection.js` |
| `components/PageHero.js` | Moved to `components/marketing/PageHero.js` |
| `components/PageHero.module.css` | Moved to `components/marketing/PageHero.module.css` |
| `components/FeaturePage.js` | Moved to `components/product/FeaturePage.js` |
| `components/FeaturePage.module.css` | Moved to `components/product/FeaturePage.module.css` |
| `components/PolicyPage.module.css` | Moved to `components/legal/PolicyPage.module.css` |
| `components/BlogPostLayout.js` | Moved to `components/blog/BlogPostLayout.js` |
| `components/BlogPost.module.css` | Moved to `components/blog/BlogPost.module.css` |

---

## Internal Link Audit

### Navigation Links
| Link | Destination | Exists? |
|------|-------------|---------|
| `/` | Homepage | ✅ |
| `/about` | About page | ✅ |
| `/salon-crm-features` | CRM features hub | ✅ |
| `/mobile-app` | Mobile app page | ✅ |
| `/blogs` | Blog index | ✅ |
| `/contact` | Contact page | ✅ |
| `/faq` | FAQ page | ✅ |
| `/careers` | Careers page | ✅ |
| `/book-demo` | Book demo page | ✅ |
| `/free-trial` | Free trial page | ✅ |

### Footer Product Links (from `components/layout/Footer.js`)
| Link | Destination | Exists? |
|------|-------------|---------|
| `/salon-appointment-scheduling-software` | Appointments page | ✅ |
| `/salon-dashboard-software` | Dashboard page | ✅ |
| `/salon-marketing-templates` | Templates page | ✅ |
| `/salon-analytics-software` | Analytics page | ✅ |
| `/salon-inventory-management-software` | Inventory page | ✅ |

### Footer Policy Links
| Link | Destination | Exists? |
|------|-------------|---------|
| `/terms-conditions` | Terms page | ✅ |
| `/privacy-policy` | Privacy page | ✅ |
| `/cancellation-policy` | Cancellation page | ✅ |
| `/shipping-policy` | Shipping page | ✅ |

### Social Media Links
| Link | URL | Status |
|------|-----|--------|
| Facebook | `https://www.facebook.com/people/SwaLook/100082780576167/` | ⚠️ Verify still active |
| Twitter/X | `https://twitter.com/home` | ❌ Generic Twitter home — not Swalook profile |
| YouTube | `https://www.youtube.com/channel/UCQj9_wk87-iDb9h9TdxjHYg` | ⚠️ Verify still active |
| LinkedIn | `https://www.linkedin.com/company/swalook/` | ⚠️ Verify still active |
| Instagram | `https://www.instagram.com/swalook_official/` | ⚠️ Verify still active |

### Email Links
| Link | Destination | Status |
|------|-------------|--------|
| `mailto:info@swalook.in` | Footer + policy pages | ⚠️ Verify email is monitored |
| `mailto:support@swalook.in` | Contact page | ⚠️ Verify email is monitored |
| `mailto:sales@swalook.in` | Contact page | ⚠️ Verify email is monitored |
| `mailto:hr@swalook.in` | Careers page | ⚠️ Verify email is monitored |

### Phone Number
| Link | Destination | Status |
|------|-------------|--------|
| `+91 98701 03761` | Footer | ⚠️ Verify number is active |
| `+91-XXXXXXXXXX` | Contact page | ❌ Placeholder — must be replaced with real number |

---

## Route Coverage — Every Route Must Resolve

### Marketing Routes (`app/(marketing)/`)
- [x] `/` — homepage
- [x] `/about` — about page
- [x] `/careers` — careers page
- [x] `/contact` — contact page
- [x] `/faq` — FAQ page
- [x] `/mobile-app` — mobile app page
- [x] `/book-demo` — book demo page
- [x] `/free-trial` — free trial page

### Product Routes (`app/(product)/`)
- [x] `/salon-crm-features` — CRM features hub
- [x] `/salon-appointment-scheduling-software`
- [x] `/salon-dashboard-software`
- [x] `/salon-analytics-software`
- [x] `/salon-invoice-software`
- [x] `/salon-inventory-management-software`
- [x] `/salon-loyalty-program-software`
- [x] `/salon-marketing-templates`
- [x] `/salon-expense-management-software`
- [x] `/salon-staff-attendance-software`
- [x] `/salon-inquiry-management`

### Blog Routes (`app/(content)/`)
- [x] `/blogs` — blog index
- [x] `/7-key-factors-for-choosing-salon-crm-software`
- [x] `/why-salons-fall-behind-without-crm-software`
- [x] `/the-importance-of-integrated-marketing`
- [x] `/how-to-automate-your-salon-marketing-with-swalook`

### Legal Routes (`app/(legal)/`)
- [x] `/privacy-policy`
- [x] `/terms-conditions`
- [x] `/cancellation-policy`
- [x] `/shipping-policy`

### CRM Route
- [x] `/crm` — redirects to CRM admin

---

## Missing Route Handling

### 404 Page
- [ ] Does the app have a custom 404 page? (`app/not-found.js`)
- [ ] Does the 404 page have links back to the main site?
- [ ] Does the 404 page match the brand design?

### Error Handling
- [ ] Is there a global error boundary? (`app/error.js`)
- [ ] Do pages handle loading states? (`app/loading.js` per route group)

---

## Redirects
- [ ] Any needed redirects (e.g., old URLs, www → non-www)?
- [ ] Are redirects configured in `next.config.mjs`?

---

## Checklist

### Import Fixes
- [ ] Fix `salon-inventory-management-software/page.js` import
- [ ] Fix `salon-staff-attendance-software/page.js` import
- [ ] Fix `components/layout/Footer.js` CSS import
- [ ] Delete all stale component files from `components/` root
- [ ] Run `npm run build` — confirm zero import errors

### Link Verification
- [ ] Verify all nav links resolve
- [ ] Verify all footer links resolve
- [ ] Verify all blog internal links resolve
- [ ] Verify all homepage feature card links resolve
- [ ] Verify all FAQ/CTA links resolve
- [ ] Fix Twitter/X link to actual Swalook profile
- [ ] Replace placeholder phone number in contact page
- [ ] Verify all email addresses are monitored
- [ ] Verify all social media profiles are active

### Error Pages
- [ ] Create custom 404 page (`not-found.js`)
- [ ] Create error boundary (`error.js`)
- [ ] Create loading states for dynamic routes

### Build Verification
- [ ] `npm run build` succeeds with zero errors
- [ ] `npm run build` succeeds with zero warnings (or only acceptable ones)
- [ ] All routes listed above return 200 (or appropriate status)

---

## Success Criteria
- Zero import resolution errors in build
- Every internal link resolves to a real page
- Zero stale/duplicate component files
- Custom 404 page exists and is on-brand
- All social/email/phone links are verified active
- Build passes cleanly
