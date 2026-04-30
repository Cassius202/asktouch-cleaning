import { mapLocation } from "@/constants/info";
import { MapPin, Navigation } from "lucide-react";
import { FadeInView } from "@/motion/FadeInView";
import Link from "next/link";
import { DirectionButton } from "./DirectionBtn";

export const Location = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Map Section - Left side per image */}
        <FadeInView className="w-full aspect-square sm:aspect-video lg:aspect-square relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10 border border-zinc-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2654675688495!2d3.888326699999994!3d7.435849999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039f34b6928bb57%3A0xd2b1b6d67b165398!2sBasketball%20court%2C%20University%20Of%20Ibadan!5e0!3m2!1sen!2sng!4v1777449448017!5m2!1sen!2sng"
            className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-[1.1]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </FadeInView>

        {/* Info Section - Right side per image */}
        <FadeInView className="space-y-8">
          <div className="space-y-4">
            <div className="text-emerald-600 font-semibold px-4 py-1.5 bg-emerald-50 rounded-full text-sm w-max">
              Our location
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              Find our headquarters
            </h2>
            <p className="text-lg text-zinc-600 max-w-md leading-relaxed">
              Where hygiene meets excellence. Visit us at our Ibadan
              headquarters or connect with us online for premium cleaning and
              fumigation services.
            </p>
          </div>

          <div className="flex items-start gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-100 group transition-colors hover:bg-emerald-50/50">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-zinc-900 font-bold text-lg mb-1">
                Ask Touch HQ
              </p>
              <address className="text-zinc-600 not-italic leading-relaxed">
                {mapLocation} <br />
                Ibadan, Oyo State, Nigeria
              </address>
            </div>
          </div>

          {/* CTA Buttons Block */}
          <div className="flex flex-wrap gap-4 pt-2">
            <DirectionButton />

            <Link href='/book-now' className="btn inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-900/10 active:scale-[0.98]">
              Book now
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
