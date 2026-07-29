#!/usr/bin/env node
/**
 * Always skip the Vercel build (exit 1).
 * Used by artifacts/api-server — production API is Coolify-hosted.
 */
console.log(
  "[vercel-always-skip] production API is Coolify-hosted; skipping Vercel preview deploy",
);
process.exit(1);
