# Swalook Execution Pack

## Purpose
This file converts the audit and planning set into a practical rollout sequence for the Swalook landing page, blog, motion system, CRM-proof story, and backend-backed claims.

The goal is to keep the site:
- fully in-repo for implementation
- aligned with CRM and backend truth
- ready for launch without external growth tooling
- clear about what ships now, what needs proof, and what stays future-state

---

## 1) Claims matrix

This is the main guardrail for copy, pages, and blog content.

### Market now
These claims are already supported by the landing page narrative, CRM shell, and backend route surface:
- salon CRM and management
- appointment scheduling
- dashboard and analytics
- billing and invoices
- inventory management
- staff and attendance
- loyalty and repeat-customer workflows
- inquiry and lead management
- branch visibility
- export and PDF workflows
- role-based access and admin control
- mobile app positioning as a product extension

### Market carefully
These should only be used if the exact workflow is confirmed in the frontend or backend proof:
- advanced automation depth
- omnichannel messaging claims
- AI-assisted claims
- real-time features beyond shell support
- deep multi-branch intelligence
- customer-facing mobile booking claims
- enterprise positioning

### Future-state
These can be planned, but should be clearly labeled as not yet fully productized:
- comparison pages against competitors
- city-specific landing page network
- dedicated walkthrough/demo media
- case studies with measurable outcomes
- content automation workflows
- richer proof visuals where screenshots do not yet exist

### Copy rule
If a claim cannot be mapped to:
1. a backend route family,
2. a CRM shell page or workflow,
3. or a documented future-state label,

then it should not be treated as a public promise.

---

## 2) SEO measurement plan

The blog and landing page strategy should be measurable from inside this stack, with no dependence on ads or external campaign tools.

### Required tools
- Google Analytics 4
- Google Search Console
- Google Tag Manager
- Looker Studio
- first-party event logging
- server-side logging where available

### Core KPIs
- organic sessions
- impressions
- clicks
- click-through rate
- average position
- assisted conversions
- CTA click-through rate
- form submit rate
- demo bookings
- trial starts
- contact completions
- scroll depth
- returning organic users

### Events to track
- hero CTA click
- feature card click
- blog card click
- related post click
- money page click
- demo CTA click
- trial CTA click
- contact CTA click
- FAQ expansion
- phone / WhatsApp click
- form start
- form submit
- scroll milestone

### Reporting views
Build reporting around:
- page type performance
- cluster performance
- conversion path by source page
- top CTA drivers
- query-to-page mismatch
- decay and refresh opportunities
- internal-link assisted conversions

### Measurement rule
If a page is not measurable, it is not ready to be treated as a stable growth asset.

---

## 3) Content operations checklist

This is the repeatable operating cadence for blog and page maintenance.

### Publishing checklist
- choose one search intent per page
- assign the page to one cluster
- confirm the page links to one money page
- confirm the page links to one related article
- confirm the CTA path is clear
- confirm metadata is unique
- confirm canonical is correct
- confirm schema is present where needed
- confirm media and alt text are appropriate
- confirm the page is reachable from navigation or an index page

### Refresh checklist
- review top pages every month
- check for ranking decay
- update internal links when new pages publish
- refresh sections when product claims change
- update FAQs when objections change
- improve title and description when CTR is weak
- prune or merge weak overlapping content
- add supporting proof when available

### Internal-linking checklist
- every blog post links to one money page
- every blog post links to one related post
- every money page links to demo or trial
- every major page has at least three useful internal links
- anchor text should describe the destination clearly
- avoid duplicate anchors to the same destination on the same page

### Review cadence
- weekly: new content quality check
- monthly: refresh and link audit
- quarterly: cluster and page hierarchy review

---

## 4) Implementation backlog

This is the priority order for the next rollout phase. It stays inside the codebase and focuses on what makes the site actually launch-ready.

### P0 — Must complete first
1. finalize the homepage story arc
2. standardize CTA destinations and labels
3. keep feature pages consistent with the shared template
4. ensure blog posts have a clear cluster and money-page path
5. keep claims aligned to backend and CRM proof
6. make the audit docs the source for copy decisions
7. keep motion restrained and performance-safe
8. keep image usage purposeful and not decorative only

### P1 — Next layer
1. add the claims matrix to writing workflow
2. add SEO measurement events and reporting definitions
3. create content refresh rules for the blog
4. tighten the page hierarchy and route priorities
5. add stronger proof blocks where screenshots or UI evidence exist
6. define a single glossary for product terms
7. plan future-state pages without confusing them with current products

### P2 — Later, when ready
1. compare pages
2. city pages
3. case studies
4. richer visual assets
5. more detailed FAQ schema and support content
6. optional hero-level motion if it materially helps clarity

---

## 5) Page-by-page rollout priority

### Homepage
Priority:
- highest

Goal:
- make the value proposition immediate and clear
- route users into feature pages and conversion actions
- support the brand story without overloading the page

### Feature hub and feature pages
Priority:
- highest

Goal:
- make the product surface understandable
- keep each feature page specific and credible
- route users to demo or trial

### Blog
Priority:
- high

Goal:
- create an SEO acquisition engine
- keep each post mapped to one intent
- send traffic to money pages

### FAQ
Priority:
- medium-high

Goal:
- reduce objections
- support long-tail SEO
- keep users moving toward conversion

### About
Priority:
- medium

Goal:
- strengthen trust
- support brand narrative
- avoid feeling like a dead-end page

### Mobile app page
Priority:
- medium

Goal:
- reinforce product breadth
- support CRM utility story
- keep claims matched to proof

### Legal pages
Priority:
- required but low growth priority

Goal:
- maintain trust and compliance

---

## 6) File ownership map

This is the practical meaning of each audit file.

| File | Role | Primary use |
|---|---|---|
| `master-roadmap.md` | top-level strategy | overall direction and prioritization |
| `home-page-sections.md` | homepage audit | section order, CTA logic, visuals |
| `page-system.md` | route hierarchy | page roles and internal connectivity |
| `blog-seo-geo-strategy.md` | blog engine | SEO, geo, schema, internal links, tracking |
| `asset-and-motion-system.md` | motion and media | animation layers, image policy, performance |
| `brand-connectivity-map.md` | brand story | messaging consistency and claims boundaries |
| `backend-contract-map.md` | backend truth | what is safe to market now |
| `crm-product-map.md` | CRM proof | frontend product alignment |
| `agent-plan.md` | workflow orchestration | how to run the swarm safely |
| `execution-pack.md` | rollout pack | what to do next in order |

---

## 7) What must stay in-repo

The implementation should remain inside this codebase.

Allowed external dependencies:
- environment variables
- API keys
- runtime secrets

Not part of the plan unless already present in the repo:
- paid ads
- external campaign managers
- third-party marketing automation platforms
- external distribution tooling just to make the site feel complete

If a feature needs an external key or env var, document it clearly and keep the integration minimal.

---

## 8) Completion definition

This work is ready to move forward when:
- the claims matrix is respected in every page and blog update
- the blog has measurable events and reporting
- the page hierarchy is stable
- the homepage follows a clear story arc
- feature pages remain consistent
- motion stays lightweight
- asset usage is intentional
- CRM and backend truth define public copy
- the site can be launched without relying on external marketing infrastructure

---

## 9) Recommended next action order

1. use this execution pack as the operational guide
2. keep the audit docs as the source of truth for planning
3. apply the claims matrix to copy and page decisions
4. implement the page hierarchy and homepage adjustments next
5. add measurement and content ops definitions before expanding blog volume
6. only then consider future-state pages and richer visuals

---

## Final note
Swalook should feel like one product, one brand, and one system. The docs are now aligned to that goal; this file gives the next stage a practical order of execution.
