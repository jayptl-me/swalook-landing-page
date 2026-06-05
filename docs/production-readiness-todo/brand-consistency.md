# 16 — Brand Consistency

> **Priority:** P2 (Medium)  
> **Goal:** Consistent tone, terminology, visual language, and naming across all pages.

---

## Terminology Audit

### Product Name
- "Swalook" — used consistently ✅
- "Swalook CRM" — used in some places
- "Swalook Global Private Limited" — used in legal pages

### Positioning Line
- "Revenue Generation Engine For The Beauty Industry" — root layout metadata
- Variations: "Growth platform for salons" (hero label), "Salon CRM Software" (nav subtitle)

**Issue:** Multiple taglines compete — pick one primary.

### Product Descriptors
Inconsistent across pages:
- "salon CRM" / "salon management software" / "beauty industry software"
- "platform" / "system" / "software" / "solution"
- "revenue generation engine" / "growth platform" / "CRM solution"

**Fix:** Standardize on "salon CRM and growth platform" or similar consistent phrase.

---

## Visual Consistency

### Colors
- Primary: `#00BCD4` (cyan) — ✅ consistent via CSS variables
- Secondary: `#6C63FF` (purple) — ✅
- Accent: `#FF6584` (pink) — used sparingly
- Backgrounds: consistent use of `--bg-*` variables ✅

### Typography
- Headings: Montserrat — ✅ via `--font-display`
- Body: Poppins — ✅ via `--font-primary`
- Font weights: 300-900 imported — verify only used weights are loaded

### Shadows & Borders
- Consistent via global CSS variables ✅

---

## Tone & Voice Audit

### Homepage
- "Grow Your Salon Business with retention, marketing, and fewer no-shows"
- Tone: Benefit-focused, outcome-driven. ✅ Good.

### Feature Pages
- "Smart Salon [Feature] Software" — consistent naming ✅
- "Why [Feature] Matters" — consistent structure ✅
- Tone: Educational, feature-explaining. ✅ Good.

### Blog
- Tone: Educational, practical, guide-style. ✅ Good.

### About
- Tone: Mission-driven, team-focused. ✅ Good.

### Legal Pages
- Tone: Formal, legal-required. ✅ Acceptable — legal tone is different by nature.

---

## Checklist

### Naming Conventions
- [ ] Standardize product descriptor across all pages
- [ ] Align hero taglines with root layout positioning
- [ ] Consistent feature naming pattern: "Smart Salon [Feature] Software"
- [ ] Company name consistent: "Swalook Global Private Limited" (legal) vs "Swalook" (marketing)

### Visual
- [ ] Verify all pages use CSS variables (no hardcoded colors)
- [ ] Verify logo usage is consistent (text-based "Swalook" logo in nav)
- [ ] Verify favicon matches brand
- [ ] Verify social share image uses brand colors

### Copy
- [ ] No competing value propositions across pages
- [ ] Feature descriptions don't overlap between pages
- [ ] Blog tone aligns with brand voice
- [ ] No accidental competitor mentions or negative framing

---

## Success Criteria
- Single consistent product descriptor used site-wide
- Zero hardcoded colors — all via CSS variables
- Brand voice consistent across homepage, features, blog, and about
