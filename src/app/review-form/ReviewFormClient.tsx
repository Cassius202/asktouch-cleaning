"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Star,
  ThumbsUp,
  MessageCircle,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { info } from "@/constants/data";
import { GridTexture } from "@/utils/GridTexture";
import AlreadyReviewedPage from "./AlreadyReviewedPage";

const reviewLink = info.reviewLink;
const ratings = [1, 2, 3, 4, 5];
const STORAGE_KEY = "review_status";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function ReviewFormClient() {
  const router = useRouter();
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showWhatsAppFloat, setShowWhatsAppFloat] = useState(true);

  const checkReviewStatus = () => {
    const itemStr = localStorage.getItem(STORAGE_KEY);

    if (!itemStr) {
      setIsChecking(false);
      return;
    }

    try {
      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(STORAGE_KEY);
        setHasReviewed(false);
      } else {
        setHasReviewed(true);
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsChecking(false);
  };

  useEffect(() => {
    setMounted(true);
    checkReviewStatus();
  }, []);

  const handleReviewLogic = () => {
    if (activeIndex === null || !mounted) return;

    const now = new Date();
    const expiryData = {
      value: "true",
      expiry: now.getTime() + ONE_DAY_MS,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expiryData));

    // Only auto-navigate for 3+ stars
    const ratingValue = activeIndex + 1;
    if (ratingValue >= 3) {
      window.open(reviewLink, "_blank");
      setHasReviewed(true);
    }
  };

  if (isChecking || !mounted) return null;

  return (
    <div className="bg-linear-to-br from-emerald-50 via-sky-50 to-white min-h-screen flex flex-col relative overflow-x-hidden">
      <GridTexture size={2} />

      {/* WhatsApp Floating Button */}
      {showWhatsAppFloat && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-500">
          <button
            onClick={() => window.open("https://wa.me/2348012345678", "_blank")}
            className="bg-[#25D366] hover:bg-[#20b859] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => setShowWhatsAppFloat(false)}
            className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md hover:bg-gray-100"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      )}

      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />

      <main className="relative z-10 flex-grow flex items-center justify-center p-6 py-12 md:py-20">
        <div className="w-full max-w-2xl">
          {hasReviewed ? (
            <AlreadyReviewedPage />
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center space-y-4 mb-8">
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-emerald-400" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-600">
                    Share Your Experience
                  </p>
                  <span className="h-px w-8 bg-emerald-400" />
                </div>

                <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                  How was your cleaning?
                </h1>

                <p className="text-gray-500 text-sm">
                  {activeIndex !== null
                    ? `You rated our service ${activeIndex + 1} star${activeIndex > 0 ? "s" : ""}. Confirm to continue.`
                    : "Tap a star to rate your experience with AskTouch"}
                </p>
              </div>

              {/* Rating Stars */}
              <div className="flex justify-center gap-2 md:gap-3 py-6">
                {ratings.map((rating, i) => (
                  <button
                    key={rating}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "group relative flex flex-col items-center gap-1 transition-all duration-300",
                      activeIndex === i ? "scale-110" : "hover:scale-105",
                    )}
                  >
                    <Star
                      className={cn(
                        "w-10 h-10 md:w-12 md:h-12 transition-all duration-300",
                        activeIndex !== null && i <= activeIndex
                          ? "fill-amber-500 text-amber-500"
                          : "fill-gray-200 text-gray-200 group-hover:fill-gray-300 group-hover:text-gray-300",
                        activeIndex === i && "drop-shadow-lg",
                      )}
                    />
                    <span className="text-[9px] uppercase text-gray-400 font-medium">
                      {["Poor", "Fair", "Good", "Great", "Excellent"][i]}
                    </span>
                  </button>
                ))}
              </div>

              {activeIndex !== null && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-xl animate-in fade-in duration-300">
                  {activeIndex + 1 <= 2 ? (
                    <div className="space-y-3">
                      <p className="text-emerald-700 text-sm text-center">
                        We&apos;re sorry to hear that. You can share your honest
                        experience on Google or let us know privately so we can
                        make it right.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <button
                          onClick={() => {
                            const now = new Date();
                            localStorage.setItem(
                              STORAGE_KEY,
                              JSON.stringify({
                                value: "true",
                                expiry: now.getTime() + ONE_DAY_MS,
                              }),
                            );
                            window.open(reviewLink, "_blank");
                            setHasReviewed(true);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-700 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200"
                        >
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          Leave a Google Review
                        </button>
                        <button
                          onClick={() => {
                            const now = new Date();
                            localStorage.setItem(
                              STORAGE_KEY,
                              JSON.stringify({
                                value: "true",
                                expiry: now.getTime() + ONE_DAY_MS,
                              }),
                            );
                            router.push("/feedback");
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-200"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Send Us a Complaint
                        </button>
                      </div>
                    </div>
                  ) : activeIndex + 1 === 3 ? (
                    <p className="text-emerald-700 text-sm text-center">
                      Thanks for your feedback! We&apos;d love for you to share
                      your experience on Google.
                    </p>
                  ) : (
                    <p className="text-emerald-700 text-sm text-center">
                      Excellent! We&apos;re thrilled you enjoyed the service.
                      Share your experience on Google?
                    </p>
                  )}
                </div>
              )}
              {activeIndex !== null && activeIndex + 1 >= 3 && (
                <button
                  onClick={handleReviewLogic}
                  className={cn(
                    "w-full mt-8 font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2",
                    "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg cursor-pointer active:scale-[0.98]",
                  )}
                >
                  <span>Submit Review {activeIndex >= 2 && "to Google"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center justify-center gap-2 mt-6">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest">
                  Your feedback helps us shine • AskTouch Support
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
