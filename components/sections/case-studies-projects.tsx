'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects, type Project } from '@/lib/projects-data'
import { ArrowRight } from 'lucide-react'

// Re-export for backward compat with app/case-studies/page.tsx
export { projects }
export type { Project }

interface CaseStudiesProjectsProps {
    activeFilter: string
}

// ─── Card Cover Media ──────────────────────────────────────────────────────
function CardCover({ project }: { project: Project }) {
    if (project.coverType === 'video') {
        return (
            <video
                src={project.coverImage}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
        )
    }
    if (project.coverType === 'svg') {
        return (
            <img
                src={project.coverImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ background: '#f5f4f1' }}
            />
        )
    }
    return (
        <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
    )
}

export default function CaseStudiesProjects({ activeFilter }: CaseStudiesProjectsProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    const filteredProjects =
        activeFilter === 'All'
            ? projects
            : projects.filter((p) => p.categoryFilter === activeFilter)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                    }
                })
            },
            { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
        )

        const items = sectionRef.current?.querySelectorAll('.reveal-item')
        items?.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [filteredProjects])

    return (
        <section ref={sectionRef} className="bg-white relative">
            <div className="w-full h-px bg-[#e5e5e5]" />

            {filteredProjects.map((project, idx) => {
                const isReversed = idx % 2 !== 0

                return (
                    <div
                        key={project.id}
                        className="project-block relative w-full border-b border-[#e5e5e5] group"
                        data-category={project.categoryFilter}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* ── Sticky Brand Identifier ─────────────────── */}
                            <div
                                className={`relative lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden border-b lg:border-b-0 ${
                                    isReversed ? 'lg:order-2 lg:border-l' : 'lg:border-r'
                                } border-[#e5e5e5] bg-[#fafafa]`}
                            >
                                {/* Watermark number */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                    <span className="font-mono text-[24vw] sm:text-[20vw] lg:text-[12vw] font-light text-[#e0e0e0]/40 leading-none transition-transform duration-700 group-hover:scale-105">
                                        {project.number}
                                    </span>
                                </div>

                                {/* Identifier content */}
                                <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center lg:text-left">
                                    <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700">
                                        <span className="inline-block px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-[#6A6A6A] border border-[#e0e0e0] bg-white mb-6">
                                            {project.category}
                                        </span>
                                    </div>

                                    <h3
                                        className="reveal-item opacity-0 translate-y-6 transition-all duration-700 text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a1a] mb-4 leading-snug tracking-tight"
                                        style={{ transitionDelay: '0.08s' }}
                                    >
                                        {project.client}
                                    </h3>

                                    <div
                                        className="reveal-item opacity-0 translate-y-6 transition-all duration-700 flex items-center gap-3 justify-center lg:justify-start"
                                        style={{ transitionDelay: '0.16s' }}
                                    >
                                        <div className="w-6 h-px bg-[#3E3E3E]" />
                                        <span className="font-mono text-xs font-semibold tracking-widest text-[#919191]">
                                            {project.year}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* ── Detail + Mockup Side ─────────────────────── */}
                            <div
                                className={`relative min-h-[80vh] lg:min-h-screen flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20 ${
                                    isReversed ? 'lg:order-1' : ''
                                }`}
                            >
                                <h4
                                    className="reveal-item opacity-0 translate-y-6 transition-all duration-700 text-2xl sm:text-3xl lg:text-4xl font-light text-[#1a1a1a] mb-4 leading-snug tracking-tight"
                                    style={{ transitionDelay: '0.24s' }}
                                >
                                    {project.title}
                                </h4>

                                <div
                                    className="reveal-item opacity-0 translate-y-6 transition-all duration-700 w-10 h-px bg-[#1a1a1a] mb-6"
                                    style={{ transitionDelay: '0.32s' }}
                                />

                                <p
                                    className="reveal-item opacity-0 translate-y-6 transition-all duration-700 text-sm sm:text-base text-[#6A6A6A] font-light leading-relaxed mb-10 max-w-lg"
                                    style={{ transitionDelay: '0.40s' }}
                                >
                                    {project.description}
                                </p>

                                {/* Metrics */}
                                <div
                                    className="reveal-item opacity-0 translate-y-6 transition-all duration-700 grid grid-cols-3 mb-10 border border-[#e5e5e5]"
                                    style={{ transitionDelay: '0.48s' }}
                                >
                                    {project.metrics.map((metric, mIdx) => (
                                        <div
                                            key={metric.label}
                                            className={`p-4 sm:p-5 text-center ${mIdx < 2 ? 'border-r border-[#e5e5e5]' : ''}`}
                                        >
                                            <div className="font-mono text-lg sm:text-2xl font-light text-[#1a1a1a] mb-1">
                                                {metric.value}
                                            </div>
                                            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#919191]">
                                                {metric.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div
                                    className="reveal-item opacity-0 translate-y-6 transition-all duration-700 flex flex-wrap gap-2 mb-10"
                                    style={{ transitionDelay: '0.56s' }}
                                >
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-[9px] uppercase tracking-wider text-[#919191] border border-[#e5e5e5]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* ── CTA Link → dedicated page ─────────────── */}
                                <Link
                                    href={`/case-studies/${project.slug}`}
                                    className="reveal-item opacity-0 translate-y-6 transition-all duration-700 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#1a1a1a] font-medium mb-12 cursor-pointer group/link w-fit"
                                    style={{ transitionDelay: '0.64s' }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span className="border-b border-transparent group-hover/link:border-[#1a1a1a] transition-all pb-0.5">
                                        Explore Case Study
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                                </Link>

                                {/* ── Mockup Frame ──────────────────────────── */}
                                <Link
                                    href={`/case-studies/${project.slug}`}
                                    className="reveal-item opacity-0 translate-y-6 transition-all duration-700 block"
                                    style={{ transitionDelay: '0.72s' }}
                                >
                                    <div className="border border-[#e5e5e5] bg-[#0f0f0f] overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                                        {/* Browser bar */}
                                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a1a] border-b border-white/10">
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                            </div>
                                            <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
                                                {project.client} · Case Study
                                            </span>
                                            <div className="w-10" />
                                        </div>
                                        {/* Cover */}
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <CardCover project={project} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}

            {filteredProjects.length === 0 && (
                <div className="py-32 text-center">
                    <p className="text-sm font-mono text-[#919191]">No projects match this filter.</p>
                </div>
            )}
        </section>
    )
}
