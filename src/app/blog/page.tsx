import Link from "next/link";
import { getSortedPosts } from "@/lib/getPosts";

const POSTS_PER_PAGE = 5;

export const dynamic = 'force-static';

// Generate static pages for each page number
export async function generateStaticParams() {
  const posts = getSortedPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

type SearchParams = Promise<{ page?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { page } = await searchParams;
  const posts = getSortedPosts();
  const currentPage = Number(page) || 1;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  const PaginationControls = () => (
    <div className="flex justify-between items-center py-4">
      <div>
        {currentPage > 1 && (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Previous
          </Link>
        )}
      </div>
      <div className="space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link
            key={pageNum}
            href={`/blog?page=${pageNum}`}
            className={`px-3 py-1 rounded ${
              pageNum === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            {pageNum}
          </Link>
        ))}
      </div>
      <div>
        {currentPage < totalPages && (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className="text-blue-600 hover:text-blue-800"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <PaginationControls />
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <div key={post.slug} className="border-b last:border-0 pb-6 last:pb-0">
              <Link
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <h2 className="text-2xl font-semibold text-blue-600 group-hover:text-blue-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                {post.excerpt && (
                  <p className="text-gray-600">{post.excerpt}</p>
                )}
              </Link>
            </div>
          ))}
        </div>
        <PaginationControls />
      </div>
    </div>
  );
}
