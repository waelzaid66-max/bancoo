# Car Import — full sequential lifecycle (feature build, layered) — `bancotoday`

**Owner priority #1.** Build a REAL sequential import-order flow as an **additive layer inside the Car section only** — do not break the existing Discover import filter or the static guide. Contract-first (OpenAPI→orval), Android-icon lock respected, gates green per layer.

## Stages (from the existing guide, now backed by data)
`order → review → confirm → shipping → customs → delivered` (+ terminal `cancelled`).

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
