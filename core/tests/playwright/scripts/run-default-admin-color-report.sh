#!/usr/bin/env bash
set -euo pipefail

# Wrapper for generating Default Admin color report with configurable auth/base URL.
# Usage:
#   core/tests/playwright/scripts/run-default-admin-color-report.sh
#   core/tests/playwright/scripts/run-default-admin-color-report.sh --base-url https://drupal-core.ddev.site --user admin --pass admin
#   DRUPAL_BASE_URL=https://example.test DRUPAL_ADMIN_USER=admin DRUPAL_ADMIN_PASS=secret core/tests/playwright/scripts/run-default-admin-color-report.sh

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
CORE_DIR="$REPO_ROOT/core"

BASE_URL="${DRUPAL_BASE_URL:-https://drupal-core.ddev.site}"
ADMIN_USER="${DRUPAL_ADMIN_USER:-admin}"
ADMIN_PASS="${DRUPAL_ADMIN_PASS:-admin}"

print_help() {
  cat <<EOF
Generate Default Admin color report.

Options:
  --base-url URL   Drupal base URL (default: $BASE_URL)
  --user USER      Drupal admin username (default: $ADMIN_USER)
  --pass PASS      Drupal admin password (default: [hidden])
  --help           Show this help text

Environment variables (equivalent):
  DRUPAL_BASE_URL
  DRUPAL_ADMIN_USER
  DRUPAL_ADMIN_PASS

Outputs:
  reports/default-admin-color-report-latest.json
  reports/DEFAULT-ADMIN-COLOR-REPORT-latest.html
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base-url)
      BASE_URL="$2"
      shift 2
      ;;
    --user)
      ADMIN_USER="$2"
      shift 2
      ;;
    --pass)
      ADMIN_PASS="$2"
      shift 2
      ;;
    --help|-h)
      print_help
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      print_help
      exit 1
      ;;
  esac
done

if ! command -v yarn >/dev/null 2>&1; then
  echo "Error: yarn is required but not found in PATH." >&2
  exit 1
fi

echo "Running Default Admin color report..."
echo "Base URL: $BASE_URL"
echo "Core dir: $CORE_DIR"

(
  cd "$CORE_DIR"
  DRUPAL_BASE_URL="$BASE_URL" \
  DRUPAL_ADMIN_USER="$ADMIN_USER" \
  DRUPAL_ADMIN_PASS="$ADMIN_PASS" \
  yarn a11y:default-admin-colors
)

echo "Done. Generated files:"
echo "  $REPO_ROOT/reports/default-admin-color-report-latest.json"
echo "  $REPO_ROOT/reports/DEFAULT-ADMIN-COLOR-REPORT-latest.html"
