'use client'

import Image from 'next/image'

import DiagonalGrid from '@/components/ui/diagonal-grid'
import { CircleDecoration } from '@/components/ui/architectural-shapes'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'

export default function ServicesHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f0f0] pt-28 sm:pt-32 overflow-hidden">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-[#3E3E3E]/5 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-tl from-[#919191]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Diagonal Grid Background */}
      <DiagonalGrid
        position="top-left"
        gridColor="#919191"
        gridSize={40}
        opacity={0.2}
      />

      {/* Additional Grid - Bottom Right for balance */}
      <DiagonalGrid
        position="bottom-right"
        gridColor="#919191"
        gridSize={40}
        opacity={0.15}
      />

      {/* Circle Decorations - Enhanced */}
      <CircleDecoration
        className="absolute top-20 right-20 md:top-40 md:right-40"
        size="xl"
      />
      <CircleDecoration
        className="absolute -bottom-32 -left-32"
        size="xl"
      />
      <CircleDecoration
        className="absolute top-1/2 -right-16 md:-right-24"
        size="md"
      />

      {/* Vertical Line Decorations */}
      <div className="absolute top-1/4 left-10 md:left-20 w-px h-48 bg-gradient-to-b from-transparent via-[#919191]/40 to-transparent" />
      <div className="absolute bottom-1/4 right-10 md:right-20 w-px h-36 bg-gradient-to-b from-transparent via-[#919191]/30 to-transparent" />

      {/* Horizontal Line Decorations */}
      <div className="absolute bottom-1/3 right-0 w-32 md:w-56 h-px bg-gradient-to-l from-[#919191]/30 to-transparent" />
      <div className="absolute top-1/3 left-0 w-24 md:w-40 h-px bg-gradient-to-r from-[#919191]/30 to-transparent" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#3E3E3E]/20 rotate-45 hidden md:block" />
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 border border-[#919191]/30 rotate-45 hidden md:block" />
      <div className="absolute top-2/3 right-1/4 w-4 h-4 border border-[#3E3E3E]/20 rounded-full hidden lg:block" />
      {/* Floating Brand Icon */}
      <div className="absolute top-40 left-20 w-16 h-16 opacity-10 hidden lg:block animate-float" style={{ animationDelay: '1.5s' }}>
        <Image src="/logos/fifth-icon-dark.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative z-10 max-w-5xl">
        {/* Premium Label with line accents */}
        <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 animate-fade-in">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#919191]" />
          <div className="tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs font-semibold text-[#6A6A6A] uppercase px-3 sm:px-4 py-1.5 sm:py-2 border border-[#919191]/30 rounded-full backdrop-blur-sm">
            Creative & Digital Excellence
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 sm:mb-10 animate-fade-in text-[#3E3E3E]">
          <span className="block mb-2">Full-Spectrum</span>
          <span className="block bg-gradient-to-r from-[#3E3E3E] via-[#5a5a5a] to-[#3E3E3E] bg-clip-text text-transparent">
            Creative & Digital
          </span>
          <span className="block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6A6A6A] font-extralight">
            Services
          </span>
        </h1>

        {/* Animated Divider */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10 animate-line-extend">
          <div className="w-12 sm:w-16 h-px bg-[#3E3E3E]" />
          <div className="w-2 h-2 border border-[#3E3E3E]/40 rotate-45" />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A] font-light leading-relaxed max-w-2xl mb-10 sm:mb-12">
            We blend strategic branding, experiential design, and cutting-edge digital solutions to build powerful, sustainable presences for ambitious brands and institutions across the GCC.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16">
            <a
              href="#services-overview"
              className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-[#3E3E3E] text-white font-medium tracking-wide hover:bg-[#2a2a2a] transition-all duration-300 rounded-sm flex items-center justify-center sm:justify-start gap-3 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
            >
              Explore Services
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/contact"
              className="px-6 sm:px-8 py-3.5 sm:py-4 border border-[#3E3E3E]/30 text-[#3E3E3E] font-medium tracking-wide hover:border-[#3E3E3E] hover:bg-[#3E3E3E]/5 transition-all duration-300 rounded-sm text-center"
            >
              Start a Project
            </a>
          </div>

          {/* Service Tags – Two Row Layout */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['Brand Strategy', 'Branding', 'Marketing', 'Events', 'Booths', 'Creative Concepts'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/60 backdrop-blur-sm border border-[#919191]/20 text-[#6A6A6A] text-[10px] sm:text-xs uppercase tracking-wider rounded-full hover:border-[#3E3E3E]/40 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['Web Development', 'UI/UX Design', 'SEO & Analytics', 'Managed Hosting', 'Tech Consulting', 'WP Migration'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#3E3E3E]/5 backdrop-blur-sm border border-[#3E3E3E]/15 text-[#3E3E3E] text-[10px] sm:text-xs uppercase tracking-wider rounded-full hover:border-[#3E3E3E]/40 hover:bg-[#3E3E3E]/10 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Hero Visual */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 sm:w-2/5 md:w-[35%] lg:w-[40%] h-[60%] sm:h-[70%] md:h-[80%] opacity-15 sm:opacity-25 md:opacity-50 lg:opacity-80 pointer-events-none">
        <div className="relative w-full h-full">
          <img
            src="/images/services-hero-visual.png"
            alt="Strategic Structure"
            className="object-contain w-full h-full drop-shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white/70" />
        </div>
      </div>

      {/* Corner Decorations */}
      <ArchitecturalShapes
        variant="corner"
        size="md"
        className="absolute bottom-8 left-8"
        opacity={0.15}
      />
      <ArchitecturalShapes
        variant="corner"
        size="md"
        className="absolute top-8 right-8 rotate-180"
        opacity={0.1}
      />

    </section>
  )
}
