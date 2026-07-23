# BANCO — Coolify Deployment Guide (Hostinger VPS)

This guide walks through deploying the complete BANCO monorepo on [Coolify](https://coolify.io) running on a Hostinger KVM VPS.

---

## Architecture Overview

| Service | Description | Port | Image |
|---------|-------------|------|-------|
| `postgres` | PostgreSQL 16 (persistent) | 5432 (internal) | `postgres:16-alpine` |
| `api` | BANCO API server (Node 24 + Express 5) | 8080 | `banco-api` |
| `banco-web` | Consumer-facing Next.js app (standalone) | 3000 | `banco-consumer-web` |
| `website` | Marketing website (Next.js standalone) | 3001 | `banco-website` |
| `web` | Nginx serving 3 Vite SPAs (admin, market, landing) | 8888 | `banco-web-surfaces` |

> **Expo mobile app (`banco-mobile`):** React Native / Expo app — built separately via EAS Build. No Docker service is required; the package.json must be present in the workspace for `pnpm install` to succeed.

All services communicate on an internal Docker network (`banco-net`). Coolify's Traefik proxy routes external traffic to each service by domain.

---

## Prerequisites

- Hostinger KVM VPS (Ubuntu 22.04 recommended), min 4 GB RAM / 2 vCPU
- Docker Engine ≥ 26 and Docker Compose v2 installed
- Coolify installed on the VPS (follow the [official installer](https://coolify.io/docs/installation))
- A domain name with DNS records pointing to your VPS IP

---

## Quick Start

### 1. Install Coolify on the VPS

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Open `http://<your-vps-ip>:8000` and complete the initial setup.

### 2. Add Your Repository

1. In Coolify → **Sources** → add a GitHub source (or use public HTTPS).
2. Create a new **Project** (e.g. "banco").
3. Create a new **Environment** (e.g. "production").

### 3. Create a Docker Compose Application

1. **New Resource → Docker Compose**.
2. Source: your git repository.
3. **Docker Compose File Path:** `docker-compose.coolify.yml`
4. Click **Save**.

### 4. Set Environment Variables

In the Coolify UI → **Environment Variables** tab, add the following:

#### Required — API will not start without these

| Variable | Example | Notes |
|----------|---------|-------|
| `POSTGRES_PASSWORD` | `a-strong-password` | PostgreSQL superuser password |
| `DATABASE_URL` | `postgresql://postgres:<POSTGRES_PASSWORD>@postgres:5432/banco` | Matches the `postgres` service name |
| `CLERK_SECRET_KEY` | `sk_live_...` | Clerk backend secret key |
| `SESSION_SECRET` | `64-char-random-hex` | `openssl rand -hex 32` |
| `PAYMENT_CONFIG_ENCRYPTION_KEY` | `64-char-random-hex` | `openssl rand -hex 32` |

#### Auth / Clerk (baked into frontend images at build time)

| Variable | Example |
|----------|---------|
| `CLERK_PUBLISHABLE_KEY` | `pk_live_...` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Same as above |
| `NEXT_PUBLIC_CLERK_PROXY_URL` | `https://app.yourdomain.com/api/__clerk` |
| `VITE_CLERK_PUBLISHABLE_KEY` | Same as above |

#### Public URLs (baked into frontend images at build time)

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `http://api:8080` (internal) or `https://api.yourdomain.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://app.yourdomain.com` |
| `WEBSITE_SITE_URL` | `https://www.yourdomain.com` |
| `NEXT_PUBLIC_MARKET_URL` | `https://market.yourdomain.com` or empty |
| `NEXT_PUBLIC_ADMIN_URL` | `https://admin.yourdomain.com` or empty |
| `VITE_API_BASE_URL` | `https://api.yourdomain.com` |

#### Integrations (optional — features gracefully degrade when absent)

| Variable | Notes |
|----------|-------|
| `OPENAI_API_KEY` | AI search / listing analysis |
| `OPENAI_MODEL` | e.g. `gpt-4o-mini` |
| `RESEND_API_KEY` | Transactional email |
| `EMAIL_FROM` | e.g. `noreply@yourdomain.com` |
| `PAYMOB_SECRET_KEY` | Payment gateway |
| `PAYMOB_PUBLIC_KEY` | |
| `PAYMOB_HMAC_SECRET` | |
| `PAYMOB_INTEGRATION_IDS` | JSON map |
| `PAYMOB_MODE` | `live` or `test` |

#### Object Storage (optional)

| Variable | Notes |
|----------|-------|
| `OBJECT_STORAGE_PROVIDER` | `s3` or `gcs` |
| `AWS_REGION` | e.g. `eu-central-1` |
| `S3_BUCKET` | Bucket name |

#### Port Overrides (optional)

| Variable | Default | Notes |
|----------|---------|-------|
| `API_HOST_PORT` | `8080` | VPS port for API |
| `BANCO_WEB_HOST_PORT` | `3000` | VPS port for consumer web |
| `WEBSITE_HOST_PORT` | `3001` | VPS port for marketing site |
| `WEB_HOST_PORT` | `8888` | VPS port for SPAs (nginx) |

### 5. Configure Coolify Domains

For each service, add a domain in Coolify's **Domains** tab:

| Service | Example Domain |
|---------|---------------|
| `api` | `api.yourdomain.com` → port 8080 |
| `banco-web` | `app.yourdomain.com` → port 3000 |
| `website` | `www.yourdomain.com` → port 3001 |
| `web` | `market.yourdomain.com` or `yourdomain.com` → port 8888 |

Coolify's Traefik proxy handles TLS (Let's Encrypt) automatically.

### 6. Deploy

Click **Deploy** in Coolify. Coolify will:
1. Clone the repository.
2. Build all Docker images (in parallel where possible).
3. Start services in dependency order (postgres → api → frontends).
4. Assign domains and provision TLS certificates.

---

## Deployment Order

Services have `depends_on` conditions:

```
postgres (healthy)
  └── api (healthy)
        ├── banco-web
        ├── website
        └── web
```

Docker Compose respects these automatically.

---

## Build Arguments (Frontend Images)

`NEXT_PUBLIC_*` and `VITE_*` variables are **baked into the image at build time** (they are browser-side values — safe to embed). After changing any of these variables, you must **rebuild** the affected service images:

- `banco-web` — `NEXT_PUBLIC_*` + build args
- `website` — `NEXT_PUBLIC_*` + build args
- `web` — `VITE_*` + build args

Runtime-only variables (injected without rebuild):
- `api` — all env vars
- `banco-web` — `WEB_PLUG_ENABLED`

---

## Database Migrations

The API uses Drizzle ORM. Schema migrations are **not run automatically** at container start. Run them once after the first deploy:

```bash
# From the VPS, exec into the api container:
docker exec -it banco-api-1 sh -c \
  "cd /app/artifacts/api-server && node -e \"require('./dist/index.mjs')\"" 
# OR run drizzle push from the builder image:
docker run --rm \
  -e DATABASE_URL="$DATABASE_URL" \
  banco-api:latest \
  sh -c "cd /app/artifacts/api-server && pnpm run seed"
```

For schema changes, the recommended flow is:
1. Update the schema in `lib/db/src/schema/`
2. Rebuild the `api` image
3. Run `pnpm -F @workspace/db run push-force` with `DATABASE_URL` set

---

## Health Checks

| Service | Endpoint | Method |
|---------|----------|--------|
| `api` | `GET /api/healthz` | HTTP 200 |
| `banco-web` | `GET /` | HTTP < 500 |
| `website` | `GET /` | HTTP < 500 |
| `web` | `GET /nginx-health` | HTTP 200 |
| `postgres` | `pg_isready` | pg_isready |

---

## Expo Mobile App

The `banco-mobile` Expo app is a React Native app distributed through app stores. It does **not** run as a server:

- Built via **EAS Build** (`npx eas-cli build --platform all`)
- Connects to the `api` service via `EXPO_PUBLIC_DOMAIN` / `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
- No Docker image or Compose service required
- Its `package.json` must remain in the workspace for `pnpm install` to succeed

---

## Manual Deploy (Without Coolify)

If you want to deploy directly with Docker Compose:

```bash
# 1. Clone the repo on your VPS
git clone https://github.com/waelzaid66-max/bancoo.git
cd bancoo

# 2. Create your production env file (never commit this)
cp deploy/aws/env/.env.production.example .env.production
# Edit .env.production with real values

# 3. Deploy with bundled Postgres (add --profile with-db):
docker compose -f docker-compose.prod.yml \
  --env-file .env.production \
  --profile with-db \
  up -d --build

# 4. Or deploy with an external managed DB (no --profile):
docker compose -f docker-compose.prod.yml \
  --env-file .env.production \
  up -d --build
```

---

## Troubleshooting

### Build fails: "Cannot find module 'scripts/preinstall-enforce-pnpm.mjs'"

The root `package.json` has a `preinstall` hook that runs `scripts/preinstall-enforce-pnpm.mjs`. All Coolify Dockerfiles explicitly copy this script before running `pnpm install`. If you see this error, ensure BuildKit is enabled (`DOCKER_BUILDKIT=1`).

### Build fails: "ERR_PNPM_FROZEN_LOCKFILE"

The lockfile is out of sync with `package.json`. Run `pnpm install` locally, commit the updated `pnpm-lock.yaml`, and redeploy.

### API container fails: "password authentication failed for user postgres"

Check that `POSTGRES_PASSWORD` in Coolify's env matches the one used in `DATABASE_URL`. The internal hostname is `postgres` (matches the Docker service name).

### Next.js build fails: "output: 'standalone' not configured"

`NEXT_STANDALONE=true` is set as an `ENV` in the builder stage. The `next.config.ts` for both `banco-web` and `banco-website` reads this env and applies `output: "standalone"`. No code changes are needed.

### Nginx can't reach API: "upstream not found"

The nginx config (`deploy/coolify/nginx.conf`) uses `server api:8080` — the Docker service name `api`. Ensure all services are on the same network (`banco-net`). When using `docker-compose.coolify.yml`, this is automatic.

### Port conflicts

If ports 3000/3001/8080/8888 are in use on the VPS, override them with `*_HOST_PORT` env vars:
```bash
API_HOST_PORT=9080
BANCO_WEB_HOST_PORT=9000
WEBSITE_HOST_PORT=9001
WEB_HOST_PORT=9888
```

### "POSTGRES_PASSWORD is required" error

This variable is marked as required (`:?`). Set it in Coolify's env tab or your `.env.production` file.

### Slow first build

The first build downloads all Node.js dependencies (can take 5–15 min depending on VPS speed). Subsequent builds use BuildKit cache mounts (defined in each Dockerfile with `--mount=type=cache`) and are significantly faster.

---

## Required Services Summary

| Service | Required for Production |
|---------|------------------------|
| PostgreSQL | Yes — external managed DB (Coolify DB / RDS / Supabase) or bundled `postgres` service |
| API server | Yes |
| Consumer Web (`banco-web`) | Yes |
| Marketing Website | Optional (separate domain) |
| Web Surfaces (`web`) | Yes — admin panel + dealer portal + landing page |
| Expo Mobile | No (distributed via app stores) |

---

## Security Notes

- All required secrets use `:?` syntax — Docker Compose will refuse to start without them.
- Never commit `.env.production` or any file with real secrets.
- Coolify stores env vars encrypted — use its env management.
- The API runs as a non-root user (`banco`, uid 10001).
- Next.js apps run as non-root user (`nextjs`, uid 1001).
- The Nginx web surfaces container runs as root (standard nginx practice) but serves only static files + proxies.
