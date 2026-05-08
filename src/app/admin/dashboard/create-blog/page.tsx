"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createBlog } from "@/app/actions/fetchBlogs";
import { CreateBlogDTO } from "@/constants/types";
import { blogimages } from "@/constants/assets";

import RichTextEditor from "./_components/RichTextEditor";
import BlogImageSelector from "./_components/BlogImageSelector";
import { InputField, TextAreaField } from "./_components/BlogFormFields";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CreateBlogPage() {
  const router = useRouter();

  const defaultFormData: CreateBlogDTO = {
    title: "",
    description: "",
    image: blogimages[0],
    content: "",
    date: new Date().toISOString(),
    slug: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [idx, setIdx] = useState(0);

  const handleBlogCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.content || formData.content === "<p></p>") {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      const result = await createBlog(formData);
      if (!result.success) throw new Error(result.error);

      toast.success("Blog created successfully!");
      if (result.data) {
        router.push(`/blog/${result.data.id}`);
      }
    } catch (e) {
      toast.error("Failed to create blog");
      console.error(e);
    }
  };

  const generateTitle = async () => {
    if (!formData.content) {
      toast.error("Write something first");
      return;
    }

    console.log(formData.content.length);
    const result = await fetch(`/api/generate-title`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: formData.content }),
    });

    if (!result.ok) {
      console.error((await result.json()).error);
      toast.error("Failed to generate title");
      return;
    }

    const { suggestions } = await result.json();

    setFormData({
      ...formData,
      slug: generateSlug(suggestions[0].title),
      title: suggestions[0].title,
      description: suggestions[0].description,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Create New Blog
        </h1>

        <form onSubmit={handleBlogCreation} className="space-y-6">
          {/* FIXED STYLING HERE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <InputField
                label="Title"
                id="title"
                required
                value={formData.title}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    title: val,
                    slug: generateSlug(val),
                  })
                }
              />
              <button
                type="button" // Important: prevents form submission
                onClick={generateTitle}
                className="self-end text-xs bg-sky-500 p-1.5 rounded-lg font-medium text-white hover:text-green-100 transition-colors cursor-pointer"
              >
                ✨ Generate title from content
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <InputField
                label="Slug (URL)"
                id="slug"
                value={formData.slug || ""}
                onChange={(val) => setFormData({ ...formData, slug: val })}
              />
            </div>
          </div>
          {/* END OF FIXED STYLING */}

          <TextAreaField
            label="Description"
            id="description"
            required
            value={formData.description}
            onChange={(val) => setFormData({ ...formData, description: val })}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
            />
          </div>

          <BlogImageSelector
            selectedIndex={idx}
            key={'create-blog'}
            onSelect={(img, i) => {
              setIdx(i);
              setFormData({ ...formData, image: img });
            }}
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
}
