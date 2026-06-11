# Feature Page Production Plan

> Status: production backlog  
> Purpose: bring the CRM feature pages up to the same production standard as the redesigned blog layout and make them usable as proof surfaces for blog posts, screenshots, and conversion flows.

## 1) Why this plan exists

The feature pages currently work, but they are not yet production-grade in the same way the blog layout now is.

Main issues:
- the pages are mostly thin wrappers around a shared template,
- the visual quality is inconsistent,
- the pages do not yet show product proof,
- the blog is now ready to reference CRM feature surfaces, but the feature pages themselves still need polish,
- and the feature pages need a clearer role in the marketing funnel.

This plan defines:
- what each feature page is for,
- how to make them more trustworthy,
- how to connect them to blog content,
- and what should be optimized next.

---

## 2) Pages in scope

### Core feature hub
- `/salon-crm-features`

### Feature depth pages
- `/salon-dashboard-software`
- `/salon-appointment-scheduling-software`
- `/salon-analytics-software`
- `/salon-invoice-software`
- `/salon-inventory-management-software`
- `/salon-loyalty-program-software`
- `/salon-marketing-templates`
- `/salon-expense-management-software`
- `/salon-inquiry-management`
- `/salon-staff-attendance-software`
- `/mobile-app`

### Route alias
- `/crm` redirects to `/salon-crm-features`

---

## 3) Current-state assessment

### What works
- Feature routes already exist.
- The pages are connected to a reusable feature template.
- The product inventory aligns with backend contract surfaces.
- The feature hub already exposes the major product areas.

### What is weak
- The template is visually generic.
- The pages rely heavily on text and do not show CRM screenshots.
- The pages do not yet feel like proof-led product pages.
- CTA hierarchy is too similar across pages.
- The pages are not yet differentiated by feature type.
- The pages do not yet match the editorial quality of the new blog design.

### What is missing
- product screenshots
- proof captions
- feature-specific content blocks
- stronger funnel routing
- better visual hierarchy
- clearer connection to blog articles
- a stricter claims boundary per feature

---

## 4) Product surfaces and marketing alignment

### Market-now surfaces
These are safe to show as real product areas:
- dashboard
- appointments
- analytics
- billing and invoices
- inventory
- loyalty
- inquiries
- staff and attendance
- expense and purchasing
- templates
- branch visibility
- role-based access

### Careful surfaces
Use these carefully unless the workflow is visually proven:
- real-time claims
- mobile-app claims beyond broad access language
- automation depth
- any AI-like wording

### Future-state surfaces
Do not market these as finished unless later proven:
- advanced enterprise positioning
- metrics and outcome claims
- direct comparison pages
- city pages
- case-study claims with numbers

---

## 5) Feature page role in the funnel

### Feature hub role
The feature hub should:
- act as the product directory,
- guide visitors into the right feature,
- support SEO for product-intent queries,
- and act as a bridge from blog to conversion.

### Depth page role
Each depth page should:
- explain one product capability,
- show how it helps salon owners,
- use screenshots or proof,
- link to related features,
- and always end with a demo path.

### Conversion role
Every feature page should end with:
- Book Free Demo
- Start Free Trial
- Contact Us

The primary CTA should remain consistent per page family, but the supporting CTA can vary by intent.

---

## 6) Template improvements needed

The current `FeaturePage` shell needs a production pass.

### Current template
- hero section
- why section
- key features grid
- compare section
- with Swalook list
- other features grid

### Recommended additions
- screenshot block
- short proof callout
- feature-specific CTA variation
- related blog links
- captioned media
- better icon treatment
- improved spacing and content rhythm
- better mobile stacking
- stronger contrast and visual hierarchy

### Recommended component split
If the template continues to grow, split into:
- `FeatureHero`
- `FeatureProof`
- `FeatureBenefits`
- `FeatureComparison`
- `FeatureMedia`
- `FeatureCTA`
- `FeatureRelatedLinks`

---

## 7) Feature-to-blog mapping

The blog should point into the correct feature page, and the feature page should reinforce the same story.

| Blog topic | Feature page to reference | Screenshot target |
|---|---|---|
| Choosing salon CRM software | `/salon-crm-features` | hub / dashboard / customer management |
| Why salons need CRM | `/salon-crm-features` | dashboard or customer profile |
| Integrated marketing | `/salon-marketing-templates` | marketing templates or campaign area |
| Marketing automation | `/salon-marketing-templates` | template or reminder workflow |
| Appointment scheduling | `/salon-appointment-scheduling-software` | calendar / appointment view |
| Analytics / reporting | `/salon-analytics-software` | dashboard / reporting page |
| Invoice workflows | `/salon-invoice-software` | invoice screen |
| Inventory management | `/salon-inventory-management-software` | inventory screen |
| Loyalty / retention | `/salon-loyalty-program-software` | loyalty / rewards screen |
| Staff / attendance | `/salon-staff-attendance-software` | attendance / staff dashboard |
| Inquiries / leads | `/salon-inquiry-management` | inquiry / lead pipeline |
| Expense / purchasing | `/salon-expense-management-software` | expense / vendor screen |
| Mobile usage | `/mobile-app` | mobile app screen if verified |

---

## 8) Screenshot strategy for feature pages

### Why screenshots matter
Screenshots are the quickest way to prove the product is real and match the new blog layout.

### What to capture
Capture screenshots from:
- feature hub
- dashboard
- appointments
- analytics
- invoices
- inventory
- loyalty
- inquiry management
- staff attendance
- marketing templates
- mobile app
- super-admin only when needed and approved

### Screenshot rules
- use real product screens only
- avoid decorative or fake mockups
- keep screenshots tightly tied to article or feature copy
- do not capture sensitive admin content unless necessary
- use the approved local auth only for local verification
  - username: `9900000001`
  - password: `Swalook@123`

### Best use cases
- feature pages
- blog posts that explain features
- future case-study style pages
- proof blocks on the hub page

---

## 9) Priority backlog for feature-page optimization

### P0 — must do next
- redesign `FeaturePage` to match the editorial quality of the blog layout
- add product screenshots to the most important feature pages
- improve the feature hub hierarchy
- refine CTA hierarchy
- update feature wording to match the backend / CRM proof maps
- remove unnecessary client-side behavior where it is not needed

### P1 — should do next
- split the shared feature template into smaller components
- add related blog links to each feature page
- add proof captions and better media handling
- make the feature pages feel more distinct from each other
- create feature-specific page sections rather than relying on one generic pattern

### P2 — later
- add comparison pages
- add local city pages where proof exists
- add case studies
- add feature walkthrough pages
- add super-admin proof pages only if they support the public story

---

## 10) Specific issues found in the current feature pages

### `FeaturePage.js`
- too generic visually
- no screenshot support
- repeated structure across all features
- limited differentiation between pages
- same CTA style everywhere
- not yet aligned with the blog’s more editorial look

### `app/salon-crm-features/page.js`
- still behaves like a feature directory but needs a more polished product-hub layout
- feature cards need stronger visual hierarchy
- the page should become a true gateway into the product

### Depth pages
Each depth page is currently too text-heavy.
They need:
- more proof,
- more visual rhythm,
- clearer feature explanation,
- and a stronger bridge from understanding to action.

---

## 11) Production-grade feature page checklist

### Visual
- [ ] consistent visual language across all feature pages
- [ ] screenshot blocks added where useful
- [ ] improved spacing and section rhythm
- [ ] mobile-friendly layout
- [ ] better icon size and contrast
- [ ] strong CTA placement

### Content
- [ ] one clear feature intent per page
- [ ] copy aligned to proof map
- [ ] no unsupported claims
- [ ] related blog links included
- [ ] proof / screenshot captions added
- [ ] feature hub hierarchy clarified

### Funnel
- [ ] demo CTA visible on every feature page
- [ ] secondary CTA consistent
- [ ] feature pages link back to hub and related features
- [ ] blog articles link into matching feature pages
- [ ] no dead ends

### Technical
- [ ] remove unnecessary client-side wrappers
- [ ] keep build clean under Node 20
- [ ] maintain stable routes
- [ ] preserve redirects such as `/crm` → `/salon-crm-features`

---

## 12) Cleanup / junk removal guidance

### Safe to remove
- generated screenshot files from `public`
- unused default Next placeholder assets
- temporary verification artifacts

### Not junk
- feature route folders
- `app/careers`
- `app/mobile-app`
- the current feature pages
- redirect route `/crm`

### Recommended rule
Only remove files or folders that are:
- unused,
- unreferenced,
- not part of a real route,
- and not needed for production proof.

---

## 13) Recommended implementation sequence

1. Redesign `FeaturePage` to feel closer to the blog shell quality.
2. Add product screenshots to the highest-priority feature pages.
3. Improve the feature hub page with a stronger structure.
4. Add related blog links from feature pages.
5. Tighten copy against the backend / CRM proof maps.
6. Capture screenshots of the updated feature pages.
7. Re-run build and browser checks.
8. Decide whether any feature pages can be split into smaller route-specific layouts.

---

## 14) Deliverable definition

This plan is complete when:
- the feature pages look production-grade,
- the feature hub feels like a real product directory,
- screenshots are embedded or ready for use,
- claims are contract-backed,
- and the blog can safely reference the product surface.

## Next step
Redesign the shared feature template and update the highest-impact feature pages first.
