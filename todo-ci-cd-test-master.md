# swalook-landing-page CI/CD and Test Master Plan

Repo: swalook-landing-page (Next.js 16 + JavaScript + CSS Modules + Framer Motion)
Goal: SEO audit, page rendering tests, link integrity, performance optimization, CI/CD workflow verification via Docker+act, zero ignorance -- then push to GitHub only when fully green locally.
Container: sudo docker with password 123456

---

## Self-Iterative Loop Structure

This plan is NOT a static checklist. Each phase is a full loop:

```
LOOP:
  1. RESEARCH -> Load the specified skills, read the actual source files, understand what exists
  2. GENERATE TODO -> Create a concrete granular checklist based on what the code actually needs
  3. EXECUTE -> Create/modify test files and fix source code issues
  4. VERIFY -> Run bun test / bun run lint / bun run build
  5. IF FAIL: Go to step 2, diagnose failures, fix root causes, re-verify
  6. IF PASS: Move to next phase
END LOOP
```

No human intervention is required between phases. Do not stop at a phase boundary -- continue until all phases complete and the final gate passes.

## Key Differences From App Repos

- This is a marketing/SEO landing page -- no auth, no permissions, no backend API calls
- JavaScript (JS) not TypeScript -- typecheck is effectively noop
- 30+ sub-pages -- mostly content/SEO pages with identical layout patterns
- Complex home page -- app/page.js is ~800 lines with 12 feature groups, FAQ accordion, hero section
- No existing tests -- you will need to install vitest (or use Playwright for E2E)
- Testing priority: Rendering > SEO > Links > Performance > Business Logic
- Current scripts are placeholders -- lint, typecheck, test all echo skip messages

## Scripts That Need Fixing

Current scripts in package.json:
```
"lint": "next lint 2>/dev/null || echo no-lint-config",
"typecheck": "echo typecheck-not-available",
"test": "echo no-tests-configured"
```

You need to install vitest: bun add -d vitest @testing-library/react @testing-library/jest-dom happy-dom
Create vitest.config.js (JS not TS)
Change "test" script to "vitest"
typecheck is skip-able for JS -- just update the script if needed

---

## Phase 0: Codebase Audit and Inventory

Skills to load and use: senior-architect, code-reviewer, senior-qa, ui-ux-pro-max

Research tasks:
- Run bun test (if any tests exist) -- document pass/fail
- Run bun run lint (next lint 2>/dev/null || echo no-lint-config) -- document warnings/errors
- Run bun run build -- document build errors
- Use code-reviewer skill to scan all source files for issues
- Use senior-architect to understand page routing and layout structure
- Use ui-ux-pro-max to evaluate UI component patterns and responsive behavior
- Use senior-qa to identify testing approaches for a JS marketing site
- Count and list ALL pages in app/ directory (expected 30+)
- Count ALL components in components/ directory (expected 10+)
- Check jsconfig.json for path aliases

Generate todo for Phase 1 based on findings.

---

## Phase 1: Page Rendering Tests (30+ pages)

Skills to load and use: senior-frontend, senior-qa, ui-ux-pro-max

For each page (read the actual source):
- Determine what content it renders (sections, headings, links, images, forms)
- Determine the data flow (static content vs dynamic)
- Determine SEO metadata presence (title, description, open graph)

Each page needs tests for:
- Renders without crash
- SEO metadata present (title, description, open graph tags)
- All internal links resolve to existing pages
- Images have alt texts
- No broken CSS classes
- Responsive layout at mobile (375px) and desktop (1440px)

Spawn 4 sub-agents for parallel execution:

Sub-agent 1: Home and Core Pages (page.js, about, blogs, book-demo, contact, free-trial, faq)
Sub-agent 2: SEO Feature Pages (crm, salon-crm-features, salon-dashboard-software, salon-appointment-scheduling-software, salon-invoice-software, salon-inventory-management-software, salon-staff-attendance-software)
Sub-agent 3: More Feature Pages (salon-loyalty-program-software, salon-expense-management-software, salon-inquiry-management, salon-marketing-templates, salon-analytics-software, mobile-app)
Sub-agent 4: Policy and Blog Pages (privacy-policy, shipping-policy, terms-conditions, cancellation-policy, careers, 4 blog posts, remaining content pages)

Verify: bun test

Loop until all pass.

---

## Phase 2: Component Unit Tests (8+ components)

Skills to load and use: senior-frontend, ui-ux-pro-max, senior-qa

For each component (read the actual source):
- Determine its props interface
- Determine its render variants
- Determine edge cases (null/undefined props, missing data)

Spawn 2 sub-agents:

Sub-agent 1: Core Components (Navbar, Footer, AnimatedSection, StaggerContainer/StaggerItem)
Sub-agent 2: Content Components (FeaturePage, PageHero, BlogPostLayout, blog/* components)

Verify: bun test

Loop until all pass.

---

## Phase 3: Link Integrity and Navigation Tests

Skills to load and use: code-reviewer, senior-qa

Tasks:
- ALL internal links resolve to existing pages (no 404s)
- ALL external links have rel="noopener noreferrer"
- Navbar navigation links work for all sections
- Blog post links resolve correctly
- CTA buttons link to correct conversion pages (book-demo, free-trial, contact)
- FAQ accordion expands/collapses correctly
- Feature page cards link to individual feature pages

Can be done as a single sub-agent or script:
Sub-agent: Crawl all pages, extract all internal links, verify they resolve to existing pages. Check external links for noopener/noreferrer. Test FAQ accordion behavior.

Verify: bun test

Loop until all pass.

---

## Phase 4: SEO Audit Tests

Skills to load and use: senior-architect, code-reviewer

Tasks:
- app/layout.js -- verify metadata:
  - Title is "Swalook - Revenue Generation Engine For The Beauty Industry"
  - Description is present
  - Keywords contain all target SEO terms
  - OpenGraph title/description/url/siteName/type are set
- Every sub-page has unique, descriptive title and meta description
- No duplicate title tags across the site
- Canonical URLs present where needed
- robots.txt exists in public/
- sitemap.xml exists at root (check swalook repo root)
- Image alt texts on all Image and img tags
- Heading hierarchy (h1 to h2 to h3) is logical on every page
- No broken internal links

Can be done as a single sub-agent:
Sub-agent: Check every page for unique title/description, verify metadata in layout.js, check heading hierarchy, verify image alt texts, check robots.txt and sitemap.xml exist.

Verify: bun test

Loop until all pass.

---

## Phase 5: Performance and Bundle Tests

Skills to load and use: senior-devops, senior-frontend

Tasks:
- Run next build -- succeeds with no errors
- Verify bundle size -- no unexpectedly large dependencies
- Check for image optimization (Next.js Image component usage)
- Check for unused CSS classes in CSS modules
- Verify Framer Motion animations don't cause layout shift
- Check for render-blocking resources
- Verify static generation (SSG) is used where possible

Loop until build passes.

---

## Phase 6: CI/CD Workflow Validation via Docker+act

Skills to load and use: senior-devops

Tasks:
- Verify Docker: sudo docker info (password: 123456)
- Install/update act: curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
- Test validate-pull-request.yml via act -- lint job first, then full pipeline (lint, typecheck, test, build, security-scan, quality-and-config, seo-audit)
- Test promote-staging.yml via act
- Test release-weekly.yml via act (dry-run)
- Fix any workflow/act compatibility issues
- Verify composite actions work: .github/actions/setup/, .github/actions/security-scan/

Loop until all jobs green.

---

## Phase 7: Scripts and Tooling Improvements

Skills to load and use: senior-frontend, senior-qa

Tasks:
- Install vitest and @testing-library/react: bun add -d vitest @testing-library/react @testing-library/jest-dom happy-dom
- Create vitest.config.js with happy-dom environment
- Change "test" script in package.json from "echo no-tests-configured" to "vitest"
- Create a basic test setup file for the testing library
- Optionally add proper lint config if current one is too loose
- Update validate-before-push.sh if needed

Verify: bun test (should show 0 tests or pass with placeholder)

Loop until scripts work.

---

## Phase 8: Edge Case and Error Handling Tests

Skills to load and use: senior-frontend, senior-qa, ui-ux-pro-max

Tasks:
- 404 page renders for unknown routes
- Error boundary catches rendering errors
- All forms (book-demo, contact, free-trial) validate input
- FAQ accordion is keyboard accessible (Enter/Space to toggle)
- Mobile menu opens/closes correctly
- All animations gracefully degrade on reduced-motion preference

Loop until all pass.

---

## Phase 9: Security and Config Verification

Skills to load and use: senior-security

Tasks:
- Check next.config.mjs for security headers (X-Frame-Options, CSP)
- Verify no API keys or secrets in source code
- Check form submissions don't expose internal endpoints
- Verify no hardcoded credentials
- Check Framer Motion version for known vulnerabilities
- Verify image optimization config in next.config.mjs

Loop until all checks pass.

---

## Phase 10: Green Status -- Full Pipeline Verification

Skills to load and use: senior-qa, senior-devops

Run ALL the following checks. If ANY fails, diagnose and fix before re-running all checks:

- bun run lint -- 0 errors (install eslint if needed, or verify next lint works)
- bun run build -- 0 errors (critical -- Next.js build must pass)
- bun run test -- passes (once vitest is configured and all tests written)
- sudo act -W .github/workflows/validate-pull-request.yml -- all jobs green (lint, typecheck, test, build, security-scan, quality-and-config, seo-audit)
- sudo act -W .github/workflows/promote-staging.yml -- all jobs green
- scripts/validate-before-push.sh passes
- Home page renders all 12 feature groups without errors
- Every internal link resolves to an existing page
- Layout has correct SEO metadata (title, description, OG tags)
- Images have alt texts

Loop until ALL of the above pass simultaneously.

Only then is local verification complete.

---

## Hard Rules

- Do NOT push to GitHub at the end -- this is local verification only
- Do NOT skip any phase -- each phase builds on the previous
- Do NOT convert JS to TS -- this repo is JavaScript
- Do NOT add TypeScript -- the jsconfig.json uses JS mode
- Do NOT modify the home page's layout/content unless a test reveals a bug
- Do NOT over-engineer tests -- focus on rendering, SEO, links, and performance
- Do NOT silence errors with try/catch -- fix the root cause in source code
- Do NOT stop at "good enough" -- every page must render, every link must work
- Do NOT use emojis in any output or file content
- Do NOT treat this document as a static checklist -- research the actual code each phase
- Each phase must generate its own granular todo list after research
- If a sub-agent fails, diagnose and retry -- do not skip it
- The final gate is when ALL of Phase 10 checks pass simultaneously -- that is the only signal that the repo is ready
