// Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DEFAULT_RAINFALL_DATASET_ID,
  datasetIdAfterFailedLiveLookup
} from '../src/rainfall-datasets.js';

test('a failed live lookup keeps the dataset that was already showing', () => {
  assert.equal(datasetIdAfterFailedLiveLookup('demo', 'zhengzhou-720'), 'demo');
  assert.equal(datasetIdAfterFailedLiveLookup('zhengzhou-720', 'demo'), 'zhengzhou-720');
  assert.equal(datasetIdAfterFailedLiveLookup('custom', 'beijing-23-7'), 'custom');
});

test('a failed lookup replaces an active live city with the last built-in dataset', () => {
  assert.equal(datasetIdAfterFailedLiveLookup('live', 'zhengzhou-720'), 'zhengzhou-720');
  assert.equal(datasetIdAfterFailedLiveLookup('live', 'beijing-23-7'), 'beijing-23-7');
  assert.equal(datasetIdAfterFailedLiveLookup('live', 'missing'), DEFAULT_RAINFALL_DATASET_ID);
  assert.equal(datasetIdAfterFailedLiveLookup('live'), DEFAULT_RAINFALL_DATASET_ID);
});
