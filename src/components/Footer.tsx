import Link from "next/link";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { GITHUB_USERNAME } from "@/lib/github";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-[var(--muted)]">
          © {new Date().getFullYear()} Ian Dexter Falcunitin
        </p>

        <nav className="flex items-center gap-5">
          <Link
            href="/projects"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/blogs"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Blog
          </Link>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href="mailto:ianfalcunitin123@gmail.com"
            aria-label="Email"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <FaEnvelope className="text-lg" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
