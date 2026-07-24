'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ProjectPanel, { ProjectData } from '@/components/ui/project-panel'

export interface Project {
    id: number
    number: string
    title: string
    client: string
    category: string
    year: string
    description: string
    metrics: { label: string; value: string }[]
    tags: string[]
    image: string
}

export const projects: Project[] = [
    {
        id: 1,
        number: '01',
        title: 'National identity reimagined',
        client: 'Ministry of Culture',
        category: 'Brand Strategy',
        year: '2024',
        description: 'A comprehensive brand overhaul for Kuwait\'s cultural arm — redefining how a nation communicates its identity to the world through visual language and strategic positioning.',
        metrics: [
            { label: 'Brand Touchpoints', value: '120+' },
            { label: 'Reach', value: '4.2M' },
            { label: 'Duration', value: '8 mos' },
        ],
        tags: ['Brand Strategy', 'Visual Identity', 'Guidelines'],
        image: '/projects/project-1.png',
    },
    {
        id: 2,
        number: '02',
        title: 'Investment summit experience',
        client: 'Kuwait Investment Forum',
        category: 'Events',
        year: '2024',
        description: 'End-to-end event design for the region\'s premier investment summit — spatial design, branded environments, and immersive attendee experiences across three days.',
        metrics: [
            { label: 'Attendees', value: '2,500+' },
            { label: 'Activation Zones', value: '18' },
            { label: 'Engagement', value: '+340%' },
        ],
        tags: ['Event Design', 'Spatial Branding', 'Experience'],
        image: '/projects/project-2.png',
    },
    {
        id: 3,
        number: '03',
        title: 'Luxury retail presence',
        client: 'Al Raya Collection',
        category: 'Booths',
        year: '2023',
        description: 'Exhibition booth design for a luxury retail brand — transforming a 200sqm footprint into a multi-sensory brand environment that drove record-breaking engagement.',
        metrics: [
            { label: 'Booth Size', value: '200m²' },
            { label: 'Visitor Flow', value: '8,000+' },
            { label: 'Leads', value: '1,200' },
        ],
        tags: ['Booth Design', 'Fabrication', '3D Visualization'],
        image: '/projects/project-1.png',
    },
    {
        id: 4,
        number: '04',
        title: 'Digital ecosystem launch',
        client: 'Venture Capital Group',
        category: 'Digital',
        year: '2023',
        description: 'Full digital transformation — from investor-facing web platform to internal dashboards. A unified digital language built for scale and designed for impact.',
        metrics: [
            { label: 'Platforms', value: '4' },
            { label: 'Load Speed', value: '1.2s' },
            { label: 'Conversion', value: '+180%' },
        ],
        tags: ['Web Development', 'UI/UX', 'Tech Consulting'],
        image: '/projects/project-2.png',
    },
    {
        id: 5,
        number: '05',
        title: 'Cultural festival identity',
        client: 'Abu Dhabi Design Week',
        category: 'Marketing',
        year: '2023',
        description: 'Campaign strategy and creative direction for one of the GCC\'s most anticipated cultural events — visual systems, media assets, and a multi-channel rollout.',
        metrics: [
            { label: 'Impressions', value: '12M+' },
            { label: 'Media Assets', value: '350+' },
            { label: 'Channels', value: '8' },
        ],
        tags: ['Campaign Strategy', 'Creative Direction', 'Media'],
        image: '/projects/project-1.png',
    },
    {
        id: 6,
        number: '06',
        title: 'Heritage brand revival',
        client: 'Al Bahar Group',
        category: 'Brand Strategy',
        year: '2022',
        description: 'Repositioning a 40-year heritage brand for the modern era — preserving legacy while building a visual and strategic framework ready for the next chapter.',
        metrics: [
            { label: 'Brand Recall', value: '+92%' },
            { label: 'Markets', value: '6' },
            { label: 'Sub-Brands', value: '4' },
        ],
        tags: ['Rebranding', 'Market Research', 'Positioning'],
        image: '/projects/project-2.png',
    },
]

interface CaseStudiesProjectsProps {
    activeFilter: string
}

export default function CaseStudiesProjects({ activeFilter }: CaseStudiesProjectsProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter((p) => p.category === activeFilter)

    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
    const [isPanelOpen, setIsPanelOpen] = useState(false)

    const handleOpenPanel = (project: Project) => {
        const mappedProject: ProjectData = {
            id: project.id,
            title: project.title,
            category: project.category,
            year: project.year,
            image: project.image,
            description: project.description,
            client: project.client,
            metrics: project.metrics,
            tags: project.tags,
        }
        setSelectedProject(mappedProject)
        setIsPanelOpen(true)
    }

    const handleClosePanel = () => {
        setIsPanelOpen(false)
        setTimeout(() => {
            setSelectedProject(null)
        }, 700)
    }

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
        <section
            ref={sectionRef}
            className="bg-white relative"
        >
            <div className="w-full h-px bg-[#e5e5e5]" />

            {filteredProjects.map((project, idx) => {
                const isReversed = idx % 2 !== 0

                return (
                    <div
                        key={project.id}
                        className="project-block relative w-full border-b border-[#e5e5e5] cursor-pointer group"
                        data-category={project.category}
                        onClick={() => handleOpenPanel(project)}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Sticky Brand Identifier Side */}
                            <div className={`relative lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden border-b lg:border-b-0 ${isReversed ? 'lg:order-2 lg:border-l' : 'lg:border-r'} border-[#e5e5e5] bg-[#fafafa]`}>
                                
                                {/* Watermark Number */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                    <span className="font-mono text-[24vw] sm:text-[20vw] lg:text-[12vw] font-light text-[#e0e0e0]/40 leading-none transition-transform duration-700 group-hover:scale-105">
                                        {project.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center lg:text-left">
                                    <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700">
                                        <span className="inline-block px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-[#6A6A6A] border border-[#e0e0e0] bg-white mb-6">
                                            {project.category}
                                        </span>
                                    </div>

                                    <h3 className="reveal-item opacity-0 translate-y-6 transition-all duration-700 text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a1a] mb-4 leading-snug tracking-tight"
                                        style={{ transitionDelay: '0.08s' }}
                                    >
                                        {project.client}
                                    </h3>

                                    <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 flex items-center gap-3 justify-center lg:justify-start"
                                        style={{ transitionDelay: '0.16s' }}
                                    >
                                        <div className="w-6 h-px bg-[#3E3E3E]" />
                                        <span className="font-mono text-xs font-semibold tracking-widest text-[#919191] font-numeric-tabular">
                                            {project.year}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Content & Mockup Side */}
                            <div className={`relative min-h-[80vh] lg:min-h-screen flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20 ${isReversed ? 'lg:order-1' : ''}`}>
                                
                                <h4 className="reveal-item opacity-0 translate-y-6 transition-all duration-700 text-2xl sm:text-3xl lg:text-4xl font-light text-[#1a1a1a] mb-4 leading-snug tracking-tight group-hover:text-[#3E3E3E] transition-colors"
                                    style={{ transitionDelay: '0.24s' }}
                                >
                                    {project.title}
                                </h4>

                                <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 w-10 h-px bg-[#1a1a1a] mb-6"
                                    style={{ transitionDelay: '0.32s' }}
                                />

                                <p className="reveal-item opacity-0 translate-y-6 transition-all duration-700 text-sm sm:text-base text-[#6A6A6A] font-light leading-relaxed mb-10 max-w-lg"
                                    style={{ transitionDelay: '0.40s' }}
                                >
                                    {project.description}
                                </p>

                                {/* Tabular Metrics Grid */}
                                <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 grid grid-cols-3 mb-10 border border-[#e5e5e5]"
                                    style={{ transitionDelay: '0.48s' }}
                                >
                                    {project.metrics.map((metric, mIdx) => (
                                        <div
                                            key={metric.label}
                                            className={`p-4 sm:p-5 text-center ${mIdx < 2 ? 'border-r border-[#e5e5e5]' : ''}`}
                                        >
                                            <div className="font-mono text-lg sm:text-2xl font-light text-[#1a1a1a] font-numeric-tabular mb-1">
                                                {metric.value}
                                            </div>
                                            <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#919191]">
                                                {metric.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 flex flex-wrap gap-2 mb-10"
                                    style={{ transitionDelay: '0.56s' }}
                                >
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-[9px] uppercase tracking-wider text-[#919191] border border-[#e5e5e5] group-hover:border-[#919191] group-hover:text-[#3E3E3E] transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Trigger Link */}
                                <span
                                    className="reveal-item opacity-0 translate-y-6 transition-all duration-700 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#1a1a1a] font-medium mb-12 cursor-pointer"
                                    style={{ transitionDelay: '0.64s' }}
                                >
                                    <span>Explore case study</span>
                                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>

                                {/* Browser / Device Mockup Frame */}
                                <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700"
                                    style={{ transitionDelay: '0.72s' }}
                                >
                                    <div className="border border-[#e5e5e5] bg-[#0f0f0f] overflow-hidden shadow-xl">
                                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a1a] border-b border-white/10">
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                            </div>
                                            <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
                                                {project.client} · Case Showcase
                                            </span>
                                        </div>
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            />
                                        </div>
                                    </div>
                                </div>
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

            <ProjectPanel 
                project={selectedProject}
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
            />
        </section>
    )
}
