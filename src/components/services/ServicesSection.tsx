import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: '01',
    label: 'Residential & Office Cleaning',
    href: '/services/residential-and-office-cleaning',
    // High-quality modern office/home hybrid image
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800&fm=webp',
    color: 'bg-purple-50',
  },
  {
    id: '02',
    label: 'Pest Control & Fumigation',
    href: '/services/pest-control-and-fumigation',
    // Professional in protective gear (Industrial feel)
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&q=80&w=800&fm=webp',
    color: 'bg-pink-50',
  },
  {
    id: '03',
    label: 'Healthy & Pest-Free Spaces',
    href: '/services/healthy-and-pest-free-spaces',
    // Clean, airy, healthy living room environment
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800&fm=webp',
    color: 'bg-cyan-50',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-500 text-lg">
              We deliver spotless spaces with care, precision, and a touch of sparkle for your home and workplace.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link 
              key={service.id} 
              href={service.href}
              className={`${service.color} group relative rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl flex flex-col`}
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized // Bypasses Vercel image optimization limits
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-gray-400 font-medium mb-4 italic">
                  {service.id}/
                </span>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                  {service.label}
                </h3>
              </div>
            </Link>
          ))}

          {/* Explore More Card */}
          <Link 
            href="/services"
            className="bg-[#F2FF94] rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group hover:brightness-95 transition-all"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 max-w-[160px]">
              20+ Services You Can Explore
            </h3>
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-45">
              <ArrowUpRight className="w-7 h-7" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;