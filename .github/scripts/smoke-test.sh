#!/bin/bash
# smoke-test.sh - Verify deployed service is alive
set -euo pipefail

URL="${1:-http://localhost:10000}"
echo "Smoke testing $URL..."

# Health endpoint
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/v1/health" 2>/dev/null || echo "000")
if [ "$STATUS" != "200" ]; then
  echo "FAIL: Health endpoint returned $STATUS"
  exit 1
fi
echo "OK: Health endpoint is 200"

echo "All smoke tests passed for $URL"
