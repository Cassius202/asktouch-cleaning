'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { FadeInView } from '@/motion/FadeInView'
import { CheckCircle, ShieldCheck, Zap, Star } from 'lucide-react'
import Link from 'next/link'

const Stats = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section ref={ref} className='global-padding py-24 bg-white min-h-screen'>
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 items-start">
          <FadeInView>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              The numbers that matter to <br /> people who value excellence
            </h2>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-gray-500 text-lg md:text-xl lg:pt-4">
              Ask Touch clients are serious about their spaces. They’ve built beautiful homes and offices, and they want them preserved. These are the results we deliver every single day across Nigeria.
            </p>
          </FadeInView>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Main Testimonial Card */}
          <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 bg-[#EEF2FF] rounded-[2.5rem] p-5 flex flex-col justify-between">
            <p className="text-xl xl:text-2xl font-medium text-gray-900 leading-relaxed italic">
             {` "For the first time, I don't have to worry about pests or hidden dirt. Ask Touch made my office environment actually breathable."`}
            </p>
            <div className="mt-12">
              <p className="font-bold text-gray-900">Cassius Samuel</p>
              <p className="text-gray-500 text-sm">Founder, Cassius Solutions</p>
            </div>
          </div>

          {/* Satisfied Clients Stat */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-bold text-gray-900">
                {inView && <CountUp end={500} suffix="+" duration={2.5} />}
              </span>
              <div className="bg-emerald-100 p-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="mt-8">
              <p className="font-bold text-gray-900">Satisfied Clients</p>
              <p className="text-gray-500 text-sm">Consistent growth across Ibadan and Lagos.</p>
            </div>
          </div>

          {/* 100% Transparency */}
          <div className="bg-[#F8FAFC] rounded-[2.5rem] p-8 flex flex-col justify-center">
             <span className="text-6xl font-bold text-gray-900 mb-4">100%</span>
             <p className="font-bold text-gray-900 mb-2">Non-Toxic Chemicals</p>
             <p className="text-gray-500 text-sm">Every solution we use is safe for children, pets, and the environment.</p>
          </div>

          {/* Rating Card */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="flex gap-1 mb-4">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
               ))}
            </div>
            <span className="text-4xl font-bold text-gray-900">4.9/5.0</span>
            <p className="text-gray-500 text-sm mt-2">Average client satisfaction rating.</p>
          </div>

          {/* Years of Experience / Pest Free */}
          <div className="md:col-span-2 bg-[#F1F5F9] rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="text-center md:text-left">
              <span className="text-7xl font-bold text-gray-900">
                {inView && <CountUp end={5} decimals={1} duration={3} />}
              </span>
              <p className="text-xl font-bold text-gray-900 mt-2">Years of Guaranteed Protection</p>
              <p className="text-gray-500 text-sm max-w-xs mt-2">Average time our clients remain pest-free after a full deep-fumigation cycle.</p>
            </div>
            {/* Visual element (Simple SVG or Icon) */}
            <div className="flex-grow flex justify-center">
               <ShieldCheck className="w-32 h-32 text-emerald-600 opacity-20" />
            </div>
          </div>

          {/* CTA / Quick Fact */}
          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between group cursor-pointer hover:bg-emerald-700 transition-colors">
            <Zap className="w-8 h-8 fill-emerald-300 text-emerald-300" />
            <div>
              <p className="text-2xl font-bold leading-tight">Ready for a cleaner space?</p>
              <p className="text-emerald-100 text-xs mt-2">Book your session today.</p>
            </div>
          </div>

        </div>

        {/* Bottom CTA Section - Added */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-gray-700 font-medium text-lg">Worked with us before?</p>
            <div className="flex gap-3">
              <Link
                href="/review-form"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Leave us a review
              </Link>
              <Link
                href="/reviews"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold px-6 py-2.5 rounded-xl transition-all duration-300"
              >
                See all reviews
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Stats