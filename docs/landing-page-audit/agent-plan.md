# Swalook Agent Plan

## Purpose
This plan turns the Swalook audit into an execution-ready swarm workflow. It is designed for a company that needs one connected brand story across:
- landing page
- blog
- motion system
- CRM frontend
- backend contract truth
- SEO and geo growth

The goal is to keep work adaptive, grounded in actual product capability, and split into focused topic threads so multiple agents can work in parallel without mixing scopes.

---

## Operating principles

### 1) One topic at a time
Each agent should own exactly one topic:
- page hierarchy
- blog SEO / geo
- motion / asset system
- brand connectivity
- CRM product map
- backend contract map

Do not let one agent drift into another agent’s scope.

### 2) Parallel execution, single-threaded thinking
Run agents in parallel, but each agent should only solve one problem at a time:
- first understand current repo state,
- then produce recommendations,
- then identify dependencies,
- then stop.

### 3) No invention beyond the repo
Agents must only use:
- actual routes
- actual components
- actual docs
- actual CRM and backend inventories

If something is missing, mark it as missing or future-state. Do not invent routes, APIs, or features.

### 4) Product truth first
Swalook’s marketing must stay aligned to:
- CRM capability
- backend route support
- frontend product shell
- current blog system

The landing page can be aspirational, but the roadmap must separate:
- market now
- market carefully
- future-state

### 5) Adaptive planning
If the company, CRM shell, or backend routes change, this plan must be updated before new content or pages are proposed.

### 6) In-repo implementation only
All implementation work should stay inside this codebase unless an environment variable, API key, or other runtime secret is required.
- Do not plan for paid ads, external campaign systems, or third-party growth tooling unless the repo already depends on them.
- Do not introduce external services just to make the website “complete” if the same outcome can be achieved inside the app.
- If a capability needs an external key or env var, document the variable name and expected purpose, but keep the integration minimal and optional where possible.
- The planning goal is a self-contained website and CRM stack that is ready for users without depending on outside marketing infrastructure.

---

## Current working context

### Brand direction
Swalook is positioned as:
- a beauty-industry growth platform
- a revenue generation engine
- a connected system for retention, appointments, billing, inventory, staff, and branch visibility

### Known public surfaces
- homepage
- feature hub
- feature pages
- blog index
- blog posts
- about
- FAQ
- demo / trial / contact
- legal pages

### Known product truth layers
- backend route inventory
- CRM frontend shell
- feature map docs
- API documentation

---

## Master agent workflow

### Phase 1 — Audit
Read the current state and verify:
- route hierarchy
- page hierarchy
- CTA hierarchy
- blog clustering
- motion usage
- asset usage
- backend-supported claims
- CRM-supported claims
- naming consistency

### Phase 2 — Divide work
Assign one focused topic per sub-agent.

### Phase 3 — Merge
Combine all outputs into one coherent roadmap.

### Phase 4 — Validate
Check:
- the brand story is consistent
- the claims are supportable
- the SEO plan is technically realistic
- the geo strategy is unique and not thin
- the motion/asset plan fits performance constraints
- the CRM and backend maps agree with public copy

---

## Sub-agent structure

### Sub-agent A — Homepage and page hierarchy
Focus:
- route system
- homepage section logic
- feature page system
- CTA routing
- conversion hierarchy

Deliverables:
- page hierarchy recommendations
- section hierarchy recommendations
- CTA flow recommendations
- future page types list

### Sub-agent B — Blog SEO and geo strategy
Focus:
- keyword clusters
- entity SEO
- topic clusters
- geo pages
- local intent
- internal linking
- technical SEO
- schema
- canonical rules
- sitemap / robots / RSS

Deliverables:
- blog growth strategy
- geo expansion strategy
- technical SEO checklist
- content cluster map
- analytics and tracking terms

### Sub-agent C — Motion and asset system
Focus:
- micro-interactions
- section motion
- hero motion
- 3D policy
- image strategy
- reuse vs generation
- mobile performance

Deliverables:
- motion hierarchy
- asset hierarchy
- performance constraints
- image placement rules
- accessibility and alt-text rules

### Sub-agent D — Brand connectivity
Focus:
- one product story
- landing page / blog / CRM / backend alignment
- naming consistency
- safe-to-market language
- future-state labeling

Deliverables:
- brand narrative map
- messaging guardrails
- claims boundary guidance
- glossary recommendations

### Sub-agent E — CRM product map
Focus:
- CRM frontend shell
- supported workflows
- public-site proof points
- product language that should appear on marketing surfaces

Deliverables:
- CRM capability inventory
- public mapping recommendations
- terminology alignment notes
- proof-point candidates

### Sub-agent F — Backend contract map
Focus:
- backend routes
- contract-backed capability inventory
- what is safe to market now
- what must remain future-state

Deliverables:
- backend truth map
- claims boundary list
- route family to marketing translation
- risk notes

---

## Execution protocol for agents

### Step 1 — Read first
Every agent must read the relevant files before making recommendations.

### Step 2 — Summarize current state
Each agent should state:
- what exists
- what is missing
- what is weak
- what is future-state

### Step 3 — Make recommendations
Recommendations must include:
- findings
- priority
- dependencies
- risks
- next steps

### Step 4 — Stop at the scope boundary
If an agent finishes its topic, it should not start another topic.

### Step 5 — Recheck before expanding scope
If a repo change, user note, or upstream doc changes the topic, the agent must re-read the source files before continuing. Do not continue from stale assumptions.

### Step 6 — Local QA and evidence capture
When implementing a change:
- use the required Node version from NVM before running checks
- run the relevant lint or static checks before claiming completion
- prefer checks over full builds when the task calls for verification without a production build
- start the app locally when visual confirmation is needed
- wait for the correct target page or screen state to load before capturing evidence
- take screenshots only after the intended route, auth state, and content have fully loaded
- if login is required for the target screen, use the task-provided test credentials for local QA only and do not treat them as product documentation
- record any screenshot-dependent verification in the iteration tracker before closing the workstream

---

## Adaptive checkpoint prompts

Use these prompts to check status before moving to the next phase.

### Prompt 1 — Scope check
“Confirm the current repo state for your topic. List only what exists in the codebase and docs. Do not recommend anything yet.”

### Prompt 2 — Gap check
“What is missing compared to a mature growth system for Swalook? Separate missing current-state from future-state.”

### Prompt 3 — Risk check
“What would break if we shipped recommendations from your topic too early?”

### Prompt 4 — Alignment check
“How does your topic align with CRM frontend and backend truth?”

### Prompt 5 — Completion check
“List only the deliverables you completed, the dependencies you found, and the remaining open items.”

### Prompt 6 — Drift check
“Confirm you are still within topic scope. List any statement that depends on another agent’s output or on future-state assumptions.”

### Prompt 7 — Merge check
“What needs to be merged into the master roadmap or execution pack before another agent should proceed?”

---

## Status tracking template

Each sub-agent should return a compact status block:

### Status block
- Topic:
- Current state:
- Missing pieces:
- Safe-to-market items:
- Future-state items:
- Risks:
- Dependencies:
- Next action:

This makes it easy to merge outputs without losing structure.

---

## Output contract for all agents

Every sub-agent response must include:
1. **Scope boundary** — what the agent did and did not cover
2. **Source basis** — files read
3. **Current-state summary**
4. **Gap summary**
5. **Recommendations**
6. **Risk notes**
7. **Dependencies**
8. **Next handoff**

If a response does not include those items, treat it as incomplete.

---

## Topic guardrails

### Blog guardrails
- one intent per page
- cluster-first structure
- local content must be unique
- no thin city pages
- no duplicate intent cannibalization

### Brand guardrails
- one product name: Swalook
- use consistent terminology
- keep aspirational claims labeled
- do not outpace backend proof

### Motion guardrails
- motion should clarify, not decorate
- no heavy 3D unless justified
- mobile performance first
- avoid unnecessary bundle weight

### Asset guardrails
- use real product visuals when possible
- reuse visuals where message is the same
- generate assets only when there is a placement plan

### CRM/backend guardrails
- public claims must map to actual workflows or clearly future-state features
- do not market shell-only concepts as finished product
- use backend and CRM docs as the truth source

---

## Recommended output files

The swarm should produce or maintain these planning files:
- `docs/landing-page-audit/master-roadmap.md`
- `docs/landing-page-audit/home-page-sections.md`
- `docs/landing-page-audit/page-system.md`
- `docs/landing-page-audit/blog-seo-geo-strategy.md`
- `docs/landing-page-audit/asset-and-motion-system.md`
- `docs/landing-page-audit/brand-connectivity-map.md`
- `docs/landing-page-audit/backend-contract-map.md`
- `docs/landing-page-audit/crm-product-map.md`
- `docs/landing-page-audit/content-ops-checklist.md`
- `docs/landing-page-audit/seo-measurement-plan.md`
- `docs/landing-page-audit/agent-master-todo.md`

Optional future additions:
- `docs/landing-page-audit/production-readiness-checklist.md`
- `docs/landing-page-audit/launch-qa-checklist.md`

---

## Iteration re-prompting protocol

Use this protocol when revisiting a doc after a web search, repo change, or user feedback cycle.

### Iteration prompt 1 — current state
“Confirm the current repo state for your topic. List only what exists in the codebase and docs. Do not recommend anything yet.”

### Iteration prompt 2 — missing pieces
“What is missing compared to a production-ready growth system for Swalook? Separate missing current-state from future-state.”

### Iteration prompt 3 — source-backed risk
“What could break if we shipped recommendations from your topic too early? Tie the answer to actual repo evidence.”

### Iteration prompt 4 — alignment check
“How does your topic align with CRM frontend and backend truth? Call out any claim boundaries.”

### Iteration prompt 5 — next-file handoff
“List the next audit doc that should be updated, why it should be updated, and what dependency it has on the current doc.”

### Iteration prompt 6 — anti-drift check
“List any statements that depend on another agent’s output or on future-state assumptions. Stop there.”

### Iteration prompt 7 — merge readiness
“State whether this topic is ready to merge into the master roadmap or whether another source-backed pass is needed.”

---

## Recommended company-specific focus areas

Because Swalook is CRM-connected, the plan should always prioritize:
- retention
- repeat bookings
- no-show reduction
- branch visibility
- billing and invoices
- inventory control
- staff performance
- loyalty and reactivation
- marketing automation
- lead and inquiry capture

This is the product vocabulary that should shape the landing page and blog.

---

## Execution order recommendation

### Wave 1 — Truth and structure
1. backend contract map
2. CRM product map
3. page system

### Wave 2 — Brand and conversion
4. brand connectivity map
5. homepage sections
6. master roadmap

### Wave 3 — Growth engine
7. blog SEO / geo strategy
8. motion and asset system

### Wave 4 — Merge and validate
9. consolidated roadmap review
10. claims boundary review
11. publication readiness check

---

## Completion criteria
This plan is complete when:
- each topic has one owner
- all deliverables stay within scope
- current-state vs future-state is explicit
- CRM and backend truth match public strategy
- the team can move from research to implementation without confusion
- agents can be rerun without losing context or drifting into adjacent topics
- every iteration ends with a clear merge or recheck decision

---

## Final instruction to agents
Stay narrow. Stay source-backed. Stay aligned to Swalook as one product.
