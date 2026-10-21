// Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import worker from '../worker/index.js';

test('serves existing static assets without a fallback', async () => {
  const calls = [];
  const response = await worker.fetch(new Request('https://example.test/assets/app.js'), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response('asset', { status: 200 });
      }
    }
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ['/assets/app.js']);
});

test('falls back to index.html only for missing HTML routes', async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request('https://example.test/flow?source=share', {
      headers: { accept: 'text/html' }
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === '/index.html' ? 'app' : 'missing', {
            status: url.pathname === '/index.html' ? 200 : 404
          });
        }
      }
    }
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ['/flow?source=share', '/index.html']);
});

test('does not turn missing API or write requests into the app shell', async () => {
  for (const request of [
    new Request('https://example.test/api/missing', { headers: { accept: 'application/json' } }),
    new Request('https://example.test/flow', { method: 'POST', headers: { accept: 'text/html' } })
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response('missing', { status: 404 });
        }
      }
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test('emits the Sites packaging contract', async () => {
  const root = fileURLToPath(new URL('..', import.meta.url));
  try {
    await access(new URL('../dist/index.html', import.meta.url));
  } catch {
    throw new Error('Sites packaging test requires dist/ from `npm run check` before `npm run test:sites`.');
  }

  const prepared = spawnSync(process.execPath, ['scripts/prepare-sites-build.mjs'], {
    cwd: root,
    encoding: 'utf8'
  });
  assert.equal(prepared.status, 0, prepared.stderr || prepared.stdout);

  const clientUrl = new URL('../.sites-build/dist/client/index.html', import.meta.url);
  const serverUrl = new URL('../.sites-build/dist/server/index.js', import.meta.url);
  const hostingUrl = new URL('../.sites-build/dist/.openai/hosting.json', import.meta.url);
  await access(clientUrl);
  await access(serverUrl);
  await access(hostingUrl);
  assert.match(await readFile(serverUrl, 'utf8'), /env\.ASSETS\.fetch/);
  assert.match(await readFile(hostingUrl, 'utf8'), /"project_id"/);
});
