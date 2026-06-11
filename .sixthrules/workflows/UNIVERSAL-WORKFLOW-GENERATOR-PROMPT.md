# Universal Workflow Generator Prompt

> Copy this entire prompt and give it to any AI coding agent (Claude, Cursor, Codex, Sixth, etc.) in any workspace. It will adaptively scan the codebase, detect the tech stack, research the web for repo-type-specific best practices, spawn sub-agents to cross-verify its own decisions, and generate a complete production-grade `.sixthrules/workflows/` ruleset tailored to that project -- no hardcoded limits, no prescriptive caps, just what the codebase genuinely needs. The agent will iterate until the ruleset is verified working.

---

## PROMPT START

```
You are tasked with creating a complete production-grade workflow ruleset for this project. This ruleset lives under `.sixthrules/workflows/` and is loaded by the AI on every turn to guide its behavior.

The goal is to eliminate hallucination, enforce research-before-action, enable autonomous iterative execution, and maintain a living codebase map. You will adaptively determine what files are needed -- no hardcoded count, no line limits. The codebase decides what it needs. You discover, verify, and deliver.

Do NOT rush. Work through each phase methodically. Verify each decision before committing. Question your own exploration -- if uncertain about a generated file's necessity, spawn a sub-agent to research and cross-verify before committing.

Follow the R-P-E-V-I loop (Research, Plan, Execute, Verify, Iterate) for this task itself. If a verification fails, iterate. If a file grows too large, split it rather than capping it.

The output is a set of workflow files that are DIVIDED intelligently -- one concern per file. If a concern grows, it becomes its own file. No cramming, no arbitrary limits. The structure emerges from the codebase, not from a template.

---

## PHASE 0: DISCOVERY

### 0.1: Top-Level Scan

Scan the top-level directory structure. Identify every distinct project/package (monorepo apps, backend, frontend, landing page, admin, mobile, shared libraries, infra, etc.).

For EACH sub-project, scan its source tree at depth 3. Identify:
   - Entry points (server.ts, main.ts, index.ts, layout.tsx, App.tsx, main.go, etc.)
   - Key directories (routes/, controllers/, services/, components/, lib/, hooks/, etc.)
   - Config files (package.json, tsconfig.json, docker-compose.yml, go.mod, Cargo.toml, etc.)
   - Test directories
   - Build/deploy directories (docker/, k8s/, terraform/, .github/workflows/)

### 0.2: Dependency Extraction

Read EVERY package.json (or equivalent: go.mod, Cargo.toml, requirements.txt, pyproject.toml, Gemfile, mix.exs, build.gradle, pubspec.yaml) to extract:
   - Runtime (Node, Bun, Deno, Python, Go, Rust, Elixir, Java, Dart, etc.)
   - Framework (Next.js, Express, Hono, Fastify, Django, Flask, Gin, Actix, Phoenix, Spring, Flutter, etc.)
   - ORM/DB (Drizzle, Prisma, TypeORM, Mongoose, SQLAlchemy, GORM, Diesel, Ecto, Hibernate, etc.)
   - Key dependencies (auth, validation, queues, caching, etc.)
   - Dev dependencies (testing, linting, build tools)
   - Scripts (dev, build, test, lint, typecheck, migrate, deploy)

### 0.3: Cross-Cutting Concern Detection

Identify every concern that spans multiple files/modules:
   - Auth mechanism (JWT, sessions, OAuth, API keys, Passport, Devise, etc.)
   - RBAC/authorization pattern
   - API style (REST, GraphQL, tRPC, gRPC, WebSocket, SSE)
   - State management (Context, Redux, Zustand, MobX, Pinia, Riverpod, Bloc)
   - CSS approach (Tailwind, CSS Modules, styled-components, Sass, vanilla-extract)
   - i18n/localization (presence of i18n libraries, locale files, RTL support)
   - Payment/billing integration (Stripe, Paddle, LemonSqueezy, Razorpay)
   - File upload/storage pattern (S3, Cloudinary, local filesystem)
   - Email/notification pattern (Resend, SendGrid, Nodemailer, Firebase)
   - Real-time/WebSocket usage
   - Background job/queue system (BullMQ, Sidekiq, Celery, RabbitMQ)
   - Feature flags / A/B testing
   - Analytics / event tracking
   - Rate limiting / throttling

### 0.4: Codebase Scale Assessment

Classify the project scale. This is NOT about capping -- it is about understanding how many files will be needed for adequate coverage. The scale determines how aggressively you DIVIDE concerns into separate files vs combining related ones.

Scale assessment factors:
   - Total source file count across all sub-projects
   - Number of distinct languages/runtimes
   - Number of frameworks in use
   - Monorepo vs single-package
   - Team size indicators (.github/CODEOWNERS, multiple authors in git log)
   - CI/CD complexity (workflow count, deployment targets)
   - Compliance/regulatory domain presence

Use this assessment to GUIDE division: a larger codebase needs MORE separate workflow files (more granular division). A smaller codebase may combine related concerns into fewer files. The goal is RIGHT-SIZED, not MINIMAL.

### 0.5: Repo Type Classification

Classify the project into one or more categories. This classification drives the additional workflow generation. Multiple categories may apply -- combine them intelligently. This table is a STARTING POINT, not a constraint. If you detect a pattern not listed here, create a category for it.

| Category | Detection Signal | Typical Additional Workflow Needs |
|----------|-----------------|-----------------------------------|
| **Monorepo** | Multiple apps/packages in one repo, workspace config, turborepo/lerna/nx | `monorepo-boundaries.md` (package ownership, cross-package import rules, shared dep versioning, build dependency graph) |
| **Microservices** | Multiple independent services, docker-compose with many services, message queues | `service-boundaries.md` (service ownership, inter-service contracts, event schemas, async message format) |
| **Mobile** | React Native / Flutter / Swift / Kotlin directories, ios/ and android/ folders | `mobile-platform-gates.md` (iOS + Android build verification, platform-specific code rules, device testing matrix) |
| **Backend API only** | No frontend directory, only API server | `api-contract-testing.md` (contract tests, OpenAPI/Swagger, versioning, deprecation headers, error standardization) |
| **Frontend only** | No backend, uses external APIs | `api-mocking-strategy.md` (mock server, MSW, contract stubs, network error simulation, loading/empty/error states) |
| **Full-stack** | Both backend + frontend + possibly admin | May add `shared-types-sync.md` if shared types package bridges frontend and backend |
| **Database-heavy** | Many migrations, stored procedures, complex ORM usage, 10+ migration files | `database-migration-protocol.md` (migration creation, rollback safety, seed data, index verification, lock timeout estimation) |
| **CI/CD heavy** | .github/workflows/, docker/, k8s/, terraform/, ansible/, helm/ | `deployment-verification.md` (deploy steps, health checks, rollback protocol, env validation, multi-env promotion) |
| **Security/compliance** | SOC2/HIPAA/GDPR references, audit logs, encryption at rest, pen-test reports | `security-compliance-gates.md` (compliance checks, audit trail, data handling, PII detection, access review) |
| **Open source** | LICENSE, CONTRIBUTING.md, public repo, no private deps | `oss-contribution-workflow.md` (contributor guidelines, changelog format, versioning, PR template, semantic-release) |
| **Data pipeline** | ETL scripts, data/ directories, streaming configs (Kafka, Spark, Airflow, dbt) | `data-integrity-checks.md` (schema validation, backfill protocol, pipeline monitoring, data quality gates) |
| **Multi-language** | Multiple language runtimes (Node + Python + Go, etc.) | `cross-language-contracts.md` (shared types/protobuf, cross-runtime testing, polyglot build order, FFI rules) |
| **i18n/L10n** | i18n library detected, locale/*.json, translation files, RTL support | `localization-workflow.md` (translation key rules, fallback language, RTL layout verification, locale-aware formatting) |
| **Real-time** | WebSocket/Socket.io/SignalR/SSE detected | `realtime-testing-protocol.md` (connection lifecycle, reconnect behavior, event schema validation, load test) |
| **SaaS multi-tenant** | Tenant isolation patterns, per-tenant config, schema-per-tenant, tenant_id columns | `tenant-isolation-gates.md` (tenant-scoped queries, cross-tenant leak detection, provisioning, data segregation test) |
| **Package/library** | Published to npm/PyPI/crates.io, public API surface, export maps | `public-api-stability.md` (breaking change detection, semver enforcement, deprecation protocol, changelog automation) |
| **Monolith** | Single large app, no workspace separation | `module-boundaries.md` (internal module contracts, gradual decomposition paths, circular dependency prevention) |
| **Serverless/Edge** | Lambda/functions/edge directories, serverless.yml, vercel.json, wrangler.toml | `serverless-deploy-gates.md` (cold start check, bundle size, timeout verification, env var audit, function IAM scope) |
| **Game development** | Unity/Unreal/Godot project files, .unity/.uasset/.tscn, shader files | `game-asset-pipeline.md` (asset import rules, shader compilation verification, platform build matrix, prefab/scene integrity) |
| **ML/AI/Data Science** | model/ directories, .pkl/.h5/.onnx files, torch/tensorflow in deps, notebooks/ | `ml-reproducibility-gates.md` (model versioning, data versioning, training reproducibility, inference verification, data drift) |
| **Blockchain/Web3** | .sol files, hardhat/truffle/foundry config, contracts/ directory | `smart-contract-gates.md` (gas optimization, security audit protocol, mainnet-fork testing, upgrade safety, event emission) |
| **Embedded/Firmware** | .c/.cpp with toolchain files, Makefile, CMakeLists.txt, linker scripts, .bin/.hex output | `firmware-verification.md` (cross-compilation check, memory budget, hardware-in-loop test, bootloader safety) |
| **Static/Content site** | Hugo/Astro/Jekyll/Eleventy config, content/ or posts/ directory, markdown-heavy | `content-structure-gates.md` (frontmatter validation, link checking, image optimization, build verification, SEO audit) |
| **Legacy migration** | Mix of old + new patterns, both require() and import, dual framework patterns | `migration-bridge-protocol.md` (strangler fig patterns, old-new interface contracts, phased deprecation timeline, dual-run verification) |
| **Multi-repo** | References to other repos in README/docs, multiple .git dirs, git submodules | `multi-repo-context.md` (repo dependency map, cross-repo version pinning, coordinated release protocol) |

### 0.6: Web Research for Repo-Type Best Practices (MANDATORY)

Web research is CRUCIAL and MUST NOT be skipped. The web provides current best practices that no static prompt can contain.

For EACH category detected in 0.5, perform web_search to discover current best practices for AI agent workflows in that repo type. Example queries:
   - "AI coding agent monorepo workflow best practices AGENTS.md turborepo nx 2025"
   - "mobile app AI agent workflow iOS Android build verification 2025"
   - "database migration safety protocol AI coding agent 2025"
   - "open source project AI agent workflow changelog versioning semantic-release 2025"
   - "serverless lambda AI agent deployment verification cold start 2025"
   - "smart contract AI agent security audit gas optimization workflow 2025"
   - "ML model reproducibility AI coding agent workflow 2025"
   - "embedded firmware AI agent cross compilation memory verification 2025"
   - "game development AI agent asset pipeline shader verification 2025"
   - "monorepo shared package dependency graph AI agent build order 2025"

Research strategy:
   - Start with the PRIMARY category (the one most central to the codebase)
   - Research secondary categories ONLY if they have concrete codebase signals
   - If a category has NO concrete codebase structure (e.g., "Mobile" detected but no ios/android dirs), note it as a potential future need but do NOT generate a file for it
   - Budget awareness: each search = ~5 credits. If you detect 5+ categories, research the top 3-4 most impactful ones first. Research the rest only if credits remain.

### 0.7: Self-Questioning Protocol (MANDATORY)

Before proceeding to generation, PAUSE and question your own analysis:

1. What did I MISS in the top-level scan? Are there directories I didn't explore because they seemed irrelevant?
2. Are there TWO categories that could be combined into one workflow file? (e.g., "Microservices" + "Serverless" might share deployment gates)
3. Are there concerns I classified as ONE category that should actually be SPLIT into separate files? (e.g., "Security" might need separate files for auth vs data compliance)
4. Could an AI working on this codebase make a mistake I haven't anticipated? What would that mistake look like?
5. Did I assume something about the tech stack that I haven't verified by reading a file?

If you are UNCERTAIN about any of these, spawn 1-2 sub-agents to research and cross-verify:
   - Agent A: "Scan [specific directory] and report what workflow concerns it raises"
   - Agent B: "Search web for AI agent workflow needs for [detected category] and report any I missed"

Sub-agents are cheap for research. Use them to validate your own analysis. Better to spend 2 extra web searches verifying than to generate incomplete workflows.

### 0.8: AGENTS.md Generation Decision

Based on the industry standard (AGENTS.md adopted by 60,000+ repos, formalized by OpenAI/Google/Cursor/Factory/Sourcegraph in Aug 2025), evaluate whether to ALSO generate a root-level `AGENTS.md` file.

GENERATE `AGENTS.md` if ANY of:
   - The repo has multiple top-level directories/sub-projects
   - The repo is open source (LICENSE detected)
   - Multiple contributors detected (.github/CODEOWNERS, CONTRIBUTING.md, multi-author git log)
   - External AI tools would benefit from a concise entry point

DO NOT generate `AGENTS.md` only if:
   - The repo is a single-person private project with < 50 source files AND no external AI tool usage
   - Even then: consider a minimal 15-line AGENTS.md that just points to .sixthrules/workflows/

AGENTS.md structure (adapt length to codebase complexity -- no hard line limit):
```
# PROJECT_NAME -- AI Agent Instructions
> Loaded by Cursor, Copilot, Codex, Claude Code, and other AI coding tools.

## Build & Test Commands
(extracted from package.json scripts -- include ALL relevant scripts, not just build/test)

## Code Style & Conventions
(key rules derived from the codebase: import style, naming, formatting, error handling)

## Project Architecture
(concise map: what lives where, key boundaries, cross-cutting concerns)

## Critical Rules
(absolute rules discovered from the codebase: never do X, always do Y)

## Workflow Files
Reference: See `.sixthrules/workflows/` for detailed agent workflows including
research protocols, quality gates, sub-agent orchestration, and domain-specific guides.

## Domain-Specific Quick Ref
(1-2 lines per detected category: "DB migrations: see .sixthrules/workflows/database-migration-protocol.md")
```

---

## PHASE 1: GENERATE THE DEFAULT WORKFLOW FILES

These files form the CORE of every workflow ruleset. They establish the shared language, loop discipline, and quality baseline. Generate them FIRST -- they are the foundation that additional files build upon.

### FILE 1: `codebase-index.md`

Purpose: Living surface-level map loaded on every turn. The AI must find exactly what it needs without scanning.

Structure:
- Top-level layout (ASCII tree)
- Per sub-project: concise path-purpose table
- Key cross-cutting concerns table (concern -> exact locations in codebase)
- Database tables/collections summary (if applicable)
- Tech stack per sub-project (one line: runtime + framework + ORM + DB)
- Update protocol (when and how to update this file)

Guidance (not rules, ADAPT):
- NO implementation details. One-line purposes only.
- If a directory has 30+ similar files, use a wildcard summary: "routes/*.ts -> 37 REST API route files"
- If a directory has 5-15 meaningfully different files, list them individually
- Track source directories that an AI would need to find: src/, app/, components/, lib/, routes/, controllers/, services/, middleware/, hooks/, utils/
- NEVER track generated/build artifacts
- The file should be AS LONG AS the codebase needs it to be. A 500-file monorepo needs more index lines than a 30-file solo project. Adapt, don't cap.

### FILE 2: `master.md`

Purpose: Entry point loaded on every turn. Routes the AI to the correct protocol based on task type.

Structure:
- Workflow file map (complete table: file name, purpose, activation trigger). This table MUST include ALL generated files.
- Decision engine (what to do on every turn: load index, classify request, route)
- Protocol router (exhaustive decision tree mapping every conceivable user request to the right protocol):
  - Question about codebase -> direct answer after reading index + relevant files
  - Simple change (few files, one domain) -> research target, execute, verify, done
  - Medium change (moderate files, multiple domains) -> full research loop, sequential execution
  - Large change (many files, multiple domains, parallel work possible) -> multi-pass + sub-agents + full loop
  - Bug fix -> read full error, diagnose to root cause, fix, verify, 3-attempt max then re-research
  - Unknown / ambiguous -> adaptive research protocol
  - Database migration -> database-migration-protocol.md (if generated)
  - Mobile build -> mobile-platform-gates.md (if generated)
  - Deployment -> deployment-verification.md (if generated)
  - (Include routing entries for EVERY additional workflow file generated)
- Quick reference (credit budget, sub-agent strategy, quality gate minimums)
- State machine (ASCII diagram: IDLE -> ROUTING -> RESEARCH/PLAN/ANSWER -> EXECUTE -> PASS/FAIL/MORE -> FIX/RE-RESEARCH/RE-PLAN)
- Per-turn checklist

Rules:
- No emojis. Use ASCII: ->, |, +, -, [, ], =, *, #.
- Decision tree must be EXHAUSTIVE. If a request type doesn't match any route, add a route.
- State machine must show the iterative loop AND failure/recovery paths.
- master.md MUST reference every generated file by exact name, including additional workflow files.
- If master.md grows beyond what fits in a single logical file, split the protocol router into a separate `protocol-router.md` and reference it from master.md. Division over cramming.

### FILE 3: `automation-loop.md`

Purpose: The core goal-driven iterative execution loop. This is the HEART of the system. Research -> Plan -> Execute -> Verify -> Iterate. NEVER stop at "code written" -- stop at "code verified working in the running system."

Structure:
- Phase 1: RESEARCH -- Understand before acting
  - Actions (read index, read files, check package.json, web search, sub-agent research)
  - Output format (knowledge summary covering: current state, files to change, patterns to follow, unknowns)
  - Gate: "Can I explain what needs to change and WHY?" If no -> more research.
- Phase 2: PLAN -- Design before building
  - Break into ordered, independently verifiable steps
  - Identify parallel-izable steps (candidates for sub-agents)
  - Define verification criteria PER STEP (not just "it works" -- concrete checks)
  - Gate: "Is each step independently verifiable?" If no -> break steps down further.
- Phase 3: EXECUTE -- One verified change at a time
  - For each step: make ONE change, verify, pass -> next step, fail -> fix
  - Max 3 fix attempts per step. 3 failures = re-research that step.
  - NEVER batch unrelated changes in one step
  - NEVER move to next step while current step fails
  - ALWAYS re-read the file before editing (interfaces may have changed)
- Phase 4: VERIFY -- Prove it works in the running system
  - Type check (tsc --noEmit, mypy, etc.) = zero errors
  - Build = zero errors, zero warnings
  - Backend changes: curl every affected endpoint (happy path + failure paths), verify status codes + response shapes
  - Frontend changes: open in browser, confirm: no blank screens, no console errors, no layout collapse, mobile viewport clean, all interactive elements work
  - Integration: new code IS reachable (page in nav, endpoint in routes, component imported)
  - Tests: all pass (existing + new), coverage does not decrease
  - Domain-specific verification (adapt to detected categories: mobile builds, DB migration rollback, i18n key completeness, API contract compliance, etc.)
- Phase 5: ITERATE -- Loop until all criteria met
  - Pass -> more steps remain: continue execute loop. All steps done: check completion criteria -> DONE.
  - Fail 1st: diagnose root cause, fix, re-verify.
  - Fail 2nd: try alternative approach to the same step.
  - Fail 3rd: STOP the step. Re-research the whole approach. Possibly re-plan.
- Completion criteria (ALL must be true before attempt_completion)
- Anti-patterns reference (common mistakes -> correct alternative)

### FILE 4: `adaptive-research-protocol.md`

Purpose: Progressive knowledge acquisition. Never hallucinate. Always ground answers in reality -- codebase first, then web, then sub-agents.

Structure:
- Phase 0: Parse user intent (classify: code modification, bug fix, new feature, architecture, library usage, error debugging, security audit, data migration, testing, unknown)
  - For each intent type: primary source and fallback
- Phase 1: Codebase-first search (ALWAYS FIRST for code tasks)
  - Read index -> read most likely files -> targeted regex search -> list unknown dirs
  - Stop condition: found exact code/pattern -> proceed to plan
- Phase 2: Web search (budget-aware, always basic depth, max 5 results)
  - Credit math: each search = ~5 credits, session budget = 20
  - When to search: library docs, error messages, best practices, CVEs, unknown patterns
  - Config enforced: search_depth basic, max_results 5, no include_answer/include_raw_content
- Phase 3: Sub-agent research delegation (for complex multi-domain unknowns)
- Phase 4: Knowledge synthesis (summarize known, list gaps, decide: enough to proceed?)
- Anti-hallucination checklist (must pass before any implementation)

### FILE 5: `sub-agent-orchestration.md`

Purpose: When and how to delegate to sub-agents. 4-phase protocol.

Structure:
- Decision framework: when to spawn vs solo (based on file count, domain count, complexity, independence)
- Phase 1: UNDERSTAND (read reference files, identify patterns, document conventions, list integration points)
- Phase 2: PREPARE CONTRACTS (input contract: what exists, output contract: exact files + exports, shared context: tech stack + conventions)
- Phase 3: SPAWN (format, project_context requirements, integration between agents)
- Phase 4: INTEGRATE (mandatory post-spawn: read all output, fix imports, fix types, fix naming, wire into system, run type-check + build + tests)

### FILE 6: `multi-pass-batch-planning.md`

Purpose: Task decomposition for complex workloads. Break large tasks into passes, passes into batches, batches into independently verifiable steps.

Structure:
- Pass-based execution model (Discovery -> Foundation -> Core -> API -> Frontend -> Integration -> Polish -> Verify)
  - Adapt pass order to the codebase: DB-heavy projects insert Migration pass. Mobile projects insert Platform pass.
- How to size each pass (number of files, dependencies, verification criteria)
- Batch strategies: sequential (foundation, integration), parallel (independent services/routes/components), hybrid
- Example decomposition using the ACTUAL detected tech stack
- Progress tracking per pass
- Re-plan triggers (new dependency discovered, existing code conflicts, sub-agent output wrong, user scope change, 3+ verification failures)
- Emergency brake conditions (stop, report, ask user)

### FILE 7: `code-quality-verification-gates.md`

Purpose: Gates every change must pass before being considered done. Adapt gates to the codebase.

Structure (add/remove gates based on what the codebase actually has):
- Gate: Type Safety (tsc --noEmit or equivalent for detected language)
- Gate: Import/Module Integrity (every import resolves, no circular deps, packages in manifest)
- Gate: Build (zero errors, zero warnings)
- Gate: Tests (all pass, new code covered, coverage does not decrease)
- Gate: Backend Verification (if backend exists: curl endpoints, test failure paths, response shapes)
- Gate: Frontend Verification (if frontend exists: page renders, interactive elements, mobile viewport, all states covered)
- Gate: Integration Completeness (new code reachable: page in nav, endpoint in routes, component imported)
- Gate: Code Structure (one concern per file, functions single-responsibility, barrel exports, no dead code)
- Gate: Naming (verbs for functions, predicates for booleans, plurals for arrays, PascalCase components, kebab-case files)
- Gate: Documentation (codebase-index.md updated, complex logic commented, .env.example updated)
- (ADD domain-specific gates for each detected category: Database Migration Safety, Mobile Platform Build, i18n Key Completeness, API Contract Compliance, Security Scan, Cold Start Budget, Gas Optimization, etc.)
- Minimum gates before attempt_completion (clearly stated)

### FILE 8: `codebase-index-update-protocol.md`

Purpose: Keep the living index accurate. Stale index = blind AI navigating by guesswork.

Structure:
- When to update (REQUIRED: file created/deleted/renamed/moved, new directory, package.json changed. OPTIONAL: content change without structural change)
- How to update (add/remove/rename rows, update section intros, collapse when a directory outgrows individual listing)
- Token efficiency guidance (as the index grows, use wildcards more aggressively; as it shrinks, list more granularly)
- Self-healing protocol (periodic spot-check: verify random index paths exist, scan for obviously missing files)

---

## PHASE 1.5: GENERATE ADDITIONAL REPO-SPECIFIC FILES

This is the ADAPTIVE phase. Based on your PHASE 0.5 classification, PHASE 0.6 web research, and PHASE 0.7 self-questioning, determine which additional workflow files the codebase needs.

### Decision Framework

For EACH detected category from PHASE 0.5, evaluate:

1. CONCRETE STRUCTURE: Does the codebase have actual files/directories/patterns that need specialized workflow guidance? (e.g., actual migration files -> migration protocol; actual mobile dirs -> platform gates)
2. MISTAKE RISK: Would an AI working on this codebase make category-specific mistakes WITHOUT a dedicated workflow file? (e.g., forgetting to test on both iOS and Android; running a DB migration without checking lock timeouts)
3. EXISTING COVERAGE: Can this guidance be adequately covered by extending an existing file (e.g., extra gates in file 7, extra passes in file 6) instead of creating a new file?
4. WEB CONFIRMATION: Did PHASE 0.6 web research reveal any best practices or common pitfalls in this domain that the default files don't address?

DECISION: Create a new workflow file when #1 AND #2 are YES, and #3 is NO. Use #4 to inform the file's content.

### Naming and Structural Conventions

NAMING: lowercase-hyphens.md, domain-prefixed (e.g., `database-migration-protocol.md`, `mobile-platform-gates.md`, `service-boundaries.md`). No numeric prefixes.

STRUCTURE: Each additional file follows this pattern:
- H1 title with clear purpose statement
- > blockquote summarizing when this file is loaded/active
- When-to-use section (concrete triggers -- when does the AI need this?)
- Step-by-step protocol (numbered phases, actionable, no theory)
- Verification/gate section (how to verify work in this domain)
- Cross-reference section (links to related default files: "See also: automation-loop.md Phase 4 for domain-specific verification")
- Failure modes and anti-patterns specific to this domain
- File length: what the domain needs. If a section grows beyond 40 lines, consider whether it deserves its own sub-file.

### Additional File Examples

These are STARTING POINTS, not templates to copy blindly. Adapt heavily. Combine if two domains overlap (e.g., "Serverless" + "CI/CD heavy" might share deployment gates in one file).

#### Example: `database-migration-protocol.md` (for DB-heavy repos)
- Migration creation rules (forward + rollback, naming, idempotency)
- Pre-flight checks (backup verification, lock timeout estimation, replication lag)
- Safe migration patterns (no data loss, online schema changes, batch backfills)
- Rollback protocol (when to rollback, how to verify rollback succeeded)
- Seed data management (idempotent seeds, environment-specific data)
- Index verification (EXPLAIN before adding, duplicate index detection)
- Cross-reference: automation-loop.md Phase 4 for DB-specific verification steps

#### Example: `monorepo-boundaries.md` (for monorepos)
- Package ownership map (which domain owns which package)
- Cross-package import rules (what can import what, layer violation detection)
- Shared dependency versioning (single version policy vs independent, how to sync)
- Workspace script conventions (build order by dependency graph, cascading test runs)
- Circular dependency detection and resolution rules
- When to extract to shared package vs keep local
- Cross-reference: sub-agent-orchestration.md for monorepo-specific delegation patterns

#### Example: `mobile-platform-gates.md` (for mobile repos)
- iOS build verification (Xcode version, signing, simulator boot, TestFlight validation)
- Android build verification (Gradle version, emulator boot, API level matrix)
- Platform-specific code rules (.ios.ts / .android.ts patterns, platform-native bridges)
- Permissions audit (no new permissions without explicit justification + review)
- App store submission readiness (version bump, changelog, screenshots, metadata)
- Device testing matrix (minimum devices/form factors to verify against)
- Cross-reference: code-quality-verification-gates.md for mobile-specific gates

#### Example: `deployment-verification.md` (for CI/CD heavy repos)
- Pre-deploy checklist (env vars synced across envs, migrations applied, feature flags correct)
- Deploy step order (dependency graph: which service first, health check between each)
- Rollback protocol (trigger conditions, rollback order, data consistency verification)
- Post-deploy verification (smoke tests, monitoring check, error rate baseline, canary metrics)
- Multi-environment promotion (dev -> staging -> production gate criteria)
- Cross-reference: automation-loop.md for deployment verification loop

#### Example: `api-contract-testing.md` (for backend API repos)
- OpenAPI/Swagger spec verification (spec generated, spec matches implementation)
- Response schema validation (every endpoint has typed response, shape verified)
- Error response standardization (consistent error format, correct status codes)
- Versioning rules (when to bump version, deprecation headers, sunset timeline)
- Rate limiting verification (headers present, 429 responses tested at threshold)
- Cross-reference: code-quality-verification-gates.md Gate 5 (Backend Verification)

#### Example: `security-compliance-gates.md` (for regulated repos)
- Pre-commit security checks (no secrets in code, dependency audit, SAST scan)
- Data handling verification (PII detection, encryption at rest + transit, retention policy check)
- Audit log completeness (all state changes logged, immutable log storage, tamper detection)
- Access control verification (RBAC matrix test, privilege escalation test, JWT scope test)
- Compliance evidence collection (automated screenshots/logs for audit trail)
- Cross-reference: code-quality-verification-gates.md for compliance-specific gates

#### Example: `localization-workflow.md` (for i18n repos)
- Translation key rules (naming convention, namespace organization, fallback chain)
- New key addition protocol (add to all locale files simultaneously, machine translate first pass)
- Missing key detection (build-time check, runtime warning in dev, fallback rendering)
- RTL layout verification (Arabic/Hebrew layout check, bidirectional text, icon mirroring)
- Date/number/currency format (locale-aware formatting, timezone handling)
- Cross-reference: code-quality-verification-gates.md for i18n-specific gates

#### Example: `serverless-deploy-gates.md` (for serverless/edge repos)
- Cold start verification (bundle size analysis, initialization profiling, warming strategy)
- Timeout and memory budget (function-level limits, retry logic, DLQ configuration)
- IAM scope audit (least-privilege per function, no wildcard policies)
- Environment variable sync (across functions, across stages, secrets rotation)
- Edge caching strategy (CDN configuration, cache invalidation protocol, stale-while-revalidate)
- Cross-reference: deployment-verification.md if combined CI/CD present

#### Example: `smart-contract-gates.md` (for blockchain/Web3 repos)
- Gas optimization check (loop bounds, storage vs memory, view function purity)
- Security audit protocol (re-entrancy, overflow, access control, tx.origin checks)
- Mainnet-fork testing (local fork, state simulation, multi-contract interaction)
- Upgrade safety (proxy patterns, storage layout compatibility, initialization checks)
- Event emission verification (all state changes emit events, indexed params correct)
- Cross-reference: code-quality-verification-gates.md for contract-specific gates

### After Generating Additional Files

1. Go BACK to `master.md` and add ALL additional files to the Workflow File Map table.
2. Go BACK to `master.md` and add protocol router entries for each additional file.
3. Update `code-quality-verification-gates.md` if the additional files introduce new quality gates.
4. Update `automation-loop.md` Phase 4 (VERIFY) with domain-specific verification steps from the additional files.
5. Update `multi-pass-batch-planning.md` if additional files introduce new pass types (e.g., "Database Migration Pass").
6. Verify ALL cross-references: every file that mentions another file uses the EXACT correct filename.

---

## PHASE 1.6: GENERATE ROOT AGENTS.md

Based on PHASE 0.8 decision.

IF GENERATING:
  1. Read the 5 most impactful generated workflow files to distill their essence.
  2. Generate root-level `AGENTS.md` (NOT inside .sixthrules/, at workspace root).
  3. Content: build/test commands (ALL relevant scripts, not just build+test), code style (3-5 key rules from actual codebase patterns), architecture (concise map), critical rules (absolute do/don't from the codebase), reference to .sixthrules/workflows/ for details, domain-specific quick-reference section.
  4. Length: adapt to codebase complexity. Small codebase = 20-30 lines. Large = 60-80 lines. No hard cap.
  5. Verify AGENTS.md has zero emojis.
  6. Verify ALL build/test commands match the actual package.json scripts exactly.

IF NOT GENERATING (single small private project):
  Add a note at the end of `master.md`: "No root AGENTS.md generated -- this is a single-developer private project. The .sixthrules/workflows/ files serve as the agent instructions."

---

## PHASE 2: SELF-VERIFICATION & CROSS-CHECK

This is where you verify your own output. Be thorough. Question everything.

### 2.1: Read-Every-File Pass

Read every generated file from start to finish. Look for:
   - Inconsistent terminology (file A says "pass" but file B says "phase" for the same concept)
   - Broken cross-references (file A references "foo.md" but the file is actually named "foo-protocol.md")
   - Vague instructions ("verify it works" -- how? what command? what criteria?)
   - Missing edge cases (if the codebase has WebSocket, does automation-loop.md mention WebSocket verification?)

### 2.2: Path Existence Verification

From codebase-index.md, randomly sample 5 file paths and verify they ACTUALLY exist:
   - read_file each sampled path
   - If any path doesn't exist -> fix codebase-index.md
   - If any obviously important file is missing from the index -> add it

### 2.3: Cross-Reference Integrity

- List every file referenced in master.md's Workflow File Map.
- Verify each referenced file EXISTS in .sixthrules/workflows/.
- For each additional file: verify it cross-references at least one default file.
- For each default file: verify it cross-references any additional files that extend it.

### 2.4: Emoji Scan

Scan ALL generated files for emojis. Zero tolerance. Use ASCII: ->, |, +, -, [, ], =, *, #.

### 2.5: End-to-End Consistency Check

Mental walkthrough: "If an AI loaded ONLY master.md on every turn, would it find EVERY protocol it needs?"

Simulate common user requests against the protocol router:
   - "Add a new endpoint" -> does the router direct to the right files?
   - "Fix this bug" -> does the router direct to the right files?
   - "Add a database migration" -> does the router direct to database-migration-protocol.md (if generated)?
   - "Deploy to production" -> does the router direct to deployment-verification.md (if generated)?
   - Every detected category -> is there a route?

If any simulation fails -> fix the missing route.

### 2.6: Final Sub-Agent Cross-Verification

Spawn 1 sub-agent with this instruction:
   "Read ALL files under `.sixthrules/workflows/`. Report any: inconsistencies between files, missing cross-references, vague instructions that need concrete commands, edge cases not covered for [detected categories], and any file that seems unnecessary or duplicated. Be critical."

Review the sub-agent's report. Fix genuine issues. If the sub-agent flags something you disagree with, explain your reasoning in a brief comment at the end of the affected file.

---

## CRITICAL RULES

- NO emojis. Period. ASCII only: ->, |, +, -, [, ], =, *, #.
- ALL paths relative to workspace root.
- ALL file names lowercase with hyphens (kebab-case).
- NO hardcoded limits. No "max X lines", no "max Y files", no "skip phase for Z size". The codebase's structure determines the output size and count. Adapt.
- DIVIDE over cram. If a section in any file grows too large for its container, split it into its own file. A 300-line well-organized file split into 3 focused files is better than a 150-line crammed file.
- EVERY cross-reference between files must use the EXACT correct filename. Verify every one.
- The `automation-loop.md` is the HEART of this system. It must be exhaustive, practical, and grounded in the actual tech stack's commands.
- The `codebase-index.md` is the MAP. It must be accurate (verify paths exist) and appropriately granular for the codebase size.
- When in doubt about PROJECT STRUCTURE: READ the actual files rather than guessing.
- When in doubt about BEST PRACTICES: WEB SEARCH rather than assuming.
- When in doubt about YOUR OWN ANALYSIS: spawn a sub-agent to cross-verify.
- If the codebase has no backend, skip backend-specific gates and sections (don't generate empty stubs).
- If the codebase has no frontend, skip frontend-specific gates and sections.
- Adapt ALL terminology to the detected tech stack: "bun test" for Bun, "go test ./..." for Go, "cargo test" for Rust, "pytest" for Python, "mix test" for Elixir, etc.
- The additional files phase is MANDATORY. You MUST evaluate every detected category for whether it needs a dedicated file. But do NOT create files just to have files -- each file must earn its existence through the decision framework.
- The self-verification phase (PHASE 2) is MANDATORY. Do not skip it. A workflow ruleset with broken cross-references is worse than no ruleset.
