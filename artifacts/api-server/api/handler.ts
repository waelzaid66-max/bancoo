/**
 * Vercel serverless entry for the bancoo-api-server project.
 *
 * Production API traffic is served by Coolify/Docker
 * (see docker-compose.coolify.yml / deploy/coolify), not by this function.
 *
 * The previous Express re-export (`import app from "../src/app"`) could not
 * be packaged reliably on the connected Vercel Hobby project and kept the
 * GitHub "Vercel – bancoo-api-server" check red on every push. This stub
 * unblocks that check the same way deploy/cloudflare/stub-worker.ts
 * unblocks Workers Builds.
 *
 * The full Express adapter lives in vercel-adapters/handler.express.ts
 * (kept outside api/ so Vercel does not deploy it as a second function).
 * Do not attach production hostnames to this stub without an owner decision.
 */
export default function handler(
  _req: { method?: string; url?: string },
  res: {
    status: (code: number) => { json: (body: unknown) => void };
  },
) {
  res.status(200).json({
    ok: true,
    service: "bancoo-api-server-vercel-stub",
    message:
      "BANCO production API is Coolify-hosted. This Vercel function is a CI stub only.",
  });
}
