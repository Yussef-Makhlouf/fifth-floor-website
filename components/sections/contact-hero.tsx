'use client'

import { useEffect, useRef } from 'react'
import DiagonalGrid from '@/components/ui/diagonal-grid'
import { CircleDecoration } from '@/components/ui/architectural-shapes'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'

export default function ContactHero() {
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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 bg-gradient-to-br from-white via-[#f8f8f8] to-[#f0f0f0]">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#3E3E3E]/5 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-[#919191]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Diagonal Grid Background - Top Right */}
      <DiagonalGrid
        position="top-right"
        gridColor="#919191"
        gridSize={40}
        opacity={0.2}
      />

      {/* Additional Diagonal Grid - Bottom Left for balance */}
      <DiagonalGrid
        position="bottom-left"
        gridColor="#919191"
        gridSize={40}
        opacity={0.15}
      />

      {/* Circle Decorations - Enhanced */}
      <CircleDecoration
        className="absolute -top-20 -left-20 md:-top-40 md:-left-40"
        size="xl"
      />
      <CircleDecoration
        className="absolute -bottom-32 -right-32"
        size="xl"
      />
      <CircleDecoration
        className="absolute top-1/2 -left-16 md:-left-24"
        size="md"
      />

      {/* Vertical Line Decorations - More dynamic */}
      <div className="absolute top-1/4 right-12 md:right-24 w-px h-48 bg-gradient-to-b from-transparent via-[#3E3E3E]/30 to-transparent" />
      <div className="absolute bottom-1/4 left-12 md:left-24 w-px h-36 bg-gradient-to-b from-transparent via-[#3E3E3E]/30 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-px h-24 bg-gradient-to-b from-transparent via-[#919191]/20 to-transparent hidden lg:block" />

      {/* Horizontal Lines - Enhanced */}
      <div className="absolute top-1/3 right-0 w-32 md:w-56 h-px bg-gradient-to-l from-[#3E3E3E]/30 to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-24 md:w-40 h-px bg-gradient-to-r from-[#3E3E3E]/30 to-transparent" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-[#3E3E3E]/20 rotate-45 hidden md:block" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 border border-[#919191]/30 rotate-45 hidden md:block" />
      <div className="absolute top-2/3 right-1/4 w-4 h-4 border border-[#3E3E3E]/20 rounded-full hidden lg:block" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center max-w-4xl px-8 opacity-0 transition-all duration-1000 transform"
      >
        {/* Premium Label with line accents */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#919191]" />
          <div className="tracking-[0.3em] text-xs font-semibold text-[#6A6A6A] uppercase px-4 py-2 border border-[#919191]/30 rounded-full backdrop-blur-sm">
            Let&apos;s Connect
          </div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#919191]" />
        </div>

        {/* Main Headline - Enhanced typography */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-10 text-[#3E3E3E]">
          <span className="block mb-2">Ready to Transform</span>
          <span className="block bg-gradient-to-r from-[#3E3E3E] via-[#5a5a5a] to-[#3E3E3E] bg-clip-text text-transparent">
            Your Brand Vision?
          </span>
        </h1>

        {/* Animated Divider */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-8 h-px bg-[#919191]/50" />
          <div className="w-2 h-2 border border-[#3E3E3E]/40 rotate-45" />
          <div className="w-8 h-px bg-[#919191]/50" />
        </div>

        {/* Description with enhanced styling */}
        <p className="text-lg md:text-xl text-[#6A6A6A] font-light max-w-2xl mx-auto leading-relaxed mb-14">
          Get in touch with our team to discuss your project, ideas, and how we can help shape your brand&apos;s future.
        </p>

        {/* Enhanced Location indicators */}
        <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/60 backdrop-blur-md rounded-full border border-[#919191]/20 shadow-lg shadow-black/5">
          <div className="flex items-center gap-3 group cursor-default">
            <span className="text-2xl transform group-hover:scale-110 transition-transform">🇰🇼</span>
            <div className="text-left">
              <span className="block text-xs text-[#919191] uppercase tracking-wider">Office</span>
              <span className="text-[#3E3E3E] font-medium">Kuwait</span>
            </div>
          </div>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#919191]/50 to-transparent" />
          <div className="flex items-center gap-3 group cursor-default">
            <span className="text-2xl transform group-hover:scale-110 transition-transform">🇦🇪</span>
            <div className="text-left">
              <span className="block text-xs text-[#919191] uppercase tracking-wider">Office</span>
              <span className="text-[#3E3E3E] font-medium">UAE</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <a
            href="#contact_us"
            className="group px-8 py-4 bg-[#3E3E3E] text-white font-medium tracking-wide hover:bg-[#2a2a2a] transition-all duration-300 rounded-sm flex items-center gap-3 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
          >
            Start a Project
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="mailto:hello@fifthfloor.com"
            className="px-8 py-4 border border-[#3E3E3E]/30 text-[#3E3E3E] font-medium tracking-wide hover:border-[#3E3E3E] hover:bg-[#3E3E3E]/5 transition-all duration-300 rounded-sm"
          >
            Send an Email
          </a>
        </div>
      </div>

      {/* Contact Hero Visual - Right Side - Enhanced */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 sm:w-2/5 md:w-[35%] lg:w-[45%] h-[60%] sm:h-[70%] md:h-[85%] opacity-15 sm:opacity-25 md:opacity-50 lg:opacity-90 pointer-events-none">
        <div className="relative w-full h-full">
          <img
            src="/images/contact-hero-visual.png"
            alt="Contact Visual"
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-[#919191]">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-[#919191] to-transparent" />
        </div>
      </div>
    </section>
  )
}
