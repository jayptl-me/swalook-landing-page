# 20 — Content Claims & Proof Audit

> **Priority:** P2 (Medium)  
> **Goal:** Every public claim aligns with the claims matrix. Market-now vs future-state is clearly labeled. No unsupported claims.

---

## Reference

The authoritative claims classification is in `docs/landing-page-audit/production-plan/claims-matrix.md`.

### Summary
- **Market-now:** Core product surface, appointments, billing, analytics, dashboard, customer management, inventory, loyalty, staff/attendance, branch visibility, export/PDF, role-based access, CRM admin, blog publishing, brand consistency
- **Market-carefully:** Lead capture, CRM sync, measurement, SEO support, performance, lead qualification, enterprise positioning
- **Future-state:** Advanced automation, personalization, live data, quantified outcomes, mobile booking app, support SLAs

---

## Per-Page Claim Verification

### Homepage
| Claim | Status |
|-------|--------|
| "12 Feature Groups That Drive Growth" | ⚠️ Count is 12, features match backend routes — verify all 12 are market-now |
| "Reduce No-Shows" | Market-now (reminders/confirmations exist in backend) |
| "Increase Repeat Customers" | Market-now (loyalty routes exist) |
| "Track Business Performance" | Market-now (dashboard/analytics routes exist) |

### Feature Pages
Each makes specific capability claims — verify each against backend routes:
- [ ] Appointments: "online booking", "automated reminders", "recurring appointments"
- [ ] Billing: "GST-ready", "WhatsApp invoicing", "multi-currency"
- [ ] Analytics: "revenue forecasting", "client behavior insights"
- [ ] Inventory: "real-time tracking", "low-stock alerts"
- [ ] Loyalty: "points-based rewards", "referral programs"
- [ ] Staff: "digital check-in/check-out", "payroll integration"
- [ ] Marketing: "automated sending"
- [ ] Inquiries: "lead capture", "conversion analytics"
- [ ] Expense: "profit/loss reports"

**⚠️ Risk:** Some claims like "WhatsApp invoicing," "multi-currency," "revenue forecasting," "referral programs," and "payroll integration" may overstate what's actually built.

### Blog Posts
- [ ] Claims stay within "how to evaluate" / "why it matters" — educational, not product-promise
- [ ] No quantified outcomes promised

### About Page
- [ ] "Grow with more clarity and less manual work" — acceptable positioning
- [ ] No unsupported metrics or case studies

---

## Checklist

### Claim Verification Per Page
- [ ] Homepage — verify all 12 feature claims
- [ ] Appointments page — verify "automated reminders", "online booking", "recurring appointments"
- [ ] Billing page — verify "WhatsApp invoicing", "GST-ready", "multi-currency"
- [ ] Analytics page — verify "revenue forecasting"
- [ ] Inventory page — verify "real-time tracking", "low-stock alerts"
- [ ] Loyalty page — verify "referral programs", "points-based rewards"
- [ ] Staff page — verify "payroll integration", "digital check-in"
- [ ] Marketing page — verify "automated sending"
- [ ] Inquiry page — verify "lead capture", "conversion analytics"
- [ ] Expense page — verify "profit/loss reports"
- [ ] Mobile App page — verify app actually exists
- [ ] Blog posts — no quantified outcomes
- [ ] About — no unsupported metrics
- [ ] FAQ — all answers stay within market-now

### Action Items
- [ ] For each "market-carefully" claim found in public copy: either remove or add disclaimer
- [ ] For any "future-state" claim found in public copy: **remove immediately**
- [ ] Add `/* FUTURE STATE */` comments above any aspirational sections kept for future activation
- [ ] Run claims-matrix cross-check before launch

---

## Success Criteria
- Zero future-state claims in public copy
- All market-carefully claims are properly caveated
- Every quantified or specific capability claim maps to a backend route
- Claims matrix is the single source of truth for what can be published
