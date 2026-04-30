// components/motion/MotionDiv.tsx
"use client"
import { motion, HTMLMotionProps } from "framer-motion"

export const MotionDiv = ({ children, ...props }: HTMLMotionProps<"div">) => (
  <motion.div {...props}>{children}</motion.div>
)

export const MotionH1 = ({ children, ...props }: HTMLMotionProps<"h1">) => (
  <motion.h1 {...props}>{children}</motion.h1>
)

export const MotionH2 = ({ children, ...props }: HTMLMotionProps<"h2">) => (
  <motion.h2 {...props}>{children}</motion.h2>
)

export const MotionP = ({ children, ...props }: HTMLMotionProps<"p">) => (
  <motion.p {...props}>{children}</motion.p>
)

export const MotionSection = ({ children, ...props }: HTMLMotionProps<"section">) => (
  <motion.section {...props}>{children}</motion.section>
)