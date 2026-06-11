# 17 — Motion & Performance

> **Priority:** P2 (Medium)  
> **Goal:** Verify framer-motion usage is performant, respects reduced-motion preferences, and has no animation jank.

---

## Current Motion Usage

### AnimatedSection
- Used on virtually every section of every page
- Simple fade + translate animations (opacity + x/y)
- Duration: 0.7s, ease: custom cubic-bezier
- `once: true` — animates only on first scroll into view
- Threshold: 0.2 (triggers when 20% visible)

### StaggerContainer + StaggerItem
- Used for card grids (feature cards, blog cards, etc.)
- staggerDelay: 0.1s per child
- Simple fade + translateY(30px)

### Assessment
- ✅ Simple transforms only — GPU-accelerated, no layout thrashing
- ✅ No continuous animations (no spinning, pulsing, looping)
- ✅ Uses `useInView` for scroll-triggered (not constant RAF)
- ⚠️ Every page imports framer-motion even when sections are below fold
- ❌ No `prefers-reduced-motion` support

---

## Issues

### 1. No Reduced Motion Support
Users with motion sensitivity get the full animation experience.

**Fix:** Add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Or in `AnimatedSection`:
```jsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return <div className={className}>{children}</div>;
```

### 2. framer-motion Bundle Size
- ~150KB gzipped
- Consider `next/dynamic` with `ssr: false` for AnimatedSection:
```jsx
const AnimatedSection = dynamic(() => import('@/components/ui/AnimatedSection'), { ssr: false });
```
Only do this for below-fold sections — above-fold animation needs SSR for LCP.

### 3. Scroll Performance
Every AnimatedSection creates a `useInView` observer. On the homepage with 11 sections each containing multiple animated children, this could mean 50+ IntersectionObservers.

**Mitigation:** Current `once: true` means observers disconnect after first trigger. This is acceptable but should be verified.

---

## Checklist

### Reduced Motion
- [ ] Add `prefers-reduced-motion` support to AnimatedSection
- [ ] Add global `prefers-reduced-motion` CSS rule
- [ ] Verify animations are disabled when system setting is on

### Performance
- [ ] Audit IntersectionObserver count on homepage (should be reasonable)
- [ ] Consider lazy-loading AnimatedSection for below-fold content
- [ ] Run Chrome DevTools Performance tab on homepage scroll
- [ ] Check for layout shifts caused by animations (CLS)

### Testing
- [ ] Test homepage scroll on low-end Android device
- [ ] Test homepage scroll with CPU throttling (6x slowdown in DevTools)
- [ ] Verify no jank or stutter during scroll-triggered animations

---

## Success Criteria
- `prefers-reduced-motion` is fully supported
- No animation jank on low-end devices
- Homepage scroll animations are smooth at 60fps
- No layout shifts from animated elements
