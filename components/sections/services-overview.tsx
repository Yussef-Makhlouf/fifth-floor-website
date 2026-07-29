'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  allServices,
  serviceCategories,
  ServiceCategory,
  ServiceItem,
} from '@/lib/data/services'

const categoryMeta: Record<
  ServiceCategory | 'All',
  { label: string; description: string }
> = {
  All: {
    label: 'All Services',
    description: 'The full spectrum of what FIFTH FLOOR builds, crafts, and deploys for ambitious brands.',
  },
  Identity: {
    label: 'Identity',
    description: 'Brand strategy and visual identity systems that define how the world perceives you.',
  },
  Marketing: {
    label: 'Marketing',
    description: 'Social media, digital marketing, and campaign production that moves markets.',
  },
  Digital: {
    label: 'Digital',
    description: 'UI and UX for mobile and web — designed with precision, built for humans.',
  },
  Creative: {
    label: 'Creative',
    description: 'Offline design, printing, and physical productions that make brands tangible.',
  },
  Production: {
    label: 'Production',
    description: 'Photo, video, voice, modeling, and CGI — cinematic quality at every frame.',
  },
  Technology: {
    label: 'Technology',
    description: 'AI solutions and business development for the future-ready enterprise.',
  },
}

const categoryOrder: (ServiceCategory | 'All')[] = [
  'All',
  ...serviceCategories,
]

/* ─── Editorial Zig-Zag Service Card (Previous Premium Design) ─── */
function EditorialServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const isReversed = index % 2 !== 0

  return (
    <article
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div
        className={`relative flex flex-col ${
          isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
        } bg-white hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] transition-all duration-700 overflow-hidden border border-[#f0f0f0] hover:border-[#e0e0e0]`}
      >
        {/* Image Side */}
        <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[380px] overflow-hidden bg-[#f5f5f5]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 ${
              isReversed ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
            } from-transparent via-transparent to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
          />

          {/* Category label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[9px] uppercase tracking-[0.2em] text-[#3E3E3E] font-medium">
              {service.category}
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="relative w-full md:w-1/2 p-8 md:p-10 lg:p-14 flex flex-col justify-center">
          {/* Animated left border accent */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#3E3E3E] scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-500 hidden md:block" />

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-10 h-10 mb-6 bg-[#f5f5f5] text-[#3E3E3E] group-hover:bg-[#1a1a1a] group-hover:text-white transition-all duration-400">
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-light text-[#1a1a1a] mb-4 leading-tight tracking-tight group-hover:text-[#0a0a0a] transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#6A6A6A] text-sm leading-relaxed mb-7">
            {service.description}
          </p>

          {/* Keywords — styled as bordered chips */}
          <div className="flex flex-wrap gap-2 pt-5 border-t border-[#f0f0f0] mb-6">
            {service.keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-[9px] uppercase tracking-[0.18em] text-[#919191] border border-[#ebebeb] px-2.5 py-1 group-hover:border-[#c0c0c0] transition-colors duration-300"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Explore link */}
          <a
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.2em] text-[#919191] group-hover:text-[#1a1a1a] transition-all duration-300 mt-auto"
          >
            <span>Explore service</span>
            <svg
              className="w-3 h-3 transform group-hover:translate-x-1.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <span className="block w-0 group-hover:w-8 h-px bg-[#1a1a1a] transition-all duration-500" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function ServicesOverview() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'All'>('All')

  const filtered =
    activeCategory === 'All'
      ? allServices
      : allServices.filter((s) => s.category === activeCategory)

  const meta = categoryMeta[activeCategory]

  return (
    <section id="services-overview" className="relative bg-white border-t border-[#f0f0f0] overflow-hidden">
      {/* ── Sticky Category Filter Bar ── */}
      <div className="sticky top-[64px] sm:top-[72px] z-30 bg-white/95 backdrop-blur-xl border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
          <div
            className="flex items-center gap-0 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Filter eyebrow */}
            <div className="hidden md:flex items-center gap-3 pr-6 py-4 border-r border-[#ebebeb] mr-2 shrink-0">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#919191] font-medium">
                Filter
              </span>
            </div>

            {categoryOrder.map((cat) => {
              const isActive = activeCategory === cat
              const count =
                cat === 'All'
                  ? allServices.length
                  : allServices.filter((s) => s.category === cat).length

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`group shrink-0 inline-flex items-center gap-2.5 px-5 py-4 text-[10px] sm:text-xs uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-200 border-r border-[#ebebeb] first:border-l ${
                    isActive
                      ? 'bg-[#1a1a1a] text-white font-medium'
                      : 'bg-transparent text-[#6A6A6A] hover:text-[#1a1a1a] hover:bg-[#fafafa]'
                  }`}
                >
                  <span>{cat === 'All' ? 'All' : categoryMeta[cat].label}</span>
                  <span
                    className={`font-mono text-[9px] tracking-widest transition-colors duration-200 ${
                      isActive ? 'text-white/60' : 'text-[#919191] group-hover:text-[#3E3E3E]'
                    }`}
                  >
                    [{String(count).padStart(2, '0')}]
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Section intro ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 pt-16 sm:pt-20 pb-10 sm:pb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6A6A6A] font-medium">
                {activeCategory === 'All' ? 'Full Service Portfolio' : `${activeCategory} Services`}
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light leading-tight text-[#1a1a1a] tracking-tight">
              {activeCategory === 'All' ? (
                <>What we <span className="text-[#919191]">build.</span></>
              ) : (
                <>{categoryMeta[activeCategory].label} <span className="text-[#919191]">excellence.</span></>
              )}
            </h2>
          </div>
          <p className="text-sm text-[#6A6A6A] max-w-sm leading-relaxed sm:text-right">
            {meta.description}
          </p>
        </div>
      </div>

      {/* ── Services Stacked Editorial Cards ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 pb-24 sm:pb-32 space-y-6 sm:space-y-8">
        {filtered.map((service, idx) => (
          <EditorialServiceCard key={service.slug} service={service} index={idx} />
        ))}

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-sm font-mono text-[#919191]">No services in this category.</p>
          </div>
        )}
      </div>

      {/* ── Bottom Statement ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 pb-20 sm:pb-28 pt-0 border-t border-[#f0f0f0]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-10">
          <p className="text-xs text-[#919191] max-w-lg leading-relaxed">
            FIFTH FLOOR delivers technical and creative services to serve all sectors and leading enterprises across the GCC with confidence and flexibility.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] hover:text-[#6A6A6A] transition-colors"
          >
            <span>Discuss your project</span>
            <svg
              className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
