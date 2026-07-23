# Domain Audit + Assembly Log — `bancotoday`

Running log of deep per-domain audits + surgical assembly on `bancotoday` (= strongest line, from CA `210a325`, secret-free). Rule: verify deps → no break → no invention → gates green.

## Executed changes (pushed to bancotoday)
| Wave | Change | Commit | Gates |
|---|---|---|---|
| W1 hardening | Lint green: escape markdown pipe `\\|` in `generate-production-protocol-reports.mjs`; drop unused `pnpm` var in `generate-production-validation-standard.mjs` | `397b49e` | lint 0 ✅ · typecheck 0 ✅ · secret-scan clean |

## Domain audits (evidence, read-only)

### Account types — COMPLETE/INTACT (see `05-DEEP-AUDIT-ACCOUNT-TYPES.md`)
4 types + staff axis · DEMOTE_BLOCKED · anti-blind-dealer · FI #40 branch AuthZ · "Business Pro/Banco Business" i18n · suppliers=B2B surface. Confidence: High.

### UI (countries/currencies, Stay, Discover) — ALREADY CORRECT (see `04-DEEP-AUDIT-UI-FIXES.md`)
Compact `MarketCountryButton` everywhere; `marketMatrix` dead style; Stay header already trimmed; open PRs #46/#47/#48 stale/superseded. Confidence: High.

### Upload / Media — COMPLETE/INTACT
| Item | Evidence | Status |
|---|---|---|
| Pipeline request-url→PUT→verify→promote | `uploadController.ts` | ✅ |
| C-01 IDOR guard | `assertCallerMayUseUpload` + `upload_claims` + `UploadOwnershipError`→403 | ✅ |
| 503 when storage unconfigured | `uploadController.ts:131-137,306` | ✅ |
| Provider guard (s3\|replit only, **gcs rejected**) | `objectStorageProvider.ts:74` | ✅ (Coolify doc says `gcs` → **doc fix needed**, not code) |
| Video poster (sibling image, no frame-extract) | `create.tsx:1024` | ✅ |
| Edit-media wired (was dead in old line) | `edit/[id].tsx:26,221` `ListingMediaEditor` imported+used | ✅ |
Confidence: High (verified).

## Pending domain audits (next)
Maps/pins/clusters · Search/pg_trgm/facets · Notifications (in-app+push) · Auth (Google/Apple live + Facebook new build) · Payments/wallet · Admin.

## Genuine gaps (not code-present) tracked
1. Facebook login — new build (absent everywhere).
2. Coolify deploy — config on PR branches only; fix `gcs`→`s3`/`replit` in docs; migrate; readyz gitSha.
3. Device/EAS QA — OPS.
4. Live Clerk prod social providers (Google/Apple dict) — verify.

*bancoo untouched. bancotoday changes go via token-authorized pushes with secret-scan + green gates.*
