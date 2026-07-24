# Deep Audit — Account Types (owner's #1 concern) on `bancotoday`

**Date:** 2026-07-23 · **Repo:** `bancotoday` @ `8faa30a` (= CA `210a325`, secret-free) · **Method:** evidence (file:line), read-only.
**Owner concern:** Replit's deployment/assembly deleted account-type work; even with Clerk correct, broken account types fail everything.
**Verdict:** the account-types system is **COMPLETE and INTACT in `bancotoday`** — the deletions were in the OLD deployed line (bancoo/Replit), not here. Confidence: **High (verified)**.

## 1) Model (schema)
- `userRoleEnum` (`lib/db/src/schema/index.ts:24`) — business/account axis; `role` default `individual` (:491).
- **Separate `staffRoleEnum`** (:38, Owner/Admin/Moderator/Support) + `staffRole` (:502) — staff is a distinct axis from account type. ✅
- Types: `individual` · `dealer` · `company` · `financial_institution` · `enterprise`.

## 2) Lifecycle (verified)
```
Clerk signup → GET /me → getOrCreateUser(clerkId)  [UserService.ts:20]
   → role selection gate (mobile) needsAccountType (4 types) [profile.tsx:159/162]
   → accountTypeChosen set ONLY after /me sync succeeds [profile.tsx:235] (no orphan flag)
   → UpdateMe(account_type) maps → role [UserService.ts:189-219]
```

## 3) Anti-trap / integrity fixes (all PRESENT — these are what Replit had wiped)
| Fix | Evidence | Status |
|---|---|---|
| **DEMOTE_BLOCKED** — elevated (fi/company/enterprise) can't be silently downgraded to individual | `UserService.ts:184` + `meController.ts:163` (→403) | ✅ |
| **No blind dealer** — `business` without `account_type` never force-set to `dealer` | `UserService.ts:201` (comment + logic) | ✅ |
| **FI elevation preserved** | `UserService.ts:206-214` | ✅ |
| **accountTypeChosen after /me only** (no orphan users) | `profile.tsx:235` | ✅ |

## 4) Banks (FI) flow (PRESENT)
- Onboarding `intent=fi` → activity `financial_institution`; **bank never mislabels as dealer/factory** (`onboarding.tsx:45`); forces `account_type=fi` only for FI path (`:330-338`); KYC `documents[]` for admin review.
- Inbox rendered only for institution members; **awaiting-link UX** + no flash on 401/403 (`banks.tsx:112-145`).
- **#40 AuthZ** — agent scoped to own branch: `agentCanAccessRequest` (`FinancingService.ts:712`), branch filter (:653), enforcement (:747). FI CRM model: intermediaries/branches/seats/`owner_user_id`.
- **By-design limitation (not a bug):** Verify ≠ auto-open inbox; `owner_user_id` link is **manual by admin** (documented in `audit/financing/*`).

## 5) Naming & suppliers
- **`dealer` → "Business Pro" / "Banco Business"** = UI label only (`i18n.ts:670,833,1443`); code/DB stay `dealer` (safe, no migration needed unless owner wants enum rename).
- **Suppliers** = B2B surface under `company` (`app/business/suppliers/`, `supply-hub`, `global-supply`), **not a separate role** — matches design.

## 6) Whole-tree gate
`typecheck` = 0 errors across all packages on `bancotoday` (compiles clean, incl. all the above).

## 7) Genuine remaining (NOT account-type code — that's intact)
1. **Runtime/device verification** of the 4 signup→role journeys (EAS/device) — OPS.
2. **FI owner_user_id admin-link** is manual by design — confirm owner wants to keep manual (Evidence-based; not broken).
3. **Live Clerk** prod social providers (Google/Apple dict may be empty) + **Facebook = new build** (absent everywhere).
4. DB enum migration ONLY if owner wants `dealer`→`banco_business` at the data layer (has compatibility cost).

*Study only. bancotoday code not modified. bancoo untouched.*
