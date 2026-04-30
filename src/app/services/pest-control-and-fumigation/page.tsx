import { SubTitle, Title } from "@/templates/Headings";
import { GridTexture } from "@/utils/GridTexture";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Bug, MousePointer2, Microscope } from "lucide-react";

export default function PestControlPage() {
  return (
    <div className="min-h-svh w-screen bg-emerald-800">
      <GridTexture size={3} />
      
      <div className="global-padding py-24 bg-white min-h-screen rounded-t-[3rem] md:rounded-t-[5rem]">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto">
          <Title text="Pest Control & Fumigation" mode="light" />
          <SubTitle
            text="Advanced extermination and prevention services. We protect your property from rodents, crawling insects, and wood-boring pests."
            mode="light"
          />
        </div>

        {/* Pest Control Grid - Inspired by your reference style */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Visual: Extermination in Action */}
          <div className="md:col-span-8 relative h-[450px] rounded-3xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2030&auto=format&fit=crop"
              alt="Professional Fumigation"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Targeted Treatment
              </span>
            </div>
          </div>

          {/* Side Card: Pest Types */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 bg-emerald-950 text-white rounded-3xl p-8 flex flex-col justify-center border border-emerald-900">
              <Microscope className="w-8 h-8 text-emerald-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-emerald-50">Precision Spraying</h3>
              <p className="text-emerald-200/70 text-sm leading-relaxed">
                Using specialized nozzles to reach crevices where bugs hide, ensuring a 100% knockdown rate.
              </p>
            </div>
            
            <div className="flex-1 bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Common Targets</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-600 font-medium text-sm">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  Rodents & Rats
                </li>
                <li className="flex items-center gap-3 text-gray-600 font-medium text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  Cockroaches & Ants
                </li>
                <li className="flex items-center gap-3 text-gray-600 font-medium text-sm">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  Bed Bugs & Termites
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
            <ShieldAlert className="w-10 h-10 text-red-600 mb-6" />
            <h4 className="text-lg font-bold text-gray-900 mb-2">Pre-Treatment Audit</h4>
            <p className="text-gray-500 text-sm">We identify nesting sites and entry points before applying any chemicals.</p>
          </div>
          
          <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
            <Bug className="w-10 h-10 text-emerald-600 mb-6" />
            <h4 className="text-lg font-bold text-gray-900 mb-2">Safe-Spray Protocols</h4>
            <p className="text-gray-500 text-sm">EPA-approved, low-toxicity formulas that are safe for your family and pets.</p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
            <MousePointer2 className="w-10 h-10 text-gray-900 mb-6" />
            <h4 className="text-lg font-bold text-gray-900 mb-2">Barrier Protection</h4>
            <p className="text-gray-500 text-sm">Setting up residual chemical boundaries to prevent future infestations.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-emerald-50 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-emerald-100">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950">
              Don&apos;t wait for the infestation to spread.
            </h2>
            <p className="text-emerald-800/70 text-lg">
              Our technicians are ready to secure your space within 24 hours of booking.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/book"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-10 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>Schedule Inspection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
      
    </div>
  );
}