import { getPostBySlug, getSortedPosts } from "@/lib/getPosts";

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <article className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
}
