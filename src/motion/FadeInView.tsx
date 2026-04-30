"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface FadeInViewProps {
  children: React.ReactNode
  className?: string
  delay?: number // Optional delay in seconds
}

export const FadeInView = ({ children, className, delay = 0 }: FadeInViewProps) => {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.15 
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: delay, // Applied here
        ease: [0.21, 0.47, 0.32, 0.98] // Clean, premium feel
      }}
    >
      {children}
    </motion.div>
  )
}