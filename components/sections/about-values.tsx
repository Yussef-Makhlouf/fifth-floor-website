'use client'

import { useEffect, useRef, useState } from 'react'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import GridBackground from '@/components/ui/grid-background'

const values = [
    {
        id: 1,
        title: 'Strategic Vision',
        icon: '◆',
        description:
            'Every project begins with deep understanding. We craft strategies that align with your goals and resonate with your audience.',
        principle: 'Think before you create',
    },
    {
        id: 2,
        title: 'Creative Excellence',
        icon: '✦',
        description:
            'We push creative boundaries while maintaining sophistication. Bold ideas executed with refined precision.',
        principle: 'Excellence in every detail',
    },
    {
        id: 3,
        title: 'Cultural Intelligence',
        icon: '◇',
        description:
            'Deep understanding of regional values and global trends. We create brands that feel authentic and relevant.',
        principle: 'Global vision, local heart',
    },
    {
        id: 4,
        title: 'Client Partnership',
        icon: '○',
        description:
            "We're invested in your success beyond project delivery. Long-term relationships built on trust and shared vision.",
        principle: 'Your success is our measure',
    },
    {
        id: 5,
        title: 'Refined Execution',
        icon: '□',
        description:
            'From concept to delivery, every detail matters. We maintain the highest standards throughout the process.',
        principle: 'Precision at every step',
    },
    {
        id: 6,
        title: 'Experiential Mastery',
        icon: '△',
        description:
            'We create immersive experiences that leave lasting impressions. Emotional connections that drive action.',
        principle: 'Create memories',
    },
]

export default function AboutValues() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return
            
            const container = containerRef.current
            const items = container.querySelectorAll('.value-scroll-item')
            const viewportHalf = window.innerHeight / 2
            
            let closestIndex = 0
            let closestDistance = Infinity

            items.forEach((item, index) => {
                const rect = item.getBoundingClientRect()
                const itemCenter = rect.top + rect.height / 2
                const distance = Math.abs(viewportHalf - itemCenter)
                
                if (distance < closestDistance) {
                    closestDistance = distance
                    closestIndex = index
                }
            })

            setActiveIndex(closestIndex)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        // Initial call
        handleScroll()
        
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section
            id="values"
            className="relative bg-[#3E3E3E] text-white"
        >
            {/* Background Details */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 transition-colors duration-700 ease-in-out">
                <GridBackground
                    fadeFrom="corner-tl"
                    gridColor="#CFCFCF"
                    gridSizeX={32}
                    gridSizeY={32}
                    opacity={1}
                />
            </div>

            <ArchitecturalShapes
                variant="circle"
                size="xl"
                className="absolute top-1/4 -right-40"
                opacity={0.03}
            />

            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-[#6A6A6A]/10 via-[#6A6A6A]/20 to-[#6A6A6A]/10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Sticky layout container */}
                <div ref={containerRef} className="relative flex flex-col md:flex-row items-start lg:gap-24 w-full pt-32 pb-48">
                    
                    {/* LEFT COLUMN - Sticky Header & Graphic */}
                    <div className="md:sticky top-32 w-full md:w-1/2 md:h-[calc(100vh-16rem)] flex flex-col justify-between z-10 mb-20 md:mb-0">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-px bg-[#CFCFCF]" />
                                <p className="section-label text-[#CFCFCF] m-0">Studio Philosophy</p>
                            </div>

                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
                                The Axioms
                            </h2>
                            <p className="text-xl text-[#919191] leading-relaxed max-w-md">
                                The principles that guide every decision, shape every creation,
                                and define who we are as a creative partner.
                            </p>
                        </div>
                        
                        {/* Dynamic abstract visual indicator */}
                        <div className="hidden md:flex flex-col items-center justify-center w-full aspect-square border border-[#6A6A6A]/20 bg-[#6A6A6A]/5 backdrop-blur-sm relative overflow-hidden mt-12">
                            <span className="text-[12rem] text-[#CFCFCF]/10 font-bold transition-all duration-700 absolute inset-0 flex items-center justify-center scale-150 transform-gpu" style={{ transform: `scale(${1 + activeIndex * 0.1}) translateY(${activeIndex * 5}px)` }}>
                                {values[activeIndex]?.icon}
                            </span>
                            
                            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-[#6A6A6A]/30 pt-4 px-2">
                                <span className="text-[#919191] font-mono text-sm">
                                    0{activeIndex + 1} &mdash; 0{values.length}
                                </span>
                                <span className="text-white text-sm font-medium uppercase tracking-widest text-right max-w-[50%]">
                                    {values[activeIndex]?.principle}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Scrolling Content */}
                    <div className="w-full md:w-1/2 flex flex-col m-0 p-0 md:pt-48 md:pb-48 relative z-10">
                        {values.map((value, idx) => {
                            const isActive = idx === activeIndex
                            return (
                                <div 
                                    key={value.id}
                                    className={`value-scroll-item flex flex-col justify-center min-h-[50vh] transition-all duration-700 ease-in-out ${
                                        isActive ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-8'
                                    }`}
                                >
                                    <div className="flex items-center gap-6 mb-6">
                                        <span className={`text-4xl transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#6A6A6A]'}`}>
                                            {value.icon}
                                        </span>
                                        <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#919191]'}`}>
                                            {value.title}
                                        </h3>
                                    </div>
                                    <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl transition-colors duration-500 ${isActive ? 'text-[#CFCFCF]' : 'text-[#6A6A6A]'}`}>
                                        {value.description}
                                    </p>
                                    
                                    <div className={`mt-8 flex items-center gap-4 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden md:flex'}`}>
                                        <div className="w-12 h-px bg-white/50" />
                                        <span className="text-xs uppercase tracking-[0.2em] text-white/50">{value.principle}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
