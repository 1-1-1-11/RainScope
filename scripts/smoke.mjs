import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  DEFAULT_RAINFALL_DATASET_ID,
  RAINFALL_DATASETS
} from '../src/rainfall-datasets.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = relativePath => readFile(path.join(root, relativePath), 'utf8');

assert.equal(DEFAULT_RAINFALL_DATASET_ID, 'demo');

const datasets = Object.values(RAINFALL_DATASETS);
assert.ok(datasets.length >= 2, 'expected at least two rainfall datasets');
assert.equal(new Set(datasets.map(dataset => dataset.id)).size, datasets.length, 'dataset ids must be unique');

for (const dataset of datasets) {
  assert.equal(dataset.values.length, 25, `${dataset.id}: expected 25 values`);
  assert.ok(
    dataset.values.every(value => Number.isFinite(value) && value >= 0),
    `${dataset.id}: values must be finite and non-negative`
  );
}

assert.deepEqual(RAINFALL_DATASETS.demo.values, [
  2.1, 3.8, 4.6, 3.2, 2.5, 5.2, 7.7, 7.4,
  9.3, 9.8, 10, 6.7, 6.3, 1.6, 2.2, 3.8,
  5.9, 7.4, 9.1, 10, 8.8, 5.3, 3.1, 1.8,
  1.2
]);

const zhengzhou = RAINFALL_DATASETS['zhengzhou-720'];
assert.equal(zhengzhou.values[16], 201.9, 'Zhengzhou 16:00 anchor must be 201.9 mm/h');
assert.ok(zhengzhou.values.includes(201.9), 'Zhengzhou series must contain 201.9');
assert.ok(
  zhengzhou.values.slice(0, 24).reduce((sum, value) => sum + value, 0) > 500,
  'Zhengzhou reconstructed daily total must exceed 500 mm'
);

const beijing = RAINFALL_DATASETS['beijing-23-7'];
assert.equal(beijing.officialProcessTotalMm, 744.8, 'Beijing process-total anchor must be 744.8 mm');
assert.equal(beijing.values[10], 111.8, 'Beijing hourly anchor must be 111.8 mm/h at 10:00');
assert.ok(!beijing.values.includes(744.8), 'Beijing process total must not be represented as hourly intensity');

const requiredNotices = {
  'src/main.js': 'Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/',
  'src/bootstrap.js': 'Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/',
  'src/rainfall-datasets.js': 'Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/',
  'src/styles.css': 'Required Notice: Rainform / 数据成雨 © 2026 afterimage',
  'scripts/generate-rain-audio.mjs': 'Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/',
  'index.html': 'Required Notice: Copyright © 2026 afterimage. https://rainform.pages.dev/',
  'README.md': 'Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/',
  'NOTICE.md': 'Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/'
};

for (const [relativePath, notice] of Object.entries(requiredNotices)) {
  assert.ok((await read(relativePath)).includes(notice), `${relativePath}: Required Notice missing`);
}
assert.ok(
  (await read('src/styles.css')).includes('https://rainform.pages.dev/'),
  'src/styles.css: Required Notice URL missing'
);

const protectedHashes = {
  'LICENSE': 'C0EA4A896D2C8C394B29F9427589996DB826CD501C512279FF0ED3EF48FABBE5',
  'NOTICE.md': '214E29E36396B751D1F3626E954EA233EED22E325EE803995D090272E8C6C529',
  'scripts/check-project.mjs': '1ED5AFCDBE09E7EEFD554B969252D1E1277B4F5F2FD8B6A721FD5845BA47DE67'
};

for (const [relativePath, expectedHash] of Object.entries(protectedHashes)) {
  const contents = await readFile(path.join(root, relativePath));
  const actualHash = createHash('sha256').update(contents).digest('hex').toUpperCase();
  assert.equal(actualHash, expectedHash, `${relativePath}: protected file changed`);
}

const [mainSource, datasetSource, html, readme] = await Promise.all([
  read('src/main.js'),
  read('src/rainfall-datasets.js'),
  read('index.html'),
  read('README.md')
]);

assert.ok(mainSource.includes("from './rainfall-datasets.js'"), 'main must consume the shared dataset module');
assert.match(
  mainSource,
  /\bconst\s+SPLASH_IMPACTS_ENABLED\s*=\s*true\s*;/,
  'splash impacts must be enabled'
);
assert.match(datasetSource, /reconstruct(?:ed|ion)/i, 'dataset source must disclose reconstruction');
assert.match(html, /<select\b[^>]*\bid="rainfall-dataset-select"[^>]*>/i, 'dataset select missing');
assert.ok(html.includes('value="demo"'), 'demo dataset option missing');
assert.ok(html.includes('value="zhengzhou-720"'), 'Zhengzhou dataset option missing');
assert.ok(html.includes('value="beijing-23-7"'), 'Beijing dataset option missing');
assert.match(
  html,
  /<input\b(?=[^>]*\bid="rainfall-timeline")(?=[^>]*\btype="range")(?=[^>]*\bmin="0")(?=[^>]*\bmax="24")[^>]*>/i,
  '00:00–24:00 rainfall timeline missing'
);

const attribution = 'Rain visualization derived from Rainform / 数据成雨 by afterimage';
assert.ok(html.includes(attribution), 'visible interface attribution missing');
assert.ok(readme.includes(attribution), 'README attribution missing');
assert.ok(html.includes('https://rainform.pages.dev/'), 'interface attribution URL missing');
assert.ok(readme.includes('https://rainform.pages.dev/'), 'README attribution URL missing');

console.log(`Smoke passed (${datasets.length} datasets, 25 non-negative values each, Tasks 1–3 assertions).`);
