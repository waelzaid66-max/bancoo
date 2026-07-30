# Apply on `banco-with-wael` ONLY — not Coolify from bancoo

## Precision set (4 commits, clean — no nested patches)

1. `0001` certify gaps (H2/H5/well-known/gates)
2. `0002` SoT docs recovery
3. `0003` re-verify + App install blocker notes
4. `0004` **precision harden** — executable H2 merge, exact identity gates, AASA path scope, nginx MIME, unused deps removed, historical docs superseded

Mobile identity: **`com.bancooom.app`** / scheme **`bancooom`**.

## Unlock agent push (preferred)

1. https://github.com/settings/installations → **Cursor**
2. Add **`waelzaid66-max/banco-with-wael`**
3. Reply «أضفت الريبو» — agent pushes `cursor/production-gap-certification-5cf0` and opens SoT PR

## Manual apply

```bash
git clone https://github.com/waelzaid66-max/banco-with-wael.git
cd banco-with-wael
git checkout -b cursor/production-gap-certification-5cf0 origin/main
git am /path/to/sot-restitution-patches/000*.patch
git push -u origin HEAD
```

## Verified on SoT local @ `fdbae42`

| Gate | Result |
|------|--------|
| chain-integrity | 167/167 |
| production-confidence | 16/16 |
| universal-links executable | 8/8 |
| mobile pack | PASS |
| expo config H2 merge | PASS |
| Docker web (well-known) | PASS `com.bancooom.app` |
