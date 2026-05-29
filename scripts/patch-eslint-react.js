#!/usr/bin/env node
// Patches eslint-plugin-react for ESLint 10 compat: context.getFilename() was removed.
const fs = require('fs');
const path = require('path');

const targets = [
  'node_modules/eslint-plugin-react/lib/util/version.js',
  'node_modules/eslint-config-next/node_modules/eslint-plugin-react/lib/util/version.js',
];

const OLD = "typeof contextOrFilename === 'string' ? contextOrFilename : contextOrFilename.getFilename()";
const NEW = "typeof contextOrFilename === 'string' ? contextOrFilename : (typeof contextOrFilename.getFilename === 'function' ? contextOrFilename.getFilename() : contextOrFilename.filename)";

let patched = 0;
for (const rel of targets) {
  const p = path.join(__dirname, '..', rel);
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, 'utf8');
  if (!src.includes(OLD)) continue;
  fs.writeFileSync(p, src.replace(OLD, NEW));
  patched++;
}
if (patched > 0) process.stdout.write(`patch-eslint-react: patched ${patched} file(s)\n`);
