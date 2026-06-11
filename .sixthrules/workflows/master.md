# Master Orchestrator -- Sixth AI Production Workflow

> This is the entry point. Load this on every turn alongside codebase-index.md. It defines how all workflow files interact and which protocol to activate based on the user's request.

---

## Workflow File Map

| # | File | Purpose | When Active |
|---|------|---------|-------------|
| 00 | `master.md` | **This file** -- entry point, routing logic | Every turn |
| 01 | `codebase-index.md` | Surface-level codebase map | Every turn |
| 02 | `automation-loop.md` | Autonomous goal-driven loop: research, plan, execute, verify, iterate until done | During implementation |
| 03 | `adaptive-research-protocol.md` | Progressive research: codebase -> web -> sub-agents | When unsure / need info |
| 04 | `sub-agent-orchestration.md` | When/how to delegate to sub-agents | For 8+ file tasks |
| 05 | `multi-pass-batch-planning.md` | Task decomposition into passes/batches | For complex multi-domain tasks |
| 06 | `code-quality-verification-gates.md` | 10 quality gates every change must pass | Before attempt_completion |
| 07 | `codebase-index-update-protocol.md` | Index maintenance after structural changes | After any file creation/deletion/rename |

---

## Decision Engine -- What To Do Per Turn

```
ON EVERY TURN:
  1. Load codebase-index.md -> know where everything is
  2. Read user request
  3. Route to correct protocol below
  4. Execute
  5. Update codebase-index.md if structure changed
```

---

## Protocol Router

```
USER REQUEST IS...

"A question about the codebase"
  -> Read codebase-index.md for paths
  -> Read relevant files (read_file / read_batch)
  -> Answer directly. No loops needed.

"A simple change (1-3 files)"
  -> RESEARCH: Read adaptive-research-protocol.md Phase 1
  -> Read target files + patterns
  -> EXECUTE: Make change
  -> VERIFY: Apply code-quality-verification-gates.md minimum gates
  -> DONE

"A medium change (4-7 files)"
  -> RESEARCH: Read adaptive-research-protocol.md full flow
  -> PLAN: Map dependencies, order steps
  -> EXECUTE: One file at a time, verify each
  -> Use automation-loop.md for the loop discipline
  -> VERIFY: Apply all relevant gates from code-quality-verification-gates.md
  -> DONE

"A large/complex task (8+ files, multiple domains)"
  -> RESEARCH: adaptive-research-protocol.md -> codebase + web + sub-agents
  -> PLAN: multi-pass-batch-planning.md -> decompose into passes
  -> DECIDE: sub-agent-orchestration.md -> solo vs sub-agents per batch
  -> EXECUTE: automation-loop.md -> pass by pass, batch by batch
  -> VERIFY: code-quality-verification-gates.md -> ALL gates at pass boundaries
  -> DONE

"I don't know enough to proceed"
  -> Trigger adaptive-research-protocol.md Phase 2 (web search)
  -> If still insufficient -> Phase 3 (sub-agent research)
  -> If still insufficient -> ask user

"Need to fix a bug"
  -> RESEARCH: Read error + relevant files (adaptive-research Phase 1)
  -> DIAGNOSE: Hypothesis first, then fix
  -> EXECUTE: One fix at a time
  -> VERIFY: Gate 1 (types) + Gate 4 (tests) + reproduce bug
  -> If fix fails 3 times -> re-research from scratch
```

---

## Quick Reference -- Key Numbers

```
CREDIT BUDGET:    20 credits/session (Tavily)
                  ~5 credits per web_search
                  ~4 web_search calls max

SUB-AGENT LIMITS: max 5 agents per spawn
                  min threshold: 8+ files, multi-domain
                  never spawn for < 4 files

PASS STRUCTURE:   0=Discovery, 1=Foundation, 2=Core, 3=API,
                  4=Frontend, 5=Integration, 6=Polish, 7=Verify

QUALITY GATES:    10 total. Minimum: 1(Types), 3(Build), 4(Tests), 7(Integration)

FILE SIZE:        max 150 lines per file
FUNCTION SIZE:    max 40 lines per function

ANTI-PATTERN:     Never fix root cause with try/catch
                  Never deliver unreachable code
                  Never claim "tests pass" if output shows failures
                  Never import a package without checking package.json
```

---

## State Machine

```
                    +-------------+
                    |   IDLE      | <- waiting for user input
                    +------+------+
                           | user request received
                    +------v------+
                    |  ROUTING    | <- classify task size + type
                    +------+------+
                           |
              +------------+------------+
              v            v            v
        +----------+ +----------+ +----------+
        | RESEARCH | |   PLAN   | |  ANSWER  | <- question
        +----+-----+ +----+-----+ +----------+
             |             |
             +------+------+
                    v
             +----------+
             |  EXECUTE | <- one change + verify
             +----+-----+
                  |
         +--------+-------+
         v        v       v
    +--------++------++--------+
    | PASS   || FAIL ||MORE    |
    |->DONE  ||->FIX ||->NEXT  |
    +--------++--+---++ STEP   |
                 |    +---+----+
            +----v---+    |
            |  FIX   |    |
            +---+----+    |
                |  (if 3rd|
                |   fail) |
           +----v----+    |
           |RE-RESEARCH|  |
           |RE-PLAN   |   |
           +----------+   |
                     <----+
```

---

## Per-Turn Checklist

```
BEGINNING OF TURN:
  [ ] Read codebase-index.md (if not already in context)
  [ ] Read user request
  [ ] Classify: question / simple / medium / large / bug

DURING TURN:
  [ ] Follow the routed protocol
  [ ] If using web_search: check credit counter
  [ ] If spawning sub-agents: prepare contracts first
  [ ] One change at a time

END OF TURN:
  [ ] Update task_progress (checklist)
  [ ] If structural change: update codebase-index.md
  [ ] If code written: verify before next turn

TASK COMPLETE:
  [ ] All quality gates passed (minimum: 1,3,4,7)
  [ ] Codebase-index.md updated
  [ ] attempt_completion with verified results
