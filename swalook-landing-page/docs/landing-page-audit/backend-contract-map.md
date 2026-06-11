# Backend Contract Map

## Scope
This document maps the `swalook-node` backend route surface to the landing page ecosystem. It identifies product capabilities visible from the API contract layer, what is safe to market now, and what should remain future-state until confirmed by implementation details.

## Findings

### Current backend surface
The backend route inventory shows a broad product system, not just auth or booking:
- auth and user identity
- roles and permissions
- admin and super-admin
- dashboard and analytics
- appointments
- attendance dashboards
- billing and invoices
- invoice templates
- export and PDF generation
- inventory and inventory adjustments
- inventory analytics
- consumption
- loyalty
- consumer / customer flows
- services and combo services
- social and media
- expense and purchase invoices
- vendor management
- helpdesk and enquiries
- coupons
- branch management
- salestarget
- staff and staff advances
- health endpoints

### What works
- The route inventory confirms Swalook is a real operational platform.
- The backend clearly supports the landing page’s claims around appointments, billing, inventory, analytics, staff, loyalty, and branch visibility.
- The API documentation already signals a contract-first mentality.
- Health and documentation endpoints are present, which is useful for operational trust.

### What is missing
- The public marketing site does not yet reflect the full backend scope in a contract-backed way.
- There is no visible marketability classification for endpoints and capabilities.
- There is no public claims inventory tied directly to backend routes.
- The backend surface is broader than the current landing page story in a few areas, but the public site does not yet articulate those workflows precisely enough.

---

## Capability inventory

### Core marketable capabilities
These are strongly supported by the route surface and can be marketed now with high confidence:
- appointments
- scheduling
- billing and invoices
- dashboard reporting
- analytics
- inventory management
- staff and attendance
- loyalty and customer retention
- inquiry / lead management
- branch management
- expense and purchase tracking
- vendor workflows
- export and PDF reporting
- roles and access control
- admin and super-admin operations

### Supporting capabilities
These help strengthen the narrative but should be used with slightly more care:
- social and media workflows
- coupons and promotions
- service bundles / combo services
- staff advances
- helpdesk / support / enquiries
- consumer/customer lifecycle features

### Operational / platform capabilities
These are important to the product but should not dominate marketing copy:
- authentication and user management
- health endpoints
- docs and Swagger/Scalar access
- migration and database hardening support
- internal scripts and maintenance workflows

---

## Safe-to-market framework

### Market now
The following statements are safe to reflect in marketing and blog content:
- Swalook supports salon CRM and management workflows.
- Swalook handles appointments and scheduling.
- Swalook supports billing and invoice generation.
- Swalook provides dashboards and analytics.
- Swalook supports inventory and stock-related workflows.
- Swalook can support staff and attendance workflows.
- Swalook supports loyalty and repeat-customer workflows.
- Swalook includes branch-level and admin-level operational control.
- Swalook can support marketing-related workflows such as templates and campaigns.

### Market carefully
These should be described carefully until front-end/product proof is explicitly confirmed:
- advanced automation depth
- customer-facing mobile features beyond a broad “mobile app” claim
- AI-assisted workflows
- very specific omnichannel messaging claims
- deep multi-branch intelligence claims

### Future state
These can be part of the roadmap but should be labeled as not yet fully productized unless separately confirmed:
- comparison pages against specific competitors
- case-study-driven claims with metrics
- dedicated walkthrough media
- broader content automation features
- any premium enterprise narrative beyond the verified platform scope

---

## Backend-to-marketing translation

### Route families and marketing meaning
| Backend route family | Product meaning | Landing page relevance |
|---|---|---|
| auth / user / roles | secure platform access | trust and login/security messaging |
| admin / dashboard | platform control and visibility | feature hub and branch-level messaging |
| appointments | bookings and scheduling | appointment pages and hero value |
| billing / invoices / pdf / export | revenue capture and reporting | billing and invoice pages |
| inventory / adjustments / analytics | stock control and operational efficiency | inventory pages |
| loyalty / consumer / customer | retention and repeat visits | retention and loyalty pages |
| staff / attendance / salestarget | people management | staff and operations pages |
| expense / purchase / vendor | cost control | operations and margin messaging |
| enquiry / helpdesk | lead capture and support | inquiry and support pages |
| services / combo services | service catalog and packaging | feature pages and marketing support |
| social / media / coupons | campaign and promotion support | marketing pages |

---

## Claims guidance by page type

### Homepage
Use backend-backed claims about:
- retention
- no-show reduction
- appointments
- billing
- analytics
- branch control
- operations

Avoid:
- over-specific feature claims not proven in the UI or contracts
- vague AI promises
- making the homepage sound like a different product category

### Feature pages
Each feature page should map to a route family:
- appointments → appointment routes
- dashboard/analytics → dashboard + analytics routes
- invoice/billing → billing and invoice routes
- inventory → inventory and inventory analytics routes
- loyalty → loyalty and consumer routes
- staff/attendance → staff and attendance routes

### Blog
Blog content should educate around actual backend-supported problems:
- no-shows
- repeat visits
- billing workflows
- inventory control
- staff tracking
- branch visibility
- retention campaigns

### About page
Use the backend only as proof of substance, not as the main story.
The about page should sound like a product company that has a real system behind it.

---

## Naming and contract consistency

### Preferred terminology
Use these terms consistently across marketing and product surfaces:
- appointment scheduling
- dashboard
- analytics
- billing
- invoices
- inventory
- staff attendance
- loyalty
- branch management
- inquiry management
- marketing templates

### Avoid unless verified
- “AI mobile app” unless the product truly behaves that way
- “enterprise” unless the implementation and commercial packaging support it
- “all-in-one” without describing what is actually integrated
- “automation” without indicating the actual workflow scope

---

## Contract-backed narrative map

### What the backend proves
The backend proves that Swalook is:
- a real salon operations platform,
- a product with multiple connected domains,
- and a system that goes beyond basic appointment booking.

### What the backend does not automatically prove
The backend alone does not prove:
- polished UI/UX quality
- every workflow is complete end-to-end
- every claimed feature is production-ready
- all public-facing promises are currently visible in the frontend

### Marketing implication
Marketing should use the backend as:
- a truth source,
- a product inventory,
- and a claims boundary.

Not as:
- hidden internal detail,
- or a source for aspirational copy that cannot be matched in the product.

---

## Recommendations

### P0
- Align public marketing claims with the backend route inventory.
- Use the backend as the claims boundary for the homepage, feature pages, and blogs.
- Standardize terminology across landing page and product surfaces.

### P1
- Create a contract-backed claims table for future campaign and page writing.
- Add product proof to feature pages where possible.
- Connect blog topics to actual route families and workflows.

### P2
- Deepen the map with route-by-route evidence if needed later.
- Turn selected backend route families into dedicated comparison or use-case pages.

## Priority
High. The backend is the source of truth for what Swalook can credibly market now.

## Dependencies
- route inventory from `swalook-node`
- API documentation and schemas
- CRM frontend implementation state
- public site copy and page hierarchy
- product and sales alignment on feature readiness

## Risks
- marketing claims outrunning implementation
- overcommitting to unsupported automation or AI language
- inconsistent naming across frontend and backend
- exposing product gaps through over-specific copy

## Next steps
1. Use this map to keep future marketing claims constrained.
2. Feed the safe-to-market list into the landing page and blog strategy.
3. Use the CRM product map to validate which routes are actually surfaced in the frontend.
4. Update the roadmap when new backend routes or schemas materially change the product narrative.
