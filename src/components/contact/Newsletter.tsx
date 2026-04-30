// components/NewsletterForm.tsx
'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { FaInstagram, FaLinkedin, FaTiktok, FaXTwitter } from 'react-icons/fa6'
import {askTouchData} from '@/constants/data'
import toast from 'react-hot-toast'
import { handleNewsletterSending } from '@/app/actions/handleNewsletterSending'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail('')
      toast.success('Thank you for subscribing!')
    }, 200);

    //actual api call
    const res = await handleNewsletterSending({email});

    if (!res.success) {
      console.error('Newsletter API Error:', res.message);
      throw new Error(res.message);
    }

    console.log('Newsletter API Response:', res);
  }

  return (
    <div className="bg-linear-to-br from-emerald-50 to-emerald-100/50 rounded-3xl p-8 lg:p-12 border border-emerald-200">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-700 mb-4">
          <Mail className="w-4 h-4" />
          Newsletter
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
          Stay Updated with <br />
          Cleaning Tips & Offers
        </h3>
        <p className="text-zinc-600 leading-relaxed">
          Get expert cleaning advice, seasonal tips, and exclusive discounts 
          delivered straight to your inbox.
        </p>
      </div>

      {/* Newsletter Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col  gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-5 py-4 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-4 rounded-xl transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Social Links */}
      <div>
        <p className="text-sm font-medium text-zinc-700 mb-4">Follow us for updates:</p>
        <div className="flex gap-3">
          <SocialLink href={askTouchData.social.instagram} icon={<FaInstagram />} label="Instagram" />
          <SocialLink href={askTouchData.social.tiktok} icon={<FaTiktok />} label="TikTok" />
          <SocialLink href={askTouchData.social.linkedIn} icon={<FaLinkedin />} label="LinkedIn" />
          <SocialLink href={askTouchData.social.twitter} icon={<FaXTwitter />} label="Twitter" />
        </div>
      </div>
    </div>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 bg-white hover:bg-emerald-500 text-zinc-700 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm border border-zinc-200 hover:border-emerald-500"
      aria-label={label}
    >
      <span className="text-xl">{icon}</span>
    </a>
  )
}