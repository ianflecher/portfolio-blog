import { urlFor } from "@/lib/sanity";

export default function BlogCard({ post }: { post: any }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {post.coverImage && (
        <img
          src={urlFor(post.coverImage).width(800).url()}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="mt-2 text-gray-600">{post.excerpt}</p>
        <p className="mt-1 text-sm text-gray-400">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
