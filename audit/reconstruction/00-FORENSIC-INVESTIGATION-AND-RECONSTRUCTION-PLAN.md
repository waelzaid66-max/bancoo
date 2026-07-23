# BANCO Master Reconstruction — Forensic Investigation & Plan (pre‑code)

**Author:** Cursor cloud agent (run `-8112`)
**Date:** 2026-07-23
**Target canonical repo:** `https://github.com/waelzaid66-max/bancotoday.git` (currently **EMPTY**, verified `gh repo view` → `isEmpty: true`)
**Engineering source of truth:** `-BANCO-CA-OOM-` @ **`210a325`** (verified tip, tag line `v1.4.0-stable-2026-07-18`)
**This working tree:** `bancoo` @ `321af02` (orphan handoff)
**Governance in force:** `audit/handoff/FINISH-NOT-REBUILD-LOCK-AR.md` + `audit/handoff/MASTER-ARCHITECT-LEDGER-AR.md` (owner lock 2026‑07‑23)
**Honesty policy:** every claim below is either verified against a repo/commit (marked ✅ VERIFIED) or explicitly flagged as unverified. Nothing is fabricated.

> ملخّص تنفيذي (عربي): هذا تحقيق جنائي قبل أي كود. **مصدر الحقيقة الهندسي هو ريبو CA عند `210a325`** — وليس هذا الريبو (`bancoo`). أُثبِت أن `bancoo` **متأخّر (~85 ملف) وملوّث** مقابل CA (قائمة البروفايل، حماية الـdemote، بوابة السلاسل، معرّف الحزمة). الريبو الجديد `bancotoday` **فارغ**. لذلك إعادة البناء = **نسخ نظيف موثّق من CA**، لا من `bancoo`. لا يُكتب كود إلا بعد اعتماد المالك للتقارير أدناه. القواعد الملزمة: FINISH لا REBUILD، إضافي فقط، لا لمس موبايل/API/dealer/admin بدون أمر.

---

## 0) VERIFIED CA ↔ bancoo delta (the decisive gap‑diff)

Method: read‑only shallow clone of CA `main` (`210a325`) into `/tmp/ca-oom`; direct file comparison against `/workspace` (`bancoo`).

| Item | CA `210a325` | bancoo `321af02` (this tree) | Verdict |
|---|---|---|---|
| Provenance of bancoo (`93f2c7e`) | **not found** (`gh api …/commits/93f2c7e` → HTTP 422) | claims source `93f2c7e` | ✅ VERIFIED — bancoo provenance unverifiable/orphan |
| Profile menu (P‑01) | clean: `maxHeight:"85%"`, **no** `onStartShouldSetResponder` | polluted: `onStartShouldSetResponder` @ `profile.tsx:2216`, **no** `maxHeight` | ✅ VERIFIED — bancoo carries the reverted regression |
| S4 self‑demote block | present (`meController.ts`, `UserService.ts`, `chain-integrity-gate.mjs`) | **absent** | ✅ VERIFIED |
| `scripts/chain-integrity-gate.mjs` | present | **absent** | ✅ VERIFIED |
| `readyz` gitSha/buildId (`deployPin`) | present | present **on `coolify-c0-harden` base** (added by PR #4); absent on `bancoo` main | ✅ VERIFIED (closed on deploy branch) |
| Mobile bundle id | `com.bancooom.app` (canonical) + scheme `bancooom` | `com.bancoboom.app` (drift) + scheme `bancooom` | ✅ VERIFIED — bancoo stale |
| Expo SDK | `expo ~54.0.36` | `expo ~54.0.36` | ✅ VERIFIED equal (master‑ref "53" is stale) |
| `reports/continuous-recovery/` | present | **absent** | ✅ VERIFIED |
| Surfaces (8) | all present | all present | ✅ VERIFIED parity |
| Mobile screens / API services | 54 / 96 | 54 / 96 | ✅ VERIFIED parity |
| Total tracked files | **2111** | **2026** (~85 fewer) | ✅ VERIFIED — bancoo behind |

**Interpretation:** `bancoo` is a near‑complete but **slightly‑behind + partially‑polluted** snapshot from an **unverifiable** source. It matches the prior architect's F0 exactly: **A = CA (SoT); B = bancoo (rejected as primary); C = bancooom (GCP mirror, was empty)**. Reconstruction into `bancotoday` must draw from **CA**, applying CA's surgical fixes and guards, never a whole‑tree copy of `bancoo`.

---

## 1) Executive Summary
BANCO / B‑OOM is a pnpm monorepo: Expo mobile app (primary product) + one Express/Drizzle API + admin‑os + dealer‑os (Banco Market) + landing + two Next.js website twins (`banco-web` FROZEN, `banco-website` active) + shared `lib/*`. Production has **never been accepted** (all recovery reports: "NO"). The definitive engineering line is **CA `210a325`**. Confidence: **High** (verified).

## 2) Architecture Recovery Report
Layers `L‑WORLD→…→L‑DELIVER` (`DEEP-SYSTEM-CHRONICLE-LAYERS-AR.md`). Mobile: Home=Feed; Discover under Search → `SECTION_ROUTE → /section/*` isolated `useSearchMiniApp` + `lockCategory`; Leaflet/OSM map (not Google). API: Express 5 ESM, `/api/v1/*`, OpenAPI SSOT→Orval, health binds port before DB, Clerk app‑wide, Postgres+Drizzle+`pg_trgm`, node‑cron jobs. Boundaries: mobile ⊄ api/db; web ⊄ mobile/api/db; website consumes API + `lib/*`. Invariants: SVG icons, no Home search bar, no Discover strips, Stay black header, bookable pins RE‑only. Confidence: **High**.

## 3) Source of Truth Report
Engineering=CA `210a325`; deploy targets: `bancoo`→Coolify/Hostinger (+Replit), `bancooom`→GCP, `aws-virgen`→AWS; website canonical=`banco-website`; **new canonical going forward = `bancotoday` (built from CA)**. Contradiction rule = newer wins: Expo=54 (code) over 53 (master‑ref); website=`banco-website` (FROZEN.md 2026‑07‑21) over `banco-web`; bundle id = `com.bancooom.app` (CA) over `com.bancoboom.app` (bancoo). Owner‑only unresolved: Stay header (live=black), bundle‑id store migration, Facebook Login (rejected unless ordered). Roles: Owner=authority; Cursor=writes prod code; Replit=run‑proof only; Copilot=UNTRUSTED; Claude=reviewer.

## 4) Missing Knowledge Report
Cannot be reconstructed from repo artifacts alone: prior agent **transcripts** (only this agent visible); owner's **original full goal spec / paused conversation** (partially in `audit/*`); **`.agents/memory/*`** not deep‑read; **live runtime** (device/EAS/secrets/live readyz/DB enum) ~0% proven; **dependency dedupe/orphan** not yet run. CA content is now available (cloned) — this closed the largest gap.

## 5) Risk Assessment
(1) Reconstructing from `bancoo` inherits pollution — must use CA. (2) Bulk‑commit erasure pattern (`93b650b`) is the historical regression root cause. (3) Concurrent agents on overlapping branches (ledger PR #5 vs this run) — collision risk. (4) FI AuthZ gap (agent PATCH branch bypass). (5) Scale unproven (no Redis/queue/load test). (6) Bundle‑id drift blocks store. (7) Object storage Replit sidecar vs S3. (8) Secrets exposed in chat → rotate. All **High** except (7) Medium‑High.

## 6) Dependency Audit (verified)
pnpm 11.9, Node 24 (no `engines` pin), `.npmrc` hoisted + RN/expo public‑hoist. Catalog single‑versions: react/react‑dom 19.1.0, next ^15.3.4, vite ^7.3.2, drizzle‑orm ^0.45.2, zod 3.25.76, tsx 4.21.0. `minimumReleaseAge: 1440` (supply‑chain delay). react consistent via catalog across all surfaces. **Not yet verified:** zero‑duplicate/zero‑orphan (needs `pnpm dedupe --check` + depcheck).

## 7) Expo Readiness Report (verified)
expo `~54.0.36`, react-native `0.81.5`, expo-router `~6.0.24`, reanimated `~4.1.1`, expo-notifications `~0.32.17`, TS `~5.9.3`, **@clerk/expo pinned `3.3.1`** (3.4.x crashes Expo Go). `newArchEnabled: true`; `metro.config.js`+`babel.config.js`+`eas.json` present; EAS projectId set; scheme `bancooom`. Limit: Expo Go (SDK 53+) no remote push → EAS build required. Build reproducibility unverified (no EAS run).

## 8) Native Mobile Readiness Report
iOS/Android with new architecture; `https` deep links. **Store blocker:** bundle id — CA canonical `com.bancooom.app` vs bancoo `com.bancoboom.app`; owner must confirm and check no existing store listing before shipping. Device/EAS QA = OPEN across all mobile audits. Push needs real build + `push_tokens` + permission; `inApp:false` disables push.

## 9) Repository Reconstruction Plan (`bancotoday`)
Clean rebuild **sourced from CA `210a325`**, verified module‑by‑module; never copy `bancoo` wholesale.
1. Provenance ADR pinning CA baseline SHA.
2. Scaffold: pnpm workspace + catalog + `minimumReleaseAge`; Node 24; hoist `.npmrc`; base TS/ESLint; CI split (core/website/mobile).
3. Port verified: `lib/*` → api‑server → banco‑mobile → admin/dealer/landing → `banco-website` (only). Carry guards: section‑melt, profile‑menu regression test, chain‑integrity‑gate, DEMOTE_BLOCKED, readyz gitSha, SVG icons.
4. Governance ADRs (FINISH‑NOT‑REBUILD, DO‑NOT‑TOUCH, ADS‑FIRST, website plug) + `AGENTS.md`.
5. Deploy layer (Coolify/GCP/AWS); website as detachable plug.
6. Resolve owner decisions (bundle id, Stay header, FB login) as ADRs first.

## 10) Phase‑by‑Phase Execution Roadmap (post‑approval)
- **P0** Provenance & gap diff — **DONE** (this document; CA cloned, delta verified, baseline `210a325` pinned).
- **P1** Clean scaffold of `bancotoday` (compiles+lints, empty apps).
- **P2** Shared libs verified vs CA.
- **P3** API from CA (+ readyz gitSha, DEMOTE_BLOCKED, C‑01..H‑03) tests green.
- **P4** Mobile from CA + invariants/guards; typecheck+guard tests; then EAS build + device QA (OPS/owner).
- **P5** admin‑os / dealer‑os / landing.
- **P6** `banco-website` (independent, plug‑isolated).
- **P7** Deploy + secrets + Owner Final Acceptance.
- Gate: no phase N+1 before acceptance test + written owner approval.

---

## Appendix — verification commands (reproducible)
```
gh repo view waelzaid66-max/bancotoday --json isEmpty            # → true (empty)
gh api repos/waelzaid66-max/-BANCO-CA-OOM-/commits/main -q .sha   # → 210a325…
gh api repos/waelzaid66-max/-BANCO-CA-OOM-/commits/93f2c7e        # → HTTP 422 (not found)
git clone --depth 1 https://github.com/waelzaid66-max/-BANCO-CA-OOM-.git /tmp/ca-oom
# then compare: profile.tsx (onStartShouldSetResponder/maxHeight), DEMOTE_BLOCKED,
# scripts/chain-integrity-gate.mjs, app.json bundleIdentifier, reports/continuous-recovery
```
