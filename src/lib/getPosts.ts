import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

// Define a TypeScript type for a blog post
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

// Fetch all blog posts and sort by date
export function getSortedPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ""),
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
    };
  });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html, { sanitize: false }).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    contentHtml,
  };
}
