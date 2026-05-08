// app/admin/dashboard/blogs/edit/[id]/page.tsx
import { getBlogById } from "@/lib/blog-service"; // Use the service, not the action
import { notFound } from "next/navigation";
import EditBlogForm from "./EditBlogForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await params (Next.js 15 requirement)
  const { id } = await params;

  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  // 4. Render the form with the blog data
  return <EditBlogForm blog={blog} blogId={id} />;
}