# CRM Product Map

## Scope
This document maps the CRM and super-admin frontend surfaces to the landing page strategy. It identifies what product capabilities are represented in the frontend shell, how they relate to marketing claims, and what should be reflected on the public site.

## Findings

### Current frontend product surface
The CRM frontend feature map confirms the following user-facing areas:
- Customers
- Appointments
- Billing and invoices
- Attendance and staff dashboard
- Business analytics / reports
- Loyalty / points / sales targets
- Auth / admin and user roles
- Optional real-time elements such as appointment availability and staff presence

### Frontend shell pages available
The scaffolded pages show a practical operational product surface:
- `/admin/dashboard`
- `/admin/customers`
- `/admin/appointments`
- `/admin/billing`
- `/admin/reports`
- `/user/dashboard`
- `/user/appointments`
- `/user/invoices`

### What works
- The frontend confirms that Swalook is not only a marketing concept; it has a real product shell.
- The available pages align well with the backend route families and the public landing page story.
- The shell architecture is consistent with a modular operational SaaS product.
- The frontend supports both administrative and user-facing workflows.

### What is missing
- The public landing page does not yet reflect the frontend page model in a visible, contract-backed way.
- The frontend feature map is broad, but not all of it is surfaced on the public marketing site.
- There is no explicit mapping between the landing page feature pages and the CRM shell routes.
- The feature hierarchy in the CRM could be used more directly to shape marketing language and blog topics.

---

## Product capability inventory

### Core CRM capabilities represented in the frontend
These are strongly aligned with public marketing claims:
- customer list and profile management
- appointment booking and rescheduling
- billing and invoice creation
- PDF / export interactions
- attendance and staff dashboard
- analytics / reporting
- loyalty and points
- sales targets
- auth and role-based routing

### Supporting UX and infrastructure capabilities
These support product quality and should be acknowledged in the roadmap:
- shared API client wrapper
- role-based routing
- design system primitives
- observability hooks
- Bun-based Docker and CI setup
- optional real-time views

---

## Alignment with landing page messaging

### Directly marketable on the public site
The following CRM capabilities should be clearly reflected in the landing page and feature pages:
- appointments
- billing and invoices
- analytics and reporting
- customer management
- loyalty and retention
- attendance and staff visibility
- dashboards
- role-based access and admin control

### Useful for feature-page expansion
These can inspire future feature pages or deeper subsections:
- customer profile and search
- booking history
- invoice history
- PDF download
- staff dashboard
- real-time presence indicators
- sales target tracking

### Should remain internal or future-state unless confirmed
- implementation specifics of the API client
- shell architecture details
- internal observability tooling
- scaffold-only pages that are not yet productized
- any feature that exists only as a shell without a complete workflow

---

## Naming consistency guidance

### Frontend terminology to mirror in marketing
- dashboard
- customers
- appointments
- billing
- invoices
- reports
- loyalty
- attendance
- user dashboard
- admin dashboard

### Marketing-facing equivalents
- dashboard and analytics
- customer management
- appointment scheduling
- billing and invoice automation
- staff and attendance visibility
- loyalty and retention workflows
- admin control and role-based access

### Avoid blending terms inconsistently
Do not mix:
- “admin dashboard” and “super-admin dashboard” without a reason
- “reports” and “analytics” as if they are separate products unless clearly differentiated
- “user dashboard” and “customer portal” unless the UX supports that distinction

---

## Recommended public-site mapping

| CRM frontend capability | Suggested public page coverage |
|---|---|
| Customers | feature page and blog posts on client retention / CRM value |
| Appointments | appointment scheduling page and homepage hero/support sections |
| Billing and invoices | invoice software page and billing explanations |
| Attendance and staff dashboard | staff attendance page and operations sections |
| Analytics / reports | analytics and dashboard pages |
| Loyalty / points / targets | loyalty page and retention narrative |
| Admin / user roles | trust, security, and access control language |
| Real-time elements | future-state or proof-supported feature expansion |

---

## Product story implications

### What the frontend proves
The frontend proves that Swalook should be presented as:
- a workflow product,
- a control panel for salon operations,
- and a business system with administrative and end-user surfaces.

### What the frontend suggests for marketing
Marketing should emphasize:
- role-based experiences
- operational clarity
- visibility into customers, appointments, and revenue
- loyalty and repeat-business support
- business reporting
- hands-on control, not just passive tracking

### What it does not suggest
The frontend does not yet justify:
- exaggerated enterprise language
- highly advanced realtime claims unless demonstrated
- unsupported AI positioning
- generic consumer-app framing

---

## Recommendations

### P0
- Align the landing page feature hierarchy with the CRM shell capabilities.
- Use the frontend feature inventory to validate feature-page language.
- Keep public claims grounded in what the shell clearly supports.

### P1
- Add CRM-linked proof points to the public feature pages.
- Expand the blog around customer management, appointments, billing, and retention workflows.
- Standardize terminology between landing page and frontend.

### P2
- Use the CRM shell to inform future case studies and comparison pages.
- Add role-based page narratives if the frontend evolves into richer user/admin experiences.

## Priority
High. The CRM frontend is the operational proof layer for the public brand story.

## Dependencies
- frontend page shells and route structure
- backend route inventory
- landing page feature hierarchy
- content and sales alignment
- implementation status of shell pages

## Risks
- public site overpromising beyond the frontend shell
- naming mismatch between product and marketing surfaces
- treating scaffold pages as finished workflows
- splitting admin and user experiences into different brand stories

## Next steps
1. Use this map to inform feature-page content and blog cluster topics.
2. Keep the public story constrained to the frontend’s real capability set.
3. Update this map when the CRM shell becomes a richer implemented product.
