'use client'

import React from 'react'
import { CircleDecoration } from '@/components/ui/architectural-shapes'

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

// Duplicate clients for seamless infinite scroll
const marqueeClients = [...clients, ...clients]

export default function Clients() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#1A1A1A] overflow-hidden border-t border-[#3E3E3E]/30">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3E3E3E]/20 via-[#1A1A1A] to-[#1A1A1A]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6A6A6A]/50 to-transparent" />
      
      {/* Subtle Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#6A6A6A 1px, transparent 1px), linear-gradient(90deg, #6A6A6A 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 mb-16 md:mb-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 animate-slide-up">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#919191]" />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#919191]">Select Partners</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
              Trusted by visionaries <br className="hidden sm:block" />
              <span className="text-[#919191]">and industry leaders.</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <CircleDecoration size="sm" className="opacity-20" />
          </div>
        </div>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 sm:gap-8">
        
        {/* Top/Bottom gradient fade masks to blend marquee edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#1A1A1A] to-transparent z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#1A1A1A] to-transparent z-20" />

        {/* Marquee Row 1 (LTR) */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
          {marqueeClients.map((client, idx) => (
            <div 
              key={`${client}-${idx}`}
              className="px-8 sm:px-12 py-6 mx-4 border border-[#3E3E3E]/40 hover:border-[#6A6A6A]/80 bg-[#2A2A2A]/20 backdrop-blur-sm transition-all duration-500 group cursor-default"
            >
              <span className="text-lg sm:text-xl md:text-2xl font-light text-[#919191] group-hover:text-white transition-colors duration-500 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>

        {/* Marquee Row 2 (RTL - Staggered) */}
        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] items-center ml-[-25%]">
          {marqueeClients.map((client, idx) => (
            <div 
              key={`${client}-rev-${idx}`}
              className="px-8 sm:px-12 py-6 mx-4 border border-[#3E3E3E]/40 hover:border-[#6A6A6A]/80 bg-[#2A2A2A]/40 backdrop-blur-sm transition-all duration-500 group cursor-default"
            >
              <span className="text-lg sm:text-xl md:text-2xl font-light text-[#6A6A6A] group-hover:text-white transition-colors duration-500 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Tailwind specific animations defined directly inline for portability, 
          though normally you'd add this to globals.css */}
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
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
      `}} />
    </section>
  )
}
