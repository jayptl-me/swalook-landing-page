# Swalook Landing Page Audit — Master Agent Todo

## Purpose
This file is the execution loop for the landing page audit and production-readiness work.

It exists to:
- keep one source of truth for the active iteration
- track progress across all audit docs
- force repeated review of current repo state before recommendations
- separate current-state, missing pieces, and future-state work
- prevent scope drift across homepage, pages, blog, motion, brand, CRM, and backend
- make merge readiness explicit before any new topic is started

---

## How to use this file
For each iteration:
1. Pick one audit document or topic.
2. Re-read the current source files first.
3. Update the relevant audit doc with only source-backed findings.
4. Record what exists, what is missing, what is weak, and what is future-state.
5. Add dependencies, risks, and next steps.
6. Mark the iteration complete here before moving to the next file.
7. If another doc becomes the dependency, stop and re-check that doc before continuing.

---

## Working rules
- One topic at a time.
- No invented routes, features, or claims.
- Use backend and CRM docs as truth sources.
- Keep marketing claims separated into:
  - market now
  - market carefully
  - future-state
- Every new recommendation must have a clear dependency or proof basis.
- If the repo changes, restart the relevant iteration instead of assuming old conclusions still hold.
- If a finding depends on another agent’s output, label it as such and do not promote it to a fact.
- Do not merge a topic until its source basis is current and its scope boundary is explicit.

---

## Iteration loop
Use this cycle for each doc:

### 1) Inspect
- Read the target doc.
- Read the related source files or supporting docs.
- Verify what changed since the last pass.

### 2) Diagnose
- What exists?
- What is missing?
- What is weak?
- What is future-state only?

### 3) Update
- Add missing sections or notes to the target doc.
- Keep recommendations tied to actual repo state.
- Add priority, dependencies, risks, and next steps.

### 4) Cross-check
- Does the doc agree with the master roadmap?
- Does it agree with backend truth?
- Does it agree with CRM truth?
- Does it create duplication or conflict with another audit doc?

### 5) Close
- Mark the iteration complete below.
- Move to the next file only if no dependency is open.

### 6) Recheck on drift
- If a repo change, user note, or upstream doc changes the topic, re-read the source files before continuing.
- If the current iteration depends on future-state assumptions, stop and label it incomplete.

---

## Current audit doc set
- `docs/landing-page-audit/master-roadmap.md`
- `docs/landing-page-audit/home-page-sections.md`
- `docs/landing-page-audit/page-system.md`
- `docs/landing-page-audit/blog-seo-geo-strategy.md`
- `docs/landing-page-audit/asset-and-motion-system.md`
- `docs/landing-page-audit/brand-connectivity-map.md`
- `docs/landing-page-audit/backend-contract-map.md`
- `docs/landing-page-audit/crm-product-map.md`
- `docs/landing-page-audit/execution-pack.md`
- `docs/landing-page-audit/agent-plan.md`

---

## Missing companion docs to add next
- None. Both companion docs now exist in `docs/landing-page-audit/` and are part of the current source set.

---

## Master checklist

### Phase 1 — Reconfirm current state
- [x] Read the existing landing page audit docs
- [x] Identify the current strengths of the plan
- [x] Identify the missing production-readiness pieces
- [x] Define the need for a master iteration file

### Phase 2 — Fill missing planning docs
- [x] Create content operations checklist
- [x] Create SEO measurement plan
- [ ] Add page-level launch requirements where missing
- [ ] Add QA and readiness gates where missing
- [ ] Add proof and claim mapping where missing

### Phase 3 — Keep the docs coherent
- [ ] Cross-check all docs against backend contract truth
- [ ] Cross-check all docs against CRM frontend truth
- [ ] Cross-check all docs against homepage and page hierarchy
- [ ] Cross-check all docs against blog and geo strategy
- [ ] Cross-check all docs against motion and asset strategy

### Phase 4 — Prepare production readiness
- [ ] Finalize homepage story arc
- [ ] Lock CTA architecture
- [ ] Define technical SEO rules
- [ ] Define accessibility requirements
- [ ] Define performance budgets
- [ ] Define launch QA gates
- [ ] Define analytics instrumentation requirements

---

## Per-doc iteration tracker

### master-roadmap.md
- [x] Current-state strengths captured
- [x] Missing production layer identified
- [ ] Add explicit launch readiness requirements
- [ ] Add exact proof and CTA requirements
- [ ] Confirm no unresolved dependency on other docs

### home-page-sections.md
- [x] Section-level narrative captured
- [x] Motion and asset direction identified
- [ ] Add exact proof-placement rules
- [ ] Add mobile-first CTA hierarchy
- [ ] Recheck against the homepage blueprint before merge

### page-system.md
- [x] Route hierarchy captured
- [x] CTA and connectivity rules captured
- [ ] Add index/noindex rules by page type
- [ ] Add page-template expectations
- [ ] Confirm route families do not overlap with feature-page system

### blog-seo-geo-strategy.md
- [x] Cluster and geo strategy captured
- [x] Technical SEO baseline captured
- [ ] Add content brief workflow
- [ ] Add refresh and pruning policy
- [ ] Confirm measurement plan covers all tracked page types

### asset-and-motion-system.md
- [x] Motion hierarchy captured
- [x] Asset hierarchy captured
- [ ] Add page-by-page asset inventory
- [ ] Add motion performance budget
- [ ] Confirm claims do not depend on unsupported proof visuals

### brand-connectivity-map.md
- [x] Brand narrative and claim boundaries captured
- [x] Safe-to-market framework captured
- [ ] Add glossary of preferred terms
- [ ] Add proof-to-claim mapping
- [ ] Recheck naming consistency against the master roadmap

### backend-contract-map.md
- [x] Backend capability inventory captured
- [x] Safe-to-market framework captured
- [ ] Add route family to page mapping detail
- [ ] Add claim risk notes by surface
- [ ] Confirm all public claims stay inside verified support

### crm-product-map.md
- [x] Frontend capability inventory captured
- [x] Public-site mapping captured
- [ ] Add proof-point candidates by page
- [ ] Add terminology alignment table
- [ ] Recheck against backend proof sources before merge

### execution-pack.md
- [x] High-level rollout guidance captured
- [x] Priority and rollout order captured
- [ ] Add launch checklist detail
- [ ] Add operational owner assignments
- [ ] Confirm rollout order still matches the page hierarchy plan

### agent-plan.md
- [x] Swarm workflow captured
- [x] Topic boundaries captured
- [x] Re-prompting protocol added
- [x] Completion criteria clarified
- [x] Local QA and evidence capture rules added
- [ ] Confirm output contract is used by all active agents

---

## Workstream board

### Active workstream
- Topic: Homepage route alignment and implementation verification
- Target doc: `swalook-landing-page/app/page.js`
- Owner: Sixth
- Source files reviewed: `swalook-landing-page/app/page.js`, `swalook-landing-page/app/layout.js`, `swalook-landing-page/components/AnimatedSection.js`, `swalook-landing-page/components/Navbar.js`, `swalook-landing-page/components/Footer.js`, `swalook-landing-page/app/Home.module.css`, `swalook-landing-page/app/book-demo/page.js`, `swalook-landing-page/app/free-trial/page.js`, `swalook-landing-page/app/contact/page.js`, `swalook-landing-page/app/about/page.js`, `swalook-landing-page/app/faq/page.js`, `swalook-landing-page/app/salon-crm-features/page.js`, `swalook-landing-page/app/salon-appointment-scheduling-software/page.js`, `swalook-landing-page/app/salon-dashboard-software/page.js`, `swalook-landing-page/app/salon-invoice-software/page.js`, `swalook-landing-page/app/salon-inventory-management-software/page.js`, `swalook-landing-page/app/salon-loyalty-program-software/page.js`, `swalook-landing-page/app/salon-staff-attendance-software/page.js`, `swalook-landing-page/app/salon-analytics-software/page.js`, `swalook-landing-page/app/salon-inquiry-management/page.js`, `swalook-landing-page/app/salon-marketing-templates/page.js`, `swalook-landing-page/app/mobile-app/page.js`, `swalook-landing-page/docs/landing-page-audit/master-roadmap.md`, `swalook-landing-page/docs/landing-page-audit/agent-plan.md`, `swalook-landing-page/docs/landing-page-audit/execution-pack.md`, `swalook-landing-page/docs/landing-page-audit/content-ops-checklist.md`, `swalook-landing-page/docs/landing-page-audit/page-system.md`, `swalook-landing-page/docs/landing-page-audit/home-page-sections.md`, `swalook-landing-page/docs/landing-page-audit/production-plan/claims-matrix.md`, `swalook-landing-page/docs/landing-page-audit/production-plan/proof-map.md`
- Dependency docs: `swalook-landing-page/docs/landing-page-audit/production-plan/launch-qa-checklist.md`, `swalook-landing-page/docs/landing-page-audit/production-plan/page-hierarchy.md`, `swalook-landing-page/docs/landing-page-audit/production-plan/homepage-blueprint.md`, `swalook-landing-page/docs/landing-page-audit/backend-contract-map.md`, `swalook-landing-page/docs/landing-page-audit/crm-product-map.md`, `swalook-landing-page/docs/landing-page-audit/brand-connectivity-map.md`, `swalook-landing-page/docs/landing-page-audit/content-ops-checklist.md`, `swalook-landing-page/docs/landing-page-audit/seo-measurement-plan.md`
- Current state: Homepage feature-card routing now points to real feature pages instead of only conversion routes; build passes under NVM Node 20.11.1; the homepage route ecosystem is source-aligned with the feature-page system and page hierarchy.
- Missing pieces: Full browser QA and screenshot capture were not rerun in this iteration; analytics wiring and any future claim/proof tightening remain separate workstreams.
- Future-state pieces: Any broader homepage copy refinement, motion changes, or proof expansion remains outside this routing fix.
- Risks: The repository still requires Node >= 20.9.0 for Next.js builds, so all future verification must continue to use the NVM runtime rather than the system Node.
- Next action: Re-run browser/mobile QA if the homepage visual design changes, then continue with the next source-backed implementation item.
- Merge status: Complete — routing fix, build verification, and tracker update are recorded.

### Ready-to-merge criteria
A workstream is ready to merge only when:
- source files have been re-read for the current iteration
- current-state vs future-state is explicit
- dependencies are named
- claim boundaries are source-backed
- no open cross-doc conflict remains
- the target doc has a clear next handoff or closed status

### Merge gate
Do not start the next workstream until the current workstream has either:
- been merged into the master roadmap, or
- been marked blocked with a concrete dependency.

---

## Completion note
- Iteration finished: Homepage hero mismatch fixed in `swalook-landing-page/app/page.js`
- Iteration finished: FAQ claims were tightened in `swalook-landing-page/app/faq/page.js` to stay within the claims matrix and proof map
- Remaining open items: None for this iteration; future visual edits should re-run the same NVM + screenshot flow
- Follow-up doc: `swalook-landing-page/docs/landing-page-audit/launch-qa-checklist.md`
- Status: Code update complete; build passed under NVM Node 20.11.1

## Final instruction to the swarm
The goal is not just to document the site. The goal is to keep every iteration source-backed, scope-bounded, and mergeable without drift.
