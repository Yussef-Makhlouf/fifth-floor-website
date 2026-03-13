'use client'

import { useEffect, useRef, useState } from 'react'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import GridBackground from '@/components/ui/grid-background'
import Marquee, { MarqueeItem } from '@/components/ui/marquee'

const methodology = [
    {
        step: '01',
        title: 'Insight',
        description: 'Immersing ourselves in the core of your brand. We analyze culture, competition, and core truths.',
        icon: '🔍'
    },
    {
        step: '02',
        title: 'Strategy',
        description: 'Connecting dots to form a visionary narrative. We define the blueprint for distinction and impact.',
        icon: '📐'
    },
    {
        step: '03',
        title: 'Design',
        description: 'Translating strategy into striking aesthetics. We craft bespoke visual ecosystems and spatial environments.',
        icon: '🎨'
    },
    {
        step: '04',
        title: 'Realization',
        description: 'Bringing the vision to life with precision. We orchestrate experiences that resonate and endure.',
        icon: '✨'
    }
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

export default function AboutApproach() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [activeStep, setActiveStep] = useState<number>(0)

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

        const items = sectionRef.current?.querySelectorAll('.approach-animate')
        items?.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [])

    return (
        <section
            id="approach"
            ref={sectionRef}
            className="relative overflow-hidden bg-white pt-32"
        >
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
                className="absolute -top-40 -right-40 mix-blend-difference opacity-5"
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-24 relative z-10">
                {/* Section Header */}
                <div className="approach-animate opacity-0 translate-y-12 transition-all duration-1000 mb-20 md:mb-32">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-px bg-[#3E3E3E]" />
                        <p className="section-label text-[#3E3E3E]">The Approach</p>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#3E3E3E] mb-12">
                        How We Work
                    </h2>
                    
                    <div className="max-w-2xl">
                        <p className="text-xl md:text-2xl text-[#6A6A6A] leading-relaxed font-light">
                            A rigorous, interdisciplinary methodology designed to uncover truth and architect brilliance.
                        </p>
                    </div>
                </div>

                {/* Methodology Interactive Diagram */}
                <div className="approach-animate opacity-0 translate-y-12 transition-all duration-1000 delay-200 border-t border-[#3E3E3E]/10 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                        {methodology.map((item, idx) => {
                            const isActive = activeStep === idx
                            
                            return (
                                <div 
                                    key={item.step}
                                    className={`relative group cursor-pointer transition-all duration-500`}
                                    onMouseEnter={() => setActiveStep(idx)}
                                >
                                    {/* Progress Line */}
                                    <div className="absolute top-8 left-0 w-full h-px bg-[#3E3E3E]/10 -z-10 hidden md:block" />
                                    
                                    {/* Active Line Fill */}
                                    <div 
                                        className={`absolute top-8 left-0 h-px bg-[#3E3E3E] -z-10 hidden md:block transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left`}
                                        style={{ width: isActive ? '100%' : '0%' }}
                                    />

                                    {/* Number Circle */}
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border transition-colors duration-500 mb-8 bg-white ${isActive ? 'border-[#3E3E3E] text-[#3E3E3E]' : 'border-[#3E3E3E]/20 text-[#6A6A6A] group-hover:border-[#3E3E3E]/50'}`}>
                                        <span className="font-mono text-sm tracking-widest">{item.step}</span>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${isActive ? 'text-[#3E3E3E]' : 'text-[#6A6A6A]'}`}>
                                            {item.title}
                                        </h3>
                                        <p className={`text-sm leading-relaxed transition-all duration-500 ${isActive ? 'text-[#6A6A6A] opacity-100 translate-y-0' : 'text-[#919191] opacity-60 md:opacity-0 md:-translate-y-4 group-hover:opacity-100'}`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Clients Marquee Section - Kept from previous awards section */}
            <div className="py-24 bg-[#1a1a1a] relative overflow-hidden group border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#3E3E3E]/20 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
                
                {/* Side Gradients for blur effect */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

                <div className="mb-12 text-center relative z-20 approach-animate opacity-0 translate-y-8 transition-all duration-700">
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
        </section>
    )
}
