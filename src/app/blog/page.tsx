import Link from "next/link";
import { getSortedPosts } from "@/lib/getPosts";

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul>
        {posts.map(({ slug, title, date, excerpt }) => (
          <li key={slug} className="mb-4">
            <Link href={`/blog/${slug}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{title}</h2>
            </Link>
            <p className="text-sm text-gray-500">{date}</p>
            <p className="text-gray-700">{excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
