'use client'

import { useEffect, useRef } from 'react'
import GridBackground from '@/components/ui/grid-background'

const clients = [
  'Ministry of Culture',
  'Kuwait Investment Authority',
  'Dubai Design District',
  'Al Marai Group',
  'KIPCO',
  'The Avenues',
  'Zain Group',
  'National Bank of Kuwait',
]

export default function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null)

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#3E3E3E] relative overflow-hidden">
      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-20 bg-[#6A6A6A] opacity-30" />

      {/* Fading Grid Background - Center */}
      <GridBackground
        fadeFrom="center"
        gridColor="#6A6A6A"
        gridSizeX={24}
        gridSizeY={32}
        opacity={0.1}
      />

      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto opacity-0 transition-opacity duration-1000"
      >
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="section-label mb-4 text-[#919191]">Trusted By</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#CFCFCF]">
            Select Clients
          </h2>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-12">
          {clients.map((client, idx) => (
            <div
              key={client}
              className="text-center group"
              style={{
                animation: `fadeIn 0.6s ease-out ${idx * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <span className="text-sm md:text-base text-[#919191] group-hover:text-[#CFCFCF] transition-colors duration-300">
                {client}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <div className="w-24 h-px bg-[#6A6A6A] opacity-40" />
        </div>
      </div>
    </section>
  )
}
