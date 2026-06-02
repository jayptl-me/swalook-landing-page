# Swalook Landing Page Audit + Roadmap

## Executive summary

Swalook already has the bones of a strong SEO product ecosystem:
- a conversion-focused homepage,
- a reusable feature-page system,
- a blog index and a small set of educational posts,
- utility pages for demo/trial/contact,
- and a backend with a broad contract surface that can support stronger product claims.

The current gap is not lack of pages. The gap is **system coherence**:
- the homepage, feature pages, and blog posts are written as related pages, but not yet as one connected acquisition engine,
- the blog is too small and too generic to support a serious SEO growth loop,
- the geographic strategy is implied in metadata but not fully operationalized,
- motion exists, but it is not yet documented as a performance-aware system,
- and the visual/asset strategy is fragmented across page types.

This roadmap treats the whole site as one brand system with three layers:
1. **Acquisition** — landing pages, feature pages, city pages, comparison pages, blog posts
2. **Conversion** — demo, trial, contact, FAQ, footer CTAs
3. **Trust / retention** — product proof, CRM alignment, backend-backed claims, social proof, policy pages

## Current-state audit

### 1) Site architecture
Observed surface in `swalook-landing-page`:
- Homepage
- About
- Blog index
- Blog posts
- CRM feature hub
- Individual feature pages
- Mobile app page
- FAQ
- Demo / trial / contact
- Legal pages

What works:
- The site already has a route architecture that can support SEO landing pages.
- There is a single reusable page hero and a reusable feature page template.
- CTA patterns are consistent enough to standardize.
- Blog and feature pages already use internal navigation concepts.

What is missing:
- No formal content model for page clusters.
- No canonical linking strategy documented.
- No page hierarchy map for what should rank vs what should convert.
- No explicit separation between money pages, educational pages, and brand pages.

### 2) Design and motion
Observed:
- `framer-motion` is used for section reveals and staggered cards.
- Hero and feature pages use animated sections but no hero-specific motion system.
- The homepage has the most motion; supporting pages are lighter.

What works:
- Motion is already limited to simple reveal patterns.
- The code is maintainable and not over-engineered.

What is missing:
- No documented motion hierarchy.
- No decision framework for when to use micro-interactions vs section motion vs hero motion.
- No guidance on when 3D is justified.
- No mobile performance policy.

### 3) Assets and imagery
Observed:
- Homepage and several pages already reference `/images/*` assets.
- Some are likely placeholders or missing from the current repo surface.
- Many sections rely on text and icons only.

What works:
- Existing image slots are already mapped to specific sections.
- The content structure is ready for a controlled image strategy.

What is missing:
- No asset inventory.
- No reuse policy.
- No generation policy.
- No alt-text framework.
- No exact placement guidance by page/section.

### 4) Blog system
Observed:
- Blog index supports category filtering.
- Blog posts are currently a small set of hard-coded, mostly educational articles.
- Blog post layout includes sidebar, related posts, and CTA.
- The blog is discoverable, but not yet a scalable SEO engine.

What works:
- Blog has the right structural pieces.
- Related-post linking is already partially present.
- The site can support a topic cluster model without major rework.

What is missing:
- Keyword/topic cluster strategy.
- Geo-targeting strategy.
- Content refresh rules.
- Schema, canonical, RSS, and sitemap rules for the blog.
- A stronger internal-linking plan from blog to money pages.

### 5) Brand and product alignment
Observed:
- Landing page positioning: “Revenue Generation Engine For The Beauty Industry.”
- CRM/backend surfaces expose a broad operational feature set.
- Some copy leans aspirational, but the product surface needs to govern what is marketed now.

What works:
- The product is already positioned around retention, marketing, appointments, billing, operations, and multi-branch visibility.
- This aligns well with a premium SaaS/CRM growth narrative.

What is missing:
- A contract-backed claims inventory.
- A “safe to market now vs future state” distinction.
- A single brand narrative map across landing page, blog, CRM, and backend.

## Recommended page hierarchy

### Primary conversion pages
These should be treated as the highest-value routes:
- `/`
- `/salon-crm-features`
- `/book-demo`
- `/free-trial`
- `/contact`

### Primary SEO money pages
These should be the main search intent pages:
- `/salon-crm-features`
- `/salon-appointment-scheduling-software`
- `/salon-dashboard-software`
- `/salon-analytics-software`
- `/salon-invoice-software`
- `/salon-inventory-management-software`
- `/salon-loyalty-program-software`
- `/salon-marketing-templates`
- `/salon-expense-management-software`
- `/salon-staff-attendance-software`
- `/salon-inquiry-management`
- `/mobile-app`

### Educational / trust pages
- `/blogs`
- blog post routes
- `/about`
- `/faq`
- policies

### Future growth pages
- city/location pages
- comparison pages
- pricing page
- product walkthrough/demo page
- use-case pages by salon type or business size

## Section hierarchy

### Homepage section stack
Recommended narrative order:
1. Hero
2. About / core positioning
3. Feature groups
4. What Swalook helps you do
5. Why Swalook
6. Retention / reactivation
7. No-show reduction
8. Audience/use-case segmentation
9. CTA
10. FAQ

This is already close to the current structure. The recommendation is to tighten the story:
- start with value,
- move into proof,
- then into operational feature depth,
- then into conversion.

### Feature page stack
Recommended section order:
1. Hero
2. Why this feature matters
3. Key capabilities
4. Comparison / differentiation
5. What users can do with Swalook
6. Other feature navigation
7. CTA
8. FAQ if needed

Current `FeaturePage` is a good base. It should become the canonical pattern for all feature pages.

### Blog post stack
Recommended section order:
1. Breadcrumb
2. H1
3. Intro that frames the problem
4. Core article body
5. Inline CTA after early value delivery
6. Related blog links
7. Money-page links
8. FAQ block where relevant
9. Final CTA
10. Schema

## Animation hierarchy

### Level 1 — Micro-interactions
Use for:
- buttons
- card hover states
- accordion open/close
- mobile nav open/close
- FAQ toggles
- form validation feedback

Keep these:
- short duration
- low motion amplitude
- no layout shift
- no heavy blur/paint cost

### Level 2 — Section motion
Use for:
- reveal-on-scroll sections
- staggered card entrances
- alternating left/right feature blocks
- testimonial/FAQ entrances

This is the best fit for the current site architecture because:
- it adds polish,
- it supports content scanning,
- and it preserves performance.

### Level 3 — Hero motion
Use only where it clarifies the story:
- homepage hero
- maybe one flagship feature page
- maybe one product/retention visual

Do not apply 3D everywhere. Use it sparingly or not at all unless there is a clear brand payoff.

### Level 4 — Three.js / 3D
Only use if:
- it improves comprehension,
- it does not slow mobile,
- it can be code-split or lazy loaded,
- and it is restricted to hero-level brand moments.

For Swalook, 3D is optional, not required. The brand can feel premium through:
- strong typography,
- brutalist structure,
- controlled motion,
- and clear product visuals.

## Asset hierarchy

### Reusable assets
Should be reused across pages:
- homepage hero / salon scene
- product UI mockups
- team/about image
- mobile app device shot
- feature imagery for appointments, marketing, profiles
- abstract shapes or brand textures

### Generated assets
Use generation where there is no real product screenshot:
- abstract hero background
- section-specific product illustrations
- AI-generated contextual banners for blog clusters
- location-page hero variants if needed
- social card images for new blog posts

### Screenshot / UI mockups
Use real or semi-real screenshots for:
- dashboard features
- appointments
- analytics
- billing
- mobile app
- CRM workflows

These should be prioritized because they build trust better than generic art.

### Asset continuity rules
- one visual language across pages
- same border/shadow/shape logic
- consistent cropping and aspect ratios
- no mixed aesthetic families
- every image should have a functional purpose

## Blog hierarchy

### Blog taxonomy
Recommended clusters:
1. CRM / software evaluation
2. retention / repeat visits
3. no-show reduction
4. marketing automation
5. billing / operations
6. analytics / management
7. comparison / alternatives
8. location-based local intent

### Blog funnel role
- informational posts should feed feature pages,
- feature pages should feed demo/trial,
- comparison posts should handle objections,
- local pages should capture geo intent,
- all blog posts should support the same one-brand story.

## SEO hierarchy

### Technical priorities
1. clean crawlable routing
2. correct canonicals
3. sitemap coverage
4. robots strategy
5. structured data
6. metadata per page type
7. strong internal links
8. fast mobile performance
9. image optimization
10. indexation governance

### Content priorities
1. one primary keyword intent per page
2. support keywords via related content
3. avoid keyword cannibalization
4. refresh high-performing pages regularly
5. publish enough content to create topical authority

### Geo-targeting hierarchy
1. India-wide product pages
2. city/location landing pages
3. local-intent blogs
4. comparison pages with local alternatives
5. Google Business / local profile support if used

## Brand connectivity hierarchy

Swalook should be presented as:
- a beauty-industry growth platform,
- not just a CRM,
- not just an appointment scheduler,
- not just a blog.

The product story should connect:
- marketing site promise
- blog education
- CRM operations
- backend capabilities
- conversion surfaces

That means:
- landing page claims must map to actual backend-supported features,
- blog content must link to product realities,
- CRM and backend must inform marketing language.

## Priority recommendations

### P0
- Create an audit/roadmap doc set
- Define page hierarchy
- Define SEO and canonical rules
- Define blog cluster strategy
- Define brand connectivity map
- Define asset and motion strategy
- Define launch readiness requirements for homepage, CTA, metadata, and QA
- Add proof-and-claim mapping before any new public copy ships

### P1
- Expand blog into a real cluster system
- Add city/location pages
- Add comparison pages
- Strengthen internal linking between blog and money pages
- Add schema to blog and money pages
- Add analytics measurement requirements and event definitions
- Add accessibility and performance budgets to the production plan

### P2
- Introduce richer visual assets
- Add optional hero-level motion only where justified
- Create a formal content ops cadence
- Add RSS/newsletter/distribution workflows
- Add page-level launch verification and refresh cadence

## Dependencies

- route and page inventory from the landing page app
- route contracts and feature inventory from `swalook-node`
- product capability inventory from CRM frontend repos
- reference docs for internal linking and conversion flow
- final approval on what is marketable now vs future state
- content operations checklist
- SEO measurement plan
- launch QA and proof assets

## Risks

- Overstating product capabilities before backend/frontend support exists
- Creating city pages without a unique local value proposition
- Overusing animation and hurting mobile performance
- Fragmenting the brand with too many tones or visual systems
- Publishing blog content without internal link structure
- Letting cannibalization occur between homepage, feature pages, and blog posts
- Launching pages that cannot be measured or validated

## Next steps

1. Use the companion docs to separate blog, motion, asset, and brand strategy.
2. Create a clear task folder with one markdown file per deliverable.
3. Align the roadmap to actual backend-supported claims.
4. Turn this into an implementation backlog only after the planning audit is approved.
5. Merge the content ops and measurement plans into the launch workflow.
6. Define page-level QA gates before production release.

## Deliverable map

Recommended files:
- `docs/landing-page-audit/master-roadmap.md`
- `docs/landing-page-audit/home-page-sections.md`
- `docs/landing-page-audit/page-system.md`
- `docs/landing-page-audit/blog-seo-geo-strategy.md`
- `docs/landing-page-audit/asset-and-motion-system.md`
- `docs/landing-page-audit/brand-connectivity-map.md`
- `docs/landing-page-audit/backend-contract-map.md`
- `docs/landing-page-audit/crm-product-map.md`
- `docs/landing-page-audit/content-ops-checklist.md`
- `docs/landing-page-audit/seo-measurement-plan.md`
