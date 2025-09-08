import { urlFor } from "@/lib/sanity";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {project.image && (
        <img
          src={urlFor(project.image).width(600).url()}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <p className="mt-2">{project.description}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mt-2 block"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
}
