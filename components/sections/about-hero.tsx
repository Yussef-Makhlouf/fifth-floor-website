'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import DiagonalGrid from '@/components/ui/diagonal-grid'
import ArchitecturalShapes, { CircleDecoration } from '@/components/ui/architectural-shapes'
import AnimatedCounter from '@/components/ui/animated-counter'
import TextReveal, { TextRevealLine } from '@/components/ui/text-reveal'

const stats = [
    { value: 8, suffix: '+', label: 'Years of Excellence' },
    { value: 150, suffix: '+', label: 'Projects Delivered' },
    { value: 50, suffix: '+', label: 'Happy Clients' },
    { value: 15, suffix: '', label: 'Creative Minds' },
]

export default function AboutHero() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

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

        const items = sectionRef.current?.querySelectorAll('.animate-on-scroll')
        items?.forEach((item) => observer.observe(item))

        const handleScroll = () => {
            if (!imageRef.current) return
            const scrolled = window.scrollY
            imageRef.current.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0005})`
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-[#fafafa] to-[#f5f5f5]"
        >
            {/* Cinematic Background Image setup with Parallax */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%] origin-top transition-transform duration-100 ease-out">
                    <Image
                        src="/images/about-hero-visual.png"
                        alt="Fifth Floor Architecture"
                        fill
                        className="object-cover opacity-20 grayscale"
                        priority
                    />
                    {/* Dark gradient overlay to blend image into background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-[#f5f5f5] mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f5] via-transparent to-transparent" />
                </div>
            </div>

            {/* Glowing Orbs for ambiance */}
            <div className="absolute top-1/4 left-1/4 w-[80vw] h-[80vw] bg-gradient-to-br from-[#919191]/10 to-transparent rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] bg-gradient-to-tl from-[#3E3E3E]/5 to-transparent rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Architectural Grid */}
            <DiagonalGrid position="top-left" gridColor="#919191" gridSize={60} opacity={0.15} />
            <DiagonalGrid position="bottom-right" gridColor="#919191" gridSize={60} opacity={0.1} />

            <CircleDecoration className="absolute top-20 right-20 md:top-32 md:right-32 mix-blend-difference opacity-20" size="xl" />
            <ArchitecturalShapes variant="rectangle" size="xl" className="absolute bottom-32 left-10 opacity-10" />

            {/* Main Content Layout */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-48 flex flex-col justify-center">
                
                {/* Premium Label */}
                <div className="flex items-center gap-6 mb-12 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                    <div className="h-px bg-gradient-to-r from-[#919191] to-transparent w-24" />
                    <span className="tracking-[0.4em] text-sm font-medium text-[#6A6A6A] uppercase">
                        Our Manifesto
                    </span>
                    <div className="h-px bg-gradient-to-l from-[#919191] to-transparent w-24" />
                </div>

                {/* typography presentation */}
                <div className="max-w-5xl">
                    <TextReveal
                        text="Crafting"
                        className="text-6xl md:text-8xl lg:text-[8rem] font-light text-[#6A6A6A] leading-[0.9] tracking-tight"
                        staggerDelay={80}
                    />
                    <TextReveal
                        text="Experiences"
                        className="text-7xl md:text-9xl lg:text-[10rem] font-bold text-[#3E3E3E] leading-[0.9] tracking-tighter"
                        delay={300}
                        staggerDelay={60}
                    />
                    <TextReveal
                        text="Beyond Convention."
                        className="text-5xl md:text-7xl lg:text-[6rem] font-light text-[#919191] leading-[1] tracking-tight mt-4"
                        delay={600}
                        staggerDelay={50}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 items-end">
                    <TextRevealLine delay={900}>
                        <p className="text-xl md:text-2xl text-[#6A6A6A] font-light leading-relaxed max-w-xl border-l border-[#3E3E3E] pl-6 ml-2">
                            Fifth Floor is a premium creative agency crafting strategic brand identities,
                            immersive experiences, and cultural narratives for discerning clients globally.
                        </p>
                    </TextRevealLine>
                    
                    <div className="flex justify-start md:justify-end">
                        <a
                            href="#story"
                            className="group relative px-10 py-5 bg-transparent border border-[#3E3E3E] text-[#3E3E3E] uppercase tracking-widest text-sm font-semibold overflow-hidden transition-colors duration-500 hover:text-white"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Discover Our Story
                                <svg
                                    className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-[#3E3E3E] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
                        </a>
                    </div>
                </div>

            </div>

            {/* Floating Glassmorphism Stats Bar at the bottom */}
            <div className="absolute bottom-0 left-0 w-full z-20 hidden md:block border-t border-white/20">
                <div className="bg-white/40 backdrop-blur-md border-t border-[#919191]/10 px-6 md:px-12 lg:px-24">
                    <div className="max-w-7xl mx-auto flex justify-between items-center py-6">
                        {stats.map((stat, idx) => (
                            <div key={stat.label} className="flex gap-4 items-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: `${800 + idx * 100}ms` }}>
                                <div className="text-3xl font-light text-[#3E3E3E]">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2500} />
                                </div>
                                <div className="w-px h-8 bg-[#919191]/30 mx-2" />
                                <span className="text-xs text-[#6A6A6A] uppercase tracking-widest w-24 leading-snug">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-[100px] md:bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-[1200ms] pointer-events-none z-10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#919191] font-medium">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-[#919191] to-transparent animate-pulse" />
            </div>
        </section>
    )
}
