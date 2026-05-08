// app/blog/[id]/page.tsx
import { getBlogById } from "@/lib/blog-service"; 
// import { Blog } from "@/constants/types";
import ErrorPage from "@/utils/ErrorPage";
import { BlogContents } from "./_components/BlogContents";
import { cache } from "react";

const getBlog = cache(async (id: string) => {
  return await getBlogById(id);
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id); // Returns Blog or null

  if (!blog) return { title: "Post Not Found" };

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.image }],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id); // Returns Blog or null

  if (!blog) return <ErrorPage />;

  return <BlogContents blog={blog} />;
}