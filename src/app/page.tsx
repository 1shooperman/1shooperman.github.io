import Link from "next/link";
import { getSortedPosts } from "@/lib/getPosts";
import { getSortedProjects } from "@/lib/getProjects";
import FriendLinks from "@/lib/FriendLinks";

export default async function Home() {
  const posts = getSortedPosts();
  const featuredPosts = posts.slice(0, 5); // Show only first 5 posts
  const projects = await getSortedProjects();
  const featuredProjects = projects.slice(0, 2); // Show only first 2 projects

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8">
      {/* Main Content Column */}
      <div className="w-full lg:w-2/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Welcome</h1>
          <p className="mb-4">
            I put this together because I need a place to put my thoughts and centralize content for personal projects.
            This site is built with Next.js, Tailwind, and TypeScript. It&apos;s hosted on Github Pages and was largely built using <Link style={{color: 'blue'}} href="https://www.cursor.com/" target="_blank" >Cursor AI</Link>.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">
            <a
              href="https://aglflorida.com/projects"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Projects (opens in new tab)"
            >
              Projects <i className="fas fa-external-link-alt text-sm ml-1" aria-hidden="true"></i>
            </a>
          </h2>
          <div className="space-y-6">
            {featuredProjects.map((project) => (
              <div key={project.id}>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link href={`/projects/${project.id}`}>
                    {project.title} <i className="fa-solid fa-link text-lg"></i>
                  </Link>
                </h3>
                <p className="mb-3 text-gray-600">{project.description}</p>
                <div className="flex space-x-4">
                  {project.links?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      {link.text === "App Store" && <i className="fab fa-app-store text-lg"></i>}
                      {link.text === "Play Store" && <i className="fab fa-google-play text-lg"></i>}
                      {link.text === "Github" && <i className="fab fa-github text-lg"></i>}
                      <span>{link.text}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <hr />
            <a
              href="https://aglflorida.com/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
              aria-label="More projects (opens in new tab)"
            >
              More... <i className="fas fa-external-link-alt text-xs ml-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Friends</h2>
          <p className="mb-4">
            Check out this great group of humans!
          </p>
          <FriendLinks />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            <Link href="/blog/page/1">
              Posts
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
    </div>
  );
}
