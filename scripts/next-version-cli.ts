#!/usr/bin/env tsx
import { execSync } from 'node:child_process';
import { computeNextVersion, type BumpType } from './next-version';

const VALID_BUMP_TYPES: BumpType[] = ['major', 'minor', 'patch'];

function getLatestTag(): string {
  try {
    return execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim();
  } catch {
    return 'v0.0.0';
  }
}

const bump = (process.argv[2] || 'minor') as BumpType;

if (!VALID_BUMP_TYPES.includes(bump)) {
  console.error(`Invalid bump type: ${bump}. Expected one of ${VALID_BUMP_TYPES.join(', ')}.`);
  process.exit(1);
}

const currentTag = getLatestTag();
console.log(computeNextVersion(currentTag, bump));
