"use client";

import { motion } from "framer-motion";

const FlutedGlass = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      {/* 1. The Background Image (The Subject) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          filter: "url(#fluted-glass-filter) blur(1px)",
        }}
      />

      {/* 2. Frosted Glass Overlay - Subtle blur */}
      <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/5" />

      {/* 3. Wide Vertical Ribs - Sparse and clean */}
      <div 
        className="absolute inset-0 z-20 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.06) 0px,
              rgba(255,255,255,0.06) 1px,
              transparent 1px,
              transparent 24px
            )
          `,
        }}
      />

      {/* 4. Minimal horizontal texture */}
      <div 
        className="absolute inset-0 z-30 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.02) 0px,
              rgba(255,255,255,0.02) 1px,
              transparent 1px,
              transparent 4px
            )
          `,
        }}
      />

      {/* 5. Very subtle edge glow */}
      <div className="absolute inset-0 z-40 bg-gradient-to-br from-white/3 via-transparent to-white/3 pointer-events-none" />

      {/* 6. Minimal inner shadow */}
      <div className="absolute inset-0 z-50 pointer-events-none" style={{
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.15), inset 0 0 160px rgba(0,0,0,0.08)"
      }} />

      {/* SVG Filters */}
      <svg className="hidden">
        <defs>
          {/* Subtle fluted glass distortion */}
          <filter id="fluted-glass-filter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.008 0.05" 
              numOctaves="2" 
              result="noise"
              seed="2"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="15" 
              xChannelSelector="R" 
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default FlutedGlass;