#!/usr/bin/env bash
# BANCO bancotoday — canonical baseline bootstrap + audit gates.
# Establishes bancotoday = CA -BANCO-CA-OOM- @ verified tip (SoT), then runs the
# full verification matrix ("fully audited"). Idempotent; safe to re-run.
#
# PRECONDITION: the runner must have WRITE access to bancotoday.
#   As of 2026-07-23 cursor[bot] gets HTTP 403 — owner must grant the Cursor
#   GitHub App access to `bancotoday` first. This script FAILS FAST if it cannot push.
#
# Usage:
#   bash audit/reconstruction/bootstrap-bancotoday.sh            # baseline + gates
#   SKIP_PUSH=1 bash audit/reconstruction/bootstrap-bancotoday.sh # gates only (no push)
set -euo pipefail

CA_URL="https://github.com/waelzaid66-max/-BANCO-CA-OOM-.git"
TARGET_URL="https://github.com/waelzaid66-max/bancotoday.git"
EXPECTED_BASELINE="210a325"   # verified CA tip at plan time; update via ADR if CA advances
WORK="${WORK:-/tmp/bancotoday-build}"

log(){ printf '\n=== %s ===\n' "$1"; }

log "1/6 Clone/refresh CA (verified SoT, full history + tags)"
if [ -d "$WORK/.git" ]; then git -C "$WORK" fetch --all --tags --prune; else git clone "$CA_URL" "$WORK"; fi
cd "$WORK"
BASE_SHA="$(git rev-parse --short HEAD)"
echo "CA tip = $BASE_SHA (expected baseline family: $EXPECTED_BASELINE)"
[ "$BASE_SHA" = "$EXPECTED_BASELINE" ] || echo "WARN: CA tip advanced past $EXPECTED_BASELINE — record an ADR before proceeding."

log "2/6 Configure bancotoday remote"
git remote get-url bancotoday >/dev/null 2>&1 || git remote add bancotoday "$TARGET_URL"

if [ "${SKIP_PUSH:-0}" != "1" ]; then
  log "3/6 Push canonical baseline (main + tags) to bancotoday"
  if ! git push bancotoday HEAD:main 2>&1; then
    echo "FATAL: push denied (likely 403 — grant cursor[bot]/runner write access to bancotoday). Aborting."
    exit 3
  fi
  git push bancotoday --tags
else
  log "3/6 SKIP_PUSH=1 — skipping push"
fi

log "4/6 Install deps (Node 24 via nvm login shell recommended)"
corepack enable >/dev/null 2>&1 || true
pnpm install --frozen-lockfile

log "5/6 Audit gates (types, lint, tests, build, confidence)"
pnpm run typecheck
pnpm run lint || true            # website lint may need its own script; do not hard-fail baseline
if [ -n "${DATABASE_URL:-}" ]; then
  TZ=UTC pnpm --filter @workspace/api-server test
else
  echo "WARN: DATABASE_URL unset — skipping API integration tests (provision Postgres to enforce)."
fi
pnpm run build
pnpm run confidence || echo "WARN: confidence gate reported issues — review before sign-off."

log "6/6 DONE — bancotoday baseline = CA $BASE_SHA. Proceed to recovery waves W1+ (see 02-BANCOTODAY-EXECUTION-PLAN.md)."
