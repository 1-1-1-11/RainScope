// Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/

export const QUALITY_LIMITS = Object.freeze({
  chains: 12000,
  ambientChains: 8000,
  downpourChains: 12000,
  waterfallFilaments: 12000,
  waterGlints: 10000,
  impactPearls: 30000,
  impactEventsPerSecond: 3000,
  rippleEventsPerSecond: 1000,
  maxRipples: 1000
});

export function clampQualityValue(key, raw, fallback) {
  const value = Number(raw);
  const limit = QUALITY_LIMITS[key];
  if (!Number.isFinite(value) || !Number.isFinite(limit)) return fallback;
  return Math.min(limit, Math.max(0, Math.round(value)));
}
