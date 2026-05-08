'use client'

import { Blog } from "@/constants/types";
import { BlogActions } from "./BlogActions";

export function BlogListItem({ blog }: { blog: Blog }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
      
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-10 h-10 rounded-md object-cover"
          />
        )}

        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {blog.title}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Right */}
      <BlogActions blogId={blog.id} />
    </div>
  );
}