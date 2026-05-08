'use client';

import toast from 'react-hot-toast';
import Header from "./Header";
import { useEffect, useState, useCallback } from "react";
import { Blog } from "@/constants/types";
import { fetchBlogs } from '@/app/actions/fetchBlogs';
import { assets } from '@/constants/assets';
import Link from 'next/link';
import Image from 'next/image';

interface BlogsClientProps {
  initialBlogs: Blog[];
  initialHasMore: boolean;
  initialError?: string;
}

const AUTHOR = {
  name: "Mr. Ask Akinnawo",
  role: "Business Owner & Lead Consultant",
};

function AuthorChip() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-6 h-6 rounded-full overflow-hidden ring-2 ring-white shrink-0">
        <Image
          src={assets.owner}
          alt={AUTHOR.name}
          fill
          className="object-cover"
        />
      </div>
      <span className="text-xs font-medium text-gray-300">{AUTHOR.name}</span>
    </div>
  );
}

function FeaturedCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.id}`} className="group block relative rounded-2xl overflow-hidden shadow-lg aspect-[16/9]">
      {blog.image && (
        <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h2 className="text-white font-bold text-lg leading-snug mb-1.5 group-hover:text-purple-200 transition-colors line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-gray-300 text-xs line-clamp-2 mb-3">{blog.description}</p>
        <div className="flex items-center justify-between">
          <AuthorChip />
          <span className="text-xs text-gray-400">
            {new Date(blog.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.id}`}
      className="group flex gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      {blog.image && (
        <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0">
          <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="flex flex-col justify-between min-w-0">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors leading-snug mb-1">
            {blog.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">{blog.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-gray-200 shrink-0">
            <Image src={assets.owner} alt={AUTHOR.name} fill className="object-cover" />
          </div>
          <span className="text-xs text-gray-400">{AUTHOR.name}</span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-xs text-gray-400">
            {new Date(blog.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogsClient({
  initialBlogs,
  initialHasMore,
  initialError
}: BlogsClientProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (initialError) toast.error(initialError);
  }, [initialError]);

  const loadMoreBlogs = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const lastBlog = blogs[blogs.length - 1];
      const result = await fetchBlogs(lastBlog?.created_at);
      if (result.success && result.data) {
        setBlogs(prev => [...prev, ...result.data]);
        setHasMore(result.hasMore || false);
      } else {
        toast.error(result.error || 'Failed to load more blogs');
      }
    } catch (error) {
      toast.error('Failed to load more blogs');
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  }, [blogs, hasMore, loadingMore]);

  const featuredBlog = blogs[0];
  const restBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ── HERO ── */}
      <div className="relative bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 overflow-hidden">
        {/* subtle grid texture */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
          {/* Author pill */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <div className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-purple-300">
              <Image src={assets.owner} alt={AUTHOR.name} fill className="object-cover" />
            </div>
            <span className="text-white text-xs font-medium">{AUTHOR.name}</span>
            <span className="text-purple-300 text-xs">· {AUTHOR.role}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3 tracking-tight">
            Cleaning Tips &<br />
            <span className="text-purple-200">Home Care Insights</span>
          </h1>
          <p className="text-purple-200 text-sm sm:text-base max-w-md mx-auto">
            Practical advice on keeping Nigerian homes clean, pest-free, and healthy — from the experts at AskTouch.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* ── FEATURED ── */}
        {featuredBlog && (
          <section className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">Latest Post</p>
            <FeaturedCard blog={featuredBlog} />
          </section>
        )}

        {/* ── REST OF BLOGS ── */}
        {restBlogs.length > 0 && (
          <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">More Articles</p>
            <div className="flex flex-col gap-3">
              {restBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {blogs.length === 0 && !initialError && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm">No posts yet. Check back soon!</p>
          </div>
        )}

        {/* Error state */}
        {blogs.length === 0 && initialError && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-red-500 text-sm mb-4">Failed to load posts</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Load More */}
        {hasMore && blogs.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreBlogs}
              disabled={loadingMore}
              className="px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium hover:border-purple-400 hover:text-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loadingMore ? 'Loading...' : 'Load more posts'}
            </button>
          </div>
        )}

        {!hasMore && blogs.length > 0 && (
          <p className="text-center text-gray-400 mt-8 text-xs tracking-wide">— You've reached the end —</p>
        )}
      </main>
    </div>
  );
}