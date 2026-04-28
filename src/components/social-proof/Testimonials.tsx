"use client";

import { useRef } from "react";
import { reviews } from "@/constants/assets";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";

// Limit to 3 for the homepage
const reviews_homepage = reviews.slice(0, 3);

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full bg-[#f8fafc] text-slate-900 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />

      <section className="relative max-w-7xl mx-auto z-10 global-padding">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-between gap-8 mb-12 md:mb-12 items-">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-slate-900 mx-auto leading-[1.1]">
              What our customers <br /> say about us
            </h2>
            <p className="text-lg text-slate-500 mt-6 leading-relaxed text-center">
              Trusted engineering excellence for Abuja&apos;s most demanding cooling and power needs.
            </p>
          </div>

          {/* Navigation Buttons (Visible only on Mobile/Tablet for the carousel) */}
          <div className="flex gap-3 md:hidden">
            <button 
              onClick={() => scroll("left")}
              className="p-4 rounded-full border border-slate-200 bg-white shadow-sm active:scale-95 transition-all"
              aria-label="Previous"
            >
              <FaChevronLeft className="text-slate-600" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="p-4 rounded-full border border-slate-200 bg-white shadow-sm active:scale-95 transition-all"
              aria-label="Next"
            >
              <FaChevronRight className="text-slate-600" />
            </button>
          </div>
        </div>

        {/* Carousel / Grid Container */}
        {/* Mobile: Horizontal Scroll | Desktop: Static Grid */}
        <div 
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide gap-6 pb-4 scroll-container"
        >
          {reviews_homepage.map((r, i) => (
            <div 
              key={i} 
              className="max-md:w-[120px] max-sm:min-w-[80vw] md:min-w-0 shrink-0 snap-center md:shrink"
            >
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      
        {/* Bottom CTA */}
        <div className="mt-12 md:mt-20 flex justify-center">
          <Link 
            href="/testimonials" 
            className="group flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-all duration-300 shadow-lg"
          >
            See all reviews
            <HiArrowLongRight className="size-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const ReviewCard = ({
  review,
}: {
  review: { name: string; image: string; review: string; rating: number };
}) => {
  return (
    <div className="h-full bg-white rounded-2xl p-4 md:p-6 flex flex-col gap-3 border border-slate-100 shadow-sm shadow-slate-200/50">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`${i < review.rating ? 'text-amber-400' : 'text-slate-200'} text-xl`}
          >
            ★
          </span>
        ))}
      </div>

      <FaQuoteLeft className="size-10 text-slate-100" />

      <p className="text-[15px] md:text-base text-slate-600 font-normal leading-relaxed flex-1">
        &quot;{review.review}&quot;
      </p>

      <div className="flex items-center gap-4 pt-6 border-t border-slate-50 mt-auto">
        <div className="relative size-12 rounded-full overflow-hidden shrink-0 border border-slate-100">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-base font-bold text-slate-900 tracking-tight">
            {review.name}
          </p>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Verified Client
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;