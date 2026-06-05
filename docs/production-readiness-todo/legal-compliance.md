# 21 — Legal Compliance

> **Priority:** P2 (Medium)  
> **Goal:** Cookie consent, privacy compliance (GDPR/DPDP Act 2023), terms accuracy, business registration verified.

---

## India-Specific: Digital Personal Data Protection Act 2023

As an Indian company (Swalook Global Private Limited, Uttar Pradesh), the primary regulation is India's DPDP Act 2023.

### Requirements
- [ ] Privacy policy is published and accessible (✅ exists at `/privacy-policy`)
- [ ] Privacy policy accurately describes data collection, usage, storage, and rights
- [ ] Consent mechanism for data collection (forms should have consent checkbox)
- [ ] Data breach notification procedure documented
- [ ] Grievance officer contact details published

### GDPR Considerations (if serving EU users)
- [ ] Cookie consent banner (if using non-essential cookies)
- [ ] Explicit consent for marketing emails
- [ ] Right to erasure request process
- [ ] Data Processing Agreement (if processing on behalf of clients)

---

## Content Accuracy

### Company Details
Verify these are correct across all legal pages:
- **Company name:** "SWALOOK GLOBAL PRIVATE LIMITED" (privacy policy) vs "Swalook Global Pvt. Ltd." (footer)
- **Address:** "Aishwaryam, Gaur City-2, Greater Noida West, Sector 16C, Noida, Gautam Buddha Nagar, Uttar Pradesh- 201301" (privacy policy) vs "Greater Noida (West), Uttar Pradesh, 201009" (footer)
- ❌ **Address mismatch!** Footer says 201009, privacy policy says 201301.

### Email Addresses
- `info@swalook.in` — used in footer and policies
- `support@swalook.in` — used in contact page
- `sales@swalook.in` — used in contact page
- `hr@swalook.in` — used in careers page
- [ ] Verify all email addresses are active and monitored

### Phone Numbers
- Footer: `+91 98701 03761`
- Contact page: `+91-XXXXXXXXXX` ❌ **Placeholder!**

### Policies Applicability
- Cancellation policy references "orders," "perishable items," "products" — e-commerce language
- Shipping policy references "domestic shipping," "international shipping," "courier companies" — e-commerce language
- ❌ These appear to be generic templates not customized for a SaaS business
- [ ] Review with actual legal counsel whether cancellation/shipping policies are needed
- [ ] If not applicable, remove or replace with SaaS-appropriate policies (e.g., Refund Policy, Service Level Agreement)

---

## Cookie Consent

The site uses:
- No cookie consent banner
- No cookie declaration
- `globals.css` imports Google Fonts (third-party request)
- No analytics cookies yet (but will when GA4 is added)
- No tracking cookies identified

### Required If Using:
- Google Analytics → requires cookie consent in EU
- Any third-party embeds → requires consent
- [ ] Determine if cookie consent banner is needed based on target audience geography
- [ ] If primarily India-only: DPDP Act consent requirements apply but cookie-specific rules differ from GDPR

---

## Checklist

### Company Details
- [ ] Fix address mismatch between footer and privacy policy
- [ ] Replace placeholder phone number on contact page
- [ ] Verify all email addresses route to active inboxes
- [ ] Confirm company registration details are accurate

### Policy Content
- [ ] Review all 4 legal policies with actual legal counsel
- [ ] Remove or replace e-commerce-specific language in cancellation/shipping policies
- [ ] Add data processing details relevant to SaaS (user accounts, salon data)
- [ ] Add grievance officer contact details (required by DPDP Act)

### Consent & Compliance
- [ ] Add consent checkbox to all forms ("I agree to the Privacy Policy and Terms")
- [ ] Add link to privacy policy from all form pages
- [ ] Implement cookie consent banner if using analytics/tracking
- [ ] Document data retention periods
- [ ] Create data breach response plan

### Footer
- [ ] Verify all 4 policy links in footer resolve correctly
- [ ] Ensure privacy policy and terms are linked from all pages where data is collected

---

## Success Criteria
- Company details are consistent across all pages
- No placeholder contact information
- All policies are reviewed for SaaS applicability
- Forms include consent checkboxes
- Cookie consent is implemented if analytics are used
