'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  height: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Minimalist headquarters',
    category: 'Architecture',
    image: '/images/services/brand-strategy.png',
    height: 'aspect-[4/3] sm:aspect-[3/2] md:h-96'
  },
  {
    id: 2,
    title: 'Future retail experience',
    category: 'Spatial design',
    image: '/images/services/booths.png',
    height: 'aspect-[4/5] sm:aspect-[3/4] md:h-[30rem]'
  },
  {
    id: 3,
    title: 'Tech summit gala',
    category: 'Event production',
    image: '/images/services/events.png',
    height: 'aspect-[16/10] sm:aspect-[4/3] md:h-72'
  },
  {
    id: 4,
    title: 'Urban brand activation',
    category: 'Experiential',
    image: '/images/services/marketing.png',
    height: 'aspect-[4/3] sm:aspect-square md:h-80'
  },
  {
    id: 5,
    title: 'Digital art installation',
    category: 'Creative tech',
    image: '/images/services/creative.png',
    height: 'aspect-[3/4] sm:aspect-[4/5] md:h-[26rem]'
  },
  {
    id: 6,
    title: 'Corporate identity system',
    category: 'Branding',
    image: '/images/services/branding.png',
    height: 'aspect-[16/10] sm:aspect-[4/3] md:h-64'
  }
]

export default function VisualEvidence() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.08 }
    )

    const items = sectionRef.current?.querySelectorAll('.visual-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#f9f9f9] border-t border-[#ebebeb] overflow-hidden">

      <div className="max-w-[1400px] mx-auto relative z-10" ref={sectionRef}>

        {/* Header — asymmetric: number left, content right */}
        <div className="mb-14 sm:mb-20 md:mb-24 flex gap-8 md:gap-16">
          {/* Section number */}
          <div className="hidden md:block flex-shrink-0 pt-1.5">
            <span className="font-mono text-[10px] tracking-widest text-[#c8c8c8] font-numeric-tabular">06</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 flex-1 visual-item opacity-0 translate-y-10 transition-all duration-700">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-[#b0b0b0] font-medium mb-4">Selected works</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a1a1a] leading-[1.05] tracking-tight">
                Visual Creatives
              </h2>
            </div>
            <div className="sm:text-right pb-1">
              <p className="text-sm text-[#919191] max-w-xs leading-relaxed">
                A curated selection of our commitment to cinematic quality, cultural authenticity, and precise execution.
              </p>
            </div>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              className={`visual-item break-inside-avoid relative group cursor-pointer overflow-hidden bg-[#e8e8e8] transition-all duration-700 ease-out opacity-0 translate-y-10`}
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              <div className={`relative w-full ${item.height} overflow-hidden`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#0f0f0f]/0 group-hover:bg-[#0f0f0f]/30 transition-colors duration-500" />

                {/* Info panel — slides up on hover (desktop) / always visible (mobile) */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5
                  bg-gradient-to-t from-[#0f0f0f]/85 via-[#0f0f0f]/40 to-transparent
                  sm:translate-y-full sm:group-hover:translate-y-0
                  transition-transform duration-400 ease-out">
                  <p className="text-[8px] sm:text-[9px] text-white/60 uppercase tracking-[0.22em] mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-sm sm:text-base text-white font-light leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer — linked, not dead */}
        <div className="mt-16 sm:mt-20 border-t border-[#e8e8e8] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 visual-item opacity-0 translate-y-10 transition-all duration-700">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] hover:text-[#919191] transition-colors duration-300"
          >
            <span>Explore full portfolio</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <span className="font-mono text-[9px] tracking-widest text-[#c0c0c0] font-numeric-tabular">
            01 / {String(galleryItems.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
