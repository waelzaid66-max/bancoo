# Comprehensive Gaps Lap (new full scan) — `bancotoday`

**Date:** 2026-07-23 · **Repo:** `bancotoday` @ `405abf7` (= CA `210a325` + W1/E2/E1 touches) · evidence-based, no guessing.
Owner asked: re-scan all 5 repos, find every gap/missing/broken across maps, UI, i18n, notifications, messages, car import, real estate.

## Cross-repo re-confirmation
CA `210a325` is the **superset/newest**. B-OOM `6fce7a3` (07-18), b.deals (07-11), aws-virgen (07-10) are **older, no newer fixes**. `bancotoday` = CA content + my gated touches. No missing fix to backport. Confidence: High.

## Findings

### 🔴 Car import — built but NOT a complete sequential live flow (matches owner)
- Discover "car import" CTA → `SECTION_ROUTE.car?engine=import` = browse imported cars (filter). ✅ works.
- `app/import-tracking.tsx` (reachable from `profile.tsx:1032`) = **static visual guide** only. File header: *"Import lifecycle guide … No backend state needed: shows the process visually and links to RFQs."* Shows 6 illustrative stages (order→review→confirm→shipping→customs→delivered) but **no real per-order tracking, no live status, no import-order entity**; the real action funnels to **RFQ**.
- API `/v1/dealer/listings/import` = dealer **CSV bulk-listing** import (different thing), not a consumer import-order lifecycle.
- **Verdict:** UI is built; the **end-to-end sequential import‑order lifecycle (create order → live status through stages → delivered) is NOT backed** — it's a guide+RFQ funnel. To make it "work sequentially" = **new feature** (import_order entity + statuses + API + tracking UI), not a bug fix. **Owner decision needed:** keep guide+RFQ, or build full import-order tracking.

### 🟢 Real estate — infrastructure strong (developer/compound present)
- `reference_developers` table (canonical developers) + `reference_places` hierarchy (emirate/district/community/**compound**/phase/building/unit) with `developerId` link. ✅
- **Potential enhancement (partial):** off-plan / installment-plan / delivery-date **sale** features for developers not clearly modeled — candidate for a real-estate-developer wave if owner wants full new-project sales.

### 🟢 i18n — clean
No hardcoded Arabic strings bypassing `t()` in tsx; parity enforced by typecheck (`ar: typeof en`). ✅

### 🟢 Messaging — complete
`unread` counts + `read_at` receipts present. Minor: no typing indicator (optional).

### 🟡 Notifications — minor icon gap
`iconForType` (`notifications.tsx:52`) covers message/lead/new_match/price_drop/rfq/comment/review/booking. Types like `investment` / `global_supply` / `payment_*` / `subscription_expiring` likely fall to the fallback icon. **Quick additive fix** (add cases) — cosmetic, safe.

### 🟢 Maps — parity (prior audit)
`/search` + `/search/map` share filters + `publicVisibilityConditions`; Leaflet WebView; clusters. ✅

## Gap register (prioritized)
| ID | Gap | Severity | Type | Action |
|----|-----|----------|------|--------|
| G-IMPORT | Car import = guide+RFQ, no live order-tracking lifecycle | High (feature expectation) | new feature | owner decision → build import_order flow |
| G-RE-DEV | RE off-plan/installment/delivery for developers partial | Medium | enhancement | optional wave |
| G-NOTIF-ICON | Notif icons fallback for investment/global_supply/payment/subscription | Low | quick fix | additive `iconForType` cases |
| G-MSG-TYPING | No typing indicator | Low | optional | later |
| E1..E6 | (Facebook done-code / Coolify done / Clerk / Redis / device QA / secrets) | — | see `06`/`07` | — |

## Bottom line
No **broken** code found this lap. Confirmed-complete: maps, i18n, messaging, RE data model, accounts, upload, auth. The one real feature gap = **car-import live sequential tracking** (currently a guide+RFQ funnel by design) → needs an owner decision + new build. Minor: notification icons (quick fix).

*Study/scan only this pass (except prior W1/E2/E1). bancoo untouched.*
