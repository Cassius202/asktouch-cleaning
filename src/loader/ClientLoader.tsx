"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { assets } from "@/constants/assets";

function ClientLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timeout);
  }, []);

  const text = "Ask-Touch";

  // Variants for the typewriter container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Speed of typing (lower = faster)
        delayChildren: 0.6,    // Wait for logo to start/finish
      },
    },
  };

  // Variants for each individual letter
  const letterVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { 
      opacity: 1, 
      display: "inline-block" 
    },
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 bg-zinc-100 h-screen w-screen items-center flex justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={assets.logo}
              alt="Logo"
              width={110}
              height={110}
            />
          </motion.div>

          {/* Typewriter Text Animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl font-semibold ml-4 text-slate-900 flex"
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}

      <motion.main
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

export default ClientLoader;