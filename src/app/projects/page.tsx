import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      id: "mobile-app",
      title: "Mobile App Project",
      summary: "Cross-platform mobile application with seamless integration.",
      description: "The quick brown fox jumps over the lazy dog. This innovative mobile application provides seamless integration across platforms. Built with React Native and Firebase, this app showcases modern mobile development practices.",
      links: [
        { text: "App Store", url: "https://apps.apple.com/your-app" },
        { text: "Play Store", url: "https://play.google.com/store/your-app" }
      ]
    },
    {
      id: "web-platform",
      title: "Web Development Project",
      summary: "Comprehensive web solution with innovative features.",
      description: "Pack my box with five dozen liquor jugs. A comprehensive web solution delivering value through innovative features. Built using Next.js and TypeScript, this platform demonstrates modern web development practices.",
      links: [
        { text: "Live Demo", url: "https://example.com" },
        { text: "GitHub", url: "https://github.com/your-username/project" }
      ]
    },
    {
      id: "data-analytics",
      title: "Data Analytics Dashboard",
      summary: "Real-time analytics and reporting platform.",
      description: "How vexingly quick daft zebras jump. A sophisticated analytics platform that processes and visualizes complex data streams in real-time. Built with Python and React, featuring machine learning capabilities.",
      links: [
        { text: "Demo", url: "https://demo.example.com" }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.summary}</p>
            <p className="mb-4">{project.description}</p>
            <div className="flex space-x-4">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  {link.text === "App Store" && <i className="fab fa-app-store text-lg"></i>}
                  {link.text === "Play Store" && <i className="fab fa-google-play text-lg"></i>}
                  <span>{link.text}</span>
                </a>
              ))}
              <Link
                href={`/projects/${project.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 