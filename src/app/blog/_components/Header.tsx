"use client";

import { assets } from "@/constants/assets";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Calendar, ArrowRight } from "lucide-react"; // Added missing imports

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Logic: If scrolling down and past 100px, hide header. If scrolling up, show it.
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [lastScrollY]);

  if (pathname === "/blog" || pathname === "/blog/") {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              alt="logo"
              src={assets.logo}
              width={32}
              height={32}
              className="rounded-lg shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-bold text-stone-800 text-sm tracking-tight leading-none">
                AskTouch
              </span>
              <span className="hidden sm:inline text-[10px] text-stone-500 font-medium uppercase tracking-widest mt-0.5">
                Cleaning & Fumigation
              </span>
            </div>
          </Link>

          {/* Navigation Actions */}
          <nav className="flex items-center gap-4">
            {/* Home Button */}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-600 transition-colors px-3 py-1 rounded-full shrink-0"
            >
              <Home size={24} />
              <span className=" shrink-0 hidden xs:inline">Home</span>
            </Link>

            {/* Book Inspection Button */}
            <Link
              href="/book"
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all px-4 py-2 rounded-full shadow-sm hover:shadow-md"
            >
              <Calendar size={14} />
              <span>Book Inspection</span>
              <ArrowRight size={12} className="hidden sm:inline" />
            </Link>
          </nav>
        </div>
      </header>
    );
  } else {
    return null;
  }
}
