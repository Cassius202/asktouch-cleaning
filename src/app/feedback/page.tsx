'use client';

import { useState } from 'react';
import { Star, Send, User, Mail, MessageCircle, ThumbsUp, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { cn } from "@/utils/cn";

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    review: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', rating: 0, review: '' });
      setHoveredRating(0);
      toast.success('Thank you! Your feedback has been received.');
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-zinc-50 relative overflow-hidden flex flex-col">
      
      {/* Back Button */}
      <div className="relative z-20 p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-600 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <main className="relative z-10 flex-grow flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-2xl">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-2">
               <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Private Feedback</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
              How can we <span className="text-emerald-600">improve?</span>
            </h1>
            <p className="text-zinc-500 max-w-md mx-auto">
              Your honest feedback helps us maintain the AskTouch standard of excellence.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
              
              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-3 h-3 text-emerald-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-3 h-3 text-emerald-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Review */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-2">
                  <MessageCircle className="w-3 h-3 text-emerald-500" />
                  Your Experience
                </label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-zinc-400"
                  placeholder="What could we have done better? Was there an issue with the timing, staff, or quality?"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || formData.rating === 0}
                className="group w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Private Feedback</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <footer className="mt-12 text-center">
            <p className="text-[10px] text-zinc-400 uppercase tracking-[0.4em] font-medium">
              AskTouch Concierge • Feedback Department
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}