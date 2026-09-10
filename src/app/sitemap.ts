import { getSortedPosts } from "@/lib/getPosts";
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.NODE_ENV === 'development') return 'http://localhost:3000';
  return 'https://brandonshoop.com';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const posts = getSortedPosts();

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const POSTS_PER_PAGE = 5;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const blogListPages = Array.from({ length: totalPages }, (_, i) => ({
    url: `${baseUrl}/blog/page/${i + 1}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...blogListPages,
    ...blogPosts,
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.125,
    }
  ];
}
