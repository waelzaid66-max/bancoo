#!/usr/bin/env node
/**
 * Root-level Vercel Ignored Build Step helper.
 * Skip bancoo-api-server — Coolify hosts the production API.
 * Exit 0 → continue. Exit 1 → skip.
 */
const name = (process.env.VERCEL_PROJECT_NAME || "").toLowerCase();
const id = process.env.VERCEL_PROJECT_ID || "";
console.log(`[vercel-root-ignore] project=${name || "(unknown)"} id=${id || "(unknown)"}`);

if (
  name.includes("api-server") ||
  name.includes("api_server") ||
  name.endsWith("-api") ||
  name === "bancoo-api-server"
) {
  console.log("[vercel-root-ignore] skipping — production API is Coolify-hosted");
  process.exit(1);
}
process.exit(0);
