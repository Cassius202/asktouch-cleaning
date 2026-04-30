import { SubTitle, Title } from "@/templates/Headings";
import { GridTexture } from "@/utils/GridTexture";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";

export default function HealthySpacesPage() {
  return (
    <div className="min-h-svh w-screen bg-emerald-800">
      <GridTexture size={3} />
      
      <div className="global-padding py-24 bg-white min-h-screen rounded-t-[3rem] md:rounded-t-[5rem]">
        {/* Header Section */}
        <div className="max-w-4xl">
          <Title text="Healthy & Pest-Free Spaces" mode="light" />
          <SubTitle
            text="We provide routine Care for your home and office, ensuring every corner is sanitized and protected."
            mode="light"
          />
        </div>

        {/* Image Bento Grid Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[500px]">
          {/* Main Cleaning Image */}
          <div className="md:col-span-4 relative rounded-3xl overflow-hidden group">
            <Image
              src="https://nsqgfrsugkvsftnffeno.supabase.co/storage/v1/object/public/images/image-done.jpg"
              alt="Professional Cleaning"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </div>

          {/* Stats/Satisfaction Card */}
          <div className="md:col-span-3 bg-emerald-50 rounded-3xl p-8 flex flex-col justify-center items-center text-center border border-emerald-100">
            <p className="text-emerald-800 font-semibold uppercase tracking-widest text-xs mb-2">Trusted By</p>
            <h3 className="text-5xl font-bold text-emerald-950 mb-4">500+</h3>
            <p className="text-emerald-700/80 text-sm">Homes & offices kept sparkling clean in Lagos.</p>
            <div className="mt-6 flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-emerald-200" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">+</div>
            </div>
          </div>

          {/* Fumigation/Sanitization Image */}
          <div className="md:col-span-5 relative rounded-3xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2030&auto=format&fit=crop"
              alt="Pest Control and Fumigation"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-900 uppercase">Certified Safe</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Deep Cleaning</h4>
            <p className="text-gray-500 leading-relaxed">Removing hidden dust and allergens to create a truly breathable environment.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Pest Management</h4>
            <p className="text-gray-500 leading-relaxed">Eco-friendly fumigation techniques that keep pests out without harsh odors.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <Star className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Routine Maintenance</h4>
            <p className="text-gray-500 leading-relaxed">Scheduled care tailored to your specific office or home lifestyle needs.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Ready for a healthier space?</h3>
            <p className="text-gray-500">Book your first session today and experience the AskTouch difference.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/book"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all flex items-center gap-2 group"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/reviews"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-4 rounded-2xl transition-all flex items-center gap-2"
            >
              <Star className="w-4 h-4 fill-emerald-600" />
              <span>See Reviews</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}