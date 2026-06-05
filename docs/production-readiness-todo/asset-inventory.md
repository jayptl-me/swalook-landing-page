# 11 — Asset Inventory

> **Priority:** P1 (High)  
> **Goal:** Audit all images, verify alt text, remove unused assets, optimize formats, ensure proper lazy loading.

---

## Current Image Assets in `/public/images/`

| File | Used In | Has Alt Text? | Optimization |
|------|---------|---------------|--------------|
| `about-beauty.png` | About page (Mission detail) | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `about-customer.png` | About page (How We Work detail) | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `about-idea.png` | About page (Vision detail) | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `about-security.png` | About page (Why It Matters detail) | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `blog-automation.png` | Blog (automation article) | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `blog-benefits.png` | Blog (benefits article) | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `blog-guide.png` | Blog (guide article) | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `blog-marketing.png` | Blog (marketing article) | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `feature-appointments.png` | Homepage (use cases) + product pages | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `feature-bg.png` | Feature pages (background?) | ⚠️ Check usage | ⚠️ PNG |
| `feature-marketing.png` | Homepage (use cases) + product pages | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `feature-mobile.png` | Mobile app page + homepage | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `feature-profiles.png` | Salon CRM Features page | ⚠️ Check | ⚠️ PNG — convert to WebP |
| `salon-hero.png` | Homepage hero? | ⚠️ Check usage | ⚠️ PNG — convert to WebP |
| `team-about.png` | About page (company image) | ⚠️ Check | ⚠️ PNG — convert to WebP |

## Unused/Unreferenced Assets
- [ ] `feature-bg.png` — verify if used anywhere
- [ ] `salon-hero.png` — verify if used in HomeHeroSection (may be replaced by the device mockup)

## Missing Assets
Based on the code, these images are referenced but may be missing or placeholders:
- None identified — all `<Image>` references point to files that exist in `/public/images/`

---

## Checklist

### Alt Text Audit
- [ ] Audit every `<Image>` component for descriptive `alt` text
- [ ] Audit every `<img>` tag (if any remain)
- [ ] Decorative/background images use CSS or `alt=""`
- [ ] Blog post images have keyword-rich descriptive alt text

### Format Optimization
- [ ] Convert all PNGs to WebP (or AVIF for better compression)
- [ ] Update all `src` references to new formats
- [ ] Keep PNG originals as fallback if needed

### Responsive Images
- [ ] Every `<Image>` has explicit `width`/`height` or uses `fill` properly
- [ ] Above-fold images have `priority` prop
- [ ] Below-fold images have `loading="lazy"` (default in next/image)
- [ ] Images have appropriate `sizes` prop for responsive srcset generation

### Unused Asset Cleanup
- [ ] Identify and remove any unreferenced images from `/public/images/`
- [ ] Verify no images are loaded but never displayed

### SVG/Favicon
- [ ] `favicon.ico` exists and is correct
- [ ] Social share image (og:image) exists at `/public/og-image.png` (if not, create one)
- [ ] Any SVG icons are optimized (no unnecessary markup)

---

## Success Criteria
- All images have descriptive alt text
- All images are in WebP/AVIF format with appropriate sizing
- No unused assets in /public
- Above-fold images are prioritized
- og:image is set for social sharing
