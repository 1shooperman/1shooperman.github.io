import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export type Project = {
  id: string;
  title: string;
  description: string;
  github: string;
  technologies?: string[];
  status?: 'active' | 'archived';
};

export function getSortedProjects(): Project[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const { data } = matter(fs.readFileSync(fullPath, 'utf8'));
      return { id, ...(data as Omit<Project, 'id'>) };
    });
}
