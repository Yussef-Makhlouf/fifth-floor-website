'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'

const philosophyPoints = [
  {
    id: 1,
    title: 'Strategic Foundation',
    description: 'Every iconic brand begins with absolute clarity of purpose. We build enduring foundations that resist transient trends.',
  },
  {
    id: 2,
    title: 'Conceptual Depth',
    description: 'Ideas that transcend superficial aesthetics. We engineer narrative systems that resonate deeply across digital and physical touchpoints.',
  },
  {
    id: 3,
    title: 'Refined Execution',
    description: 'Relentless spatial and visual precision. From initial blueprint to final installation, we enforce uncompromising standards.',
  },
]

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-6')
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = sectionRef.current?.querySelectorAll('.philosophy-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="philosophy"
      className="py-28 md:py-40 bg-[#F7F6F3] text-[#1A1A1C] relative overflow-hidden hairline-grid-light"
    >
      {/* Background Decor */}
      <ArchitecturalShapes
        variant="rectangle"
        size="lg"
        className="absolute top-20 -right-20 rotate-12 text-[#1A1A1C]"
        opacity={0.06}
      />
      
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/logos/fifth-decore-dark.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10" ref={sectionRef}>
        {/* Two Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column - Sticky Section Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <span className="text-xs uppercase tracking-[0.35em] text-[#8E8D8A] font-mono mb-4 block">
              // Our Mindset
            </span>
            <h2 className="text-5xl md:text-7xl font-bold font-syne-display tracking-tighter text-[#1A1A1C] mb-6 leading-[0.98]">
              Core <br />
              <span className="font-serif-accent text-[#55555A] font-normal italic">Philosophy.</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#1A1A1C] mb-8 opacity-30" />
            <p className="text-base text-[#55555A] leading-relaxed max-w-md font-sans">
              At Fifth Floor, we believe in the power of calculated restraint.
              Great concepts require breathing space, and powerful brands thrive on clarity, intent, and unyielding execution.
            </p>
          </div>

          {/* Right Column - Accordion Editorial Items */}
          <div className="lg:col-span-7 space-y-0">
            {philosophyPoints.map((point, idx) => (
              <div
                key={point.id}
                className="philosophy-item opacity-0 translate-y-6 transition-all duration-700"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Divider Line */}
                <div className="h-px bg-[#1A1A1C]/15" />

                {/* Content Block */}
                <div className="py-10 md:py-14 group">
                  <div className="flex gap-6 md:gap-10 items-start">
                    {/* Number */}
                    <span className="text-xs font-mono font-numeric-tabular text-[#8E8D8A] pt-1">
                      0{idx + 1}
                    </span>

                    {/* Text */}
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-4xl font-bold font-syne-display text-[#1A1A1C] group-hover:translate-x-2 transition-transform duration-300">
                        {point.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#55555A] leading-relaxed max-w-xl font-sans">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Final Divider */}
            <div className="h-px bg-[#1A1A1C]/15" />
          </div>
        </div>
      </div>
    </section>
  )
}
