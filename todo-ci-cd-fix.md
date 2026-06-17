# Swalook Landing Page — CI/CD Fix TODO

## Priority 1: Fix Branch State

- [ ] Current state: ON MAIN with uncommitted CI changes — DANGEROUS
- [ ] Stash changes: `git stash`
- [ ] Create/push feature branch: `git checkout -b dj/ci-cd-pipeline && git push -u origin dj/ci-cd-pipeline`
- [ ] Apply stashed changes: `git stash pop`

## Priority 2: Resolve CI Failures

- [ ] Fix test assertions matching source code
- [ ] Investigate dependabot PR failures and resolve version conflicts
- [ ] Run `bun run test` locally and verify all pass

## Priority 3: Security Scan

- [ ] Run `bun audit --json` and review findings
- [ ] Update vulnerable dependencies

## Priority 4: Sync Branches

- [ ] Commit and push to `dj/ci-cd-pipeline`
- [ ] Create PR `dj/ci-cd-pipeline → live-testing`
- [ ] Verify CI on PR
- [ ] Merge to live-testing
- [ ] Wait for auto-promotion to staging → merge
- [ ] Verify staging→main promotion → merge
- [ ] Final verification: all branches green

## Priority 5: Branch Protection

- [ ] Enable PR-required on main, staging, live-testing
- [ ] Require status checks: lint, test, build, security-scan

## Priority 6: Missing Infrastructure Files

- [ ] Create `.github/pull_request_template.md`
- [ ] Create `.github/copilot-instructions.md`
- [ ] Create `.github/ISSUE_TEMPLATE/feature_request.md`
- [ ] Create `.github/ISSUE_TEMPLATE/bug_report.md`
- [ ] Create `.github/ISSUE_TEMPLATE/config.yml`
