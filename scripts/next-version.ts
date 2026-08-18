export type BumpType = 'major' | 'minor' | 'patch';

export function computeNextVersion(currentTag: string, bump: BumpType): string {
  const match = currentTag.match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    throw new Error(`Invalid tag format: ${currentTag}`);
  }

  let major = Number(match[1]);
  let minor = Number(match[2]);
  let patch = Number(match[3]);

  switch (bump) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
      patch += 1;
      break;
  }

  return `v${major}.${minor}.${patch}`;
}
