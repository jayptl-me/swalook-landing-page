# Content Ops Checklist

> Status: execution checklist  
> Purpose: give the swarm and the content team a repeatable operating loop for publishing, refreshing, linking, and retiring landing-page and blog content without scope drift.

## Why this exists
The audit docs define the system. This file defines the repeatable actions that keep the system healthy over time.

It is the operational handoff for:
- homepage copy updates
- feature-page updates
- blog publishing
- blog refreshes
- internal-link maintenance
- claim verification
- CTA consistency
- page retirement / consolidation decisions

---

## Operating rules

- One page, one primary intent.
- Every page must have a clear role in the funnel.
- Every public claim must map to source-backed proof or a documented future-state label.
- Every blog post must point toward at least one money page.
- Every money page must point toward a conversion route.
- Every refresh must preserve current-state vs future-state separation.
- If the repo changes, re-read the source docs before updating content decisions.

---

## Content workflow

### 1) Plan
Before writing or editing, confirm:
- target page type
- target intent
- target cluster or route family
- primary CTA
- supporting proof
- related pages to link
- claim boundary

### 2) Draft
During drafting:
- keep one page focused on one job
- use approved terminology only
- avoid introducing unsupported metrics, features, or outcomes
- keep the CTA aligned to the page role

### 3) Review
Before publishing:
- check source-backed claims
- check internal links
- check metadata
- check mobile readability
- check CTA hierarchy
- check page role against the page system
- check whether the page overlaps another page’s intent

### 4) Publish
Before release:
- confirm the page is reachable
- confirm canonical is correct
- confirm the page is included in the right hub or navigation path
- confirm analytics and measurement hooks exist if the page is meant to be tracked

### 5) Refresh
On a scheduled cadence:
- update stale claims
- update proof references
- update internal links
- update CTA targets if funnel priorities change
- merge or retire thin overlapping content
- re-check whether the page is still current-state or now future-state

---

## Page-type checklist

### Homepage
- [ ] Confirm the hero matches the current top-line value proposition
- [ ] Confirm the section order matches the homepage blueprint
- [ ] Confirm CTA labels are consistent with the funnel
- [ ] Confirm proof blocks are source-backed
- [ ] Confirm mobile layout preserves the primary CTA above the fold
- [ ] Confirm no future-state claims are presented as current-state facts

### Feature page
- [ ] Confirm one feature per page
- [ ] Confirm the page uses the canonical feature-page template
- [ ] Confirm the proof block maps to an actual product surface
- [ ] Confirm related feature links are present
- [ ] Confirm the primary CTA routes to the correct conversion page
- [ ] Confirm the page does not duplicate another feature page’s intent

### Blog post
- [ ] Confirm one primary query family
- [ ] Confirm one primary money-page target
- [ ] Confirm one related supporting page target
- [ ] Confirm FAQ is used only when it adds value
- [ ] Confirm schema matches visible content
- [ ] Confirm the article is part of a cluster, not a standalone dead end

### About / FAQ / trust page
- [ ] Confirm the page reduces friction rather than introducing new claims
- [ ] Confirm the content supports a conversion path
- [ ] Confirm the page does not out-rank the main money pages for the same intent
- [ ] Confirm the wording is consistent with the brand narrative

### Contact / demo / trial page
- [ ] Confirm the form or action matches the actual funnel
- [ ] Confirm the page is short and low-friction
- [ ] Confirm the value proposition is concise and reassurance-driven
- [ ] Confirm the page is linked from all high-intent routes

---

## Refresh checklist

Use this when updating an existing page.

### Always check
- [ ] Has the source truth changed?
- [ ] Has the CTA hierarchy changed?
- [ ] Has the page system changed?
- [ ] Has the claim boundary changed?
- [ ] Has the page intent changed?
- [ ] Has the related proof changed?
- [ ] Has the page become redundant or overlapping?

### If the page is a blog post
- [ ] Check ranking drift
- [ ] Check CTR drift
- [ ] Check internal-link health
- [ ] Check whether the page still points to the correct money page
- [ ] Check whether the page should be expanded, merged, or retired

### If the page is a feature or money page
- [ ] Check whether the copy still reflects current product truth
- [ ] Check whether proof assets are current
- [ ] Check whether adjacent feature pages changed
- [ ] Check whether the CTA destination still matches funnel priorities

---

## Internal-link maintenance checklist

- [ ] Every blog post links to one money page
- [ ] Every blog post links to one related article
- [ ] Every money page links to the demo / trial / contact path
- [ ] Every trust page links back to the appropriate commercial route
- [ ] No page should become a dead end unless it is legal or policy content
- [ ] Anchor text should describe the destination clearly
- [ ] Do not overuse the same anchor text on the same page

---

## Claims and proof checklist

Before shipping or editing public copy:
- [ ] Confirm the claim is market-now, market-carefully, or future-state
- [ ] Confirm the claim maps to a source-backed proof source
- [ ] Confirm the wording is not stronger than the evidence
- [ ] Confirm any metric has a current and approved source
- [ ] Confirm any screenshot or UI reference is real and current
- [ ] Confirm any future-state reference is labeled as such

---

## Operating cadence

### Weekly
- [ ] Review new or edited pages
- [ ] Check for content drift
- [ ] Check for broken internal links
- [ ] Check for claim mismatches

### Monthly
- [ ] Review top-performing pages
- [ ] Refresh weak or outdated content
- [ ] Consolidate overlapping content
- [ ] Update proof references and related links

### Quarterly
- [ ] Review the entire content map
- [ ] Re-rank content priorities
- [ ] Revisit page-role boundaries
- [ ] Retire or rewrite pages that no longer fit the system

---

## Handoff rules for agents
When a swarm agent finishes a content task, it must leave behind:
- target page
- source files reviewed
- current-state summary
- missing pieces
- claim boundary notes
- link updates required
- next refresh recommendation

If any of those are missing, the content task is not complete.

---

## Completion criteria
This file is complete when:
- the checklist can be used directly by the content team
- blog and page updates are repeatable
- claims stay source-backed
- refresh decisions are routine instead of ad hoc
- the checklist can be used by multiple agents without drift
