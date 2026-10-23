import fs from 'fs';
import path from 'path';

function firstSlug(contentDir: string): string {
  const dir = path.join(process.cwd(), 'src/content', contentDir);
  const [file] = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  if (!file) {
    throw new Error(`No content files found in src/content/${contentDir}`);
  }
  return file.replace(/\.md$/, '');
}

export const staticRoutes: string[] = [
  '/',
  '/blog',
  '/privacy',
  '/projects',
];

export const dynamicRoutes: string[] = [
  '/blog/page/1',
  `/blog/${firstSlug('blog')}`,
];

export const allRoutes: string[] = [...staticRoutes, ...dynamicRoutes];
