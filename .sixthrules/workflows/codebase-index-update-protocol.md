# Codebase Index Update Protocol — Living Document Maintenance

> **01-codebase-index.md is the most important file in this workflow. If it's stale, the AI navigates blindly. Keep it current on every structural change.**

---

## When To Update

```
TRIGGERS (update REQUIRED):
  □ New file created in a tracked directory (src/, app/, components/, lib/, controllers/, etc.)
  □ File deleted from a tracked directory
  □ File renamed or moved
  □ New directory added at any level
  □ Directory removed
  □ Package.json changed (new dep added, old removed)

TRIGGERS (update OPTIONAL):
  □ File modified but path unchanged → no update needed (index tracks WHAT, not HOW)
  □ Comment/formatting changes → no update needed
  □ Minor logic change → no update needed
```

---

## Update Format

```
The index uses this format:

## Section Name
| Path | Purpose |
|------|---------|
| `relative/path/file.ts` | One-line description of what it contains |

RULES:
  - Paths relative to the sub-project root (swalook-node/, swalook-frontend-new/, etc.)
  - Descriptions: ONE LINE, no implementation details
  - Only include KEY files — not every file in a 50-file directory
  - Use wildcards sparingly: `controllers/*.ts` = "37 domain controllers"
  - NEVER include node_modules, .next, dist, build, coverage
```

---

## Update Procedure

```
AFTER ANY STRUCTURAL CHANGE:

1. Check if change is in a tracked directory
   - swalook-node/src/*
   - swalook-frontend-new/apps/web/app/*
   - swalook-frontend-new/apps/web/components/*
   - swalook-frontend-new/apps/web/lib/*
   - crm-super-admin/apps/web/app/*
   - crm-super-admin/apps/web/components/*
   - crm-super-admin/apps/web/lib/*
   - swalook-landing-page/app/*
   - swalook-landing-page/components/*
   - swalook-landing-page/lib/*

2. Find the affected section in 01-codebase-index.md
   - If section exists → add/remove/rename the file row
   - If new directory → add new sub-section
   - If directory removed → remove sub-section

3. Update the table row:
   ADD:    | `path/to/new-file.ts` | Brief purpose |
   REMOVE: Delete the row
   RENAME: Change path in existing row

4. If 5+ rows added/removed → consider rewording the section intro

5. DO NOT:
   - Add implementation details ("uses this algorithm...")
   - Add more than one line per file
   - Add files from untracked directories
   - Add node_modules, build artifacts, generated files
```

---

## Token Efficiency Rules

```
THE INDEX MUST STAY LEAN:

  □ Max 80 lines per sub-project section
  □ Max 200 lines total
  □ If a directory has 20+ similar files → use a wildcard line:
    "controllers/*.ts → 37 domain controllers (auth, billing, inventory, etc.)"
    instead of listing all 37 individually

  □ If a directory has 5-15 files → list them individually
  □ If a directory has < 5 files → list them all

  □ NEVER list:
    - package.json contents (version numbers)
    - tsconfig.json / config files
    - .env files
    - README.md
    - LICENSE
    - TODO.md
    - CHANGELOG
```

---

## Example Update

```
BEFORE:
| `src/controllers/` | 36 domain controllers |

AFTER (added product.controller.ts):
| `src/controllers/` | 37 domain controllers (new: product.controller.ts) |

BETTER (if controllers section is getting large, collapse to wildcard):
| `src/controllers/*.ts` | 37 domain controllers — auth, billing, product, inventory, etc. |
```

---

## Self-Healing

```
PERIODIC CHECK (every 10-15 turns):
  □ Quick verification: do 3 random index paths actually exist?
  □ If not → update index
  □ Are any new directories/files obviously missing from index?
  □ If yes → add them

This prevents drift between codebase and index over time.
