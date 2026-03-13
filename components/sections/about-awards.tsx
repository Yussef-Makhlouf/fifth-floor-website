'use client'

import { useEffect, useRef, useState } from 'react'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import GridBackground from '@/components/ui/grid-background'
import Marquee, { MarqueeItem } from '@/components/ui/marquee'
import AnimatedCounter from '@/components/ui/animated-counter'
import Testimonials from '@/components/sections/testimonials'
import Image from 'next/image'

const achievements = [
    { value: 150, suffix: '+', label: 'Projects Completed' },
    { value: 50, suffix: '+', label: 'Satisfied Clients' },
    { value: 8, suffix: '', label: 'Years of Excellence' },
    { value: 12, suffix: '', label: 'Industry Awards' },
]

const awards = [
    { name: 'Design Excellence', year: '2024', category: 'Global Design Awards', description: 'Awarded for exceptional brand identity creation for a global luxury brand.' },
    { name: 'Brand Innovation', year: '2023', category: 'Awwwards', description: 'Site of the day recognition for pushing boundaries in interactive web experiences.' },
    { name: 'Creative Agency of the Year', year: '2023', category: 'Middle East Agency Awards', description: 'Top honors reflecting our widespread impact across the GCC.' },
    { name: 'Event Design Award', year: '2022', category: 'Eventex', description: 'Gold award for the most immersive spatial design at Riyadh Season.' },
    { name: 'Best Visual Identity', year: '2022', category: 'Red Dot', description: 'Recognized for a disruptive minimalist visual identity system.' },
    { name: 'Marketing Excellence', year: '2021', category: 'Effie Awards', description: 'Awarded for an integrated campaign that blended culture with avant-garde aesthetics.' },
]

const clients = [
    'Ministry of Culture',
    'Kuwait Investment Authority',
    'Abu Dhabi Design Week',
    'Al Raya Collection',
    'Royal Commission',
    'Saudi Tourism',
    'Gulf Finance',
    'Tech Innovation Hub',
]

export default function AboutAwards() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [hoveredAwardIndex, setHoveredAwardIndex] = useState<number | null>(null)

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

        const items = sectionRef.current?.querySelectorAll('.award-animate')
        items?.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [])

    return (
        <section
            id="recognition"
            ref={sectionRef}
            className="relative overflow-hidden bg-white"
        >
            <div className="pt-32 pb-16 relative">
                {/* Background Decorations */}
                <GridBackground
                    fadeFrom="corner-tr"
                    gridColor="#CFCFCF"
                    gridSizeX={48}
                    gridSizeY={48}
                    opacity={0.3}
                />

                <ArchitecturalShapes
                    variant="circle"
                    size="xl"
                    className="absolute -top-40 -left-40 mix-blend-difference opacity-5"
                />

                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                    {/* Section Header */}
                    <div className="award-animate opacity-0 translate-y-12 transition-all duration-1000 mb-20 md:mb-32">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-px bg-[#3E3E3E]" />
                            <p className="section-label text-[#3E3E3E]">Recognition</p>
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#3E3E3E] mb-12">
                            Honors & Accolades
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-6 lg:col-span-5">
                                <p className="text-xl md:text-2xl text-[#6A6A6A] leading-relaxed font-light">
                                    Our commitment to excellence and innovation, validated by industry leaders and creative institutions globally.
                                </p>
                            </div>
                            <div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 gap-x-8 gap-y-12">
                                {/* Compact achievements block next to intro */}
                                {achievements.map((stat, idx) => (
                                    <div key={stat.label} className="border-l border-[#3E3E3E]/20 pl-6">
                                        <div className="text-4xl md:text-5xl font-light text-[#3E3E3E] tracking-tight mb-2">
                                            <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
                                        </div>
                                        <p className="text-xs text-[#919191] uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full-width Awards List Container */}
                <div className="w-full mt-24 md:mt-40 border-t border-[#3E3E3E]/10 relative group/list">
                    
                    {/* Dark Background Overlay that activates on hover */}
                    <div className="absolute inset-0 bg-[#3E3E3E] scale-y-0 group-hover/list:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom -z-10" />

                    {awards.map((award, idx) => {
                        const isHovered = hoveredAwardIndex === idx;
                        return (
                            <div
                                key={award.name}
                                className="award-animate opacity-0 translate-y-12 transition-all duration-700 relative w-full border-b border-[#3E3E3E]/10 hover:border-transparent group/row cursor-pointer"
                                style={{ transitionDelay: `${200 + idx * 50}ms` }}
                                onMouseEnter={() => setHoveredAwardIndex(idx)}
                                onMouseLeave={() => setHoveredAwardIndex(null)}
                            >
                                {/* Row specific Background overlay */}
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300" />
                                
                                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                                    <div className="py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                        
                                        <div className="flex items-center gap-8 md:gap-16 lg:w-1/2">
                                            <span className={`text-sm font-mono transition-colors duration-500 ${isHovered ? 'text-white/50' : 'text-[#919191]'}`}>
                                                {String(idx + 1).padStart(2, '0')}.
                                            </span>
                                            <h3 className={`text-3xl md:text-4xl lg:text-5xl tracking-tight transition-colors duration-500 group-hover/row:-translate-y-1 ${isHovered ? 'text-white font-bold' : 'text-[#3E3E3E] font-medium group-hover/list:text-white/60'}`}>
                                                {award.name}
                                            </h3>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 lg:w-1/2 justify-end">
                                            <span className={`text-xs uppercase tracking-widest transition-colors duration-500 group-hover/row:-translate-y-1 opacity-100 md:opacity-0 group-hover/row:opacity-100 ${isHovered ? 'text-white/70' : 'text-[#919191]'}`}>
                                                {award.category}
                                            </span>
                                            <div className="overflow-hidden md:w-64">
                                                <p className="text-sm font-light leading-relaxed text-white/60 transform translate-y-full opacity-0 group-hover/row:translate-y-0 group-hover/row:opacity-100 transition-all duration-500 hidden md:block">
                                                    {award.description}
                                                </p>
                                            </div>
                                            <span className={`text-lg md:text-xl font-light transition-colors duration-500 group-hover/row:-translate-y-1 ${isHovered ? 'text-white' : 'text-[#6A6A6A] group-hover/list:text-white/40'}`}>
                                                {award.year}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Clients Marquee Section - Enhanced */}
            <div className="py-24 bg-[#1a1a1a] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#3E3E3E]/20 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
                
                {/* Side Gradients for blur effect */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

                <div className="mb-12 text-center relative z-20 award-animate opacity-0 translate-y-8 transition-all duration-700">
                    <p className="text-xs uppercase tracking-[0.3em] font-medium text-white/40">
                        Trusted By Industry Leaders
                    </p>
                </div>

                <div className="opacity-60 hover:opacity-100 transition-opacity duration-700">
                    {/* First Marquee - Left */}
                    <Marquee speed={30} direction="left" className="mb-6 md:mb-10">
                        {clients.map((client) => (
                            <MarqueeItem key={client} className="px-8 md:px-16">
                                <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                                    {client}
                                </span>
                            </MarqueeItem>
                        ))}
                    </Marquee>

                    {/* Second Marquee - Right */}
                    <Marquee speed={25} direction="right">
                        {[...clients].reverse().map((client) => (
                            <MarqueeItem key={client} className="px-8 md:px-16">
                                <span className="text-3xl md:text-5xl lg:text-6xl font-medium text-white/30 hover:text-white transition-colors duration-300 whitespace-nowrap">
                                    {client}
                                </span>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white">
                <Testimonials />
            </div>
        </section>
    )
}
