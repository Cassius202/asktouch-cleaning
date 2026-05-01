'use client';

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { MotionDiv } from "@/motion/MotionDiv";
import Image from "next/image";
import { assets, reviews } from "@/constants/assets";
import { Review } from "@/constants/types";

export function ReviewBentoGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!mounted) return null;

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-12">
      {isMobile ? (
        <div className="flex flex-col gap-4">
          <div className="aspect-video">
            <ImageReviewCard />
          </div>
          {reviews.slice(0, 6).map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 auto-rows-[150px]">
          {/* Card 1: Top Left - Text (2 rows) */}
          <div className="row-span-2">
            <ReviewCard review={reviews[0]} />
          </div>

          {/* Card 2: Top Middle - Image (3 rows) */}
          <div className="row-span-3">
            <ImageReviewCard />
          </div>

          {/* Card 3: Top Right - Text (2 rows) */}
          <div className="row-span-2">
            <ReviewCard review={reviews[1]} />
          </div>

          {/* Card 4: Middle Left - Text (3 rows) */}
          <div className="row-span-3">
            <ReviewCard review={reviews[2]} />
          </div>

          {/* Card 5: Middle Right - Text (2 rows) */}
          <div className="row-span-2">
            <ReviewCard review={reviews[6]} />
          </div>

          {/* Card 7: Bottom Left - Text (2 rows) */}
          <div className="row-span-2">
            <ReviewCard review={reviews[4]} />
          </div>
        </div>
      )}
    </section>
  );
}

// --- Sub Components ---

const ReviewCard = ({ review }: { review: Review }) => (
  <MotionDiv className="h-full w-full bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300">
    <div>
      <div className="flex gap-1 mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-slate-700 line-clamp-6 leading-relaxed text-base">
        {`"${review.review}"`}
      </p>
    </div>
    
    <div className="mt-6 flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-lg">
        {review.name[0]}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 text-sm">{review.name}</h4>
        <p className="text-slate-500 text-xs">{review.title}</p>
      </div>
    </div>
  </MotionDiv>
);

const ImageReviewCard = () => {
  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden group">
      <Image 
        src="https://nsqgfrsugkvsftnffeno.supabase.co/storage/v1/object/public/images/man-fumigating-image.jpg"
        alt="Testimonial"
        fill
        className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
};