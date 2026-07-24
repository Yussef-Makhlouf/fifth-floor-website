'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import { ArrowUpRight } from 'lucide-react'
import ProjectPanel, { ProjectData } from '@/components/ui/project-panel'

const projects: ProjectData[] = [
  {
    id: 1,
    title: 'Ministry of Culture',
    category: 'Brand Identity',
    year: '2024',
    image: '/projects/project-1.png',
    description: 'A comprehensive branding system intertwining heritage with future-forward design principles, redefining cultural expression.',
    client: 'Ministry of Culture',
    metrics: [
      { label: 'Growth', value: '+340%' },
      { label: 'Attendees', value: '50K' },
      { label: 'Engagement', value: '1.2s' }
    ],
    tags: ['Brand Strategy', 'Visual Identity', 'Motion Graphics', 'Guidelines'],
    challenge: 'Modernizing a deeply historical entity without losing its foundational roots and significance in the cultural landscape.'
  },
  {
    id: 2,
    title: 'Kuwait Investment Forum',
    category: 'Event Design',
    year: '2024',
    image: '/projects/project-2.png',
    description: 'Immersive spatial environments and digital touchpoints created for world-class financial leaders and visionaries.',
    client: 'KIF',
    metrics: [
      { label: 'Delegates', value: '1,200+' },
      { label: 'Exhibitors', value: '45' },
      { label: 'Satisfaction', value: '98%' }
    ],
    tags: ['Spatial Design', 'Interactive Tech', 'Wayfinding', 'Stage Design'],
    challenge: 'Creating a seamless, premium flow of information and networking spaces for high-level global investors under tight deadlines.'
  },
  {
    id: 3,
    title: 'Al Raya Collection',
    category: 'Brand Strategy',
    year: '2023',
    image: '/projects/project-1.png',
    description: 'Strategic repositioning for a luxury portfolio, elevating its market presence through refined storytelling and bold aesthetics.',
    client: 'Salhia Real Estate',
    metrics: [
      { label: 'Awareness', value: '+215%' },
      { label: 'Conversion', value: '3.4x' },
      { label: 'Reach', value: '2.1M' }
    ],
    tags: ['Market Research', 'Positioning', 'Copywriting', 'Campaign Rollout'],
    challenge: 'Differentiating a legacy luxury center in an increasingly saturated and highly competitive local market.'
  },
  {
    id: 4,
    title: 'Abu Dhabi Design Week',
    category: 'Exhibition Booth',
    year: '2023',
    image: '/projects/project-2.png',
    description: 'An architectural installation that challenges spatial norms, creating a fluid journey for visitors exploring modern design.',
    client: 'ADDW',
    metrics: [
      { label: 'Footfall', value: '14K' },
      { label: 'Dwell Time', value: '14m' },
      { label: 'Leads', value: '320' }
    ],
    tags: ['Architecture', '3D Modeling', 'Fabrication', 'Lighting Design'],
    challenge: 'Designing a structure that is both visually arresting and functionally capable of handling high foot traffic safely.'
  },
]

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handleOpenPanel = (project: ProjectData) => {
    setSelectedProject(project)
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setTimeout(() => {
      setSelectedProject(null)
    }, 700)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-16')
          }
        })
      },
      { threshold: 0.12 }
    )

    const items = sectionRef.current?.querySelectorAll('.reveal-on-scroll')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="work"
      className="py-28 md:py-40 bg-[#0E0E10] text-[#F7F6F3] relative overflow-hidden hairline-grid-dark border-t border-white/10"
    >
      {/* Dynamic Ambient Blur Flashes */}
      <div className="absolute top-[15%] right-[-10%] w-[45rem] h-[45rem] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-10%] w-[35rem] h-[35rem] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <ArchitecturalShapes
        variant="curve"
        size="xl"
        className="absolute -bottom-20 -left-20 text-[#8E8D8A]"
        opacity={0.05}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <div className="mb-20 md:mb-32 reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 ease-out border-b border-white/10 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F7F6F3] animate-pulse" />
            <p className="tracking-[0.3em] uppercase text-xs font-semibold text-[#8E8D8A] font-mono">
              // Selected Showcase
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-syne-display tracking-tighter text-[#F7F6F3] leading-[1.02]">
              Featured <br />
              <span className="font-serif-accent text-[#8E8D8A] font-normal italic">Works.</span>
            </h2>
            <p className="text-[#8E8D8A] max-w-sm text-sm md:text-base leading-relaxed font-sans">
              A curated selection of defining identity systems, spatial environments, and digital benchmarks for market leaders.
            </p>
          </div>
        </div>

        {/* Projects List - Editorial Staggered Layout */}
        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => handleOpenPanel(project)}
              className={`reveal-on-scroll cursor-pointer opacity-0 translate-y-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } md:gap-16 lg:gap-24 items-center group relative w-full h-[75vh] md:h-auto mb-2 md:mb-0`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Image Frame Container */}
              <div className="w-full h-full md:w-[60%] lg:w-[65%] md:h-auto relative group z-20">
                {/* Oversized Number Watermark */}
                <div
                  className={`hidden md:block absolute ${
                    idx % 2 === 0 ? '-left-16' : '-right-16'
                  } -bottom-20 text-[14rem] font-bold text-white/[0.03] z-0 pointer-events-none select-none font-numeric-tabular font-syne-display rotate-[-4deg] group-hover:rotate-0 transition-transform duration-1000`}
                >
                  0{idx + 1}
                </div>

                <div className="relative w-full h-full md:aspect-[16/11] z-10 overflow-hidden md:rounded-lg bg-[#18181B] border border-white/10 shadow-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10]/90 via-[#0E0E10]/30 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-out" />

                  {/* Central Hover Badge (Desktop) */}
                  <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-90 group-hover:scale-100 pointer-events-none">
                    <div className="w-28 h-28 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex flex-col items-center justify-center text-[#F7F6F3] transform group-hover:-translate-y-1 transition-transform duration-500 shadow-2xl">
                      <span className="text-[11px] font-semibold tracking-widest uppercase mb-1 font-mono">View Case</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content Block */}
              <div className={`absolute bottom-0 left-0 w-full p-6 md:p-0 z-30 md:relative md:w-[40%] lg:w-[35%] flex flex-col justify-end md:justify-center ${idx % 2 === 0 ? 'md:pr-6' : 'md:pl-6'}`}>
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <span className="text-xs font-mono text-[#8E8D8A] font-numeric-tabular">0{idx + 1}</span>
                  <div className="h-px bg-white/20 w-12 md:group-hover:w-20 md:group-hover:bg-white transition-all duration-500" />
                  <span className="text-xs tracking-[0.25em] uppercase text-[#F7F6F3] font-semibold font-mono">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-syne-display text-[#F7F6F3] mb-4 md:mb-6 tracking-tighter leading-[1.05] transition-colors duration-500 group-hover:text-white">
                  {project.title}
                </h3>

                <p className="text-white/80 md:text-[#8E8D8A] text-xs sm:text-sm md:text-base mb-6 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none font-sans">
                  {project.description}
                </p>

                {/* Key Metrics Banner with font-numeric-tabular */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex gap-6 mb-8 pt-4 border-t border-white/10 text-xs font-mono font-numeric-tabular text-[#8E8D8A]">
                    {project.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <span className="text-[#F7F6F3] font-bold text-sm block font-numeric-tabular">{m.value}</span>
                        <span className="text-[10px] uppercase text-[#6E6E73]">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Discover Link */}
                <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F6F3] group-hover:text-white transition-colors duration-300">
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8E8D8A] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-24 md:mt-40 text-center reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-px bg-white/10 z-0 hidden md:block" />

          <Link
            href="/case-studies"
            className="relative z-10 inline-flex items-center justify-center px-8 py-4 bg-[#18181B] border border-white/20 hover:border-white/40 text-[#F7F6F3] rounded-full group transition-all duration-300 active-press shadow-xl"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-semibold mr-4 group-hover:mr-6 transition-all duration-300">
              View All Case Studies
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#0E0E10] transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>

      {/* Side Panel Overlay */}
      <ProjectPanel
        project={selectedProject}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </section>
  )
}
