// app/blog/[id]/page.tsx
import { getBlogById } from "@/lib/blog-service";
import ErrorPage from "@/utils/ErrorPage";
import { BlogContents } from "./_components/BlogContents";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogById(id);
  
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
  const blog = await getBlogById(id);

  if (!blog) return <ErrorPage />;

  return <BlogContents blog={blog} />;
}