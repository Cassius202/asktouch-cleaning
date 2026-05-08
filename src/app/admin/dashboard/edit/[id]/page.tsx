// app/admin/dashboard/blogs/edit/[id]/page.tsx
import { fetchBlogById } from "@/app/actions/fetchBlogs";
import { notFound } from "next/navigation";
import EditBlogForm from "./EditBlogForm";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await fetchBlogById(id);
  
  if (!result.success || id === null || !result.data) {
    notFound();
  }
  
  return <EditBlogForm blog={result.data} blogId={id!} />;
}