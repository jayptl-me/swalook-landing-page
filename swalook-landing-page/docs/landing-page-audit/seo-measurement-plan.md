# SEO Measurement Plan

## Purpose
Define how the Swalook landing-page and blog system should be measured so content, page hierarchy, and internal-link decisions can be iterated from data instead of assumptions.

This file is the audit-layer measurement bridge between:
- `blog-seo-geo-strategy.md`
- `content-ops-checklist.md`
- `execution-pack.md`
- `production-plan/measurement-plan.md`

## What this plan covers
- organic visibility
- content cluster performance
- money-page routing from blog content
- page-type reporting
- refresh and consolidation signals
- CTA click behavior from SEO entry points

## What this plan does not cover
- paid media attribution
- external campaign tooling
- channel mix beyond organic search and on-site conversion behavior
- business outcome guarantees

---

## Measurement principles
- Measure by page, cluster, and program.
- Use stable naming for page types and cluster groups.
- Keep current-state and future-state separate in reporting.
- If a page cannot be measured, do not treat it as a stable growth asset.
- Measurement should support content decisions, not replace them.

---

## Required reporting views

### 1) Page-level view
Track each indexable page with:
- URL
- page type
- cluster name
- primary intent
- target money page
- target geo page, if applicable
- publish date
- refresh date
- impressions
- clicks
- click-through rate
- average position
- engagement rate
- internal-link clicks
- conversion clicks, if tracked

### 2) Cluster-level view
Track each cluster with:
- total indexable URLs
- total impressions
- total clicks
- top URL
- weakest URL
- internal-link coverage
- consolidation candidates
- refresh candidates

### 3) Program-level view
Track the whole SEO program with:
- new pages published
- pages refreshed
- pages consolidated or retired
- organic traffic trend
- CTR trend
- internal-link coverage trend
- CTA click trend from organic entry pages

---

## KPI rules
Use these signals to choose one action at a time:

| Signal | Interpretation | Next action |
|---|---|---|
| High impressions, low CTR | Message mismatch | Improve title/meta and SERP alignment |
| Traffic without money-page clicks | Weak routing | Strengthen internal links and CTA placement |
| Declining position after refresh | Intent mismatch or weak depth | Reassess structure and query fit |
| Overlapping pages ranking for same intent | Cannibalization | Consolidate or redirect |
| Strong organic clicks, weak engagement | Content quality issue | Expand or tighten content |
| Strong engagement, weak conversion clicks | Funnel issue | Improve routing to money pages |

---

## Event tracking requirements
Track organic-entry behavior for:
- hero CTA clicks
- feature-card clicks
- blog-card clicks
- related-post clicks
- money-page clicks
- demo CTA clicks
- trial CTA clicks
- contact CTA clicks
- FAQ interactions
- scroll milestones

If an event is not wired, do not claim that the page is fully measurable.

---

## Governance rules
- One primary intent per page.
- One primary money page per blog article.
- One cluster per topic family.
- One canonical page per intent.
- Refresh before rewriting when the page is still useful.
- Consolidate when two pages compete for the same intent.

---

## Relationship to production-plan measurement
Use `production-plan/measurement-plan.md` for the more detailed page/cluster reporting model and operational cadence.

Use this file for:
- measurement intent
- KPI logic
- event requirements
- reporting expectations
- decision rules for iteration

---

## Completion criteria
This plan is complete when:
- the SEO program can be measured by page and cluster
- organic routing into money pages is visible
- refresh decisions are data-backed
- reporting supports iteration without guesswork
