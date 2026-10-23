#!/usr/bin/env tsx
/**
 * Scans src/ for smart-typography characters that commonly slip in via
 * autocorrect (curly quotes, en dash, ellipsis) and reports them as
 * GitHub Actions warning annotations. Non-blocking: always exits 0.
 *
 * Em dash (—) and the copyright symbol (©) are intentionally allowed and
 * excluded from this check.
 */

import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

const SUSPECT_CHARS: Record<string, string> = {
  '‘': 'left single quote (‘) - use a straight apostrophe (\')',
  '’': 'right single quote (’) - use a straight apostrophe (\')',
  '“': 'left double quote (“) - use a straight quote (")',
  '”': 'right double quote (”) - use a straight quote (")',
  '–': 'en dash (–) - use a hyphen (-)',
  '…': 'ellipsis (…) - use "..."',
};

const IGNORED_DIRS = new Set(['node_modules', '.next', 'out']);
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.md', '.mdx', '.json', '.css']);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

let warningCount = 0;

for (const file of walk(SRC_DIR)) {
  const relativePath = path.relative(process.cwd(), file);
  const lines = fs.readFileSync(file, 'utf8').split('\n');

  lines.forEach((line, index) => {
    for (const char of line) {
      const reason = SUSPECT_CHARS[char];
      if (reason) {
        warningCount += 1;
        console.log(`::warning file=${relativePath},line=${index + 1}::Found ${reason}`);
      }
    }
  });
}

if (warningCount === 0) {
  console.log('No smart-quote/dash/ellipsis characters found in src/.');
} else {
  console.log(`\nFound ${warningCount} suspect character(s) in src/. See warnings above.`);
}

process.exit(0);
