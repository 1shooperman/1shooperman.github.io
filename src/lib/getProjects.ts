import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export type Project = {
  id: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
  features: string[];
  technologies: string[];
  links: Array<{
    text: string;
    url: string;
  }>;
};

export async function getSortedProjects(): Promise<Project[]> {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as Omit<Project, 'id' | 'contentHtml'>),
    };
  }));

  return allProjectsData.sort((a, b) => a.date < b.date ? 1 : -1);
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as Omit<Project, 'id' | 'contentHtml'>),
    };
  } catch {
    return null;
  }
} 