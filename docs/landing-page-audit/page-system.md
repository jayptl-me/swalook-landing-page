# Page System Audit

## Scope
This file maps the landing page app as a connected route system. It explains how each route should function, how it should connect to other pages, and how the conversion funnel should work across the site.

## Findings

### Current route structure
The app already contains a meaningful route ecosystem:
- homepage
- about
- blog index
- blog posts
- feature hub
- individual feature pages
- mobile app
- FAQ
- demo/trial/contact
- policy pages

### What works
- The route architecture is strong enough to support an SEO-led growth system.
- Feature pages are already reusable and structurally consistent.
- Blog posts and the blog index exist as separate discoverability surfaces.
- Conversion routes are present, even if some are not yet wired into a formal funnel.
- The navigation and footer already expose the major areas of the site.

### What is missing
- There is no formal page hierarchy or priority map.
- Some routes act as “content pages” but should be treated as conversion pages.
- The blog has not yet been separated into category, cluster, and intent layers.
- The site lacks a fully explicit connective model from homepage to feature pages to demo/trial.
- Several future growth pages described in the reference docs are not yet present in this repo.

---

## Route hierarchy

### Tier 1 — Core conversion and brand routes
These are the most important pages in the system:
- `/`
- `/salon-crm-features`
- `/book-demo`
- `/free-trial`
- `/contact`

Recommended role:
- Primary traffic landing
- Brand explanation
- Main conversion points

### Tier 2 — Feature depth routes
These pages explain product value and should support SEO and sales:
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

Recommended role:
- Support specific intent queries
- Expand feature understanding
- Bridge into demos and feature hub navigation

### Tier 3 — Educational and trust routes
- `/blogs`
- blog post routes
- `/about`
- `/faq`

Recommended role:
- Build trust
- Support SEO
- Answer objections
- Feed feature and conversion routes

### Tier 4 — Policy and legal routes
- privacy policy
- terms
- cancellation policy
- shipping policy

Recommended role:
- Compliance and trust
- Footer utility
- Minimal SEO value but important for credibility

### Tier 5 — Future growth routes
Not yet present in this repo, but should be part of the roadmap:
- pricing page
- location pages
- comparison pages
- dedicated demo walkthrough page
- feature comparison pages
- case studies
- industry-specific pages

---

## CTA system

### Primary CTAs
These should be treated as the main conversion actions across the site:
- Book Free Demo
- Start Free Trial

### Secondary CTAs
These can be used where appropriate:
- WhatsApp Us
- Learn More
- Explore Features
- Read the Blog
- People Also Ask
- Contact Us

### CTA placement rules
| Page type | Primary CTA placement | Secondary CTA placement | Notes |
|---|---|---|---|
| Homepage | Hero, mid-page, final CTA, FAQ follow-up | WhatsApp, feature cards | Most aggressive conversion page |
| Feature pages | Hero, after features, final CTA | Feature hub, contact | Must always end with demo path |
| Blog posts | After intro, inline mid-article, final CTA | Related post, money page links | Must convert educational traffic |
| Blog index | Hero / category / footer CTA | Featured post cards | Should feed posts and feature pages |
| About | Hero or after company story | Demo, contact | Trust-building, lower conversion pressure |
| FAQ | Top and bottom CTA | Contact, demo | Objection handling page |
| Mobile app | Hero and final CTA | Feature hub, contact | Should also support product trust |

### CTA behavior rules
- Every money page should link to demo or trial.
- Every blog post should link to at least one money page and one related blog.
- Every major page should contain at least three internal links.
- The same destination should not be repeated with the same anchor text on one page.
- CTA language should stay benefit-focused and not feel generic.

---

## Page connectivity map

### Homepage connectivity
Homepage should connect to:
- feature hub
- feature depth pages
- about
- blog index
- FAQ
- demo/trial/contact

Recommended reason:
- It is the site’s main brand and traffic routing layer.

### Feature hub connectivity
`/salon-crm-features` should connect to:
- individual feature pages
- contact
- demo
- trial
- blog index where relevant

Recommended reason:
- It is the architecture page for product exploration.

### Feature page connectivity
Each feature page should connect to:
- feature hub
- related feature pages
- demo/contact
- one or two supporting blog posts when relevant

Recommended reason:
- Each page should deepen one feature while keeping the system connected.

### Blog index connectivity
`/blogs` should connect to:
- all major articles
- feature hub
- homepage
- FAQ
- demo/trial

Recommended reason:
- It is the editorial entry point for SEO traffic.

### Blog post connectivity
Each blog post should connect to:
- one money page
- one related blog
- the blog index
- demo/trial/contact when relevant

Recommended reason:
- Blog content should move visitors deeper into the acquisition funnel.

### About page connectivity
`/about` should connect to:
- homepage
- feature hub
- FAQ
- demo/contact

Recommended reason:
- It should reinforce trust and origin story, not become a dead-end.

### FAQ connectivity
`/faq` should connect to:
- homepage
- contact
- demo
- blog posts
- feature hub

Recommended reason:
- FAQ should answer objections and route users back into conversion.

### Mobile app connectivity
`/mobile-app` should connect to:
- feature hub
- homepage
- demo/contact
- related product pages

Recommended reason:
- It should support product breadth and modern usability without becoming isolated.

---

## Current route-by-route recommendations

### `/`
Role:
- main brand and conversion anchor

Recommendations:
- Keep as the broadest story page
- Use the homepage to route users into feature depth
- Keep CTA density high but disciplined

Priority:
- P0

### `/salon-crm-features`
Role:
- feature hub and product taxonomy page

Recommendations:
- Make this the central feature directory
- Group features by business function
- Add stronger descriptive navigation to individual features

Priority:
- P0

### `/blogs`
Role:
- blog index and educational entry point

Recommendations:
- Add a real topic taxonomy
- Surface featured posts and clusters
- Make category structure more meaningful than “all posts”

Priority:
- P0

### Individual blog posts
Role:
- long-tail SEO and trust education

Recommendations:
- Give each post a unique search intent
- Add internal links to money pages
- Add schema and canonical rules
- Make article structure more opinionated and cluster-driven

Priority:
- P0

### Feature pages
Role:
- search-intent pages and product proof pages

Recommendations:
- Keep the shared `FeaturePage` template as the base pattern
- Add page-specific proof, FAQs, or supporting visuals where needed
- Avoid making all feature pages feel identical

Priority:
- P0

### `/mobile-app`
Role:
- product breadth and modern access story

Recommendations:
- Position as extension of CRM utility
- Add stronger proof if the app is real and usable
- Link it into the broader product ecosystem

Priority:
- P1

### `/faq`
Role:
- objection-handling and SEO support

Recommendations:
- Expand with structured FAQ schema
- Segment questions by persona where useful
- Link to product pages and blogs

Priority:
- P1

### `/about`
Role:
- brand trust and narrative

Recommendations:
- Keep it aligned to the same product story
- Make it feel like a growth company, not a generic company profile

Priority:
- P1

### `/book-demo`, `/free-trial`, `/contact`
Role:
- conversion endpoints

Recommendations:
- Ensure each page has a clear single action
- Keep friction low
- Use consistent CTA language and trust signals

Priority:
- P0

---

## Missing or weak page types

### Comparison pages
Why needed:
- capture decision-stage users
- handle objections
- support SEO around alternatives

Recommendation:
- Plan comparison pages as future-state SEO assets

### City/location pages
Why needed:
- support geo-targeting
- capture local intent
- reinforce India-focused growth

Recommendation:
- Build city pages only with unique, useful location-specific value

### Pricing page
Why needed:
- conversion support and qualification

Recommendation:
- Add when pricing is ready and stable

### Case study pages
Why needed:
- trust and proof

Recommendation:
- Add once real customer evidence is available

---

## Recommendations

### P0
- Formalize the route hierarchy into a content hierarchy.
- Ensure every major route has a clear function.
- Make internal linking rules explicit.

### P1
- Add future growth page types to the roadmap.
- Strengthen connectiveness between blog, feature pages, and conversion routes.
- Differentiate the blog index from a simple post listing.

### P2
- Introduce comparison pages, case studies, and city pages in a controlled rollout.
- Add route-level schema and metadata conventions.

## Priority
High. Route hierarchy determines SEO structure, navigation clarity, and conversion flow.

## Dependencies
- master roadmap
- homepage section decisions
- blog strategy
- backend contract-backed claims
- future content inventory

## Risks
- Route duplication without a content purpose
- Blog becoming isolated from product pages
- Feature pages feeling too repetitive
- Adding geo pages before local differentiation exists
- Conversion pages becoming overcomplicated

## Next steps
1. Use the blog strategy file to define clusters and link patterns.
2. Use the motion and asset file to define the visual system.
3. Use the brand map to align marketing claims with product reality.
4. Use backend and CRM maps to decide what is safe to market now.
