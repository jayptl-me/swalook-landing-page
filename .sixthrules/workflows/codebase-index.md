# Swalook Codebase Index -- Surface-Level Living Map

> Purpose: Loaded every turn. Token-efficient surface map so AI finds exactly what it needs without scanning.
> Updated: On every implementation change. Keep concise -- no implementation details, just what/where.
> Pattern: `path/ -> what it contains (key files only)`

---

## Top-Level Layout

```
swalook/
├── swalook-node/            # Backend API (Bun + Hono + Drizzle ORM + PostgreSQL)
├── swalook-frontend-new/    # Main CRM frontend (Next.js 15 + TypeScript + Tailwind)
├── swalook-landing-page/    # Marketing site (Next.js + JS)
├── crm-super-admin/         # Super admin panel (Next.js + TypeScript, monorepo)
├── rss.xml                  # SEO
└── sitemap.xml              # SEO
```

---

## Backend: `swalook-node/`

| Path | Purpose |
|------|---------|
| `server.ts` | Entry point -- Hono app bootstrap |
| `src/index.ts` | App composition -- routes, middleware, jobs |
| `src/config/` | Environment config, constants |
| `src/db/schema.ts` | Drizzle ORM schema -- ALL table definitions |
| `src/db/index.ts` | DB connection pool (MySQL2 via Drizzle) |
| `src/db/relations.ts` | Table relationships |
| `src/routes/*.ts` | 37 route files -- REST API endpoints (auth, billing, appointments, inventory, etc.) |
| `src/controllers/*.ts` | 37+ controller files -- business logic per domain |
| `src/services/*.ts` | 7 shared services -- auth, OTP, blog, lifecycle, activity, user |
| `src/schemas/*.ts` | 27 Zod validation schemas |
| `src/middleware/*.ts` | 9 middleware -- auth, RBAC, rate-limit, error-handler, audit, cache, logger |
| `src/events/` | Event store (SwalookEvents) |
| `src/jobs/` | Background jobs (BullMQ + Redis) |
| `src/utils/` | Shared utilities |
| `src/scripts/` | 30+ migration/seed/verification scripts |
| `src/templates/` | PDF/email templates |

**Tech:** Bun runtime, Hono 4.x, Drizzle ORM 0.45, MySQL2, Zod 4.x, BullMQ + IORedis, Firebase Admin, Nodemailer, Sharp

---

## Main Frontend: `swalook-frontend-new/apps/web/`

| Path | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout -- providers, theme |
| `app/page.tsx` | Entry -- redirects to dashboard |
| `app/(dashboard)/` | Dashboard pages (staff, owner views) |
| `app/admin/` | Admin-only pages |
| `app/auth/` | Login, register, forgot password |
| `app/staff/` | Staff-facing pages |
| `app/user/` | User profile/settings |
| `app/design-system/` | Design reference page |
| `components/ui/` | 38 shared UI components (Button, Modal, DataTable, Charts, Toast, etc.) |
| `components/dashboard/` | Dashboard-specific components |
| `components/customers/` | Customer-specific components |
| `components/layout/` | Sidebar, TopBar, layout context |
| `components/auth/` | Auth-related components |
| `lib/api.ts` | API client -- all backend calls |
| `lib/auth.ts` | Auth utilities (tokens, session) |
| `lib/types.ts` | Shared TypeScript types |
| `lib/utils.ts` | General utilities |
| `lib/permissions.ts` | RBAC permission checks |
| `lib/hooks/` | Custom React hooks |
| `lib/contracts/` | API contract types |
| `lib/*.ts` | 15 domain-specific libs (appointments, billing, inventory, loyalty, etc.) |
| `styles/` | Global styles |
| `tests/` | Vitest test files |

**Tech:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Vitest

---

## Super Admin: `crm-super-admin/apps/web/`

| Path | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout |
| `app/admin/` | Admin management pages |
| `app/auth/` | Auth pages |
| `app/design-system/` | Design system |
| `components/admin/` | Admin-specific components (AdminTable, AdminKpiCard, AdminModuleScaffold) |
| `components/ui/` | 25 shared UI components |
| `lib/api.ts` | API client |
| `lib/auth.ts` | Auth utilities |
| `lib/roles.ts` | Role management |

**Tech:** Next.js (monorepo with Turborepo), shared UI package

---

## Landing Page: `swalook-landing-page/`

| Path | Purpose |
|------|---------|
| `app/(marketing)/` | Marketing pages (home, features, pricing) |
| `app/(product)/` | Product pages |
| `app/(content)/` | Blog content |
| `app/(legal)/` | Privacy, terms, etc. |
| `app/crm/` | CRM-specific landing |
| `components/ui/` | Shared UI |
| `components/home/` | Homepage sections |
| `components/blog/` | Blog components |
| `components/layout/` | Header, footer |
| `components/marketing/` | Marketing components |
| `components/product/` | Product components |
| `components/legal/` | Legal page components |
| `lib/blog.js` | Blog utilities |
| `data/` | Blog posts, authors, config (JSON) |
| `scripts/generate-rss.js` | RSS feed generator |
| `public/rss.xml` | Generated RSS |
| `public/images/` | Static images |

**Tech:** Next.js, JavaScript, CSS Modules

---

## Key Cross-Cutting Concerns

| Concern | Backend Location | Frontend Location |
|---------|-----------------|-------------------|
| **Auth** | `middleware/auth.ts`, `services/auth.service.ts`, `routes/auth.routes.ts` | `lib/auth.ts`, `components/auth/` |
| **RBAC** | `middleware/route-rbac.ts`, `middleware/admin-audit.ts` | `lib/permissions.ts`, `lib/roles.ts` |
| **Billing** | `controllers/billing.controller.ts`, `routes/billing.routes.ts` | `lib/api.ts` (billing calls) |
| **Inventory** | `controllers/inventory*.controller.ts`, `routes/inventory*.routes.ts` | `lib/inventory-consumption.ts` |
| **Customers** | `controllers/customer.controller.ts`, `services/customer-lifecycle.service.ts` | `lib/customers-loyalty.ts` |
| **Appointments** | `controllers/appointment.controller.ts` | `lib/appointments.ts` |
| **Analytics** | `controllers/analytics.controller.ts` | Charts component |
| **PDF** | `controllers/pdf.controller.ts`, `templates/` | `lib/invoice-pdf-artifact.ts` |

---

## Database Tables (from Drizzle schema)
Auth users, branches, staff, customers, services, appointments, billing/invoices, inventory, expenses, loyalty, attendance, payslips, coupons, enquiries, vendors, purchases, sales targets, blog posts, helpdesk tickets, social media, combo services, invoice templates, event store, activity logs.

---

## Update Protocol
After ANY code change, update the affected rows in this file. Keep it surface-level -- file names and one-line purposes only. No implementation details. This is a MAP, not documentation.
