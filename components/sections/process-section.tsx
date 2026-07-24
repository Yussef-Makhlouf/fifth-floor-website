'use client'

import { useRef, useEffect } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep understanding of your brand, market, digital landscape, and audience through strategic research and technical audits.'
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Clear positioning, product roadmap, and technical architecture that guide all subsequent creative and development decisions.'
  },
  {
    number: '03',
    title: 'Design & Build',
    description: 'Conceptual development, interface design, and full-stack engineering across all brand touchpoints and digital platforms.'
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Meticulous deployment, server configuration, SEO setup, and production to ensure the highest quality at every launch.'
  },
  {
    number: '05',
    title: 'Growth',
    description: 'Continuous performance monitoring, analytics-driven optimization, and strategic evolution based on real data and market feedback.'
  }
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reveal items on scroll
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

    const items = sectionRef.current?.querySelectorAll('.process-item')
    items?.forEach((item) => observer.observe(item))

    // Animate the connector line
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && lineRef.current) {
            lineRef.current.style.width = '100%'
          }
        })
      },
      { threshold: 0.3 }
    )

    if (lineRef.current) lineObserver.observe(lineRef.current)

    return () => {
      observer.disconnect()
      lineObserver.disconnect()
    }
  }, [])

  return (
    <section
      className="py-24 sm:py-32 md:py-40 bg-[#0f0f0f] border-t border-white/5 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Hairline grid */}
      <div className="absolute inset-0 hairline-grid-dark opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Section header */}
        <div className="mb-20 sm:mb-28 flex flex-col sm:flex-row sm:items-end justify-between gap-8 process-item opacity-0 translate-y-8 transition-all duration-700">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5a5a] font-medium">Our Methodology</p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-tight text-white">
              A structured<br />
              <span className="text-[#5a5a5a]">approach.</span>
            </h2>
          </div>
          <p className="text-sm text-[#5a5a5a] max-w-xs leading-relaxed sm:text-right">
            Each phase is informed by cultural intelligence, technical expertise, and real market data.
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block">
          {/* Animated connector line */}
          <div className="relative mb-0">
            <div className="absolute top-0 left-0 w-full h-px bg-[#1e1e1e]" />
            <div
              ref={lineRef}
              className="absolute top-0 left-0 h-px bg-gradient-to-r from-[#3E3E3E] to-transparent"
              style={{ width: '0%', transition: 'width 1.4s cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: '300ms' }}
            />
          </div>

          <div className="grid grid-cols-5 gap-0 pt-0">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="process-item opacity-0 translate-y-8 transition-all duration-700 group relative border-r border-[#1e1e1e] last:border-r-0 px-6 xl:px-8 pt-10 pb-6 hover:bg-white/[0.02] cursor-default"
                style={{ transitionDelay: `${idx * 100 + 200}ms` }}
              >
                {/* Dot on the timeline */}
                <div className="absolute top-0 left-6 xl:left-8 -translate-y-1/2 w-2 h-2 bg-[#1e1e1e] border border-[#3E3E3E] rounded-full group-hover:bg-[#6A6A6A] group-hover:border-[#6A6A6A] transition-colors duration-300" />

                {/* Oversized number watermark */}
                <div className="text-[7rem] font-light text-white/[0.03] leading-none select-none font-numeric-tabular mb-2 -ml-1 group-hover:text-white/[0.06] transition-colors duration-500">
                  {step.number}
                </div>

                <h3 className="text-base font-medium text-white mb-3 tracking-tight group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="text-xs text-[#4a4a4a] leading-relaxed group-hover:text-[#6A6A6A] transition-colors duration-300">
                  {step.description}
                </p>

                {/* Hover accent line */}
                <div className="mt-6 h-px bg-[#3E3E3E] w-0 group-hover:w-8 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet: Vertical stacked */}
        <div className="lg:hidden space-y-0 divide-y divide-[#1e1e1e]">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="process-item opacity-0 translate-y-8 transition-all duration-700 group flex gap-6 py-8 hover:pl-2 transition-all duration-300"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Number */}
              <span className="font-mono text-[10px] tracking-widest text-[#3E3E3E] font-numeric-tabular pt-1 flex-shrink-0">
                {step.number}
              </span>

              <div>
                <h3 className="text-lg font-light text-white mb-2 group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4a4a4a] leading-relaxed group-hover:text-[#6A6A6A] transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom caption */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#1a1a1a] process-item opacity-0 translate-y-8 transition-all duration-700">
          <p className="text-xs text-[#3E3E3E] font-light leading-relaxed max-w-2xl">
            Every phase is informed by cultural intelligence, technical expertise, and market research — ensuring your brand resonates authentically while operating on a world-class digital foundation.
          </p>
        </div>
      </div>
    </section>
  )
}
