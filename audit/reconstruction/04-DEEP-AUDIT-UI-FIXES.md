# Deep Audit — Owner UI Concerns (countries/currencies · Stay header · Discover map)

**Date:** 2026-07-23 · **Method:** evidence only (file compare `bancotoday` @ `8faa30a` = CA `210a325` vs CA open PR branches #46/#47/#48) · **Rule:** verify before touch; no regression.

## Verdict: the 3 owner-requested fixes are ALREADY correct in `bancotoday` — do NOT re-apply the stale PRs.

| Owner concern | CA open PR (unmerged) | Evidence in `bancotoday` | Action | Confidence |
|---|---|---|---|---|
| الدول/العملات «مفروشة» → مضغوطة | #48 `claude/currency-icon-stay` (`511f6af`) | `MarketCountryPicker.tsx` **identical** to PR; `SectionSearchApp.tsx` + `BookingStaysApp.tsx` both use compact **`MarketCountryButton`**; `styles.marketMatrix` is **dead (not rendered)**; no currency/country chip strips anywhere | **None** — already compact. (Optional tidy: delete dead `marketMatrix` style — cosmetic, not required) | High (verified) |
| Discover always show map card | #47 `claude/discover-map-card` (`58a8e88`) | `SearchDiscover.tsx` **identical** to PR | **None** — already present | High (verified) |
| Trim Stay header ~5mm | #46 `claude/stay-header-trim` (`bc47e2d`) | `bancotoday` header is **newer & more trimmed** (`topPad-1`, smaller paddings) than the PR (`topPad+3`) | **Do NOT apply** — PR would ADD whitespace (regression) | High (verified) |

## Why this matters
- The "spread countries/currencies" the owner remembers is from the **older deployed version (bancoo/Replit)**, not from CA/`bancotoday`.
- Blindly merging the open PRs (#46/#47/#48) would have **regressed** the Stay header and duplicated already-present work — the audit prevented that. This is the value of "verify before touch".
- The compact design (`MarketCountryButton`) is uniform across `SectionSearchApp` and `BookingStaysApp`.

## Genuinely remaining (NOT these UI items)
1. **Runtime/device verification** (EAS/device) to confirm the compact UI on real devices — OPS.
2. **Facebook login** — absent in ALL repos → new build (owner-approved), not recovery.
3. **Coolify deploy** — config only on PR branches; fix `gcs`→`s3` doc, migrate, readyz gitSha.
4. **W1 hardening** — lint fix (2 scripts), secret-scan CI, `.gitignore` (already added to bancotoday baseline).
5. Continue per-domain deep audit (upload/maps/search/FI/notifications) the same evidence way.

## Optional cosmetic (only if owner wants; no gold-plating rule)
- Remove dead `styles.marketMatrix` in `BookingStaysApp.tsx` (+ its "moved to marketMatrix" comment).

*Study only. bancotoday code not modified this pass. bancoo untouched.*
