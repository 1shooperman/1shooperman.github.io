import { getSortedPosts } from "@/lib/getPosts";
import { getSortedProjects } from "@/lib/getProjects";
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
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
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl!,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogPosts,
    ...projectPages,
  ];
}