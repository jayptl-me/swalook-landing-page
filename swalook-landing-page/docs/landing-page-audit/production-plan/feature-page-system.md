# Feature Page System

## Status

- **State:** Draft planning spec
- **Source basis:** `master-roadmap.md`, `execution-pack.md`, `page-system.md`, `crm-product-map.md`
- **Scope:** Canonical template for all feature pages in `swalook-landing-page`
- **Use:** One reusable structure for current feature pages, with controlled page-specific variation
- **Guardrail:** Public claims must stay aligned to CRM frontend surfaces and backend/route truth

---

## Purpose

This document defines the standard feature-page system for Swalook.

Feature pages are not standalone marketing one-offs. They are part of the site’s acquisition and conversion system:
- they support search intent,
- explain one product capability at a time,
- connect back to the feature hub,
- and route users to demo / trial / contact.

The goal is consistency without making every page identical.

---

## Current-state truth

The current site already supports a feature-page system:
- a reusable feature page template exists,
- the site has a feature hub route,
- core conversion routes already exist,
- and the CRM/frontend surface confirms the product can support real operational claims.

The safest public feature-page claims currently map to:
- customer management
- appointment scheduling
- billing and invoices
- analytics and reporting
- attendance and staff visibility
- loyalty and repeat-customer workflows
- dashboards
- role-based access and admin control
- export / PDF workflows
- mobile app positioning as a product extension

Use these as the baseline for feature-page copy.

---

## Canonical feature-page template

Every feature page should follow the same overall structure.

### 1) Hero
Include:
- clear feature name
- one-sentence value proposition
- short supporting paragraph
- primary CTA
- secondary CTA
- optional product screenshot / mockup / illustration

Hero goal:
- tell the visitor exactly what the page is about in seconds
- connect the feature to business value, not just functionality

### 2) Why this feature matters
Include:
- the operational problem it solves
- the business impact of not having it
- the outcome Swalook supports

This section should translate feature language into salon business language.

### 3) Core capabilities
Include 3–6 capability cards or bullets.

Each capability should be:
- specific
- scannable
- grounded in current product truth
- free of inflated promises

### 4) Proof / evidence block
Include one proof block that matches the feature.

Preferred proof types:
- CRM screenshot or UI mockup
- workflow explanation tied to the frontend shell
- backend-backed capability note
- short “how it works” sequence
- data / export / report example if available

Do not use proof language that cannot be supported.

### 5) Business outcome block
Explain what the feature helps the salon do:
- save time
- reduce missed appointments
- improve visibility
- increase repeat visits
- simplify billing
- improve staff coordination
- support better decisions

### 6) Related feature navigation
Include links to:
- the feature hub
- adjacent feature pages
- one or two useful supporting pages
- the main conversion route

This keeps the feature page inside the broader system.

### 7) CTA block
Include:
- primary CTA: **Book Free Demo**
- secondary CTA: **Start Free Trial**
- optional tertiary CTA: **Contact Us**

The final CTA must always route to a conversion page.

### 8) FAQ block
Include only if the page has:
- a real objection pattern,
- a search intent benefit,
- or enough content to support a useful FAQ.

Do not force FAQ on every page.

---

## Recommended section order

The default order for all feature pages is:

1. Hero
2. Why this feature matters
3. Core capabilities
4. Proof block
5. Business outcome block
6. Related feature navigation
7. FAQ, if needed
8. Final CTA

This order matches the site’s current conversion logic:
- explain value,
- show proof,
- then route to conversion.

---

## Page-specific variation rules

Feature pages should vary only where the intent requires it.

### Variation type 1: workflow-heavy pages
Use for:
- appointment scheduling
- billing and invoices
- attendance and staff visibility
- customer management

Recommended additions:
- step-by-step workflow section
- small process diagram
- “before / after” comparison

### Variation type 2: reporting / analytics pages
Use for:
- dashboard and analytics
- reports
- business visibility pages

Recommended additions:
- metric examples
- report-style blocks
- role-based visibility language
- export or PDF notes if supported

### Variation type 3: retention / loyalty pages
Use for:
- loyalty
- repeat-customer workflows
- customer retention pages

Recommended additions:
- outcomes framing
- repeat-visit language
- membership / points / reward logic only if supported
- reactivation or follow-up examples if proven

### Variation type 4: utility / extension pages
Use for:
- mobile app
- export / PDF style capabilities
- admin control and access pages

Recommended additions:
- device or interface context
- operational trust language
- cross-platform continuity notes

### Variation type 5: high-intent SEO pages
Use for:
- pages targeting a narrow search query
- pages that need stronger intent matching

Recommended additions:
- tighter intro copy
- more direct keyword alignment
- fewer decorative sections
- one strong proof block
- concise FAQ

---

## CTA routing rules

### Primary CTA
Use:
- **Book Free Demo**

Default route:
- `/book-demo`

Why:
- best for product explanation pages
- strongest fit for feature-depth traffic
- low risk for users still evaluating

### Secondary CTA
Use:
- **Start Free Trial**

Default route:
- `/free-trial`

Why:
- useful where the feature is easy to understand quickly
- best when the page supports self-serve intent

### Tertiary CTA
Use:
- **Contact Us**

Default route:
- `/contact`

Why:
- best for users who need clarification, pricing context, or implementation confidence

### CTA placement rules
- one CTA in the hero
- one CTA after proof or capability content
- one final CTA at the bottom
- avoid overloading the page with competing conversion actions
- keep CTA labels consistent across feature pages

### CTA selection guidance
Choose the CTA based on page intent:
- demo-first for complex or high-consideration features
- trial-friendly for simple product-entry features
- contact support for pages that need human reassurance

---

## Proof block system

Proof blocks should be tied to actual product surfaces.

### Acceptable proof types
- frontend CRM screen or page shell
- backend route family or workflow alignment
- actual screenshot or UI mockup
- export / PDF / report example
- annotated capability explanation
- product flow illustration

### Proof block format
Each proof block should answer:
1. what the user sees
2. what the user can do
3. why it matters

### Proof block rules
- do not imply completed workflows if only a shell exists
- do not use vague “enterprise” language without support
- do not rely on generic stock imagery as proof
- keep proof specific to the feature

### Best-fit proof by page type
- **Appointments:** booking / rescheduling flow
- **Billing:** invoice / payment / PDF flow
- **Analytics:** dashboard / reports / export view
- **Customers:** profile / history / search flow
- **Attendance:** staff visibility / status view
- **Loyalty:** points or repeat-visit workflow
- **Mobile app:** device extension / companion workflow

---

## FAQ usage rules

FAQ should be used selectively, not mechanically.

### When to include FAQ
Use FAQ when the page needs:
- objection handling
- long-tail keyword support
- clarification of scope
- conversion reassurance
- route to support or demo

### When to avoid FAQ
Skip FAQ when:
- the page is already concise and clear,
- the feature is simple,
- or the FAQ would repeat the body copy.

### FAQ topic guidance
Best FAQ themes:
- what the feature does
- who it is for
- whether it works with current workflows
- how it connects to other Swalook features
- what route to use for setup or demo

### FAQ guardrails
- answer only what is true now
- do not write speculative product promises
- do not use FAQ as a future-state catchall
- keep answers short and direct

### FAQ routing
FAQ answers should naturally point to:
- feature hub
- demo
- trial
- contact
- related feature pages

---

## Internal navigation system

Feature pages should not be isolated pages.

### Required internal links
Every feature page should include links to:
- `/salon-crm-features`
- at least one related feature page
- one conversion route (`/book-demo`, `/free-trial`, or `/contact`)

### Recommended navigation patterns
- “Explore all features”
- “See related workflows”
- “Book a demo”
- “Start free trial”

### Internal-link intent
Use links to show how the feature fits into the system:
- appointments connect to dashboard and billing
- billing connects to analytics and customer management
- analytics connects to reports and branch visibility
- loyalty connects to retention and customer profiles

### Anchor text rules
- use descriptive anchors
- avoid repeated generic anchors on the same page
- keep anchors aligned to the destination page’s purpose

### Cross-page grouping
Feature pages should be grouped logically:
- operations
- revenue
- visibility
- retention
- admin / control
- extension / mobile

This helps users and search engines understand the page family.

---

## Page family notes

### Appointment scheduling page
Should emphasize:
- booking clarity
- rescheduling
- customer flow
- staff visibility if supported

### Billing / invoice page
Should emphasize:
- invoice creation
- payment-related workflow if supported
- PDF / export behavior
- operational speed

### Dashboard / analytics page
Should emphasize:
- reporting clarity
- business visibility
- metrics
- decision support

### Customer management page
Should emphasize:
- profile history
- search and organization
- customer context
- retention support

### Attendance / staff page
Should emphasize:
- staff visibility
- operational tracking
- team coordination
- admin view if supported

### Loyalty page
Should emphasize:
- repeat business
- points / rewards / targets if supported
- retention workflow
- customer return behavior

### Mobile app page
Should emphasize:
- product extension
- on-the-go access
- continuity with the core system
- trust and breadth

---

## Current-state vs future-state guidance

### Current-state
Use only claims supported by:
- CRM frontend surfaces
- backend route families
- documented product capabilities in the source docs

### Future-state
Mark clearly if a page section refers to:
- deeper automation
- more advanced real-time behavior
- case-study proof
- comparison content
- city/location targeting
- richer demo media

### Rule
If a feature is not yet productized or visible in the shell, it should not be written as a present-tense public promise.

---

## Recommended feature-page checklist

Before publishing a feature page, confirm:
- one clear search intent
- one primary feature focus
- one supporting proof block
- one conversion route
- one related-page path
- CTA labels match site-wide conventions
- claims align with CRM/backend truth
- FAQ is used only if it adds value
- metadata is unique
- page is reachable from the hub and footer/nav if needed

---

## Dependencies

Feature pages depend on:
- `page-system.md` for route hierarchy and internal linking
- `crm-product-map.md` for marketable product truth
- `backend-contract-map.md` for claim safety
- `master-roadmap.md` for site-level priorities
- `execution-pack.md` for CTA and measurement discipline
- homepage and feature hub decisions for navigation consistency

---

## Risks

- Overlapping feature pages cannibalizing each other
- Repeating the same proof blocks across every page
- Using CTAs that do not match user intent
- Overstating features that are still shell-only or future-state
- Making the feature pages too visually similar to support SEO differentiation
- Breaking internal navigation between hub, feature pages, and conversion pages
- Adding FAQ content that is generic or unsupported

---

## Implementation priority

### P0
- lock the canonical template
- keep CTA routing consistent
- align claims to CRM/backend truth
- connect every page back to the feature hub and conversion routes

### P1
- add page-specific proof blocks where evidence exists
- tune FAQ usage by intent
- strengthen internal navigation between related features

### P2
- add richer visual variation only where it clarifies the feature
- expand to more specialized future-state pages when supported

---

## Summary

The feature-page system should function as a reusable, claim-safe template:
- one structure,
- controlled variation by feature type,
- consistent CTA routing,
- proof tied to actual product surfaces,
- FAQ used only when it helps,
- and internal navigation that keeps every page inside the same acquisition system.

This keeps the public site coherent while staying aligned with current CRM and backend truth.