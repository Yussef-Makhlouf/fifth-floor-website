'use client'

import { useEffect, useRef } from 'react'
import DiagonalGrid from '@/components/ui/diagonal-grid'
import ArchitecturalShapes, { CircleDecoration } from '@/components/ui/architectural-shapes'
import GridBackground from '../ui/grid-background'

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100')
            entry.target.classList.remove('opacity-0')
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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Diagonal Grid Background */}
      <DiagonalGrid
        position="top-left"
        gridColor="#919191"
        gridSize={40}
        opacity={0.3}
      />

      {/* Fading Grid Background - Bottom Left */}
      {/* <GridBackground
        fadeFrom="corner-bl"
        gridColor="#919191"
        gridSizeX={24}
        gridSizeY={32}
        opacity={0.25}
      /> */}

      {/* Architectural Decorations */}
      <CircleDecoration
        className="absolute -top-20 -right-20 md:-top-32 md:-right-32"
        size="xl"
      />
      <CircleDecoration
        className="absolute -bottom-24 -left-24"
        size="lg"
      />

      {/* Vertical Line Decoration */}
      <div className="absolute top-1/3 left-12 md:left-24 w-px h-32 bg-[#919191] opacity-20" />
      <div className="absolute bottom-1/4 right-12 md:right-24 w-px h-24 bg-[#919191] opacity-20" />

      {/* Horizontal Line */}
      <div className="absolute top-1/2 left-0 w-24 md:w-40 h-px bg-[#919191] opacity-20" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center max-w-5xl px-6 md:px-12 opacity-0 transition-opacity duration-1000"
      >
        {/* Section Label */}
        <div className="section-label mb-8 animate-fade-in text-[#6A6A6A]">
          FIFTH FLOOR
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-10 text-[#3E3E3E] animate-slide-up">
          Where Big Ideas
          <br />
          Take Shape
        </h1>

        {/* Subtle Divider */}
        <div className="w-16 h-px bg-[#919191] mx-auto mb-10 animate-line-extend" />

        {/* Services Tagline */}
        <p className="text-base md:text-lg text-[#6A6A6A] mb-14 font-light tracking-wide leading-relaxed animate-fade-in delay-200">
          Brand Strategy • Branding • Marketing • Events • Booths • Creative Concepts
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-300">
          <a
            href="#work"
            className="px-8 py-4 border border-[#3E3E3E] text-[#3E3E3E] font-medium tracking-wide hover:bg-[#3E3E3E] hover:text-[#ffffff] transition-all duration-400 hover-lift"
          >
            Explore Our Work
          </a>
          <a
            href="/contact"
            className="px-8 py-4 bg-[#3E3E3E] text-[#ffffff] font-medium tracking-wide hover:bg-[#6A6A6A] transition-all duration-400 hover-lift"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-3 animate-fade-in delay-500">
          <span className="section-label text-[#919191]">Scroll</span>
          <div className="w-px h-8 bg-[#919191] animate-pulse" />
        </div>
      </div>

      {/* Hero Visual Image */}
      <div className='absolute right-0 top-0 h-full w-1/2 sm:w-2/5 md:w-1/3 opacity-10 sm:opacity-15 lg:opacity-20 pointer-events-none mix-blend-multiply'>
        <div className='relative w-full h-full'>
          <img
            src="/images/home-hero-visual.png"
            alt="Architectural Abstract"
            className='object-cover w-full h-full'
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white/90" />
        </div>
      </div>

      {/* Corner Decoration */}
      <ArchitecturalShapes
        variant="corner"
        size="md"
        className="absolute bottom-8 right-8 rotate-180"
        opacity={0.1}
      />
    </section>
  )
}
