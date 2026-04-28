import ContactForm from "./ContactForm";
import HeroBackground from "./HeroBackground";
import { MessageCircle, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-svh relative overflow-hidden bg-zinc-950 flex flex-col items-center justify-center">
      <div className="absolute inset-0">
        <HeroBackground />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 md:px-8 lg:px-12 mt-auto pb-12 md:pb-16 lg:pb-20 pt-18">
        <div className="flex flex-col md:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="text-content flex-1">
            <div className="eyebrow flex w-fit items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs md:text-sm text-emerald-300 font-medium max-md:mx-auto mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Quality Services
            </div>

            <h1 className="text-white font-bold text-4xl max-sm:text-5xl max-sm:text-center md:text-5xl lg:text-6xl leading-tight mb-4 md:mb-6">
              Professional <span className="text-emerald-400">Cleaning</span> &{" "}
              <br />
              Fumigation Services
            </h1>

            <p className="text-gray-300  text-lg lg:text-xl max-w-2xl leading-relaxed mb-8 max-md:mx-auto max-md:text-center">
              Creating healthy, pest-free spaces for homes and offices.
              Reliable, hygienic, and consistent solutions tailored for you.
            </p>

            {/* CTA Buttons - Only on Mobile/Tablet */}
            <div className="flex flex-col sm:flex-row gap-3 max-sm:mb-10 sm:gap-4">
              <a
                href="https://wa.me/2349034027582"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat Us Now</span>
              </a>

              <a
                href="tel:+2349034027582"
                className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all border border-white/20 active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
              </a>
            </div>
          </div>

          {/* Contact Form - Hidden on Mobile/Tablet */}
          <div className="flex-shrink-0 w-full md:w-auto hidden md:block">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
