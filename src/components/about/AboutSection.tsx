import Image from 'next/image';
import { CheckCircle2, Users } from 'lucide-react';
import Link from 'next/link';

// Optimized Unsplash image: Professional, clean, and trustworthy
const aboutImage = 'https://nsqgfrsugkvsftnffeno.supabase.co/storage/v1/object/public/images/man-fumigating.jpg';

const AboutSection = () => {
  const highlights = [
    "Professional & Trusted Team",
    "Eco-Friendly Cleaning Products",
    "Fumigation & Pest Specialist",
    "Satisfaction Guaranteed"
  ];

  return (
    <section className="py-15 bg-emerald-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Column */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
              <Users className="w-4 h-4 text-sky-600" />
              <span className="text-gray-600 text-xs font-bold uppercase tracking-wider">
                About Ask Touch
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Bringing Freshness, Comfort, and Care to Every Space
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                At <span className="font-bold text-sky-600">Ask Touch</span>, we go beyond surface cleaning—we bring life back to your home and office. From the heart of Ibadan to the streets of Lagos, our dedicated team combines expert care, eco-friendly solutions, and industry-leading fumigation techniques to ensure every space feels fresh and pest-free.
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-sky-500 shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/about"
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-sky-600/20 active:scale-[0.98]"
            >
              Learn More
            </Link>
          </div>

          {/* Image Column */}
          <div className="relative order-1 lg:order-2">
            <div className="relative lg:h-[500px] w-full rounded-[1rem] overflow-hidden shadow-2xl max-lg:aspect-video max-lg:w-full max-lg:hidden">
              <Image 
                src={aboutImage}
                alt="Ask Touch Professional Cleaning Team in Ibadan and Lagos"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            
            {/* Subtle decorative element behind image */}
            <div className="absolute -z-10 -top-6 -right-6 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-60" />
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;