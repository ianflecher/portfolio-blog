import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Welcome to My Portfolio
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10">
          Showcasing projects built with <span className="font-semibold text-blue-500">Next.js</span>, 
          <span className="font-semibold text-green-500"> React</span>, 
          <span className="font-semibold text-purple-500"> Node.js</span>, 
          <span className="font-semibold text-yellow-500"> Laravel</span>, and more.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/projects"
            className="px-8 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition"
          >
            View Projects
          </Link>
          <Link
            href="/blogs"
            className="px-8 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition"
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
