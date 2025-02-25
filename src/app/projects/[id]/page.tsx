import { getProjectById, getSortedProjects, Project } from "@/lib/getProjects";
import Link from "next/link";

export async function generateStaticParams() {
  const projects = await getSortedProjects();
  return projects.map((project: Project) => ({ id: project.id }));
}

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    return <div style={{ whiteSpace: 'pre' }}>Project Not Found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">{project.title}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
        
        {project.features && (
          <>
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc list-inside mb-6">
              {project.features.map((feature, index) => (
                <li key={index} className="text-gray-600 mb-2">{feature}</li>
              ))}
            </ul>
          </>
        )}
        
        {project.technologies && (
          <>
            <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}
        
        {project.links && (
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
          </div>
        )}
      </div>
    </div>
  );
} 