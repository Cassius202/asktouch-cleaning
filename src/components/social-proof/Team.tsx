import { FadeInView } from "@/motion/FadeInView";
import Image from "next/image";
import { Star, ShieldCheck} from "lucide-react";
import { team } from "@/constants/data";

export const MeetTheTeam = () => {
  return (
    <section className="bg-[#FAF9F6] py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <FadeInView>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-600 text-sm mb-6">
            
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            Meet the People Who Take <br />
            Care <span className="italic font-serif font-medium text-zinc-800">of Your Space</span>
          </h2>
          <p className="max-w-3xl mx-auto text-zinc-500 leading-relaxed">
            {`Behind every reliable service is a team that truly cares. Our professionals aren't just "cleaners" — 
            they're trained specialists who follow clear standards, respect your space, and take pride in doing things right.`}
          </p>
        </FadeInView>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, idx) => (
          <FadeInView key={idx} delay={idx * 0.1} className="relative group">
            {/* Image Container */}
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden mb-6 shadow-sm">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Floating Status Card (Inspired by member 2 in your image) */}
              {member.featured && (
                <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-xl z-20 animate-in fade-in slide-in-from-bottom-2">
                   <div className="flex gap-2 mb-2">
                      <div className="p-1.5 bg-emerald-50 rounded-lg"><Star className="w-4 h-4 text-emerald-600 fill-emerald-600" /></div>
                      <div className="p-1.5 bg-zinc-50 rounded-lg"><ShieldCheck className="w-4 h-4 text-zinc-400" /></div>
                   </div>
                   <p className="text-zinc-900 font-bold text-sm leading-none">{member.name}</p>
                   <p className="text-zinc-500 text-xs mt-1">{member.role}</p>
                </div>
              )}
            </div>

            {/* Default Label (Bottom text) */}
            {!member.featured && (
              <div className="text-center">
                <h4 className="text-zinc-900 font-bold text-lg leading-tight">{member.name}</h4>
                <p className="text-zinc-500 text-sm mt-1">{member.role}</p>
              </div>
            )}
          </FadeInView>
        ))}
      </div>
    </section>
  );
};