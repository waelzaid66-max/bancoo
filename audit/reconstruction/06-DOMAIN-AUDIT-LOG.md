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

### Cross-surface HARMONY (mobile ↔ API ↔ dealer-os ↔ admin-os ↔ data) — INTACT
| Check | Evidence | Status |
|---|---|---|
| One contract SSOT | `lib/api-spec/openapi.yaml` → `orval.config.ts` → `api-client-react` + `api-zod` (+ `postprocess.mjs`) | ✅ |
| All surfaces use GENERATED client | imports of `@workspace/api-client-react`: mobile 73 · **dealer-os 16** · **admin-os 19** · banco-web 47 · banco-website 47 · landing 0 (static) | ✅ |
| No contract drift | **zero** hand-written `fetch("/api/v1…")` bypassing the client | ✅ |
| One visibility rule on data | `publicVisibilityConditions()` applied on search (`SearchService.ts:409`), mapClusters (:541), facets (:600) | ✅ |
| One search pipeline (list/map/facets) | shared builder + `market_country` rule (:201) + pg_trgm | ✅ |
| Notifications single chokepoint | `createNotification` → prefs → DB → `sendPushToUser` (`NotificationService.ts:40,75`) | ✅ |
Confidence: High (verified). This is the "تناغم" across surfaces + data — architecturally sound and intact.

### Maps — INTACT
`SearchService.mapClusters` (:516) shares the same filters + `publicVisibilityConditions` as list search → list/map parity. Leaflet/OSM WebView client. Confidence: High.

## Pending domain audits (next)
Search ranking/facets deep · Notifications routing per-type + push (device) · Auth (Google/Apple live dict + Facebook new build) · Payments/wallet (Paymob keys) · Admin control deep (staffRole matrix).

## Genuine gaps (not code-present) tracked
1. Facebook login — new build (absent everywhere).
2. Coolify deploy — config on PR branches only; fix `gcs`→`s3`/`replit` in docs; migrate; readyz gitSha.
3. Device/EAS QA — OPS.
4. Live Clerk prod social providers (Google/Apple dict) — verify.

*bancoo untouched. bancotoday changes go via token-authorized pushes with secret-scan + green gates.*
