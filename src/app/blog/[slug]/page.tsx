import { getPostBySlug, getSortedPosts } from "@/lib/getPosts";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  return (
    <div className="max-w-4xl mx-auto py-8">
            <div>
  
          <Link
            href={`/blog`}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back
          </Link>

      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{post.date}</p>
        <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>
    </div>
  );
}
