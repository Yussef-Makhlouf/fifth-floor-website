'use client'

import { useRef, useEffect } from 'react'

const categories = [
    'All',
    'Brand Strategy',
    'Events',
    'Booths',
    'Digital',
    'Marketing',
]

interface CaseStudiesFilterProps {
    activeFilter: string
    onFilterChange: (filter: string) => void
    projectCounts: Record<string, number>
}

export default function CaseStudiesFilter({ activeFilter, onFilterChange, projectCounts }: CaseStudiesFilterProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const activeRef = useRef<HTMLButtonElement>(null)

    // Scroll active button into view on mobile
    useEffect(() => {
        if (activeRef.current && scrollRef.current) {
            const container = scrollRef.current
            const btn = activeRef.current
            const containerLeft = container.scrollLeft
            const containerRight = containerLeft + container.clientWidth
            const btnLeft = btn.offsetLeft
            const btnRight = btnLeft + btn.clientWidth

            if (btnLeft < containerLeft + 16) {
                container.scrollTo({ left: btnLeft - 16, behavior: 'smooth' })
            } else if (btnRight > containerRight - 16) {
                container.scrollTo({ left: btnRight - container.clientWidth + 16, behavior: 'smooth' })
            }
        }
    }, [activeFilter])

    return (
        <div id="case-studies" className="sticky top-[64px] sm:top-[72px] z-40 bg-white/95 backdrop-blur-xl border-b border-[#e5e5e5]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
                <div
                    ref={scrollRef}
                    className="flex items-center gap-0 overflow-x-auto scroll-smooth py-0 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Filter Eyebrow */}
                    <div className="hidden md:flex items-center gap-3 pr-6 py-4 border-r border-[#ebebeb] mr-2 shrink-0">
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#919191] font-medium">
                            Filter
                        </span>
                    </div>

                    {categories.map((cat) => {
                        const isActive = activeFilter === cat
                        const count = cat === 'All'
                            ? Object.values(projectCounts).reduce((a, b) => a + b, 0)
                            : (projectCounts[cat] || 0)

                        return (
                            <button
                                key={cat}
                                ref={isActive ? activeRef : undefined}
                                onClick={() => onFilterChange(cat)}
                                className={`group shrink-0 inline-flex items-center gap-2.5 px-5 py-4 text-[10px] sm:text-xs uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-200 border-r border-[#ebebeb] first:border-l ${
                                    isActive
                                        ? 'bg-[#1a1a1a] text-white font-medium'
                                        : 'bg-transparent text-[#6A6A6A] hover:text-[#1a1a1a] hover:bg-[#fafafa]'
                                }`}
                            >
                                <span>{cat}</span>
                                {/* Tabular Count Badge */}
                                <span
                                    className={`font-mono text-[9px] tracking-widest font-numeric-tabular transition-colors duration-200 ${
                                        isActive
                                            ? 'text-white/60'
                                            : 'text-[#919191] group-hover:text-[#3E3E3E]'
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
    )
}
