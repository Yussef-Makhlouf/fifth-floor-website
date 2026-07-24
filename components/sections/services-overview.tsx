'use client'

import Image from 'next/image'
import { creativeServices, digitalServices, ServiceItem } from '@/lib/data/services'

/* ─── Creative Card: Editorial zig-zag layout ─── */
function CreativeServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const isReversed = index % 2 !== 0
  return (
    <article
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className={`relative flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} bg-white hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] transition-all duration-700 overflow-hidden border border-[#f0f0f0] hover:border-[#e0e0e0]`}>

        {/* Image Side */}
        <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[380px] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 ${isReversed ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent via-transparent to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

          {/* Category label */}
          <div className="absolute top-4 left-4">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[9px] uppercase tracking-[0.2em] text-[#3E3E3E] font-medium">
              Creative
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="relative w-full md:w-1/2 p-8 md:p-10 lg:p-14 flex flex-col justify-center">
          {/* Animated left border accent */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#3E3E3E] scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-500 hidden md:block" />

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-10 h-10 mb-6 bg-[#f5f5f5] text-[#3E3E3E] group-hover:bg-[#1a1a1a] group-hover:text-white transition-all duration-400">
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-light text-[#1a1a1a] mb-4 leading-tight tracking-tight group-hover:text-[#0a0a0a] transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#6A6A6A] text-sm leading-relaxed mb-7">
            {service.description}
          </p>

          {/* Keywords — styled as bordered chips */}
          <div className="flex flex-wrap gap-2 pt-5 border-t border-[#f0f0f0] mb-6">
            {service.keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-[9px] uppercase tracking-[0.18em] text-[#919191] border border-[#ebebeb] px-2.5 py-1 group-hover:border-[#c0c0c0] transition-colors duration-300"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Explore link */}
          <a
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.2em] text-[#919191] group-hover:text-[#1a1a1a] transition-all duration-300 mt-auto"
          >
            <span>Explore service</span>
            <svg className="w-3 h-3 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="block w-0 group-hover:w-8 h-px bg-[#1a1a1a] transition-all duration-500" />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ─── Digital Service: Bento card ─── */
interface DigitalBentoCardProps {
  service: ServiceItem
  index: number
  featured?: boolean
}

function DigitalBentoCard({ service, index, featured = false }: DigitalBentoCardProps) {
  return (
    <article
      className={`group animate-slide-up relative overflow-hidden bg-[#0f0f0f] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 ${featured ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image section */}
      <div className={`relative overflow-hidden flex-shrink-0 ${featured ? 'w-full sm:w-1/2 aspect-[16/10] sm:aspect-auto' : 'aspect-[16/10]'}`}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-700 group-hover:scale-[1.03] scale-100 transition-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-[9px] uppercase tracking-[0.18em] text-white/70 font-medium">
            Digital
          </span>
        </div>

        {/* Service number watermark */}
        <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-widest text-white/20 font-numeric-tabular">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content section */}
      <div className={`relative p-6 sm:p-7 flex flex-col flex-1 ${featured ? '' : ''}`}>
        {/* Left border accent */}
        <div className="absolute left-0 top-4 bottom-4 w-px bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-9 h-9 mb-5 bg-white/[0.06] text-white/60 group-hover:bg-white/[0.12] group-hover:text-white transition-all duration-300">
          {service.icon}
        </div>

        <h3 className={`font-light text-white leading-snug tracking-tight mb-3 group-hover:text-white transition-colors duration-300 ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
          {service.title}
        </h3>

        <p className={`text-white/40 leading-relaxed mb-5 flex-1 group-hover:text-white/60 transition-colors duration-300 ${featured ? 'text-sm' : 'text-xs'}`}>
          {service.description}
        </p>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06] mb-4">
          {service.keywords.slice(0, featured ? 4 : 2).map((k) => (
            <span key={k} className="text-[8px] uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors">
              {k}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/30 group-hover:text-white/70 transition-all duration-300"
        >
          <span>Explore</span>
          <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  )
}

export default function ServicesOverview() {
  return (
    <section id="services-overview" className="relative py-24 sm:py-32 bg-white border-t border-[#f0f0f0] overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24">

        {/* ─── CREATIVE SERVICES ─── */}
        <div className="mb-24 sm:mb-32">
          {/* Section intro */}
          <div className="mb-14 sm:mb-18 animate-slide-up">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6A6A6A] font-medium">Creative services</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl font-light leading-tight text-[#1a1a1a] tracking-tight">
                Strategic creativity
              </h2>
              <p className="text-sm text-[#6A6A6A] max-w-sm leading-relaxed sm:text-right">
                Brand strategy, experiential design, and creative direction for discerning brands and cultural institutions.
              </p>
            </div>
          </div>

          {/* Creative — editorial stacked zig-zag */}
          <div className="space-y-6 sm:space-y-8">
            {creativeServices.map((service, idx) => (
              <CreativeServiceCard key={service.slug} service={service} index={idx} />
            ))}
          </div>
        </div>

        {/* ─── Divider ─── */}
        <div className="flex items-center gap-4 mb-24 sm:mb-32">
          <div className="flex-1 h-px bg-[#f0f0f0]" />
          <div className="w-1 h-1 bg-[#c8c8c8] rotate-45" />
          <div className="flex-1 h-px bg-[#f0f0f0]" />
        </div>

        {/* ─── DIGITAL SERVICES ─── */}
        <div>
          {/* Section intro */}
          <div className="mb-14 sm:mb-18 animate-slide-up">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-8 h-px bg-[#6A6A6A]" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6A6A6A] font-medium">Digital services</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl font-light leading-tight text-[#1a1a1a] tracking-tight">
                Digital infrastructure
              </h2>
              <p className="text-sm text-[#6A6A6A] max-w-sm leading-relaxed sm:text-right">
                Development, hosting, SEO, and product consulting — powered by modern technologies for sustainable growth.
              </p>
            </div>
          </div>

          {/* Digital — Asymmetric bento grid */}
          <div className="space-y-3 sm:space-y-4">

            {/* Row 1: 1 featured wide card */}
            <DigitalBentoCard service={digitalServices[0]} index={0} featured />

            {/* Row 2: 2-col split — wide left + narrow right */}
            <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-3 sm:gap-4">
              <DigitalBentoCard service={digitalServices[1]} index={1} />
              <DigitalBentoCard service={digitalServices[2]} index={2} />
            </div>

            {/* Row 3: narrow left + wide right (flip) */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] gap-3 sm:gap-4">
              <DigitalBentoCard service={digitalServices[3]} index={3} />
              <DigitalBentoCard service={digitalServices[4]} index={4} />
            </div>

            {/* Row 4: final card full-width but compact */}
            {digitalServices[5] && (
              <DigitalBentoCard service={digitalServices[5]} index={5} featured />
            )}
          </div>
        </div>

        {/* ─── Bottom Statement ─── */}
        <div className="mt-20 sm:mt-28 pt-10 border-t border-[#f0f0f0] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="text-xs text-[#919191] max-w-lg leading-relaxed">
            FIFTH FLOOR delivers technical services and expansion strategies to serve all sectors and leading enterprises with confidence and flexibility.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] hover:text-[#6A6A6A] transition-colors"
          >
            <span>Discuss your project</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
