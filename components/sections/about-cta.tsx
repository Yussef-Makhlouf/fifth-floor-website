'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import DiagonalGrid from '@/components/ui/diagonal-grid'
import { CircleDecoration } from '@/components/ui/architectural-shapes'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'

export default function AboutCTA() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100')
                        entry.target.classList.remove('opacity-0', 'translate-y-8')
                    }
                })
            },
            { threshold: 0.1 }
        )

        const items = sectionRef.current?.querySelectorAll('.cta-item')
        items?.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-[#3E3E3E] overflow-hidden"
        >
            {/* Animated Background Gradient */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#4a4a4a]/30 to-transparent rounded-full blur-3xl animate-pulse" />
            <div
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#6A6A6A]/20 to-transparent rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '2s' }}
            />

            {/* Diagonal Grid */}
            <DiagonalGrid
                position="bottom-left"
                gridColor="#6A6A6A"
                gridSize={40}
                opacity={0.1}
            />

            {/* Circle Decorations */}
            <CircleDecoration
                className="absolute -top-32 -right-32"
                size="xl"
            />

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02] pointer-events-none select-none">
                <Image
                    src="/logos/fifth-decore-dark.png"
                    alt=""
                    fill
                    className="object-contain invert"
                />
            </div>

            {/* Vertical Lines */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#6A6A6A]/10 to-transparent" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#6A6A6A]/10 to-transparent" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center">
                    {/* Section Label */}
                    <div className="cta-item opacity-0 translate-y-8 transition-all duration-700 flex items-center justify-center gap-4 mb-10">
                        <div className="w-12 h-px bg-[#6A6A6A]" />
                        <p className="section-label text-[#919191]">Let's Create Together</p>
                        <div className="w-12 h-px bg-[#6A6A6A]" />
                    </div>

                    {/* Main Headline */}
                    <h2
                        className="cta-item opacity-0 translate-y-8 transition-all duration-700 text-5xl md:text-6xl lg:text-7xl font-bold text-[#CFCFCF] mb-8 leading-[1.1]"
                        style={{ transitionDelay: '100ms' }}
                    >
                        Ready to Elevate
                        <br />
                        <span className="bg-gradient-to-r from-[#CFCFCF] via-white to-[#CFCFCF] bg-clip-text text-transparent">
                            Your Brand?
                        </span>
                    </h2>

                    {/* Divider */}
                    <div
                        className="cta-item opacity-0 translate-y-8 transition-all duration-700 flex items-center justify-center gap-3 mb-10"
                        style={{ transitionDelay: '200ms' }}
                    >
                        <div className="w-16 h-px bg-[#6A6A6A]" />
                        <div className="w-2 h-2 border border-[#6A6A6A] rotate-45" />
                        <div className="w-16 h-px bg-[#6A6A6A]" />
                    </div>

                    {/* Description */}
                    <p
                        className="cta-item opacity-0 translate-y-8 transition-all duration-700 text-lg md:text-xl text-[#919191] font-light leading-relaxed max-w-2xl mx-auto mb-14"
                        style={{ transitionDelay: '300ms' }}
                    >
                        Whether you're launching a new brand, reimagining an existing one,
                        or creating an unforgettable experience—we're here to bring your vision to life.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="cta-item opacity-0 translate-y-8 transition-all duration-700 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                        style={{ transitionDelay: '400ms' }}
                    >
                        <a
                            href="/contact"
                            className="group px-10 py-5 bg-[#CFCFCF] text-[#3E3E3E] font-semibold tracking-wide hover:bg-white transition-all duration-300 flex items-center gap-3 shadow-lg shadow-black/30 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Start a Project
                            <svg
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="mailto:info.fifthfloorcc@gmail.com"
                            className="px-10 py-5 border border-[#6A6A6A] text-[#CFCFCF] font-medium tracking-wide hover:border-[#CFCFCF] hover:bg-[#CFCFCF]/5 transition-all duration-300"
                        >
                            Email Us Directly
                        </a>
                    </div>

                    {/* Contact Info Grid */}
                    <div
                        className="cta-item opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#6A6A6A]/30"
                        style={{ transitionDelay: '500ms' }}
                    >
                        {/* Email */}
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-widest text-[#6A6A6A] mb-3">Email</p>
                            <a
                                href="mailto:info.fifthfloorcc@gmail.com"
                                className="text-[#CFCFCF] hover:text-white transition-colors"
                            >
                                info.fifthfloorcc@gmail.com
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-widest text-[#6A6A6A] mb-3">Phone</p>
                            <a
                                href="tel:+96555400430"
                                className="text-[#CFCFCF] hover:text-white transition-colors"
                            >
                                +965 554 004 30
                            </a>
                        </div>

                        {/* Location */}
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-widest text-[#6A6A6A] mb-3">Location</p>
                            <p className="text-[#CFCFCF]">Kuwait | UAE</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner Decorations */}
            <ArchitecturalShapes
                variant="corner"
                size="md"
                className="absolute bottom-8 left-8"
                opacity={0.1}
            />
            <ArchitecturalShapes
                variant="corner"
                size="md"
                className="absolute top-8 right-8 rotate-180"
                opacity={0.1}
            />
        </section>
    )
}
