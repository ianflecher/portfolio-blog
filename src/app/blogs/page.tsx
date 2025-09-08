import { sanityClient } from "@/lib/sanity";
import BlogCard from "@/components/BlogCard";

export default async function BlogPage() {
  const posts = await sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc)
  `);

  // Define colors for tags
  const tagColors: Record<string, string> = {
    Personal: "bg-yellow-300 text-gray-900",
    Project: "bg-blue-400 text-white",
    Tech: "bg-green-400 text-white",
    Life: "bg-pink-300 text-gray-900",
    Default: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Page Intro */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
          My Life in Stories
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Welcome to my personal blog. Here, I share the journey of my life — from learning and building projects,
          to adventures, lessons, and reflections. Each post is a glimpse into the experiences that shaped me.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="grid gap-8">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <div
              key={post._id}
              className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900"
            >
              <BlogCard post={post} tagColors={tagColors} />
            </div>
          ))
        ) : (
          <p className="text-gray-700 dark:text-gray-300 text-center">
            No posts yet, but my story is just beginning!
          </p>
        )}
      </section>
    </main>
  );
}
