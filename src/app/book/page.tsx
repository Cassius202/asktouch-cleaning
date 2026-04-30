"use client";
import Form from "./_components/Form";
import { CalendlyBookingForm } from "./_components/CalendlyBookingForm";
import { Cover } from "./_components/Cover";
import { cn } from "@/utils/cn";
import useSessionStorage from "@/hooks/useSessionStorage";
import { FaArrowRight } from "react-icons/fa";
import { capitalizeFirstLetter } from "@/utils/utility-functions";
import { assets } from "@/constants/assets";
import Image from "next/image"; // Import Image
import Link from "next/link"; // Import Link
import { BookingFormData } from "@/constants/types";
// app/booking/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Your Service | AskTouch',
  description: 'Schedule professional cleaning and pest control services online. Free quotes, instant confirmation, and same-day availability.',
  openGraph: {
    title: 'Book AskTouch Services | Professional Cleaning',
    description: 'Book residential or office cleaning, pest control, and fumigation services. Get a free quote today.',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/booking`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/ask-touch-metaimage.jpg`,
        width: 1200,
        height: 630,
        alt: 'Book AskTouch Cleaning Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book AskTouch Services | Professional Cleaning',
    description: 'Schedule your cleaning or pest control service online. Free quotes and instant booking.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/ask-touch-metaimage.jpg`],
  },
}

const logoImage = assets.logo;

export default function BookNowPage() {
  const [formData, setFormData] = useSessionStorage<BookingFormData>(
    "formData",
    {
      name: "",
      email: "",
      phone: "",
      location: "",
      service: "",
      state: "",
      hearAbout: "",
    },
  );
  const [method, setMethod] = useSessionStorage<"calendly" | "whatsapp">(
    "booking-method",
    "calendly",
  );

  const toggleMethod = () => {
    setMethod((prev) => (prev === "calendly" ? "whatsapp" : "calendly"));
  };

  const alternateMethod = method === "calendly" ? "WhatsApp" : "Calendly";

  return (
    <main className="relative w-full md:h-screen max-md:min-h-screen md:overflow-hidden bg-zinc-50">
      {/* The Sliding Emerald Cover (Desktop Only) */}
      <Cover method={method} toggleMethod={toggleMethod} />

      {/* Mobile Logo Anchor - Top Center */}
      <div className="md:hidden pt-8 flex justify-center">
        <Link href="/">
          <Image
            src={logoImage}
            alt="AskTouch Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Minimalist Phone Heading */}
      <div className="md:hidden mx-auto px-8 pt-6 pb-2 max-w-max">
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
          Book with{" "}
          <span className="text-emerald-600">
            {capitalizeFirstLetter(method)}
          </span>
        </h1>
        <div className="h-1 w-12 bg-emerald-500 mt-2 rounded-full mx-auto" />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
        {/* Left Column: Calendly Form */}
        <div
          className={cn(
            "flex items-center justify-center p-6 md:p-8",
            method === "whatsapp" ? "hidden md:flex" : "",
          )}
        >
          <div className="w-full mx-auto">
            <CalendlyBookingForm formData={formData} setFormData={setFormData} />
          </div>
        </div>

        {/* Right Column: WhatsApp Form */}
        <div
          className={cn(
            "flex items-center justify-center p-6 md:p-8",
            method === "calendly" ? "hidden md:flex" : "",
          )}
        >
          <div className="w-full mx-auto">
            <Form formData={formData} setFormData={setFormData} />
          </div>
        </div>

        {/* Subdued Phone Switch Button */}
        <div className="flex items-center justify-center pb-12 pt-8 md:hidden">
          <button
            onClick={toggleMethod}
            className="flex items-center gap-2 text-zinc-400 hover:text-emerald-600 transition-colors duration-300 px-6 text-center"
          >
            <span className="text-xs font-medium uppercase tracking-widest leading-relaxed">
              Want to book a call? Book using{" "}
              <span className="text-emerald-600 font-bold">
                {alternateMethod}
              </span>
            </span>
            <FaArrowRight className="text-[10px] opacity-70 shrink-0" />
          </button>
        </div>
      </div>
    </main>
  );
}
