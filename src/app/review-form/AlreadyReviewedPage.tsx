"use client";

import { ArrowRight, Calendar, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { info } from "@/constants/data";

const reviewLink = info.reviewLink;

export default function AlreadyReviewedPage() {
  return (
    <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <ThumbsUp className="w-9 h-9 text-emerald-600" />
          </div>
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-emerald-400" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Already Reviewed
          </p>
          <span className="h-px w-8 bg-emerald-400" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.2]">
          You&apos;ve Already <span className="text-emerald-600">Reviewed</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          Google only allows one review per business per account. If your
          experience has changed since your last visit, you can update your
          existing review anytime through Google.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href="/book"
          className="group bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Next Cleaning</span>
        </Link>

        <Link
          href="/"
          className="group border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}