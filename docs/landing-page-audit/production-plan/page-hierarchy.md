# Page Hierarchy and Priority Plan

## Status
- **Scope:** landing-page audit production plan
- **Source basis:** `master-roadmap.md`, `execution-pack.md`, `page-system.md`, `agent-plan.md`
- **State cut:** current-state vs future-state is kept explicit below
- **Rule:** do not add routes that are not already supported by the source docs

## Purpose
Define the route hierarchy for the landing-page system and rank pages by business role:
1. primary conversion pages
2. SEO money pages
3. trust pages
4. future pages

This document is the page-priority layer for the broader production plan. It should stay aligned with `page-system.md` as the route source of truth.

---

## Current-state route hierarchy

### 1) Primary conversion pages
These are the pages that should carry the main conversion intent and be treated as the highest-priority routes in the current system.

| Route / route family | Role | Priority | Notes |
|---|---:|---:|---|
| `/` | Home / top-of-funnel conversion hub | P1 | Core entry point; should point users into the main offer path and supporting proof. |
| `crm` product page family | Product-led conversion page | P1 | Source docs treat CRM as a named product area; keep the canonical product path as the primary offer route. |
| `backend` page family | Solution / capability conversion page | P1 | Use as a conversion route when the visitor intent is implementation or operations-led. |
| `brand` connectivity page family | Conversion support page | P2 | Supports brand- and positioning-led journeys; should link into the primary offer path. |

### 2) SEO money pages
These pages capture high-intent organic demand and should be prioritized after the primary conversion pages.

| Route / route family | Role | Priority | Notes |
|---|---:|---:|---|
| `crm` product subpages | Money-page cluster | P1 | Keep tightly aligned to product intent and commercial search demand. |
| `backend` subpages | Money-page cluster | P1 | Use for capability-specific search intent and proof-led landing experiences. |
| `brand` subpages | Money-page cluster | P2 | Use when the search intent is brand/connectivity or top-of-funnel commercial discovery. |
| `blog` topic cluster pages | SEO support / demand capture | P2 | Blog content supports money pages through internal links and topical coverage. |
| geo-targeted pages from the blog/geo strategy | Local SEO money pages | P2 | Future-facing unless already implemented in `page-system.md`; keep aligned to the geo strategy doc. |

### 3) Trust pages
These pages do not usually close the first click, but they reduce friction and support conversion across the site.

| Route / route family | Role | Priority | Notes |
|---|---:|---:|---|
| About / company page family | Trust page | P2 | Should explain who the business is and reinforce legitimacy. |
| Case study / proof page family | Trust page | P1 | Highest-trust support route; should be linked from every money page. |
| FAQ / objections page family | Trust page | P2 | Should answer buyer objections and support conversion handoff. |
| Contact / inquiry page family | Trust + conversion support | P1 | Keep visible from all high-intent routes. |

### 4) Content / support pages
These pages support discovery, internal linking, and proof, but they should not outrank conversion or money pages.

| Route / route family | Role | Priority | Notes |
|---|---:|---:|---|
| Blog index | Content hub | P2 | Should funnel readers into money pages, proof pages, and the home page. |
| Blog article pages | Content support | P2 | Must include contextual links to money pages and trust pages. |

---

## Future-state pages
These are the page types the source docs imply as likely next steps or expansion surfaces. Do not promote them ahead of current-state conversion or money pages unless the roadmap changes.

### Planned future page types
- Location / geo pages for named markets
- Comparison pages for high-intent alternative searches
- Expanded service / solution subpages where the current route family is too broad
- Additional proof pages if the current proof set is not sufficient
- Dedicated campaign landing pages when acquisition channels require a tighter message match

### Future-state priority rules
- Future pages only move into P1 if they are tied to a documented campaign or commercial launch.
- If a future page duplicates an existing intent, it should canonicalize to the existing primary route.
- New SEO pages should be added only when they have a clear internal-link role and no overlap with an existing money page.

---

## Canonical and prioritization notes

### Canonicalization
- Keep one canonical route for each core intent.
- Do not create parallel pages for the same offer unless the source docs explicitly require them.
- If a product, brand, or backend subpage overlaps with a blog article or campaign page, the commercial page is the canonical target.
- Use supporting content to point into the canonical money page, not the other way around.

### Prioritization
- **P1:** home, primary conversion routes, case studies, contact, and the strongest money pages
- **P2:** trust pages, supporting SEO pages, blog hubs, FAQ, and secondary money pages
- **P3:** future pages, experimental pages, and campaign variants until they earn a stable role

### De-duplication rules
- One page family = one primary search intent.
- Avoid splitting the same intent across multiple route families.
- If a page can serve both trust and conversion roles, let the conversion route stay primary and use the trust route as support.

---

## Internal-link roles

### Home page
- Routes traffic to the strongest conversion pages
- Surfaces the primary product and solution families
- Links into trust content and top SEO pages

### Primary conversion pages
- Link back to home
- Link sideways to related money pages
- Link down to proof, FAQ, and blog support content
- Should not leak authority into duplicate or low-priority pages

### SEO money pages
- Receive links from home, blog, trust pages, and related money pages
- Pass users toward contact and proof pages
- Should be the main internal-link targets from supporting content

### Trust pages
- Reinforce claims made on conversion and money pages
- Link into contact and relevant product/solution pages
- Should be easy to reach from every high-intent route

### Blog and content pages
- Feed authority into the money-page cluster
- Support discovery for geo, brand, backend, and CRM topics
- Avoid becoming the final destination for high-intent traffic

---

## Current-state checklist
- [ ] Keep the home page as the top-level conversion entry point
- [ ] Treat CRM, backend, and brand families as route-level priorities
- [ ] Use blog content as support, not as a replacement for money pages
- [ ] Keep case studies and contact pages visible from every commercial route
- [ ] Maintain one canonical route per intent
- [ ] Review `page-system.md` before adding any new page family

## Future-state checklist
- [ ] Add geo pages only when the geo strategy justifies the route
- [ ] Add comparison pages only when there is enough demand and proof
- [ ] Expand page families only when the intent cannot be covered by an existing canonical page
- [ ] Re-rank priorities after launch data confirms conversion and SEO value