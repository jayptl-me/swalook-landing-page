# Proof Map

> Status: current-state evidence map  
> Purpose: connect public claims to backend / CRM support so the landing page only publishes statements we can defend.

## Source basis
This map is grounded in the following repo evidence:
- Landing page marketing shell: `swalook-landing-page/app/page.js`, `app/layout.js`, `components/Navbar.js`, `components/Footer.js`, `components/PageHero.js`, `components/FeaturePage.js`, `components/BlogPostLayout.js`
- Backend route families: `swalook-node/src/routes/auth.routes.ts`, `appointment.routes.ts`, `billing.routes.ts`, `analytics.routes.ts`, `customer.routes.ts`, `enquiry.routes.ts`, `inventory.routes.ts`, `loyalty.routes.ts`, `staff.routes.ts`, `attendanceDashboard.routes.ts`
- CRM super-admin shell: `crm-super-admin/apps/web/app/page.tsx`, `app/layout.tsx`, `app/admin/layout.tsx`, `app/admin/page.tsx`, `app/auth/login/page.tsx`
- CRM proof tests: `crm-super-admin/apps/web/tests/auth-endpoint-contract.test.ts`, `crm-super-admin/apps/web/tests/admin-module-endpoints.test.ts`

## How to use this map
- **Supportable** means the claim is backed by an existing contract, route family, frontend shell, or operational system in the repo docs.
- **Partial** means the system exists in principle, but the proof is incomplete, unverified, or depends on implementation details.
- **Not supportable yet** means the claim would overstate the current repo truth.

## Public claim → proof source

| Public claim | Proof source(s) | Support status | Notes | Safe public wording |
|---|---|---:|---|---|
| Swalook is a salon / beauty-industry CRM and operations platform | Landing page hero and feature system; backend route families; CRM shell | Supportable | The backend and CRM shell both confirm a real operational product surface. | “Swalook is built for salon and beauty-business operations.” |
| Visitors can submit an inquiry / contact request | Landing page contact / demo / trial routes; backend enquiry route family | Partial | Safe only if the form flow is wired end to end and tested. | “Send an inquiry” / “Contact us” |
| Inquiries can be routed into CRM workflows | Backend enquiry route family; CRM admin shell | Partial | Requires verified lead creation, field mapping, and follow-up handling. | “Lead capture can connect into CRM workflows” |
| Appointment scheduling is supported | Landing page feature pages; backend appointment route family; CRM admin appointments page | Supportable | Backed by both route inventory and frontend shell. | “Appointment scheduling and related workflows” |
| Billing and invoices are supported | Landing page feature pages; backend billing routes; CRM admin billing page | Supportable | Strongest support exists in billing route family and admin shell. | “Billing and invoice workflows” |
| Dashboards and analytics are supported | Landing page narrative; backend analytics/dashboard routes; CRM admin analytics + dashboard pages | Supportable | Good fit for branch visibility and reporting language. | “Dashboards and analytics for business visibility” |
| Customer management is supported | Backend customer routes; CRM admin customers page | Supportable | Includes customer list, profile, and management surfaces. | “Customer management workflows” |
| Inventory management is supported | Backend inventory routes; CRM admin inventory page | Supportable | Route surface covers products, categories, utilization, analytics, and exports. | “Inventory and stock workflows” |
| Loyalty / repeat-customer workflows are supported | Backend loyalty routes; landing-page retention messaging; CRM feature map | Supportable | Better phrased as retention / loyalty workflows than as quantified outcomes. | “Loyalty and repeat-customer workflows” |
| Staff and attendance workflows are supported | Backend staff routes; backend attendance dashboard routes; CRM admin shell mentions staff visibility | Supportable | Attendance and staff tracking are clearly present in route inventory. | “Staff and attendance visibility” |
| Branch visibility / multi-location control is supported | Backend dashboard / analytics / branch-related routes; CRM admin shell | Supportable | Safe as an operational visibility claim, not a deep intelligence claim. | “Branch visibility and admin control” |
| Export and PDF workflows are supported | Backend export / pdf routes and billing export-related routes | Supportable | Best used as a utility claim, not a primary hero promise. | “Export and PDF workflows” |
| Role-based access and admin control are supported | Backend auth / roles / permissions routes; CRM admin shell and login flow | Supportable | Strong support from auth, roles, and admin shell behavior. | “Role-based access and admin control” |
| Product / feature pages are available for deeper exploration | Landing page route system and feature-page system docs | Supportable | This is a content architecture claim, not an operational outcome claim. | “Explore product features in more detail” |
| Blog content can be published and organized | Blog layout and blog system docs | Supportable | Current blog is small, but the content system exists. | “Read articles organized by topic” |
| Site can track key interactions | SEO measurement plan; execution pack; analytics intent in docs | Partial | Measurement strategy exists, but event wiring still needs implementation verification. | “Built to support measurement of key interactions” |
| Motion and imagery follow a defined system | Asset and motion system; homepage/feature page implementations | Supportable | This is a design-system claim, not a business claim. | “Uses a consistent visual and motion system” |
| Brand pages stay aligned across sections | Brand connectivity map; execution pack | Supportable | Good as a consistency claim. | “Maintains a consistent brand story” |
| CRM shell exposes admin modules for operations | `crm-super-admin/apps/web/app/admin/*` pages and admin layout | Supportable | Confirmed by route tree and contract tests. | “Operational admin modules are available in the CRM shell” |
| Super-admin shell boots through a canonical login path | Root redirect to `/auth/login`; login page; auth contract tests | Supportable | Verified by source and tests. | “The admin console uses a canonical login flow” |
| Backend supports lead qualification and routing | Backend enquiry, customer, and auth route families | Partial | Only safe if qualification fields and routing rules are implemented and validated. | “Can support lead qualification workflows” |
| Public proof of outcomes or case studies | None confirmed in the referenced source docs | Not supportable yet | Requires approved evidence, citations, and legal review. | Do not publish outcome claims |
| Real-time availability, inventory, or pricing | None confirmed in the referenced source docs | Not supportable yet | Needs a live source of truth and monitoring. | Do not publish unless contract exists |
| Guaranteed response time or SLA | None confirmed in the referenced source docs | Not supportable yet | Operational promise requires legal / support confirmation. | Do not publish |
| Advanced automation depth | Backend routes exist for several workflows, but end-to-end automation is not proven | Future-state | Public copy must not imply full automation without implementation proof. | Keep as roadmap language only |
| Personalization by visitor segment | No confirmed implementation in the source docs | Future-state | Requires audience logic and content rules. | Do not publish |
| Quantified business outcomes | No approved evidence in the source docs | Future-state | Needs verified case studies or metrics. | Do not publish |
| Customer-facing booking app / live mobile booking claims | Mobile app is referenced in the product story, but public proof of this exact flow is not confirmed here | Future-state | Keep broad and avoid saying booking is customer-facing unless verified. | Use only “mobile app positioning” or “mobile app extension” |

## Claim tiers by supportability

### Supportable now
- Salon / beauty-business CRM positioning
- Appointment scheduling
- Billing and invoices
- Dashboards and analytics
- Customer management
- Inventory management
- Loyalty / repeat-customer workflows
- Staff and attendance workflows
- Branch visibility
- Export / PDF workflows
- Role-based access and admin control
- Product and feature page exploration
- Blog publishing and organization
- Consistent motion / visual system
- CRM shell admin modules and canonical login flow

### Supportable with implementation check
- Contact / inquiry capture
- CRM lead routing
- Analytics / event measurement
- Lead qualification
- SEO support claims

### Not supportable yet
- Quantified business outcomes
- Real-time operational data
- SLA / response guarantees
- Full automation claims
- Personalization claims without documented logic

## Implementation risks
- A claim can be technically true but still unsafe if the data path is not verified end to end.
- CRM support is often fragmented across form, validation, routing, and field mapping; all four must be tested.
- Analytics claims become misleading if events are not tagged consistently.
- Copy that implies live operations must be reviewed against the backend contract before launch.

## Status block
> Status: evidence gate  
> Risk level: high if used without implementation verification  
> Launch rule: do not ship any public claim that is not mapped to a verified proof source
