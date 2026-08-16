import { sanityClient } from "@/lib/sanity";
import { fetchRepos, GITHUB_USERNAME, type Repo } from "@/lib/github";
import { describeProject, demoForProject } from "@/lib/projectDescriptions";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import { FaGithub } from "react-icons/fa";

export const revalidate = 3600; // ISR hourly — GitHub's API is rate limited

type SanityProject = {
  _id: string;
  title: string;
  repo?: string;
  description?: string;
  link?: string;
  image?: unknown;
  techs?: string[];
  featured?: boolean;
  hidden?: boolean;
};

export default async function ProjectsPage() {
  const [repos, sanityProjects] = await Promise.all([
    fetchRepos(),
    sanityClient.fetch<SanityProject[]>(
      `*[_type == "project"]{_id, title, repo, description, link, image, techs, featured, hidden}`
    ),
  ]);

  const overrides = new Map<string, SanityProject>();
  for (const p of sanityProjects) {
    if (p.repo) overrides.set(p.repo.toLowerCase(), p);
  }

  // Every GitHub repo, enriched by its Sanity entry when one exists.
  const fromGithub: Project[] = repos
    .map((repo: Repo): Project | null => {
      const o = overrides.get(repo.name.toLowerCase());
      if (o?.hidden) return null;
      return {
        id: repo.name,
        title: o?.title || repo.title,
        description:
          o?.description || describeProject(repo.name) || repo.description,
        repoUrl: repo.repoUrl,
        // The curated map beats GitHub's homepage field: some repos still point
        // at an older deployment there.
        demoUrl: o?.link || demoForProject(repo.name) || repo.demoUrl || null,
        image: o?.image,
        techs: o?.techs?.length ? o.techs : repo.techs,
        stars: repo.stars,
        updatedAt: repo.updatedAt,
        archived: repo.archived,
        isPrivate: repo.isPrivate,
        featured: !!o?.featured,
      };
    })
    .filter((p): p is Project => p !== null);

  // Sanity-only projects (school work, client work, anything without a repo).
  const manual: Project[] = sanityProjects
    .filter((p) => !p.repo && !p.hidden)
    .map((p) => ({
      id: p._id,
      title: p.title,
      // `||` not `??`: an empty description field in Sanity should fall through
      // to the curated text rather than render as a blank card.
      description: p.description || describeProject(p.title) || null,
      repoUrl: null,
      demoUrl: p.link ?? null,
      image: p.image,
      techs: p.techs ?? [],
      stars: 0,
      updatedAt: null,
      archived: false,
      isPrivate: false,
      featured: !!p.featured,
    }));

  const projects = [...fromGithub, ...manual].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "");
  });

  const publicCount = projects.filter((p) => p.repoUrl && !p.isPrivate).length;

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-12 animate-rise">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Projects</h1>
        <p className="mt-4 text-[var(--muted)] max-w-2xl leading-relaxed">
          Everything I&apos;ve built — {projects.length} projects spanning ERP systems,
          web applications and machine learning. Pulled live from{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            <FaGithub className="text-sm" /> @{GITHUB_USERNAME}
          </a>
          , so this page is never out of date.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {publicCount} open source · {projects.length - publicCount} private or
          client work
        </p>
      </header>

      {projects.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id} className="contents">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[var(--muted)] text-center py-20">
          Couldn&apos;t load projects right now. Check back in a moment.
        </p>
      )}
    </main>
  );
}
