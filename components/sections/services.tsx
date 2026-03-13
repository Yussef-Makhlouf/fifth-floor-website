'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import GridBackground from '@/components/ui/grid-background'

const services = [
  {
    id: 1,
    title: 'Brand Strategy',
    description: 'Strategic foundations that define your market position and drive meaningful growth. We analyze, position, and craft narratives that resonate.',
    keywords: ['Research', 'Positioning', 'Narrative', 'Growth'],
    image: '/images/services/brand-strategy.png',
  },
  {
    id: 2,
    title: 'Branding',
    description: 'Visual identity systems that communicate your essence with clarity and distinction. From logos to comprehensive design guidelines.',
    keywords: ['Identity', 'Design Systems', 'Guidelines', 'Typography'],
    image: '/images/services/branding.png',
  },
  {
    id: 3,
    title: 'Marketing',
    description: 'Campaigns and communications that resonate with your audience and inspire action. Data-driven strategies meets creative excellence.',
    keywords: ['Campaigns', 'Digital', 'Content', 'Social'],
    image: '/images/services/marketing.png',
  },
  {
    id: 4,
    title: 'Events',
    description: 'Immersive experiences that transform moments into lasting memories. We handle everything from concept to execution.',
    keywords: ['Conferences', 'Exhibitions', 'Galas', 'Launches'],
    image: '/images/services/events.png',
  },
  {
    id: 5,
    title: 'Booths',
    description: 'Exhibition spaces that capture attention and embody your brand presence. Structural design that stands out in any venue.',
    keywords: ['Design', 'Fabrication', 'Experience', 'Spatial'],
    image: '/images/services/booths.png',
  },
  {
    id: 6,
    title: 'Creative Concepts',
    description: 'Bold ideas that challenge conventions and push creative boundaries. Innovation at the intersection of art and technology.',
    keywords: ['Ideation', 'Art Direction', 'Innovation', 'Future'],
    image: '/images/services/creative.png',
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const [expandedMobileIdx, setExpandedMobileIdx] = useState<number | null>(0)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when element is in the middle 60% of viewport
      threshold: 0.5,
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
    <section id="services" className="relative bg-[#CFCFCF] min-h-screen">
      <GridBackground
        fadeFrom="right"
        gridColor="#919191"
        opacity={0.15}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Background Decor */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] opacity-[0.04] pointer-events-none select-none z-0">
        <Image
          src="/logos/fifth-decore-dark.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10" ref={containerRef}>
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Scrollable Content */}
          <div className="w-full lg:w-1/2 px-0 lg:px-20 py-16 lg:py-24 order-2 lg:order-1">
            <div className="mb-12 lg:mb-20 px-6 lg:px-0">
              <p className="section-label mb-4 text-[#6A6A6A]">What We Do</p>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#3E3E3E]">
                Our Services
              </h2>
              <div className="w-20 h-px bg-[#3E3E3E] mt-6" />
            </div>

            <div className="space-y-0 lg:space-y-32">
              {services.map((service, idx) => {
                const isExpanded = expandedMobileIdx === idx
                return (
                  <div
                    key={service.id}
                    ref={(el) => { serviceRefs.current[idx] = el }}
                    data-index={idx}
                    className={`transition-all duration-700 ${
                      activeService === idx
                        ? 'opacity-100 lg:translate-x-0'
                        : 'opacity-100 lg:opacity-30 lg:blur-[1px]'
                    } border-b border-[#3E3E3E]/10 lg:border-none text-[#3E3E3E]`}
                  >
                    {/* Mobile Accordion Header */}
                    <button
                      onClick={() => setExpandedMobileIdx(isExpanded ? null : idx)}
                      className="lg:hidden w-full flex items-center justify-between py-6 px-6 text-left group"
                    >
                      <h3
                        className={`text-2xl sm:text-3xl font-bold tracking-tight transition-all duration-300 ${
                          isExpanded ? 'text-[#3E3E3E]' : 'text-[#8A8A8A] group-hover:text-[#3E3E3E]'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <div className="relative w-4 h-4 flex items-center justify-center flex-shrink-0 ml-4">
                        <div
                          className={`w-full h-[2px] transition-colors duration-300 absolute ${
                            isExpanded ? 'bg-[#3E3E3E]' : 'bg-[#8A8A8A] group-hover:bg-[#3E3E3E]'
                          }`}
                        />
                        <div
                          className={`w-[2px] h-full absolute transition-all duration-300 ${
                            isExpanded
                              ? 'rotate-90 opacity-0 bg-[#3E3E3E]'
                              : 'rotate-0 opacity-100 bg-[#8A8A8A] group-hover:bg-[#3E3E3E]'
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
                      <div className="px-6 lg:px-0">
                        {/* Mobile/Tablet Image */}
                        <div className="lg:hidden relative w-full h-56 sm:h-72 mb-8 rounded-none overflow-hidden bg-[#E0E0E0]">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                          />
                        </div>

                        <span className="hidden lg:block text-sm font-medium text-[#919191] mb-4">
                          0{service.id}
                        </span>
                        <h3 className="hidden lg:block text-3xl md:text-4xl font-bold text-[#3E3E3E] mb-6">
                          {service.title}
                        </h3>
                        <p className="text-base lg:text-lg text-[#6A6A6A] leading-relaxed mb-6 lg:mb-8 max-w-md">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2 lg:gap-3">
                          {service.keywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="px-3 py-2 bg-[#3E3E3E] text-[#CFCFCF] text-[10px] lg:text-xs uppercase tracking-widest rounded-full"
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

            <div className="hidden lg:block h-[20vh]" /> {/* Spacer at bottom for desktop */}
          </div>

          {/* Right Column - Sticky Images (Desktop Only) */}
          <div className="hidden lg:block w-1/2 h-screen sticky top-0 right-0 order-1 lg:order-2 overflow-hidden border-l border-[#919191]/20">
            {services.map((service, idx) => (
              <div
                key={service.id}
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
                {/* Overlay Gradient for Text Contrast (just in case) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#CFCFCF]/20 to-transparent mix-blend-overlay" />
              </div>
            ))}

            {/* Decorative Corner lines */}
            <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#CFCFCF]/50 z-20" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#CFCFCF]/50 z-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
