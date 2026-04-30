import { SubTitle, Title } from "@/templates/Headings";
import { GridTexture } from "@/utils/GridTexture";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Home, Building2, Sparkles } from "lucide-react";

export default function DeepCleaningPage() {
  return (
    <div className="min-h-svh w-screen overflow-x-hidden bg-emerald-800">
      <div className="invert">
        <GridTexture size={4} />
      </div>
      
      <div className="global-padding py-24 bg-white min-h-screen">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto">
          <Title text="Residential & Office Deep Cleaning" mode="light" />
          <SubTitle
            text="Beyond the surface. We eliminate hidden grime and bacteria to create a truly pristine environment for living and working."
            mode="light"
          />
        </div>

        {/* Comparison Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Residential Section */}
          <div className="md:col-span-7 group">
            <div className="relative h-[350px] rounded-3xl overflow-hidden mb-6">
              <Image
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1974&auto=format&fit=crop"
                alt="Residential Deep Cleaning"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Home Sanctuary</span>
                </div>
                <h3 className="text-2xl font-bold">Residential Deep Clean</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
              {[
                "Kitchen degreasing & appliance detailing",
                "Bathroom sanitization & scale removal",
                "Upholstery & mattress steam cleaning",
                "Window tracks & baseboard scrubbing"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Office Section */}
          <div className="md:col-span-5 group">
             <div className="relative h-[350px] rounded-3xl overflow-hidden mb-6">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
                alt="Commercial Office Cleaning"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Corporate Excellence</span>
                </div>
                <h3 className="text-2xl font-bold">Office Deep Clean</h3>
              </div>
            </div>

            <div className="space-y-4 px-2">
               {[
                "High-touch point disinfection (IT & desks)",
                "Commercial carpet & floor restoration",
                "HVAC vent cleaning & air quality check",
                "After-hours flexible scheduling"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Mid-Page Stats Break */}
        <div className="mt-24 py-16 bg-emerald-50 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-around gap-12 text-center border border-emerald-100">
          <div className="space-y-2">
            <h4 className="text-4xl font-black text-emerald-900">99.9%</h4>
            <p className="text-emerald-700 font-medium uppercase tracking-tighter text-xs">Bacteria Eliminated</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-emerald-200" />
          <div className="space-y-2">
            <h4 className="text-4xl font-black text-emerald-900">100%</h4>
            <p className="text-emerald-700 font-medium uppercase tracking-tighter text-xs">Eco-Friendly Agents</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-emerald-200" />
          <div className="space-y-2">
            <h4 className="text-4xl font-black text-emerald-900">24/7</h4>
            <p className="text-emerald-700 font-medium uppercase tracking-tighter text-xs">Customer Support</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center max-w-2xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Ready for a Fresh Start
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Let us do the dirty work.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Whether it&apos;s your living room or your boardroom, we bring the same level of intensity and detail to every square inch.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-10 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>Book Your Deep Clean</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/pricing"
              className="w-full sm:w-auto border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold px-10 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <span>View Rates</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}