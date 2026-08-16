import Link from "next/link";
import { FaReact, FaLaravel, FaPhp, FaArrowRight, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb } from "react-icons/si";
import { fetchRepos, GITHUB_USERNAME } from "@/lib/github";

export const revalidate = 3600;

const stack = [
  { icon: FaLaravel, label: "Laravel" },
  { icon: FaPhp, label: "PHP" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: FaReact, label: "React" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiMongodb, label: "MongoDB" },
];

export default async function Home() {
  const repos = await fetchRepos();

  const languages = new Set(repos.flatMap((r) => r.techs));
  const stats = [
    { value: repos.length || "—", label: "Projects built" },
    { value: languages.size || "—", label: "Languages & tools" },
    { value: "ERP", label: "Systems specialty" },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <section className="py-20 sm:py-28 animate-rise">
        <p className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-xs text-[var(--muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Available for work
        </p>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl">
          I build{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            business systems
          </span>{" "}
          that people actually use.
        </h1>

        <p className="mt-6 text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
          Full-stack developer working across Laravel and Next.js. Most of my work is
          ERP and internal tooling — procurement, sales, HR, clearance — plus web apps
          and the occasional machine learning experiment.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
          >
            View projects
            <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] font-medium hover:bg-[var(--surface-muted)] transition-colors"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--border)]">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[var(--surface)] px-4 py-7 text-center">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight">
              {stat.value}
            </div>
            <div className="mt-1 text-xs sm:text-sm text-[var(--muted)]">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Stack */}
      <section className="py-16">
        <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--muted)]">
          Tools I reach for
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {stack.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm hover:border-[var(--accent)] transition-colors"
            >
              <Icon className="text-base" /> {label}
            </span>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Want to see the work?
          </h2>
          <p className="mt-1.5 text-[var(--muted)]">
            Every repository, pulled live from GitHub and kept current automatically.
          </p>
        </div>
        <Link
          href="/projects"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
        >
          Browse all <FaArrowRight className="text-xs" />
        </Link>
      </section>
    </main>
  );
}
