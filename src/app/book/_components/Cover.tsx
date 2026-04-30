"use client";

import { cn } from "@/utils/cn";
import { GridTexture } from "@/utils/GridTexture";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { info } from "@/constants/data";
import { use, useEffect, useState } from "react";

interface CoverProps {
  method: "calendly" | "whatsapp";
  toggleMethod: () => void;
}

const logoImage = assets.logo;
const phoneNumber = info.phone;
const coverImage =
  "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?w=1800&auto=format&fit=crop&q=90&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xlYW5pbmd8ZW58MHx8MHx8fDA%3D";

export const Cover = ({ method, toggleMethod }: CoverProps) => {
  const isWhatsapp = method === "whatsapp";
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div
      className={cn(
        "absolute top-0 w-[50%] h-screen bg-emerald-800 z-30 transition-transform duration-700 ease-in-out hidden md:flex flex-col items-center justify-center text-white text-center overflow-hidden",
        isWhatsapp
          ? "translate-x-full rounded-l-[4rem]"
          : "translate-x-0 rounded-r-[4rem]",
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-80">
        <Image
          alt="cover"
          src={coverImage}
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>

      {/* Logo Position */}
      <div className="absolute top-12 left-12 z-20">
        <Image
          src={logoImage}
          alt="Company Logo"
          width={140}
          height={50}
          className="object-contain brightness-0 invert"
        />
      </div>

      {/* Quick Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="absolute top-12 right-12 z-20 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 text-sm font-medium transition-all active:scale-95"
      >
        <Phone className="w-4 h-4 text-emerald-400" />
        Quick Call
      </a>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <GridTexture size={2.5} />

      {/* Content */}
      <div className="space-y-6 relative z-10 px-12">
        <h2 className="text-4xl font-bold">
          {!isWhatsapp ? "Prefer Calendly?" : "Need Quick Help?"}
        </h2>
        <p className="text-emerald-50/80 text-lg max-w-md mx-auto">
          {!isWhatsapp
            ? "Schedule a formal 30-minute slot on our calendar for a detailed discussion."
            : "Fill a quick form and submit it on WhatsApp"}
        </p>
        <button
          onClick={toggleMethod}
          className="mt-8 px-10 py-3 border-2 border-white/50 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all flex items-center gap-2 mx-auto backdrop-blur-sm"
        >
          {!isWhatsapp ? (
            <>
              <Calendar className="w-5 h-5" /> Use Calendly
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5" /> Use WhatsApp
            </>
          )}
        </button>
      </div>
    </div>
  );
};
