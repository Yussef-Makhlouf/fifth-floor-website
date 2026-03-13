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
        title: 'National Identity Reimagined',
        client: 'Ministry of Culture',
        category: 'Brand Strategy',
        year: '2024',
        description: 'A comprehensive brand overhaul for Kuwait\'s cultural arm — redefining how a nation communicates its identity to the world through visual language and strategic positioning.',
        metrics: [
            { label: 'Brand Touchpoints', value: '120+' },
            { label: 'Reach', value: '4.2M' },
            { label: 'Duration', value: '8 Months' },
        ],
        tags: ['Brand Strategy', 'Visual Identity', 'Guidelines'],
        image: '/projects/project-1.png',
    },
    {
        id: 2,
        number: '02',
        title: 'Investment Summit Experience',
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
        title: 'Luxury Retail Presence',
        client: 'Al Raya Collection',
        category: 'Booths',
        year: '2023',
        description: 'Exhibition booth design for a luxury retail brand — transforming a 200sqm footprint into a multi-sensory brand environment that drove record-breaking engagement.',
        metrics: [
            { label: 'Booth Size', value: '200m²' },
            { label: 'Visitor Flow', value: '8K+' },
            { label: 'Leads', value: '1,200' },
        ],
        tags: ['Booth Design', 'Fabrication', '3D Visualization'],
        image: '/projects/project-1.png',
    },
    {
        id: 4,
        number: '04',
        title: 'Digital Ecosystem Launch',
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
        title: 'Cultural Festival Identity',
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
        title: 'Heritage Brand Revival',
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
        // Map the CaseStudies Project to ProjectData format expected by ProjectPanel
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
            // The challenge isn't explicitly in the Case Studies project interface but we'll include it optionally or omit it
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
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
            {/* Top border */}
            <div className="w-full h-px bg-[#919191]/30" />

            {filteredProjects.map((project, idx) => {
                const isReversed = idx % 2 !== 0

                return (
                    <div
                        key={project.id}
                        className={`project-block relative w-full border-b border-[#919191]/30 cursor-pointer`}
                        data-category={project.category}
                        onClick={() => handleOpenPanel(project)}
                    >
                        <div className={`grid grid-cols-1 lg:grid-cols-2 ${isReversed ? 'lg:direction-rtl' : ''}`}>
                            {/* LEFT / Sticky Column */}
                            <div className={`relative lg:sticky lg:top-0 lg:h-screen flex items-center justify-center overflow-hidden border-b lg:border-b-0 ${isReversed ? 'lg:order-2 lg:border-l' : 'lg:border-r'} border-[#919191]/30 bg-[#fafafa]`}>
                                {/* Giant Watermark Number */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                    <span
                                        className="project-number text-[30vw] sm:text-[28vw] lg:text-[14vw] font-bold text-[#CFCFCF]/40 leading-none transition-transform duration-700 hover:scale-105"
                                    >
                                        {project.number}
                                    </span>
                                </div>

                                {/* Sticky Content */}
                                <div className="relative z-10 p-8 sm:p-12 lg:p-16 py-16 lg:py-0 text-center lg:text-left">
                                    {/* Category Label */}
                                    <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700">
                                        <span className="inline-block px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#6A6A6A] border border-[#919191]/40 mb-6">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Client Name */}
                                    <h3 className="reveal-item opacity-0 translate-y-6 transition-all duration-700 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3E3E3E] mb-4 leading-tight"
                                        style={{ transitionDelay: '0.08s' }}
                                    >
                                        {project.client}
                                    </h3>

                                    {/* Year */}
                                    <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 flex items-center gap-3 justify-center lg:justify-start"
                                        style={{ transitionDelay: '0.16s' }}
                                    >
                                        <div className="w-8 h-px bg-[#919191]" />
                                        <span className="text-sm font-bold tracking-[0.2em] text-[#919191]">
                                            {project.year}
                                        </span>
                                    </div>
                                </div>

                                {/* Corner decorations */}
                                <div className="absolute top-6 left-6 w-6 h-px bg-[#919191]/30 hidden lg:block" />
                                <div className="absolute top-6 left-6 w-px h-6 bg-[#919191]/30 hidden lg:block" />
                                <div className="absolute bottom-6 right-6 w-6 h-px bg-[#919191]/30 hidden lg:block" />
                                <div className="absolute bottom-6 right-6 w-px h-6 bg-[#919191]/30 hidden lg:block" />
                            </div>

                            {/* RIGHT / Scrollable Column */}
                            <div className={`relative min-h-[80vh] lg:min-h-screen flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20 ${isReversed ? 'lg:order-1' : ''}`}>
                                {/* Project Title */}
                                <h4 className="reveal-item opacity-0 translate-y-6 transition-all duration-700 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3E3E3E] mb-4 leading-tight"
                                    style={{ transitionDelay: '0.24s' }}
                                >
                                    {project.title}
                                </h4>

                                {/* Divider */}
                                <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 w-12 h-px bg-[#3E3E3E] mb-6"
                                    style={{ transitionDelay: '0.32s' }}
                                />

                                {/* Description */}
                                <p className="reveal-item opacity-0 translate-y-6 transition-all duration-700 text-base sm:text-lg text-[#6A6A6A] font-light leading-relaxed mb-10 max-w-lg"
                                    style={{ transitionDelay: '0.40s' }}
                                >
                                    {project.description}
                                </p>

                                {/* Metrics Grid */}
                                <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 grid grid-cols-3 mb-10 border border-[#919191]/30"
                                    style={{ transitionDelay: '0.48s' }}
                                >
                                    {project.metrics.map((metric, mIdx) => (
                                        <div
                                            key={metric.label}
                                            className={`p-4 sm:p-6 text-center ${mIdx < 2 ? 'border-r border-[#919191]/30' : ''}`}
                                        >
                                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3E3E3E] mb-1">
                                                {metric.value}
                                            </div>
                                            <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#919191]">
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
                                            className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#6A6A6A] border border-[#919191]/30 hover:border-[#3E3E3E]/50 hover:text-[#3E3E3E] transition-colors duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Link */}
                                <span
                                    className="reveal-item opacity-0 translate-y-6 transition-all duration-700 group inline-flex items-center gap-3 text-sm font-medium text-[#3E3E3E] uppercase tracking-wider hover:gap-5 mb-12 cursor-pointer"
                                    style={{ transitionDelay: '0.64s' }}
                                >
                                    <span>View Project</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    <div className="flex-1 h-px bg-[#919191]/30 group-hover:bg-[#3E3E3E]/50 transition-colors" />
                                </span>

                                {/* Browser Frame Mockup */}
                                <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700"
                                    style={{ transitionDelay: '0.72s' }}
                                >
                                    <div className="border border-[#919191]/30 overflow-hidden">
                                        {/* Browser Chrome */}
                                        <div className="flex items-center gap-2 px-4 py-3 bg-[#fafafa] border-b border-[#919191]/30">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#CFCFCF]" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#CFCFCF]" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#CFCFCF]" />
                                            </div>
                                            <div className="flex-1 mx-4">
                                                <div className="w-full max-w-[200px] h-5 bg-[#CFCFCF]/50 rounded-full mx-auto" />
                                            </div>
                                        </div>
                                        {/* Image */}
                                        <div className="relative aspect-[16/10] bg-[#f0f0f0]">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="py-32 text-center">
                    <p className="text-lg text-[#919191]">No projects found in this category.</p>
                </div>
            )}

            {/* Side Panel Overlay */}
            <ProjectPanel 
                project={selectedProject}
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
            />
        </section>
    )
}
