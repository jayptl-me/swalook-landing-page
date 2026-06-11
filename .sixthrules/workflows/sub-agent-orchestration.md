# Sub-Agent Orchestration Protocol — Parallel Execution With Guaranteed Integration

> **When you alone can't do it efficiently, delegate. But delegate RIGHT — with contracts, context, and mandatory post-integration.**

---

## Decision: Solo vs. Sub-Agents

```
TASK SIZE ANALYSIS:
  
  □ 1-3 files, 1 domain        → SOLO (just do it)
  □ 4-7 files, 1-2 domains     → SOLO (sub-agent overhead > benefit)
  □ 4-7 files, 3+ domains      → CONSIDER spawn (if truly independent)
  □ 8-15 files, multiple domains → SPAWN 2-3 agents
  □ 16+ files, many domains    → SPAWN 3-5 agents + you orchestrate

COMPLEXITY ANALYSIS:
  □ Simple boilerplate (CRUD)  → Good for sub-agents
  □ Complex business logic     → Do yourself
  □ Pattern-matching           → Sub-agents (give them examples)
  □ Novel/creative work        → Do yourself
  □ Test generation            → Good for sub-agents
  □ Shared config/infra        → Do yourself (avoid conflicts)
```

---

## The 4-Phase Orchestration Protocol

### Phase 1: UNDERSTAND (You, Before Spawning)

```
MANDATORY PRE-WORK:
  1. Read ALL files sub-agents will need to reference
  2. Identify EXACT patterns/conventions they must follow
  3. Document:
     - Import style: "import { X } from '@/lib/y'"
     - Naming: "camelCase functions, PascalCase components, kebab-case files"
     - File structure: "One export per file, barrel export from index.ts"
     - Error handling: "throw AppError with code, never try/catch silently"
     - Auth pattern: "getAuthUser() from context, not direct token read"
  4. List ALL integration points:
     - "Agent A creates /api/products → I register in server.ts"
     - "Agent B creates ProductCard → I import in page.tsx"
     - "Agent C creates test → I add to vitest config"

IF YOU SKIP THIS → sub-agents will produce inconsistent, un-integrable code.
```

---

### Phase 2: PREPARE CONTRACTS (You, Before Spawning)

```
For EACH sub-agent, define:

1. INPUT CONTRACT (what they can assume):
   - Files that already exist (with exact paths)
   - Types/interfaces available (with exact import paths)
   - Functions/services they can call (with signatures)
   - Config/constants they can reference

2. OUTPUT CONTRACT (what they must produce):
   - Exact file paths to create
   - Exact exports (names, types, signatures)
   - Dependencies they can use (check package.json first!)
   - Formatting rules (spacing, quotes, semicolons)

3. SHARED CONTEXT (same for all agents):
   - Tech stack versions
   - Project structure
   - Coding conventions
   - Error message from Phase 1
```

---

### Phase 3: SPAWN (Delegate)

```
spawn_agents format:

{
  "tasks": [
    {
      "name": "short-unique-id",
      "instruction": "EXACT step-by-step. Include file paths, 
                      patterns to follow, files to read first, 
                      exact exports needed. Be SPECIFIC."
    }
  ],
  "project_context": "FULL tech stack with versions.
                      Installed packages (from package.json).
                      Directory structure.
                      Coding conventions.
                      Integration contracts between agents.
                      Sub-agents ONLY know what you write here."
}

CRITICAL: project_context MUST include:
  - Every installed package + version (from package.json)
  - Directory structure (where files go)
  - Import conventions (@/lib/... vs relative)
  - Naming conventions
  - If 2 agents create interacting code: explicit contract
```

---

### Phase 4: INTEGRATE (You, After Spawning — MANDATORY)

```
POST-SPAWN CHECKLIST:

□ Read every file sub-agents created (don't trust blindly)
□ Fix import paths (sub-agents often guess wrong)
□ Fix type errors (sub-agents may use wrong types)
□ Fix naming inconsistencies (agent A used getUser, agent B used fetchUser)
□ Wire into system:
   - New routes → register in server.ts or route index
   - New pages → add to navigation/components
   - New components → import where used
   - New modules → barrel export from index
□ Run tsc --noEmit → fix ALL type errors
□ Run build → fix ALL build errors
□ Run tests → fix ALL failures
□ Update codebase-index.md
```

**If you skip integration → broken code delivered to user. Your responsibility.**
