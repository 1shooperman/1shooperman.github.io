import Link from "next/link";
import { getSortedPosts } from "@/lib/getPosts";

export default async function Home() {
  const posts = getSortedPosts();
  const featuredPosts = posts.slice(0, 5); // Show only first 5 posts

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">
          <Link href="/blog/page/1">
            Blog
          </Link>
        </h2>
        <ul className="space-y-3">
          {featuredPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block hover:bg-gray-50 p-2 -mx-2 rounded transition"
              >
                <h3 className="font-medium text-blue-600 hover:text-blue-800">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
        <br />
        <hr />
        <Link href="/blog/page/1" className="text-blue-600 hover:text-blue-800">
          More...
        </Link>
      </div>
    </div>
  );
}
