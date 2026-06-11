# Multi-Pass & Batch Planning — Task Decomposition for Complex Workloads

> **Big tasks fail when tackled monolithically. Decompose into passes — each pass a complete, verifiable unit. Batch independent work for parallel execution.**

---

## Pass-Based Execution Model

```
PASS 0: DISCOVERY     → What exists? What's missing? What's the scope?
PASS 1: FOUNDATION    → Types, schemas, DB, config — things everything depends on
PASS 2: CORE LOGIC    → Services, controllers, business rules
PASS 3: API/ROUTES    → Endpoints, middleware, validation
PASS 4: FRONTEND      → Pages, components, state management
PASS 5: INTEGRATION   → Wire frontend ↔ backend, navigation, flows
PASS 6: POLISH        → Error states, loading states, edge cases, responsive
PASS 7: VERIFICATION  → Full test suite, build, type-check, manual testing
```

**Rule:** Never start Pass N+1 until Pass N is fully verified. Each pass is a gate.

---

## Pass Sizing & Gates

| Pass | Typical Files | Max Duration | Gate Check |
|------|--------------|--------------|------------|
| 0: Discovery | 0 (read-only) | 10 min | Scope doc written, unknowns listed |
| 1: Foundation | 2-5 files | 30 min | tsc --noEmit passes on foundation files |
| 2: Core Logic | 3-8 files | 1 hr | Unit tests pass on core logic |
| 3: API/Routes | 2-5 files | 45 min | curl all endpoints → correct responses |
| 4: Frontend | 3-10 files | 1 hr | Pages render, no blank screens |
| 5: Integration | 2-5 files | 30 min | End-to-end user flow works |
| 6: Polish | 1-3 files | 30 min | Responsive, all states covered |
| 7: Verification | Full project | 20 min | Build + all tests pass |

---

## Batch Planning Strategy

```
TASK DECOMPOSITION EXAMPLE:

User request: "Add product management module with CRUD, inventory tracking, 
              and a dashboard widget"

PASS 1: FOUNDATION (sequential — everything depends on this)
  Batch 1A: DB migration + Drizzle schema (1 dev, solo)
  Batch 1B: TypeScript types + Zod validation schemas (1 dev, solo)

PASS 2: CORE LOGIC (parallel — services are independent)
  Batch 2A: ProductService (create, read, update, delete)
  Batch 2B: InventoryTrackingService (stock levels, adjustments)
  Batch 2C: ProductAnalyticsService (dashboard data)
  → These 3 can be spawned as sub-agents in parallel

PASS 3: API (parallel — routes are independent)
  Batch 3A: /api/products CRUD routes
  Batch 3B: /api/products/:id/inventory routes
  Batch 3C: /api/products/analytics routes
  → These 3 can be spawned as sub-agents in parallel

PASS 4: FRONTEND (partially parallel)
  Batch 4A: ProductList page + ProductForm component (depends on types)
  Batch 4B: InventoryWidget component (independent of ProductList)
  Batch 4C: DashboardProductWidget (independent of above)
  → 4B and 4C can be parallel; 4A must complete first

PASS 5: INTEGRATION (sequential — wiring)
  Batch 5A: Register routes, add to nav, wire API calls (solo)
```

---

## Batch Execution Rules

```
SEQUENTIAL BATCHES (within same pass):
  - Run in order: 1A → 1B → 1C
  - Each must verify before next starts
  - Good for: foundation, integration, polish

PARALLEL BATCHES (within same pass):
  - Spawn as sub-agents simultaneously
  - Each agent gets EXACT contracts (see 04-sub-agent-orchestration.md)
  - After all complete → you integrate
  - Good for: independent services, independent routes, independent components

HYBRID (most common):
  - Start with sequential foundation
  - Spawn parallel batches for independent work
  - End with sequential integration + polish
```

---

## Progress Tracking Per Pass

```
PASS PROGRESS CHECKLIST TEMPLATE:

PASS N: [Pass Name]
  - [ ] Batch N.A: [description] → [verification criteria]
  - [ ] Batch N.B: [description] → [verification criteria]
  - [ ] Batch N.C: [description] → [verification criteria]
  Gate Check: [X/Y criteria met]
  → NEXT PASS or BLOCKED (reason: ___)

Use task_progress in tool calls to keep this visible to user.
```

---

## When to Re-Plan

```
RE-PLAN TRIGGERS:
  □ Discovered a dependency not in scope → expand pass
  □ Existing code conflicts with plan → restructure passes
  □ Sub-agent output is wrong → abort batch, re-plan, re-spawn
  □ User adds/removes requirements mid-task → re-decompose
  □ Verification fails 3+ times on same step → wrong approach, re-plan

RE-PLAN PROCESS:
  1. Pause execution
  2. Re-read affected code
  3. Re-evaluate pass/batch structure
  4. Update plan (keep completed passes, restructure remaining)
  5. Resume from next unverified pass
```

---

## Emergency Brake

```
STOP EVERYTHING if:
  □ You've modified the same file 5+ times → approach is wrong
  □ 3+ sub-agents produce broken code → contracts are bad
  □ User expresses frustration → simplify, ask for guidance
  □ Credit budget exhausted → stop searching, work with what you have
  □ 30+ mins without a verified pass → re-scope, ask user to prioritize
