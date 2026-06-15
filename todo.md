# Swalook CI/CD Pipeline -- Current State

## Pipeline Flow

dj/* -> PR to live-testing -> validate-pull-request.yml (15 checks) -> staging -> promote-staging.yml (3 checks) -> main -> release-weekly.yml (Monday cron: auto-merge + tag + release)

## Workflow Files (all 4 repos have identical files)

.github/workflows/
  validate-pull-request.yml   # PR gate: lint, typecheck, test, build, security-scan, docker-build, promote
  promote-staging.yml         # Stage gate: build, test, env-validation, auto PR to main
  release-weekly.yml          # Monday cron: auto-merge staging->main, create v{date} tag, GitHub Release

## Branch Protection

NOT AVAILABLE on GitHub free plan for private repositories.
3 repos are private (swalook-node, swalook-frontend-new, crm-super-admin) -- no enforcement.
1 repo is public (swalook-landing-page) -- branch protection can be configured in Settings.

Without branch protection, the pipeline still runs all checks on every PR and creates auto-promotion PRs, but cannot block direct pushes to main/staging. Upgrade to GitHub Team ($4/user/month) to enable enforcement.

## CI/CD Services

MySQL 8.0 -- Docker container in CI (mysql:8.0 image, cached in GitHub Actions)
Redis -- NOT NEEDED in CI. bullmq + ioredis are production-only (queue/event system). No test file imports them. Redis container removed from test-with-services to save ~30s per run.
All services run inside GitHub runner containers. No external API calls. No Render/EC2 connections.

## Free Tier Budget

2000 minutes/month free. Projected usage: ~150 min/week = ~600 min/month (well under limit).
Optimizations: concurrency cancel-in-progress, cleanup job (keep 20 runs), node_modules cache.

## MCP Servers for Swalook Development

MCP servers enhance the AI coding assistant with live context. These are the recommended ones:

### Already Available

Tavily Server -- Web search for docs, API references, error debugging (already active)
Filesystem -- Read/write project files (built into the AI)
21st-dev Magic MCP -- UI component library for Next.js frontends (frontend-new, crm-super-admin)

### Worth Installing

Context7 (@upstash/context7-mcp) -- Serves version-specific library docs for Bun, Hono, Drizzle ORM, BullMQ, Next.js 16, Vitest. Prevents hallucinating wrong API signatures.
Requires free API key from context7.com/dashboard.
Install: npx -y @upstash/context7-mcp --api-key YOUR_KEY

### NOT Installing

GitHub MCP (modelcontextprotocol/servers) -- Not needed. gh CLI already covers repo management (PRs, issues, branches, code search). Adding another MCP for what gh already does adds risk without benefit.

## Remaining Gaps (non-blocking)

swalook-node: No eslint (only tsc for linting)
swalook-node: No docker-compose.test.yml for local DB-backed tests
swalook-node: Console.log in production code (needs structured logger)
swalook-landing-page: Placeholder test only (no real tests)
All repos: No E2E tests (no Playwright)
All repos: No visual regression tests
All repos: No load/stress tests

## What Has Been Done

[x] All 4 repos have 3 standard workflows (validate-pull-request, promote-staging, release-weekly)
[x] All 4 repos have 2 composite actions (setup, security-scan)
[x] Workflow files renamed from old names: ci-validate.yml -> validate-pull-request.yml, ci-promote.yml -> promote-staging.yml, cd-release.yml -> release-weekly.yml
[x] Dead files removed: ci.yml (swalook-frontend-new, crm-super-admin), deploy-staging.yml (swalook-node - EC2 specific, undocumented)
[x] release-weekly.yml auto-merges weekly + creates tag + GitHub Release
[x] PR labels standardized (auto-promotion, promotion:live-testing-to-staging, promotion:staging-to-main, weekly-promotion)
[x] feat/ci-cd-pipeline deleted from all remotes (superseded by dj/ci-cd-pipeline)
[x] dj-ci-cd-pipeline (hyphen variant) deleted from crm-super-admin
[x] Redis removed from CI services (no test depends on it)
[x] swalook-node .git fixed (was nested/broken - now clean)

