import { sanityClient, urlFor } from "@/lib/sanity";
import BlogCard from "@/components/BlogCard";

export default async function BlogPage() {
  const posts = await sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc)
  `);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6">
        {posts.map((post: any) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
