jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({ toString: () => '<p>test</p>' }),
  })),
}));

jest.mock('remark-html', () => jest.fn());

import fs from 'fs';
import { getSortedPosts } from '../getPosts';

const post = (date: string) => `---\ntitle: "T"\ndate: ${date}\nexcerpt: "E"\n---\n\nbody\n`;

function stubPosts(files: Record<string, string>) {
  const realReadFileSync = fs.readFileSync;
  jest.spyOn(fs, 'readdirSync').mockReturnValue(Object.keys(files) as unknown as ReturnType<typeof fs.readdirSync>);
  jest.spyOn(fs, 'readFileSync').mockImplementation(((filePath: string, ...rest: unknown[]) => {
    const name = String(filePath).split('/').pop() as string;
    if (String(filePath).includes('src/content/blog') && name in files) return files[name];
    return (realReadFileSync as (...args: unknown[]) => unknown)(filePath, ...rest);
  }) as unknown as typeof fs.readFileSync);
}

describe('getSortedPosts scheduling', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2026-11-20T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('hides posts dated after today and keeps past and same-day posts', () => {
    stubPosts({
      'past.md': post('"2026-11-19"'),
      'today.md': post('"2026-11-20"'),
      'future.md': post('"2026-11-21"'),
    });
    expect(getSortedPosts().map((p) => p.slug)).toEqual(['today', 'past']);
  });

  it('treats an unquoted YAML date like a quoted one', () => {
    stubPosts({
      'unquoted-past.md': post('2026-11-19'),
      'unquoted-future.md': post('2026-11-21'),
    });
    const posts = getSortedPosts();
    expect(posts.map((p) => p.slug)).toEqual(['unquoted-past']);
    expect(posts[0].date).toBe('2026-11-19');
  });

  it('throws on a missing date instead of hiding the post', () => {
    stubPosts({ 'nodate.md': '---\ntitle: "T"\nexcerpt: "E"\n---\n\nbody\n' });
    expect(() => getSortedPosts()).toThrow('nodate has a missing or invalid date');
  });
});
