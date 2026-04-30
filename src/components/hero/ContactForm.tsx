'use client'

import { useState } from 'react'
import toast from 'react-hot-toast';
import { User, Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Ibadan',
    service: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Message sent! We will call you back.');
  };

  return (
    <div className='max-w-sm max-md:mx-auto lg:ml-auto relative group'>
      {/* Decorative background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-700"></div>
      
      {/* Glass card */}
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Get a Free Quote</h2>
          </div>
          <p className="text-gray-300 text-xs">Professional cleaning & fumigation at your doorstep.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="text" 
              placeholder="Full Name" 
              className="w-full pl-10 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/15 transition-all text-white placeholder:text-gray-400 text-sm"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2  -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-10 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/15 transition-all text-white placeholder:text-gray-400 text-sm"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="tel" 
              placeholder="Phone Number" 
              className="w-full pl-10 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/15 transition-all text-white placeholder:text-gray-400 text-sm"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {/* Location / Service Toggle */}
          <div className="grid grid-cols-2 gap-2">
             <div className="relative">
               <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
               <select 
                className="w-full pl-9 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs text-white appearance-none cursor-pointer"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
               >
                 <option value="Ibadan" className="bg-zinc-900">Ibadan</option>
                 <option value="Lagos" className="bg-zinc-900">Lagos</option>
                 <option value="Nationwide" className="bg-zinc-900">Nationwide</option>
               </select>
             </div>
             <select 
                required
                className="w-full px-3 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs text-white appearance-none cursor-pointer"
                onChange={(e) => setFormData({...formData, service: e.target.value})}
             >
               <option value="" className="bg-zinc-900">Service</option>
               <option value="Cleaning" className="bg-zinc-900">Cleaning</option>
               <option value="Fumigation" className="bg-zinc-900">Fumigation</option>
               <option value="Both" className="bg-zinc-900">Both</option>
             </select>
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] mt-2"
          >
            <span className="text-sm">Send Request</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-4 border-t border-white/10 pt-4">
            <div className="text-center">
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">Call Us</p>
                <p className="text-xs font-semibold text-white">09034027582</p>
            </div>
            <div className="h-6 w-[1px] bg-white/20"></div>
            <div className="text-center">
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">Active Hours</p>
                <p className="text-xs font-semibold text-white">9am - 8pm</p>
            </div>
        </div>
      </div>
    </div>
  )
}