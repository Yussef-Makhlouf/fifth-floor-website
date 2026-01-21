'use client'

import { useEffect, useRef } from 'react'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import GridBackground, { DotPattern } from '@/components/ui/grid-background'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100')
            entry.target.classList.remove('opacity-0', 'translate-y-6')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      className="section-padding  relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <ArchitecturalShapes
        variant="circle"
        size="xl"
        className="absolute -top-40 -left-40"
        opacity={0.05}
      />
      <div className="absolute top-1/2 right-0 w-px h-40 bg-[#919191] opacity-20" />

      {/* Fading Grid Background - Right Side */}
      {/* <GridBackground
        fadeFrom="right"
        gridColor="#919191"
        gridSizeX={26}
        gridSizeY={34}
        opacity={0.2}
      /> */}

      {/* Dot Pattern - Bottom Left Corner */}
      <DotPattern
        fadeFrom="corner-bl"
        dotColor="#6A6A6A"
        dotSize={1.5}
        spacing={28}
        opacity={0.12}
      />

      <div className="max-w-7xl mx-auto">
        <div
          ref={sectionRef}
          className="opacity-0 translate-y-6 transition-all duration-1000"
        >
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column */}
            <div className="lg:col-span-6">
              <p className="section-label mb-4 text-[#6A6A6A]">Get In Touch</p>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#3E3E3E] mb-6">
                Let's Create
                <br />
                Together
              </h2>
              <div className="w-20 h-px bg-[#919191] mb-8" />
              <p className="text-lg text-[#6A6A6A] leading-relaxed mb-10 max-w-md">
                Have a project in mind? We'd love to hear about it.
                Let's discuss how we can bring your vision to life.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div>
                  <p className="text-semibold uppercase tracking-widest text-[#3e3e3e]  mb-2">Locations</p>
                  <p className="text-base text-[#3E3E3E]">Kuwait 🇰🇼 | UAE 🇦🇪</p>
                </div>
                <div>
                  <p className="text-semibold uppercase tracking-widest text-[#3e3e3e] mb-2">Email</p>
                  <a
                    href="mailto:hello@fifthfloor.agency"
                    className="text-base text-[#3E3E3E] hover:text-[#6A6A6A] transition-colors duration-300 hover-line-extend"
                  >
                    hello@fifthfloor.agency
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -right-20 top-0 w-full h-full opacity-10 pointer-events-none">
                <img src="/images/contact-form-visual.png" className="object-cover w-full h-full" alt="" />
              </div>
              <form className="space-y-8 relative z-10">
                {/* Name */}
                <div>
                  <label className="block text-semibold uppercase tracking-widest text-[#3e3e3e] mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-[#919191] py-3 text-[#3E3E3E] placeholder-[#919191] focus:outline-none focus:border-[#3E3E3E] transition-colors duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-semibold uppercase tracking-widest text-[#3e3e3e] mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-[#919191] py-3 text-[#3E3E3E] placeholder-[#919191] focus:outline-none focus:border-[#3E3E3E] transition-colors duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-semibold uppercase tracking-widest text-[#3e3e3e] mb-3">
                    Service Interest
                  </label>
                  <select
                    className="w-full bg-transparent border-b border-[#919191] py-3 text-[#3E3E3E] focus:outline-none focus:border-[#3E3E3E] transition-colors duration-300 cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option value="brand-strategy">Brand Strategy</option>
                    <option value="branding">Branding</option>
                    <option value="marketing">Marketing</option>
                    <option value="events">Events</option>
                    <option value="booths">Booths</option>
                    <option value="creative-concepts">Creative Concepts</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-semibold uppercase tracking-widest text-[#3e3e3e] mb-3">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b border-[#919191] py-3 text-[#3E3E3E] placeholder-[#919191] focus:outline-none focus:border-[#3E3E3E] transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-10 py-4 bg-[#3E3E3E] text-[#ffffff] font-medium tracking-wide hover:bg-[#6A6A6A] transition-all duration-400 hover-lift"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
