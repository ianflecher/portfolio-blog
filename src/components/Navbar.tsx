"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/70 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-sm font-bold">
            IF
          </span>
          <span className="tracking-tight">Ian Falcunitin</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[var(--surface-muted)] text-[var(--foreground)] font-medium"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/ianflecher"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="ml-2 p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors"
          >
            <FaGithub className="text-lg" />
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden p-2 -mr-2 rounded-lg hover:bg-[var(--surface-muted)] transition-colors"
        >
          {menuOpen ? <HiX className="text-xl" /> : <HiMenuAlt4 className="text-xl" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-[var(--border)] px-6 py-3 flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/ianflecher"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <FaGithub /> GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
