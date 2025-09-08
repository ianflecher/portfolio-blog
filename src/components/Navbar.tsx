"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          MyPortfolio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/projects" className="hover:text-blue-500 transition">
            Projects
          </Link>
          <Link href="/blogs" className="hover:text-blue-500 transition">
            Blog
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-900 dark:text-white focus:outline-none text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 flex flex-col gap-4">
          <Link href="/projects" className="hover:text-blue-500 transition">
            Projects
          </Link>
          <Link href="/blogs" className="hover:text-blue-500 transition">
            Blog
          </Link>
        </div>
      )}
    </nav>
  );
}
