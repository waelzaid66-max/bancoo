# BANCO `bancotoday` — Professional Reconstruction Execution Plan

**Author:** Cursor cloud agent (`-8112`) · **Date:** 2026-07-23 · **Standard:** Principal Architect / Production Recovery
**Canonical target:** `bancotoday` (empty) · **Verified baseline source:** CA `-BANCO-CA-OOM-` @ `210a325` (SoT — see `00-…` / `01-…`)
**Prime rules:** FINISH not REBUILD · surgical/additive · every change gated (Impact→Dependency→Compat→Rollback→Verify) · no guessing (UNKNOWN + Confidence) · nothing merged without green gates + owner sign‑off.

> عربي: خطة تنفيذ احترافية لبناء `bancotoday` كنسخة كاملة **مدقّقة**. الأساس = CA `210a325` (المُثبت). كل موجة لها: هدف، نطاق داخل/خارج، تحليل أثر، بوابات تحقّق (typecheck/lint/test/build/guards)، خطة تراجع، وتعريف إنجاز. **لا تنفيذ فعلي قبل منح صلاحية الكتابة على `bancotoday`** (حاليًا 403 على `cursor[bot]`).

---

## 0) HARD PRECONDITION (blocking)
`git push` → `bancotoday` returns **403** — verified 2026‑07‑23 for **both** `cursor[bot]` (app not granted) **and** the owner PAT (`denied to waelzaid66-max` → token lacks `repo`/Contents:write). `bancotoday` currently holds only a placeholder `Initial commit` (README). **Nothing below can execute until a WRITE credential exists.** Unblock: grant Cursor app (`https://github.com/settings/installations`) **or** a Classic PAT with `repo` scope. Then `bootstrap-bancotoday.sh` runs (force main to replace the placeholder).

## 0.2) W0 PARTIAL EXECUTION (2026‑07‑23) — canonical staged on writable repo
Because `bancotoday` push is blocked (403; every provided token lacks `Contents:write`), the verified canonical baseline **CA `210a325` (full history + tags)** was staged where the agent DOES have write:
- **`bancoo` branch `canonical-ca-210a325`** = exact CA baseline (568 commits). Durable, ready to **mirror → `bancotoday:main`** with one force‑push once a `Contents:write` token exists:
  ```
  git clone https://github.com/waelzaid66-max/bancoo.git && cd bancoo
  git checkout canonical-ca-210a325
  git remote add bt https://x-access-token:<WRITE_TOKEN>@github.com/waelzaid66-max/bancotoday.git
  git push --force bt HEAD:main && git push bt --tags
  ```
- **Required token (fine‑grained):** resource owner `waelzaid66-max` · repo `bancotoday` · **Contents: Read and write** · **Workflows: Read and write** · Metadata: Read.

## 0.1) W0 pre‑flight AUDIT of the canonical baseline (executed 2026‑07‑23, evidence)
Run on CA `210a325` (the exact bytes destined for `bancotoday`), Node 24 / pnpm 11.9:
| Gate | Result |
|---|---|
| `pnpm install --frozen-lockfile` | ✅ PASS |
| `pnpm run typecheck` (9 packages) | ✅ PASS — 0 errors |
| `pnpm run lint` (`eslint scripts`) | ❌ **FAIL** — 1 error + 2 warnings |
| API tests / build | ⏳ not run this pass (API tests need a provisioned DB) |

**Lint defects to fix in W1 (both are CA‑only scripts, absent from `bancoo`):**
- `scripts/generate-production-protocol-reports.mjs:185:67` — `no-useless-escape` (unnecessary `\|`).
- `scripts/generate-production-validation-standard.mjs:56:7` — unused var `pnpm` (×2, `no-unused-vars`).
→ Surgical fix (remove escape / prefix unused with `_`) before CI can enforce `lint` green on the canonical. **Confidence: High (verified).**

---

## 1) Engineering principles (non‑negotiable)
1. **Single source of truth per feature.** Baseline = CA `210a325`. `bancoo`/mirrors are reference only.
2. **Surgical patches over rewrites.** Never rewrite a file a patch can fix. Never delete code before proving it dead.
3. **Evidence‑gated changes.** Every wave opens with an Evidence Card (`file:line` / SHA), closes with a guard test that fails if the fix regresses.
4. **Additive layering.** New capability = new layer under the existing shell; never melt sections / rebuild Home / duplicate the notifications chokepoint.
5. **Reproducibility.** All builds via `bootstrap-bancotoday.sh` + pinned catalog + `minimumReleaseAge`. No hand edits outside version control.
6. **Two‑surface deploy parity.** Coolify (priority, all pages) kept in lockstep with Replit until owner DNS cutover.
7. **Honesty.** No "done" without green gate proof; UNKNOWNs stay UNKNOWN.

---

## 2) Quality gates (every wave must pass — CI‑enforced)
| Gate | Command | Pass criteria |
|---|---|---|
| Types | `pnpm run typecheck` | 0 errors (all packages) |
| Lint | `pnpm run lint` (+ `lint:website`) | 0 warnings |
| API tests | `TZ=UTC pnpm --filter @workspace/api-server test` | all pass (real Postgres) |
| Mobile static | `node --test` icon/lib/resilience suites | all pass |
| Guards | section‑melt, profile‑menu regression, chain‑integrity‑gate | all pass |
| Build | `pnpm run build` | success |
| Confidence | `pnpm run confidence` | all gates pass |
| Deploy smoke | `/api/readyz` (gitSha), `/api/healthz` | 200 + gitSha matches image |

---

## 3) Execution waves (gated, ordered — no N+1 before N signed off)

### W0 — Canonical baseline (foundation)
- **Objective:** `bancotoday.main` = CA `210a325` (full history + tags), proven clean.
- **Steps:** `bootstrap-bancotoday.sh` → push `main` + tags → `pnpm install` → run all §2 gates.
- **DoD:** all gates green on `bancotoday`; provenance ADR committed (baseline SHA, date, source).
- **Rollback:** delete branch/reset (empty target — zero risk).
- **Confidence:** High. **Depends on §0 access.**

### W1 — Repo governance & CI/CD
- **Objective:** in‑repo guardrails so drift/pollution can't recur.
- **Scope (in):** `.github/workflows` (core + website + mobile split), `AGENTS.md`, ADR folder, `chain-integrity-gate` wired into CI, branch protection guidance, `.agents/memory` invariants ported as ADRs.
- **Scope (out):** product behavior.
- **Gates:** CI green on a no‑op PR; guard fails on a synthetic regression (e.g. re‑introduced `onStartShouldSetResponder`).
- **DoD:** every §2 gate runs in CI on PR; regression guards proven to fail‑closed.

### W2 — Deployment (Coolify‑first, full)
- **Objective:** all surfaces deployable on Coolify (owner priority), parallel to Replit.
- **Scope (in):** `docker-compose.coolify.yml`, `deploy/coolify/*`, S3 object‑storage provider, env/secrets registry (names only), `/api/readyz` gitSha pin, nginx/SSL/health/monitoring/backup runbook.
- **Reconcile:** compose currently ships frozen `banco-web`; align to `banco-website` cutover.
- **Gates:** container build + `/api/readyz` 200 with gitSha == image SHA; every SPA page reachable.
- **DoD:** full Coolify stack up on staging; rollback script verified; Replit unaffected.
- **Owner decision:** domains/SSL/secrets provisioning (OPS).

### W3 — FI (Banks) security completion
- **Objective:** close documented FI AuthZ gaps (`audit/financing/10`).
- **Scope (in):** agent PATCH branch‑scope enforcement, request state machine (contacted/closed), Verify→link correctness, KYC doc preservation.
- **Pre‑flight:** Impact on `meController`/`UserService`/FI services; dependency on role enum.
- **Gates:** new FI AuthZ tests (cross‑branch PATCH denied), regression suite green.
- **DoD:** FI CRM operable without privilege bypass; Evidence Cards per fix.

### W4 — Account‑types finalization
- **Objective:** the account model owner wants.
- **Scope (in):** **Dealer → "Banco Business"** label rename (i18n/UI, additive; DB enum decision via Impact analysis), confirm **Companies**, **Banks (`financial_institution`)**, and **clarify Supplier** (currently a B2B *feature*, not a role — owner decides if it becomes a role).
- **Pre‑flight:** enum migration risk (Compatibility Matrix; old app + new API one store cycle).
- **Gates:** all four/five journeys pass; typecheck/tests green.
- **Owner decision (blocking):** Is "Supplier" a distinct role? Does the DB enum migrate or only labels change?

### W5 — Authentication (incl. Facebook — NEW build)
- **Objective:** complete, precise auth per owner.
- **Evidence:** Facebook login is **absent in every repo** → this is a **new build, not recovery**.
- **Scope (in):** Clerk provider config + Meta app + `startSSOFlow` facebook strategy + button + callback + tests; re‑verify Google/Apple/email/OTP; session/refresh.
- **Gates:** live sign‑in per provider on staging (owner‑assisted); no stubs.
- **Owner decision (blocking):** provide Meta app credentials; confirm FB required.

### W6 — Mobile native UI recovery (device‑proven)
- **Objective:** the specific fixes owner flagged, verified on device.
- **Scope (in):** countries/currencies **compress to horizontal list** in the sections still showing them "spread" (target `MarketCountryPicker`/`CountryCodePicker`); pressed‑button sizing (iconBtn 12 lock); app icon/splash/fonts verification; bundle id decision (`com.bancooom.app` canonical); profile menu (already fixed in CA — verify carried).
- **Gates:** device QA matrix (Android+iOS) + guards; EAS preview build.
- **Owner decision:** which exact sections show non‑compressed pickers (needs device/screenshots); bundle‑id store‑listing check.

### W7 — Feature recovery sweep
- **Objective:** confirm no CA fix is missing in the canonical.
- **Scope:** Marketplace, Upload, Maps, Search, Messaging, Notifications, Payments (Paymob stays off until B5 owner call), AI, Admin, Mobile integration — file‑level parity vs CA; backport any gap as Evidence Card.

### W8 — Scale hardening (for millions)
- **Objective:** prove/enable scale.
- **Scope:** Redis shared rate limits, job queue, read replicas/index review, load test, observability (metrics/tracing), CDN. **Confidence today: not proven** — this wave makes it evidence‑backed.

### W9 — Release & Owner Final Acceptance
- Full gate sweep + device QA + deploy smoke + security/secret rotation → **written Owner Final Acceptance** → optional DNS cutover.

---

## 4) Cross‑cutting registries kept live (updated each wave)
Architecture · Knowledge Graph · Dependency Graph (+ dedupe/orphan scan — currently UNKNOWN) · DB Graph · API Graph · UI Graph · Feature Registry · Environment/Secrets Registry (names only) · Deployment Registry · Git Timeline · Decision Log · Risk/Regression/Impact/Compatibility Matrices · Rollback & Verification checklists. (Seeded in `01-MASTER-RECOVERY-PROGRAM.md`.)

## 5) Risk burndown (top)
| Risk | Mitigation | Sev |
|---|---|---|
| Pollution re‑enters (bulk commits) | baseline from CA + CI guards (W1) | Critical |
| FI privilege bypass | W3 AuthZ + tests | Critical |
| Scale unproven | W8 load test/Redis/queue | High |
| Store blocked (bundle drift) | W6 owner decision + check | High |
| Secret exposure | rotate + names‑only registry | High |
| Concurrent‑agent branch collisions | isolated `-8112` branch; no touch PR #5 | Medium |

## 6) Owner decisions gating specific waves
1. **Write access to `bancotoday`** (blocks W0 = everything).
2. Supplier role scope + DB enum migration (W4).
3. Facebook required + Meta credentials (W5).
4. Bundle id + store‑listing check (W6).
5. Domains/SSL/secrets for Coolify (W2).
6. Paymob enablement (later, B5).

## 7) Definition of Done (program)
All §2 gates green on `bancotoday`; device QA passed; Coolify full stack live + Replit parity; FI secure; auth complete (incl. FB); scale proven; registries current; **Owner Final Acceptance signed**. Until then: **not production‑accepted** (honesty rule).
