'use client'

import React, { useState, useCallback } from 'react'
import { CurveDecoration } from '@/components/ui/architectural-shapes'
import { SERVICES, COMPANY_INFO } from '@/lib/contact-config'
import { contactFormSchema, validateForm, validateField, type ContactFormData, type FormErrors } from '@/lib/contact-schema'

type FormState = {
  name: string
  email: string
  company: string
  serviceType: string
  message: string
}

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  serviceType: '',
  message: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [errors, setErrors] = useState<FormErrors<ContactFormData>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    // Validate single field on blur
    const error = validateField(contactFormSchema, name as keyof ContactFormData, value)
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const result = validateForm(contactFormSchema, formData)

    if (!result.success) {
      setErrors(result.errors)
      setTouched({
        name: true,
        email: true,
        company: true,
        serviceType: true,
        message: true,
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setSubmitStatus('success')
        setFormData(initialFormState)
        setErrors({})
        setTouched({})
        setTimeout(() => setSubmitStatus('idle'), 6000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClassName = (field: keyof FormState) => {
    const baseClass = "w-full py-4 bg-transparent border-b border-[#919191]/30 text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] transition-all duration-500 text-lg font-light"
    const hasError = touched[field] && errors[field]

    if (hasError) {
      return `${baseClass} border-red-400 focus:border-red-500`
    }
    return baseClass
  }

  return (
    <section className="relative w-full py-24 md:py-32 px-8 overflow-hidden bg-[#f8f8f8]" id="contact_us">
      {/* Curve Decoration */}
      <CurveDecoration
        className="absolute -bottom-20 -right-20 rotate-180"
        size="xl"
      />
      <CurveDecoration
        className="absolute -top-20 -left-20"
        size="lg"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#3E3E3E]/20" />
            <p className="tracking-[0.3em] text-xs font-semibold text-[#6A6A6A] uppercase">Get in Touch</p>
            <div className="w-12 h-px bg-[#3E3E3E]/20" />
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8 text-[#3E3E3E]">
            Start Your <span className="font-bold">Project</span>
          </h2>
          <p className="text-lg text-[#6A6A6A] max-w-xl mx-auto font-light leading-relaxed">
            Share your vision. We'll help you build it. <br />
            <span className="text-sm mt-2 block opacity-70">Average response time: {COMPANY_INFO.responseTime}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2 group-focus-within:text-[#3E3E3E] transition-colors">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('name')}
                placeholder="John Doe"
              />
              {touched.name && errors.name && (
                <p className="mt-2 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2 group-focus-within:text-[#3E3E3E] transition-colors">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('email')}
                placeholder="john@example.com"
              />
              {touched.email && errors.email && (
                <p className="mt-2 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Company & Service Type Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2 group-focus-within:text-[#3E3E3E] transition-colors">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('company')}
                placeholder="Company Name (Optional)"
              />
            </div>
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2 group-focus-within:text-[#3E3E3E] transition-colors">
                Service
              </label>
              <div className="relative">
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${getInputClassName('serviceType')} appearance-none cursor-pointer`}
                >
                  <option value="" className="text-[#919191]">Select a Service</option>
                  {SERVICES.map(service => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#3E3E3E]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="group">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2 group-focus-within:text-[#3E3E3E] transition-colors">
              Project Details <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={4}
              className={`${getInputClassName('message')} resize-none`}
              placeholder="Tell us broadly about your project, timeline, and goals..."
            />
            {touched.message && errors.message && (
              <p className="mt-2 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                {errors.message}
              </p>
            )}
            <div className="text-right mt-2">
              <span className="text-[10px] uppercase tracking-widest text-[#919191]">
                {formData.message.length} / 2000
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-10 py-5 bg-[#3E3E3E] text-white overflow-hidden transition-all duration-500 hover:w-full w-full md:w-auto"
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                <span className={`text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  Send Message
                </span>
                <svg className={`w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Loading State */}
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-[#2a2a2a] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="text-center py-6 bg-green-50/50 border border-green-200/50 animate-fade-in">
              <p className="text-green-800 font-medium text-sm tracking-wide">Message Sent Successfully</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="text-center py-6 bg-red-50/50 border border-red-200/50 animate-fade-in">
              <p className="text-red-800 font-medium text-sm tracking-wide">Something went wrong. Please try again.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
