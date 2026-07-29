/**
 * Repo-root Vercel serverless stub.
 * Used only if a root-Root-Directory Vercel project builds instead of skipping.
 * Production API remains Coolify-hosted.
 */
export default function handler(
  _req: { method?: string },
  res: { status: (code: number) => { json: (body: unknown) => void } },
) {
  res.status(200).json({
    ok: true,
    service: "bancoo-root-vercel-stub",
    message:
      "BANCO production API is Coolify-hosted. This Vercel function is a CI stub only.",
  });
}
