import { Blog } from "@/constants/types";
import Image from "next/image";
import { BlogMarkdown } from "./BlogMarkdown";
import { assets } from "@/constants/assets";
import { askTouchData } from "@/constants/data";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from "react-icons/fa";
import { Phone, ArrowLeft, ArrowRight } from "lucide-react";

const phone_numbers = askTouchData.contact.phone_numbers;

export const BlogContents = ({ blog }: { blog: Blog }) => {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-stone-200 global-padding">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image alt="logo" src={assets.logo} width={32} height={32} className="rounded-md" />
            <span className="font-semibold text-stone-800 text-sm tracking-tight">
              AskTouch{" "}
              <span className="hidden lg:inline text-stone-500 font-normal">
                Cleaning & Fumigation
              </span>
            </span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={13} />
            All posts
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <div className="w-full border-stone-200 global-padding">
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-base sm:text-lg text-stone-500 leading-relaxed max-w-2xl">
            {blog.description}
          </p>
          {blog.date && (
            <p className="mt-4 text-xs text-stone-400 uppercase tracking-widest">
              {new Date(blog.date).toLocaleDateString("en-NG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Cover image */}
        {blog.image && (
          <div className="max-w-3xl lg:max-w-4xl  mx-auto px-4 pb-0">
            <div className="relative w-full aspect-[16/7] rounded-t-xl overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <main className="max-w-3xl lg:max-w-4xl mx-auto py-10">
        <BlogMarkdown html={blog.content} />
      </main>

      {/* ── CTA BANNER ── */}
      <div className="bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-200 mb-1">
              Professional Cleaning Services
            </p>
            <h2 className="text-xl sm:text-2xl font-bold leading-snug">
              Ready for a cleaner, healthier space?
            </h2>
          </div>
          <Link
            href="/#services"
            className="shrink-0 flex items-center gap-2 bg-white text-emerald-700 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            See what we offer
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-stone-900 text-stone-400">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

            {/* Brand */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Image alt="logo" src={assets.logo} width={28} height={28} className="rounded-md opacity-80" />
                <span className="text-sm font-semibold text-white">AskTouch</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {phone_numbers?.map((num: string, i: number) => (
                  <a
                    key={i}
                    href={`tel:${num}`}
                    className="flex items-center gap-1.5 text-xs hover:text-emerald-400 transition-colors"
                  >
                    <Phone size={11} />
                    {num}
                  </a>
                ))}
              </div>
            </div>

            {/* Links + social */}
            <div className="flex flex-col gap-4">
              <Link
                href="/blog"
                className="text-sm font-medium text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft size={13} />
                More articles
              </Link>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {askTouchData.social?.linkedIn && (
                  <a href={askTouchData.social.linkedIn} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-stone-300 hover:text-white">
                    <FaLinkedin size={14} />
                  </a>
                )}
                {askTouchData.social?.instagram && (
                  <a href={askTouchData.social.instagram} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-stone-300 hover:text-white">
                    <FaInstagram size={14} />
                  </a>
                )}
                {askTouchData.social?.twitter && (
                  <a href={askTouchData.social.twitter} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-stone-300 hover:text-white">
                    <FaTwitter size={14} />
                  </a>
                )}
                {askTouchData.social?.tiktok && (
                  <a href={askTouchData.social.tiktok} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-stone-300 hover:text-white">
                    <FaTiktok size={14} />
                  </a>
                )}
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-stone-800 text-xs text-stone-600 text-center">
            © {new Date().getFullYear()} AskTouch Cleaning & Fumigation. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};