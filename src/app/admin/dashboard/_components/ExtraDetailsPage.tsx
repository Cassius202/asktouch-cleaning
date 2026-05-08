'use client'

import { Blog } from "@/constants/types";
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface ExtraDetailsPageProps {
  blogData: Blog[];
  isLoading: boolean;
}

export default function ExtraDetailsPage({ blogData, isLoading }: ExtraDetailsPageProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recent Blog Posts */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">Recent Blog Posts</h2>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 lg:hidden rounded-full">
              This Month
            </span>
          </div>
          <Link 
            href="/admin/dashboard/blogs" 
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {blogData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts this month</p>
            <Link 
              href="/admin/dashboard/create-blog"
              className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Create your first blog post →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {blogData.map((blog) => (
              <div key={blog.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <Link href={`/blogs/${blog.slug}`} className="group block">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {blog.description || 'No description available'}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {blog.created_at 
                          ? formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })
                          : 'Recently'}
                      </span>
                    </div>
                    {/* {blog.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{blog.author}</span>
                      </div>
                    )}
                    {blog.views !== undefined && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{blog.views} views</span>
                      </div>
                    )} */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-sm p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Blog Performance</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-emerald-100 text-sm">Total Posts (This Month)</p>
            <p className="text-3xl font-bold">{blogData.length}</p>
          </div>
          <div>
            <p className="text-emerald-100 text-sm">Engagement Rate</p>
            <p className="text-3xl font-bold">
              {blogData.length > 0 ? '↑ 24%' : '0%'}
            </p>
          </div>
        </div>
        <Link 
          href="/admin/dashboard/create-blog"
          className="inline-block mt-6 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Write New Post
        </Link>
      </div>

      {/* Recent Activity Feed (Optional) */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {blogData.slice(0, 3).map((blog) => (
            <div key={blog.id} className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Blog post published:</span>{' '}
                  <Link href={`/blogs/${blog.slug}`} className="text-emerald-600 hover:underline">
                    {blog.title}
                  </Link>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {blog.created_at 
                    ? formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })
                    : 'Recently'}
                </p>
              </div>
            </div>
          ))}
          {blogData.length === 0 && (
            <p className="text-gray-500 text-sm">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}