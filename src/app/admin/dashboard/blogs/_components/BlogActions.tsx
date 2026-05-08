'use client'

import { deleteBlog } from "@/app/actions/fetchBlogs";
import { MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ActionsModal from "./ActionsModal";

export function BlogActions({ blogId }: { blogId: string }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    const res = await deleteBlog(id);
    if (!res.success) {
      toast.error("Failed to delete blog");
      return;
    }
    toast.success("Blog deleted successfully!");
    setOpen(false);
    router.refresh();
  };

  const handleOpen = (id: string) => {
    router.push(`/blog/${id}`);
  };

  const handleUpdate = (id: string) => {
    router.push(`/admin/dashboard/edit/${id}`);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          // pass the bottom-left corner of the button as anchor
          setPosition({ x: rect.right, y: rect.bottom + 4 });
          setOpen(prev => !prev);
        }}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <ActionsModal
          blogId={blogId}
          handleUpdate={handleUpdate}
          handleOpen={handleOpen}
          handleDelete={handleDelete}
          position={position}
        />
      )}
    </div>
  );
}