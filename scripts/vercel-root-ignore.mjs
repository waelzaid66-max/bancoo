#!/usr/bin/env node
/**
 * Root-level Vercel Ignored Build Step helper.
 *
 * The bancoo-api-server Vercel project appears to use the monorepo root as its
 * Root Directory (package-level artifacts/api-server/vercel.json ignore never
 * canceled that project's builds). Skip only that project — Coolify hosts the
 * production API.
 *
 * Exit 0 → continue build. Exit 1 → skip (Canceled by Ignored Build Step).
 */
const name = (process.env.VERCEL_PROJECT_NAME || "").toLowerCase();
const id = process.env.VERCEL_PROJECT_ID || "";

console.log(`[vercel-root-ignore] project=${name || "(unknown)"} id=${id || "(unknown)"}`);

if (name.includes("api-server") || name === "bancoo-api-server") {
  console.log(
    "[vercel-root-ignore] skipping bancoo-api-server — production API is Coolify-hosted",
  );
  process.exit(1);
}

process.exit(0);
