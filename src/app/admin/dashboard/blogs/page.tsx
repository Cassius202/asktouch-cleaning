// app/admin/dashboard/blogs/page.tsx
'use client';

import { fetchBlogsAction } from "@/app/actions/blogActions"; // Use the new action
import { Blog } from "@/constants/types";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BlogListItem } from "./_components/BlogListItem";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const initialFetchBlogs = async () => {
      setLoading(true);
      const result = await fetchBlogsAction();

      if (result.success && result.data) {
        setBlogs(result.data);
        setCursor(result.nextCursor);
      } else {
        toast.error(result.error || "Failed to load blogs");
      }
      setLoading(false);
    };

    initialFetchBlogs();
  }, []);

  const loadMore = async () => {
    if (!cursor) return;

    setLoadingMore(true);

    try {
      const result = await fetchBlogsAction(cursor);

      if (result.success && result.data) {
        setBlogs((prev) => [...prev, ...result.data!]);
        setCursor(result.nextCursor);
      } else {
        toast.error(result.error || "Failed to load more blogs");
      }
    } catch (error) {
      toast.error("Failed to load more blogs");
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading blogs...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Blogs ({blogs.length})</h1>
      </div>

      <div className="space-y-2">
        {blogs.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <BlogListItem key={blog.id} blog={blog} />
          ))
        )}
      </div>

      {cursor && (
        <div className="pt-4">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="w-full py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {loadingMore ? "Loading more..." : "Load more posts"}
          </button>
        </div>
      )}
    </div>
  );
}