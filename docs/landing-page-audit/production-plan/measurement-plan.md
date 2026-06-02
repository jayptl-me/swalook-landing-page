# Measurement Plan for Blog Growth System

This file contains the measurement layer for the blog SEO/geo program referenced by `blog-growth-system.md`.

It is intentionally separate from the strategy file so the operating rules stay readable while the reporting and instrumentation rules remain easy to update.

## 1) Measurement goals

Measure whether the blog system is doing three things:

1. Driving qualified organic visits.
2. Supporting movement to money pages and geo pages.
3. Surfacing content that should be refreshed, consolidated, or expanded.

## 2) Core metrics

Track these metrics at the page, cluster, and program level.

| Metric | Why it matters | Primary use |
|---|---|---|
| Organic sessions | Shows top-of-funnel reach | Traffic trend monitoring |
| Impressions | Shows search visibility | Topic demand and ranking opportunity |
| Click-through rate | Shows SERP message alignment | Title/meta optimization |
| Average position | Shows ranking movement | Priority setting |
| Engaged sessions / engagement rate | Indicates content quality | Content usefulness check |
| Internal link clicks to money pages | Shows conversion support | Blog-to-landing-page effectiveness |
| Internal link clicks to geo pages | Shows location routing | Geo funnel performance |
| Assisted conversions | Shows downstream value | Content contribution to pipeline |
| Scroll depth or time on page | Indicates content consumption | UX and content depth review |
| Refresh impact | Shows whether updates help | Refresh ROI review |

## 3) Required reporting views

### 3.1 Page-level view

For each indexable blog URL, track:

- publication date
- last refreshed date
- cluster type
- primary query family
- target money page
- target geo page, if any
- impressions
- clicks
- CTR
- average position
- organic sessions
- engagement rate
- internal link clickthrough
- assisted conversions, if available

### 3.2 Cluster-level view

For each content cluster, track:

- total indexable URLs
- total organic clicks
- total impressions
- top performing URL
- weakest URL
- links to money pages
- links to geo pages
- refresh candidates
- consolidation candidates

### 3.3 Program-level view

Track monthly:

- new posts published
- posts refreshed
- posts consolidated or retired
- organic traffic change
- click-through rate change
- number of posts with internal link coverage
- number of posts assigned to an active refresh cycle

## 4) Measurement requirements by content type

| Content type | Must measure | Notes |
|---|---|---|
| Service cluster post | organic clicks, CTR, money-page clicks, assisted conversions | Primary goal is revenue support |
| Problem cluster post | impressions, engagement, money-page clicks | Primary goal is discovery plus route-to-solution |
| Comparison post | CTR, average position, conversion clicks | Often sensitive to title/meta quality |
| Geo post | clicks, geo-page clicks, local engagement | Must prove local routing value |
| Proof or case-style post | assisted conversions, internal link clicks | Should validate trust-building impact |
| FAQ post | impressions, CTR, engagement | Short-form utility and SERP capture |

## 5) Event and tagging guidance

Use consistent tagging so reporting stays stable.

### 5.1 Minimum page metadata

Every tracked blog page should have:

- page type
- cluster name
- target intent
- target service or geo destination
- publish date
- refresh date
- canonical URL

### 5.2 Internal link event tracking

Track clicks on:

- links to service pages
- links to geo pages
- links to hub pages
- links to proof assets or related articles

### 5.3 Refresh tracking

Log each refresh with:

- date
- refresh level: light, standard, or full rewrite
- reason for refresh
- sections changed
- links updated
- schema/canonical changes
- outcome after 30/60/90 days

## 6) KPI thresholds and action logic

Use trend-based decisions rather than single data points.

| Signal | Action |
|---|---|
| High impressions, low CTR | improve title/meta and SERP alignment |
| Good traffic, low money-page clicks | strengthen internal links and CTA placement |
| Declining position after refresh | reassess intent match and page depth |
| Strong geo traffic, weak local routing | improve geo-specific links and local relevance |
| Low traffic, overlapping intent | consolidate or redirect |
| Strong assisted conversions | protect page, expand related cluster support |

## 7) Review cadence

### Weekly
- identify pages with sharp traffic or CTR changes
- check for broken or missing internal links on active posts
- note SERP changes for top priority topics

### Monthly
- review cluster and page performance
- select refresh candidates
- identify consolidation opportunities
- confirm top posts still point to the correct money and geo pages

### Quarterly
- review the entire content map
- retire or merge low-value duplicates
- re-balance the cluster mix
- update benchmark assumptions based on observed performance

## 8) Refresh decision rules

A post should be considered for refresh when:

- it loses traffic or position over a meaningful period
- the target service page changes
- a new proof asset or product detail should be reflected
- competing pages in the same cluster cannibalize each other
- the page is still relevant but no longer current

A post should be considered for consolidation when:

- two pages target the same intent
- neither page has enough unique value
- internal link equity is being diluted
- search intent now favors one stronger canonical page

## 9) Measurement-to-action workflow

1. Pull page and cluster metrics.
2. Mark pages with rising, flat, or declining performance.
3. Identify whether the issue is visibility, click-through, engagement, or routing.
4. Choose one action:
   - title/meta update
   - internal-link update
   - content expansion
   - consolidation
   - full rewrite
5. Re-measure after the next review window.

## 10) Ownership

The measurement layer should be owned by the content/SEO operator responsible for the blog system and reviewed alongside the landing-page and geo page program.

## 11) Split note

This file contains measurement requirements only.

For content strategy, internal-linking rules, schema/canonical guidance, and refresh workflow structure, use `blog-growth-system.md`.