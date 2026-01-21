'use client'

import DiagonalGrid from '@/components/ui/diagonal-grid'
import { CircleDecoration } from '@/components/ui/architectural-shapes'

export default function ServicesHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white pt-32 overflow-hidden">
      {/* Diagonal Grid Background */}
      <DiagonalGrid
        position="top-left"
        gridColor="#919191"
        gridSize={40}
        opacity={0.3}
      />

      {/* Circle Decorations */}
      <CircleDecoration
        className="absolute top-20 right-20 md:top-40 md:right-40"
        size="xl"
      />
      <CircleDecoration
        className="absolute -bottom-24 -left-24"
        size="lg"
      />

      {/* Vertical Line Decorations */}
      <div className="absolute top-1/4 left-10 md:left-20 w-px h-32 bg-[#919191] opacity-20" />

      {/* Horizontal Line Decoration */}
      <div className="absolute bottom-1/3 right-0 w-32 md:w-56 h-px bg-[#919191] opacity-20" />

      <div className="relative z-10 max-w-4xl">
        <div className="mb-12 animate-fade-in">
          <p className="text-sm uppercase tracking-widest text-[#6A6A6A] mb-8">Our Expertise</p>
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8 text-[#3E3E3E]">
            <span className="block">Crafting Experiences</span>
            <span className="block">That Endure</span>
          </h1>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-lg md:text-xl text-[#6A6A6A] font-light leading-relaxed max-w-2xl mb-16">
            We specialize in strategic branding, experiential design, and creative direction for discerning brands and cultural institutions.
          </p>

          <div className="flex items-center gap-2">
            <div className="w-16 h-px bg-[#3E3E3E]"></div>
            <span className="text-xs uppercase tracking-widest text-[#6A6A6A]">Premium Creative Services</span>
          </div>
        </div>
      </div>

      {/* Services Hero Visual */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] h-[80%] opacity-80 hidden lg:block pointer-events-none">
        <div className="relative w-full h-full">
          <img
            src="/images/services-hero-visual.png"
            alt="Strategic Structure"
            className="object-contain w-full h-full drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-fade-in">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs uppercase tracking-widest text-[#919191]">Scroll to explore</p>
          <div className="w-px h-8 bg-[#919191] animate-pulse" />
        </div>
      </div>
    </section>
  )
}
