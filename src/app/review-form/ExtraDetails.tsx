'use client';

import { assets } from "@/constants/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
 
export default function ExtraDetails() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

    const handleShare = async () => {
    if (!mounted) return;
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

  if (!mounted) return null;
  return (
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
  )
}