# Claims Matrix

> Status: current-state / planning guardrail  
> Purpose: classify public-facing statements into **market-now**, **market-carefully**, and **future-state** so the landing page only says what the repo can actually support.

## Source basis
This matrix is grounded in the same repo evidence used by the proof map:
- Landing page marketing shell: `swalook-landing-page/app/page.js`, `app/layout.js`, `components/Navbar.js`, `components/Footer.js`, `components/PageHero.js`, `components/FeaturePage.js`, `components/BlogPostLayout.js`
- Backend route families: `swalook-node/src/routes/auth.routes.ts`, `appointment.routes.ts`, `billing.routes.ts`, `analytics.routes.ts`, `customer.routes.ts`, `enquiry.routes.ts`, `inventory.routes.ts`, `loyalty.routes.ts`, `staff.routes.ts`, `attendanceDashboard.routes.ts`
- CRM super-admin shell: `crm-super-admin/apps/web/app/page.tsx`, `app/layout.tsx`, `app/admin/layout.tsx`, `app/admin/page.tsx`, `app/auth/login/page.tsx`
- CRM proof tests: `crm-super-admin/apps/web/tests/auth-endpoint-contract.test.ts`, `crm-super-admin/apps/web/tests/admin-module-endpoints.test.ts`

## Current-state rule
Public copy should be limited to what is already documented in the source files for the landing page audit: roadmap, execution pack, brand connectivity, backend contracts, CRM/product mapping, motion/asset system, and the verified CRM shell.

## Matrix

| Claim area | Example public claim | Status | Why | Recommended wording |
|---|---|---:|---|---|
| Brand / positioning | “Swalook is built for salon and beauty-business operations.” | Market-now | Supported by landing-page narrative, backend route inventory, and CRM shell. | Safe as the core positioning line. |
| Site scope | “The website organizes products, content, and conversion paths into a clear landing-page system.” | Market-now | This is an information-architecture claim, not a business-performance claim. | Safe if the route hierarchy follows the documented system. |
| Product surface | “Swalook includes a real CRM/admin console.” | Market-now | CRM shell pages, login flow, and contract tests confirm the admin surface exists. | Safe as an operational product claim. |
| Lead capture | “Visitors can contact us through a documented inquiry flow.” | Market-carefully | The route exists in the public plan, but end-to-end wiring still needs verification. | Use only if the form, validation, and handoff are implemented. |
| CRM sync | “Inbound leads can connect to CRM workflows.” | Market-carefully | Backend enquiry routes and CRM shell exist, but routing and field mapping must be verified. | Phrase as a capability, not a guaranteed live flow. |
| Appointment scheduling | “Appointment scheduling and related workflows are supported.” | Market-now | Directly supported by backend appointment routes and CRM admin appointments page. | Safe current-state feature claim. |
| Billing / invoices | “Billing and invoice workflows are supported.” | Market-now | Strongly backed by backend billing routes and CRM admin billing page. | Safe current-state feature claim. |
| Dashboards / analytics | “Dashboards and analytics help with business visibility.” | Market-now | Supported by backend analytics/dashboard routes and CRM admin analytics pages. | Safe current-state feature claim. |
| Customer management | “Customer management workflows are supported.” | Market-now | Backend customer routes and CRM customers page support this claim. | Safe current-state feature claim. |
| Inventory management | “Inventory and stock workflows are supported.” | Market-now | Backend inventory routes and CRM inventory page support this claim. | Safe current-state feature claim. |
| Loyalty / retention | “Loyalty and repeat-customer workflows are supported.” | Market-now | Backend loyalty routes and landing-page retention messaging align with this claim. | Safe current-state feature claim. |
| Staff / attendance | “Staff and attendance visibility is supported.” | Market-now | Backend staff routes and attendance dashboard routes confirm the capability surface. | Safe current-state feature claim. |
| Branch visibility | “Branch visibility and admin control are supported.” | Market-now | Backend dashboard/analytics/branch-related routes and CRM shell support this. | Safe as an operational visibility claim. |
| Export / PDF | “Export and PDF workflows are supported.” | Market-now | Backend export/PDF routes are present and can support this wording. | Safe utility claim. |
| Role-based access | “Role-based access and admin control are supported.” | Market-now | Backend auth/roles/permissions routes and CRM login/admin shell confirm it. | Safe current-state claim. |
| Product / feature pages | “Explore product features in more detail.” | Market-now | The route system and feature-page template support this as a content claim. | Safe if linked from the hub and nav. |
| Blog publishing | “Read articles organized by topic.” | Market-now | Blog layout and blog system docs support this content architecture claim. | Safe current-state claim. |
| Motion / visual system | “Uses a consistent visual and motion system.” | Market-now | Asset-and-motion docs define the system and homepage/feature pages already use it. | Safe design-system claim. |
| Brand consistency | “Maintains a consistent brand story across sections.” | Market-now | Brand connectivity and execution pack explicitly support this. | Safe as a consistency claim. |
| Measurement | “Built to support measurement of key interactions.” | Market-carefully | Measurement strategy exists, but event wiring still needs implementation verification. | Avoid claiming complete analytics coverage. |
| CRM admin modules | “Operational admin modules are available in the CRM shell.” | Market-now | Confirmed by CRM shell route tree and contract tests. | Safe current-state claim. |
| Super-admin login | “The admin console uses a canonical login flow.” | Market-now | Root redirect and login page confirm a canonical path. | Safe current-state claim. |
| Lead qualification | “Swalook can support lead qualification workflows.” | Market-carefully | Backend enquiry/customer/auth families exist, but qualification rules must be verified. | Keep as a capability statement, not a promise. |
| SEO support | “The site is built to support search discovery.” | Market-carefully | The SEO plan and content system support this, but rankings are not guaranteed. | Use “built to support” rather than “rank.” |
| Performance | “The page is optimized for fast loading on mobile.” | Market-carefully | This depends on implementation discipline and runtime validation. | Keep as a goal unless measured. |
| Advanced automation | “Lead routing is fully automated.” | Future-state | Automation depth is not proven end to end in the repo evidence. | Present as roadmap language only. |
| Personalization | “The page personalizes content by visitor segment.” | Future-state | No implementation proof in the repo. | Do not publish. |
| Real-time data | “Live inventory / live pricing / live status is shown.” | Future-state | No verified live source of truth in the docs or shell. | Do not publish unless contract exists. |
| Quantified outcomes | “We have measurable results, case-study lift, or benchmark gains.” | Future-state | No approved evidence or case-study proof is confirmed. | Do not publish. |
| Mobile booking app | “Customers can book through the mobile app.” | Future-state | The mobile app is referenced as a product extension, but this exact flow is not proven here. | Use only “mobile app extension” or “mobile app positioning.” |
| Enterprise positioning | “Swalook is an enterprise-grade platform.” | Market-carefully | The platform is broad, but enterprise packaging and proof are not established here. | Use only if the commercial story supports it. |
| Support guarantees | “We guarantee response time or SLA.” | Future-state | No legal/support proof in the source docs. | Do not publish. |

## Rules for copywriters
1. **Market-now** claims may appear in public copy only if the supporting system is already in place.
2. **Market-carefully** claims may appear only when the implementation is either shipped or explicitly framed as a design/UX goal.
3. **Future-state** claims stay out of public-facing copy unless a sibling plan explicitly marks them as shipped and verified.
4. Never imply measured business outcomes without source data.
5. Never imply live data, automation, or CRM outcomes unless the proof map confirms them.
6. If a claim spans multiple systems, all supporting systems must be verified before it is promoted to market-now.

## Implementation risks
- Overstating capability before backend or CRM wiring is complete.
- Letting design language drift into performance promises.
- Publishing future-state claims as if they were current-state facts.
- Using quantifiers (“fastest”, “best”, “guaranteed”) without evidence.
- Treating shell-only UI as proof of complete end-to-end behavior.

## Status block
> Status: draft guardrail  
> Risk level: medium  
> Required before launch: copy review against the proof map and the backend / CRM implementation state
