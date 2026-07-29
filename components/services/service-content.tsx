'use client'

import { ServiceItem } from '@/lib/data/services'
import { Check } from 'lucide-react'

export default function ServiceContent({ service }: { service: ServiceItem }) {
  return (
    <section className="py-20 md:py-32 bg-[#FAFAFA] border-t border-[#919191]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Approach / Philosophy */}
          <div className="w-full lg:w-5/12">
            <h2 className="text-3xl sm:text-4xl font-light text-[#3E3E3E] mb-6">
              Our Approach to <br />
              <span className="font-medium">{service.title}</span>
            </h2>
            <div className="w-12 h-px bg-[#3E3E3E] mb-8" />
            <p className="text-[#6A6A6A] leading-relaxed mb-6">
              {service.description}
            </p>
            <p className="text-[#6A6A6A] leading-relaxed mb-8">
              We work closely with your team to integrate our processes into your existing workflows, ensuring a seamless execution from concept to final delivery.
            </p>

            <ul className="space-y-4">
              {['Strategy First', 'Bespoke Execution', 'Measurable Impact'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#3E3E3E] font-medium uppercase tracking-wider">
                  <div className="w-5 h-5 rounded-full bg-[#3E3E3E]/10 flex items-center justify-center text-[#3E3E3E]">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What We Do + Outcomes */}
          <div className="w-full lg:w-7/12">
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">

              {/* What We Do */}
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a] font-semibold mb-6 pb-3 border-b border-[#e8e8e8]">
                  What we do
                </h3>
                <ul className="space-y-4">
                  {service.whatWeDo.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#6A6A6A] hover:text-[#1a1a1a] transition-colors duration-200 group">
                      <span className="text-[#c0c0c0] group-hover:text-[#919191] transition-colors mt-0.5 flex-shrink-0 font-mono text-xs">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a] font-semibold mb-6 pb-3 border-b border-[#e8e8e8]">
                  Outcomes
                </h3>
                <ul className="space-y-4">
                  {service.outcomes.map((outcome, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#6A6A6A] hover:text-[#1a1a1a] transition-colors duration-200 group">
                      <span className="text-[#c0c0c0] group-hover:text-[#919191] transition-colors mt-0.5 flex-shrink-0 font-mono text-xs">→</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Keywords */}
            <div className="mt-10 pt-8 border-t border-[#ebebeb]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#919191] mb-4">Core expertise</p>
              <div className="flex flex-wrap gap-2">
                {service.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3.5 py-1.5 bg-white border border-[#e8e8e8] text-[9px] uppercase tracking-[0.18em] text-[#6A6A6A] hover:border-[#3E3E3E]/30 hover:text-[#3E3E3E] transition-colors duration-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
