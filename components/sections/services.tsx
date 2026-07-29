'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { allServices } from '@/lib/data/services'

// Show a curated selection of 6 services on the homepage
const homepageServices = allServices.slice(0, 6)

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const [expandedMobileIdx, setExpandedMobileIdx] = useState<number | null>(0)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -25% 0px',
      threshold: 0.4,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'))
          setActiveService(index)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="relative bg-[#F7F6F3] text-[#1A1A1C] min-h-screen hairline-grid-light">
      <div className="max-w-[1400px] mx-auto relative z-10" ref={containerRef}>
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Scrollable Content */}
          <div className="w-full lg:w-1/2 px-6 lg:px-20 py-20 lg:py-32 order-2 lg:order-1">
            <div className="mb-16 lg:mb-24">
              <span className="text-xs uppercase tracking-[0.35em] text-[#8E8D8A] font-mono mb-4 block">
                // Our Capabilities
              </span>
              <h2 className="text-5xl md:text-7xl font-bold font-syne-display tracking-tighter text-[#1A1A1C] leading-[0.98]">
                Bespoke <br />
                <span className="font-serif-accent text-[#55555A] font-normal italic">Services.</span>
              </h2>
              <div className="w-16 h-[2px] bg-[#1A1A1C] mt-6 opacity-30" />
            </div>

            <div className="space-y-0 lg:space-y-32">
              {homepageServices.map((service, idx) => {
                const isExpanded = expandedMobileIdx === idx
                return (
                  <div
                    key={service.slug}
                    ref={(el) => { serviceRefs.current[idx] = el }}
                    data-index={idx}
                    className={`transition-all duration-700 ${
                      activeService === idx
                        ? 'opacity-100 lg:translate-x-0'
                        : 'opacity-100 lg:opacity-35 lg:blur-[0.5px]'
                    } border-b border-[#1A1A1C]/15 lg:border-none text-[#1A1A1C]`}
                  >
                    {/* Mobile Accordion Header */}
                    <button
                      onClick={() => setExpandedMobileIdx(isExpanded ? null : idx)}
                      className="lg:hidden w-full flex items-center justify-between py-6 text-left group"
                    >
                      <h3
                        className={`text-2xl font-bold font-syne-display tracking-tight transition-colors duration-300 ${
                          isExpanded ? 'text-[#1A1A1C]' : 'text-[#8E8D8A] group-hover:text-[#1A1A1C]'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <div className="relative w-4 h-4 flex items-center justify-center flex-shrink-0 ml-4">
                        <div
                          className={`w-full h-[2px] transition-colors duration-300 absolute ${
                            isExpanded ? 'bg-[#1A1A1C]' : 'bg-[#8E8D8A] group-hover:bg-[#1A1A1C]'
                          }`}
                        />
                        <div
                          className={`w-[2px] h-full absolute transition-all duration-300 ${
                            isExpanded
                              ? 'rotate-90 opacity-0 bg-[#1A1A1C]'
                              : 'rotate-0 opacity-100 bg-[#8E8D8A] group-hover:bg-[#1A1A1C]'
                          }`}
                        />
                      </div>
                    </button>

                    {/* Content (Inside Accordion on Mobile / Standard on Desktop) */}
                    <div
                      className={`overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isExpanded
                          ? 'max-h-[800px] opacity-100 pb-8'
                          : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:pb-0'
                      }`}
                    >
                      <div>
                        {/* Mobile/Tablet Image */}
                        <div className="lg:hidden relative w-full h-56 sm:h-72 mb-8 rounded-lg overflow-hidden bg-[#E0E0E0] border border-[#1A1A1C]/10 shadow-md">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                          />
                        </div>

                        <span className="hidden lg:block text-xs font-mono font-numeric-tabular text-[#8E8D8A] mb-3">
                          0{idx + 1}
                        </span>
                        <h3 className="hidden lg:block text-3xl md:text-4xl font-bold font-syne-display text-[#1A1A1C] mb-5 tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-sm lg:text-base text-[#55555A] leading-relaxed mb-6 lg:mb-8 max-w-md font-sans">
                          {service.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2 lg:gap-2.5">
                          {service.keywords.slice(0, 4).map((keyword) => (
                            <span
                              key={keyword}
                              className="px-3.5 py-1.5 bg-[#1A1A1C] text-[#F7F6F3] text-[10px] uppercase tracking-widest font-mono rounded-full active-press shadow-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="hidden lg:block h-[20vh]" />

            {/* Services Banner CTA */}
            <div className="mt-16 lg:mt-24 p-8 sm:p-10 bg-[#1A1A1C] text-[#F7F6F3] rounded-2xl relative overflow-hidden shadow-2xl border border-[#1A1A1C]/20 text-center flex flex-col items-center justify-center group">
              {/* Subtle background ambient glows */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-all duration-700" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-all duration-700" />

              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8E8D8A] font-mono mb-3 block relative z-10">
                // Full Capabilities
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold font-syne-display tracking-tight text-[#F7F6F3] mb-3 relative z-10">
                Explore All 15 Services
              </h3>

              <p className="text-xs sm:text-sm text-[#A0A0A5] mb-8 max-w-sm font-sans leading-relaxed relative z-10">
                Discover our full range of bespoke branding, engineering, and digital growth services.
              </p>

              {/* Centered Button */}
              <Link
                href="/services"
                className="relative z-10 inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#F7F6F3] hover:bg-white text-[#1A1A1C] font-mono text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md group/btn"
              >
                <span>View All Services</span>
                <ArrowUpRight className="w-4 h-4 text-[#1A1A1C] transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Column - Sticky Images (Desktop Only) */}
          <div className="hidden lg:block w-1/2 h-screen sticky top-0 right-0 order-1 lg:order-2 overflow-hidden border-l border-[#1A1A1C]/10">
            {homepageServices.map((service, idx) => (
              <div
                key={service.slug}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  activeService === idx
                    ? 'opacity-100 scale-100 grayscale-0'
                    : 'opacity-0 scale-105 grayscale'
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7F6F3]/30 via-transparent to-transparent mix-blend-multiply" />
              </div>
            ))}

            {/* Corner Architectural Guidelines */}
            <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#1A1A1C]/30 z-20" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#1A1A1C]/30 z-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
