"use client";

import { cn } from "@/utils/cn";
import { useChatStore } from "@/stores/chatStore";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useSessionStorage from "@/hooks/useSessionStorage";

const Form = () => {
  const { booking } = useChatStore();

  // Pre-fill form with chatStore data
  const [formData, setFormData] = useSessionStorage("formData", {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Populate form when booking data is available
  useEffect(() => {
    if (booking.name) {
      const nameParts = booking.name.split(" ");
      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
      }));
    }

    if (booking.email) {
      setFormData((prev) => ({ ...prev, email: booking.email || "" }));
    }

    if (booking.phone) {
      setFormData((prev) => ({ ...prev, phone: booking.phone || "" }));
    }

    if (booking.location) {
      setFormData((prev) => ({ ...prev, location: booking.location || "" }));
    }

    if (booking.location && booking.service) {
      const serviceMap = {
        cleaning: "cleaning",
        fumigation: "fumigation",
        both: "both cleaning and fumigation",
      };
      const serviceText =
        serviceMap[booking.service as keyof typeof serviceMap] || "cleaning";
      setFormData((prev) => ({
        ...prev,
        message: `I need ${serviceText} for my space in ${booking.location}. Please contact me.`,
      }));
    }
  }, [booking]);

  const inputStyles =
    "w-full bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-zinc-400 text-zinc-900";
  const labelStyles = "block text-sm font-medium text-zinc-700 mb-1.5";

  // Prepare data for API (without country code)
  const getSubmissionData = () => {
    return {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      message: formData.message,
    };
  };

  const handleContact = async () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone
    if (!formData.phone || formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate name
    if (!formData.firstName) {
      toast.error("Please enter your name");
      return;
    }

    // Validate location
    if (!formData.location) {
      toast.error("Please enter your location");
      return;
    }

    const submissionData = getSubmissionData();

    setIsLoading(true);

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      const data = await result.json();
      if (!result.ok || !data.success) {
        throw new Error(
          data.error || "Something went wrong. Please try again later.",
        );
      }
      toast.success("Message sent successfully! We will get back to you soon.");

      // Clear form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again later.");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleContact();
      }}
    >
      {/* Name Row - Reduced gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelStyles}>First name</label>
          <input
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className={inputStyles}
            required
          />
        </div>
        <div>
          <label className={labelStyles}>Last name</label>
          <input
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className={inputStyles}
            required
          />
        </div>
      </div>

      {/* Two columns for Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelStyles}>Email</label>
          <input
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={inputStyles}
            required
          />
        </div>
        <div>
          <label className={labelStyles}>Phone</label>
          <input
            type="tel"
            placeholder="08012345678"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className={inputStyles}
            required
          />
        </div>
      </div>

      {/* Location - Full width but compact */}
      <div>
        <label className={labelStyles}>Location</label>
        <input
          type="text"
          placeholder="No 23 Monatan, Iwo Road, Ibadan"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className={inputStyles}
          required
        />
      </div>

      {/* Message - Reduced rows */}
      <div>
        <label className={labelStyles}>How can we help?</label>
        <textarea
          rows={2}
          placeholder="Tell us about your space (e.g. 3-bedroom flat in Ibadan)..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className={cn(inputStyles, "resize-none")}
          required
        />
      </div>

      {/* Submit Button - Reduced padding */}
      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow-sm transition-all active:scale-[0.98]"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default Form;
