# Apply on `banco-with-wael` ONLY — not Coolify from bancoo

## Blocker measured 2026-07-30

Cursor GitHub App installation repositories = **1** (`bancoo` only).
`cursor[bot]` **403** on `banco-with-wael`.

### Unlock push (preferred)

1. https://github.com/settings/installations → **Cursor**
2. Add repository **`waelzaid66-max/banco-with-wael`**
3. Tell the agent — it will push `cursor/production-gap-certification-5cf0` and open the SoT PR.

### Manual apply (owner machine with write)

```bash
git clone https://github.com/waelzaid66-max/banco-with-wael.git
cd banco-with-wael
git checkout -b cursor/production-gap-certification-5cf0 origin/main
git am /path/to/these/patches/000*.patch
git push -u origin cursor/production-gap-certification-5cf0
```

Mobile identity in these patches: **`com.bancooom.app`** / scheme **`bancooom`**.

## Local re-verification (agent, SoT clone tip includes 9999824)

| Gate | Result |
|------|--------|
| chain-integrity-gate | 167/167 |
| production-confidence-check | 16/16 |
| mobile tests/*.mjs | 150/150 |
| verify-deploy-artifacts | 37/37 |
| Docker api + web | PASS (`com.bancooom.app` in image well-known) |

**Coolify:** repo `banco-with-wael` + `docker-compose.coolify.yml` only.
