# Swalook Production Plan Index

> Status: execution status board  
> Purpose: centralize the production-plan workstreams so agents can iterate without losing context or drifting across files.

## Scope
This folder converts the audit set into an implementation-ready plan. It should stay source-backed and aligned with:
- `../master-roadmap.md`
- `../agent-plan.md`
- `../execution-pack.md`
- `../content-ops-checklist.md`
- `./page-hierarchy.md`
- `./homepage-blueprint.md`
- `./feature-page-system.md`
- `./blog-growth-system.md`
- `./claims-matrix.md`
- `./proof-map.md`
- `./asset-motion-plan.md`
- `./measurement-plan.md`
- `./launch-qa-checklist.md`

## Operating rules
- One workstream per file.
- Re-read source docs before changing conclusions.
- Separate current-state from future-state.
- Do not promote unsupported claims into public copy.
- Do not move to the next workstream until the current one is merged or explicitly blocked.

---

## Workstream board

### 1) Page hierarchy and route decisions
- File: `page-hierarchy.md`
- Status: drafted
- Goal: lock route priority, canonical intent, and page role boundaries.
- Dependencies: `page-system.md`, `master-roadmap.md`, `execution-pack.md`

### 2) Homepage section blueprint
- File: `homepage-blueprint.md`
- Status: drafted
- Goal: define the homepage narrative, section order, CTA hierarchy, and proof rules.
- Dependencies: `home-page-sections.md`, `content-ops-checklist.md`, `claims-matrix.md`

### 3) Feature-page system
- File: `feature-page-system.md`
- Status: drafted
- Goal: standardize the reusable feature-page template and CTA routing.
- Dependencies: `page-system.md`, `crm-product-map.md`, `backend-contract-map.md`, `proof-map.md`

### 4) Blog SEO and geo system
- File: `blog-growth-system.md`
- Status: drafted
- Goal: define cluster strategy, internal linking, schema, refresh workflow, and geo rules.
- Dependencies: `blog-seo-geo-strategy.md`, `measurement-plan.md`, `content-ops-checklist.md`

### 5) Brand and claims alignment
- File: `claims-matrix.md`
- Status: drafted
- Goal: keep public claims split into market-now, market-carefully, and future-state.
- Dependencies: `brand-connectivity-map.md`, `backend-contract-map.md`, `crm-product-map.md`

### 6) Backend and CRM proof mapping
- Files: `proof-map.md`, `claims-matrix.md`
- Status: drafted
- Goal: connect public claims to proof sources and identify unsupported surfaces.
- Dependencies: `backend-contract-map.md`, `crm-product-map.md`

### 7) Motion and asset decisions
- File: `asset-motion-plan.md`
- Status: drafted
- Goal: define media hierarchy, motion hierarchy, and mobile performance constraints.
- Dependencies: `asset-and-motion-system.md`, `home-page-sections.md`

### 8) Launch QA and measurement
- Files: `launch-qa-checklist.md`, `measurement-plan.md`
- Status: drafted
- Goal: define production readiness gates and analytics/reporting requirements.
- Dependencies: `content-ops-checklist.md`, `execution-pack.md`, `blog-growth-system.md`, `proof-map.md`, `claims-matrix.md`

---

## Anti-drift rules
- If a claim, route, or CTA depends on another file, link that dependency explicitly.
- If a file begins to describe future-state without proof, mark it and stop.
- If the source docs change, re-read them before editing the production plan.
- If a workstream cannot be completed from current repo evidence, mark it blocked and do not guess.

---

## Merge criteria
A workstream is merge-ready when:
- source basis is current
- current-state vs future-state is explicit
- dependencies are named
- no claim boundary is unresolved
- the file can be used by the implementation team without interpretation

## Next action
1. Verify any remaining implementation gaps against the proof map and claims matrix.
2. Use the launch QA checklist when the public pages are ready for final review.
3. Keep the workstream board aligned with source-backed changes.
