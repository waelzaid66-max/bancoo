// Vercel Express-preset entry (CI stub). Production API is Coolify-hosted.
// ESM because package.json sets "type": "module".
export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      ok: true,
      service: "bancoo-api-server-vercel-stub",
      message:
        "BANCO production API is Coolify-hosted. This Vercel project is a CI stub only.",
    }),
  );
}
