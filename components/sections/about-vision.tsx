'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'

const capabilities = [
    {
        id: '01',
        title: 'Brand Architecture',
        shortDesc: 'Strategic Foundation',
        description: 'We construct durable brand strategies built to withstand market shifts. It starts with a philosophy, engineered into an identity.',
        image: '/images/hero-bg.png' // Replace with relevant abstract or work image
    },
    {
        id: '02',
        title: 'Spatial Design',
        shortDesc: 'Immersive Environment',
        description: 'Translating brand essence into tangible physical spaces. Every texture, light, and shadow is curated for emotional resonance.',
        image: '/images/about-hero-visual.png' // Replace with relevant abstract or work image
    },
    {
        id: '03',
        title: 'Digital Experiences',
        shortDesc: 'Interactive Reality',
        description: 'Crafting fluid, intuitive digital interfaces that operate on the edge of innovation, where technology feels invisible.',
        image: '/images/selected-2.png' // Replace with relevant abstract or work image
    },
    {
        id: '04',
        title: 'Cultural Curation',
        shortDesc: 'Narrative Alignment',
        description: 'Embedding brands into the cultural zeitgeist through bespoke events, activations, and meaningful collaborations.',
        image: '/images/selected-3.png' // Replace with relevant abstract or work image
    }
]

export default function AboutVision() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [isHovering, setIsHovering] = useState<boolean>(false)

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

        const items = sectionRef.current?.querySelectorAll('.vision-animate')
        items?.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [])

    return (
        <section
            id="vision"
            ref={sectionRef}
            className="w-full relative min-h-screen bg-[#111111] overflow-hidden flex flex-col justify-center py-32"
        >
            {/* Dynamic Background Images */}
            {capabilities.map((cap, idx) => (
                <div 
                    key={`bg-${cap.id}`}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0 ${
                        activeIndex === idx ? 'opacity-40 scale-100' : 'opacity-0 scale-105'
                    }`}
                >
                    <Image
                        src={cap.image}
                        alt={cap.title}
                        fill
                        className="object-cover grayscale"
                        priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/50 to-transparent" />
                </div>
            ))}

            {/* Architectural Decor */}
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent z-0" />
            <div className="absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-white/20 to-transparent z-0" />
            
            <ArchitecturalShapes
                variant="rectangle"
                size="xl"
                className="absolute -top-20 -right-20 opacity-5 rotate-12 z-0 mix-blend-overlay"
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                
                {/* Header */}
                <div className="vision-animate opacity-0 translate-y-12 transition-all duration-1000 mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-px bg-white/50" />
                        <p className="section-label text-white/70">The Vision</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                        <h2 className="md:col-span-7 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                            Beyond Dimensions.
                        </h2>
                        <div className="md:col-span-5 border-l border-white/20 pl-6">
                            <p className="text-lg text-white/60 font-light leading-relaxed">
                                We don't just design; we architect feelings. Our interconnected disciplines fuse to create holistic brand ecosystems.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive Capability List */}
                <div 
                    className="vision-animate opacity-0 translate-y-12 transition-all duration-1000 delay-200 mt-16"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {capabilities.map((cap, idx) => {
                        const isActive = activeIndex === idx
                        // If hovering over the list, fade out non-active items. Otherwise, keep them all visible but dim.
                        const opacityClass = isHovering 
                            ? (isActive ? 'opacity-100' : 'opacity-20')
                            : (isActive ? 'opacity-100' : 'opacity-50')
                            
                        return (
                            <div 
                                key={cap.id}
                                className={`group relative py-8 md:py-12 border-b border-white/10 cursor-pointer transition-opacity duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 ${opacityClass}`}
                                onMouseEnter={() => setActiveIndex(idx)}
                            >
                                {/* Active Line Indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-white transition-transform duration-500 origin-top ${isActive ? 'scale-y-100' : 'scale-y-0'}`} />

                                <div className="flex items-center gap-8 md:gap-16 lg:w-1/2 pl-6">
                                    <span className="text-sm font-mono text-white/30 hidden md:block">
                                        {cap.id}
                                    </span>
                                    <h3 className={`text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight transition-transform duration-500 ${isActive ? 'translate-x-4 text-white' : 'text-white/70'}`}>
                                        {cap.title}
                                    </h3>
                                </div>

                                <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center pl-6 md:pl-0">
                                    <span className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-500 ${isActive ? 'text-white/80' : 'text-white/40'}`}>
                                        {cap.shortDesc}
                                    </span>
                                    
                                    <div className={`overflow-hidden transition-all duration-500 max-w-sm ${isActive ? 'max-h-40 opacity-100 mt-4 md:mt-0' : 'max-h-0 opacity-0 md:max-h-20'}`}>
                                        <p className="text-sm text-white/60 font-light leading-relaxed">
                                            {cap.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
