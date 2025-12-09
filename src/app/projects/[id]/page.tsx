import { getProjectById, getSortedProjects } from "@/lib/getProjects";
import { metadataFactory } from "@/lib/metadata";
import { generateProjectSchema } from "@/lib/schema";
import { generateBreadcrumbSchemaForPath } from "@/lib/BreadcrumbSchema";
import type { ResolvingMetadata } from 'next';

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const projects = await getSortedProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return metadataFactory("Projects", "Project Not Found")({ params: Promise.resolve({ id }) }, {} as ResolvingMetadata);
  }

  return metadataFactory("Projects", project.title, {
    description: project.description,
  })({ params: Promise.resolve({ id }) }, {} as ResolvingMetadata);
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return <div style={{ whiteSpace: 'pre' }}>Project Not Found</div>;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
  const url = `${baseUrl}/projects/${id}`;
  const projectSchema = generateProjectSchema(
    project.title,
    project.description,
    url,
    'MobileApplication',
    'iOS, Android'
  );
  const breadcrumbSchema = generateBreadcrumbSchemaForPath(`/projects/${id}`);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
                {link.text === "Github" && <i className="fab fa-github text-lg"></i>}
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 