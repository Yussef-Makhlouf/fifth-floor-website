'use client'

import { useState } from 'react'
import { allServices, serviceCategories, ServiceCategory } from '@/lib/data/services'

export default function ServiceBreakdown() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(serviceCategories[0])
  const [activeIndex, setActiveIndex] = useState(0)

  const filtered = allServices.filter((s) => s.category === activeCategory)
  const active = filtered[activeIndex] ?? filtered[0]

  const handleCategoryChange = (cat: ServiceCategory) => {
    setActiveCategory(cat)
    setActiveIndex(0)
  }

  return (
    <section className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-16 lg:px-24 bg-white border-t border-[#f0f0f0] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-16 sm:mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#6A6A6A] font-medium">Service Architecture</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light leading-tight text-[#1a1a1a] tracking-tight">
              Deep service<br />
              <span className="text-[#919191]">breakdown.</span>
            </h2>
          </div>

          {/* Category switcher */}
          <div className="flex flex-wrap gap-px border border-[#e8e8e8] self-start sm:self-end">
            {serviceCategories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] font-medium transition-all duration-200 ${
                  idx > 0 ? 'border-l border-[#e8e8e8]' : ''
                } ${
                  activeCategory === cat
                    ? 'bg-[#1a1a1a] text-white'
                    : 'text-[#919191] hover:text-[#3E3E3E] hover:bg-[#f5f5f5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout: sidebar + detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-0 border border-[#ebebeb]">

          {/* Sidebar — Service list */}
          <nav className="border-r border-[#ebebeb] bg-[#fafafa]" aria-label="Service navigation">
            {filtered.map((service, idx) => (
              <button
                key={service.slug}
                onClick={() => setActiveIndex(idx)}
                className={`w-full text-left px-6 py-5 border-b border-[#ebebeb] last:border-b-0 flex items-center justify-between gap-3 group transition-all duration-200 ${
                  idx === activeIndex
                    ? 'bg-white border-l-2 border-l-[#1a1a1a] pl-5'
                    : 'hover:bg-white hover:border-l-2 hover:border-l-[#ddd] hover:pl-5'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="font-mono text-[9px] tracking-widest text-[#c0c0c0] font-numeric-tabular pt-0.5 flex-shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-sm leading-snug transition-colors duration-200 ${
                      idx === activeIndex
                        ? 'text-[#1a1a1a] font-medium'
                        : 'text-[#6A6A6A] group-hover:text-[#1a1a1a]'
                    }`}
                  >
                    {service.title}
                  </span>
                </div>
                {idx === activeIndex && (
                  <svg className="w-3 h-3 text-[#1a1a1a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          {/* Detail panel */}
          {active && (
            <div key={`${activeCategory}-${activeIndex}`} className="p-8 sm:p-10 lg:p-12 animate-fade-in">

              {/* Category badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#919191] font-medium border border-[#e8e8e8] px-2.5 py-1">
                  {active.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-light text-[#1a1a1a] mb-4 leading-snug tracking-tight">
                {active.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#6A6A6A] leading-relaxed mb-10 max-w-2xl">
                {active.description}
              </p>

              {/* What we do + Outcomes */}
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 mb-10">

                {/* What we do */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] font-semibold mb-5 pb-2 border-b border-[#f0f0f0]">
                    What we do
                  </h4>
                  <ul className="space-y-3">
                    {active.whatWeDo.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#6A6A6A] hover:text-[#1a1a1a] transition-colors duration-200 group">
                        <span className="text-[#c0c0c0] group-hover:text-[#6A6A6A] transition-colors mt-0.5 flex-shrink-0 font-mono text-xs">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] font-semibold mb-5 pb-2 border-b border-[#f0f0f0]">
                    Outcomes
                  </h4>
                  <ul className="space-y-3">
                    {active.outcomes.map((outcome, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#6A6A6A] hover:text-[#1a1a1a] transition-colors duration-200 group">
                        <span className="text-[#c0c0c0] group-hover:text-[#6A6A6A] transition-colors mt-0.5 flex-shrink-0 font-mono text-xs">→</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service link */}
              <div className="pt-6 border-t border-[#f0f0f0]">
                <a
                  href={`/services/${active.slug}`}
                  className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#919191] hover:text-[#1a1a1a] transition-colors duration-300"
                >
                  <span>View full service details</span>
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="block w-0 group-hover:w-8 h-px bg-[#1a1a1a] transition-all duration-500" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom statement */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-[#f0f0f0]">
          <p className="text-xs text-[#919191] max-w-lg leading-relaxed">
            Each service is structured for clarity and impact, ensuring every deliverable drives measurable business outcomes for ambitious brands across the GCC.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] hover:text-[#919191] transition-colors"
          >
            <span>Discuss your project</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
