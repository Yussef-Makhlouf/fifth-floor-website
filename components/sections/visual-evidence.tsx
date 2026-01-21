'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import GridBackground from '@/components/ui/grid-background'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  height: string // Tailwind class for height or aspect ratio
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Minimalist Headquarters",
    category: "Architecture",
    image: "/images/services/brand-strategy.png", // Using high-quality generated assets
    height: "aspect-[4/3] sm:aspect-[3/2] md:h-96"
  },
  {
    id: 2,
    title: "Future Retail Experience",
    category: "Spatial Design",
    image: "/images/services/booths.png",
    height: "aspect-[4/5] sm:aspect-[3/4] md:h-[30rem]"
  },
  {
    id: 3,
    title: "Tech Summit Gala",
    category: "Event Production",
    image: "/images/services/events.png",
    height: "aspect-[16/10] sm:aspect-[4/3] md:h-72"
  },
  {
    id: 4,
    title: "Urban Brand Activation",
    category: "Experiential",
    image: "/images/services/marketing.png",
    height: "aspect-[4/3] sm:aspect-square md:h-80"
  },
  {
    id: 5,
    title: "Digital Art Installation",
    category: "Creative Tech",
    image: "/images/services/creative.png",
    height: "aspect-[3/4] sm:aspect-[4/5] md:h-[26rem]"
  },
  {
    id: 6,
    title: "Corporate Identity System",
    category: "Branding",
    image: "/images/services/branding.png",
    height: "aspect-[16/10] sm:aspect-[4/3] md:h-64"
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
            entry.target.classList.remove('opacity-0', 'translate-y-12')
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = sectionRef.current?.querySelectorAll('.visual-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-white border-t border-[#919191]/20 overflow-hidden">
      {/* Background Texture */}
      <GridBackground
        fadeFrom="bottom"
        gridColor="#919191"
        opacity={0.08}
        className="fixed inset-0 pointer-events-none"
      />

      {/* Decorative Architectural Shapes */}
      <ArchitecturalShapes
        variant="corner"
        size="lg"
        className="absolute top-0 right-0 text-[#3E3E3E]"
        opacity={0.1}
      />

      <div className="absolute top-40 left-12 w-px h-32 bg-[#3E3E3E] opacity-20 hidden md:block" />

      <div className="max-w-[1400px] mx-auto relative z-10" ref={sectionRef}>
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 md:gap-8">
          <div className="max-w-xl">
            <p className="section-label mb-3 sm:mb-4 md:mb-6 text-[#6A6A6A] text-xs sm:text-sm">Selected Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#3E3E3E] leading-[1.1]">
              Visual Atmosphere
            </h2>
          </div>
          <div className="max-w-sm pb-2">
            <p className="text-[#6A6A6A] leading-relaxed text-xs sm:text-sm md:text-base">
              A curated selection of our commitment to cinematic quality, cultural authenticity, and precise execution.
            </p>
          </div>
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 md:gap-8 space-y-4 sm:space-y-6 md:space-y-8">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              className={`visual-item break-inside-avoid relative group cursor-pointer overflow-hidden bg-[#f0f0f0] rounded-lg sm:rounded-xl transition-all duration-700 ease-out opacity-0 translate-y-12`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className={`relative w-full ${item.height} overflow-hidden`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#3E3E3E]/0 group-hover:bg-[#3E3E3E]/20 transition-colors duration-500" />

                {/* Mobile: Always visible info / Desktop: Hover Content */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 
                  bg-gradient-to-t from-[#3E3E3E]/80 via-[#3E3E3E]/40 to-transparent
                  sm:translate-y-full sm:group-hover:translate-y-0 
                  transition-transform duration-500 ease-out">
                  <p className="text-[10px] sm:text-xs text-[#CFCFCF] uppercase tracking-widest mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-base sm:text-lg md:text-xl text-white font-medium leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-24 border-t border-[#919191]/20 pt-8 flex justify-between items-center text-xs text-[#919191] uppercase tracking-widest">
          <span>Explore Full Portfolio</span>
          <span>01 / 05</span>
        </div>
      </div>
    </section>
  )
}

