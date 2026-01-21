'use client'

import React from "react"
import { useState } from 'react'
import { CurveDecoration } from '@/components/ui/architectural-shapes'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    budget: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', company: '', serviceType: '', budget: '', message: '' })
  }

  const services = [
    'Brand Strategy',
    'Branding & Identity',
    'Marketing & Campaigns',
    'Event Design & Planning',
    'Creative Concepts',
    'Other'
  ]

  const budgets = [
    'Under $5K',
    '$5K - $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K+',
    'Not Sure'
  ]

  return (
    <section className="relative w-full py-24 px-8 overflow-hidden" id="contact_us">
      {/* Grid Background - Fades from top */}
      {/* <GridBackground
        fadeFrom="top"
        gridColor="#919191"
        gridSizeX={24}
        gridSizeY={32}
        opacity={0.15}
      /> */}

      {/* Curve Decoration */}
      <CurveDecoration
        className="absolute -bottom-20 -right-20 rotate-180"
        size="xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[#6A6A6A] mb-4">Contact Form</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-[#3E3E3E]">
            Tell Us About Your Project
          </h2>
          <div className="w-16 h-px bg-[#919191] mx-auto mb-6" />
          <p className="text-lg text-[#6A6A6A] max-w-2xl mx-auto">
            Share your vision, budget, and timeline. We&apos;ll review your submission and get back to you within 2 business days.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wide text-[#3E3E3E] mb-3">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#919191]/30 bg-white text-[#3E3E3E] focus:outline-none focus:border-[#3E3E3E] transition-colors placeholder:text-[#919191]"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wide text-[#3E3E3E] mb-3">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#919191]/30 bg-white text-[#3E3E3E] focus:outline-none focus:border-[#3E3E3E] transition-colors placeholder:text-[#919191]"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Company & Service Type Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wide text-[#3E3E3E] mb-3">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#919191]/30 bg-white text-[#3E3E3E] focus:outline-none focus:border-[#3E3E3E] transition-colors placeholder:text-[#919191]"
                placeholder="Your company"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wide text-[#3E3E3E] mb-3">
                Service of Interest
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#919191]/30 bg-white text-[#3E3E3E] focus:outline-none focus:border-[#3E3E3E] transition-colors cursor-pointer"
              >
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-[#3E3E3E] mb-3">
              Project Budget Range
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#919191]/30 bg-white text-[#3E3E3E] focus:outline-none focus:border-[#3E3E3E] transition-colors cursor-pointer"
            >
              <option value="">Select a budget range</option>
              {budgets.map(budget => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-[#3E3E3E] mb-3">
              Project Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-[#919191]/30 bg-white text-[#3E3E3E] focus:outline-none focus:border-[#3E3E3E] transition-colors resize-none placeholder:text-[#919191]"
              placeholder="Tell us about your project, goals, and vision..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-12 py-4 bg-[#3E3E3E] text-white font-semibold tracking-widest uppercase hover:bg-[#6A6A6A] transition-all duration-300 hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="text-center py-4 bg-[#f8f8f8] border-l-4 border-[#3E3E3E]">
              <p className="text-[#3E3E3E] font-semibold">Thank you! We&apos;ll be in touch soon.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
