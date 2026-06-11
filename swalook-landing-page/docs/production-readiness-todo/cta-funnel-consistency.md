# 06 — CTA & Funnel Consistency

> **Priority:** P0 (Critical)  
> **Goal:** Consistent CTA hierarchy, labels, destinations, and placement across all pages. No competing CTAs, no dead-end pages.

---

## Current CTA Inventory

### Primary CTAs (Conversion)
| Label | Destination | Used On |
|-------|-------------|---------|
| "Book Free Demo" / "Book a Free Demo" | `/book-demo` | Homepage, feature pages, blog posts, about, mobile-app |
| "Start Free Trial" | `/free-trial` | Homepage, feature pages, blog posts |
| "Request a Demo" | `/contact` | Navbar |
| "Get Started" | `/contact` | Mobile app CTA |
| "Apply Now" | `mailto:hr@swalook.in` | Careers |
| "Send Message" | (form submit) | Contact |
| "Book Demo" | (form submit) | Book Demo |
| "Start Free Trial" | (form submit) | Free Trial |

### Secondary CTAs (Education/Exploration)
| Label | Destination | Used On |
|-------|-------------|---------|
| "Explore Features" / "Explore all features" | `/salon-crm-features` | Homepage, feature pages |
| "Learn More" | Various feature pages | Homepage feature cards |
| "Read the Blog" | `/blogs` | Homepage route section |
| "People Also Ask" | `/faq` | Homepage FAQ section |
| "Browse FAQs" | `/faq` | Homepage route section |
| "Contact Us" | `/contact` | Homepage route section, feature pages |
| "Have More Questions?" | `/contact` | FAQ page |
| "Follow on LinkedIn" | External | Careers |
| "Subscribe" | (newsletter form) | Contact |

---

## Issues Found

### 1. Inconsistent CTA Labels
- "Book Free Demo" vs "Book a Free Demo" vs "Book Demo"
- "Start Free Trial" used both as link text and button text
- "Get Started" links to `/contact` but could mean demo or trial

### 2. Competing Primary CTAs
- Homepage hero has 3 buttons: "Book Free Demo", "Start Free Trial", "Explore Features" — too many choices above the fold

### 3. Navbar CTA Different from Page CTAs
- Navbar says "Request a Demo" → `/contact`
- Page CTAs say "Book Free Demo" → `/book-demo`
- This creates two different demo paths with different labels

### 4. Form Pages Have No Post-Submit Funnel
- Contact, book-demo, free-trial all use `e.preventDefault()` — no submission
- No "thank you" page or redirect after form submission

### 5. Some Pages Are Dead Ends
- Legal pages have no CTA back to the product or conversion path
- Blog posts' sidebar has CTA, but article footer CTA may be inconsistent

---

## Required CTA Hierarchy Per Page Type

### Homepage
| Position | CTA | Destination | Emphasis |
|----------|-----|-------------|----------|
| Hero (primary) | "Book Free Demo" | `/book-demo` | Primary button |
| Hero (secondary) | "Start Free Trial" | `/free-trial` | Outline button |
| Hero (tertiary) | "Explore Features" | `/salon-crm-features` | Ghost link |
| Mid-page CTA section | "Book Free Demo" + "Start Free Trial" | `/book-demo` + `/free-trial` | Primary + outline |
| FAQ follow-up | "People Also Ask" | `/faq` | Outline button |

### Feature Pages
| Position | CTA | Destination |
|----------|-----|-------------|
| Hero (primary) | "Book a Free Demo" | `/book-demo` |
| Hero (secondary) | "Explore all features" | `/salon-crm-features` |
| Final CTA (primary) | "Book a Free Demo" | `/book-demo` |
| Final CTA (secondary) | "Start a free trial" | `/free-trial` |

### Blog Posts
| Position | CTA | Destination |
|----------|-----|-------------|
| Header (primary) | "Book Free Demo" | `/book-demo` |
| Header (secondary) | "Start Free Trial" | `/free-trial` |
| Footer (primary) | "Book Free Demo" | `/book-demo` |
| Footer (secondary) | "Start Free Trial" | `/free-trial` |

### Marketing Pages (About, Careers, FAQ, Mobile App)
| Page | Closing CTA | Destination |
|------|-------------|-------------|
| About | "Book a free demo today" | `/book-demo` (verbal, not linked) |
| Careers | "Apply Now" + "Follow on LinkedIn" | `mailto:` + LinkedIn |
| FAQ | "Have More Questions?" | `/contact` |
| Mobile App | "Get Started" | `/contact` (should be `/book-demo`) |
| Contact | "Send Message" | Form submit |
| Book Demo | "Book Demo" | Form submit |
| Free Trial | "Start Free Trial" | Form submit |

### Legal Pages
| Page | CTA | Destination |
|------|-----|-------------|
| All | None currently | Should add footer-only "Explore Swalook" or rely on global footer |

---

## CTA Label Standardization

| Concept | Standard Label |
|---------|---------------|
| See the product in a guided call | **"Book Free Demo"** |
| Try the product self-serve | **"Start Free Trial"** |
| Browse all features | **"Explore Features"** |
| Read educational content | **"Read the Blog"** |
| Get in touch for questions | **"Contact Us"** |
| See common questions | **"Browse FAQs"** |

---

## Checklist

### Label Consistency
- [ ] Standardize all "Book Free Demo" labels (remove "Book a Free Demo", "Book Demo" variants)
- [ ] Standardize all "Start Free Trial" labels
- [ ] Standardize all "Explore Features" labels
- [ ] Change mobile-app "Get Started" to "Book Free Demo" and link to `/book-demo`
- [ ] Align navbar CTA with page CTAs (both to `/book-demo` or both to `/contact`)

### CTA Hierarchy
- [ ] Homepage hero: keep max 3 CTAs with clear visual hierarchy (primary > secondary > tertiary)
- [ ] Every money page must end with at least one conversion CTA
- [ ] Blog posts must have CTA in header and footer
- [ ] Legal pages should at minimum rely on footer for navigation back to product

### Funnel Flow
- [ ] `/book-demo` → form submit → thank-you state → (eventual CRM lead)
- [ ] `/free-trial` → form submit → thank-you state → (eventual account creation)
- [ ] `/contact` → form submit → thank-you state → (eventual CRM lead)
- [ ] All forms must have working submission

### Dead-End Audit
- [ ] Legal pages: verify footer provides path back to product
- [ ] Blog posts: verify every article links to at least one money page
- [ ] About: verify it links to demo or feature hub
- [ ] FAQ: verify every answer category routes to relevant product or conversion page

---

## Success Criteria
- All CTA labels are consistent across the site
- Primary CTA is visually dominant on every page
- No page has > 1 primary CTA competing for attention
- Every page has a clear next step (no dead ends)
- Form submissions actually work
- Navbar CTA aligns with page-level conversion strategy
