'use client'

import { use, useEffect, useRef, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import { getProjectBySlug, getAdjacentProjects, type GalleryItem, type Reel } from '@/lib/projects-data'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

// ─── Cover Media ──────────────────────────────────────────────────────────────
function CoverMedia({ src, type, alt, className }: { src: string; type: string; alt: string; className?: string }) {
  if (type === 'video') {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={className}
      />
    )
  }
  if (type === 'svg') {
    return <img src={src} alt={alt} className={className} />
  }
  return <Image src={src} alt={alt} fill className={`object-cover ${className ?? ''}`} />
}

// ─── Lightbox Modal ────────────────────────────────────────────────────────────
function LightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  item: GalleryItem
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        aria-label="Close modal"
      >
        <span className="font-mono text-xs uppercase tracking-widest px-2">Close ✕</span>
      </button>

      {/* Navigation - Prev */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Previous image"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      )}

      {/* Content wrapper */}
      <div
        className="relative max-w-7xl max-h-[90vh] flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        )}
      </div>

      {/* Navigation - Next */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Next image"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      )}

      {/* Caption bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-wider text-white/70 bg-black/60 px-4 py-2 rounded-full border border-white/10">
        {item.alt}
      </div>
    </div>
  )
}

// ─── Gallery Cell ──────────────────────────────────────────────────────────────
function GalleryCell({
  item,
  index,
  onClick,
}: {
  item: GalleryItem
  index: number
  onClick: () => void
}) {
  const isWide = item.span === 'wide'

  return (
    <div
      onClick={onClick}
      className={`reveal-item group relative overflow-hidden bg-[#ECEAE7] rounded-xl border border-black/[0.06] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${
        isWide ? 'col-span-1 md:col-span-2' : 'col-span-1'
      }`}
      style={{ opacity: 0, transform: 'translateY(24px)', transition: `all 0.7s ease ${index * 0.05}s` }}
    >
      <div className="w-full flex items-center justify-center p-2 md:p-3">
        {item.type === 'video' ? (
          <video
            src={item.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block object-contain rounded-lg transition-transform duration-700 group-hover:scale-[1.01]"
          />
        ) : item.type === 'svg' ? (
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-auto max-h-[75vh] block object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="w-full h-auto block object-contain rounded-lg transition-transform duration-700 group-hover:scale-[1.01]"
          />
        )}
      </div>

      {/* Hover overlay badge */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-widest bg-black/75 text-white px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md flex items-center gap-1.5">
          <ArrowUpRight className="w-3 h-3" /> View Full
        </span>
      </div>
    </div>
  )
}

// ─── Reel Player ──────────────────────────────────────────────────────────────
function ReelPlayer({ reel, index }: { reel: Reel; index: number }) {
  return (
    <div
      className="reveal-item flex flex-col"
      style={{ opacity: 0, transform: 'translateY(24px)', transition: `all 0.7s ease ${index * 0.12}s` }}
    >
      {/* Cinematic frame */}
      <div className="border border-white/10 overflow-hidden shadow-2xl rounded-lg">
        {/* Browser chrome */}
        <div className="bg-[#141414] px-4 py-2.5 flex items-center justify-between border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-[9px] text-white/25 tracking-widest uppercase truncate max-w-[200px]">
            {reel.title}
          </span>
          <div className="w-12" />
        </div>
        {/* Video */}
        <div className="relative aspect-[9/16] bg-black flex items-center justify-center">
          <video
            src={reel.src}
            controls
            muted
            loop
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/30 mt-3 px-1">
        {reel.title}
      </p>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { prev, next } = getAdjacentProjects(slug)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const items = document.querySelectorAll('.reveal-item')
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="bg-[#F8F7F4] text-[#1A1A1A] overflow-x-hidden">
      <NavBar theme="dark" />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-[#0C0C0C] relative overflow-hidden flex items-end">

        {/* Giant number watermark */}
        <div className="absolute inset-0 flex items-center justify-start pl-4 pointer-events-none select-none overflow-hidden">
          <span className="text-[35vw] font-black text-white/[0.025] leading-none tracking-tight">
            {project.number}
          </span>
        </div>

        {/* Cover media — right half with gradient mask */}
        <div className="absolute top-0 right-0 w-full lg:w-[58%] h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/60 lg:via-[#0C0C0C]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-transparent to-transparent z-10" />
          {project.coverType === 'video' ? (
            <video
              src={project.coverImage}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : project.coverType === 'svg' ? (
            <img src={project.coverImage} alt={project.client} className="w-full h-full object-cover" />
          ) : (
            <Image src={project.coverImage} alt={project.client} fill className="object-cover" />
          )}
        </div>

        {/* Hero content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24 pt-36">
          <div className="max-w-2xl">

            {/* Back link */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-white/30 hover:text-white/70 transition-colors mb-10 group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              All Projects
            </Link>

            {/* Category badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
                {project.category}
              </span>
            </div>

            {/* Client name — main title */}
            <h1 className="text-[13vw] sm:text-8xl md:text-[7rem] lg:text-[6.5rem] font-light text-white leading-[0.88] tracking-tighter mb-6">
              {project.client}
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/40 font-light italic mb-14 max-w-lg leading-relaxed">
              "{project.tagline}"
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-8 flex-wrap">
              {[
                { label: 'Year', value: project.year },
                { label: 'Category', value: project.categoryFilter },
                { label: 'Project', value: project.number },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-8">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/25 block mb-1">
                      {item.label}
                    </span>
                    <span className="font-mono text-white/80 text-xs tracking-wider">{item.value}</span>
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-white/15" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2 z-20">
          <div
            className="w-px h-14 bg-gradient-to-b from-transparent to-white/25"
            style={{ animation: 'grow 2.4s ease-in-out infinite' }}
          />
          <span
            className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/20"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ── METRICS BAR ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E5E5E5]">
        <div className="grid grid-cols-3 divide-x divide-[#E5E5E5]">
          {project.metrics.map((m, i) => (
            <div
              key={i}
              className="reveal-item py-10 px-6 md:px-10 text-center"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: `all 0.6s ease ${i * 0.1}s` }}
            >
              <div className="text-3xl md:text-5xl font-light text-[#1A1A1A] mb-2 font-mono tracking-tight">
                {m.value}
              </div>
              <div className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.28em] text-[#919191]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-32 border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24">

            {/* Description */}
            <div
              className="reveal-item"
              style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.7s ease' }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-6 h-px bg-[#1A1A1A]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#919191]">Overview</span>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#1A1A1A] leading-[1.4] tracking-tight">
                {project.description}
              </p>
            </div>

            {/* Challenge + Solution */}
            <div className="flex flex-col gap-12">
              <div
                className="reveal-item"
                style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.7s ease 0.1s' }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#919191] mb-4 block">
                  The Challenge
                </span>
                <p className="text-sm md:text-base text-[#6A6A6A] font-light leading-relaxed border-l-2 border-[#E5E5E5] pl-6">
                  {project.challenge}
                </p>
              </div>
              <div
                className="reveal-item"
                style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.7s ease 0.2s' }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#919191] mb-4 block">
                  Our Approach
                </span>
                <p className="text-sm md:text-base text-[#6A6A6A] font-light leading-relaxed border-l-2 border-[#1A1A1A] pl-6">
                  {project.solution}
                </p>
              </div>

              {/* Tags */}
              <div
                className="reveal-item"
                style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.7s ease 0.3s' }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#919191] mb-4 block">
                  Scope of Work
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 border border-[#E5E5E5] text-[9px] font-mono uppercase tracking-[0.2em] text-[#6A6A6A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      {project.gallery.length > 0 && (
        <section className="bg-[#F0EEE9] py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div
              className="reveal-item flex items-center gap-4 mb-14"
              style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
            >
              <div className="w-8 h-px bg-[#1A1A1A]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#919191]">
                Visual Work
              </span>
              <div className="ml-auto font-mono text-[9px] text-[#919191] tracking-widest">
                [{String(project.gallery.length).padStart(2, '0')}]
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {project.gallery.map((item, i) => (
                <GalleryCell
                  key={i}
                  item={item}
                  index={i}
                  onClick={() => setLightboxIndex(i)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LIGHTBOX MODAL ──────────────────────────────────────────────────── */}
      {lightboxIndex !== null && project.gallery[lightboxIndex] && (
        <LightboxModal
          item={project.gallery[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null && prev < project.gallery.length - 1 ? prev + 1 : prev
            )
          }
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < project.gallery.length - 1}
        />
      )}

      {/* ── VIDEO REELS ──────────────────────────────────────────────────── */}
      {project.reels.length > 0 && (
        <section className="bg-[#0C0C0C] py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div
              className="reveal-item flex items-center gap-4 mb-14"
              style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
            >
              <div className="w-8 h-px bg-white/20" />
              <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/35">
                Production Reels
              </span>
              <div className="ml-auto font-mono text-[9px] text-white/25 tracking-widest">
                [{String(project.reels.length).padStart(2, '0')}]
              </div>
            </div>

            <div
              className={`grid grid-cols-1 gap-8 ${
                project.reels.length === 2
                  ? 'sm:grid-cols-2'
                  : project.reels.length >= 3
                  ? 'sm:grid-cols-2 lg:grid-cols-3'
                  : ''
              }`}
            >
              {project.reels.map((reel, i) => (
                <ReelPlayer key={i} reel={reel} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-y border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div
            className="reveal-item flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16"
            style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s ease' }}
          >
            <div className="shrink-0">
              <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#919191] whitespace-nowrap">
                Services Delivered
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {project.services.map((svc) => (
                <span
                  key={svc}
                  className="px-5 py-2.5 border border-[#E5E5E5] hover:border-[#1A1A1A] text-[9px] font-mono uppercase tracking-[0.22em] text-[#6A6A6A] hover:text-[#1A1A1A] transition-colors cursor-default"
                >
                  {svc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT NAVIGATION ───────────────────────────────────────────── */}
      <section className="bg-[#F8F7F4] border-b border-[#E5E5E5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E5E5]">
          {/* Previous */}
          {prev ? (
            <Link
              href={`/case-studies/${prev.slug}`}
              className="group p-10 md:p-16 lg:p-20 hover:bg-white transition-all duration-300 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3 text-[#919191] group-hover:text-[#1A1A1A] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-[9px] uppercase tracking-[0.28em]">Previous</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#919191] block mb-2">{prev.number}</span>
                <h3 className="text-2xl md:text-3xl font-light text-[#1A1A1A] mb-1 group-hover:tracking-tight transition-all duration-500">
                  {prev.client}
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#919191]">
                  {prev.category}
                </span>
              </div>
            </Link>
          ) : (
            <div className="p-10 md:p-16 lg:p-20 bg-[#F8F7F4]" />
          )}

          {/* Next */}
          {next ? (
            <Link
              href={`/case-studies/${next.slug}`}
              className="group p-10 md:p-16 lg:p-20 hover:bg-white transition-all duration-300 flex flex-col gap-5 items-end text-right"
            >
              <div className="flex items-center gap-3 text-[#919191] group-hover:text-[#1A1A1A] transition-colors">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em]">Next</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#919191] block mb-2">{next.number}</span>
                <h3 className="text-2xl md:text-3xl font-light text-[#1A1A1A] mb-1 group-hover:tracking-tight transition-all duration-500">
                  {next.client}
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#919191]">
                  {next.category}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              href="/case-studies"
              className="group p-10 md:p-16 lg:p-20 hover:bg-white transition-all duration-300 flex flex-col gap-5 items-end text-right"
            >
              <div className="flex items-center gap-3 text-[#919191] group-hover:text-[#1A1A1A] transition-colors">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em]">All Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-[#1A1A1A] mb-1">View All</h3>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#919191]">Case Studies</span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0C0C0C] py-28 md:py-40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="reveal-item"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s ease' }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/25 mb-8">
              Ready to Build Something?
            </p>
            <h2 className="text-5xl md:text-7xl font-light text-white mb-6 leading-[1.05] tracking-tight">
              Let's create your
              <br />
              <span className="text-white/30 italic font-light"> next chapter.</span>
            </h2>
            <p className="text-white/35 text-sm md:text-base font-light mb-14 max-w-md mx-auto leading-relaxed">
              We turn ambitious ideas into unforgettable brand experiences. Let's talk.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-8 py-4 bg-white text-[#0C0C0C] hover:bg-white/90 transition-colors font-mono text-[10px] uppercase tracking-[0.25em] group"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Global styles for this page */}
      <style jsx global>{`
        @keyframes grow {
          0%, 100% { transform: scaleY(0.3); opacity: 0.2; transform-origin: top; }
          50% { transform: scaleY(1); opacity: 1; transform-origin: top; }
        }
      `}</style>
    </div>
  )
}
