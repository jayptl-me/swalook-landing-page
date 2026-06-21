#!/bin/bash
# smoke-test.sh - Verify deployed service is alive
# Static landing page - checks root URL for 200
set -euo pipefail

URL="${1:-https://swalook-landing-page.onrender.com}"
echo "Smoke testing $URL..."

# Static site — check root URL returns 200
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL" --connect-timeout 10 --max-time 15 2>/dev/null || echo "000")
if [ "$STATUS" != "200" ]; then
  echo "FAIL: Root URL returned $STATUS"
  exit 1
fi
echo "OK: Root URL returned $STATUS"

echo "All smoke tests passed for $URL"
