import { getPostBySlug, getSortedPosts } from "@/lib/getPosts";
import { metadataFactory } from "@/lib/metadata";
import { generateArticleSchema } from "@/lib/schema";
import { generateBreadcrumbSchemaForPath } from "@/lib/BreadcrumbSchema";
import type { ResolvingMetadata } from 'next';

export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return metadataFactory("Blog", "Post Not Found")({ params: Promise.resolve({ slug }) }, {} as ResolvingMetadata);
  }

  return metadataFactory("Blog", post.title, {
    description: post.excerpt,
    type: 'article',
  })({ params: Promise.resolve({ slug }) }, {} as ResolvingMetadata);
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Post Not Found</h1>
        <p>The requested post could not be found.</p>
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
  const url = `${baseUrl}/blog/${slug}`;
  const articleSchema = generateArticleSchema(post.title, post.date, url, post.excerpt, undefined, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchemaForPath(`/blog/${slug}`);

  // Format date for display
  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const isoDate = dateObj.toISOString();

  return (
    <div className="max-w-7xl mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-4">
          <time dateTime={isoDate}>{formattedDate}</time>
          <span className="ml-2">By Brandon Shoop</span>
        </div>
        <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>
    </div>
  );
}
