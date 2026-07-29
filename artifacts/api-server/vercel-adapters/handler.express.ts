// Full Express → Vercel adapter (not used by the current Hobby project).
// Kept for a future Pro / properly provisioned Vercel target.
//
// Scheduled jobs (node-cron), DB bootstrapping (ensureDbExtensions /
// ensureSeedData), and startup backfills are NOT started here; they are
// lifecycle concerns for a long-running server (Coolify/Docker), not for
// stateless serverless invocations.
//
// Required runtime env vars (set in Vercel project → Settings → Environment):
//   DATABASE_URL, CLERK_SECRET_KEY, SESSION_SECRET,
//   PAYMENT_CONFIG_ENCRYPTION_KEY, CORS_ALLOWED_ORIGINS
//
// Optional: set LOG_DIR=/tmp/banco-logs to keep pino-roll file transports
// working under Vercel's read-only filesystem (only /tmp is writable).
import app from "../src/app";

export default app;
