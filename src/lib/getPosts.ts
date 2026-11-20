import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

const SAFE_SLUG = /^[A-Za-z0-9_-]+$/;

function assertSafeSlug(slug: string): string {
  if (!SAFE_SLUG.test(slug)) {
    throw new Error(`Invalid post slug: ${slug}`);
  }
  return slug;
}

// gray-matter parses an unquoted YAML date into a Date; normalise to YYYY-MM-DD
function normalizeDate(value: unknown, slug: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value;
  }
  throw new Error(`Post ${slug} has a missing or invalid date`);
}

// Define a TypeScript type for a blog post
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

// Fetch all published blog posts (dated today or earlier) and sort by date
export function getSortedPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const today = new Date().toISOString().slice(0, 10);

  const allPosts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const slug = assertSafeSlug(fileName.replace(/\.md$/, ""));

    return {
      slug,
      title: data.title as string,
      date: normalizeDate(data.date, slug),
      excerpt: (data.excerpt ?? "") as string,
    };
  });

  return allPosts
    .filter((post) => post.date <= today)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug: string) {
  assertSafeSlug(slug);
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html, { sanitize: false }).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    date: normalizeDate(data.date, slug),
    excerpt: (data.excerpt ?? "") as string,
    contentHtml,
  };
}
