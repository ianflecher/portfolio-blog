import Link from "next/link";
import { FaReact, FaNodeJs, FaLaravel } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      
      {/* Background illustration */}
      <div className="absolute inset-0 -z-10">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 800 600">
          <circle cx="400" cy="300" r="300" fill="url(#grad)" />
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="text-center max-w-3xl space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white animate-fadeIn">
          Welcome to My Portfolio
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10">
          Showcasing projects built with{" "}
          <span className="inline-flex items-center gap-1 font-semibold text-blue-500">
            <FaReact /> React
          </span>,{" "}
          <span className="inline-flex items-center gap-1 font-semibold text-green-500">
            <FaNodeJs /> Node.js
          </span>,{" "}
          <span className="inline-flex items-center gap-1 font-semibold text-purple-500">
            <FaLaravel /> Laravel
          </span>, and more.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/projects"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            View Projects
          </Link>
          <Link
            href="/blogs"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Read Blog
          </Link>
        </div>
      </div>

      <div className="mt-16 text-gray-500 dark:text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} Ian Dexter Falcunitin
      </div>
    </main>
  );
}
