import { getSortedPosts } from "@/lib/getPosts";
import { getSortedProjects } from "@/lib/getProjects";
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
  const posts = getSortedPosts();
  const projects = await getSortedProjects();

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: project.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/page/1`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
    {
      url: `${baseUrl}/projects`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...projectPages,
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.125,
    }
  ];
}