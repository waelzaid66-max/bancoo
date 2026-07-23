# AGENTS.md

## Cursor Cloud specific instructions

This is the **BANCO / B-OOM** pnpm monorepo: one Express API (`artifacts/api-server`)
plus multiple frontends (`banco-web`, `banco-website` = Next.js; `admin-os`,
`dealer-os`, `landing` = Vite; `banco-mobile` = Expo) and shared `lib/*` packages.
Standard commands live in `README.md`, root `package.json`, `turbo.sh`, and each
package's `package.json` — reference those rather than duplicating.

### Environment already provisioned (by the update script + snapshot)
- **Node 24 via nvm** is the required runtime. The system `/exec-daemon/node` is
  Node 22 and sits earlier in `PATH`, so **always use a login shell** (`bash -l`,
  which tmux sessions here use) — `~/.bashrc` runs `nvm use 24` and prepends the
  Node 24 bin so `node -v` reports v24.x. A non-login `sh -c` will get Node 22.
- **PostgreSQL 16** is installed locally (not Docker). Start it with
  `sudo pg_ctlcluster 16 main start` if it isn't already running
  (`pg_lsclusters` to check). DB `banco_dev`, user/pass `postgres`/`postgres`,
  `pg_trgm` extension enabled.
- **Local dev env vars** are exported from `~/.bashrc` (non-secret, dev-only):
  `DATABASE_URL` (→ `banco_dev`), `PORT=3000`, `SESSION_SECRET`,
  `PAYMENT_CONFIG_ENCRYPTION_KEY`, and a **dummy** `CLERK_SECRET_KEY`
  (`sk_test_dev_dummy_local_only`).

### Non-obvious caveats
- **Clerk gates the whole `/api/v1/*` router.** `clerkMiddleware()` is mounted
  app-wide and `assertValidSecretKey` throws on *every* request when
  `CLERK_SECRET_KEY` is empty (returns `INTERNAL_ERROR`). Any non-empty string
  passes validation, so the dummy key lets **public** endpoints (feed, search,
  map) work. Authenticated endpoints still need a real Clerk account.
- **Liveness/readiness are under `/api`, not root**: `/api`, `/api/healthz`,
  `/api/readyz` (readyz checks the DB). `/readyz` at root hits the authed router
  and errors — don't use it.
- **API dev script rebuilds then runs** (`pnpm --filter @workspace/api-server run dev`
  = esbuild bundle → `node dist/index.mjs`). It is **not** hot-reload; restart it
  after code changes. Bind is immediate; DB/seed work happens in the background.
- **Seeding is idempotent-ish**: the server auto-seeds only when the DB is empty.
  Manual seed: `pnpm --filter @workspace/api-server run seed` (+ `seed:reference`,
  `seed:admin`).
- **Port conflicts**: API and `banco-web` both default to **3000**. Run one of
  them on another port (e.g. `banco-web`: `pnpm exec next dev --port 3100`).
- **banco-web live search**: renders without Clerk (provider is a no-op when
  unconfigured). For live results set `NEXT_PUBLIC_WEB_SEARCH_LIVE=true` and
  `NEXT_PUBLIC_API_URL=http://localhost:3000`; Next rewrites `/api/*` → the API.
- **Vite SPAs (`admin-os`, `dealer-os`) hard-require `VITE_CLERK_PUBLISHABLE_KEY`**
  and throw at boot without a real key — they can't be demoed without a live
  Clerk publishable key.

### Common commands (run in a login shell)
- Lint: `pnpm run lint`  · Typecheck (all): `pnpm run typecheck`
- API tests (real Postgres): `TZ=UTC pnpm --filter @workspace/api-server test`
- Run API: `pnpm --filter @workspace/api-server run dev`  (or `./turbo.sh`)
- Run consumer web: see banco-web note above.
