#!/usr/bin/env node
// Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/

import { readFile } from 'node:fs/promises';

const raw = process.argv[2];
if (!raw) {
  console.error('Usage: node scripts/release-notes.mjs v1.0.0');
  process.exit(1);
}

const version = raw.startsWith('v') ? raw.slice(1) : raw;
const changelog = await readFile(new URL('../CHANGELOG.md', import.meta.url), 'utf8');
const lines = changelog.split('\n');
const start = lines.findIndex(line => line.startsWith(`## [${version}]`));
if (start === -1) {
  console.error(`CHANGELOG.md has no section for ${version}`);
  process.exit(1);
}

const body = [];
for (let index = start + 1; index < lines.length; index += 1) {
  if (lines[index].startsWith('## ')) break;
  body.push(lines[index]);
}

const notes = body.join('\n').trim();
if (!notes) {
  console.error(`CHANGELOG.md section ${version} is empty`);
  process.exit(1);
}

process.stdout.write(`${notes}\n`);
