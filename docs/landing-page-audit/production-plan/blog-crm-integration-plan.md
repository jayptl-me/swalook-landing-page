# Blog + CRM Integration Plan

> Status: production planning doc  
> Purpose: align blog content, CRM feature surfaces, and screenshot workflows so the blog becomes a product-led growth system instead of a standalone article list.

## 1) Why this plan exists

The blog should do more than publish educational articles.

It should:
- explain the product through real feature surfaces,
- route readers into high-intent product pages,
- show screenshots of the CRM where relevant,
- stay visually aligned with the modern editorial blog layout,
- and remain easy to maintain as the CRM and super-admin surface grows.

This plan defines how to connect:
- blog index,
- blog posts,
- CRM feature pages,
- CRM/super-admin proof surfaces,
- screenshots,
- and future editorial expansion.

---

## 2) Core goals

### A. Make the blog feature-led
Every blog post should connect to one or more product capabilities that already exist in the CRM or backend contract.

### B. Keep the editorial layout modern
The new blog article shell should remain:
- clean,
- conversion-oriented,
- modular,
- and consistent across posts.

### C. Use screenshots as proof
When a blog post references product behavior, use real CRM screenshots instead of generic illustration where possible.

### D. Keep claims contract-backed
Only claim what the backend / CRM shell can support now.
If a capability is partial or future-state, label it clearly.

### E. Keep routes stable
Do not break existing blog URLs or feature routes while improving the content system.

---

## 3) What the product surfaces prove today

### Market-now product surfaces
Use these as the foundation for blog content:
- appointments
- scheduling
- billing and invoices
- dashboards and analytics
- inventory
- staff and attendance
- loyalty and retention
- inquiry / lead management
- branch management
- export / PDF / reporting
- admin and role-based access

### Supportive but careful
Use these only with careful wording unless the workflow is visually proven:
- automation depth
- customer-facing mobile app claims
- omnichannel messaging claims
- advanced real-time claims
- AI claims

### Future-state
Keep these in roadmap language only:
- comparison pages with direct competitor naming
- case studies with metrics
- city pages with unique local proof
- enterprise claims
- SLA / guaranteed support claims

---

## 4) Blog strategy by page type

### 4.1 Blog index
The blog index should become a topic hub, not just a card list.

It should include:
- featured posts
- topic clusters
- links to product pages
- a clear CTA block
- a short explanation of why the blog exists

Recommended cluster buckets:
- CRM/software selection
- appointment/no-show reduction
- retention and loyalty
- marketing automation
- billing and finance
- analytics and reporting
- staff and operations
- local / India-specific salon growth

### 4.2 Blog detail pages
Each post should have:
- a strong summary,
- highlights,
- a main product tie-in,
- one or more internal links to feature pages,
- one related-post area,
- and a final CTA block.

### 4.3 Blog + CRM proof posts
For feature-led posts, add:
- embedded CRM screenshots,
- short captions,
- and a “why this matters in Swalook” section.

Examples:
- appointment scheduling post → screenshot of calendar / appointments
- CRM benefits post → screenshot of dashboard or customer profile
- marketing automation post → screenshot of CRM workflow or campaign area
- analytics post → screenshot of reports/dashboard
- inventory post → screenshot of stock/alerts

### 4.4 Future blog + super-admin posts
If we later publish content about advanced operations or admin controls:
- use super-admin screenshots only if the page is safe and approved,
- keep the story operational, not internal,
- and avoid exposing private business logic.

---

## 5) Screenshot strategy

### 5.1 Rule for screenshots
Use screenshots only when they add real proof.

Good screenshot use:
- feature explanation
- workflow proof
- dashboard evidence
- before/after usability examples
- product surface matching blog copy

Bad screenshot use:
- decorative filler
- fake mockups
- screenshots that don’t match the article point
- screenshots of incomplete or unsupported workflows

### 5.2 Source of screenshots
Use the local product surfaces and verified shells only.

Recommended screenshot sources:
- CRM frontend routes
- super-admin routes when relevant and approved
- dashboard and operational screens
- feature pages that demonstrate the same workflow

### 5.3 Security / auth rule for screenshots
When taking screenshots in local verification:
- use the provided test login credentials only:
  - username: `9900000001`
  - password: `Swalook@123`
- use them only for local screenshot / verification work
- do not hardcode or publicize them in customer-facing content
- do not store them in code comments or UI text

### 5.4 Screenshot placement in blog layout
Use screenshots in blog posts:
- near the middle of the article when explaining a workflow,
- or immediately after a section that introduces the product concept.

Good placements:
- after a “How Swalook does this” section
- before a CTA block
- inside a related proof card
- as a small gallery, not a full image wall

### 5.5 Screenshot styling
Screenshots should:
- fit the modern editorial layout,
- have clear captions,
- be visually consistent,
- not break mobile layout,
- and not overflow containers.

Recommended presentation:
- one primary screenshot per article,
- optional secondary screenshot for deeper support,
- caption underneath,
- alt text describing the product surface.

---

## 6) Content structure for feature-led blog posts

### Template
1. headline tied to one intent
2. short problem intro
3. why the problem matters in salons
4. how Swalook solves it
5. one product screenshot
6. feature explanation
7. internal link to the matching feature page
8. related article links
9. CTA block to demo / trial

### Example mappings
| Blog topic | Product surface to reference | Screenshot idea | CTA target |
|---|---|---|---|
| Choosing salon CRM software | feature hub / dashboard / customer management | feature hub or dashboard screenshot | `/salon-crm-features` |
| Why salons need CRM | dashboard / customers / appointments | dashboard or customer profile screenshot | `/salon-crm-features` |
| Integrated marketing | marketing templates / campaign workflow | campaign or template screenshot | `/salon-marketing-templates` |
| Marketing automation | templates / reminders / workflow views | automation or reminders screenshot | `/salon-marketing-templates` or `/book-demo` |
| Appointment scheduling | calendar / appointment pages | calendar screenshot | `/salon-appointment-scheduling-software` |
| Analytics / reporting | reports / analytics dashboard | reporting screenshot | `/salon-analytics-software` |
| Inventory management | inventory page / low stock / alerts | stock dashboard screenshot | `/salon-inventory-management-software` |
| Staff / attendance | attendance dashboard | staff attendance screenshot | `/salon-staff-attendance-software` |

---

## 7) Blog page responsibilities

### `app/blogs/page.js`
Keep as the blog hub:
- category filtering
- featured content
- routes into product pages
- CTA blocks to demo / trial
- no article-level content

### `components/BlogPostLayout.js`
Keep as the shared article shell:
- breadcrumb
- metadata
- summary
- highlights
- related posts
- CTA sections
- sidebar proof blocks

### `components/blog/blogData.js`
Use as the content registry:
- categories
- post metadata
- related-post logic
- quick routes
- CTA items

### `components/blog/articles/*`
Use as article content modules:
- one file per article body
- easy to import into route pages
- no shared shell logic
- no route logic

### `app/*article*/page.js`
Keep thin:
- imports article content
- passes it to `BlogPostLayout`
- supplies summary / highlights / CTA labels
- no duplicated UI logic

---

## 8) CRM feature integration rules

### Use the right feature page for the right article
Keep a one-to-one or one-to-few mapping between article intent and feature pages.

Examples:
- CRM evaluation article → `/salon-crm-features`
- appointment article → `/salon-appointment-scheduling-software`
- analytics article → `/salon-analytics-software`
- billing article → `/salon-invoice-software`
- inventory article → `/salon-inventory-management-software`
- loyalty article → `/salon-loyalty-program-software`
- marketing article → `/salon-marketing-templates`
- staff article → `/salon-staff-attendance-software`
- inquiry article → `/salon-inquiry-management`

### Keep claims aligned
If the blog says a feature exists, the matching page and/or product proof should support it.

### Avoid overclaiming
Do not describe a product workflow as complete if only the shell exists.
Use:
- “supports”
- “can help”
- “is designed to”
- “is available in the product shell”
instead of unproven guarantee language.

---

## 9) Super-admin usage in the future

If future content needs super-admin screenshots:
- only use them where they support an ops/admin narrative,
- keep them out of customer-facing claims unless approved,
- and avoid exposing sensitive internal modules.

Good use cases:
- admin dashboard proof
- operational visibility
- role-based access explanation
- internal workflow maturity

Not good use cases:
- marketing claims about customer-facing features
- any unsupported SLA or enterprise narrative
- anything that reveals sensitive internal business logic

---

## 10) Blog-to-feature content model

### Model A — educational post
Use this for the current blog posts that teach one topic:
- one intent
- one product link
- one related-post block
- one CTA block

### Model B — feature-led proof post
Use this for future content:
- one product feature
- one screenshot
- one short proof section
- one feature page link
- one conversion CTA

### Model C — local / geo post
Use this only when the local proof exists:
- one city or region
- one use case
- one product surface
- one local CTA
- one unique example

---

## 11) Plan for next optimization work

### P0
- Keep the new blog layout and article shell.
- Add feature-led screenshots where the content supports them.
- Keep copy aligned with the backend and CRM contract maps.
- Use the blog as a funnel into feature pages and demo/trial routes.

### P1
- Add image blocks / figure components to blog articles.
- Add article-specific screenshot captions.
- Expand the blog index into topic clusters and featured proof posts.
- Add structured internal links from blog articles to matching feature pages.

### P2
- Add super-admin proof posts only where the product story needs it.
- Add comparison posts once there is enough proof and market demand.
- Add geo blog pages only when the local market story is unique.

---

## 12) Recommended implementation sequence

1. Confirm which blog posts should receive CRM screenshots first.
2. Decide which product route each post should link to.
3. Add screenshot blocks to the article body or a reusable figure component.
4. Capture local screenshots from the CRM shell using the approved local credentials.
5. Add captions / alt text / placement rules.
6. Re-run build and browser checks.
7. Capture new screenshots of the updated blog pages.
8. Review the blog index for topic clustering and feature-page routing.

---

## 13) Deliverable definition

This plan is complete when:
- the blog structure is feature-led,
- screenshots are used as real proof,
- claims are contract-backed,
- route hierarchy stays intact,
- and the blog index / detail pages clearly support CRM discovery and conversion.

## Next step
Implement the first proof-driven blog enhancement and capture a fresh set of screenshots from the CRM shell for the relevant article.
