'use client'

import { useState } from 'react'
import { DotPattern } from '@/components/ui/grid-background'
import { CornerDecoration } from '@/components/ui/architectural-shapes'

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
    title: "Branding & Identity Systems",
    category: 'creative',
    description: "A comprehensive approach to brand strategy and visual identity that positions your organization for long-term success in the marketplace.",
    whatWeDo: [
      "Brand strategy and positioning",
      "Visual identity design",
      "Brand guidelines and systems",
      "Naming and messaging architecture",
      "Cultural brand integration"
    ],
    outcomes: [
      "Clear market differentiation",
      "Increased brand recognition",
      "Consistent stakeholder communication",
      "Enhanced market value",
      "Cultural authority"
    ],
    slug: "branding"
  },
  {
    title: "Experiential Design",
    category: 'creative',
    description: "We create immersive experiences that transcend traditional marketing. Our events and activations are designed to forge genuine emotional connections.",
    whatWeDo: [
      "Event concept and strategy",
      "Spatial design and curation",
      "Brand activation campaigns",
      "Cultural programming",
      "Attendee journey mapping"
    ],
    outcomes: [
      "Memorable brand interactions",
      "Audience engagement and loyalty",
      "Media and social amplification",
      "Quantifiable business results",
      "Brand story advancement"
    ],
    slug: "experiential-design"
  },
  {
    title: "Creative Direction",
    category: 'creative',
    description: "Visionary leadership across all creative disciplines. We establish the aesthetic and conceptual framework for your brand's visual and verbal expression.",
    whatWeDo: [
      "Creative strategy development",
      "Concept and ideation",
      "Design system implementation",
      "Cross-platform coordination",
      "Quality assurance and refinement"
    ],
    outcomes: [
      "Cohesive creative vision",
      "Elevated brand perception",
      "Team alignment and efficiency",
      "Market-leading execution",
      "Sustainable creative frameworks"
    ],
    slug: "creative-direction"
  },

  // ─── Digital Services ───
  {
    title: "Custom Web Development",
    category: 'digital',
    description: "We build websites and web applications using the latest technologies (Next.js, React, Node.js) for flexible, scalable solutions — far beyond the limitations of templates.",
    whatWeDo: [
      "Corporate websites with custom CMS",
      "Web applications with professional dashboards",
      "E-commerce platforms with payment gateways",
      "Employee & client management systems",
      "Advanced role-based access & security"
    ],
    outcomes: [
      "Blazing-fast page load times",
      "Enterprise-grade security",
      "Seamless scalability for growth",
      "Full ownership of your codebase",
      "Reduced long-term maintenance costs"
    ],
    slug: "web-development"
  },
  {
    title: "UI/UX Design",
    category: 'digital',
    description: "We design unique, brand-aligned interfaces that enhance usability and exceed modern accessibility standards — no templates, no shortcuts.",
    whatWeDo: [
      "Custom interface design (non-template)",
      "User research and journey mapping",
      "Responsive layouts for all devices",
      "Design system creation",
      "Accessibility compliance (WCAG)"
    ],
    outcomes: [
      "Increased user engagement",
      "Lower bounce rates",
      "Stronger brand perception digitally",
      "Consistent experience across devices",
      "Scalable design foundations"
    ],
    slug: "ui-ux-design"
  },
  {
    title: "WordPress to Modern Stack",
    category: 'digital',
    description: "A specialized service to migrate websites from WordPress to modern technology stacks (Next.js & Node.js) for competitive advantages in speed, security, and flexibility.",
    whatWeDo: [
      "Full content and data migration",
      "Custom backend development (Node.js)",
      "Frontend rebuild with Next.js & React",
      "Performance optimization and caching",
      "SEO preservation and redirect mapping"
    ],
    outcomes: [
      "Dramatically faster load times",
      "Elimination of common WP vulnerabilities",
      "Complete freedom from template constraints",
      "Support for enterprise-scale traffic",
      "Future-proof technical foundation"
    ],
    slug: "wordpress-migration"
  },
  {
    title: "Managed Hosting & Infrastructure",
    category: 'digital',
    description: "End-to-end management of your technical infrastructure — ensuring maximum uptime, security, and performance so you can focus on your business.",
    whatWeDo: [
      "VPS setup and performance tuning",
      "Server hardening and SSL certificates",
      "Automated backup systems",
      "Domain management and DNS configuration",
      "Professional email with SPF/DKIM/DMARC"
    ],
    outcomes: [
      "99.9% uptime guarantee",
      "Enterprise-grade server security",
      "Zero email deliverability issues",
      "Reduced IT overhead costs",
      "Peace of mind with 24/7 monitoring"
    ],
    slug: "managed-hosting"
  },
  {
    title: "SEO & Performance Analytics",
    category: 'digital',
    description: "Ensuring your digital presence reaches the right audience through technical SEO, performance optimization, and comprehensive analytics tracking.",
    whatWeDo: [
      "Technical SEO audit and optimization",
      "Sitemap and structured data configuration",
      "Core Web Vitals optimization",
      "Google Analytics & Search Console setup",
      "Meta Pixel and TikTok Pixel integration"
    ],
    outcomes: [
      "Higher search engine rankings",
      "Increased organic traffic",
      "Accurate conversion tracking",
      "Data-driven marketing decisions",
      "Reduced bounce rates"
    ],
    slug: "seo-analytics"
  },
  {
    title: "Tech Consulting & Product Management",
    category: 'digital',
    description: "We transform ideas from mere concepts into successful digital products — from MVP definition and product roadmaps to workflow automation that boosts operational efficiency.",
    whatWeDo: [
      "Digital product analysis and MVP definition",
      "Product roadmap development",
      "Workflow automation consulting",
      "Technology stack recommendations",
      "Digital transformation strategy"
    ],
    outcomes: [
      "Clear path from idea to product",
      "Reduced time-to-market",
      "Increased operational efficiency",
      "Lower costs through automation",
      "Scalable business processes"
    ],
    slug: "tech-consulting"
  }
]

export default function ServiceBreakdown() {
  const [expandedService, setExpandedService] = useState<number>(0)

  const creativeServices = serviceDetails.filter(s => s.category === 'creative')
  const digitalServicesList = serviceDetails.filter(s => s.category === 'digital')

  const renderServiceAccordion = (services: ServiceDetail[], startIndex: number) => (
    <div className="space-y-3 sm:space-y-4">
      {services.map((service, localIdx) => {
        const globalIdx = startIndex + localIdx
        const isExpanded = expandedService === globalIdx
        return (
          <div
            key={globalIdx}
            className={`bg-white transition-all duration-500 overflow-hidden ${
              isExpanded ? 'shadow-xl translate-x-1 sm:translate-x-2' : 'hover:translate-x-0.5 sm:hover:translate-x-1 hover:shadow-md'
            }`}
            style={{ animationDelay: `${localIdx * 0.1}s` }}
          >
            {/* Header */}
            <button
              onClick={() => setExpandedService(isExpanded ? -1 : globalIdx)}
              className="w-full px-5 sm:px-8 py-6 sm:py-8 flex items-center justify-between group text-left relative"
            >
              {/* Active Indicator Line */}
              <div className={`absolute left-0 top-0 bottom-0 w-[2px] sm:w-1 transition-all duration-300 ${
                service.category === 'creative' ? 'bg-[#3E3E3E]' : 'bg-[#6A6A6A]'
              } ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />

              <div className="flex-1 pl-3 sm:pl-4">
                {/* Category badge */}
                <span className={`inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 py-0.5 mb-2 sm:mb-3 rounded-full ${
                  service.category === 'creative'
                    ? 'bg-[#3E3E3E]/5 text-[#3E3E3E]'
                    : 'bg-[#6A6A6A]/10 text-[#6A6A6A]'
                }`}>
                  {service.category === 'creative' ? 'Creative' : 'Digital'}
                </span>
                <h3 className={`text-lg sm:text-xl md:text-2xl font-light transition-colors duration-300 ${
                  isExpanded ? 'text-[#3E3E3E]' : 'text-[#6A6A6A] group-hover:text-[#3E3E3E]'
                }`}>
                  {service.title}
                </h3>
              </div>
              <div className="flex-shrink-0 ml-3 sm:ml-4">
                <span className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#919191]/30 transition-all duration-300 ${
                  isExpanded ? 'bg-[#3E3E3E] text-white rotate-180' : 'text-[#919191] group-hover:border-[#3E3E3E]'
                }`}>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Expanded content */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 sm:px-12 pb-8 sm:pb-12 pt-3 sm:pt-4 bg-white border-t border-[#f0f0f0]">
                <p className="text-sm sm:text-lg text-[#6A6A6A] leading-relaxed mb-8 sm:mb-12 max-w-4xl font-light">
                  {service.description}
                </p>

                <div className="grid md:grid-cols-2 gap-x-8 sm:gap-x-16 gap-y-8 sm:gap-y-10">
                  {/* What we do */}
                  <div>
                    <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#3E3E3E] mb-4 sm:mb-6 font-semibold border-b border-[#3E3E3E] pb-2 inline-block">What We Do</h4>
                    <ul className="space-y-3 sm:space-y-4">
                      {service.whatWeDo.map((item, i) => (
                        <li key={i} className="flex gap-3 sm:gap-4 text-sm sm:text-base text-[#6A6A6A] group/item hover:text-[#3E3E3E] transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#919191] mt-2 sm:mt-2.5 flex-shrink-0 group-hover/item:bg-[#3E3E3E] transition-colors" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#3E3E3E] mb-4 sm:mb-6 font-semibold border-b border-[#3E3E3E] pb-2 inline-block">Outcomes</h4>
                    <ul className="space-y-3 sm:space-y-4">
                      {service.outcomes.map((outcome, i) => (
                        <li key={i} className="flex gap-3 sm:gap-4 text-sm sm:text-base text-[#6A6A6A] group/item hover:text-[#3E3E3E] transition-colors">
                          <span className="text-[#919191] mt-0.5 group-hover/item:text-[#3E3E3E] transition-colors flex-shrink-0">✓</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Explore Service Link */}
                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#f0f0f0]">
                  <a
                    href={`/services/${service.slug}`}
                    className="group/link inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#919191] hover:text-[#3E3E3E] transition-all duration-300"
                  >
                    <span>View Full Service Details</span>
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="block w-0 group-hover/link:w-12 h-px bg-[#3E3E3E] transition-all duration-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <section className="relative py-20 sm:py-28 md:py-32 px-6 sm:px-8 md:px-16 lg:px-24 bg-[#f8f8f8] overflow-hidden">
      {/* Decorative Dot Pattern */}
      <DotPattern
        fadeFrom="bottom"
        dotColor="#919191"
        spacing={24}
        opacity={0.1}
      />

      {/* Corner Decoration */}
      <CornerDecoration
        className="absolute top-0 left-0 hidden lg:block"
        size="lg"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section intro */}
        <div className="mb-12 sm:mb-16 md:mb-20 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-4 sm:mb-6 text-[#3E3E3E]">
            Deep Service Architecture
          </h2>
          <div className="w-12 sm:w-16 h-px bg-[#3E3E3E] mb-4 sm:mb-6" />
          <p className="text-sm sm:text-lg text-[#6A6A6A] max-w-2xl leading-relaxed">
            Each service is structured for clarity and impact, ensuring every deliverable drives measurable business outcomes.
          </p>
        </div>

        {/* ─── Creative Services Accordion ─── */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 sm:w-8 h-px bg-[#3E3E3E]" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-[#6A6A6A] font-medium">Creative</p>
            <div className="flex-1 h-px bg-[#919191]/15" />
          </div>
          {renderServiceAccordion(creativeServices, 0)}
        </div>

        {/* ─── Digital Services Accordion ─── */}
        <div>
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 sm:w-8 h-px bg-[#6A6A6A]" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-[#6A6A6A] font-medium">Digital</p>
            <div className="flex-1 h-px bg-[#919191]/15" />
          </div>
          {renderServiceAccordion(digitalServicesList, creativeServices.length)}
        </div>
      </div>
    </section>
  )
}
