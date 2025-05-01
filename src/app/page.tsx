import Link from "next/link";
import { getSortedPosts } from "@/lib/getPosts";
import { getSortedProjects } from "@/lib/getProjects";

export default async function Home() {
  const posts = getSortedPosts();
  const projects = await getSortedProjects();
  const featuredProjects = projects.slice(0, 2); // Show only first 2 projects

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8">
      {/* Main Content Column */}
      <div className="w-full lg:w-2/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Welcome</h2>
          <p className="mb-4">
            I put this together because I need a place to put my thoughts and centralize content for personal projects.
            This site is built with Next.js, Tailwind, and TypeScript. It&apos;s hosted on Github Pages and was largely built using <Link style={{color: 'blue'}} href="https://www.cursor.com/" target="_blank" >Cursor AI</Link>.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">
            <Link href="/projects/">Projects</Link>
          </h2>
          <div className="space-y-6">
            {featuredProjects.map((project) => (
              <div key={project.id}>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link href={`/projects/${project.id}`}>
                    {project.title}
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
                      {link.text === "Github" && <i className="fa-brands fa-github text-lg"></i>}
                      <span>{link.text}</span><i className="fa-solid fa-link text-lg"></i>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <hr />
            <Link href="/projects/" className="text-blue-600 hover:text-blue-800">
              More...
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/3 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            <Link href="/blog/">
              Posts
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

        {/* Currently Reading Section */}
        {/* <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Currently Reading</h2>
          <div className="space-y-3">
            <a
              href="https://www.goodreads.com/book/show/498886.Grinding_It_Out"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-gray-50 p-2 -mx-2 rounded transition"
            >
              <h3 className="font-medium text-blue-600 hover:text-blue-800">
                Grinding It Out: The Making of McDonald's
              </h3>
              <p className="text-sm text-gray-500">by Ray Kroc</p>
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
