'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'

const team = [
    {
        id: '01',
        name: 'Ahmad Al-Rashid',
        role: 'Founder & Creative Director',
        description: 'Visionary leader with 15+ years in branding and creative strategy.',
        expertise: ['Brand Strategy', 'Creative Direction', 'Client Relations'],
    },
    {
        id: '02',
        name: 'Sarah Mitchell',
        role: 'Head of Design',
        description: 'Award-winning designer specializing in visual identity systems.',
        expertise: ['Visual Identity', 'Typography', 'Print Design'],
    },
    {
        id: '03',
        name: 'Omar Hassan',
        role: 'Strategy Director',
        description: 'Expert in market analysis and brand positioning strategies.',
        expertise: ['Market Research', 'Brand Positioning', 'Competitive Analysis'],
    },
    {
        id: '04',
        name: 'Fatima Al-Zahra',
        role: 'Experience Director',
        description: 'Creates immersive brand experiences and event concepts.',
        expertise: ['Event Design', 'Experiential Marketing', 'Spatial Design'],
    },
    {
        id: '05',
        name: 'David Chen',
        role: 'Digital Lead',
        description: 'Bridges creative vision with digital innovation and technology.',
        expertise: ['Digital Strategy', 'Web Development', 'Interactive Design'],
    },
    {
        id: '06',
        name: 'Layla Abbas',
        role: 'Project Director',
        description: 'Ensures seamless delivery of complex multi-disciplinary projects.',
        expertise: ['Project Management', 'Client Success', 'Team Coordination'],
    },
]

export default function AboutTeam() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100')
                        entry.target.classList.remove('opacity-0', 'translate-y-12')
                    }
                })
            },
            { threshold: 0.1 }
        )

        const items = sectionRef.current?.querySelectorAll('.team-animate')
        items?.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [])

    return (
        <section
            id="team"
            ref={sectionRef}
            className="pt-32 pb-48 bg-[#f5f5f5] relative overflow-hidden"
        >
            {/* Background Decorations */}
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#919191]/20 to-transparent" />
            <div className="absolute top-0 right-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#919191]/10 to-transparent" />

            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] opacity-[0.03] pointer-events-none select-none -translate-x-1/2 -translate-y-1/2">
                <Image
                    src="/logos/fifth-decore-dark.png"
                    alt=""
                    fill
                    className="object-contain"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Section Header */}
                <div className="team-animate opacity-0 translate-y-12 transition-all duration-1000 mb-20 md:mb-32">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-px bg-[#919191]" />
                        <p className="section-label text-[#6A6A6A]">The Collective</p>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#3E3E3E] mb-6">
                        Our People
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12">
                        <div className="hidden md:block md:col-span-5" />
                        <div className="md:col-span-7">
                            <p className="text-xl md:text-2xl text-[#6A6A6A] leading-relaxed font-light border-l border-[#919191] pl-6">
                                A diverse collective of strategists, designers, and creators united by a shared
                                passion for crafting exceptional brand experiences.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team List - Interactive Rows */}
                <div className="border-t border-[#919191]/30">
                    {team.map((member, idx) => {
                        const isHovered = hoveredIndex === idx
                        
                        return (
                            <div
                                key={member.id}
                                className="team-animate opacity-0 translate-y-12 transition-all duration-700 relative group cursor-pointer border-b border-[#919191]/30"
                                style={{ transitionDelay: `${idx * 100}ms` }}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Hover Background transition */}
                                <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10" />

                                <div className="py-8 md:py-12 px-4 transition-all duration-500 group-hover:px-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        
                                        <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto">
                                            <span className="text-sm md:text-base font-mono text-[#919191] group-hover:text-[#3E3E3E] transition-colors duration-300">
                                                {member.id}
                                            </span>
                                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#3E3E3E] tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                                                {member.name}
                                            </h3>
                                        </div>

                                        <div className="flex items-center text-left md:text-right md:w-1/3 group-hover:-translate-x-4 transition-transform duration-500">
                                            <p className="text-sm md:text-base uppercase tracking-widest text-[#6A6A6A] group-hover:text-[#3E3E3E] font-medium transition-colors duration-300 ml-14 md:ml-0">
                                                {member.role}
                                            </p>
                                        </div>
                                        
                                    </div>

                                    {/* Expandable Content Container */}
                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                                        <div className="overflow-hidden">
                                            <div className="pt-8 md:pt-12 pl-14 md:pl-24">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    <div>
                                                        <p className="text-lg md:text-xl text-[#3E3E3E] leading-relaxed font-light mb-6">
                                                            {member.description}
                                                        </p>
                                                    </div>
                                                    
                                                    <div>
                                                        <p className="text-xs uppercase tracking-widest text-[#919191] mb-6">Expertise</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {member.expertise.map((skill) => (
                                                                <span
                                                                    key={skill}
                                                                    className="px-4 py-2 bg-[#f5f5f5] text-[#3E3E3E] text-xs uppercase tracking-wider font-medium"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Join CTA */}
                <div className="mt-32 text-center team-animate opacity-0 translate-y-12 transition-all duration-1000 delay-300">
                    <p className="text-xl md:text-2xl font-light text-[#6A6A6A] mb-8">
                        Passionate about creative excellence?
                    </p>
                    <a
                        href="/contact"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#3E3E3E] text-white uppercase tracking-widest text-sm font-semibold overflow-hidden transition-colors duration-500 hover:text-[#3E3E3E]"
                    >
                        <span className="relative z-10 flex items-center gap-4">
                            Join Our Studio
                            <svg
                                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-white border border-[#3E3E3E] scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 group-hover:origin-left" />
                    </a>
                </div>
            </div>
            
            <ArchitecturalShapes
                variant="corner"
                size="lg"
                className="absolute bottom-12 right-12 opacity-5 pointer-events-none"
            />
        </section>
    )
}
