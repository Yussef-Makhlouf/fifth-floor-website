'use client'

import React, { useState } from "react"
import GridBackground from '@/components/ui/grid-background'
import { CircleDecoration } from '@/components/ui/architectural-shapes'

export default function ServiceCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="relative py-32 px-8 md:px-16 lg:px-24 bg-[#3E3E3E] overflow-hidden text-[#CFCFCF]">
      {/* Grid Background */}
      <GridBackground
        fadeFrom="center"
        gridColor="#919191"
        gridSizeX={40}
        gridSizeY={40}
        opacity={0.15}
        className="text-[#919191]"
      />

      {/* Circle Decorations - Lighter execution for dark bg */}
      <div className="absolute top-0 right-0 opacity-10">
        <CircleDecoration size="lg" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-10">
        <CircleDecoration size="xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-light leading-tight mb-12 text-white">
            <span className="block">Ready to Elevate</span>
            <span className="block text-[#919191]">Your Brand?</span>
          </h2>

          <p className="text-lg text-[#CFCFCF] max-w-2xl mb-12 leading-relaxed font-light">
            We approach each partnership with the same commitment to excellence. Whether you're launching a new brand or evolving an established one, we're here to guide you through a transformative creative journey.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="flex-1 relative group">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-4 bg-transparent border-b border-[#919191] text-white placeholder-[#6A6A6A] focus:outline-none focus:border-white transition-colors duration-300"
              />
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
            </div>
            <button
              type="submit"
              className="px-10 py-4 bg-white text-[#3E3E3E] font-medium uppercase tracking-widest hover:bg-[#CFCFCF] transition-colors duration-300 rounded-sm"
            >
              {submitted ? 'Sent' : 'Initiate Discussion'}
            </button>
          </form>

          <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-[#919191]/30">
            <div className="group cursor-pointer">
              <p className="text-xs uppercase tracking-widest text-[#919191] mb-3 group-hover:text-white transition-colors duration-300">Email</p>
              <p className="text-lg font-light text-[#CFCFCF] group-hover:text-white transition-colors duration-300">
                hello@fifthfloor.com
              </p>
            </div>

            <div className="group cursor-pointer">
              <p className="text-xs uppercase tracking-widest text-[#919191] mb-3 group-hover:text-white transition-colors duration-300">Phone</p>
              <p className="text-lg font-light text-[#CFCFCF] group-hover:text-white transition-colors duration-300">
                +XXXX XXX XXXX
              </p>
            </div>

            <div className="group cursor-pointer">
              <p className="text-xs uppercase tracking-widest text-[#919191] mb-3 group-hover:text-white transition-colors duration-300">Location</p>
              <p className="text-lg font-light text-[#CFCFCF] group-hover:text-white transition-colors duration-300">
                KUWAIT | UAE
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#919191]/30 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xs text-[#919191] italic opacity-80">
            We value thoughtful communication and mutual respect. Expect detailed, honest guidance and work that reflects your vision.
          </p>
        </div>
      </div>
    </section>
  )
}
