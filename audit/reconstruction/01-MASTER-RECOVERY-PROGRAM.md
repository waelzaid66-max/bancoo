# BANCO MASTER RECOVERY PROGRAM — Phase A (Discovery) + Phase B (Planning)

**Author:** Cursor cloud agent (run `-8112`) · **Date:** 2026-07-23
**Mode:** ANALYSIS ONLY — no code fix / refactor / cleanup / migration / merge. This document (and the SoT registries) is the *deliverable* of Phase A/B; it is committed as **documentation** on a dedicated branch so it reaches you via PR — that is the delivery mechanism, not a code change.
**Integrity rules honored:** no guessing; every claim is ✅ VERIFIED (against a repo/commit/file) or marked **UNKNOWN**; conflicts get an **Evidence Card**; each conclusion carries a **Confidence** score.

> عربي (ملخّص): هذه المرحلة **دراسة فقط**. مصدر الحقيقة الهندسي المُثبت بالأدلة = **CA `-BANCO-CA-OOM-` @ `210a325`**. الريبو الحالي `bancoo` **متأخّر وملوّث**. لا يوجد في الكود: إعادة تسمية Dealer→«بانكو بيزنس»، ولا نوع «Supplier»، ولا تسجيل دخول Facebook — كلها **غير موجودة كدليل** (تُبنى/تُعتمد في Phase C، ليست «استرجاعًا»). أسماء «replit» في الكود كلها **أدوات بناء/متغيرات بيئة، ليست إعلانات ظاهرة للمستخدم**. النشر أولوية **Coolify بالكامل ثم بالتوازي مع Replit**. لا كود قبل اعتماد Phase B.

---

## 0) EVIDENCE CARDS (conflicts — resolve before Phase C)

### EC‑0 — Which repo is the target? (RESOLVED by owner 2026‑07‑23)
- **Owner decision (2026‑07‑23):** build the canonical copy in **`bancotoday`**, sourced from the verified line — *"انت هتعمل النسخة هنا [bancotoday]"*.
- **Resolution:** target = **`bancotoday`** (empty); baseline source = **CA `-BANCO-CA-OOM-` @ `210a325`** (verified SoT, EC‑1); **NOT** `bancoo` (polluted orphan). **Confidence: High.**
- **BLOCKER (verified 2026‑07‑23):** the cloud agent token `cursor[bot]` has **no write access to `bancotoday`** → `git push` returns **HTTP 403** ("Permission to waelzaid66-max/bancotoday.git denied to cursor[bot]"). Same class as the documented `aws-virgen` 403 (`docs/AWS_VIRGEN_FULL_PUBLISH.md`).
  - **Unblock (owner):** GitHub → Settings → GitHub Apps → **Cursor** → Repository access → add **`bancotoday`** (or grant the Cloud Agent environment access to it). Then re‑run this agent.
  - **Ready‑to‑run once unblocked (from a full CA clone):**
    ```
    git clone https://github.com/waelzaid66-max/-BANCO-CA-OOM-.git src && cd src
    git remote add bancotoday https://github.com/waelzaid66-max/bancotoday.git
    git push bancotoday HEAD:main     # canonical baseline = CA 210a325 (full history)
    git push bancotoday --tags        # v1.0.0-rc … v1.4.0-stable
    ```
  - CA clone verified this session: **568 commits, 10 tags, tip `210a325`**.

### EC‑1 — Engineering Source of Truth
- **Resolution:** **CA `-BANCO-CA-OOM-` @ `210a325`** (newest continuous line + only repo tagged through `v1.4.0-stable` *and* carrying post‑tag recovery). **Confidence: High (verified).**
- `bancoo`'s claimed source `93f2c7e` **does not exist in CA** (`gh api …/commits/93f2c7e` → HTTP 422) → `bancoo` provenance unverifiable.

### EC‑2 — Facebook Login
- **Owner (new):** Facebook login is wanted, precise integration.
- **Evidence:** `oauth_facebook` = **0 hits in ALL repos**; `facebook` = 0 in mobile. → **Nothing to recover; must be newly built** (Clerk provider + Meta app + strategy + button + test). Prior audits marked it "rejected/stub‑forbidden" — that is now **superseded by owner order**. **Confidence: High (verified absent).**

### EC‑3 — Account types naming ("Banco Business", "Suppliers")
- **Owner:** 5 types — Personal, **Banco Business (was Dealer)**, Companies, Suppliers, Banks.
- **Evidence:** code has **4 roles** `individual | dealer | company | financial_institution` (UI group `personal | business`); **`supplier` role = 0**, **"Banco Business" = 0** across CA/bancoo/B‑OOM. → rename + Supplier type are **NOT in code (UNKNOWN/pending)**, not lost work. **Confidence: High (verified absent).**

### EC‑4 — Bundle id
- CA & B‑OOM = `com.bancooom.app` (canonical); **bancoo = `com.bancoboom.app` (stale)**. Store migration is owner‑gated (check for existing listing). **Confidence: High (verified).**

### EC‑5 — Replit naming → BOOM
- **Evidence:** all `replit` refs are **build tooling / env** (`@replit/vite-plugin-*` in landing/mockup‑sandbox, `REPLIT_*` env in `next.config`/mobile `build.js`). **No user‑facing Replit "ads"/branding in code.** → the "convert to BOOM ads" task has **no user‑facing target**; only optional dev‑tooling cleanup (non‑urgent, additive). **Confidence: High (verified).**

---

## 1) Cross‑Repository Comparison (5 repos) + recency timeline

| Repo | Tip | Date | Tags | Role (by evidence) | Conf |
|---|---|---|---|---|---|
| **`-BANCO-CA-OOM-` (CA)** | `210a325` | 2026‑07‑21 | →`v1.4.0-stable` + post‑tag | **Engineering SoT** — has profile fix, `chain-integrity-gate`, S4 demote‑block, `reports/continuous-recovery/`, canonical bundle | High |
| **`bancoo` (this repo)** | `321af02` | 2026‑07‑21 | (none) | Orphan dump; **~85 files behind CA + polluted** (profile regression, stale bundle, missing gates) | High |
| **`B-OOM`** | `6fce7a3` | 2026‑07‑18 | →`v1.4.0-stable` | Mirror at v1.4.0; canonical bundle but **still has profile regression**, no `chain-integrity-gate` → pre‑07‑19 | High |
| **`b.deals`** | `8f7a63a` | 2026‑07‑11 | `v1.1.4` | Stale mirror (10 days behind CA) | High |
| **`aws-virgen`** | `d386f52` | 2026‑07‑10 | →`v1.1.3` | Stale AWS deploy mirror | High |

**Timeline (evidence):** `v1.0.0-rc` (07‑08) → stabilize/production `v1.1.x` (07‑10/11; aws‑virgen & b.deals froze here) → `v1.2/1.3/1.4.0-stable` (07‑17/18; B‑OOM froze here) → **CA continued 07‑19 sections/FI day (#25–#41) + 07‑21 media/identity → `210a325`** → **`bancoo` orphan snapshot 07‑21 (divergent/behind)**.
**Conclusion:** Recovery source = **CA only**. b.deals/aws‑virgen/B‑OOM hold **no newer‑than‑CA fixes** (all older tips). **Confidence: High.**

---

## 2) BANCO Source‑of‑Truth Registries (living; grounded)

- **Master Architecture:** monorepo (pnpm 11.9, Node 24) — surfaces `banco-mobile` (Expo 54), `api-server` (Express 5), `admin-os`, `dealer-os`, `landing`, `banco-web` (FROZEN) / `banco-website` (active), `lib/*`. Layers `L-WORLD→L-DELIVER` (`audit/handoff/DEEP-SYSTEM-CHRONICLE-LAYERS-AR.md`).
- **Feature Registry (4 account roles):** `individual` (Personal) · `dealer` (owner wants → "Banco Business", **not yet in code**) · `company` (Companies) · `financial_institution` (Banks). Supply/RFQ is a **B2B feature**, not a "Supplier" role. **Confidence: High.**
- **DB Graph:** Postgres + Drizzle (`lib/db/src/schema/index.ts`), `userRoleEnum` default `dealer`, `pg_trgm`; FI tables (intermediaries/branches/seats) per `audit/financing/*`.
- **API Graph:** `/api/v1/*` (OpenAPI SSOT → Orval); health `/api/healthz|livez|readyz`.
- **UI Graph (mobile):** Home=Feed; Discover(under Search)→`/section/*` isolated mini‑apps; `MarketCountryPicker`/`CountryCodePicker` (currency/country); Leaflet map.
- **Dependency Graph:** catalog‑pinned (react 19.1.0, next 15.3.4, vite 7.3.2, drizzle 0.45.2, zod 3.25.76); `minimumReleaseAge:1440`. Dedupe/orphan scan = **UNKNOWN (not run)**.
- **Environment/Secrets Registry (names only):** `DATABASE_URL, PORT, SESSION_SECRET, PAYMENT_CONFIG_ENCRYPTION_KEY, CLERK_*`; optional `RESEND_API_KEY (revoked), OPENAI_API_KEY (unset), PAYMOB_* (test), OBJECT_STORAGE_*`. **Rotate chat‑exposed secrets.**
- **Deployment Registry:** Coolify/Hostinger (`docker-compose.coolify.yml` + `deploy/coolify/*`) — **owner priority: Coolify first, all pages, parallel to Replit**; GCP (`bancooom`); AWS (`aws-virgen`); Replit (live `banco.today`).
- **Invariants Registry (`.agents/memory/`, 85 locks):** `banco-home-no-search-bar`, `banco-stay-header-lock` (black), `banco-scheme-canonical` (`bancooom`), `banco-icon-font-pinning`/`banco-android-icon-fonts` (SVG), `banco-section-pages`/`banco-search-discover-locks` (no melt/strips), `banco-push-notifications`. **Port these as guards in Phase C.**
- **Decision Log:** FINISH‑NOT‑REBUILD (owner 07‑23); ADS‑FIRST; Cursor=writes code, Replit=proof‑only, Copilot=UNTRUSTED; no whole‑tree merge; no `booking-notif-test-contract-4322` merge.

---

## 3) Targeted audits (owner's explicit concerns)

| Concern | Finding (evidence) | Conf | Phase‑C action |
|---|---|---|---|
| Account‑types maintenance "broke in last Replit assembly" | Verified regression pattern: `93b650b` (Replit bulk commit) wiped surgical fixes; `bancoo` still carries profile P‑01 regression while CA is fixed | High | Backport CA state surgically (EC‑1) |
| Dealer→"Banco Business" rename | **Not in any repo** | High | New additive rename (labels/i18n) — owner‑approved, DB enum stays `dealer` or migrate (Impact analysis first) |
| Supplier as account type | **Not a role** (supply=B2B feature) | High | Clarify with owner; likely no new role |
| Banks (FI) | `financial_institution` role + FI CRM exist; **W3 AuthZ gap open** (agent PATCH branch bypass) | High | W3 FI security wave |
| Facebook login | **Absent everywhere** | High | New build (Clerk+Meta), precise |
| Icons/splash/fonts | SVG lock + icon pinning in memory; CA `7d5f6b2` PNG‑square fix; verify on target tip | Medium | Verify then guard |
| Pressed buttons (iconBtn 12 vs 8) | Locked in memory; regression history (`iconBtn 12→8`) | Medium | Guard + surgical restore if regressed |
| Countries/currencies "spread not compressed" in some sections | Component = `MarketCountryPicker`; exact offending sections need device/visual proof | **UNKNOWN (needs device)** | Visual audit → compress to horizontal list |
| Replit naming → BOOM | Only tooling/env refs; no user‑facing ads | High | Optional dev‑tooling cleanup |
| Bundle id | bancoo stale `com.bancoboom.app` vs canonical | High | Owner decision + store check |

---

## 4) Deployment audit (Coolify‑first, per owner)
- `docker-compose.coolify.yml` builds: `postgres` + `api` (:8080) + `banco-web` (:3000) + `banco-website` (:3001) + `web` (nginx: landing+admin‑os+dealer‑os). **Note:** compose still deploys `banco-web` (frozen) as "consumer app" — reconcile with the `banco-website` cutover (EC‑0/website split).
- Migrations manual; object storage needs S3 provider off‑Replit; health `/api/readyz` (+gitSha on coolify branch). SSL/domains/monitoring/backup = OPS‑pending (`docs/DEPLOY_COOLIFY.md`). **Confidence: High** on files; **Medium** on live readiness.

## 5) Risk / Regression / Compatibility (condensed)
- **Critical:** reconstructing from `bancoo` (inherits pollution) → source from CA; FI AuthZ gap; bulk‑commit erasure recurrence.
- **High:** scale unproven (no Redis/queue/load test); bundle drift blocks store; secrets rotation; concurrent‑agent branch collisions.
- **Regression rule:** every fix ⇒ Impact Analysis + Dependency Analysis + Compatibility check + Rollback + guard test, before merge (no exceptions).

## 6) Prioritized Repair Roadmap (Phase C — after approval, surgical, additive)
- **W0 — SoT lock:** resolve EC‑0 (target repo) + pin CA baseline; no code.
- **W1 — Evidence backport (CA→target):** profile P‑01 fix, `chain-integrity-gate`, S4 demote‑block, `reports/continuous-recovery`, canonical bundle id — each as an Evidence Card + guard + rollback.
- **W2 — Deploy (Coolify full):** all pages on Coolify, parallel to Replit; readyz+gitSha; smoke.
- **W3 — FI security** (agent PATCH branch scope, state machine).
- **W4 — Account‑types polish:** Dealer→"Banco Business" labels (i18n, additive), confirm Supplier scope.
- **W5 — Facebook login** (Clerk+Meta, precise, tested).
- **W6 — Mobile UI fixes:** countries/currencies horizontal compression, pressed buttons, icon/splash/font verification — device‑proven.
- **W7 — Scale hardening** (Redis limits, load test) — later.
- Gate: no wave N+1 before acceptance test + written owner approval.

## 7) UNKNOWNs (no guessing — need evidence/owner)
1. EC‑0 target repo. 2. Which sections show non‑compressed countries/currencies (needs device). 3. Dedupe/orphan dependency scan (not run). 4. Live runtime (device/EAS/secrets/DB enum). 5. Exact "Banco Business"/Supplier product definition. 6. Store listing existence under old bundle id.

## 8) Phase‑B deliverables mapping
Architecture(§2) · Repo Comparison(§1) · Historical Recovery(§1 timeline + `audit/handoff/*`) · Missing Features(§3) · Production Readiness(§4) · Deployment(§4) · Expo Native(see `00-FORENSIC…` §7‑8) · Auth(§0 EC‑2, §3) · Risk/Regression/Compatibility(§5) · Recovery Waves + Roadmap(§6) · Rollback(§5 rule) · Verification(guard tests per wave).

---
*No files were modified beyond adding this analysis document. No code, no merge, no fix. Awaiting Phase‑B approval + EC‑0 decision before any Phase‑C implementation.*
