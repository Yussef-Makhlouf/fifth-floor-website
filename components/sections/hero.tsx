'use client'

import { useEffect, useRef } from 'react'
import DiagonalGrid from '@/components/ui/diagonal-grid'
import ArchitecturalShapes, { CircleDecoration } from '@/components/ui/architectural-shapes'
import Link from 'next/link'

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (textRef.current) {
      observer.observe(textRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden pt-32 pb-24 bg-[#F7F6F3] hairline-grid-light">
      {/* Background Lighting Flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-[#1A1A1C]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Diagonal Grid Background */}
      <DiagonalGrid
        position="top-left"
        gridColor="#1A1A1C"
        gridSize={48}
        opacity={0.12}
      />

      {/* Architectural Decorations */}
      <CircleDecoration
        className="absolute -top-24 -right-24 md:-top-32 md:-right-32 text-[#1A1A1C]"
        size="xl"
      />
      <CircleDecoration
        className="absolute -bottom-24 -left-24 text-[#1A1A1C]"
        size="lg"
      />

      {/* Vertical Structural Guidelines */}
      <div className="absolute top-1/4 left-8 md:left-20 w-px h-48 bg-[#1A1A1C]/15 hidden sm:block" />
      <div className="absolute bottom-1/4 right-8 md:right-20 w-px h-36 bg-[#1A1A1C]/15 hidden sm:block" />

      {/* Location Badge (Architectural Detail) */}
      <div className="absolute top-28 right-8 md:right-20 hidden md:flex items-center gap-3 text-[11px] font-mono text-[#8E8D8A] uppercase tracking-widest border border-[#1A1A1C]/10 px-3.5 py-1.5 rounded-full bg-white/50 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1C] animate-pulse" />
        <span>KW 029.3759° • UAE 025.2048°</span>
      </div>

      {/* Content Container */}
      <div
        ref={textRef}
        className="relative z-10 text-center max-w-5xl px-6 md:px-12 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        {/* Section Label */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#1A1A1C]/10 bg-white/60 backdrop-blur-md mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1C]" />
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#55555A]">
            Fifth Floor Creative House
          </span>
        </div>

        {/* Main Avant-Garde Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold font-syne-display tracking-tighter leading-[0.98] mb-10 text-[#1A1A1C]">
          Where Big Ideas <br />
          <span className="font-serif-accent text-[#55555A] font-normal italic">
            Take Shape.
          </span>
        </h1>

        {/* Subtle Horizontal Divider */}
        <div className="w-20 h-[1.5px] bg-[#1A1A1C] mx-auto mb-10 opacity-30" />

        {/* Services Tagline */}
        <p className="text-sm md:text-base text-[#55555A] mb-12 font-medium tracking-wider max-w-2xl mx-auto leading-relaxed">
          Brand Identity • Spatial Design • Strategic Marketing • Immersive Events • Digital Concepts
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#work"
            className="w-full sm:w-auto px-9 py-4 border border-[#1A1A1C] text-[#1A1A1C] font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#1A1A1C] hover:text-[#F7F6F3] transition-all duration-300 active-press shadow-sm"
          >
            Explore Selected Work
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-9 py-4 bg-[#1A1A1C] text-[#F7F6F3] font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#3E3E42] transition-all duration-300 active-press shadow-md"
          >
            Initiate Project
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <a
          href="#work"
          className="flex flex-col items-center gap-2.5 group cursor-pointer"
          aria-label="Scroll to work"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#8E8D8A] group-hover:text-[#1A1A1C] transition-colors">
            Scroll
          </span>
          <div className="w-px h-7 bg-[#1A1A1C]/30 group-hover:h-10 group-hover:bg-[#1A1A1C] transition-all duration-300" />
        </a>
      </div>

      {/* Corner Architectural Decoration */}
      <ArchitecturalShapes
        variant="corner"
        size="md"
        className="absolute bottom-8 right-8 rotate-180 text-[#1A1A1C]"
        opacity={0.15}
      />
    </section>
  )
}
