'use client'

import { fetchBlogs } from "@/app/actions/fetchBlogs";
import { Blog } from "@/constants/types";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BlogListItem } from "./_components/BlogListItem";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const initialFetchBlogs = async () => {
      const result = await fetchBlogs();

      if (result.success && result.data) {
        setBlogs(result.data);
        setCursor(result.nextCursor);
      } else {
        toast.error(result.error || "Failed to load blogs");
      }
    };

    initialFetchBlogs();
  }, []);

  const loadMore = async () => {
    if (!cursor) return;

    setLoadingMore(true);

    try {
      const result = await fetchBlogs(cursor);

      if (result.success && result.data) {
        setBlogs(prev => [...prev, ...result.data]);
        setCursor(result.nextCursor);
      } else {
        toast.error(result.error || "Failed to load more blogs");
      }
    } catch (error) {
      toast.error("Failed to load more blogs");
      console.error(error);
    }

    setLoadingMore(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Blogs</h1>

      <div className="space-y-2">
        {blogs.map(blog => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </div>

      {cursor && (
        <button
          onClick={loadMore}
          disabled={loadingMore}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {loadingMore ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}