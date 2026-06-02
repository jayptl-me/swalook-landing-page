# Blog Growth System

Source-backed production plan for the blog/geo content program. This file focuses on strategy, page architecture, internal-linking rules, schema/canonical guidance, content cluster structure, and refresh workflow.

Measurement requirements are split into `measurement-plan.md` so this file stays implementation-oriented and easier to execute.

## 1) Purpose

The blog should do three jobs:

1. Capture non-brand search demand around service, solution, and local intent.
2. Support the landing page system with internal links that move users into money pages.
3. Build a repeatable publishing and refresh workflow so content remains accurate, current, and measurable.

## 2) Operating principles

- **Search intent first:** every post must map to one primary query family and one conversion path.
- **One page, one job:** avoid mixing informational, transactional, and geo intent on the same URL unless the page system explicitly defines that format.
- **Support the page hierarchy:** blog content should reinforce the existing landing-page structure, not compete with it.
- **Use real proof only:** claims must be traceable to approved proof assets, product facts, or published service details.
- **Prefer updating over churning:** refresh high-value posts before producing new near-duplicates.
- **Geo content must be specific:** location pages and local-use cases should reflect actual service coverage and should not create thin city-page variants.

## 3) Content cluster structure

Use a cluster model with one hub and multiple supporting posts.

### 3.1 Core cluster types

| Cluster type | Purpose | Example content shape |
|---|---|---|
| Service cluster | Explain the service category and route to the main service page | “What is X?”, “How X works”, “X pricing factors” |
| Problem cluster | Capture pain-point searches and route to solution pages | “Why [problem] happens”, “How to fix [problem]” |
| Comparison cluster | Capture evaluation intent and support conversion | “X vs Y”, “Best X for [use case]” |
| Geo cluster | Capture city/region demand and route to local landing pages | “X in [city]”, “How [city] businesses use X” |
| Proof cluster | Expand credibility with case-style evidence and source-backed examples | “Results from [use case]”, “Process breakdown” |
| FAQ cluster | Capture short-form questions and support schema-ready answers | “How long does X take?”, “Is X worth it?” |

### 3.2 Cluster hierarchy

- **Hub page:** a stable, evergreen guide that owns the primary topic.
- **Support pages:** focused articles that answer one sub-question each.
- **Geo pages:** only when there is a real local service angle or coverage requirement.
- **Conversion bridge pages:** posts that move users from education into service pages.

### 3.3 Canonical cluster rules

- One canonical URL per topic.
- Do not publish multiple articles targeting the same intent with only minor wording changes.
- If a refreshed article fully replaces an older URL, point the old page to the new canonical or 301 it based on the site’s URL policy.
- Do not canonicalize geo pages to a generic blog post if the page has unique local value.

## 4) Internal-linking rules

Internal linking is a system, not an afterthought.

### 4.1 Link targets

Every blog post should link to:

- 1 primary money page
- 1 related hub page
- 2–4 supporting articles or proof pages
- 1 relevant geo page when the topic has local intent

### 4.2 Link placement

- Place the primary conversion link near the top when it matches intent.
- Add contextual links in the body where the related concept is explained.
- End with a clear next step that routes to the most relevant landing page.

### 4.3 Anchor text rules

- Use descriptive anchors that match the target page intent.
- Avoid repeated exact-match anchor text across every post.
- Vary anchors naturally: service name, use-case phrase, problem phrase, geo phrase.
- Do not use generic anchors like “click here” or “learn more” unless the surrounding context is fully clear.

### 4.4 Link hygiene

- No orphan posts.
- No link loops between thin articles.
- Limit each post to links that are genuinely useful to the reader.
- Audit internal links whenever a hub page, geo page, or service page changes URL or positioning.

## 5) Blog SEO and geo guidance

### 5.1 Topic selection

Prioritize topics in this order:

1. Service revenue support
2. High-intent problem/solution queries
3. Geo demand with clear service fit
4. Comparison and evaluation queries
5. Broad informational topics only when they support the cluster

### 5.2 Geo content rules

- Use geo content only where the business can actually serve that market.
- Each geo page or geo post must include:
  - clear service relevance
  - local context or use-case relevance
  - internally linked route to the matching location or service page
- Avoid city-name spinning or templated local posts without unique value.
- When multiple cities share the same intent, use one strong regional page pattern rather than many weak duplicates.

### 5.3 SERP intent alignment

- Match title, H1, intro, and CTA to the dominant query intent.
- Use FAQ sections when the search result pattern suggests short question intent.
- Use comparison tables when evaluation intent is high.
- Use concrete examples and process detail when informational intent is the primary goal.

## 6) Schema guidance

Schema should reflect page purpose and existing site architecture.

### 6.1 Default blog schema

Use article-level schema that matches the content format:

- `Article` or `BlogPosting` for standard posts
- `FAQPage` only when the page contains real, visible FAQ content
- `BreadcrumbList` on all indexable blog pages
- `Organization` and `WebSite` at the site level if already part of the broader system

### 6.2 When to use additional schema

- `LocalBusiness` or service-related schema only on pages where the page actually represents a local or service entity.
- `ItemList` for hub or roundup pages when the page structure is a list of related resources.
- Do not add schema that overstates the page purpose.

### 6.3 Schema rules

- Schema must mirror visible content.
- Do not include fake reviews, fabricated ratings, or unsupported claims.
- Keep canonical URL, headline, and publication metadata aligned across markup and page content.
- If content is refreshed materially, update the schema date fields to match the current state.

## 7) Canonical and URL rules

- One public indexable URL per article.
- Keep URLs short, readable, and stable.
- Avoid changing slugs unless the content strategy changes materially.
- If a post is a near-duplicate, consolidate instead of publishing both.
- Use canonical tags for:
  - print-like variants
  - filtered duplicates
  - content migrated to a new URL
- Do not canonicalize distinct geo pages together if they serve different local intent.

## 8) Publication workflow

### 8.1 Before drafting

- Confirm the target cluster and primary intent.
- Verify the target money page and internal link destinations.
- Check whether a geo angle is real and serviceable.
- Confirm proof assets or source material exist for any claims.

### 8.2 Drafting checklist

- One primary keyword family
- One primary CTA
- Clear title and meta description
- Intro that establishes intent quickly
- Body sections that answer the user question in order
- Internal links placed intentionally
- Visible FAQ only if warranted
- Schema matched to the page type

### 8.3 Pre-publish QA

- Check duplicate intent against existing posts.
- Check links to hub, money, and geo pages.
- Check canonical, title, headings, and schema alignment.
- Check that all claims are source-backed.
- Confirm the article is assignable to a refresh cycle.

## 9) Refresh workflow

Refreshes should be scheduled, not ad hoc.

### 9.1 Refresh triggers

Refresh a post when any of the following is true:

- traffic or rankings decline
- SERP intent shifts
- a linked service page changes
- product/service positioning changes
- proof assets or examples become outdated
- the content no longer reflects current best practice

### 9.2 Refresh levels

| Level | What changes | When to use |
|---|---|---|
| Light refresh | update stats, links, title/meta, small copy fixes | minor drift |
| Standard refresh | reorder sections, add new examples, improve CTA, update schema | moderate performance decay |
| Full rewrite | intent changed, page is outdated, or the topic is now better served by a new structure | major decay or mismatch |

### 9.3 Refresh sequence

1. Review measurement data in `measurement-plan.md`.
2. Compare current content against current search intent.
3. Update links to any moved or newly prioritized pages.
4. Expand or trim sections based on current query demand.
5. Revalidate schema and canonical.
6. Re-publish and log the refresh date.

## 10) Governance

- Content strategy changes must not conflict with the page hierarchy or proof asset rules.
- New blog topics should be reviewed against the existing cluster map before production.
- Any page that becomes a top traffic or conversion driver should be treated as a maintained asset, not a one-off article.

## 11) Split note

This file defines the growth system and execution rules.

For KPI definitions, event tracking, reporting cadence, and measurement workflow, use `measurement-plan.md`.