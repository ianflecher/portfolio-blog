export const GITHUB_USERNAME = "ianflecher";

/** Repo names to keep off the portfolio (scratch repos, dupes, etc.). */
export const HIDDEN_REPOS: string[] = [];

/**
 * Include private repos in the listing. Only works when GITHUB_TOKEN is set,
 * and it lists them by name/language only — never any code. Off by default:
 * a card a visitor can't click through to is usually worse than no card.
 */
export const INCLUDE_PRIVATE = process.env.GITHUB_INCLUDE_PRIVATE === "true";

/** The subset of GitHub's repo payload this page actually reads. */
type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count?: number;
  pushed_at: string;
  fork: boolean;
  private: boolean;
  archived: boolean;
};

export type Repo = {
  id: number;
  name: string;
  title: string;
  description: string | null;
  repoUrl: string;
  demoUrl: string | null;
  techs: string[];
  stars: number;
  updatedAt: string;
  archived: boolean;
  isPrivate: boolean;
};

/** Turn "erp-project-management" into "Erp Project Management". */
function titleize(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const token = process.env.GITHUB_TOKEN;
const authHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

/**
 * Per-repo languages, so a Laravel app shows "PHP, Blade" instead of just
 * its single primary language. Failures fall back to the primary language.
 */
async function fetchLanguages(repoName: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      { headers: authHeaders, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: Record<string, number> = await res.json();
    return Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lang]) => lang);
  } catch {
    return [];
  }
}

export async function fetchRepos(): Promise<Repo[]> {
  // /user/repos sees private repos; /users/:name/repos is public-only.
  const url =
    token && INCLUDE_PRIVATE
      ? "https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner"
      : `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

  const res = await fetch(url, { headers: authHeaders, next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const raw: GitHubRepo[] = await res.json();
  if (!Array.isArray(raw)) return [];

  const visible = raw.filter(
    (r) =>
      !r.fork && !HIDDEN_REPOS.includes(r.name) && (INCLUDE_PRIVATE || !r.private)
  );

  const languages = await Promise.all(visible.map((r) => fetchLanguages(r.name)));

  return visible.map((r, i) => ({
    id: r.id,
    name: r.name,
    title: titleize(r.name),
    description: r.description,
    repoUrl: r.html_url,
    demoUrl: r.homepage || null,
    techs: languages[i].length
      ? languages[i]
      : [...(r.topics || []), ...(r.language ? [r.language] : [])].slice(0, 4),
    stars: r.stargazers_count ?? 0,
    updatedAt: r.pushed_at,
    archived: !!r.archived,
    isPrivate: !!r.private,
  }));
}
