'use client'
import { motion } from 'framer-motion'
import { Shield, Award, Leaf, Clock, Users, Sparkles } from 'lucide-react'
import Image from 'next/image'

const trustPoints = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'Fully certified with comprehensive insurance coverage for your peace of mind',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop'
  },
  {
    icon: Award,
    title: '5+ Years Excellence',
    description: 'Proven track record of delivering outstanding cleaning and fumigation services',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&auto=format&fit=crop'
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description: 'Safe, non-toxic cleaning solutions that protect your family and the environment',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Available when you need us - daily, weekly, monthly, or one-time deep cleaning',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop'
  },
  {
    icon: Users,
    title: 'Trained Professionals',
    description: 'Expert team with extensive training in modern cleaning and pest control techniques',
    image: 'https://images.unsplash.com/photo-1581578949510-fa7315c4c350?w=800&auto=format&fit=crop'
  },
  {
    icon: Sparkles,
    title: '100% Satisfaction',
    description: "We guarantee your complete satisfaction or we'll make it right - no questions asked",
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop'
  }
]

const TrustSection = () => {
  return (
    <section className="bg-background py-20 lg:py-32 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-xs md:text-sm text-emerald-600 font-medium mb-6">
            <Shield className="w-4 h-4" />
            Why Choose ASK Touch
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Trusted by Hundreds of <br />
            <span className="text-emerald-600">Satisfied Clients</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine professional expertise with eco-friendly practices to deliver 
            exceptional cleaning and fumigation services you can trust.
          </p>
        </motion.div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-blue-400/60 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
            >
              {/* Image Background */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={point.image}
                  alt={point.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent blur-3xl" />
                
                {/* Icon */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <point.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-emerald-600 transition-colors">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/20 rounded-2xl transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              Learn More About Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-card hover:bg-accent text-foreground font-semibold px-8 py-4 rounded-xl transition-all border border-green-500/50 active:scale-95"
            >
              Get Your Free Quote
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustSection