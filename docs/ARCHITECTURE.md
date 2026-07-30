# Architecture

RainScope is a Vite client application. It has no database or secret environment variable. OpenAI Sites packages the built assets with `worker/index.js`, which serves static assets and falls back only HTML navigation requests to `index.html`.

## Startup lifecycle

1. `index.html` renders the application shell and mobile landscape gate.
2. `src/bootstrap.js` selects Chinese or English, prepares rain audio, handles compare/embed routing, and delays the WebGL bundle while a phone is in portrait.
3. `src/main.js` creates the Three.js scene after the viewport is eligible, including the live-city, export, and tuning-console controls.
4. Viewport and orientation events update layout without initializing a second scene.

## Rendering model

The 25 values from 00:00 through 24:00 are the single source of truth for visual rainfall. Derived systems include:

- axis geometry and selected-hour feedback;
- rain chains, ambient rain and downpour sampling;
- peak waterfall geometry and materials;
- water, glints, impacts and ripple fields;
- sound intensity and editor feedback.

Seeded random generators keep the composition stable across rebuilds. Avoid replacing seeded paths with `Math.random()` where deterministic layout matters.

## Interaction model

- Dragging the main view changes the orbit camera.
- Double-click resets the camera.
- The rainfall editor previews curve changes and rebuilds systems after input.
- Audio playback uses intent and source tokens to prevent overlapping sources during rapid toggles.
- Rainfall edits are session-only by design; refresh restores the built-in curve.
- Live-city search reads Open-Meteo hourly precipitation; a failed request restores the prior built-in dataset.
- `?compare=1` composes two embedded scenes, while the 9:16 exporter records WebM or produces a PNG in the browser.

## Production boundary

The visual tuning console is intentionally available in development and production. `ENABLE_TUNING_CONSOLE` remains the development marker, while the production channel also initializes the panel and labels itself `public`. `QUALITY_LIMITS` clamps all performance-sensitive persisted values. Vite builds are minified without source maps; `scripts/check-dist.mjs` requires the tuning panel and rejects source-map references.

`public/_headers` is retained for Cloudflare Pages-compatible hosts. The OpenAI Sites Worker does not automatically apply it, so production response headers must be verified or configured at the selected host.

## Change strategy

`src/main.js` is intentionally kept intact for the initial public-source release to avoid changing the validated visual result. Future modularization should proceed subsystem by subsystem with deterministic screenshot and interaction regression checks.
