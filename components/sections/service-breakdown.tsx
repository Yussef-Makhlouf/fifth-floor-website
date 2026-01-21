'use client'

import { useState } from 'react'
import { DotPattern } from '@/components/ui/grid-background'
import { CornerDecoration } from '@/components/ui/architectural-shapes'

interface ServiceDetail {
  title: string
  description: string
  whatWeDo: string[]
  outcomes: string[]
}

const serviceDetails: ServiceDetail[] = [
  {
    title: "Branding & Identity Systems",
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
    ]
  },
  {
    title: "Experiential Design",
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
    ]
  },
  {
    title: "Creative Direction",
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
    ]
  }
]

export default function ServiceBreakdown() {
  const [expandedService, setExpandedService] = useState<number>(0)

  return (
    <section className="relative py-32 px-8 md:px-16 lg:px-24 bg-[#f8f8f8] overflow-hidden">
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
        <div className="mb-20 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6 text-[#3E3E3E]">
            Deep Service Architecture
          </h2>
          <div className="w-16 h-px bg-[#3E3E3E] mb-6" />
          <p className="text-lg text-[#6A6A6A] max-w-2xl leading-relaxed">
            Each service is structured for clarity and impact, ensuring every deliverable drives measurable business outcomes.
          </p>
        </div>

        {/* Service breakdown */}
        <div className="space-y-4">
          {serviceDetails.map((service, idx) => (
            <div
              key={idx}
              className={`bg-white transition-all duration-500 overflow-hidden ${expandedService === idx ? 'shadow-xl translate-x-2' : 'hover:translate-x-1 hover:shadow-md'
                }`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedService(expandedService === idx ? -1 : idx)}
                className="w-full px-8 py-8 flex items-center justify-between group text-left relative"
              >
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#3E3E3E] transition-all duration-300 ${expandedService === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`} />

                <div className="flex-1 pl-4">
                  <h3 className={`text-2xl font-light transition-colors duration-300 ${expandedService === idx ? 'text-[#3E3E3E]' : 'text-[#6A6A6A] group-hover:text-[#3E3E3E]'
                    }`}>
                    {service.title}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full border border-[#919191]/30 transition-all duration-300 ${expandedService === idx ? 'bg-[#3E3E3E] text-white rotate-180' : 'text-[#919191] group-hover:border-[#3E3E3E]'
                    }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </button>

              {/* Expanded content */}
              <div
                className={`transition-all duration-500 ease-in-out ${expandedService === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-12 pb-12 pt-4 bg-white border-t border-[#f0f0f0]">
                  <p className="text-lg text-[#6A6A6A] leading-relaxed mb-12 max-w-4xl font-light">
                    {service.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                    {/* What we do */}
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-[#3E3E3E] mb-6 font-semibold border-b border-[#3E3E3E] pb-2 inline-block">What We Do</h4>
                      <ul className="space-y-4">
                        {service.whatWeDo.map((item, i) => (
                          <li key={i} className="flex gap-4 text-[#6A6A6A] group/item hover:text-[#3E3E3E] transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#919191] mt-2.5 group-hover/item:bg-[#3E3E3E] transition-colors" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcomes */}
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-[#3E3E3E] mb-6 font-semibold border-b border-[#3E3E3E] pb-2 inline-block">Outcomes</h4>
                      <ul className="space-y-4">
                        {service.outcomes.map((outcome, i) => (
                          <li key={i} className="flex gap-4 text-[#6A6A6A] group/item hover:text-[#3E3E3E] transition-colors">
                            <span className="text-[#919191] mt-0.5 group-hover/item:text-[#3E3E3E] transition-colors">✓</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
