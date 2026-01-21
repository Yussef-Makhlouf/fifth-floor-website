'use client'

import { DotPattern } from '@/components/ui/grid-background'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import { OFFICE_LOCATIONS, SERVICES, COMPANY_INFO } from '@/lib/contact-config'
import CustomMap from '@/components/ui/custom-map'
import { useState } from 'react'
import Image from 'next/image'

export default function ContactInfo() {
  const [activeLocation, setActiveLocation] = useState(0)

  return (
    <section className="relative w-full py-24 md:py-32 px-8 bg-[#f8f8f8] border-t border-[#919191]/20 overflow-hidden">
      {/* Decorative Dot Pattern */}
      <DotPattern
        fadeFrom="corner-br"
        dotColor="#919191"
        opacity={0.15}
      />

      {/* Architectural Shape Decoration */}
      <ArchitecturalShapes
        variant="corner"
        size="md"
        className="absolute top-0 right-0 rotate-90"
        opacity={0.1}
      />

      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/logos/fifth-decore-dark.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* SECTION 1: OUR PRESENCE (MAP + LOCATIONS) */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-16">
            <div className="flex-1">
              <h2 className="text-5xl md:text-7xl font-light tracking-tight text-[#3E3E3E]">
                Our <span className="font-bold">Presence</span>
              </h2>
            </div>
            <p className="text-[#6A6A6A] text-lg max-w-sm pb-2">
              Strategically located to serve the region with creative excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: Interactive Map */}
            <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
              <CustomMap
                activeLocationIndex={activeLocation}
                className="shadow-2xl shadow-black/5"
              />
            </div>

            {/* Right: Location Cards */}
            <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 flex flex-col gap-6">
              {OFFICE_LOCATIONS.map((location, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLocation(idx)}
                  className={`group p-8 border transition-all duration-500 cursor-pointer relative overflow-hidden ${activeLocation === idx
                    ? 'bg-[#3E3E3E] border-[#3E3E3E] text-white shadow-xl scale-105'
                    : 'bg-white border-[#919191]/20 text-[#3E3E3E] hover:border-[#3E3E3E] hover:shadow-lg'
                    }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{location.country}</span>
                      <h3 className={`text-2xl font-bold ${activeLocation === idx ? 'text-white' : 'text-[#3E3E3E]'}`}>
                        {location.region}
                      </h3>
                    </div>
                    {activeLocation === idx && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </div>

                  <div className={`space-y-4 text-sm ${activeLocation === idx ? 'text-white/80' : 'text-[#6A6A6A]'}`}>
                    <div>
                      <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${activeLocation === idx ? 'text-white/60' : 'text-[#3E3E3E]/60'}`}>Address</p>
                      <p className="font-light">{location.office}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${activeLocation === idx ? 'text-white/60' : 'text-[#3E3E3E]/60'}`}>Email</p>
                        <p className="font-light">{location.email}</p>
                      </div>
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${activeLocation === idx ? 'text-white/60' : 'text-[#3E3E3E]/60'}`}>Phone</p>
                        <p className="font-light">{location.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner for active state */}
                  <div className={`absolute -bottom-4 -right-4 w-12 h-12 bg-white/10 rotate-45 transform transition-transform duration-500 ${activeLocation === idx ? 'translate-y-0 translate-x-0' : 'translate-y-full translate-x-full'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: SERVICES GRID */}
        <div className="pt-24 border-t border-[#919191]/10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-[#3E3E3E] text-center">
            Creative Disciplines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.filter(s => s.id !== 'other').map((service, i) => (
              <div
                key={service.id}
                className="group relative p-8 bg-white border border-[#919191]/10 hover:border-[#3E3E3E]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[#3E3E3E]/20 font-mono text-xs">{(i + 1).toString().padStart(2, '0')}</span>
                  <div className="w-8 h-8 rounded-full border border-[#919191]/20 flex items-center justify-center group-hover:bg-[#3E3E3E] group-hover:border-[#3E3E3E] transition-colors duration-300">
                    <svg className="w-3 h-3 text-[#3E3E3E] group-hover:text-white transform -rotate-45 transition-transform duration-300 group-hover:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-[#3E3E3E] group-hover:translate-x-1 transition-transform duration-300">{service.title}</h3>
                <p className="text-[#6A6A6A] text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.description}
                </p>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#3E3E3E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 pt-16 border-t border-[#919191]/10 text-center">
          <p className="text-lg text-[#6A6A6A] mb-6">
            Have a specific requirement?
          </p>
          <a href="#contact_us" className="inline-block px-8 py-3 bg-[#f0f0f0] hover:bg-[#3E3E3E] text-[#3E3E3E] hover:text-white rounded-full transition-colors duration-300 font-medium">
            Contact us for custom requirements
          </a>
          <p className="mt-8 text-xs text-[#919191] uppercase tracking-widest">
            Response time: {COMPANY_INFO.responseTime}
          </p>
        </div>
      </div>
    </section>
  )
}
