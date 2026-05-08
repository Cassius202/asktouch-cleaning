import { fetchBlogById } from "@/app/actions/fetchBlogs";
import { Blog } from "@/constants/types";
import ErrorPage from "@/utils/ErrorPage";
import { BlogContents } from "./_components/BlogContents";

// Next.js deduplicates fetch calls with the same arguments automatically,
// but only if you're using fetch() directly. With a server action, cache it:
import { cache } from "react";

const getBlog = cache(async (id: string) => {
  return await fetchBlogById(id);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getBlog(id);

  if (!result.success || !result.data) return null;

  const blog: Blog = result.data;
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.image }],  // ← wrap in object, more reliable
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getBlog(id);

  if (!result.success || !result.data) return <ErrorPage />;

  return <BlogContents blog={result.data} />;
}