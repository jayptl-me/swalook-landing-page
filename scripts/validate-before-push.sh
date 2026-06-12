#!/usr/bin/env bash
set -euo pipefail

REPO=$(basename $(pwd))
FAIL=0

echo "=== Pre-Push Validation: $REPO ==="

# Step 1: YAML syntax validation
echo "  -- YAML syntax --"
for wf in ci-validate ci-promote cd-release; do
    yml=".github/workflows/$wf.yml"
    if [ -f "$yml" ]; then
        if python3 -c "import yaml; yaml.safe_load(open('$yml')); print('OK')" 2>/dev/null; then
            echo "    PASS: $wf.yml"
        else
            echo "    FAIL: $wf.yml"
            FAIL=1
        fi
    fi
done

# Step 2: Native script checks
echo "  -- Native checks --"

# lint
if grep -q "bun run lint" .github/workflows/ci-validate.yml 2>/dev/null; then
    if bun run lint 2>/dev/null; then
        echo "    PASS: lint"
    else
        echo "    FAIL: lint"
        FAIL=1
    fi
fi

# typecheck
if grep -q "bun run typecheck" .github/workflows/ci-*.yml 2>/dev/null; then
    if bun run typecheck 2>/dev/null; then
        echo "    PASS: typecheck"
    else
        echo "    FAIL: typecheck"
        FAIL=1
    fi
fi

# test
if grep -q "bun run test" .github/workflows/ci-*.yml 2>/dev/null; then
    if bun run test 2>/dev/null; then
        echo "    PASS: test"
    else
        echo "    FAIL: test"
        FAIL=1
    fi
fi

# build
if grep -q "bun run build" .github/workflows/ci-*.yml 2>/dev/null; then
    if bun run build 2>/dev/null; then
        echo "    PASS: build"
    else
        echo "    FAIL: build"
        FAIL=1
    fi
fi

# Step 3: Config file check
echo "  -- Config files --"
for f in .env.example render.yaml deploy/docker-compose.prod.yml turbo.json next.config.mjs; do
    [ -f "$f" ] && echo "    PASS: $f" || echo "    INFO: $f not found"
done

echo ""
if [ $FAIL -eq 0 ]; then
    echo "ALL CHECKS PASSED - ready to push"
else
    echo "SOME CHECKS FAILED - fix before push"
    exit 1
fi
