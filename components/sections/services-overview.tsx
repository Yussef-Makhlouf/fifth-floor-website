'use client'

import Image from 'next/image'
import { Monitor, Palette, Globe, Server, Search, Lightbulb, Layers, Sparkles, Film } from 'lucide-react'
import GridBackground from '@/components/ui/grid-background'
import { CircleDecoration } from '@/components/ui/architectural-shapes'

interface ServiceItem {
  title: string
  description: string
  keywords: string[]
  icon: React.ReactNode
  slug: string
  image: string
}

const creativeServices: ServiceItem[] = [
  {
    title: "Branding & Identity Systems",
    description: "Strategic brand development and comprehensive visual identity systems that communicate your core values and position you for lasting market leadership.",
    keywords: ["Strategy", "Design", "Systems", "Impact"],
    icon: <Layers className="w-5 h-5" />,
    slug: "branding",
    image: "/images/services/branding.png"
  },
  {
    title: "Experiential Design",
    description: "Immersive brand experiences and events that create lasting connections with your audience and forge genuine emotional bonds.",
    keywords: ["Concept", "Execution", "Experience", "Culture"],
    icon: <Sparkles className="w-5 h-5" />,
    slug: "experiential-design",
    image: "/images/services/events.png"
  },
  {
    title: "Creative Direction",
    description: "Visionary guidance across all creative disciplines to ensure cohesive brand expression with market-leading execution.",
    keywords: ["Vision", "Strategy", "Excellence", "Refinement"],
    icon: <Palette className="w-5 h-5" />,
    slug: "creative-direction",
    image: "/images/services/creative.png"
  },
  {
    title: "Production & Visual Storytelling",
    description: "Cinematic content creation and visual narratives that captivate, inspire, and amplify your brand story across platforms.",
    keywords: ["Production", "Visual", "Narrative", "Quality"],
    icon: <Film className="w-5 h-5" />,
    slug: "production",
    image: "/images/services/marketing.png"
  },
]

const digitalServices: ServiceItem[] = [
  {
    title: "Custom Web Development",
    description: "Corporate websites, web applications, and e-commerce platforms built with cutting-edge technology — fast, secure, and scalable.",
    keywords: ["MERN Stack", "E-Commerce", "Dashboards", "APIs"],
    icon: <Monitor className="w-5 h-5" />,
    slug: "web-development",
    image: "/images/services/web-development.png"
  },
  {
    title: "UI/UX Design",
    description: "Non-template, bespoke interfaces designed to reinforce brand value, ensure accessibility, and deliver seamless experiences across all devices.",
    keywords: ["Interface", "User Experience", "Responsive", "Accessibility"],
    icon: <Palette className="w-5 h-5" />,
    slug: "ui-ux-design",
    image: "/images/services/ui-ux-design.png"
  },
  {
    title: "WordPress to Modern Stack",
    description: "Migrate from WordPress to Next.js & Node.js for blazing speed, enhanced security, complete flexibility, and enterprise scalability.",
    keywords: ["Migration", "Performance", "Security", "Flexibility"],
    icon: <Globe className="w-5 h-5" />,
    slug: "wordpress-migration",
    image: "/images/services/wp-migration.png"
  },
  {
    title: "Managed Hosting & Infrastructure",
    description: "Complete VPS setup, server security, SSL, automated backups, DNS management, and professional email configuration.",
    keywords: ["VPS", "Security", "DNS", "Email"],
    icon: <Server className="w-5 h-5" />,
    slug: "managed-hosting",
    image: "/images/services/managed-hosting.png"
  },
  {
    title: "SEO & Performance Analytics",
    description: "Technical SEO, performance optimization, sitemap configuration, and conversion tracking with Google Analytics, Meta Pixel, and TikTok Pixel.",
    keywords: ["SEO", "Analytics", "Performance", "Conversion"],
    icon: <Search className="w-5 h-5" />,
    slug: "seo-analytics",
    image: "/images/services/seo-analytics.png"
  },
  {
    title: "Tech Consulting & Product Management",
    description: "Transform ideas into successful digital products with MVP definition, product roadmaps, and workflow automation.",
    keywords: ["MVP", "Roadmap", "Automation", "Strategy"],
    icon: <Lightbulb className="w-5 h-5" />,
    slug: "tech-consulting",
    image: "/images/services/tech-consulting.png"
  },
]

/* ─── Creative Card: Large editorial layout with image ─── */
function CreativeServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const isReversed = index % 2 !== 0
  return (
    <article
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className={`relative flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} bg-white border border-transparent hover:border-[#919191]/20 hover:shadow-2xl transition-all duration-700 overflow-hidden`}>
        
        {/* Image Side */}
        <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[380px] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E3E3E]/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/30" />
          
          {/* Floating category badge on image */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] font-medium">
              Creative
            </span>
          </div>

          {/* Corner decoration on image */}
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/30 hidden sm:block" />
        </div>

        {/* Content Side */}
        <div className="relative w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          {/* Decorative vertical line */}
          <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[#3E3E3E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 mb-5 sm:mb-6 bg-[#3E3E3E]/5 text-[#3E3E3E] group-hover:bg-[#3E3E3E] group-hover:text-white rounded-full transition-all duration-500">
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-2xl md:text-3xl font-light text-[#3E3E3E] mb-3 sm:mb-4 leading-tight group-hover:text-[#2a2a2a] transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#6A6A6A] text-sm sm:text-base leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-5 border-t border-[#919191]/15 mb-6">
            {service.keywords.map((keyword) => (
              <span key={keyword} className="text-[10px] sm:text-xs uppercase tracking-widest text-[#919191] group-hover:text-[#6A6A6A] transition-colors">
                {keyword}
              </span>
            ))}
          </div>

          {/* Explore link */}
          <a
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2.5 text-xs uppercase tracking-widest text-[#919191] group-hover:text-[#3E3E3E] transition-all duration-300 mt-auto"
          >
            <span>Explore Service</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="block w-0 group-hover:w-10 h-px bg-[#3E3E3E] transition-all duration-500" />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ─── Digital Card: Compact card with top image strip ─── */
function DigitalServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  return (
    <article
      className="group animate-slide-up h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-full bg-white border border-[#919191]/10 hover:border-[#3E3E3E]/20 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
        
        {/* Image strip */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          
          {/* Floating category badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="px-2.5 py-1 bg-[#3E3E3E]/80 backdrop-blur-sm text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white font-medium">
              Digital
            </span>
          </div>

          {/* Small decorative element */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 border border-white/25 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
        </div>

        {/* Content */}
        <div className="relative p-5 sm:p-6 flex flex-col flex-1">
          {/* Active indicator – left bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#6A6A6A] opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-10 h-10 mb-4 bg-[#6A6A6A]/10 text-[#6A6A6A] group-hover:bg-[#3E3E3E] group-hover:text-white rounded-full transition-all duration-400">
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-light text-[#3E3E3E] mb-2.5 leading-snug group-hover:text-[#2a2a2a] transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#6A6A6A] text-sm leading-relaxed mb-5 flex-1">
            {service.description}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#919191]/12 mb-4">
            {service.keywords.map((keyword) => (
              <span key={keyword} className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#919191] group-hover:text-[#6A6A6A] transition-colors">
                {keyword}
              </span>
            ))}
          </div>

          {/* Explore link */}
          <a
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-[#919191] group-hover:text-[#3E3E3E] transition-all duration-300"
          >
            <span>Explore</span>
            <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="block w-0 group-hover:w-6 h-px bg-[#3E3E3E] transition-all duration-500" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function ServicesOverview() {
  return (
    <section id="services-overview" className="relative py-20 sm:py-28 md:py-32 px-6 sm:px-8 md:px-16 lg:px-24 bg-white border-t border-[#919191]/20 overflow-hidden">
      {/* Grid Background */}
      <GridBackground
        fadeFrom="bottom"
        gridColor="#919191"
        gridSizeX={30}
        gridSizeY={30}
        opacity={0.08}
      />

      {/* Decorative circles */}
      <CircleDecoration className="absolute -top-20 -right-20 hidden lg:block" size="xl" />
      <CircleDecoration className="absolute bottom-40 -left-16 hidden md:block" size="md" />

      {/* Floating decorative lines */}
      <div className="absolute top-1/4 right-0 w-32 md:w-48 h-px bg-gradient-to-l from-[#919191]/20 to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-24 md:w-36 h-px bg-gradient-to-r from-[#919191]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ─── CREATIVE SERVICES ─── */}
        <div className="mb-20 sm:mb-28 md:mb-32">
          {/* Section intro */}
          <div className="mb-12 sm:mb-16 md:mb-20 animate-slide-up">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-8 sm:w-12 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-widest text-[#6A6A6A]">Creative Services</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight max-w-3xl text-[#3E3E3E] mb-4">
              Strategic Creativity
            </h2>
            <p className="text-sm sm:text-base text-[#6A6A6A] max-w-xl leading-relaxed">
              Brand strategy, experiential design, and creative direction for discerning brands and cultural institutions.
            </p>
          </div>

          {/* Creative Services – editorial stacked layout */}
          <div className="space-y-6 sm:space-y-8">
            {creativeServices.map((service, idx) => (
              <CreativeServiceCard key={service.slug} service={service} index={idx} />
            ))}
          </div>
        </div>

        {/* ─── Elegant Divider ─── */}
        <div className="flex items-center gap-4 mb-20 sm:mb-28 md:mb-32">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#919191]/30 to-transparent" />
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#919191]/30 rotate-45" />
            <div className="w-2 h-2 border border-[#919191]/40 rotate-45" />
            <div className="w-1.5 h-1.5 bg-[#919191]/30 rotate-45" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#919191]/30 to-transparent" />
        </div>

        {/* ─── DIGITAL SERVICES ─── */}
        <div>
          {/* Section intro */}
          <div className="mb-12 sm:mb-16 md:mb-20 animate-slide-up">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-8 sm:w-12 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-widest text-[#6A6A6A]">Digital Services</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight max-w-3xl text-[#3E3E3E] mb-4">
              Digital Infrastructure
            </h2>
            <p className="text-sm sm:text-base text-[#6A6A6A] max-w-xl leading-relaxed">
              Comprehensive digital solutions — from development and hosting to SEO and product consulting — powered by modern technologies for sustainable growth.
            </p>
          </div>

          {/* Digital Services – card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
            {digitalServices.map((service, idx) => (
              <DigitalServiceCard key={service.slug} service={service} index={idx} />
            ))}
          </div>
        </div>

        {/* ─── Bottom Statement ─── */}
        <div className="mt-20 sm:mt-28 pt-12 border-t border-[#919191]/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="text-sm text-[#6A6A6A] max-w-lg leading-relaxed italic">
            FIFTH FLOOR delivers technical services and expansion strategies to serve all sectors and leading enterprises with confidence and flexibility.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#3E3E3E] hover:text-[#6A6A6A] transition-colors"
          >
            <span>Discuss Your Project</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
