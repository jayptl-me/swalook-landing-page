# Swalook CI/CD Pipeline — Production-Grade Implementation Plan

> **Rules:** Monday auto-merge by weekly-release cron. ci-promote.yml creates PR only (no merge — waits for Monday cron).  
> **GitHub Free Tier:** Branch protection rules block merge on red checks.  
> **Pipeline:** live-testing (exhaustive) → staging (integration) → main (weekly Auto PR + auto-merge)

---

## Phase 0: Repository-Level Setup

For each repo, before any workflows run:
- [ ] Enable branch protection on `main`, `staging`, `live-testing`:
  - Require status checks to pass before merge
  - Require branches to be up to date
  - Do NOT allow bypasses
- [ ] Configure required status check names in branch protection (exact job names from workflows)
- [ ] Set up `GITHUB_TOKEN` permissions (auto-provided, but verify write access for PR creation)

---

## Phase 1: swalook-node (Hono/Bun/MySQL Backend)

### Workflow A: `live-testing` — GATEKEEPER (NO bypass)

**File:** `.github/workflows/ci-live-testing.yml`  
**Trigger:** `pull_request` to `live-testing` + `push` to `live-testing`  
**Rule:** ALL jobs must pass. If ANY fails → NO PR to staging is created.

| # | Job | Tool/Command | What it catches |
|---|-----|-------------|-----------------|
| 1 | cleanup | `Mattraks/delete-workflow-runs@v2` | Frees action minutes (free tier: 2000 min/mo) |
| 2 | lint | `bunx eslint .` | Code style & common mistakes |
| 3 | typecheck | `bun run typecheck` (`tsc --noEmit`) | Type errors, broken interfaces |
| 4 | unit-tests | `bun run test` (MySQL + Redis containers) | Logic errors, regressions |
| 5 | migration-validation | `ls -1 migrations/*.sql / sort / count` | Broken or unrun migrations |
| 6 | api-smoke-test | `curl /api/v1/health` | Server boots correctly |
| 7 | docker-build | `docker build --target production` | Dockerfile works |
| 8 | bun-audit | `bun audit` | Known dependency vulnerabilities |
| 9 | trivy-fs | `aquasecurity/trivy-action@master` (fs, SARIF) | File-system vulns (CRITICAL+HIGH) |
| 10 | trivy-container | `aquasecurity/trivy-action@master` (image) | Container image vulns |
| 11 | codeql | `github/codeql-action/init/autobuild/analyze@v3` | Code quality & security patterns |
| 12 | gitleaks | `gitleaks/gitleaks-action@v2` | Hardcoded secrets, API keys |
| 13 | dependency-review | `actions/dependency-review-action@v4` (fail-on-severity: high) | Supply chain attacks |
| 14 | env-config-validation | grep checks on `.env.example`, `Dockerfile`, `tsconfig.json` | Missing configs |
| 15 | secret-scan | `grep -rn password/secret/key/token --include='*.ts'` | Hardcoded creds in source |

**On success (push):** Auto PR `live-testing` → `staging` is created.  
**On failure:** NO PR. The PR author sees red checks and must fix.

### Workflow B: `staging` — Integration Checks

**File:** `.github/workflows/ci-staging.yml`  
**Trigger:** `push` to `staging` (after live-testing PR is merged)  
**Rule:** Integration tests run. If all pass → Auto PR `staging` → `main` is created.

| # | Job | What it does |
|---|-----|-------------|
| 1 | integration-tests | `bun run test` (MySQL + Redis) — full suite again with production-like env |
| 2 | migration-order | Validate chronological ordering of migration files |
| 3 | env-coverage | List all required env vars from `.env.example` |

**On success:** Auto PR `staging` → `main` created with label `auto-promotion`.  
**Monday auto-merge by weekly-release cron.** PR is created and merged automatically.

### Workflow C: `main` — Weekly Monday Auto-Merge

**File:** `.github/workflows/cd-release.yml`  
**Trigger:** Cron `30 15 * * 1` (Monday 9PM IST) + `workflow_dispatch`  
**Rule:** Creates/checks PR `staging` → `main`. If exists and green → merge is triggered manually or via a secondary review.

| # | Job | What it does |
|---|-----|-------------|
| 1 | weekly-release | Finds or creates PR `staging` → `main`. Labels: `auto-promotion`, `weekly-promotion`. |

**Monday auto-merge by weekly-release cron.** The workflow creates and merges the promotion PR automatically.  
Cron only creates the PR if none exists — nothing forces a merge.

---

## Phase 2: crm-super-admin (Next.js Turborepo)

### Workflow A: `live-testing` — GATEKEEPER

| # | Job | Tool |
|---|-----|------|
| 1 | cleanup | `Mattraks/delete-workflow-runs` |
| 2 | lint | `bun run lint` (turbo + next lint) |
| 3 | typecheck | `bun run typecheck` (turbo typecheck + scripts) |
| 4 | test | `bun run test` (vitest, jsdom) |
| 5 | admin-endpoint-tests | `bun vitest run tests/admin-module-endpoints.test.ts` |
| 6 | auth-contract-tests | `bun vitest run tests/auth-endpoint-contract.test.ts` |
| 7 | build | `bun run build` (turbo build) |
| 8 | bun-audit | `bun audit` |
| 9 | trivy-fs | `aquasecurity/trivy-action` (table output) |
| 10 | codeql | `github/codeql-action` (JS/TS) |
| 11 | gitleaks | `gitleaks/gitleaks-action@v2` |
| 12 | dependency-review | `actions/dependency-review-action` |
| 13 | console-log-detection | `grep -rn console.log apps/web/` (exclude tests) |
| 14 | secret-scan | `grep -rn password/secret/key apps/web/` |
| 15 | config-validation | `render.yaml`, `docker-compose.prod.yml`, `.env.example`, `turbo.json` |

### Workflow B: `staging` — Integration

| # | Job | What it does |
|---|-----|-------------|
| 1 | integration | `bun run build` → `bun run test` → env config validation |
| 2 | auto-promote-main | Creates PR `staging` → `main` (if none exists) — labels: `auto-promotion` |

### Workflow C: `main` — Weekly Monday Auto-Merge

Same as swalook-node — Monday auto-merge by weekly-release cron.

---

## Phase 3: swalook-frontend-new (Next.js Turborepo)

### Workflow A: `live-testing` — GATEKEEPER

| # | Job | Tool |
|---|-----|------|
| 1 | cleanup | `Mattraks/delete-workflow-runs` |
| 2 | lint | `bun run lint` |
| 3 | typecheck | `bun run typecheck` |
| 4 | test | `bun run test` (vitest, jsdom) |
| 5 | contract-tests (17) | Loop: `bun vitest run tests/*.test.ts|.tsx` — each individually |
| 6 | build | `bun run build` (turbo build) |
| 7 | bun-audit | `bun audit` |
| 8 | trivy-fs | `aquasecurity/trivy-action` |
| 9 | codeql | `github/codeql-action` (JS/TS) |
| 10 | gitleaks | `gitleaks/gitleaks-action@v2` |
| 11 | dependency-review | `actions/dependency-review-action` |
| 12 | console-log-detection | `grep -rn console.log apps/web/` |
| 13 | secret-scan | `grep -rn password/secret/key apps/web/` |
| 14 | config-validation | `render.yaml`, `docker-compose.prod.yml`, `.env.example`, `turbo.json` |

### Workflow B: `staging` — Integration

Same pattern: build → test → env validation → Auto PR to main.

### Workflow C: `main` — Weekly Monday Auto-Merge

Monday cron. Same pattern.

---

## Phase 4: swalook-landing-page (Next.js Marketing)

### Workflow A: `live-testing` — GATEKEEPER

| # | Job | Tool |
|---|-----|------|
| 1 | cleanup | `Mattraks/delete-workflow-runs` |
| 2 | lint | `bunx eslint .` |
| 3 | typecheck | `bunx tsc --noEmit` (graceful — jsconfig in use) |
| 4 | build | `bun run build` (next build) |
| 5 | test | `bunx vitest run` (if tests exist) |
| 6 | seo-audit | Check: metadata, sitemap.js, robots.txt, security headers in next.config.mjs, image optimization |
| 7 | bundle-size | `du -sh .next/` |
| 8 | bun-audit | `bun audit` |
| 9 | trivy-fs | `aquasecurity/trivy-action` |
| 10 | gitleaks | `gitleaks/gitleaks-action@v2` |
| 11 | dependency-review | `actions/dependency-review-action` |
| 12 | secret-scan | `grep -rn password/secret/api_key/token app/ components/ lib/` |

### Workflow B: `staging` — Integration

Build + asset validation + env config check → Auto PR to main.

### Workflow C: `main` — Weekly Monday Auto-Merge

Monday cron. Same pattern.

---

## Pipeline Rules (Common to All 4 Repos)

### Branch Protection Rules (configure in GitHub Settings → Branches)

**For `main`:**
- Require pull request before merging
- Require status checks to pass (must include all jobs from ci-live-testing + ci-staging)
- Require branches to be up to date
- Do NOT allow bypasses
- Monday cron auto-merges PR from staging (see cd-release.yml)

**For `staging`:**
- Require pull request before merging (from live-testing)
- Require status checks to pass
- ci-promote.yml creates PR only (no merge — waits for Monday cron which auto-merges)

**For `live-testing`:**
- Require pull request before merging (from dj/* branches)
- Require status checks to pass (ALL jobs)
- No auto-merge (human reviews the PR — ci-validate.yml creates PR only)

### Auto PR Rules (in workflow code)

```
- Only creates PR if one doesn't already exist (dedup)
- PR title format: "chore: promote <source> to <target> (YYYY-MM-DD)"
- Labels: auto-promotion (all stages), weekly-promotion (main only)
- Uses gh pr create with --base and --head
```

### What BLOCKS an Auto PR

The Auto PR job has `needs:` on ALL previous jobs. If any job fails:
- The Auto PR job never runs
- No PR is created
- The PR author sees red X and must fix

### What ALLOWS an Auto PR

ALL prior jobs must succeed. The Auto PR runs and creates the promotion PR.

### Security Job Chain Order

```
lint → typecheck → test → build → security (audit/trivy/codeql/gitleaks/dep-review) → quality (console/secret/config) → auto-promote
```

### Free Tier Optimizations

- `concurrency` group with `cancel-in-progress: true` — cancels duplicate runs
- `cleanup` job deletes runs older than 7 days, keeps only 20
- Cache `node_modules` with hash of lockfile
- Use `continue-on-error: true` on non-blocking checks (e.g., container scan) — these report but don't block
- Trivy table output instead of SARIF where CodeQL already provides SARIF

---

## Implementation Order

1. Phase 0: Set up branch protection on all 4 repos (main/staging/live-testing)
2. Phase 1: Implement swalook-node workflows first (most complex)
3. Phase 2: Implement crm-super-admin workflows
4. Phase 3: Implement swalook-frontend-new workflows
5. Phase 4: Implement swalook-landing-page workflows
6. Phase 5: Create GitHub Issue/PR templates for each repo
7. Phase 6: Test end-to-end flow with a dummy PR

---

## Reference: Existing Test Infrastructure

### swalook-node
- Test runner: `bun test` (Bun built-in)
- Test dir: `src/__tests__/` (currently empty — needs test files)
- Services needed: MySQL 8.0, Redis 7 (for BullMQ)
- Migration files: 22 SQL files in `migrations/`

### crm-super-admin
- Test runner: Vitest v3 (jsdom)
- Test dir: `apps/web/tests/` — 2 test files (admin-module-endpoints, auth-endpoint-contract)
- Workspace: Turborepo v2.9, apps/web as Next.js app

### swalook-frontend-new
- Test runner: Vitest v3 (jsdom v29)
- Test dir: `apps/web/tests/` — 17 test files (analytics, appointments, auth, billing, customer, expense, inventory, invoice, staff-attendance, whatsapp)
- Workspace: Turborepo v2.9, apps/web as Next.js app

### swalook-landing-page
- Test runner: None configured (vitest not installed, no test files)
- No tsconfig (jsconfig only)
- SEO: sitemap.js, robots.txt, security headers in next.config.mjs
