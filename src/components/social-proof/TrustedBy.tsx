import { companyLogos } from "@/constants/consts";
import Image from "next/image";

export default function TrustedBy() {
  return (
    <section className="py-16 bg-white w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-zinc-400 mb-10">
          Trusted by top institutions & companies
        </p>

        <div className="relative flex w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-50px),transparent_100%)]">
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] cursor-pointer">
            {[...companyLogos, ...companyLogos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center justify-center mx-8 w-32 h-16 md:w-40 md:h-20
                           grayscale-50 opacity-70 hover:grayscale-0 hover:opacity-100
                           transition-all duration-500"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={140}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}