# Code Quality & Verification Gates — Production-Grade Standards

> **Every change must pass these gates before being considered done. No exceptions. Each gate is a binary — PASS or FAIL. Fail → fix → re-gate.**

---

## Gate 1: Type Safety

```
CHECK: tsc --noEmit

PASS CRITERIA:
  □ Zero type errors
  □ Zero warnings (if strict mode)
  □ No `any` types (unless genuinely dynamic data with @ts-expect-error comment)
  □ All function return types explicit
  □ All props/interfaces fully typed

FAIL → Fix ALL errors before proceeding. Never suppress with @ts-ignore.
```

---

## Gate 2: Import Integrity

```
CHECK: Every import resolves to a real module with the exact export name

PASS CRITERIA:
  □ No "cannot find module" errors
  □ No "does not export member" errors
  □ Imports use project conventions (@/lib/x, not ../../x)
  □ No circular imports
  □ No imports of packages not in package.json

HOW TO VERIFY:
  - tsc --noEmit catches most
  - grep for 'from "' in new files → verify each path exists
  - Check package.json before importing any new library
```

---

## Gate 3: Build

```
CHECK: npm run build (or bun run build, or equivalent)

PASS CRITERIA:
  □ Build completes with zero errors
  □ Zero warnings (treat warnings as errors)
  □ Output size reasonable (no massive bundle bloat from bad import)
  □ No "chunk size exceeds" warnings (check for accidental full-library imports)
```

---

## Gate 4: Tests

```
CHECK: Run relevant test suite

PASS CRITERIA:
  □ All existing tests still pass
  □ New code has tests (at minimum: happy path + 1 error path)
  □ No skipped tests (`.skip`) without explicit justification
  □ No flaky tests (always pass on first run)
  □ Coverage does NOT decrease from previous run

TEST WRITING RULES:
  - New service function → unit test
  - New API endpoint → integration test
  - New component → render test + interaction test
  - Bug fix → regression test for the specific bug
```

---

## Gate 5: Backend Verification (if backend changed)

```
CHECK: Start server + curl each endpoint

PASS CRITERIA:
  □ Server starts without errors
  □ GET endpoints return 200 with expected shape
  □ POST endpoints return 201 with correct body
  □ PUT/PATCH endpoints return 200 with updated body
  □ DELETE endpoints return 204 or 200
  □ Failure paths: 400 for bad input, 401 for no auth, 403 for wrong role, 404 for missing
  □ Response times < 500ms (unless heavy query — then verify index is used)
```

---

## Gate 6: Frontend Verification (if frontend changed)

```
CHECK: Open in browser at dev server

PASS CRITERIA:
  □ Page renders without blank screen
  □ No console errors (red) — warnings are yellow, errors are red
  □ No layout collapse (elements aren't overlapping or invisible)
  □ All buttons/interactive elements are clickable
  □ Forms submit and show validation errors for bad input
  □ Modals open and close correctly
  □ Navigation works (links go where expected)
  □ Text does not overflow or clip inside containers
  □ Mobile viewport (375px): nothing overflows horizontally
  □ Loading states show (not just blank)
  □ Empty states show (not just blank)
  □ Error states show (network failure, unauthorized)
```

---

## Gate 7: Integration Completeness

```
CHECK: New code is reachable in the running system

PASS CRITERIA:
  □ New page → exists in navigation or linked from a parent page
  □ New API route → registered in route file / server.ts
  □ New component → imported and used somewhere
  □ New service → imported by controller or other consumer
  □ New type → exported and used
  □ New config → referenced in code
  □ New migration → registered and runnable
```

---

## Gate 8: Code Structure

```
CHECK: File organization follows project conventions

PASS CRITERIA:
  □ One component per file (React)
  □ One service/utility per file
  □ Files < 150 lines (if longer → split)
  □ Functions < 40 lines (if longer → extract helpers)
  □ Barrel exports from index.ts (components, lib, etc.)
  □ No dead code (commented-out blocks, unused imports, unreachable branches)
  □ Constants for magic numbers/strings (no hardcoded "admin" string)
```

---

## Gate 9: Naming & Readability

```
CHECK: Names are clear without reading implementation

PASS CRITERIA:
  □ Functions: verbs (fetchUser, calculateTotal, isValid)
  □ Booleans: predicates (isLoading, hasError, canEdit)
  □ Arrays: plurals (users, appointments, items)
  □ Components: PascalCase (UserList, AppointmentForm)
  □ Files: kebab-case (user-list.tsx, appointment-form.tsx)
  □ NO: data, item, temp, result, obj, val, thing
```

---

## Gate 10: Documentation (lightweight)

```
CHECK: Update relevant docs

PASS CRITERIA:
  □ Codebase-index.md updated if structure changed
  □ Complex logic has a 1-2 line comment explaining WHY
  □ API endpoints have JSDoc or comment with purpose
  □ New config/env vars documented in .env.example
```

---

## Quick Gate Summary (per change)

| # | Gate | Command/Check | Time |
|---|------|--------------|------|
| 1 | Type Safety | `tsc --noEmit` | 5s |
| 2 | Import Integrity | `tsc --noEmit` (covers it) | 0s |
| 3 | Build | `npm run build` / `bun run build` | 30s |
| 4 | Tests | `npm test` / `bun test` | 30s |
| 5 | Backend | `curl` endpoints | 2m |
| 6 | Frontend | Open browser, interact | 3m |
| 7 | Integration | Manual check | 1m |
| 8 | Code Structure | Visual review | 1m |
| 9 | Naming | Visual review | 1m |
| 10 | Documentation | Update files | 1m |

**Minimum gates before attempt_completion: 1, 3, 4, 7 (must pass). Others: judgment.**
