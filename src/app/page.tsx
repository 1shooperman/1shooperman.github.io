import Link from "next/link";
import { getSortedPosts } from "@/lib/getPosts";

export default function Home() {
  const posts = getSortedPosts();

  return (
    <div className="flex gap-8 mt-8">
      {/* Main Content Column */}
      <div className="flex-grow w-2/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Welcome</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">
            <Link href="/projects/">
              Projects
            </Link>
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Mobile App Project
              </h3>
              <p className="mb-3 text-gray-600">
                The quick brown fox jumps over the lazy dog. This innovative mobile
                application provides seamless integration across platforms.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://apps.apple.com/your-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <i className="fab fa-app-store text-lg"></i>
                  <span>App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/your-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <i className="fab fa-google-play text-lg"></i>
                  <span>Play Store</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Web Development Project
              </h3>
              <p className="mb-3 text-gray-600">
                Pack my box with five dozen liquor jugs. A comprehensive web
                solution delivering value through innovative features.
              </p>
              <hr />
              <Link
                href="/projects/"
                className="text-blue-600 hover:text-blue-800"
              >
                More...
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-1/3">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            <Link
              href="/projects/"
            >
              Latest Posts
            </Link>
          </h2>
          <ul className="space-y-3">
            {posts.map((post) => (
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
        </div>
      </div>
    </div>
  );
}
