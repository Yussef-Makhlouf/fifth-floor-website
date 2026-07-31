'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ServiceItem } from '@/lib/data/services'
import { projects, Project } from '@/lib/projects-data'

// Mapping from service slug → array of project slugs
const serviceProjectMap: Record<string, string[]> = {
  'branding': ['b-genius', 'technova', 'dabdoob'],
  'brand-strategy': ['b-genius', 'technova', 'burgan-bank'],
  'social-media-management': ['andalus-mall', 'b-genius', 'technova'],
  'digital-marketing': ['andalus-mall', 'technova', 'b-genius'],
  'marketing-campaigns': ['burgan-bank', 'andalus-mall', 'technova'],
  'ui-ux-design': ['technova', 'b-genius', 'andalus-mall'],
  'offline-designs': ['dabdoob', 'b-genius', 'burgan-bank'],
  'printing-services': ['dabdoob', 'b-genius', 'burgan-bank'],
  'offline-productions': ['burgan-bank', 'b-genius', 'technova'],
  'photo-video-shooting': ['burgan-bank', 'andalus-mall', 'b-genius'],
  'voice-over': ['burgan-bank', 'andalus-mall', 'b-genius'],
  'modeling': ['burgan-bank', 'andalus-mall', 'b-genius'],
  'cgi-vfx-3d-2d': ['technova', 'burgan-bank', 'andalus-mall'],
  'ai-solutions': ['technova', 'andalus-mall', 'b-genius'],
  'business-development': ['burgan-bank', 'technova', 'b-genius'],
}

interface ServiceRelatedProjectsProps {
  service: ServiceItem
}

function CardCover({ project }: { project: Project }) {
  if (project.coverType === 'video') {
    return (
      <video
        src={project.coverImage}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    )
  }
  if (project.coverType === 'svg') {
    return (
      <img
        src={project.coverImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ background: '#f5f4f1' }}
      />
    )
  }
  return (
    <Image
      src={project.coverImage}
      alt={project.title}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
  )
}

export default function ServiceRelatedProjects({ service }: ServiceRelatedProjectsProps) {
  // Get related project slugs for the current service
  const targetSlugs = serviceProjectMap[service.slug]

  let relatedProjects: Project[] = []
  if (targetSlugs && targetSlugs.length > 0) {
    relatedProjects = targetSlugs
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter((p): p is Project => p !== undefined)
  }

  // Fallback to top projects if no specific mapping found
  if (relatedProjects.length === 0) {
    relatedProjects = projects.slice(0, 3)
  }

  return (
    <section className="py-20 md:py-28 bg-[#fafafa] border-t border-[#ebebeb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#6A6A6A] font-medium">
                Related Work
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight text-[#1a1a1a] tracking-tight">
              Projects in <span className="text-[#919191] font-serif italic">{service.title}.</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#6A6A6A] hover:text-[#1a1a1a] transition-colors self-start sm:self-end shrink-0"
          >
            <span>View all case studies</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProjects.map((project) => (
            <Link
              key={project.id}
              href={`/case-studies/${project.slug}`}
              className="group relative flex flex-col bg-white border border-[#ebebeb] hover:border-[#c8c8c8] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Media Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#f5f5f5]">
                <CardCover project={project} />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[9px] uppercase tracking-[0.2em] text-[#3E3E3E] font-medium">
                    {project.categoryFilter}
                  </span>
                </div>

                {/* Project number */}
                <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-widest text-white/0 group-hover:text-white/80 transition-colors duration-500 z-10">
                  {project.number}
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 flex flex-col flex-1">
                {/* Left accent line on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#1a1a1a] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

                {/* Client + Year */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#919191] font-medium">
                    {project.client}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-[#c0c0c0]">
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-light text-[#1a1a1a] mb-2 leading-snug tracking-tight group-hover:text-[#0a0a0a] transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-[#6A6A6A] font-light leading-relaxed mb-4 line-clamp-2">
                  {project.tagline}
                </p>

                {/* Metrics row */}
                {project.metrics.length > 0 && (
                  <div className="flex gap-5 pt-4 border-t border-[#f0f0f0] mt-auto mb-4">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label}>
                        <div className="font-mono text-sm font-light text-[#1a1a1a]">
                          {metric.value}
                        </div>
                        <div className="text-[8px] uppercase tracking-widest text-[#919191] mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] uppercase tracking-[0.15em] text-[#919191] border border-[#ebebeb] px-2 py-0.5 group-hover:border-[#c0c0c0] transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-[#ebebeb] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#919191] leading-relaxed max-w-sm text-center sm:text-left">
            Every project is a testament to FIFTH FLOOR&apos;s commitment to creative and strategic excellence.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] hover:text-[#919191] transition-colors shrink-0"
          >
            <span>Start your project</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
