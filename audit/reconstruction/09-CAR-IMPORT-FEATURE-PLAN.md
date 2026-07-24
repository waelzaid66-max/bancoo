# Car Import — full sequential lifecycle (feature build, layered) — `bancotoday`

**Owner priority #1.** Build a REAL sequential import-order flow as an **additive, standalone Import surface** — **NOT inside the `/section/car` mini-app** (owner correction 2026-07-23). Contract-first (OpenAPI→orval), Android-icon lock respected, gates green per layer, no other feature touched.

## Surface map (precise — where work goes)
| Surface | Route/file | Role | Touch? |
|---|---|---|---|
| Cars browse mini-app | `/section/car` (`components/search/SectionSearchApp`) | browse cars (own Discover icon) | **NO** |
| Browse imported cars | Discover CTA `discover-car-import` → `/section/car?engine=import` | filter existing imported listings | **NO** (stays) |
| **Import service (order lifecycle)** | `app/import-tracking.tsx` (Stack, from Profile `importTrackCta`) + **new** `app/import/request.tsx` | request + live tracking | **YES (here)** |
| Navigation | `app/_layout.tsx` (register new Stack route) | dependency | YES (additive route reg) |
| Backend | `import_orders` (done) + OpenAPI + service + routes | data/API | YES |

**Deployment ripple (per mile):** new Stack routes → mobile/EAS bundle + `_layout` nav; API table → API deploy + `push-force` migrate; OpenAPI → codegen touches all client consumers (additive only).

## VISUALLY VERIFIED (web-export, seen not just read) — 2026-07-24
Ran the app (web export) and SAW the screens:
- Search/Discover **does** have a standalone **"Car import" card** (maroon, "Browse imported vehicles"), separate from the 4 section cards + Booking + "Explore on map" + Global-supply cards. ✅ (matches owner + code)
- Today the card = **browse imported only** → `/section/car?engine=import`. It is NOT an import-service entry.
- import-tracking (service guide) sits behind Profile/auth → hidden; Profile needs real Clerk (test key can't init).
Screenshots: `banco_discover_import_card.webp`, `banco_car_import_card_closeup.webp`.

### Reality-based placement (revised, additive — confirm before code)
Make the **"Car import" card → an Import hub** `app/import/index.tsx` with (a) **Browse imported cars** (existing route, unchanged), (b) **Request a car import** → new `app/import/request.tsx` (creates `import_order`), (c) **My import orders** → upgraded `app/import-tracking.tsx` (live stages). Card stays on Search; browse path preserved (no break). Entry also from Profile (existing `importTrackCta`). NOT inside `/section/car`.

## Compatibility re-audit of pushed work (all ✅)
`fd36493` schema = single-file additive table, no FK/edits to existing tables (isolated; earlier "inside car section" wording was imprecise — the table is standalone). `405abf7` SSO/icons isolated. `88cec6c` deploy additive. `397b49e` scripts. Sequential on main, no conflicts.

## Stages (from the existing guide, now backed by data)
`order → review → confirm → shipping → customs → delivered` (+ terminal `cancelled`).

## Full scope (owner 2026-07-24): production layers · keep existing (support `import-tracking`, don't delete) · wire notifications + emails · exact placements
| Piece | Exact location | Rule |
|---|---|---|
| DB order table | `lib/db` `import_orders` + `import_order_stage` (done) | additive |
| DB notif type | `lib/db` `notificationTypeEnum` += `"import"` | additive |
| API contract | `lib/api-spec/openapi.yaml`: `POST /v1/import-orders`, `GET /v1/import-orders/mine`, `GET /v1/import-orders/{id}` + schemas `ImportOrder`,`ImportOrderListItem`,`CreateImportOrderBody`,`ImportOrderStage` (mirror bookings) | additive; codegen after |
| Service | `ImportOrderService.ts`: create/listMine/get/advanceStage; **on create + each stage → `createNotification({type:"import",...})` + `EmailService.sendImportUpdateEmail`** | mirror RfqService + AlertService wiring |
| Email | `EmailService.ts` += `sendImportUpdateEmail(args)` (bilingual AR/EN, like `sendNewMatchEmail`) | additive |
| Controller+routes | `importOrderController.ts` + mount in `routes/v1` (`requireAuth`; stage-advance = staff `requirePermission`) | mirror rfq |
| Notif routing (mobile) | `lib/notificationRouting.ts` += `case "import"` → `/import-tracking` (or order detail); `notifications.tsx iconForType` += `import`→`truck` (mapped) | keep guards green |
| Mobile: Import hub | `app/import/index.tsx` (new): 3 entries — Browse imported (existing route, unchanged) · Request import (new) · My orders/tracking | **keep** existing `import-tracking` (upgrade to real orders, guide = empty state) |
| Mobile: Request | `app/import/request.tsx` (new) → `useCreateImportOrder` | Stack route in `_layout.tsx` |
| Mobile: Tracking | `app/import-tracking.tsx` upgraded → `useListMyImportOrders` live stages; **do NOT delete the guide** (owner: support existing menu work) — becomes empty-state | additive |
| Entry rewire | Search "Car import" card → `/import` hub (browse still one tap inside); Profile `importTrackCta` stays | no break to `/section/car` |
| i18n | EN+AR keys under `importTrack` + new `import.*` | parity |
| Gates | typecheck all · icons/i18n/section guards · secret-scan · migrate `push-force` | per layer |

## Layered plan (each layer: verify typecheck/guards → push)
| Layer | Scope | Status |
|---|---|---|
| **1. DB** | `import_orders` table + `import_order_stage` enum (isolated, indexed by user+stage) | ✅ DONE `fd36493` (db+libs typecheck 0) |
| **2. OpenAPI contract** | `POST /v1/import-orders` (create), `GET /v1/import-orders/mine` (my orders), `GET /v1/import-orders/{id}` (detail). Schemas: `ImportOrder`, `ImportOrderDetail`, `CreateImportOrderBody`, `ImportOrderStage`. Additive-only; grep namespace first | ⏳ next |
| **3. codegen** | `pnpm --filter @workspace/api-spec run codegen` (orval → api-client-react + api-zod + postprocess). Verify `typecheck:libs` 0 | ⏳ |
| **4. Service** | `ImportOrderService.ts` mirroring `RfqService`: `createImportOrder(clerkId,input)`, `listMyImportOrders(clerkId)`, `getImportOrder(clerkId,id)`, `advanceImportStage(id,stage)` (staff). Resolve clerkId→userId like RfqService | ⏳ |
| **5. Controller + routes** | `importOrderController.ts` + mount under `routes/v1` with `requireAuth` (create/mine/detail); stage-advance gated `requirePermission` (staff). Follow rfq wiring exactly | ⏳ |
| **6. Mobile UI (car section only)** | (a) `RequestImportForm` (brand/model/year/budget/origin/note) → `useCreateImportOrder`; entry from car-import CTA / import-tracking. (b) `import-tracking.tsx` upgraded: real orders via `useListMyImportOrders`, live stage progress (keep guide as empty-state); detail via `useGetImportOrder`. i18n EN+AR keys under existing `importTrack`. Icons: reuse mapped stage icons (file-text/clock/check-circle/truck/shield/package) — NO `ship`/`anchor` (unmapped → Android tofu, per `.agents/memory/banco-icon-font-pinning`) | ⏳ |
| **7. Gates** | typecheck (all) · icons.test.mjs · i18n-usage.test.mjs · section-miniapp-guard · secret-scan → push. Migration on deploy = `push-force` (memory) | ⏳ |

## Invariants respected (dependency review)
- **Section isolation:** flow lives under `SECTION_ROUTE.car` / import-tracking; never melts into shared Search.
- **Contract harmony:** mobile uses ONLY generated hooks (no hand fetch) — must go through OpenAPI+codegen.
- **Android icons:** every icon name must exist in `components/icons.tsx` registry (guard-enforced). Stage icons chosen are already mapped.
- **i18n parity:** every new string in EN and AR (`ar: typeof en` typecheck).
- **No breaking:** existing import filter (`?engine=import`) + guide stay; purely additive.
- **DB migrate:** `push-force` non-interactive at deploy.

## Verification without live DB (this environment)
typecheck + guard tests + codegen success are the gates (same as project CI). Live end-to-end (create→advance→track) needs a provisioned DB + running API (owner/OPS) — will validate there.
