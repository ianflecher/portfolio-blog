import { sanityClient } from "@/lib/sanity";

export const revalidate = 60; // ISR every 60 seconds

export default async function ProjectsPage() {
  // Fetch projects from Sanity
  const projects = await sanityClient.fetch(`
    *[_type == "project"] | order(title asc)
  `);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        My Projects
      </h1>

      <ul className="space-y-4">
        {projects.map((project: any) => (
          <li key={project._id}>
            <a
              href={project.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {project.title}
              </span>
              {project.techs && project.techs.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
