# Swalook Project - AI Context & Tool Rules

## Available MCP Servers

### Tavily Web Search
- **Server:** `tavily` via HTTP transport
- **Purpose:** Real-time web search for current information, documentation, APIs, error solutions
- **API Key:** Configured (tvly-dev)
- **Credit Budget:** MAXIMUM 20 credits per single usage session
- **Cost Model:**
  - Basic search (`search_depth: basic`): 1 credit per query
  - Advanced search (`search_depth: advanced`): 2 credits per query
- **Rate Limit Enforced Via Config:**
  - `search_depth: basic` (always use basic - never advanced/deep)
  - `max_results: 5` per query
  - `include_answer: false` (skip AI summary to save credits)
  - `include_raw_content: false` (skip raw content to save credits)
- **Usage Guidelines:**
  - Prefer `web_search` over `web_fetch` when possible (1 credit vs potential multiple)
  - Use `web_fetch` ONLY for specific URLs you need full content from (2 credits)
  - Do NOT use deep research / advanced search modes
  - Each `web_search` call = ~5 credits (5 results × 1 credit basic)
  - Max ~20 web_search calls per session (20 × 5 = 100 credits)
  - If you hit 100 credits, stop using search and inform the user

## Installed Skills (38 total)

### Development & Architecture
- `senior-architect` - System architecture design, diagrams, tech stack decisions
- `senior-backend` - Backend development, APIs, databases, NodeJS, Go, Python
- `senior-frontend` - Frontend development, React, NextJS, TypeScript, Tailwind
- `senior-fullstack` - Full-stack web applications, project scaffolding
- `senior-devops` - CI/CD, Docker, cloud deployment, monitoring
- `senior-qa` - Testing strategies, test automation, QA
- `senior-security` - Security engineering, penetration testing, crypto
- `code-reviewer` - Comprehensive code reviews, best practices, security scanning
- `tdd-guide` - Test-driven development workflows
- `tech-stack-evaluator` - Technology evaluation, TCO analysis

### Design & UX
- `ui-ux-pro-max` - UI/UX design with 67 styles, 96 palettes, 57 font pairings
- `genuinest-frontend-design-workflow` - Theme-aware frontend design, micro-interactions
- `frontend-design` - Frontend component design

### Security (Non-Destructive / Guided Only)
- `01-recon-osint` - Reconnaissance & OSINT automation
- `02-vulnerability-scanner` - Vulnerability scanning & assessment
- `03-exploit-development` - Exploit development & payload engineering
- `04-reverse-engineering` - Reverse engineering & binary analysis
- `05-malware-analysis` - Malware analysis & sandboxing
- `06-threat-hunting` - Threat hunting & IOC analysis
- `07-incident-response` - Incident response & digital forensics
- `08-network-security` - Network security & traffic analysis
- `09-web-security` - Web application security testing
- `10-cloud-security` - Cloud security & container hardening
- `11-csoc-automation` - CSOC operations & playbook automation
- `12-log-analysis` - Log analysis & SIEM integration
- `13-crypto-analysis` - Cryptographic analysis & assessment
- `14-red-team-ops` - Red team operations & engagement planning
- `15-blue-team-defense` - Blue team defense & hardening


### Workflow & Meta
- `skill-creator` - Create/modify skills
- `plan` - Planning & design phase
- `research` - Research & investigation
- `init` - Project initialization
- `cross-review` - Cross-review workflows
- `zen-review` / `zen-comprehensive-review` - Comprehensive reviews

## Security Skills Usage Policy
Security skills (01-15) are for **NON-DESTRUCTIVE, GUIDED USE ONLY**:
- Analyze code, configurations, logs
- Provide recommendations and reports
- NO active exploitation or penetration testing without explicit authorization
- Use for educational/review purposes within this codebase

## Project Context
This is the **Swalook** project - a CRM/salon management platform with:
- `swalook-node/` - Backend (Bun/Node.js, Drizzle ORM, PostgreSQL)
- `swalook-frontend-new/` - Frontend (Next.js, TypeScript, Tailwind)
- `swalook-landing-page/` - Marketing landing page (Next.js)
- `crm-super-admin/` - Super admin panel (Next.js, monorepo)
- `rss.xml`, `sitemap.xml` - Project-level SEO files
