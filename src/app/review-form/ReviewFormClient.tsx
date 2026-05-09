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
import Image from "next/image";
import { assets } from "@/constants/assets";

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

    const ratingValue = activeIndex + 1;
    const now = new Date();

    const expiryData = {
      value: "true",
      expiry: now.getTime() + ONE_DAY_MS,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expiryData));

    if (ratingValue >= 3) {
      window.open(reviewLink, "_blank");
      setHasReviewed(true);
    } else {
      router.push("/feedback");
    }
  };

  const handleShare = async () => {
    if (activeIndex === null || !mounted) return;
    const shareData = {
      title: "AskTouch Cleaning Services",
      text: "I found an amazing cleaning service in Ibadan and Lagos. Check it out!",
      url: "https://asktouchcleaning.name.ng", // replace with your actual URL
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled — do nothing
      }
    } else {
      await navigator.clipboard.writeText(shareData.url);
      // optionally show a toast here
    }
  };

  if (isChecking || !mounted) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-sky-50 to-white min-h-screen flex flex-col relative overflow-x-hidden">
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
                    Thank You
                  </p>
                  <span className="h-px w-8 bg-emerald-400" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.2]">
                  We Value Your{" "}
                  <span className="text-emerald-600">Feedback</span>
                </h2>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                  You&apos;ve already shared your experience with us. We&apos;re
                  grateful for your trust and for letting us keep your space
                  sparkling.
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
                  <p className="text-emerald-700 text-sm text-center">
                    {activeIndex + 1 <= 2 ? (
                      <>
                        We&apos;re sorry to hear that. Your feedback helps us
                        improve our service.
                      </>
                    ) : activeIndex + 1 === 3 ? (
                      <>
                        Thanks for your feedback! We&apos;d love for you to
                        share your experience on Google.
                      </>
                    ) : (
                      <>
                        Excellent! We&apos;re thrilled you enjoyed the service.
                        Share your experience on Google?
                      </>
                    )}
                  </p>
                </div>
              )}

              <button
                onClick={handleReviewLogic}
                disabled={activeIndex === null}
                className={cn(
                  "w-full mt-8 font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2",
                  activeIndex !== null
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg cursor-pointer active:scale-[0.98]"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed",
                )}
              >
                <span>
                  Submit Review {activeIndex && activeIndex >= 2 && "to Google"}
                </span>
                <ArrowRight
                  className={cn(
                    "w-4 h-4 transition-transform",
                    activeIndex !== null && "group-hover:translate-x-1",
                  )}
                />
              </button>

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

      <footer className="relative z-10 mt-16 border-t border-emerald-100 bg-white/70 backdrop-blur-sm px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="text-center lg:text-left max-w-md">
            <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-600 font-semibold mb-3">
              AskTouch Cleaning Services
            </p>

            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
              Loved our service?
            </h3>

            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Your feedback helps us grow and continue delivering spotless
              experiences. Scan the QR code or leave a quick review online.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              >
                Tell your friends about us
              </button>

              <a
                href={assets.qrCodeLocation}
                download="asktouch-review-qr.png"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
              >
                Download QR
              </a>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl shadow-emerald-500/10 p-5">
              <div className="flex flex-col items-center">
                <div className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
                  <Image
                    src={assets.reviewQrCode}
                    alt="Review QR code"
                    width={220}
                    height={220}
                    className="w-[180px] sm:w-[220px] h-auto object-contain"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold text-zinc-800">
                  Scan to leave a review
                </p>

                <p className="mt-1 text-xs text-zinc-500 text-center max-w-[220px] leading-relaxed">
                  Takes less than a minute and helps others discover our
                  services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-zinc-100 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-medium">
            AskTouch Cleaning Services • Lagos • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
