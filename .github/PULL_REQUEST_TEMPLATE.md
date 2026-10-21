## What changed

<!-- Describe the focused change and why it is needed. -->

## User and visual impact

<!-- Include affected viewports, interactions and screenshots when relevant. -->

## Validation

- [ ] `npm run check`
- [ ] `node scripts/smoke.mjs`
- [ ] `npm run test:sites` (after `npm run check`, so `dist/` exists)
- [ ] Chinese and English remain complete
- [ ] Production tuning console still initializes, and `QUALITY_LIMITS` clamps remain in place
- [ ] Reconstructed rainfall is still labeled as a reconstruction
- [ ] Mobile orientation transitions tested when relevant
- [ ] Desktop drag and double-click reset tested when relevant
- [ ] Sound toggle and refresh behavior tested when relevant
- [ ] Required notice and noncommercial license preserved
