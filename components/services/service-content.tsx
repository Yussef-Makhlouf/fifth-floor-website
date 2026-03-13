'use client'

import { ServiceItem } from '@/lib/data/services'
import { Check } from 'lucide-react'

export default function ServiceContent({ service }: { service: ServiceItem }) {
  // Generate some dummy capabilities based on keywords for a rich display
  const capabilities = service.keywords.map(kw => ({
    title: kw,
    description: `Expertise in delivering high-end ${kw.toLowerCase()} solutions tailored to your brand's unique needs.`
  }))

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
              At FIFTH FLOOR, we approach {service.title.toLowerCase()} not just as a task, but as a strategic asset. By combining leading-edge methodology with visionary creativity, we create solutions that are resilient, scalable, and striking.
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

          {/* Core Capabilities */}
          <div className="w-full lg:w-7/12">
            <h3 className="text-xl font-medium text-[#3E3E3E] mb-10 pb-4 border-b border-[#919191]/20">
              Core Capabilities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="group">
                  <div className="text-3xl font-light text-[#919191]/30 mb-4 group-hover:text-[#3E3E3E] transition-colors duration-500">
                    0{idx + 1}
                  </div>
                  <h4 className="text-lg font-medium text-[#3E3E3E] mb-3">
                    {cap.title}
                  </h4>
                  <p className="text-sm text-[#6A6A6A] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
