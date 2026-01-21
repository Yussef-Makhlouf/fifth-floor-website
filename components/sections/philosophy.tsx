'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import GridBackground, { DotPattern } from '@/components/ui/grid-background'

const philosophyPoints = [
  {
    id: 1,
    title: 'Strategic Foundation',
    description: 'Every great brand begins with a clear understanding of purpose. We build foundations that endure.',
  },
  {
    id: 2,
    title: 'Conceptual Depth',
    description: 'Ideas that go beyond surface aesthetics. We craft narratives that resonate on multiple levels.',
  },
  {
    id: 3,
    title: 'Refined Execution',
    description: 'Precision in every detail. From concept to delivery, we maintain the highest standards.',
  },
]

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100')
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
      className="section-padding relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <ArchitecturalShapes
        variant="rectangle"
        size="lg"
        className="absolute top-20 -right-20 rotate-12"
        opacity={0.05}
      />
      <div className="absolute bottom-1/4 left-0 w-px h-48 bg-[#919191] opacity-20" />

      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/logos/fifth-decore-dark.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Fading Grid Background - Top */}
      {/* <GridBackground
        fadeFrom="top"
        gridColor="#919191"
        gridSizeX={22}
        gridSizeY={30}
        opacity={0.18}
      /> */}

      {/* Dot Pattern - Bottom Right Corner */}
      <DotPattern
        fadeFrom="corner-br"
        dotColor="#6A6A6A"
        dotSize={1}
        spacing={30}
        opacity={0.12}
      />

      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column - Header */}
          <div className="lg:col-span-5">
            <p className="section-label mb-4 text-[#6A6A6A]">Our Approach</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#3E3E3E] mb-6">
              Philosophy
            </h2>
            <div className="w-20 h-px bg-[#919191] mb-8" />
            <p className="text-lg text-[#6A6A6A] leading-relaxed">
              At Fifth Floor, we believe in the power of restraint.
              Great ideas need space to breathe, and powerful brands
              require a foundation of clarity and purpose.
            </p>
          </div>

          {/* Right Column - Philosophy Points */}
          <div className="lg:col-span-7 space-y-0">
            {philosophyPoints.map((point, idx) => (
              <div
                key={point.id}
                className="philosophy-item opacity-0 translate-y-6 transition-all duration-700"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Divider */}
                <div className="h-px bg-[#919191] opacity-40" />

                {/* Content Row */}
                <div className="py-10 md:py-12 group">
                  <div className="flex gap-6 md:gap-8">
                    {/* Number */}
                    <span className="text-sm text-[#919191] font-light pt-1">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Text */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#3E3E3E] mb-4 group-hover:translate-x-1 transition-transform duration-300">
                        {point.title}
                      </h3>
                      <p className="text-base text-[#6A6A6A] leading-relaxed max-w-lg">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Final Divider */}
            <div className="h-px bg-[#919191] opacity-40" />
          </div>
        </div>
      </div>
    </section>
  )
}
