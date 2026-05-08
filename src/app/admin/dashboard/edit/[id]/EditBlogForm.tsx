// app/admin/dashboard/blogs/edit/[id]/EditBlogForm.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBlog } from "@/app/actions/fetchBlogs";
import { blogimages } from "@/constants/assets";
import BlogImageSelector from "../../create-blog/_components/BlogImageSelector";
import RichTextEditor from "./RichTextEditor";
import toast from "react-hot-toast";
import { Blog } from "@/constants/types";

interface EditBlogFormProps {
  blog: Blog;
  blogId: string;
}

export default function EditBlogForm({ blog, blogId }: EditBlogFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [idx, setIdx] = useState(() => {
    const imgIdx = blogimages.indexOf(blog.image ?? '');
    return imgIdx >= 0 ? imgIdx : 0;
  });
  const [formData, setFormData] = useState({
    title: blog.title,
    slug: blog.slug ?? '',
    description: blog.description,
    content: blog.content,
    image: blog.image ?? blogimages[0],
  });

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  };

  const handleEdit = async () => {
    setSaving(true);
    try {
      const result = await updateBlog(blogId, formData);
      if (!result.success) throw new Error(result.error);
      toast.success('Blog updated!');
      router.push(`/blog/${blogId}`);
    } catch (e) {
      toast.error('Failed to update blog');
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Edit Blog</h1>

      <form
        onSubmit={(e) => { e.preventDefault(); handleEdit(); }}
        className="flex flex-col gap-5"
      >
        {/* Title + Slug */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Blog title"
              required
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="blog-url-slug"
              required
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Short description shown in previews…"
            required
            rows={3}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-colors resize-none"
          />
          <span className="text-xs text-gray-400 text-right">{formData.description.length} chars</span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Content</label>
          <RichTextEditor
            value={formData.content}
            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
          />
        </div>

        {/* Cover image */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Cover Image</label>
          <BlogImageSelector
            key="edit-blog"
            selectedIndex={idx}
            onSelect={(img, i) => {
              setIdx(i);
              setFormData(prev => ({ ...prev, image: img }));
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="mt-2 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {saving && (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {saving ? 'Saving…' : 'Confirm Changes'}
        </button>
      </form>
    </div>
  );
}