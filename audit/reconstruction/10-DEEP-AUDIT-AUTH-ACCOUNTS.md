# Deep Audit — Auth / Accounts / Clerk (owner priority) — `bancotoday`

**Date:** 2026-07-24 · **Repo:** `bancotoday` (@ `a94eee1`) · evidence (file:line), read-only. Verdict: **complete, professional, race-safe.** Confidence: High.

## Auth flows (`profile.tsx`) — all correct, with user-facing errors + loading
| Flow | Implementation | Evidence |
|---|---|---|
| Sign-up (email+password) | `signUp.password` → `sendEmailCode()` → verify step; captures name/phone/business in refs; rolls back refs on error | `:491-512` |
| Email OTP verify | `signUp.verifications.verifyEmailCode({code})` → finalize | `:514-521` |
| Sign-in | `signIn.password({emailAddress,password})` → finalize on complete | `:448-456` |
| Forgot password | `signIn.create({identifier})` → `resetPasswordEmailCode.sendCode()` → reset step (**email-only tenant, documented — never surface undeliverable channel**) | `:461-473` |
| Reset password | `resetPasswordEmailCode.verifyCode` → `submitPassword({signOutOfOtherSessions:true})` | `:475-489` |
| OAuth Google/Apple/**Facebook** | `startSSOFlow` strategy `oauth_google`/`oauth_apple`/`oauth_facebook` (E1) | `:523-542` |
| Errors surfaced | `signInErrors`/`signUpErrors` field messages rendered | `:2433,2536,2570` |
| Response/loading | `isSigningIn`/`isSigningUp` (fetchStatus) + `resetSending` + ActivityIndicators on buttons | `:209-210,2454` |

## Backend / tables / activation / data layers
- **`users` table:** `accountNumber` (Postgres-generated `BNC-…`, unique, on /me + admin) · `clerkId` unique · name/email/phone · `role` default `individual` · `staffRole` (separate admin axis) · `isVerified` · `walletBalance` · `promoAdBalance`(+expiry). Rich, well-modeled.
- **`getOrCreateUser`** (`UserService.ts`): lazy first-touch upsert on clerkId with **`ON CONFLICT DO NOTHING`** → race-safe on parallel first-open calls; welcome email sent once (winner only). ✅
- **Activation:** `accountTypeChosen` flag set only after `/me` sync (no orphan users).
- **Individual account:** default `individual`, browse+publish; **DEMOTE_BLOCKED** anti-trap prevents silent downgrade (verified in `05`).
- **Response speed:** profile parallel queries use `staleTime` (60s) to avoid refetch churn.

## Facebook (E1) status
Code wired correctly (mirrors Google/Apple). Requires **Meta app + Clerk provider enabled** to authenticate live.

## Gaps (OPS only — not code)
- **E3 Clerk Dashboard (prod):** real publishable key + Allowed Origins (prevents `pk_live` white-screen) + enable Google/Apple/Facebook. The web-export test key can't init Clerk (why Profile spins in preview).
- Live device verification of the 5 flows (signup/verify/signin/forgot/reset) — EAS/OPS.

## Bottom line
Accounts/Clerk/auth = **complete & professional** (5 flows, race-safe backend, rich user model, errors+loading feedback, Facebook wired). Nothing broken/missing in code. Remaining = Clerk Dashboard config + live device QA (owner/OPS).

*Read-only audit. bancotoday code not modified this pass.*
