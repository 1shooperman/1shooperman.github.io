type Props = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  
  // This would typically come from a database or CMS
  const projectDetails = {
    "mobile-app": {
      title: "Mobile App Project",
      description: "The quick brown fox jumps over the lazy dog. This innovative mobile application provides seamless integration across platforms.",
      features: [
        "Cross-platform compatibility",
        "Real-time synchronization",
        "Offline functionality",
        "Push notifications"
      ],
      technologies: [
        "React Native",
        "TypeScript",
        "Firebase",
        "Redux"
      ],
      links: [
        { text: "App Store", url: "https://apps.apple.com/your-app" },
        { text: "Play Store", url: "https://play.google.com/store/your-app" }
      ]
    },
    // Add other project details here...
  }[resolvedParams.id] || null;

  if (!projectDetails) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Project Not Found</h1>
        <p>The requested project could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">{projectDetails.title}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-600 mb-6">{projectDetails.description}</p>
        
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside mb-6">
          {projectDetails.features.map((feature, index) => (
            <li key={index} className="text-gray-600 mb-2">{feature}</li>
          ))}
        </ul>
        
        <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {projectDetails.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4">
          {projectDetails.links.map((link, index) => (
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
        </div>
      </div>
    </div>
  );
} 