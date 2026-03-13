'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Bebas_Neue } from 'next/font/google'
import { X, ArrowUpRight } from 'lucide-react'

// Using Bebas Neue for strong display headers
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })

export interface ProjectData {
  id: number
  title: string
  category: string
  year: string
  image: string
  description: string
  client?: string
  metrics?: { label: string; value: string }[]
  tags?: string[]
  challenge?: string
}

interface ProjectPanelProps {
  project: ProjectData | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectPanel({ project, isOpen, onClose }: ProjectPanelProps) {
  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!project) return null

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm z-[100] transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Side Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-[#fafafa] z-[101] shadow-2xl border-l border-[#CFCFCF] transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 md:px-10 border-b border-[#CFCFCF]/50 bg-[#fafafa]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#3E3E3E] rounded-full" />
            <span className="font-mono text-[#6A6A6A] text-xs md:text-sm tracking-[0.2em] uppercase">
              {project.category}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 border border-[#CFCFCF] hover:border-[#3E3E3E] flex items-center justify-center rounded-sm transition-colors group"
            aria-label="Close panel"
          >
            <X className="w-5 h-5 text-[#919191] group-hover:text-[#3E3E3E] transition-colors" />
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <div className="p-6 md:p-10 flex flex-col gap-10 md:gap-14">
            
            {/* Hero Visual Section */}
            <div className="w-full aspect-[16/9] relative rounded-sm border border-[#CFCFCF]/50 overflow-hidden bg-[#f0f0f0] group">
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-all duration-[1500ms] group-hover:scale-110 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>

            {/* Typography & Header Block */}
            <div className="flex flex-col gap-6">
              <h2 className={`${bebasNeue.className} text-6xl md:text-[7rem] text-[#3E3E3E] uppercase leading-[0.85] tracking-tight`}>
                {project.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-l-2 border-[#3E3E3E] pl-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#919191] uppercase tracking-[0.1em]">Client</span>
                  <span className="font-mono text-xs md:text-sm text-[#3E3E3E] uppercase font-bold">
                    {project.client || "Fifth Floor"}
                  </span>
                </div>
                <span className="hidden md:inline text-[#CFCFCF]">/</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#919191] uppercase tracking-[0.1em]">Year</span>
                  <span className="font-mono text-xs md:text-sm text-[#3E3E3E] uppercase font-bold">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <p className="text-[#6A6A6A] text-base md:text-lg font-light leading-relaxed max-w-lg">
              {project.description}
            </p>

            {/* Big Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-6 py-10 md:py-12 border-y border-[#CFCFCF]/50 relative">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col gap-2 relative z-10">
                    <span className="text-4xl md:text-6xl font-bold tracking-tighter text-[#3E3E3E]">
                      {metric.value}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs text-[#919191] uppercase tracking-[0.2em]">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Details & Challenge */}
            <div className="flex flex-col gap-12">
              {/* Challenge Block */}
              {project.challenge && (
                <div className="bg-white p-6 md:p-8 border-l-[3px] border-[#3E3E3E] shadow-sm">
                  <h4 className="font-mono text-xs text-[#3E3E3E] font-bold uppercase tracking-[0.2em] mb-4">
                    The Challenge
                  </h4>
                  <p className="text-[#6A6A6A] text-sm md:text-base leading-relaxed italic">
                    "{project.challenge}"
                  </p>
                </div>
              )}

              {/* Tags / Execution Pillars */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-col gap-5">
                  <h4 className="font-mono text-xs text-[#919191] uppercase tracking-[0.2em]">
                    Execution Pillars
                  </h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 border border-[#CFCFCF] hover:border-[#919191] rounded-none text-[#6A6A6A] hover:text-[#3E3E3E] text-xs font-mono tracking-wider bg-transparent transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Final CTA */}
            <div className="pt-4 pb-8">
              <a 
                href="/contact"
                className="w-full py-5 md:py-6 bg-[#3E3E3E] hover:bg-[#222] text-[#fff] flex items-center justify-center gap-3 rounded-none transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-[-20deg]" />
                <span className="font-sans font-bold uppercase tracking-[0.15em] text-sm relative z-10">
                 Contact Us Now
                </span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
