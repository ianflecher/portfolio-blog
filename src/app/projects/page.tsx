import { sanityClient } from "@/lib/sanity";
import { FaExternalLinkAlt } from "react-icons/fa";

export const revalidate = 60; // ISR every 60 seconds

export default async function ProjectsPage() {
  // Fetch projects from Sanity
  const projects = await sanityClient.fetch(`
    *[_type == "project"] | order(title asc)
  `);

  // Define badge colors for technologies
  const techColors: Record<string, string> = {
    "Next.js": "bg-blue-500 text-white",
    React: "bg-cyan-400 text-white",
    "Node.js": "bg-green-600 text-white",
    Laravel: "bg-red-500 text-white",
    TypeScript: "bg-blue-300 text-white",
    JavaScript: "bg-yellow-400 text-gray-900",
    Default: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Page Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white text-center">
        My Projects
      </h1>

      {/* Project List */}
      <ul className="grid gap-6">
        {projects.length > 0 ? (
          projects.map((project: any) => (
            <li
              key={project._id}
              className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 cursor-pointer"
            >
              <a
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  {project.title} <FaExternalLinkAlt className="text-gray-500 dark:text-gray-400 text-sm" />
                </span>

                {project.techs && project.techs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    {project.techs.map((tech: string, idx: number) => {
                      const colorClass = techColors[tech] || techColors.Default;
                      return (
                        <span key={idx} className={`text-xs px-2 py-1 rounded-full ${colorClass}`}>
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                )}
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-700 dark:text-gray-300 text-center">
            No projects yet, but I'm building my portfolio!
          </p>
        )}
      </ul>
    </main>
  );
}
