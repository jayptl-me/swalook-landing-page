# Adaptive Research Protocol — Progressive Knowledge Acquisition

> **Goal:** Never hallucinate. Always ground answers in reality. Research in layers: codebase → web → sub-agents. Stop as soon as sufficient knowledge is acquired.

---

## Phase 0: Parse User Intent

Before ANY search, classify the task:

| Intent Type | Primary Source | Fallback |
|-------------|---------------|----------|
| **Code modification** (add/edit/delete files) | Codebase search | Web (for library docs) |
| **Bug fix** | Codebase (read error + relevant files) | Web (for known issues) |
| **New feature** | Codebase (patterns, existing similar features) | Web (best practices) |
| **Architecture/design** | Codebase (current structure) | Web (patterns) |
| **Library/API usage** | Web (official docs) | Codebase (existing usage) |
| **Error debugging** | Codebase (logs, stack traces) | Web (error solutions) |
| **Security audit** | Codebase (configs, deps) | Security skills |
| **Data migration** | Codebase (schema, scripts) | Web (Drizzle/DB docs) |
| **Testing** | Codebase (existing tests) | Web (testing patterns) |
| **Unknown/general** | Web search first | Codebase second |

---

## Phase 1: Codebase-First Search (ALWAYS FIRST for code tasks)

```
STEP 1: Read codebase-index.md (01-codebase-index.md) — find relevant paths
STEP 2: read_file the most likely files (use read_batch for 3-5 at once)
STEP 3: search_files with targeted regex if location unknown
STEP 4: list_files on relevant directories if still unclear
```

**Stop condition:** If you found the EXACT code/pattern you need → proceed to plan.  
**Continue to Phase 2 if:** Code not found, pattern unclear, need library docs, need current best practices.

---

## Phase 2: Web Search (Tavily — Budget-Aware)

```
BEFORE SEARCHING: Check credit counter
  - If near 20 credits → ask user: "Need web search but at credit limit. Continue?"
  - If < 15 credits used → proceed

WHEN TO SEARCH:
  - Library/package documentation (npm, official docs)
  - Error messages with unknown causes
  - Best practices for framework version we use
  - Current API references
  - Security vulnerability databases (CVE)

HOW TO SEARCH:
  - web_search with specific queries (5 results, basic depth = ~5 credits)
  - web_fetch only for specific URLs you KNOW contain the answer (~1-2 credits)
  - NEVER deep research / advanced search (disabled by MCP config)

CREDIT MATH:
  - Each web_search = ~5 credits (5 results × 1 credit basic depth)
  - Session budget: 20 credits = max ~4 web_search calls
  - If 4 searches done → stop, work with what you have
```

**Stop condition:** Answer found in web results → proceed to plan.  
**Continue to Phase 3 if:** Task is complex and needs parallel exploration by specialized agents.

---

## Phase 3: Sub-Agent Delegation (For Large/Complex Tasks)

```
WHEN TO SPAWN SUB-AGENTS:
  - Task spans 4+ files in different domains
  - Need parallel research across multiple areas
  - CRUD boilerplate for multiple modules
  - Independent test stubs needed
  - Architecture evaluation from multiple angles

HOW TO SPAWN:
  1. Understand first — read the relevant files yourself
  2. Prepare contracts — define EXACT interfaces, file paths, naming conventions
  3. Spawn with rich context — include:
     - Exact file paths to create/modify
     - Files to read first (for patterns)
     - Integration contracts (props, routes, imports)
     - Tech stack versions
     - Coding conventions
  4. Integrate after — YOU wire everything together:
     - Register routes in server.ts
     - Add pages to navigation
     - Import components where needed
     - Run build + tests

SUB-AGENT LIMITS:
  - Max 5 agents per spawn
  - Don't spawn for 2-4 files — do it yourself
  - Sub-agents are JUNIOR — spoonfeed them
  - Always verify sub-agent output before integrating
```

---

## Phase 4: Knowledge Synthesis

Before ANY implementation:
1. Summarize what you know (from all phases)
2. List what you DON'T know (gaps)
3. Decide: enough to proceed, or need more research?
4. If gaps remain → ask user for clarification (don't guess)

---

## Anti-Hallucination Checklist

- [ ] Did I read the actual file or am I guessing its contents?
- [ ] Did I check package.json before importing a library?
- [ ] Did I verify the function/export EXISTS before using it?
- [ ] Am I assuming a framework version or did I check?
- [ ] Could this error be different in the specific version we use?
- [ ] Did I test the code or am I assuming it works?

**If ANY answer is "guessing" → STOP and research.**
