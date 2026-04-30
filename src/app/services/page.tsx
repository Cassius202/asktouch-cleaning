import Image from "next/image";
import Link from "next/link";
import { SubTitle, Title } from "@/templates/Headings";
import { GridTexture } from "@/utils/GridTexture";
import { ArrowRight, ShieldCheck, Sparkles, Bug, Calendar, Star } from "lucide-react";

export default function GeneralServices() {
  return (
    <div className='min-h-screen bg-emerald-800 relative overflow-hidden'>
      <GridTexture size={3} />
      
      <ServiceHero />
      
      <div className="relative z-10 bg-white rounded-t-[3rem] md:rounded-t-[5rem] -mt-10">
        <div className="global-padding py-24 flex flex-col gap-16 items-center">
          
          {/* Brand Philosophy Section */}
          <div className="w-full max-w-4xl text-center md:text-left">
            <Title text="Excellence in Every Corner" mode="light" />
            <SubTitle 
              text="At AskTouch, we don't just clean; we restore. From residential sanctuaries to corporate hubs, our mission is to deliver health, hygiene, and peace of mind through professional care." 
              mode="light" 
            />
          </div>

          {/* Service Bento Grid inspired by image_f2699b.png */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
            
            {/* Service 1: Deep Cleaning */}
            <Link 
              href="/services/deep-cleaning" 
              className="md:col-span-8 group relative h-[400px] rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80"
                alt="Deep Cleaning"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Premium Care</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Residential & Office Deep Cleaning</h3>
                <p className="text-emerald-50/70 max-w-md mb-6 text-sm">Eliminate hidden grime and allergens with our industrial-grade sanitation processes.</p>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-4 transition-all">
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Service 2: Pest Control */}
            <Link 
              href="/services/pest-control" 
              className="md:col-span-4 group bg-emerald-50 rounded-[2.5rem] p-8 flex flex-col justify-between border border-emerald-100 hover:bg-emerald-100 transition-colors duration-300"
            >
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Bug className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-950 mb-3">Pest Control & Fumigation</h3>
                <p className="text-emerald-800/60 text-sm leading-relaxed">Safety-first extermination for rodents, insects, and termites using EPA-approved methods.</p>
              </div>
              <div className="flex items-center justify-between mt-8">
                <span className="text-emerald-700 font-bold">Learn More</span>
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Service 3: Healthy Spaces */}
            <Link 
              href="/services/healthy-spaces" 
              className="md:col-span-12 group relative h-[300px] rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image 
                src="https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=1400&auto=format&fit=crop&q=80"
                alt="Healthy Spaces"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Routine Healthy Spaces Care</h3>
                <p className="text-white/80 max-w-lg text-sm">Scheduled maintenance to keep your environment consistently sanitized and pest-free.</p>
              </div>
            </Link>

          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            {/* Book Now Button */}
            <Link 
              href="/book" 
              className="group px-12 py-4 bg-zinc-950 hover:bg-zinc-900 text-white rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* See Our Reviews Button */}
            <Link 
              href="/reviews" 
              className="group px-12 py-4 bg-white border-2 border-zinc-600 text-zinc-700 hover:bg-emerald-50 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-3"
            >
              <span>See Our Reviews</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

function ServiceHero() {
  return (
    <section className="relative w-screen h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="bg-zinc-950 absolute inset-0 z-0">
        <Image 
          unoptimized 
          alt='service hero' 
          fill 
          src="https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?w=1400&auto=format&fit=crop&q=80" 
          className="opacity-50 object-cover" 
        />
      </div>
      <div className="relative z-10 text-center space-y-6 global-padding">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-[0.3em]">
          <Sparkles className="w-4 h-4" />
          AskTouch Solutions
        </div>
        <h1 className="text-5xl md:text-7xl font-serif italic  text-white tracking-tighter">
          Our Professional <span className="text-emerald-400">Services</span>
        </h1>
        <p className="text-gray-200 max-w-xl mx-auto text-lg">
          Expert cleaning and pest management tailored for Lagos homes and businesses.
        </p>
      </div>
    </section>
  );
}