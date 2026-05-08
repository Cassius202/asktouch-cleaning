"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {TextStyle} from "@tiptap/extension-text-style"; // Correct import
import Color from "@tiptap/extension-color"; // Example of why you'd need text style
import { useEffect } from "react";
import { 
  Bold, Italic, List, ListOrdered, Quote, 
  Undo, Redo, Heading2 
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const buttons = [
    { 
      icon: <Bold size={18} />, 
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    { 
      icon: <Italic size={18} />, 
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    { 
      icon: <Heading2 size={18} />, 
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    { 
      icon: <List size={18} />, 
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    { 
      icon: <ListOrdered size={18} />, 
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    { 
      icon: <Quote size={18} />, 
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50/50 rounded-t-xl">
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.preventDefault();
            btn.onClick();
          }}
          className={`p-2 rounded-md transition-colors ${
            btn.isActive 
              ? "bg-emerald-100 text-emerald-700" 
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {btn.icon}
        </button>
      ))}
      <div className="flex ml-auto gap-1">
        <button 
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <Undo size={18} />
        </button>
        <button 
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <Redo size={18} />
        </button>
      </div>
    </div>
  );
};

function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      TextStyle,
      Color,
    ],
    content: value,
    editorProps: {
      attributes: {
        // This adds Tailwind classes to the actual editable area
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Keep the editor content in sync if 'value' changes externally
  // (e.g., during form resets or data fetching)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white transition-all shadow-sm hover:shadow-md focus-within:ring-2 min-h-100 focus-within:ring-emerald-500/20 focus-within:border-emerald-400 overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default RichTextEditor;