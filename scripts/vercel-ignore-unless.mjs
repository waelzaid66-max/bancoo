#!/usr/bin/env node
/**
 * Vercel Ignore Build Step helper.
 * Exit 0 → continue build. Exit 1 → skip (canceled / green).
 *
 * Usage (from package Root Directory, e.g. artifacts/admin-os):
 *   node ../../scripts/vercel-ignore-unless.mjs artifacts/admin-os
 */
import { execSync } from "node:child_process";

const prefixes = process.argv.slice(2);
if (prefixes.length === 0) {
  console.error("usage: vercel-ignore-unless.mjs <path-prefix>...");
  process.exit(0); // fail open → build
}

const shared = [
  "pnpm-lock.yaml",
  "package.json",
  "pnpm-workspace.yaml",
  "lib/",
];

const base = process.env.VERCEL_GIT_PREVIOUS_SHA || "HEAD^";
let files = [];
try {
  files = execSync(`git diff --name-only ${base} HEAD`, { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);
} catch (err) {
  console.warn("[vercel-ignore] diff failed — building", err?.message ?? err);
  process.exit(0);
}

if (files.length === 0) {
  console.log("[vercel-ignore] empty diff — skip");
  process.exit(1);
}

const relevant = files.some(
  (f) =>
    prefixes.some((p) => f === p || f.startsWith(p.endsWith("/") ? p : `${p}/`)) ||
    shared.some((s) => (s.endsWith("/") ? f.startsWith(s) : f === s)),
);

if (relevant) {
  console.log("[vercel-ignore] relevant changes — build");
  process.exit(0);
}

console.log("[vercel-ignore] no relevant changes — skip\n", files.join("\n"));
process.exit(1);
