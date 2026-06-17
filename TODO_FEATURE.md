# TODO FEATURE: CI/CD Pipeline Hardening -- swalook-landing-page

## Repo Context

- **URL:** github.com/swalookmain/swalook-landing-page
- **Current Branch:** dj/ci-cd-pipeline (1 commit ahead, 22 commits behind main)
- **Stack:** Next.js 16.2.4, JavaScript (JSX), Vitest 4.x, ESLint 9 flat config, Bun 1.3.4
- **Project Type:** Standalone marketing landing page (static site, no backend auth, no database)
- **Current CI Workflow:** validate-pull-request.yml

## Audit Findings

| Area | Current State | Severity |
|------|---------------|----------|
| typecheck | Runs `echo typecheck-not-available` -- no actual type validation | CRITICAL |
| lint | Runs `next lint 2>/dev/null \|\| echo no-lint-config` -- all errors silently suppressed. The `eslint.config.mjs` file defines browser/node globals and file patterns but does NOT extend any ESLint rule set. No `eslint-config-next`, no `@eslint/js/recommended`, no `eslint-plugin-react`, no `@next/eslint-plugin-next`. The next lint command has nothing to enforce. | CRITICAL |
| test | 3 files (placeholder, link-integrity, SEO metadata) -- file-scraping only, no component tests | HIGH |
| build | `next build` -- real and functional | OK |
| security-scan | Trivy `--exit-code 0`, Bun audit `\|\| true`, Dependency Review `continue-on-error: true` | HIGH |
| promote-to-staging | `gh pr create` wrapped in `\|\| echo` cascades -- failures invisible | MEDIUM |
| cleanup | Deletes all but last 20 runs -- history being erased | MEDIUM |
| branch triggers | Only `live-testing` -- main has zero CI enforcement | HIGH |
| cache strategy | Saves on all branches including ephemeral PR branches | LOW |

## Root Causes

- The project uses plain JavaScript (no TypeScript), so `tsc --noEmit` cannot run as a typecheck step. The placeholder `echo typecheck-not-available` was inserted as a stub.
- `next lint` in Next.js 16 uses ESLint 9 flat config via `eslint.config.mjs`. The `2>/dev/null` redirect hides both config errors and lint violations. Critically, the `eslint.config.mjs` file defines globals and file patterns but does not extend any actual ESLint rule set -- it has no rules to enforce. Even removing the `2>/dev/null` would result in zero violations because the config is empty.
- The `package.json` devDependencies include `eslint ^9.39.4` but do NOT include `eslint-config-next`, `eslint-plugin-react-hooks`, or any other ESLint plugin. These must be installed before the lint job can work.
- Tests were scaffolded quickly to get a green CI signal, not for meaningful coverage.
- All security scan steps were configured with `continue-on-error: true` or `--exit-code 0` to prevent blocking pipeline adoption.

---

## Guided Research Prompts

Before making changes, execute the following research to determine the correct approach for each area.

### 1. Typecheck Configuration

Research the correct way to add type validation to a JavaScript Next.js project. Determine:

- Can `typescript` CLI with `--allowJs --checkJs --noEmit` be used to validate JSDoc annotations in `.js` files without renaming them to `.ts`?
- What `tsconfig.json` options are needed for a mixed JS project? Examine the existing `jsconfig.json` at the repo root and cross-reference with Next.js 16 documentation on JavaScript projects.
- If TypeScript is not desired, what alternative type validation tools exist for JavaScript Next.js projects?
- Load the `senior-frontend` skill and review its test configuration references for Next.js JavaScript projects.

### 2. Lint Configuration (CRITICAL -- Config Has No Rules)

Research the correct ESLint setup for Next.js 16 with flat config. The current `eslint.config.mjs` defines browser/node globals and file patterns but does NOT extend any rule set. Determine:

- What is the correct way to import and extend `eslint-config-next` in flat config format? Next.js 16 provides `eslint-config-next` which bundles `@next/eslint-plugin-next`, `eslint-plugin-react`, and `eslint-plugin-react-hooks`.
- Does `eslint-config-next` require the `next/compat` wrapper for flat config, or does it export a flat config array directly in v16?
- What is the minimum configuration needed in `eslint.config.mjs` to enable Next.js recommended rules?
- What ESLint plugins need to be installed in `package.json` devDependencies? Currently only `eslint` is present. `eslint-config-next`, `eslint-plugin-react-hooks`, and `@eslint/js` may be needed.
- Load the `senior-frontend` skill and review its linting reference for Next.js.

### 3. Test Suite Definition

Research the correct test strategy for a Next.js static marketing page. Determine:

- What type of tests are appropriate for a landing page that has no backend, no auth, and no database? Consider: unit tests for utility functions, component render tests, link integrity tests, and visual regression tests.
- Does the current `vitest.config.js` properly support JSX rendering with `@testing-library/react` and `happy-dom`? Cross-reference the existing config with Next.js 16 Vitest setup documentation.
- What mocking is needed for Next.js components that use `next/image`, `next/link`, or `next/navigation`? Read the existing `Navbar.js` and `Footer.js` to identify external dependencies.
- Load the `senior-qa` skill and review its testing strategies reference for Next.js.

### 4. Token-Free Security Scanning

Research the correct configuration for security tools that require no API tokens. Determine:

- Does `actions/dependency-review-action@v4` require any token or API key on public repositories?
- Does `bun audit` require any network access beyond what GitHub Actions provides? Confirm the `--audit-level` flag works.
- Does Trivy require any database download or API call before scanning? Can a GitHub Actions cache be used for the Trivy vulnerability database to avoid repeated downloads?
- Does Gitleaks require a license key when running via Docker (`docker run zricethezav/gitleaks:latest`)? Note: The license requirement applies to the `gitleaks/gitleaks-action` GitHub Action, NOT to the Docker CLI.
- Load the `senior-security` skill and review its scanning tool configuration reference.

---

## Required CI/CD Workflow Specification

The final workflow must contain exactly these jobs, with no failure masking, no suppressed exit codes, and no `|| true` or `continue-on-error: true` patterns (except where explicitly noted for informational checks).

### Job 1: cleanup

- Runs on all workflow invocations
- Deletes workflow runs older than 7 days, not limited to 20 runs
- Must preserve at least 7 days of run history
- Uses `|| true` only on the individual `gh run delete` command, not on the filtering logic

### Job 2: lint

- Installs `eslint-config-next`, `eslint-plugin-react-hooks`, and `@eslint/js` as devDependencies
- Updates `eslint.config.mjs` to import and extend `eslint-config-next` flat config
- Runs `next lint` without any output suppression
- Must fail the job if any lint rule is violated
- No `2>/dev/null`, no `|| echo`, no `exit 0` on failure

### Job 3: typecheck

- Must perform actual code validation. Options:
  - Option A: Remove the job entirely if the project remains pure JavaScript and no type validation tool is adopted
  - Option B: Run `npx tsc --allowJs --checkJs --noEmit --pretty` if a tsconfig.json with appropriate settings is added
  - Option C: Run a JSDoc validation tool
- Must fail the job if type errors are found
- No `echo` stubs

### Job 4: test

- Runs `vitest --run` (existing setup)
- Must include at minimum: existing placeholder tests, existing link-integrity tests, existing SEO metadata tests, AND newly created component render tests for Navbar and Footer
- Must fail the job if any test fails
- Coverage reporting is optional but recommended

### Job 5: build

- Runs `next build` (existing setup, correct)
- Must fail the job if the build fails
- No changes needed to this job

### Job 6: security-scan

- Runs the following tools, all configured to fail the build on findings:
  - `actions/dependency-review-action@v4` -- no `continue-on-error: true`
  - `bun audit --audit-level high` -- no `|| true` fallback. Use `--audit-level high` to only fail on High/Critical findings.
  - Trivy filesystem scan -- must use `--exit-code 1` instead of `--exit-code 0`. Consider caching the vulnerability database. Use a pinned version tag (e.g., `aquasec/trivy:0.60.0`) to avoid supply-chain risk.
  - Gitleaks via Docker (`docker run zricethezav/gitleaks:latest`) -- no license key needed for Docker-based approach. No `|| true` fallback.

### Job 7: quality-and-config

- Runs grep checks for console.log and hardcoded secrets
- Validates presence of `.env.example` and `render.yaml`
- These are informational checks -- use `exit 0` explicitly instead of `|| true`
- Must NOT fail the build for console.log counts or secrets pattern matches

### Job 8: promote-to-staging

- Only runs on push to `live-testing` branch
- Checks if a PR from `live-testing` to `staging` already exists
- Creates the PR only if one does not exist
- The `gh pr create` command must NOT be wrapped in `|| echo` cascades -- let it fail visibly if something is wrong
- The `gh pr list` check must use `|| true` only to handle the case where no PRs exist (empty list), not to mask errors

### Workflow-Level Configuration

- Concurrency group: `ci-validate-${{ github.ref }}` with `cancel-in-progress: true` -- already correct
- Triggers: `pull_request` to `main` and `live-testing`; `push` to `main`, `live-testing`, and `staging`; `workflow_dispatch`
- Cache: Restore from base branch caches on all runs, but only save new caches on `main`, `staging`, and `live-testing`
- Phase 7 (branch triggers) must be implemented BEFORE the merge pipeline starts, otherwise merges to staging and main will not be CI-gated

---

## Implementation Phases

### Phase 1: Fix Lint (CRITICAL -- 15 minutes)

**Context:** The current `eslint.config.mjs` has no rules. It defines globals and file patterns but does not extend any ESLint rule set. The `package.json` does not have `eslint-config-next` installed.

**Steps:**
1. Read the existing `eslint.config.mjs` file to understand its current structure
2. Install the required ESLint packages:
   ```bash
   bun add -d eslint-config-next eslint-plugin-react-hooks @eslint/js
   ```
3. Rewrite `eslint.config.mjs` to import and extend Next.js flat config:
   ```javascript
   import { FlatCompat } from "@eslint/eslintrc";
   import js from "@eslint/js";
   import path from "path";
   import { fileURLToPath } from "url";

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);

   const compat = new FlatCompat({
     baseDirectory: __dirname,
   });

   export default [
     js.configs.recommended,
     ...compat.extends("next/core-web-vitals"),
     {
       ignores: ["node_modules/**", ".next/**", "out/**"],
     },
   ];
   ```
   Or use the native flat config approach if `eslint-config-next` v16 supports it (check during research).
4. Change `package.json` lint script from `next lint 2>/dev/null || echo no-lint-config` to `next lint`
5. Run `bun run lint` locally to verify violations are detected
6. Fix any violations or add appropriate rule overrides
7. Commit and push

**Effort:** 15 minutes
**Risk:** Medium -- the ESLint config needs to be rewritten from scratch, not just fixed

### Phase 2: Fix Typecheck (CRITICAL -- 15 minutes)

**Steps:**
1. Determine which option to use (A: remove typecheck, B: add tsc with allowJs, C: JSDoc validation)
2. For Option B: Create `tsconfig.json` at repo root with `"allowJs": true`, `"checkJs": true`, `"noEmit": true`, `"jsx": "preserve"`, `"moduleResolution": "bundler"`, `"paths": { "@/*": ["./*"] }`
3. For Option B: Update `package.json` typecheck script to `tsc --noEmit --pretty`
4. For Option A: Remove the typecheck job entirely from the workflow YAML
5. Commit and push

**Effort:** 15 minutes
**Risk:** Medium -- Option B may surface JSDoc type errors that need fixing across 30+ files

### Phase 3: Add Component Tests (HIGH -- 30 minutes)

**Steps:**
1. Read `components/Navbar.js` and `components/Footer.js` to identify external imports (next/image, next/link, next/navigation hooks)
2. Create `__tests__/components/` directory
3. Create `__tests__/components/Navbar.test.jsx`:
   - Test that the brand name or logo renders
   - Test that navigation links are present
   - Mock `next/link` and `next/image` as needed
4. Create `__tests__/components/Footer.test.jsx`:
   - Test that social media links render
   - Test that the copyright text is present
   - Mock `next/link` as needed
5. Run `bun run test` locally to verify all 5 tests pass
6. Commit and push

**Effort:** 30 minutes
**Risk:** Low -- component render tests with mocked Next.js dependencies are well-documented

### Phase 4: Fix Security Scans (HIGH -- 5 minutes)

**Steps:**
1. In the workflow YAML, remove `continue-on-error: true` from the Dependency Review step
2. Remove `|| true` from the Bun audit command; change to `bun audit --audit-level high`
3. Change Trivy `--exit-code 0` to `--exit-code 1`; pin version to `aquasec/trivy:0.60.0`
4. Verify Gitleaks step has no `|| true` fallback (Docker-based approach does not need a license key)
5. Replace `|| true` in quality check grep commands with explicit `exit 0`
6. Commit and push

**Effort:** 5 minutes
**Risk:** Low -- these changes only affect exit code handling, not tool behavior

### Phase 5: Fix Promote-to-Staging (MEDIUM -- 5 minutes)

**Steps:**
1. Rewrite the promote-to-staging step to:
   - Use `gh pr list` with `|| echo "0"` only to handle empty list, not to mask errors
   - Remove all `|| echo "PR create skipped"` and `|| echo "PR creation failed"` fallbacks
   - Let `gh pr create` fail naturally if something is wrong
2. Commit and push

**Effort:** 5 minutes
**Risk:** Low

### Phase 6: Fix Cleanup Retention (MEDIUM -- 5 minutes)

**Steps:**
1. Replace the cleanup job logic from "keep last 20" to "delete runs older than 7 days"
2. Use `gh run list --json databaseId,createdAt` with date filtering (see CROSS-REPO-CI-CD-PRIORITIES.md for exact command)
3. Commit and push

**Effort:** 5 minutes
**Risk:** Low

### Phase 7: Fix Branch Triggers (HIGH -- 2 minutes)

**Steps:**
1. Update the workflow `on:` section to include:
   ```yaml
   pull_request:
     branches: [main, live-testing]
   push:
     branches: [main, live-testing, staging]
   ```
2. Commit and push

**Important:** This phase must be implemented BEFORE starting the merge pipeline. Without it, the merge flow will not be CI-gated.

**Effort:** 2 minutes
**Risk:** Low

### Phase 8: Fix Cache Strategy (LOW -- 5 minutes)

**Steps:**
1. Update `.github/actions/setup/action.yml` to use `actions/cache/restore@v4` for restore
2. Add a conditional `actions/cache/save@v4` step that only runs when `github.ref_name` is `main`, `staging`, or `live-testing`
3. Commit and push

**Effort:** 5 minutes
**Risk:** Low -- cache restore still works for all branches; only save behavior changes

---

## Implementation Order

| Phase | Description | Priority | Effort | Dependencies |
|-------|-------------|----------|--------|-------------|
| 1 | Fix lint | CRITICAL | 15 min | Research lint config; install ESLint plugins |
| 2 | Fix typecheck | CRITICAL | 15 min | Research typecheck options |
| 3 | Add component tests | HIGH | 30 min | None |
| 4 | Fix security scans | HIGH | 5 min | None |
| 5 | Fix promote-to-staging | MEDIUM | 5 min | None |
| 6 | Fix cleanup retention | MEDIUM | 5 min | None |
| 7 | Fix branch triggers | HIGH | 2 min | None (must precede merge pipeline) |
| 8 | Fix cache strategy | LOW | 5 min | None |

**Total estimated effort:** ~82 minutes

---

## Files to Modify

| File | Modification |
|------|--------------|
| `.github/workflows/validate-pull-request.yml` | typecheck job, security scan exit codes and version pins, Bun audit flags, cleanup retention, branch triggers, promote-to-staging step |
| `.github/actions/setup/action.yml` | Cache restore/save split with conditional on base branches |
| `package.json` | lint script, typecheck script; add `eslint-config-next`, `eslint-plugin-react-hooks`, `@eslint/js` to devDependencies |
| `eslint.config.mjs` | Must be rewritten to import and extend Next.js flat config (currently has no rules) |
| (New) `tsconfig.json` | Only if Option B is chosen for typecheck |
| (New) `__tests__/components/Navbar.test.jsx` | Component render test |
| (New) `__tests__/components/Footer.test.jsx` | Component render test |

---

## Verification Procedure

After implementing all phases:

1. Push the changes to the `dj/ci-cd-pipeline` branch of `swalookmain/swalook-landing-page`
2. The push will trigger the PR validation workflow against `live-testing`
3. Verify every job passes with the correct behavior:
   - **lint:** Runs `next lint`, fails on any violation, shows lint output in logs. The `eslint.config.mjs` must extend a real rule set for this to work.
   - **typecheck:** Either removed or runs tsc validation on JS files, fails on type errors
   - **test:** Runs 5+ tests including new component render tests, all pass
   - **build:** Runs `next build`, produces static export, passes
   - **security-scan:** Runs all four tools (Dependency Review, Bun audit, Trivy, Gitleaks), exits non-zero if any find vulnerabilities. Bun audit uses `--audit-level high` to only fail on High/Critical findings.
   - **quality-and-config:** Reports console.log counts and file presence without masking; does not fail the build for informational warnings
   - **promote-to-staging:** Creates PR to staging on live-testing push, reports success or failure without `|| echo` masking
4. If any job fails, read the log output, fix the underlying issue, commit and push again
5. Once all jobs pass, create a pull request from `dj/ci-cd-pipeline` to `live-testing`

---

## Cross-Repo Dependencies

The following fixes are shared across all four repositories and should be implemented once the landing page is complete:

- Security scan fixes (Phase 4): Identical YAML changes across all repos, except Bun audit flag `--audit-level high` and Trivy version pin
- Cache strategy fix (Phase 8): Identical `.github/actions/setup/action.yml` changes across all repos
- Cleanup retention fix (Phase 6): Identical YAML changes across all repos
- Promote-to-staging fix (Phase 5): Identical YAML changes across all repos
- Branch trigger fix (Phase 7): Identical YAML changes across all repos; must precede the merge pipeline

These cross-repo fixes are documented in `docs/CROSS-REPO-CI-CD-PRIORITIES.md`.
