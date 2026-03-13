'use client'

import Image from 'next/image'
import { ServiceItem } from '@/lib/data/services'

export default function ServiceDetailHero({ service }: { service: ServiceItem }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex items-center gap-3 animate-slide-up">
              <div className="w-8 sm:w-12 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-widest text-[#6A6A6A]">Service Overview</p>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#3E3E3E] leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {service.title}
            </h1>
            
            <p className="text-base sm:text-lg text-[#6A6A6A] leading-relaxed max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {service.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {service.keywords.map((keyword) => (
                <span key={keyword} className="px-4 py-2 bg-[#919191]/10 text-xs uppercase tracking-widest text-[#3E3E3E] rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full lg:w-1/2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl">
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3E3E3E]/40 via-transparent to-transparent" />
              
              {/* Icon floating */}
              <div className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#3E3E3E] shadow-xl">
                {service.icon}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
