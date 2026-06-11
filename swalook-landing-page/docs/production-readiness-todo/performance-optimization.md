# 09 — Performance Optimization

> **Priority:** P1 (High)  
> **Goal:** Fast load times, optimized bundles, proper code splitting, and image optimization.

---

## Current State

### Dependencies
- `next` 16.2.4, `react` 19.2.4, `react-dom` 19.2.4
- `framer-motion` 12.38.0 (~150KB)
- `react-icons` 5.6.0 (tree-shakeable but imports entire Fi* family per page)

### No Optimization Configured
- No `next.config.mjs` image optimization settings
- No lazy loading (`next/dynamic`) usage
- No code splitting strategy
- No bundle analyzer configured
- No font display strategy (Google Fonts loaded via CSS `@import` in globals.css)

---

## Issues

### 1. Google Fonts Blocking Render
`globals.css` uses `@import url('https://fonts.googleapis.com/...')` — this is a blocking CSS import.

**Fix:** Use `next/font/google`:
```js
// app/layout.js
import { Poppins, Montserrat } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['300','400','500','600','700','800','900'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300','400','500','600','700','800','900'] });
```

### 2. No Image Optimization
Next.js `<Image>` component is used on some pages but:
- No `next.config.mjs` image config (domains, formats, sizes)
- Some images use `style={{ width: '100%', height: 'auto' }}` instead of `fill` or explicit sizes
- No blur-up placeholders
- No explicit `priority` on above-the-fold images

**Fix:** Add to `next.config.mjs`:
```js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [320, 480, 640, 768, 1024, 1280, 1440, 1920],
}
```

### 3. framer-motion Bundle Size
`framer-motion` is ~150KB gzipped. All pages import `AnimatedSection` which re-exports `motion` from framer-motion.

**Mitigations:**
- Already using only simple transforms (opacity, x, y) — no layout animations
- Ensure framer-motion is tree-shaken
- Consider `next/dynamic` for below-fold animated sections

### 4. react-icons Tree Shaking
Each page imports specific icons like `import { FiArrowRight, FiCheck } from 'react-icons/fi'` — this is correct for tree shaking. No action needed.

### 5. No Loading States
No `loading.js` files in any route group. Users see nothing while pages load.

**Fix:** Add `app/loading.js` with a simple skeleton/spinner.

### 6. No Bundle Analysis
Cannot verify bundle sizes without `@next/bundle-analyzer`.

---

## Checklist

### Font Loading
- [ ] Replace Google Fonts `@import` with `next/font/google`
- [ ] Set `display: 'swap'` for Poppins and Montserrat
- [ ] Remove `@import url(...)` from globals.css

### Image Optimization
- [ ] Configure `images` in `next.config.mjs` (formats, deviceSizes)
- [ ] Add `priority` prop to above-the-fold hero images
- [ ] Add `placeholder="blur"` or explicit sizes to all `<Image>` components
- [ ] Verify all images have proper `alt` text
- [ ] Convert large PNGs to WebP/AVIF

### Code Splitting
- [ ] Lazy load below-fold sections with `next/dynamic`
- [ ] Lazy load `AnimatedSection` for below-fold content
- [ ] Lazy load blog article components (they're heavy content)
- [ ] Add `loading.js` for route groups

### Bundle Analysis
- [ ] Install `@next/bundle-analyzer`
- [ ] Run bundle analysis
- [ ] Identify large chunks (>50KB)
- [ ] Split or lazy-load large chunks

### Build Optimization
- [ ] Enable `swcMinify` (default in Next.js 16)
- [ ] Verify production build removes console.logs
- [ ] Set appropriate `Cache-Control` headers in next.config.mjs

---

## Success Criteria
- Lighthouse Performance score ≥ 80 on mobile
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Total Blocking Time < 200ms
- No blocking font requests
- All images use next/image with proper sizing
