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

### Auth (Clerk) — CODE SOUND; gaps are env + Facebook(new)
| Check | Evidence | Status |
|---|---|---|
| SSO wired | `profile.tsx:528-529` `startSSOFlow` strategy = `oauth_google` / `oauth_apple` only | ✅ Google+Apple |
| Facebook login | **absent everywhere** (no `oauth_facebook`; not even a social-link) | ❌ new build |
| Clerk providers | mobile `ClerkProvider` @clerk/expo (`_layout.tsx:352`, `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`); API `clerkMiddleware` + `publishableKeyFromHost` multi-domain (`app.ts:126`) | ✅ |
| Auth→data harmony | `authGuard` `getAuth`→`req.userId=clerkId`→`getOrCreateUser` (lazy sync) | ✅ |
| Email/OTP | `email_code` via Clerk (`settings.tsx:565`) | ✅ |
| Social links (savable) | instagram/linkedin/whatsapp/website (`socialLinks.ts`) — not facebook | ✅ by design |
Genuine gaps: **Facebook = new build** (oauth_facebook strategy + button + Clerk/Meta app); **Clerk Dashboard (prod)** enable Google/Apple + **Allowed Origins** (prevents `pk_live` white-screen). Both OPS/owner. Confidence: High.

### Scale / performance (for millions) — mostly ready; 1 real gap
| Check | Evidence | Verdict |
|---|---|---|
| Keyset cursor pagination | `SearchService.ts:349-399` (created_at\|id, boundary-safe; offset only for price/popular) | ✅ scales |
| DB indexes | **149** indexes incl. listings created_at/price/status/category/user/location/trust (`schema:590-596`) | ✅ strong |
| Batch enrich (no N+1) | `enrichListings` uses `inArray(...)` — 2 batched queries per page (`:871-872`) | ✅ |
| Mobile virtualization | FlashList on feed + results (`(tabs)/index.tsx`, `SearchResultsSurface.tsx`) | ✅ (verify all long lists) |
| Notifications routing | single `routeForNotification` for in-app + push (`notificationRouting.ts:15,93`) | ✅ chokepoint |
| **Rate limiting** | `express-rate-limit` **in-memory**, no shared store (`rateLimiter.ts`) | ⚠️ **GAP: multi-instance needs Redis store** |
Verdict: foundation scales (cursor + indexes + batch); **genuine scale gap = shared-store rate limiting (Redis) + load test** for true millions/multi-instance. Not broken code — a production hardening (W8). Confidence: High.

## Pending domain audits (next)
Payments/wallet (Paymob keys) · Admin control deep (staffRole permission matrix) · Messaging thread · Search ranking/facets deep · verify remaining long lists virtualized.

## Genuine gaps (not code-present) tracked
1. Facebook login — new build (absent everywhere).
2. Coolify deploy — config on PR branches only; fix `gcs`→`s3`/`replit` in docs; migrate; readyz gitSha.
3. Device/EAS QA — OPS.
4. Live Clerk prod social providers (Google/Apple dict) — verify.

*bancoo untouched. bancotoday changes go via token-authorized pushes with secret-scan + green gates.*
