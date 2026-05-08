// app/blog/page.tsx
import { Metadata } from 'next';
import { Suspense } from 'react';
// We use getBlogs from your new service file
import { getBlogs } from '@/lib/blog-service'; 
import BlogsClient from './_components/BlogsClient';

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
  // Call the new service (no 'use server' overhead, safe for production)
  const result = await getBlogs();
  
  // Your BlogsClient expects initialBlogs, initialHasMore, and initialError.
  // Since our new service handles the try/catch internally:
  return (
    <BlogsClient 
      initialBlogs={result.data || []}
      initialHasMore={result.hasMore || false}
      // If data is empty and there's no more, we could pass an error string 
      // or just keep it undefined as the service handles errors gracefully.
      initialError={undefined} 
      initialCursor={result.nextCursor as string | null}
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