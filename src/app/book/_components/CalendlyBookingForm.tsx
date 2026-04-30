"use client";

import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { BookingFormData } from "@/constants/types";
import { handleBookingUpload } from "@/app/actions/handleBookingUpload";
import toast from "react-hot-toast";
import { Calendar, MapPin, User, Mail, Phone, Briefcase, Loader2 } from "lucide-react";
import { info } from "@/constants/data";

// Extend the window interface for Calendly
declare global {
  interface Window {
    Calendly: any;
  }
}
interface FormProps {
  formData: BookingFormData;
  setFormData: Dispatch<SetStateAction<BookingFormData>>;
}
export const CalendlyBookingForm = ({ formData, setFormData}: FormProps) => {
  const [loading, setLoading] = useState(false);

  // Load Calendly Script
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: info.calendlyLink, // Replace with your link
        prefill: {
          name: formData.name,
          email: formData.email,
          customAnswers: {
            a1: formData.phone,
            a2: formData.location,
            a3: formData.service,
          },
        },
      });
    } else {
      toast.error("Calendly failed to load. Please refresh.");
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validation
  if (!formData.name || !formData.email || !formData.phone || !formData.service) {
    toast.error("Please fill in all required fields");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  const phoneRegex = /^(\+234|0)[7-9][0-1]\d{8}$/;
  if (!phoneRegex.test(formData.phone)) {
    toast.error("Please enter a valid Nigerian phone number");
    return;
  }

  setLoading(true);
  
  // Immediate success feedback
  toast.success("Details confirmed! Opening calendar...", {
    duration: 3000,
    icon: "📅",
  });

  // Open Calendly IMMEDIATELY - no waiting
  openCalendly();

  // Reset form immediately
  setFormData({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    state: "",
    hearAbout: "",
  });
  
  setLoading(false);

  // FIRE AND FORGET - Google Sheet upload happens in background
  const bookingData = {
    ...formData,
    state: "Video Consultation",
    hearAbout: "null",
  };

  handleBookingUpload(bookingData)
    .then(res => {
      if (!res.success) {
        console.error("Background sync failed:", res.message);
        // Optional: Store in localStorage for retry
        const failedBookings = JSON.parse(localStorage.getItem('failedVideoConsultations') || '[]');
        failedBookings.push({ data: bookingData, timestamp: Date.now() });
        localStorage.setItem('failedVideoConsultations', JSON.stringify(failedBookings));
      }
    })
    .catch(error => {
      console.error("Background sync error:", error);
      // Store in localStorage for retry
      const failedBookings = JSON.parse(localStorage.getItem('failedVideoConsultations') || '[]');
      failedBookings.push({ data: bookingData, timestamp: Date.now() });
      localStorage.setItem('failedVideoConsultations', JSON.stringify(failedBookings));
    });
};

  return (
    <div className="w-full mx-auto max-w-md xl:max-w-lg p-8 bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50">
      <div className="mb-8 text-center">
        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 max-md:hidden">
          <Calendar className="w-6 h-6 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900">Book a Consultation</h3>
        <p className="text-zinc-500 text-sm mt-2">
          Schedule a video call for more personalized and efficient communication.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-700 ml-1">FULL NAME *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Email and Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 ml-1">EMAIL *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 ml-1">PHONE *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="tel"
                placeholder="08012345678"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-700 ml-1">SERVICE TYPE *</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <select
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none bg-white transition-all"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              required
            >
              <option value="">Select a service</option>
              <option value="Deep Cleaning">Deep Cleaning</option>
              <option value="Fumigation">Fumigation</option>
              <option value="Both">Both Cleaning & Fumigation</option>
            </select>
          </div>
        </div>

        {/* Location (Optional) */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-700 ml-1">LOCATION (OPTIONAL)</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="e.g No 123 Wuse 2 Abuja"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Book Now <Calendar className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};