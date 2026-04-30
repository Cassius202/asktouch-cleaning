import { Title, SubTitle } from "@/templates/Headings";
import { FadeInView } from "@/motion/FadeInView";
import Image from "next/image";
import {
  Phone,
  MapPin,
  CheckCircle,
  Sparkles,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";
import {askTouchData} from "@/constants/data";
import { cleaningServiceData } from "@/constants/info";

const ownerImage =
  "https://i.pinimg.com/736x/82/df/d2/82dfd26b7a4fcb713c87c4958b8b8d48.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInView>
            <div className="text-center mb-12">
              <div className="text-emerald-600 mb-2">
                <SubTitle text="About Us" mode="light" />
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                <Title text={askTouchData.brand.name} />
              </div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {cleaningServiceData.tagline}
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Story Section with Owner Image */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInView delay={0.2}>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={ownerImage}
                  alt="Ask Touch Owner"
                  fill
                  className="object-cover object-[center_0%]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>
            </FadeInView>

            <FadeInView delay={0.4}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Your Trusted Cleaning Partner
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  At{" "}
                  <span className="font-semibold text-emerald-600">
                    {askTouchData.brand.name}
                  </span>
                  , we understand that a clean environment is essential for
                  health, productivity, and peace of mind. With years of
                  experience serving homes and businesses across{" "}
                  {askTouchData.contact.locations.join(" and ")}, we&apos;ve
                  built our reputation on reliability, professionalism, and
                  exceptional results.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our team of trained professionals uses eco-friendly products
                  and proven techniques to deliver thorough cleaning and
                  effective pest control solutions. We don&apos;t just clean—we
                  create healthier, safer spaces for you to live and work.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Trusted Service
                      </h4>
                      <p className="text-sm text-slate-600">
                        100% satisfaction guaranteed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Flexible Hours
                      </h4>
                      <p className="text-sm text-slate-600">
                        We work around your schedule
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <div className="text-center mb-12">
              <div className="text-emerald-600 mb-2">
                <SubTitle text="Our commitment" mode="light" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                <Title text={cleaningServiceData.headline} mode="light" />
              </div>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleaningServiceData.whyChooseUs.map((reason, index) => (
              <FadeInView key={index} delay={0.1 * index}>
                <div className="bg-linear-to-br from-emerald-50 to-white p-6 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <p className="text-slate-700 font-medium">{reason}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <div className="text-center mb-12">
              <div className="text-emerald-600 mb-2">
                <SubTitle text="What we offer" mode="light" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                <Title text="Comprehensive Cleaning Solutions" mode="light" />
              </div>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-4 gap-6">
            {cleaningServiceData.services.highlights.map((highlight, index) => (
              <FadeInView key={index} delay={0.1 * index}>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:border-emerald-300 hover:shadow-md transition-all duration-300">
                  <Sparkles className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-900">{highlight}</h3>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-linear-to-br from-emerald-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeInView>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {askTouchData.cta}
            </h2>
            <p className="text-xl text-emerald-50 mb-10">
              Experience the difference of professional cleaning services. Call
              us today for a free consultation!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`tel:${askTouchData.contact.phone_numbers[0]}`}
                className="bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {askTouchData.contact.phone_numbers[0]}
              </Link>
              <Link
                href={`https://wa.me/${askTouchData.contact.whatsapp_primary}`}
                className="bg-emerald-800 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-900 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                WhatsApp Us
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-emerald-50">
              <MapPin className="w-5 h-5" />
              <span>Serving {askTouchData.contact.locations.join(" & ")}</span>
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
