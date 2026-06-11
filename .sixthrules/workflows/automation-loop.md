# Production Iteration Loop — Goal-Driven Execution Until Done

> **Core Principle:** Don't stop at "code written." Stop at "code verified working." Loop until the goal is achieved — research → plan → execute → verify → iterate.

---

## The Loop (R-P-E-V-I)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   RESEARCH ──→ PLAN ──→ EXECUTE ──→ VERIFY         │
│       ↑                                    │        │
│       │                                    ↓        │
│       └────────── ITERATE ◄─────────── FAIL?        │
│                                                     │
│                                    PASS? → DONE     │
└─────────────────────────────────────────────────────┘
```

---

## Phase 1: RESEARCH — Understand Before Acting

```
ACTIONS:
  □ Read codebase-index.md for relevant paths
  □ Read existing related files (patterns, interfaces)
  □ Read package.json for available dependencies
  □ Check for existing tests, similar implementations
  □ IF unknown library/API: web_search (respecting credit budget)
  □ IF complex multi-domain: consider sub-agent research spawn

OUTPUT: Knowledge summary
  - "I understand the current state: [summary]"
  - "The change touches: [files list]"
  - "The patterns to follow: [existing patterns found]"
  - "Unknowns: [gaps to fill or ask user]"

GATE: Can I explain what needs to change and why? 
  NO → More research (or ask user)
  YES → Proceed to PLAN
```

---

## Phase 2: PLAN — Design Before Building

```
ACTIONS:
  □ Break task into ordered steps (sequential dependencies first)
  □ Identify parallel-izable steps (for sub-agents)
  □ Size estimation:
     - 1-3 files changed → solo execution
     - 4-7 files → consider sub-agents for boilerplate
     - 8+ files → spawn sub-agents, you integrate
  □ Define verification criteria PER STEP:
     - "After step 2: POST /api/x returns 201 with correct body"
     - "After step 4: tsc --noEmit passes"
     - "After step 6: tests pass, page renders"

OUTPUT: Task plan with verification checkpoints
  - Ordered step list with file paths
  - Sub-agent delegation plan (if applicable)
  - Verification criteria per step

GATE: Is each step independently verifiable?
  NO → Break steps down further
  YES → Proceed to EXECUTE
```

---

## Phase 3: EXECUTE — One Verified Change At A Time

```
FOR EACH STEP:
  1. Make ONE focused change
  2. Verify it (see Phase 4)
  3. If pass → next step
  4. If fail → diagnose → fix → re-verify (max 3 attempts)
  5. If 3 attempts all fail → STOP, re-research, re-plan

CRITICAL RULES:
  - NEVER batch unrelated changes in one step
  - NEVER move to next step while current step fails
  - ALWAYS read file before editing it (interfaces may have changed)
  - ALWAYS update codebase-index.md after structural changes
```

---

## Phase 4: VERIFY — Prove It Works

```
VERIFICATION BY CHANGE TYPE:

Frontend changes:
  □ npm run dev → page loads without blank screen
  □ Check browser: no layout collapse, buttons clickable, text not overflowing
  □ Test at mobile viewport (375px)
  □ Test all interactive paths (clicks, forms, modals, navigation)
  □ npm run build → no errors

Backend changes:
  □ curl each new/modified endpoint → correct status + response shape
  □ curl failure paths → meaningful errors, not 500s
  □ Test with missing fields, bad auth, invalid IDs
  □ bun test → all tests pass (or just relevant test files)

TypeScript:
  □ tsc --noEmit → zero type errors
  
Integration:
  □ New page → added to navigation?
  □ New endpoint → registered in routes?
  □ New component → exported from index?
  □ New module → reachable in running system?

FAILURE PROTOCOL:
  1. Read the FULL error (not just line 1)
  2. Find exact file + line
  3. Form hypothesis WHY it fails
  4. Fix root cause (not symptom)
  5. Re-verify
  6. If same error after 2 attempts → re-research
```

---

## Phase 5: ITERATE — Loop Until Done

```
DECISION TREE:

Verify passed?
  ├─ YES, all steps done → DONE (call attempt_completion)
  ├─ YES, more steps remain → continue EXECUTE loop
  └─ NO, verification failed
       ├─ 1st failure → diagnose + fix + re-verify
       ├─ 2nd failure → try alternative approach
       └─ 3rd failure → STOP → go back to RESEARCH
            - Maybe the approach is wrong
            - Maybe the plan needs restructuring
            - Maybe we're missing a dependency
```

---

## Completion Criteria (ALL must be true)

```
□ All planned steps executed
□ All verifications passed
□ No TypeScript errors (tsc --noEmit)
□ No build errors
□ Tests pass (new + existing)
□ New code is reachable (route registered, page in nav, component imported)
□ Codebase-index.md updated if structure changed
□ No known gaps or TODOs left unaddressed
```

---

## Anti-Patterns to AVOID

| [!] Anti-Pattern | [+] Correct |
|-----------------|-----------|
| Writing all files then testing once | Write one file, verify, then next |
| "I think this should work" | "I verified: curl returns 200 with expected body" |
| Silencing errors with try/catch | Fix the root cause |
| Moving to next step while current fails | Stay on current step until pass |
| "All tests pass" when output shows failures | Report actual test output |
| Delivering unreachable code | Wire everything into the running system |
| Guessing file contents without reading | Always read_file before editing |
