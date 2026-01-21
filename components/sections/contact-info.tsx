'use client'

import { DotPattern } from '@/components/ui/grid-background'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'

export default function ContactInfo() {
  const officeLocations = [
    {
      region: 'Kuwait',
      country: '🇰🇼',
      office: 'Fifth Floor Office - Kuwait City',
      email: 'hello@fifthfloor.kw',
      phone: '+965 XXXX XXXX',
      hours: 'Sunday - Thursday, 9 AM - 6 PM'
    },
    {
      region: 'UAE',
      country: '🇦🇪',
      office: 'Fifth Floor Studio - Dubai',
      email: 'hello@fifthfloor.ae',
      phone: '+971 XXXX XXXX',
      hours: 'Sunday - Thursday, 9 AM - 6 PM'
    }
  ]

  const services = [
    {
      title: 'Brand Strategy',
      description: 'Strategic planning and positioning for your brand'
    },
    {
      title: 'Branding & Identity',
      description: 'Complete visual identity system design'
    },
    {
      title: 'Marketing Campaigns',
      description: 'Comprehensive marketing strategy and execution'
    },
    {
      title: 'Event Design',
      description: 'Creative event concepts and experiential design'
    }
  ]

  return (
    <section className="relative w-full py-20 px-8 bg-[#f8f8f8] border-t border-[#919191]/20 overflow-hidden">
      {/* Decorative Dot Pattern */}
      <DotPattern
        fadeFrom="corner-br"
        dotColor="#919191"
        opacity={0.15}
      />

      {/* Architectural Shape Decoration */}
      <ArchitecturalShapes
        variant="corner"
        size="md"
        className="absolute top-0 right-0 rotate-90"
        opacity={0.1}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Office Locations */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-[#3E3E3E]">
            Our Locations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {officeLocations.map((location, idx) => (
              <div key={idx} className="space-y-6 p-8 border border-[#919191]/20 bg-white hover:border-[#3E3E3E] transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{location.country}</span>
                  <h3 className="text-2xl font-bold text-[#3E3E3E]">{location.region}</h3>
                </div>

                <div className="space-y-4 text-[#6A6A6A]">
                  <div>
                    <p className="text-sm uppercase tracking-wide font-semibold text-[#3E3E3E] mb-1">Office</p>
                    <p>{location.office}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide font-semibold text-[#3E3E3E] mb-1">Email</p>
                    <a href={`mailto:${location.email}`} className="hover:text-[#3E3E3E] transition-colors">
                      {location.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide font-semibold text-[#3E3E3E] mb-1">Phone</p>
                    <p>{location.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide font-semibold text-[#3E3E3E] mb-1">Hours</p>
                    <p>{location.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Overview */}
        <div className="border-t border-[#919191]/20 pt-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-[#3E3E3E]">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="p-8 border border-[#919191]/20 bg-white hover:border-[#3E3E3E] transition-colors duration-300">
                <h3 className="text-xl font-bold mb-3 text-[#3E3E3E]">{service.title}</h3>
                <p className="text-[#6A6A6A] text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 pt-16 border-t border-[#919191]/20 text-center">
          <p className="text-lg text-[#6A6A6A] mb-6">
            Have a project in mind? Let&apos;s work together.
          </p>
          <p className="text-sm text-[#919191]">
            Response time: Usually within 2 business days
          </p>
        </div>
      </div>
    </section>
  )
}
