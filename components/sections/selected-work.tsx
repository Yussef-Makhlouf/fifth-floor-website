'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import GridBackground, { DotPattern } from '@/components/ui/grid-background'

const projects = [
  {
    id: 1,
    title: 'Ministry of Culture',
    category: 'Brand Identity',
    year: '2024',
    image: '/projects/project-1.png',
  },
  {
    id: 2,
    title: 'Kuwait Investment Forum',
    category: 'Event Design',
    year: '2024',
    image: '/projects/project-2.png',
  },
  {
    id: 3,
    title: 'Al Raya Collection',
    category: 'Brand Strategy',
    year: '2023',
    image: '/projects/project-1.png',
  },
  {
    id: 4,
    title: 'Dubai Design Week',
    category: 'Exhibition Booth',
    year: '2023',
    image: '/projects/project-2.png',
  },
]

export default function SelectedWork() {
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

    const items = sectionRef.current?.querySelectorAll('.project-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="work"
      className="section-padding bg-[#3E3E3E] relative overflow-hidden"
    >
      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-px h-40 bg-[#6A6A6A] opacity-20" />
      <div className="absolute bottom-0 right-1/3 w-px h-32 bg-[#6A6A6A] opacity-20" />

      <ArchitecturalShapes
        variant="curve"
        size="xl"
        className="absolute -bottom-20 -left-20"
        opacity={0.05}
      />

      {/* Fading Grid Background - Left Side (for dark section) */}
      <GridBackground
        fadeFrom="left"
        gridColor="#6A6A6A"
        gridSizeX={30}
        gridSizeY={40}
        opacity={0.12}
      />

      {/* Dot Pattern - Bottom Center */}
      <DotPattern
        fadeFrom="bottom"
        dotColor="#919191"
        dotSize={1}
        spacing={36}
        opacity={0.08}
      />

      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <p className="section-label mb-4 text-[#919191]">Selected Work</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#CFCFCF] mb-6">
            Recent Projects
          </h2>
          <div className="w-20 h-px bg-[#6A6A6A]" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="project-item opacity-0 translate-y-8 transition-all duration-700 group cursor-pointer"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Image Container with Architectural Frame */}
              <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-[#2a2a2a]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Architectural Frame Lines */}
                <div className="absolute top-4 left-4 w-8 h-px bg-[#CFCFCF] opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 w-px h-8 bg-[#CFCFCF] opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 w-8 h-px bg-[#CFCFCF] opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 w-px h-8 bg-[#CFCFCF] opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              </div>

              {/* Project Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#CFCFCF] mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#919191]">{project.category}</p>
                </div>
                <span className="text-sm text-[#6A6A6A]">{project.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 md:mt-24 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-[#CFCFCF] font-medium hover:text-[#919191] transition-colors duration-300 hover-line-extend"
          >
            <span>View All Projects</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
