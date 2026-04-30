'use client';

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState, useEffect, useRef } from "react";
import { Play, Star, } from "lucide-react";
import { MotionDiv } from "@/motion/MotionDiv";
import Image from "next/image";
import { assets, reviews, testimonialSampleVideo } from "@/constants/assets"; import { Review } from "@/constants/types";

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
            <VideoReviewCard 
              name="Sarah Johnson" 
              title="Homeowner" 
              video={testimonialSampleVideo} 
            />
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

          {/* Card 2: Top Middle - Video (3 rows) */}
          <div className="row-span-3">
            <VideoReviewCard 
              name="Sarah Johnson" 
              title="Homeowner" 
              video={testimonialSampleVideo} 
            />
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

const VideoReviewCard = ({ name, title, video }: { name: string, title: string, video: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };
  
  const testimonialThumbnail = assets.testimonialThumbnail;
  
  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden group cursor-pointer">
      {!isPlaying ? (
        <>
          <Image 
            src={imageError ? testimonialThumbnail : video}
            alt={name}
            fill
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={handlePlay}
              className="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/40 hover:scale-110 hover:bg-white/30 transition-all duration-300"
            >
              <Play fill="currentColor" className="ml-1 w-7 h-7" />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 text-white">
            <h4 className="font-semibold text-xl mb-1">{name}</h4>
            <p className="text-white/90 text-sm">{title}</p>
          </div>
        </>
      ) : (
        <video
          ref={videoRef}
          src={video}
          controls
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
          poster={imageError ? testimonialThumbnail : video}
        />
      )}
    </div>
  );
};