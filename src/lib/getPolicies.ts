import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const policiesDirectory = path.join(process.cwd(), 'src/content/policies');

export type Policy = {
  id: string;
  title: string;
  content: string;
};

export async function getPolicies(): Promise<Policy[]> {
  const fileNames = fs.readdirSync(policiesDirectory);
  return Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(policiesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const processedContent = await remark()
      .use(html)
      .process(fileContents);
    
    return {
      id,
      title: id.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      content: processedContent.toString(),
    };
  }));
}

export async function getPolicyById(id: string): Promise<Policy | null> {
  try {
    const fullPath = path.join(policiesDirectory, `${id}.md`);
    const content = fs.readFileSync(fullPath, 'utf8');

    return {
      id,
      title: id.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      content,
    };
  } catch {
    return null;
  }
}
