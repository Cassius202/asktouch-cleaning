'use client'
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Plus, X, MessageCircle, Calendar } from "lucide-react"

const faqs = [
  {
    question: "How does ASK Touch differ from other cleaning services?",
    answer: "ASK Touch combines professional cleaning with comprehensive fumigation services. We use eco-friendly products, employ trained professionals, and offer flexible scheduling across Ibadan and nationwide. Our commitment to detail and customer satisfaction sets us apart."
  },
  {
    question: "How customizable are your cleaning services?",
    answer: "Our services are fully customizable to meet your specific needs. Whether you need residential cleaning, office maintenance, or specialized deep cleaning, we tailor our approach to your space, schedule, and budget. We offer one-time, weekly, or monthly packages."
  },
  {
    question: "What happens to my space if I cancel my booking?",
    answer: "We understand plans change. You can cancel or reschedule your booking up to 24 hours before the scheduled time without any penalty. For same-day cancellations, a small fee may apply. Your satisfaction and convenience are our priorities."
  },
  {
    question: "What are the benefits of using ASK Touch services?",
    answer: "You get professional-grade cleaning with eco-friendly products, effective pest control, trained and reliable staff, flexible scheduling, competitive pricing, and satisfaction guarantee. We handle everything from routine cleaning to post-construction cleanup and fumigation."
  },
  {
    question: "How does pricing work for cleaning services?",
    answer: "Pricing depends on the service type, space size, and frequency. We offer competitive rates with transparent pricing—no hidden fees. Contact us for a free quote tailored to your needs. We provide discounts for recurring bookings and package deals."
  },
  {
    question: "Do you provide fumigation services for businesses?",
    answer: "Yes! We offer comprehensive fumigation and pest control services for both residential and commercial properties. This includes termite control, bugs and mosquito treatment, rodent control, and general pest management, ensuring a healthy and pest-free environment."
  },
  {
    question: "What areas do you serve?",
    answer: "We're based in Ibadan and serve clients across the city and surrounding areas. We also provide services nationwide for larger commercial projects. Contact us to confirm service availability in your specific location."
  }
]

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-emerald-700 w-full px-6 md:px-8 lg:px-12 py-20 lg:py-32">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            FAQs
          </h2>
          <p className="text-emerald-50 text-lg md:text-xl">
            Everything you need to know about our cleaning and fumigation services
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:bg-white/15 transition-colors"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between gap-4 p-4 md:p-8 text-left"
              >
                <span className="text-white font-medium text-base md:text-lg pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                    <Plus className="w-6 h-6 text-white" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <p className="text-emerald-50 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-emerald-50 text-lg md:text-xl mb-8">
            {`Still have questions? We're here to help!`}
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2349034027582"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all shadow-lg active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat Us Now</span>
            </a>
            <a
              href="tel:+2349034027582"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/30 active:scale-95"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Now</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FaqSection