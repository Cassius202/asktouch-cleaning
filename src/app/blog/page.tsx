// app/blog/page.tsx
import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchBlogs } from '@/app/actions/fetchBlogs';
import BlogsClient from './_components/BlogsClient';

// ADD THIS SINGLE LINE - caches page for 
// export const revalidate = 60 * 30;

export const metadata: Metadata = {
  title: 'Blog - Thoughts, Stories, and Ideas',
  description: 'Explore our collection of articles, stories, and insights on various topics.',
  openGraph: {
    title: 'Blog - Thoughts, Stories, and Ideas',
    description: 'Explore our collection of articles, stories, and insights on various topics.',
    type: 'website',
  },
};

function BlogsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl pt-20 font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-gray-600">Thoughts, stories, and ideas</p>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    </div>
  );
}

async function BlogContent() {
  const initialResult = await fetchBlogs();
  
  return (
    <BlogsClient 
      initialBlogs={initialResult.success ? initialResult.data || [] : []}
      initialHasMore={initialResult.success ? initialResult.hasMore || false : false}
      initialError={!initialResult.success ? initialResult.error : undefined}
    />
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogsLoading />}>
      <BlogContent />
    </Suspense>
  );
}