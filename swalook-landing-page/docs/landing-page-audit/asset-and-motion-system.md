# Asset and Motion System

## Scope
This document defines the visual motion strategy and asset strategy for the Swalook landing page ecosystem. It covers micro-interactions, section motion, hero motion, 3D usage, performance constraints, asset reuse, image generation rules, and alt-text intent.

## Findings

### Current motion state
The site already uses:
- `framer-motion` for section reveals,
- staggered entrance patterns,
- light motion in the hero and feature grids,
- accordion interactions for FAQ,
- simple mobile navigation state changes.

### What works
- Motion is already modular and repeatable.
- The current motion stack is light enough to extend.
- The site avoids excessive animation complexity.
- Section-level animation already supports scanability.

### What is missing
- There is no written motion hierarchy.
- There is no explicit policy for when to use 3D.
- There is no asset inventory or placement map.
- There is no distinction between reusable, generated, and screenshot-based images.
- There is no visual continuity guide for image style, crop, or purpose.
- There is no documented performance budget for motion and media.

---

## Motion system

### 1) Micro-interactions
Micro-interactions should be used for small, immediate feedback.

#### Use cases
- button hover states
- card elevation / border changes
- FAQ open and close
- mobile menu open and close
- tab/category toggle feedback
- form validation feedback
- CTA hover emphasis

#### Design rules
- Keep transitions short and clean.
- Prefer opacity, translate, and border changes over expensive blur effects.
- Avoid any animation that changes layout.
- Keep hover states meaningful but not flashy.
- Maintain consistent timing across the site.

#### Recommendation
Use the same micro-interaction language everywhere so the brand feels coherent:
- slight lift
- subtle shadow increase
- border contrast increase
- small icon movement on hover

---

### 2) Section motion
Section motion should guide the user through the story.

#### Use cases
- homepage blocks
- feature grids
- use-case rows
- blog-related content sections
- FAQ previews
- comparison blocks
- testimonial blocks

#### Recommended patterns
- fade up on enter
- alternating left/right reveal
- staggered children inside grid layouts
- soft delay between related blocks
- section reveal only once unless there is a deliberate re-entry use case

#### Design rules
- Keep section motion secondary to content.
- Never let motion compete with reading.
- Preserve clear visual hierarchy.
- Do not overuse alternating direction on short pages.
- Use stagger only when there are multiple meaningful items.

#### Recommendation
This should remain the main motion layer for the site because it adds polish without harming performance.

---

### 3) Hero motion
Hero motion should be reserved for the most important brand moment on a page.

#### Recommended use
- homepage hero
- one or two flagship feature pages at most
- one visual use-case or campaign page if it adds clarity

#### Motion options
- a single content entrance
- a subtle hero graphic reveal
- a low-amplitude background movement
- a small card or mockup slide
- a restrained headline emphasis effect

#### Design rules
- Hero motion must clarify the message, not distract from it.
- Do not rely on moving text as the main visual device.
- If there are rotating hero slides, keep them minimal and meaningful.
- Avoid making the hero feel like a slideshow unless the messaging genuinely changes.

#### Recommendation
The homepage hero should feel premium, editorial, and stable. If the current slide system remains, it should be narrowed to a very small number of states.

---

### 4) Three.js / 3D policy
Three.js should be considered optional, not default.

#### When 3D is justified
- it helps explain a product concept
- it provides a memorable brand signature
- it can be lazy loaded or code split
- it does not degrade mobile performance
- it is used only in a high-value hero section

#### When to avoid it
- feature pages with straightforward informational goals
- blog pages
- conversion pages where readability is more important than spectacle
- pages where the product already has enough real UI evidence

#### Recommendation
For Swalook, 3D is not necessary everywhere. The brand can achieve premium quality through:
- strong typography
- consistent spacing
- sharp contrast
- controlled motion
- product screenshots
- tasteful abstract visuals

If 3D is introduced later, it should be treated as a flagship asset, not a pattern.

---

## Performance constraints

### Motion performance rules
- Avoid heavy parallax on mobile.
- Avoid long-running animation loops unless they are essential.
- Keep `framer-motion` usage focused and reuse patterns.
- Do not animate large images in ways that trigger layout shift.
- Respect reduced-motion users where possible.
- Keep JS overhead low on content pages.

### Recommended budget
- Hero motion should be lightweight.
- Section motion should be mostly transform/opacity-based.
- Avoid unnecessary canvas or shader usage on low-value pages.
- Ensure image loading does not block the first readable screen.

### Accessibility
- Motion should degrade gracefully.
- Users who prefer reduced motion should still receive a clean experience.
- FAQ and navigation interactions must remain fully usable without animation.

---

## Asset system

### Asset types
The site should use four main asset types:

1. **Reused assets**
   - used across multiple pages
   - example: homepage hero image, team/about image, product screenshots

2. **Generated assets**
   - created specifically for missing visual needs
   - example: abstract hero shape, campaign illustration, social card background

3. **Screenshot / UI assets**
   - actual product or product-like visual evidence
   - example: dashboard, appointments, billing, analytics, mobile app

4. **Support assets**
   - small decorative or explanatory visuals
   - example: icons, badges, workflow diagrams, simple charts

---

### Asset placement strategy

#### Homepage
Recommended assets:
- one hero image or product mockup
- one about section image
- one or two workflow-style visuals in retention/no-show sections
- one visual for use-case segmentation if needed

#### Feature pages
Recommended assets:
- one clear feature-specific screenshot or mockup
- optional secondary diagram or comparison visual
- avoid cluttering each page with too many images

#### Blog index
Recommended assets:
- featured post thumbnails or editorial cards
- optional category illustrations

#### Blog posts
Recommended assets:
- article OG image
- inline illustration only when it improves comprehension
- no decorative asset overload

#### About page
Recommended assets:
- team/brand image
- mission/vision image
- supporting authenticity visual

#### FAQ and policy pages
Recommended assets:
- generally none
- keep these pages light and focused on trust and clarity

---

## Asset continuity rules

### Visual language
All assets should feel like one system.

Recommended common traits:
- consistent border radius or hard-edge framing
- consistent shadow treatment
- consistent crop behavior
- consistent contrast levels
- no mixing of premium minimalism with random stock imagery
- no switching between illustration styles without a purpose

### Brand tone
The site should feel:
- premium
- functional
- product-led
- conversion-oriented
- clean enough for trust, but not sterile

### Reuse policy
Reuse assets when:
- the message is identical or closely related
- the same feature is being explained in multiple places
- the image reinforces brand recognition

Generate new assets when:
- the section needs a unique purpose-built visual
- there is no product screenshot available
- the page needs a strong hero or social sharing image
- a page cluster needs a distinct visual identity

---

## Image generation strategy

### When to generate
Generate only if:
- a section has no suitable existing image
- a hero needs a branded visual system
- a cluster needs consistent social card art
- the asset helps explain a workflow or use case better than text alone

### Prompt direction
Generated assets should be:
- salon-industry appropriate
- premium but functional
- editorial rather than cartoonish unless the brand explicitly wants that tone
- consistent with the site’s typography and dark/light rhythm
- free from generic corporate stock feel

### Required metadata for generated assets
Every generated asset should have:
- prompt direction
- style description
- aspect ratio
- intended placement
- alt text intent
- reuse policy

### Recommended formats
- hero: wide landscape
- feature screenshots: landscape or device mockup
- social images: 1.91:1 or 1200x630
- supporting illustrations: square or landscape depending on section

---

## Alt text and accessibility intent

### Alt text rules
Alt text should:
- describe the purpose of the image
- not repeat the caption verbatim
- not stuff keywords
- be concise and useful

### Example intents
- “Dashboard view showing salon revenue and branch performance”
- “Mobile app mockup for appointment management”
- “Team workspace showing salon CRM workflows”
- “Illustration of automated customer follow-ups”

### Decorative images
If an image is decorative only, use empty alt text where appropriate in the implementation layer.

---

## Section-specific asset recommendations

### Homepage hero
Best asset options:
- a premium salon CRM mockup
- an abstract growth visual with a product silhouette
- a high-contrast branded composition

### About section
Best asset options:
- team image
- brand building image
- a workplace or product collaboration visual

### Retention / reactivation section
Best asset options:
- customer re-engagement workflow
- WhatsApp / SMS / email flow mockup
- retention dashboard or timeline

### No-show section
Best asset options:
- calendar reminder UI
- confirmation message flow
- appointment management snapshot

### Use-case section
Best asset options:
- single salon studio visual
- wellness / spa visual
- multi-branch dashboard or location panel

### Feature pages
Best asset options:
- one page-specific product screenshot or mockup
- one supporting diagram if needed
- no heavy visual layering

### Blog posts
Best asset options:
- one share image per article
- optional inline illustration for complex concepts
- no unnecessary large images

---

## Recommendations

### P0
- Define a motion hierarchy.
- Keep micro-interactions and section motion consistent.
- Avoid unnecessary 3D on non-hero pages.
- Add asset placement rules by page type.

### P1
- Build a reusable visual language for screenshots and generated assets.
- Create a prompt and metadata standard for generated images.
- Define alt-text conventions.

### P2
- Introduce a hero-level branded visual system if the team wants a stronger premium signature.
- Consider one carefully designed 3D or kinetic asset only if it materially improves the homepage.

## Priority
High. Motion and asset decisions shape the perceived quality of the whole brand.

## Dependencies
- page hierarchy from the master roadmap
- homepage section priorities
- content availability
- product screenshot availability
- backend and CRM claim inventory

## Risks
- over-animating content
- introducing visual styles that do not match the brand
- using stock visuals that reduce trust
- generating assets without a placement plan
- adding 3D that harms mobile performance

## Next steps
1. Use the homepage audit to decide which sections deserve visuals.
2. Use the brand map to keep visuals aligned with the product story.
3. Use the backend/CRM map to decide which screenshots and claims are legitimate.
4. Add the actual asset inventory once the implementation phase begins.
