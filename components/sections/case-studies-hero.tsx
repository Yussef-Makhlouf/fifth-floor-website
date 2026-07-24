'use client'

import Image from 'next/image'

const stats = [
    { value: '150+', label: 'Projects delivered' },
    { value: '12', label: 'GCC industries' },
    { value: '96%', label: 'Client retention' },
    { value: '8+', label: 'Years active' },
]

export default function CaseStudiesHero() {
    return (
        <section className="relative min-h-[100dvh] flex items-stretch bg-white overflow-hidden pt-20">
            {/* Hairline grid */}
            <div className="absolute inset-0 hairline-grid-light opacity-60 pointer-events-none" />

            {/* Vertical separator line */}
            <div className="absolute top-0 bottom-0 left-1/2 md:left-[55%] w-px bg-[#f0f0f0] hidden md:block" />

            {/* ─── Left column: Main Content ─── */}
            <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-20 md:py-0 w-full md:w-[55%] lg:w-[52%]">
                
                {/* Eyebrow Label */}
                <div className="flex items-center gap-3 mb-10 animate-fade-in">
                    <div className="w-6 h-px bg-[#3E3E3E]" />
                    <p className="text-[9px] uppercase tracking-[0.28em] text-[#919191] font-medium">Selected Works &amp; Case Studies</p>
                </div>

                {/* Headline */}
                <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-[#1a1a1a] mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Where strategy<br />
                    <span className="text-[#919191] font-extralight">meets cultural</span><br />
                    execution.
                </h1>

                {/* Animated Divider */}
                <div className="flex items-center gap-3 mb-8 animate-line-extend">
                    <div className="w-12 h-px bg-[#3E3E3E]" />
                    <div className="w-1.5 h-1.5 border border-[#3E3E3E]/30 rotate-45" />
                </div>

                {/* Body & Actions */}
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <p className="text-sm sm:text-base text-[#6A6A6A] font-light leading-relaxed max-w-md mb-10">
                        Every project is a partnership. We immerse ourselves in our clients&apos; vision and transform it into identity systems, spatial activations, and digital platforms that shape market leadership.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-14">
                        <a
                            href="#case-studies"
                            className="group px-7 py-3.5 bg-[#1a1a1a] text-white text-xs font-medium tracking-[0.12em] uppercase hover:bg-[#2a2a2a] transition-all duration-300 flex items-center justify-center sm:justify-start gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active-press"
                        >
                            Explore Case Studies
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="/contact"
                            className="px-7 py-3.5 border border-[#e0e0e0] text-[#3E3E3E] text-xs font-medium tracking-[0.12em] uppercase hover:border-[#3E3E3E] hover:bg-[#f8f8f8] transition-all duration-300 text-center active-press"
                        >
                            Start a Project
                        </a>
                    </div>
                </div>
            </div>

            {/* ─── Right column: Impact Showcase Panel ─── */}
            <div className="relative z-10 hidden md:flex flex-col justify-center w-[45%] lg:w-[48%] bg-[#fafafa] border-l border-[#f0f0f0] animate-fade-in" style={{ animationDelay: '0.3s' }}>
                
                {/* Floating Brand Icon Watermark */}
                <div className="absolute top-8 right-8 w-20 h-20 opacity-[0.04] pointer-events-none">
                    <Image src="/logos/fifth-icon-dark.png" alt="" fill className="object-contain" />
                </div>

                {/* Panel Header */}
                <div className="px-10 py-6 border-b border-[#ebebeb]">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#b0b0b0] font-medium">Studio Metrics</p>
                </div>

                {/* Metrics Grid */}
                <div className="p-10 grid grid-cols-2 gap-8 flex-1 items-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="border-l-2 border-[#1a1a1a] pl-5">
                            <p className="text-4xl font-light text-[#1a1a1a] font-numeric-tabular tracking-tight mb-1">
                                {stat.value}
                            </p>
                            <p className="text-[10px] uppercase tracking-widest text-[#919191]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Panel Footer */}
                <div className="px-10 py-5 border-t border-[#ebebeb]">
                    <p className="text-[9px] text-[#c0c0c0] uppercase tracking-widest font-mono">
                        Proven outcomes across Saudi Arabia · UAE · Kuwait
                    </p>
                </div>
            </div>
        </section>
    )
}
