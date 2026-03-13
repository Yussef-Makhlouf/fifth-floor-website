'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import GridBackground, { DotPattern } from '@/components/ui/grid-background'
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
      { label: 'Engagement', value: '1.2S' }
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
    // Optional delay to clear project content after slide-out animation completes
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
      { threshold: 0.15 }
    )

    const items = sectionRef.current?.querySelectorAll('.reveal-on-scroll')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="work"
      className="py-24 md:py-32 bg-[#1A1A1A] relative overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#404040] to-transparent opacity-30" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#404040] to-transparent opacity-30" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#404040] to-transparent opacity-20" />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <ArchitecturalShapes
        variant="curve"
        size="xl"
        className="absolute -bottom-20 -left-20"
        opacity={0.03}
      />

      <GridBackground
        fadeFrom="left"
        gridColor="#555555"
        gridSizeX={40}
        gridSizeY={50}
        opacity={0.08}
      />

      {/* Remove side padding on mobile (px-0) but keep on desktop (md:px-12) */}
      <div className="max-w-7xl mx-auto px-0 md:px-12 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <div className="mb-16 md:mb-32 px-6 md:px-0 reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 ease-out">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#CFCFCF] animate-pulse" />
            <p className="tracking-[0.2em] uppercase text-sm font-medium text-[#A0A0A0]">Selected Work</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1]">
              Featured <br />
              <span className="text-[#6A6A6A] italic font-serif">Projects</span>
            </h2>
            <p className="text-[#919191] max-w-sm text-lg md:text-xl md:pb-4 leading-relaxed">
              Where strategic vision meets immaculate execution. A showcase of our finest defining moments.
            </p>
          </div>
        </div>

        {/* Projects List - Editorial Style */}
        <div className="flex flex-col gap-0 md:gap-40">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => handleOpenPanel(project)}
              className={`reveal-on-scroll cursor-pointer opacity-0 translate-y-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } md:gap-16 lg:gap-24 items-center group relative w-full h-[75vh] md:h-auto mb-2 md:mb-0`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Image Container - Full bleed on mobile */}
              <div className="w-full h-full md:w-[60%] lg:w-[65%] md:h-auto relative group z-20">
                {/* Number Watermark (Desktop) */}
                <div className={`hidden md:block absolute ${idx % 2 === 0 ? '-left-16' : '-right-16'} -bottom-20 text-[15rem] font-bold text-white/5 z-0 pointer-events-none select-none font-serif rotate-[-5deg] group-hover:rotate-0 transition-transform duration-1000`}>
                  0{idx + 1}
                </div>
                
                <div className="relative w-full h-full md:aspect-[16/11] z-10 overflow-hidden md:rounded-sm bg-[#222]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient (Always visible on mobile bottom, hover on desktop) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                  
                  {/* Central Hover Button (Desktop only) */}
                  <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-90 group-hover:scale-100 pointer-events-none">
                    <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white transform group-hover:-translate-y-2 transition-transform duration-700 delay-100">
                      <span className="text-xs font-semibold tracking-widest uppercase mb-1">View</span>
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Decorative Frame Lines triggered on hover (Desktop) */}
                  <div className="hidden md:block absolute top-6 left-6 w-0 h-px bg-white/50 group-hover:w-16 transition-all duration-700 delay-100" />
                  <div className="hidden md:block absolute top-6 left-6 w-px h-0 bg-white/50 group-hover:h-16 transition-all duration-700 delay-100" />
                  <div className="hidden md:block absolute bottom-6 right-6 w-0 h-px bg-white/50 group-hover:w-16 transition-all duration-700 delay-100" />
                  <div className="hidden md:block absolute bottom-6 right-6 w-px h-0 bg-white/50 group-hover:h-16 transition-all duration-700 delay-100" />
                </div>
              </div>

              {/* Text Content - Floating overlay on mobile, side text on desktop */}
              <div className={`absolute bottom-0 left-0 w-full p-6 md:p-0 z-30 md:relative md:w-[40%] lg:w-[35%] flex flex-col justify-end md:justify-center ${idx % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="flex items-center gap-4 mb-4 md:mb-8">
                  <span className="text-sm font-mono text-white/50 md:text-[#919191]">0{idx + 1}</span>
                  <div className="h-px bg-white/30 md:bg-[#4A4A4A] w-12 md:group-hover:w-24 md:group-hover:bg-[#CFCFCF] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="text-xs tracking-[0.2em] uppercase text-white font-medium">{project.category}</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-8 tracking-tight leading-[1.1] transition-all duration-700 md:group-hover:text-transparent md:group-hover:bg-clip-text md:group-hover:bg-gradient-to-r md:group-hover:from-white md:group-hover:to-[#6A6A6A]">
                  {project.title}
                </h3>
                
                <p className="text-white/70 md:text-[#919191] text-sm sm:text-base md:text-lg mb-6 md:mb-12 leading-relaxed max-w-md md:group-hover:text-[#B0B0B0] transition-colors duration-500 line-clamp-2 md:line-clamp-none">
                   {project.description}
                </p>
                
                {/* Discover Link with hover line */}
                <div className="flex flex-col items-start gap-2 w-fit cursor-pointer group/link">
                  <div className="flex items-center gap-3">
                    <span className="text-white md:text-[#CFCFCF] font-medium text-xs sm:text-sm md:text-base tracking-wide uppercase md:group-hover/link:text-white transition-colors duration-300">
                      Discover Case Study
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/70 md:text-[#919191] md:group-hover/link:text-white group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all duration-300" />
                  </div>
                  <div className="h-px bg-white/30 md:bg-[#404040] w-full relative overflow-hidden hidden md:block">
                     <div className="absolute top-0 left-0 h-full w-full bg-white -translate-x-full md:group-hover/link:translate-x-0 transition-transform duration-500 ease-out" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 md:mt-48 mb-12 md:mb-0 text-center reveal-on-scroll opacity-0 translate-y-16 transition-all duration-1000 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#404040] to-transparent z-0 hidden md:block" />
          
          <a
            href="#"
            className="relative z-10 inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 bg-[#222] md:bg-[#1A1A1A] border border-[#404040] hover:border-[#6A6A6A] rounded-full group transition-all duration-500 hover:scale-[1.02]"
          >
            <span className="text-white text-sm md:text-lg font-medium tracking-wide mr-4 md:mr-6 group-hover:mr-8 transition-all duration-500">View All Work</span>
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#333] md:bg-[#2A2A2A] flex items-center justify-center group-hover:bg-white transition-colors duration-500">
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-black transition-colors duration-500" />
            </div>
          </a>
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
