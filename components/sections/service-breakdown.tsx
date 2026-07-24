'use client'

import { useState } from 'react'

interface ServiceDetail {
  title: string
  category: 'creative' | 'digital'
  description: string
  whatWeDo: string[]
  outcomes: string[]
  slug: string
}

const serviceDetails: ServiceDetail[] = [
  // ─── Creative Services ───
  {
    title: 'Branding & identity',
    category: 'creative',
    description: 'A comprehensive approach to brand strategy and visual identity that positions your organization for long-term success in the marketplace.',
    whatWeDo: [
      'Brand strategy and positioning',
      'Visual identity design',
      'Brand guidelines and systems',
      'Naming and messaging architecture',
      'Cultural brand integration'
    ],
    outcomes: [
      'Clear market differentiation',
      'Increased brand recognition',
      'Consistent stakeholder communication',
      'Enhanced market value',
      'Cultural authority'
    ],
    slug: 'branding'
  },
  {
    title: 'Experiential design',
    category: 'creative',
    description: 'We create immersive experiences that transcend traditional marketing. Our events and activations are designed to forge genuine emotional connections.',
    whatWeDo: [
      'Event concept and strategy',
      'Spatial design and curation',
      'Brand activation campaigns',
      'Cultural programming',
      'Attendee journey mapping'
    ],
    outcomes: [
      'Memorable brand interactions',
      'Audience engagement and loyalty',
      'Media and social amplification',
      'Quantifiable business results',
      'Brand story advancement'
    ],
    slug: 'experiential-design'
  },
  {
    title: 'Creative direction',
    category: 'creative',
    description: 'Visionary leadership across all creative disciplines. We establish the aesthetic and conceptual framework for your brand\'s visual and verbal expression.',
    whatWeDo: [
      'Creative strategy development',
      'Concept and ideation',
      'Design system implementation',
      'Cross-platform coordination',
      'Quality assurance and refinement'
    ],
    outcomes: [
      'Cohesive creative vision',
      'Elevated brand perception',
      'Team alignment and efficiency',
      'Market-leading execution',
      'Sustainable creative frameworks'
    ],
    slug: 'creative-direction'
  },

  // ─── Digital Services ───
  {
    title: 'Custom web development',
    category: 'digital',
    description: 'We build websites and web applications using the latest technologies (Next.js, React, Node.js) for flexible, scalable solutions — far beyond the limitations of templates.',
    whatWeDo: [
      'Corporate websites with custom CMS',
      'Web applications with professional dashboards',
      'E-commerce platforms with payment gateways',
      'Employee & client management systems',
      'Advanced role-based access & security'
    ],
    outcomes: [
      'Blazing-fast page load times',
      'Enterprise-grade security',
      'Seamless scalability for growth',
      'Full ownership of your codebase',
      'Reduced long-term maintenance costs'
    ],
    slug: 'web-development'
  },
  {
    title: 'UI/UX design',
    category: 'digital',
    description: 'We design unique, brand-aligned interfaces that enhance usability and exceed modern accessibility standards — no templates, no shortcuts.',
    whatWeDo: [
      'Custom interface design (non-template)',
      'User research and journey mapping',
      'Responsive layouts for all devices',
      'Design system creation',
      'Accessibility compliance (WCAG)'
    ],
    outcomes: [
      'Increased user engagement',
      'Lower bounce rates',
      'Stronger brand perception digitally',
      'Consistent experience across devices',
      'Scalable design foundations'
    ],
    slug: 'ui-ux-design'
  },
  {
    title: 'WordPress to modern stack',
    category: 'digital',
    description: 'A specialized service to migrate websites from WordPress to modern technology stacks (Next.js & Node.js) for competitive advantages in speed, security, and flexibility.',
    whatWeDo: [
      'Full content and data migration',
      'Custom backend development (Node.js)',
      'Frontend rebuild with Next.js & React',
      'Performance optimization and caching',
      'SEO preservation and redirect mapping'
    ],
    outcomes: [
      'Dramatically faster load times',
      'Elimination of common WP vulnerabilities',
      'Complete freedom from template constraints',
      'Support for enterprise-scale traffic',
      'Future-proof technical foundation'
    ],
    slug: 'wordpress-migration'
  },
  {
    title: 'Managed hosting',
    category: 'digital',
    description: 'End-to-end management of your technical infrastructure — ensuring maximum uptime, security, and performance so you can focus on your business.',
    whatWeDo: [
      'VPS setup and performance tuning',
      'Server hardening and SSL certificates',
      'Automated backup systems',
      'Domain management and DNS configuration',
      'Professional email with SPF/DKIM/DMARC'
    ],
    outcomes: [
      '99.9% uptime guarantee',
      'Enterprise-grade server security',
      'Zero email deliverability issues',
      'Reduced IT overhead costs',
      '24/7 infrastructure monitoring'
    ],
    slug: 'managed-hosting'
  },
  {
    title: 'SEO & performance analytics',
    category: 'digital',
    description: 'Ensuring your digital presence reaches the right audience through technical SEO, performance optimization, and comprehensive analytics tracking.',
    whatWeDo: [
      'Technical SEO audit and optimization',
      'Sitemap and structured data configuration',
      'Core Web Vitals optimization',
      'Google Analytics & Search Console setup',
      'Meta Pixel and TikTok Pixel integration'
    ],
    outcomes: [
      'Higher search engine rankings',
      'Increased organic traffic',
      'Accurate conversion tracking',
      'Data-driven marketing decisions',
      'Reduced bounce rates'
    ],
    slug: 'seo-analytics'
  },
  {
    title: 'Tech consulting',
    category: 'digital',
    description: 'We transform ideas from mere concepts into successful digital products — from MVP definition and product roadmaps to workflow automation that boosts operational efficiency.',
    whatWeDo: [
      'Digital product analysis and MVP definition',
      'Product roadmap development',
      'Workflow automation consulting',
      'Technology stack recommendations',
      'Digital transformation strategy'
    ],
    outcomes: [
      'Clear path from idea to product',
      'Reduced time-to-market',
      'Increased operational efficiency',
      'Lower costs through automation',
      'Scalable business processes'
    ],
    slug: 'tech-consulting'
  }
]

export default function ServiceBreakdown() {
  const [activeCategory, setActiveCategory] = useState<'creative' | 'digital'>('creative')
  const [activeIndex, setActiveIndex] = useState(0)

  const filtered = serviceDetails.filter(s => s.category === activeCategory)
  const active = filtered[activeIndex] ?? filtered[0]

  const handleCategoryChange = (cat: 'creative' | 'digital') => {
    setActiveCategory(cat)
    setActiveIndex(0)
  }

  return (
    <section className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-16 lg:px-24 bg-white border-t border-[#f0f0f0] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-16 sm:mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#3E3E3E]" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#6A6A6A] font-medium">Service Architecture</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light leading-tight text-[#1a1a1a] tracking-tight">
              Deep service<br />
              <span className="text-[#919191]">breakdown.</span>
            </h2>
          </div>

          {/* Category switcher */}
          <div className="flex gap-0 border border-[#e8e8e8] self-start sm:self-end">
            <button
              onClick={() => handleCategoryChange('creative')}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-200 ${
                activeCategory === 'creative'
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-[#919191] hover:text-[#3E3E3E] hover:bg-[#f5f5f5]'
              }`}
            >
              Creative
            </button>
            <button
              onClick={() => handleCategoryChange('digital')}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-200 border-l border-[#e8e8e8] ${
                activeCategory === 'digital'
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-[#919191] hover:text-[#3E3E3E] hover:bg-[#f5f5f5]'
              }`}
            >
              Digital
            </button>
          </div>
        </div>

        {/* Two-column layout: sidebar + detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-0 border border-[#ebebeb]">

          {/* Sidebar — Service list */}
          <nav className="border-r border-[#ebebeb] bg-[#fafafa]" aria-label="Service navigation">
            {filtered.map((service, idx) => (
              <button
                key={service.slug}
                onClick={() => setActiveIndex(idx)}
                className={`w-full text-left px-6 py-5 border-b border-[#ebebeb] last:border-b-0 flex items-center justify-between gap-3 group transition-all duration-200 ${
                  idx === activeIndex
                    ? 'bg-white border-l-2 border-l-[#1a1a1a] pl-5'
                    : 'hover:bg-white hover:border-l-2 hover:border-l-[#ddd] hover:pl-5'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="font-mono text-[9px] tracking-widest text-[#c0c0c0] font-numeric-tabular pt-0.5 flex-shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-sm leading-snug transition-colors duration-200 ${
                    idx === activeIndex ? 'text-[#1a1a1a] font-medium' : 'text-[#6A6A6A] group-hover:text-[#1a1a1a]'
                  }`}>
                    {service.title}
                  </span>
                </div>
                {idx === activeIndex && (
                  <svg className="w-3 h-3 text-[#1a1a1a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          {/* Detail panel */}
          {active && (
            <div key={`${activeCategory}-${activeIndex}`} className="p-8 sm:p-10 lg:p-12 animate-fade-in">

              {/* Category badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#919191] font-medium border border-[#e8e8e8] px-2.5 py-1">
                  {active.category === 'creative' ? 'Creative' : 'Digital'}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-light text-[#1a1a1a] mb-4 leading-snug tracking-tight capitalize">
                {active.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#6A6A6A] leading-relaxed mb-10 max-w-2xl">
                {active.description}
              </p>

              {/* What we do + Outcomes */}
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 mb-10">

                {/* What we do */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] font-semibold mb-5 pb-2 border-b border-[#f0f0f0]">
                    What we do
                  </h4>
                  <ul className="space-y-3">
                    {active.whatWeDo.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#6A6A6A] hover:text-[#1a1a1a] transition-colors duration-200 group">
                        <span className="text-[#c0c0c0] group-hover:text-[#6A6A6A] transition-colors mt-0.5 flex-shrink-0 font-mono text-xs">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] font-semibold mb-5 pb-2 border-b border-[#f0f0f0]">
                    Outcomes
                  </h4>
                  <ul className="space-y-3">
                    {active.outcomes.map((outcome, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#6A6A6A] hover:text-[#1a1a1a] transition-colors duration-200 group">
                        <span className="text-[#c0c0c0] group-hover:text-[#6A6A6A] transition-colors mt-0.5 flex-shrink-0 font-mono text-xs">→</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service link */}
              <div className="pt-6 border-t border-[#f0f0f0]">
                <a
                  href={`/services/${active.slug}`}
                  className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#919191] hover:text-[#1a1a1a] transition-colors duration-300"
                >
                  <span>View full service details</span>
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="block w-0 group-hover:w-8 h-px bg-[#1a1a1a] transition-all duration-500" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom statement */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-[#f0f0f0]">
          <p className="text-xs text-[#919191] max-w-lg leading-relaxed">
            Each service is structured for clarity and impact, ensuring every deliverable drives measurable business outcomes.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] hover:text-[#919191] transition-colors"
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
