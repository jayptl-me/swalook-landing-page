# Promotion Pipeline - Todo List (DONE)

## Phase 0: Research & Planning
- [x] Explore all 4 repos for tech stack and test infrastructure
- [x] Create todo.md tracking system
- [x] Research production-grade GitHub Actions patterns for each stack
- [x] Load senior-devops skill for CI/CD best practices

## Phase 1: Branch Synchronization
- [x] swalook-node: main = staging = live-testing at f617bb0
- [x] crm-super-admin: main = staging = live-testing at e740f9d
- [x] swalook-landing-page: main = staging = live-testing at 4df73b2
- [x] swalook-frontend-new: main = staging = live-testing at ed0c0c7

## Phase 2: Rename & Backup Existing Workflows
- [x] promotion.yml renamed to promotion-v1.yml (all 4 repos)
- [x] weekly-main-promotion.yml renamed to weekly-main-promotion-v1.yml (all 4 repos)
- [x] Existing ci.yml, ci-fast.yml, deploy-staging.yml preserved

## Phase 3: Production-Grade Workflows (12 files total)
- [x] swalook-node ci-live-testing.yml: cleanup, typecheck, unit-tests, security-scan (Trivy+CodeQL+dep-review), docker-build, migration-check, secret-scan, api-smoke, auto-promote
- [x] swalook-node ci-staging.yml: integration tests, migration validation, env check, auto-promote
- [x] swalook-node cd-release.yml: weekly cron + workflow_dispatch auto-merge
- [x] crm-super-admin ci-live-testing.yml: cleanup, lint, typecheck, test (admin+auth endpoints), build, security, quality (console/secret/prod-config/check), auto-promote
- [x] crm-super-admin ci-staging.yml: integration, auto-promote
- [x] crm-super-admin cd-release.yml: weekly cron auto-merge
- [x] swalook-landing-page ci-live-testing.yml: cleanup, lint, typecheck, build, test, seo-audit (metadata/sitemap/robots/security-headers/images), security, quality (bundle/secret/config), auto-promote
- [x] swalook-landing-page ci-staging.yml: integration, auto-promote
- [x] swalook-landing-page cd-release.yml: weekly cron auto-merge
- [x] swalook-frontend-new ci-live-testing.yml: cleanup, lint, typecheck, test (17 contract tests), build, security, quality (console/secret/config/env), auto-promote
- [x] swalook-frontend-new ci-staging.yml: integration, auto-promote
- [x] swalook-frontend-new cd-release.yml: weekly cron auto-merge

## Phase 4: Verification
- [x] All 4 repos pushed to main branch
- [x] All 4 repos synced (main = staging = live-testing)
- [x] All existing workflow files preserved (ci.yml, ci-fast.yml, deploy-staging.yml)
