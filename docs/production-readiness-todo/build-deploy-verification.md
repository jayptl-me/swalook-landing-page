# 19 — Build & Deploy Verification

> **Priority:** P2 (Medium)  
> **Goal:** Production build succeeds, environment variables validated, deploy configuration ready.

---

## Current Build Config

### next.config.mjs
```js
const nextConfig = {
  /* config options here */
};
```
Empty config — no image optimization, no headers, no redirects.

### package.json Scripts
- `dev` — next dev
- `build` — next build
- `start` — next start

### Dependencies
- next 16.2.4, react 19.2.4
- No TypeScript (jsconfig.json only)
- No env validation (no zod, envalid, etc.)
- ESLint configured

---

## Required next.config.mjs Additions

```js
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1440, 1920],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  // Compress output
  compress: true,
  // Powered by header
  poweredByHeader: false,
};
```

---

## Environment Variables

### Check `.env.example` or create one:
```env
NEXT_PUBLIC_SITE_URL=https://swalook.in
NEXT_PUBLIC_API_URL=https://api.swalook.in  # If backend exists
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics
```

### Validate at build time:
- [ ] `NEXT_PUBLIC_SITE_URL` is set
- [ ] No secrets exposed to client (only `NEXT_PUBLIC_*` prefixed vars)
- [ ] Production env differs from development

---

## Deploy Configuration

### Current: No deploy config in landing page repo
- No Dockerfile in `swalook-landing-page/`
- No `render.yaml` in `swalook-landing-page/`
- Note: `swalook-node/` and `crm-super-admin/` have Dockerfiles and render.yaml

### Options:
- **Vercel** (recommended for Next.js) — zero-config deploy
- **Render** — static site or web service
- **Docker** — custom container

---

## Checklist

### Build
- [ ] `npm run build` succeeds with zero errors
- [ ] `npm run build` has zero warnings (or only acceptable ones)
- [ ] Build output size is reasonable (< 500KB per page chunk)
- [ ] No console.errors in production build
- [ ] Static pages are pre-rendered where appropriate

### Config
- [ ] Add image optimization config to next.config.mjs
- [ ] Add security headers to next.config.mjs
- [ ] Set `poweredByHeader: false`
- [ ] Configure `compress: true`

### Environment
- [ ] Create `.env.example` with required variables
- [ ] Document all env vars in README
- [ ] Verify no secrets in client-side code
- [ ] Set production env vars in deploy platform

### Deploy
- [ ] Choose deploy platform (Vercel, Render, Docker)
- [ ] Configure deploy settings
- [ ] Set up custom domain (swalook.in)
- [ ] Configure SSL (automatic on Vercel/Render)
- [ ] Test production deployment

### Monitoring
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure build notifications (Slack, email)

---

## Success Criteria
- Production build succeeds with zero errors
- Security headers are set
- Environment variables are documented and validated
- Deploy platform is configured and tested
- SSL is active on custom domain
