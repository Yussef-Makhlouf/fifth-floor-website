'use client'

import { useRef, useEffect } from 'react'

const differentiators = [
  {
    number: '01',
    title: 'Cultural authority',
    description: 'Our portfolio spans government entities, cultural institutions, and premium brands across the GCC — work that carries weight and earns trust.'
  },
  {
    number: '02',
    title: 'Modern engineering',
    description: 'Deep MERN + Next.js expertise. Every digital asset is built on a proven, scalable foundation — not a template dressed up to look custom.'
  },
  {
    number: '03',
    title: 'Editorial precision',
    description: 'From kerning to code architecture, every detail is considered. Precision is the standard, not a differentiator — it is the baseline.'
  },
  {
    number: '04',
    title: 'Regional intelligence',
    description: 'Nuanced understanding of GCC market dynamics across Saudi, UAE, and Kuwait — ensuring work complies locally while meeting global benchmarks.'
  },
  {
    number: '05',
    title: 'End-to-end ownership',
    description: 'Brand strategy to server deployment, handled by one team. No handoffs, no communication gaps, no finger-pointing across vendors.'
  },
  {
    number: '06',
    title: 'Long-term partnerships',
    description: 'Our relationships often span years, not projects. We are invested in your growth trajectory, not just the initial delivery.'
  }
]

export default function Differentiation() {
  const sectionRef = useRef<HTMLDivElement>(null)

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
      { threshold: 0.08 }
    )

    const items = sectionRef.current?.querySelectorAll('.diff-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-16 lg:px-24 bg-[#f9f9f9] border-t border-[#e8e8e8] overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        {/* Two-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 xl:gap-32">

          {/* Left — Sticky label column */}
          <div className="lg:sticky lg:top-32 lg:self-start diff-item opacity-0 translate-y-8 transition-all duration-700">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#6A6A6A] font-medium">Why Fifth Floor</p>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-tight text-[#1a1a1a] mb-8">
              Authority<br />
              <span className="text-[#919191]">&amp; experience.</span>
            </h2>

            <p className="text-sm text-[#6A6A6A] leading-relaxed max-w-sm mb-12">
              We operate with the precision of a luxury house, the rigor of a cultural institution, and the engineering depth of a modern tech studio.
            </p>

            {/* Studio stat */}
            <div className="border-t border-[#e0e0e0] pt-8 space-y-6">
              <div>
                <p className="text-3xl font-light text-[#1a1a1a] font-numeric-tabular tracking-tight">12+</p>
                <p className="text-xs uppercase tracking-widest text-[#919191] mt-1">Creative disciplines</p>
              </div>
              <div>
                <p className="text-3xl font-light text-[#1a1a1a] font-numeric-tabular tracking-tight">8</p>
                <p className="text-xs uppercase tracking-widest text-[#919191] mt-1">Years in the GCC</p>
              </div>
              <div>
                <p className="text-3xl font-light text-[#1a1a1a] font-numeric-tabular tracking-tight">100%</p>
                <p className="text-xs uppercase tracking-widest text-[#919191] mt-1">Client retention rate</p>
              </div>
            </div>
          </div>

          {/* Right — Numbered editorial rows */}
          <div className="space-y-0 divide-y divide-[#e8e8e8]">
            {differentiators.map((item, idx) => (
              <div
                key={idx}
                className="diff-item opacity-0 translate-y-8 transition-all duration-700 group flex gap-8 py-8 sm:py-10 hover:pl-2 transition-all duration-300 cursor-default"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Number */}
                <span className="font-mono text-[11px] tracking-widest text-[#c8c8c8] font-numeric-tabular pt-1 flex-shrink-0 group-hover:text-[#919191] transition-colors duration-300">
                  {item.number}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl sm:text-2xl font-light text-[#1a1a1a] leading-snug group-hover:text-[#3E3E3E] transition-colors duration-300 tracking-tight">
                      {item.title}
                    </h3>
                    {/* Arrow that slides in on hover */}
                    <svg
                      className="w-4 h-4 text-[#c8c8c8] group-hover:text-[#6A6A6A] group-hover:translate-x-0.5 transition-all duration-300 mt-1.5 flex-shrink-0"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <p className="text-sm text-[#919191] leading-relaxed max-w-lg group-hover:text-[#6A6A6A] transition-colors duration-300">
                    {item.description}
                  </p>
                  {/* Animated underline */}
                  <div className="mt-4 h-px bg-[#3E3E3E] w-0 group-hover:w-12 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom manifesto quote */}
        <div className="mt-20 sm:mt-28 pt-12 border-t border-[#e8e8e8] diff-item opacity-0 translate-y-8 transition-all duration-700">
          <blockquote className="max-w-3xl">
            <p className="text-lg sm:text-2xl font-light leading-relaxed text-[#3E3E3E] italic">
              "FIFTH FLOOR delivers technical services and expansion strategies for digital presence — serving all sectors and leading enterprises with confidence, high-quality support, and flexibility."
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-6 h-px bg-[#919191]" />
              <p className="text-[10px] uppercase tracking-widest text-[#919191]">Studio Philosophy</p>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
