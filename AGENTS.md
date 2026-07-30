# RainScope agent guide

RainScope is a noncommercial Three.js/Vite rainfall visualization, packaged for OpenAI Sites as static assets plus a Worker fallback.

## Work here

- Use PowerShell and `npm.cmd`; this Windows workspace must not rely on `npm` resolving correctly.
- Start locally with `npm.cmd run dev`; production checks are `npm.cmd run check`, `node scripts/smoke.mjs`, and `npm.cmd run test:sites`.
- `src/main.js` owns the scene and interactions; `src/bootstrap.js` owns locale, mobile gating, embedding, and compare startup; `src/rainfall-datasets.js` is the 25-point data contract.
- Preserve the Rainform attribution, `LICENSE`, `NOTICE.md`, and frozen smoke inputs unless the task explicitly authorizes changing that contract.
- Treat reconstructed hourly values as reconstructions, never as raw official observations.

## Release boundary

- Build a Sites archive with `npm.cmd run build:sites` only after the three checks pass.
- Push the exact `main` SHA before saving a Sites version; the archive and version must use that same SHA.
- A saved version is not live. Verify the canonical production URL and its loaded assets after deployment.
- `.sites-build/`, `dist/`, and `node_modules/` are generated and ignored; `qa/` is tracked evidence, not disposable residue.

## Current constraints

- The production visual tuning console is intentional; preserve `QUALITY_LIMITS` clamps and its `releaseChannel` label.
- Open-Meteo is the only runtime external data provider. Keep failed live-city lookups fail-closed to the prior built-in dataset.
- `public/_headers` is a Cloudflare Pages configuration; OpenAI Sites Worker deployments do not apply it automatically.
