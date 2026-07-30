// Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/

import assert from 'node:assert/strict';
import test from 'node:test';
import { QUALITY_LIMITS, clampQualityValue } from '../src/quality-limits.js';

test('quality values cannot persist outside their safe allocation limits', () => {
  for (const [key, limit] of Object.entries(QUALITY_LIMITS)) {
    assert.equal(clampQualityValue(key, limit + 999999, -1), limit, `${key}: upper limit`);
    assert.equal(clampQualityValue(key, -1, -1), 0, `${key}: lower limit`);
  }

  assert.equal(clampQualityValue('chains', 10.6, -1), 11);
  assert.equal(clampQualityValue('chains', Number.POSITIVE_INFINITY, 2000), 2000);
  assert.equal(clampQualityValue('unknown', 100, 42), 42);
});
