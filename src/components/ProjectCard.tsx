import { urlFor } from "@/lib/sanity";
import { FaGithub, FaExternalLinkAlt, FaStar, FaLock, FaArrowRight } from "react-icons/fa";

export type Project = {
  id: string;
  title: string;
  description: string | null | undefined;
  repoUrl: string | null;
  demoUrl: string | null;
  image?: unknown;
  techs: string[];
  stars: number;
  updatedAt: string | null;
  archived: boolean;
  isPrivate: boolean;
  featured: boolean;
};

/** Brand colours for the stacks that show up most in this portfolio. */
const techColors: Record<string, string> = {
  Laravel: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  Blade: "bg-red-400/10 text-red-500 dark:text-red-300 border-red-400/20",
  PHP: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  "Next.js": "bg-neutral-500/10 text-neutral-700 dark:text-neutral-300 border-neutral-500/20",
  React: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  "Node.js": "bg-green-600/10 text-green-700 dark:text-green-400 border-green-600/20",
  Mongodb: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Tailwind: "bg-sky-400/10 text-sky-600 dark:text-sky-400 border-sky-400/20",
  TypeScript: "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20",
  JavaScript: "bg-yellow-400/10 text-yellow-700 dark:text-yellow-400 border-yellow-400/20",
  Python: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border-emerald-600/20",
  Java: "bg-amber-600/10 text-amber-700 dark:text-amber-400 border-amber-600/20",
  CSS: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  HTML: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  PowerShell: "bg-blue-800/10 text-blue-700 dark:text-blue-300 border-blue-800/20",
  Default: "bg-[var(--surface-muted)] text-[var(--muted)] border-[var(--border)]",
};

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ProjectCard({ project }: { project: Project }) {
  const updated = formatDate(project.updatedAt);
  // Public repos: the whole card links to the repo. Private ones have nowhere
  // useful to send a visitor, so they stay static.
  const cardHref = !project.isPrivate ? project.repoUrl ?? project.demoUrl : null;

  return (
    <article
      className={`group relative h-full flex flex-col rounded-2xl border bg-[var(--surface)] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[var(--accent)] ${
        cardHref
          ? "border-[var(--border)] hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
          : "border-[var(--border)]"
      } ${project.featured ? "sm:col-span-2" : ""}`}
    >
      {cardHref && (
        // Stretched link: covers the card without nesting inside another anchor.
        <a
          href={cardHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-0"
        >
          <span className="sr-only">{project.title}</span>
        </a>
      )}

      {project.image ? (
        <img
          src={urlFor(project.image).width(900).height(420).url()}
          alt={project.title}
          className="w-full h-44 object-cover border-b border-[var(--border)]"
        />
      ) : null}

      <div className="p-5 flex flex-col flex-1 gap-3.5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-semibold tracking-tight text-[15px] group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h2>

          <div className="flex items-center gap-2.5 shrink-0 text-[11px] text-[var(--muted)]">
            {project.featured && (
              <span className="px-2 py-0.5 rounded-full bg-[var(--accent)] text-white font-medium">
                Featured
              </span>
            )}
            {project.isPrivate && (
              <span className="inline-flex items-center gap-1" title="Private repository">
                <FaLock className="text-[10px]" /> Private
              </span>
            )}
            {project.stars > 0 && (
              <span className="inline-flex items-center gap-1">
                <FaStar className="text-yellow-500 text-[10px]" /> {project.stars}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-[var(--muted)] flex-1">
          {project.description || "No description yet."}
        </p>

        {project.techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className={`text-[11px] px-2 py-0.5 rounded-md border font-medium ${
                  techColors[tech] || techColors.Default
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="relative z-10 flex items-center justify-between gap-3 pt-3 mt-auto border-t border-[var(--border)]">
          <div className="flex gap-4 text-[13px]">
            {project.repoUrl && !project.isPrivate && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--accent)] transition-colors"
              >
                <FaGithub /> Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--accent)] hover:underline"
              >
                <FaExternalLinkAlt className="text-[10px]" /> Live demo
              </a>
            )}
            {project.isPrivate && !project.demoUrl && (
              <span className="text-[var(--muted)]">Private repository</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[var(--muted)]">
            {updated && <span className="whitespace-nowrap">{updated}</span>}
            {cardHref && (
              <FaArrowRight className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent)]" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
