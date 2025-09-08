"use client";

interface BlogCardProps {
  post: any;
  tagColors?: Record<string, string>;
}

export default function BlogCard({ post, tagColors }: BlogCardProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{post.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mt-2">{post.excerpt}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {post.tags.map((tag: string, idx: number) => {
            const colorClass = tagColors?.[tag] || "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
            return (
              <span key={idx} className={`text-xs px-2 py-1 rounded-full ${colorClass}`}>
                {tag}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
