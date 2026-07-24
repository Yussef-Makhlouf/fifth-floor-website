'use client'

import { useEffect, useRef } from 'react'

export default function CaseStudiesCTA() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0')
                        entry.target.classList.remove('opacity-0', 'translate-y-8')
                    }
                })
            },
            { threshold: 0.15 }
        )

        const items = sectionRef.current?.querySelectorAll('.cta-item')
        items?.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-44 bg-[#0f0f0f] text-white overflow-hidden border-t border-white/10"
        >
            {/* Background noise overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px'
                }}
            />

            {/* Hairline Grid */}
            <div className="absolute inset-0 hairline-grid-dark opacity-30 pointer-events-none" />

            {/* Ambient Radial Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end justify-between">
                    
                    <div>
                        {/* Eyebrow Label */}
                        <div className="flex items-center gap-3 mb-8 cta-item opacity-0 translate-y-8 transition-all duration-700">
                            <div className="w-8 h-px bg-[#3E3E3E]" />
                            <span className="text-[10px] uppercase tracking-[0.28em] text-[#6A6A6A] font-medium">
                                Start a Collaboration
                            </span>
                        </div>

                        {/* Headline */}
                        <h2
                            className="cta-item opacity-0 translate-y-8 transition-all duration-700 text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-tight mb-6"
                            style={{ transitionDelay: '0.1s' }}
                        >
                            Build for authority.
                            <br />
                            <span className="text-[#919191] font-extralight">Scale with confidence.</span>
                        </h2>

                        {/* Description */}
                        <p
                            className="cta-item opacity-0 translate-y-8 transition-all duration-700 text-sm sm:text-base text-[#6A6A6A] font-light max-w-xl leading-relaxed"
                            style={{ transitionDelay: '0.2s' }}
                        >
                            Every transformative brand benchmark begins with a focused discussion. Let&apos;s evaluate your project objectives and build a strategic framework.
                        </p>
                    </div>

                    {/* CTA Button Block */}
                    <div
                        className="cta-item opacity-0 translate-y-8 transition-all duration-700 flex-shrink-0"
                        style={{ transitionDelay: '0.3s' }}
                    >
                        <a
                            href="/contact"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0f0f0f] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#CFCFCF] transition-all duration-300 active-press shadow-2xl"
                        >
                            <span>Initiate project</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Bottom Stat Strip */}
                <div
                    className="mt-20 pt-10 border-t border-[#1e1e1e] grid grid-cols-2 sm:grid-cols-4 gap-8 cta-item opacity-0 translate-y-8 transition-all duration-700"
                    style={{ transitionDelay: '0.4s' }}
                >
                    <div>
                        <p className="font-mono text-xl font-light text-white font-numeric-tabular">100%</p>
                        <p className="text-[9px] uppercase tracking-widest text-[#5a5a5a] mt-1">Bespoke Code &amp; Design</p>
                    </div>
                    <div>
                        <p className="font-mono text-xl font-light text-white font-numeric-tabular">GCC</p>
                        <p className="text-[9px] uppercase tracking-widest text-[#5a5a5a] mt-1">Regional Intelligence</p>
                    </div>
                    <div>
                        <p className="font-mono text-xl font-light text-white font-numeric-tabular">96%</p>
                        <p className="text-[9px] uppercase tracking-widest text-[#5a5a5a] mt-1">Client Retention</p>
                    </div>
                    <div>
                        <p className="font-mono text-xl font-light text-white font-numeric-tabular">24h</p>
                        <p className="text-[9px] uppercase tracking-widest text-[#5a5a5a] mt-1">Response Time</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
