# Agent Prompt: swalook-landing-page CI/CD and Test Implementation

## Your Mission

Execute the plan in `swalook-landing-page/todo-ci-cd-test-master.md` by iterating through every phase in order. Each phase must complete fully (all checks passing) before moving to the next. Do NOT push to GitHub at the end. Only verify locally that everything is green.

## Self-Iterative Loop Structure

This is a fully automated loop. No human intervention is required between phases. Each phase follows this pattern:

```
LOOP:
  1. RESEARCH -> Load relevant skills (senior-architect, code-reviewer, senior-qa, ui-ux-pro-max) to understand what needs to be done
  2. GENERATE TODO -> Create a concrete checklist of test files and fixes needed for this phase
  3. EXECUTE -> Create/modify test files and source code fixes
  4. VERIFY -> Run bun test / bun run lint / bun run build
  5. IF FAIL: Go to step 2, diagnose issues, fix root causes, re-verify
  6. IF PASS: Move to next phase
END LOOP
```

Each phase generates its own granular todo list based on research of the actual code. Do not treat the todo-ci-cd-test-master.md as a static checklist -- it is a guide. You must read the actual source files to determine exact test requirements.

## Key Differences From App Repos

1. This is a marketing/SEO landing page -- no auth, no permissions, no backend API calls
2. JavaScript (JS) not TypeScript -- typecheck is effectively noop
3. 30+ sub-pages -- mostly content/SEO pages with identical layout patterns
4. Complex home page -- app/page.js is ~800 lines with 12 feature groups, FAQ accordion, hero section
5. No existing tests -- you will need to install vitest (or use Playwright for E2E)
6. Testing priority: Rendering > SEO > Links > Performance > Business Logic
7. Current scripts are placeholders -- lint, typecheck, test all echo skip messages

## Tech Stack

- Runtime: Bun v1.3.14 (bun commands)
- Framework: Next.js 16.2.4 (next commands) -- JavaScript NOT TypeScript
- Styling: CSS Modules (*.module.css) + Tailwind via globals.css
- Animations: Framer Motion v12.38
- Icons: react-icons v5.6 (Fi* icons from feather-icons)
- Testing: Currently no test framework configured -- "echo no-tests-configured"
- Lint: "next lint 2>/dev/null || echo no-lint-config" -- very loose, needs improvement
- Build: next build -- standard Next.js production build
- CI/CD Validation: sudo act with Docker (password: 123456)
- Current Branch: dj/ci-cd-pipeline
- Package Lock: package-lock.json (NOT bun.lock -- this repo uses npm lock alongside bun)

## Scripts To Fix

Current scripts in package.json:
```
"lint": "next lint 2>/dev/null || echo no-lint-config",
"typecheck": "echo typecheck-not-available",
"test": "echo no-tests-configured"
```

You need to:
1. Install vitest: bun add -d vitest @testing-library/react @testing-library/jest-dom happy-dom
2. Create vitest.config.js (JS not TS)
3. Change "test" script to "vitest"
4. Optionally add proper lint config (not required unless builds fail)
5. typecheck is skip-able for JS -- just update the script if needed

## Directory Structure (Key Paths)

```
swalook-landing-page/
├── app/
│   ├── layout.js              # Root layout -- Navbar + Footer + SEO metadata
│   ├── page.js                # Home page (~800 lines, 12 feature groups)
│   ├── globals.css            # Global styles
│   ├── Home.module.css        # Home page styles
│   ├── about/page.js
│   ├── blogs/page.js
│   ├── book-demo/page.js
│   ├── faq/page.js
│   ├── free-trial/page.js
│   ├── contact/page.js
│   ├── crm/page.js
│   ├── salon-crm-features/page.js
│   ├── salon-dashboard-software/page.js
│   ├── salon-appointment-scheduling-software/page.js
│   ├── salon-invoice-software/page.js
│   ├── salon-inventory-management-software/page.js
│   ├── salon-staff-attendance-software/page.js
│   ├── salon-loyalty-program-software/page.js
│   ├── salon-expense-management-software/page.js
│   ├── salon-inquiry-management/page.js
│   ├── salon-marketing-templates/page.js
│   └── ... (7+ more pages: privacy-policy, terms, careers, etc.)
├── components/
│   ├── Navbar.js              # Navigation bar
│   ├── Footer.js              # Site footer
│   ├── AnimatedSection.js     # Scroll-triggered animation wrapper
│   ├── FeaturePage.js         # Feature page template
│   ├── PageHero.js            # Hero section component
│   ├── BlogPostLayout.js      # Blog post layout
│   └── blog/                  # Blog components
├── public/
│   └── images/                # Image assets
├── .github/workflows/         # ci-validate.yml, ci-promote.yml, cd-release.yml
├── scripts/validate-before-push.sh
├── next.config.mjs
├── jsconfig.json
├── eslint.config.mjs
└── package.json
```

## Skills To Use Per Phase

### Phase 0 (Codebase Audit)
Load and use: senior-architect, code-reviewer, senior-qa, ui-ux-pro-max
- Use code-reviewer to scan all source files for issues
- Use senior-architect to understand page routing and layout structure
- Use ui-ux-pro-max to evaluate UI component patterns and responsive behavior
- Use senior-qa to identify testing gaps
- Output: An audit report listing every page, component, and config issue, plus a generated todo for Phase 1

### Phase 1 (Page Rendering Tests -- 30+ pages)
Load and use: senior-frontend, senior-qa, ui-ux-pro-max
- Spawn 4 sub-agents (see below)
- For each page: test that it renders without crash, SEO metadata present, links resolve, images have alt text
- Use @testing-library/react for rendering tests
- Verify with: bun test

### Phase 2 (Component Unit Tests -- 8+ files)
Load and use: senior-frontend, ui-ux-pro-max, senior-qa
- Spawn 2 sub-agents (see below)
- For each component: render variants, props, edge cases, keyboard accessibility

### Phase 3 (Link Integrity -- 30+ links)
Load and use: code-reviewer, senior-qa
- Crawl all pages, extract all internal links, verify they resolve to existing pages
- Check external links for rel="noopener noreferrer"
- Test FAQ accordion expand/collapse

### Phase 4 (SEO Audit -- 10 checks)
Load and use: senior-architect, code-reviewer
- Check every page for unique title/description metadata
- Verify layout.js metadata (title, description, OG tags, keywords)
- Check heading hierarchy on every page
- Verify image alt texts
- Check robots.txt and sitemap.xml exist

### Phase 5 (Performance and Bundle)
Load and use: senior-devops, senior-frontend
- Run next build, verify no errors
- Check bundle size
- Check image optimization config

### Phase 6 (CI/CD Validation via Docker+act)
Load and use: senior-devops
- Verify workflow files run correctly with sudo act
- Fix workflow/act compatibility issues

### Phase 7 (Scripts and Tooling Improvements)
Load and use: senior-frontend, senior-qa
- Fix package.json scripts for lint, typecheck, test
- Install and configure vitest with happy-dom
- Create vitest.config.js

### Phase 8 (Edge Case and Error Handling)
Load and use: senior-frontend, senior-qa, ui-ux-pro-max
- Test 404 page, error boundary
- Test forms validate input (book-demo, contact, free-trial)
- Test keyboard accessibility of FAQ accordion
- Test mobile menu open/close
- Test reduced-motion preference degrades animations

### Phase 9 (Security and Config)
Load and use: senior-security
- Check next.config.mjs for security headers
- Verify no API keys or secrets in source code
- Check form submissions don't expose internal endpoints

### Phase 10 (Green Verification)
- Run ALL checks
- Loop until ALL pass

## Sub-Agent Spawning Strategy

Use spawn_agents for parallel work within a phase. Each sub-agent gets a bounded set of files.

### Phase 1 (Page Rendering Tests -- 30+ pages) -- Spawn 4 sub-agents

Sub-agent 1: Home and Core Pages (page.js, about, blogs, book-demo, contact, free-trial, faq)
Sub-agent 2: SEO Feature Pages (crm, salon-crm-features, salon-dashboard-software, salon-appointment-scheduling-software, salon-invoice-software, salon-inventory-management-software, salon-staff-attendance-software)
Sub-agent 3: More Feature Pages (salon-loyalty-program-software, salon-expense-management-software, salon-inquiry-management, salon-marketing-templates, salon-analytics-software, mobile-app)
Sub-agent 4: Policy and Blog Pages (privacy-policy, shipping-policy, terms-conditions, cancellation-policy, careers, 4 blog posts, remaining content pages)

### Phase 2 (Component Tests -- 8+ files) -- Spawn 2 sub-agents

Sub-agent 1: Core Components (Navbar, Footer, AnimatedSection, StaggerContainer/StaggerItem)
Sub-agent 2: Content Components (FeaturePage, PageHero, BlogPostLayout, blog/* components)

### Phase 3 (Link Integrity) -- Single sub-agent

Sub-agent: Crawl all pages, extract all internal links, verify they resolve to existing pages. Check external links for noopener/noreferrer. Test FAQ accordion behavior.

### Phase 4 (SEO Audit) -- Single sub-agent

Sub-agent: Check every page for unique title/description, verify metadata in layout.js, check heading hierarchy, verify image alt texts, check robots.txt and sitemap.xml exist.

## Docker Usage

- Docker at /usr/bin/docker, run with: sudo docker ... (password: 123456)
- For act: sudo act -j <job-name> -W .github/workflows/<workflow>.yml
- If .env has multiline certs (unlikely on landing page): backup first

## Validation Checklist (Final Gate)

Before reporting completion, ALL of these must pass:

- bun run lint -- 0 errors (install eslint if needed, or verify next lint works)
- bun run build -- 0 errors (critical -- Next.js build must pass)
- bun run test -- passes (once vitest is configured and all tests written)
- sudo act -W .github/workflows/ci-validate.yml -- all jobs green (lint, typecheck, test, build, security-scan, quality-and-config, seo-audit)
- sudo act -W .github/workflows/ci-promote.yml -- all jobs green
- scripts/validate-before-push.sh passes
- Home page renders all 12 feature groups without errors
- All 30+ sub-pages load without crash
- Every internal link resolves to an existing page
- Layout has correct SEO metadata (title, description, OG tags)
- Images have alt texts

## Hard Rules

- Do NOT push to GitHub
- Do NOT skip any phase
- Do NOT convert JS to TS -- this repo is JavaScript
- Do NOT add TypeScript -- the jsconfig.json uses JS mode
- Do NOT modify the home page's layout/content unless a test reveals a bug
- Do NOT over-engineer tests -- focus on rendering, SEO, links, and performance
- Do NOT silence errors with try/catch -- fix the root cause
- Do NOT stop at "good enough" -- every page must render, every link must work
- Do NOT use emojis in any output or file content
- Each phase must research first (load skills, read files), generate its own checklist, execute, then loop until all checks pass
- If a sub-agent fails, retry with fixes -- do not skip it
