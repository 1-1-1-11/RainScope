#!/usr/bin/env node
// Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'dist');
const output = path.join(root, '.sites-build');
const sitesDist = path.join(output, 'dist');
const worker = path.join(root, 'worker', 'index.js');
const hosting = path.join(root, '.openai', 'hosting.json');

for (const file of [path.join(source, 'index.html'), worker, hosting]) {
  if (!existsSync(file)) throw new Error(`Missing Sites build input: ${file}`);
}

function copyDirectory(from, to) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const sourcePath = path.join(from, entry.name);
    const outputPath = path.join(to, entry.name);
    if (entry.isDirectory()) copyDirectory(sourcePath, outputPath);
    else if (entry.isFile()) copyFileSync(sourcePath, outputPath);
  }
}

rmSync(output, { recursive: true, force: true });
copyDirectory(source, path.join(sitesDist, 'client'));
mkdirSync(path.join(sitesDist, 'server'), { recursive: true });
mkdirSync(path.join(sitesDist, '.openai'), { recursive: true });
copyFileSync(worker, path.join(sitesDist, 'server', 'index.js'));
copyFileSync(hosting, path.join(sitesDist, '.openai', 'hosting.json'));

console.log('Prepared Sites build: .sites-build/dist/client, server/index.js and .openai/hosting.json');
