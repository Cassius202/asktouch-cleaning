// components/ContactSection.tsx
import Link from 'next/link'
import Image from 'next/image'
import { assets } from '@/constants/assets'
import {askTouchData} from '@/constants/data'
import NewsletterForm from './Newsletter'

const ContactSection = () => {
  return (
    <section className="bg-white py-20 lg:py-32 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Business Info - HIDDEN ON MOBILE/TABLET, VISIBLE ON LG+ */}
          <div className="hidden lg:block space-y-8">
            <div>
              <Image 
                src={assets.logo} 
                alt={askTouchData.brand.name}
                width={200}
                height={80}
                className="h-16 w-auto mb-6"
              />
              <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
                Keep Your Space <br />
                <span className="text-emerald-600">Clean & Pest-Free</span>
              </h2>
              <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                {askTouchData.brand.slogan}. We serve residential and commercial clients 
                across {askTouchData.contact.locations.join(' and ')}.
              </p>
              
              <div className="space-y-3 text-zinc-700">
                {["Professional team", "Eco-friendly products", "Same-day service", "100% satisfaction"].map((text, i) => (
                  <p key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{text}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl">
                Contact Us
              </Link>
              <Link href="/work" className="inline-flex items-center justify-center bg-zinc-100 text-zinc-900 font-semibold px-6 py-3 rounded-xl border border-zinc-200">
                See Our Work
              </Link>
            </div>

            <div className="pt-6 border-t border-zinc-200">
              <p className="text-sm text-zinc-500 mb-2">Questions? Call us:</p>
              <div className="flex flex-wrap gap-4">
                {askTouchData.contact.phone_numbers.map((phone, index) => (
                  <a key={index} href={`tel:+234${phone.slice(1)}`} className="text-lg font-semibold text-emerald-600">
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Newsletter (Always Visible) */}
          <div>
            <NewsletterForm />
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactSection