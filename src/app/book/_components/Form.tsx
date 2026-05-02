"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { handleBookingUpload } from "@/app/actions/handleBookingUpload";
import { ChevronRight, Send } from "lucide-react";
import { NIGERIAN_STATES } from "@/constants/info";
import { BookingFormData } from "@/constants/types";
import toast from "react-hot-toast";

interface FormProps {
  formData: BookingFormData;
  setFormData: Dispatch<SetStateAction<BookingFormData>>;
}
export default function WhatsAppForm({ formData, setFormData }: FormProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    setIsClicked(true);
    // 2. Added location to the mandatory validation
    if (!formData.service) {
      toast.error("Please select a service");
      return;
    }
    if (!formData.state) {
      toast.error("Please select your state");
      return;
    }
    if (!formData.location) {
      toast.error("Please enter your location/address");
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.state ||
      !formData.location
    ) {
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

    // Show immediate success feedback
    toast.success("Booking submitted! We'll contact you shortly.", {
      duration: 4000,
      icon: "✅",
    });

    // Prepare WhatsApp message
    const locationText = `${formData.location}, ${formData.state}`;
    const sourceInfo = formData.hearAbout
      ? ` (Found you via: ${formData.hearAbout})`
      : "";
    const text = `Hello Ask Touch, I'm ${formData.name}. I need ${formData.service} at ${locationText}. My email is ${formData.email}. Please contact me on ${formData.phone}.${sourceInfo}`;

    window.open(
      `https://wa.me/2349034027582?text=${encodeURIComponent(text)}`,
      "_blank",
    );

    // Reset form immediately
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      state: "",
      service: "",
      hearAbout: "",
    });
    setStep(1);
    setIsClicked(false);
    setLoading(false);

    // FIRE AND FORGET - Google Sheet upload happens in background
    handleBookingUpload({ ...formData })
      .then((res) => {
        if (!res.success) {
          // Silent logging - user already got success feedback
          console.error("Background sync failed:", res.message);
          // Optional: Send to error tracking service
        }
      })
      .catch((error) => {
        console.error("Background sync error:", error);
        // Optional: Send to error tracking service
      });
  };

  return (
    <div className="w-full mx-auto max-w-md p-4 sm:p-8 bg-white rounded-3xl shadow-xl shadow-emerald-900/5">
      <div className="flex gap-2 mb-8">
        <div
          className={`h-1 flex-1 rounded-full transition-all ${step >= 1 ? "bg-emerald-600" : "bg-zinc-200"}`}
        />
        <div
          className={`h-1 flex-1 rounded-full transition-all ${step >= 2 ? "bg-emerald-600" : "bg-zinc-200"}`}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-2xl font-bold text-zinc-900 mb-6">
              Work Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-zinc-700">
                  Service Required *
                </label>
                <select
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all
                    ${isClicked && !formData.service ? "border-red-300 bg-red-50" : "border-zinc-200"}`}
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Deep Cleaning">Deep Cleaning</option>
                  <option value="Fumigation">Fumigation</option>
                  <option value="Both Cleaning and Fumigation">
                    Both Cleaning and Fumigation
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-700">
                  State *
                </label>
                <select
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all
                    ${isClicked && !formData.state ? "border-red-300 bg-red-50" : "border-zinc-200"}`}
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  required
                >
                  <option value="">Select your state</option>
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Location is now compulsory */}
              <div>
                <label className="text-sm font-semibold text-zinc-700">
                  Location / Address *
                </label>
                <input
                  type="text"
                  placeholder="e.g., No 2 Monatan, Iwo Road, Ibadan"
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all
                    ${isClicked && !formData.location ? "border-red-300 bg-red-50" : "border-zinc-200"}`}
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>

              {/* 5. New Optional Field: How did you hear about us? */}
              <div>
                <label className="text-sm font-semibold text-zinc-700">
                  How did you hear about us? (Optional)
                </label>
                <select
                  className="w-full p-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={formData.hearAbout}
                  onChange={(e) =>
                    setFormData({ ...formData, hearAbout: e.target.value })
                  }
                >
                  <option value="">Select an option</option>
                  <option value="twitter">Twitter</option>
                  <option value="ai_chat">AI Chat</option>
                  <option value="referral">Referral</option>
                  <option value="google">Google</option>
                  <option value="other_social_media">Other Social Media</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full mt-8 py-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-2xl font-bold text-zinc-900 mb-6">
              Personal Details
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full p-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email Address *"
                className="w-full p-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <input
                type="tel"
                placeholder="Phone Number *"
                className="w-full p-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-emerald-500"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-4 text-zinc-500 font-bold hover:text-zinc-700 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Book on WhatsApp"}{" "}
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}