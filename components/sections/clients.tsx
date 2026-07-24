'use client'

import React from 'react'
import { CircleDecoration } from '@/components/ui/architectural-shapes'
import ScrollReveal from '@/components/ui/scroll-reveal'

const clients = [
  'Ministry of Culture',
  'Kuwait Investment Authority',
  'Abu Dhabi Design District',
  'Al Marai Group',
  'KIPCO',
  'The Avenues',
  'Zain Group',
  'National Bank of Kuwait',
]

// Duplicate clients for seamless infinite marquee scroll
const marqueeClients = [...clients, ...clients]

export default function Clients() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#0E0E10] text-[#F7F6F3] overflow-hidden border-t border-white/10 hairline-grid-dark">
      {/* Ambient Radial Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55rem] h-[28rem] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16 lg:px-20 mb-16 md:mb-20">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#8E8D8A]" />
                <p className="text-xs uppercase tracking-[0.35em] text-[#8E8D8A] font-mono">
                  // Strategic Partners
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-syne-display tracking-tighter text-[#F7F6F3] leading-[1.02]">
                Trusted by <span className="font-serif-accent font-normal italic text-[#8E8D8A]">Visionaries</span> <br />
                and GCC Market Leaders.
              </h2>
            </div>
            <div className="hidden md:block">
              <CircleDecoration size="sm" className="opacity-30 text-[#8E8D8A]" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 sm:gap-8 z-10">
        {/* Edge Gradient Masking */}
        <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-56 bg-gradient-to-r from-[#0E0E10] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-56 bg-gradient-to-l from-[#0E0E10] to-transparent z-20 pointer-events-none" />

        {/* Marquee Row 1 (Left to Right) */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
          {marqueeClients.map((client, idx) => (
            <div
              key={`${client}-${idx}`}
              className="px-8 sm:px-12 py-5 mx-3 border border-white/10 hover:border-white/30 bg-white/[0.03] backdrop-blur-md rounded-lg transition-all duration-500 group cursor-default shadow-lg"
            >
              <span className="text-base sm:text-lg md:text-xl font-bold font-syne-display text-[#8E8D8A] group-hover:text-white transition-colors duration-500 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>

        {/* Marquee Row 2 (Right to Left - Offset) */}
        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] items-center ml-[-20%]">
          {marqueeClients.map((client, idx) => (
            <div
              key={`${client}-rev-${idx}`}
              className="px-8 sm:px-12 py-5 mx-3 border border-white/10 hover:border-white/30 bg-white/[0.02] backdrop-blur-md rounded-lg transition-all duration-500 group cursor-default shadow-lg"
            >
              <span className="text-base sm:text-lg md:text-xl font-bold font-syne-display text-[#6E6E73] group-hover:text-white transition-colors duration-500 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 38s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 34s linear infinite;
        }
      `}} />
    </section>
  )
}
