import Link from "next/link";
import HeroBackground from "./HeroBackground";
import { Calendar, Phone, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-svh relative overflow-hidden bg-zinc-950 flex flex-col items-center justify-center">
      <div className="absolute inset-0">
        <HeroBackground />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 mt-auto pb-12 md:pb-16 lg:pb-20 pt-20 sm:pt-24 md:pt-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="text-content flex-1 w-full">
            {/* Eyebrow - Centered on mobile/tablet, left on desktop */}
            <div className="lg:hidden flex justify-center mb-6">
              <div className="flex w-fit items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs sm:text-sm text-emerald-300 font-medium">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Quality Services
              </div>
            </div>
            
            <div className="hidden lg:flex w-fit items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-300 font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Quality Services
            </div>

            {/* Heading - Centered on mobile/tablet, left on desktop */}
            <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-[4.1rem] leading-tight mb-4 md:mb-6 text-center lg:text-left">
              Professional <span className="text-emerald-400">Cleaning</span> &{" "}
              <br className="hidden sm:block" />
              Fumigation Services
            </h1>

            {/* Description - Centered on mobile/tablet, left on desktop */}
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mb-8 text-center lg:text-left mx-auto lg:mx-0">
              Creating healthy, pest-free spaces for homes and offices.
              Reliable, hygienic, and consistent solutions tailored for you.
            </p>

            {/* CTA Buttons - Always visible, centered on mobile/tablet, left on desktop */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-10 lg:mb-0">
              <a
                href="tel:+2349034027582"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] w-full sm:w-auto"
              >
                <Phone className="w-5 h-5" />
                <span>Call Us</span>
              </a>

              <Link
                href="/book-now"
                className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all border border-white/20 active:scale-[0.98] w-full sm:w-auto"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
              </Link>
            </div>
          </div>

          {/* Contact Form - Visible only on desktop (lg and above) */}
          <div className="hidden lg:block flex-shrink-0 w-full lg:w-auto">
            <div className="flex flex-col gap-6 pb-4">
              {[
                {
                  title: "Verified Professionals",
                  desc: "Background-checked and trained staff.",
                },
                {
                  title: "Eco-Friendly Chemicals",
                  desc: "Safe for kids, pets, and the environment.",
                },
                {
                  title: "Same-Day Service",
                  desc: "Rapid response for urgent cleaning needs.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm group hover:bg-white/[0.05] transition-all"
                >
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-zinc-400 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="mt-4 px-5">
                <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold text-center lg:text-left">
                  Trusted by 500+ Clients
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Feature Cards - Visible only on mobile/tablet */}
        <div className="lg:hidden mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: "Verified Professionals",
              desc: "Background-checked and trained staff.",
            },
            {
              title: "Eco-Friendly Chemicals",
              desc: "Safe for kids, pets, and the environment.",
            },
            {
              title: "Same-Day Service",
              desc: "Rapid response for urgent cleaning needs.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm group hover:bg-white/[0.05] transition-all"
            >
              <div className="mt-0.5 shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">
                  {item.title}
                </h4>
                <p className="text-zinc-400 text-xs mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badge for mobile/tablet */}
        <div className="lg:hidden mt-6 text-center">
          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold">
            Trusted by 500+ Clients
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;