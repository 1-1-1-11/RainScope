// Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

function notesFor(version) {
  return spawnSync(process.execPath, ['scripts/release-notes.mjs', version], {
    cwd: root,
    encoding: 'utf8'
  });
}

test('release notes extract only the tagged changelog section', () => {
  const result = notesFor('v1.0.0');
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /First tagged RainScope release/);
  assert.match(result.stdout, /reconstructions, not raw observations/);
  assert.doesNotMatch(result.stdout, /Upstream baseline/);
});

test('release notes fail closed when the version section is missing', () => {
  const result = notesFor('v9.9.9');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /no section for 9\.9\.9/);
});
