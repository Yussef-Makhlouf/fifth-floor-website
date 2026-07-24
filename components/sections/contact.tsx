'use client'

import { useState, useCallback } from 'react'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'
import { DotPattern } from '@/components/ui/grid-background'
import { OFFICE_LOCATIONS, SERVICES, COMPANY_INFO } from '@/lib/contact-config'
import { contactFormSchema, validateForm, validateField, type ContactFormData, type FormErrors } from '@/lib/contact-schema'
import ScrollReveal from '@/components/ui/scroll-reveal'
import MagneticButton from '@/components/ui/magnetic-button'

type FormState = {
  name: string
  email: string
  serviceType: string
  message: string
}

const initialFormState: FormState = {
  name: '',
  email: '',
  serviceType: '',
  message: '',
}

export default function Contact() {
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

    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    const error = validateField(contactFormSchema, name as keyof ContactFormData, value)
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = validateForm(contactFormSchema, formData)

    if (!result.success) {
      setErrors(result.errors)
      setTouched({ name: true, email: true, serviceType: true, message: true })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData(initialFormState)
      setErrors({})
      setTouched({})
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClassName = (field: keyof FormState) => {
    const baseClass = "w-full bg-transparent border-b py-3 text-[#3E3E3E] placeholder-[#919191] focus:outline-none transition-all duration-300"
    const hasError = touched[field] && errors[field]
    const isValid = touched[field] && !errors[field] && formData[field]

    if (hasError) return `${baseClass} border-red-400 focus:border-red-500`
    if (isValid) return `${baseClass} border-green-400 focus:border-green-500`
    return `${baseClass} border-[#919191] focus:border-[#3E3E3E]`
  }

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <ArchitecturalShapes
        variant="circle"
        size="xl"
        className="absolute -top-40 -left-40"
        opacity={0.05}
      />
      <div className="absolute top-1/2 right-0 w-px h-40 bg-[#919191] opacity-20" />

      {/* Dot Pattern - Bottom Left Corner */}
      <DotPattern
        fadeFrom="corner-bl"
        dotColor="#6A6A6A"
        dotSize={1.5}
        spacing={28}
        opacity={0.12}
      />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal variant="fade-up">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column */}
            <div className="lg:col-span-6">
              <p className="section-label mb-4 text-[#6A6A6A]">Get In Touch</p>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#3E3E3E] mb-6 font-syne-display">
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
                  <p className="text-semibold uppercase tracking-widest text-[#3e3e3e] mb-2 font-mono text-xs">Locations</p>
                  <p className="text-base text-[#3E3E3E]">
                    {OFFICE_LOCATIONS.map(loc => `${loc.region} ${loc.country}`).join(' | ')}
                  </p>
                </div>
                <div>
                  <p className="text-semibold uppercase tracking-widest text-[#3e3e3e] mb-2 font-mono text-xs">Email</p>
                  <a
                    href={`mailto:${COMPANY_INFO.mainEmail}`}
                    className="text-base text-[#3E3E3E] hover:text-[#6A6A6A] transition-colors duration-300 hover-line-extend"
                  >
                    {COMPANY_INFO.mainEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -right-20 top-0 w-full h-full opacity-10 pointer-events-none">
                <img src="/images/contact-form-visual.png" className="object-cover w-full h-full" alt="" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Name */}
                <div>
                  <label className="block text-semibold uppercase tracking-widest text-[#3e3e3e] mb-3 text-xs font-mono">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName('name')}
                    placeholder="Enter your name"
                  />
                  {touched.name && errors.name && (
                    <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-semibold uppercase tracking-widest text-[#3e3e3e] mb-3 text-xs font-mono">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName('email')}
                    placeholder="Enter your email"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-semibold uppercase tracking-widest text-[#3e3e3e] mb-3 text-xs font-mono">
                    Service Interest
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClassName('serviceType')} cursor-pointer`}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map(service => (
                      <option key={service.id} value={service.title}>{service.title}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-semibold uppercase tracking-widest text-[#3e3e3e] mb-3 text-xs font-mono">
                    Project Details <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`${getInputClassName('message')} resize-none`}
                    placeholder="Tell us about your project"
                  />
                  {touched.message && errors.message && (
                    <p className="mt-2 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <MagneticButton strength={0.3}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 bg-[#3E3E3E] text-[#ffffff] font-medium tracking-wide hover:bg-[#6A6A6A] transition-all duration-400 hover-lift disabled:opacity-70 disabled:cursor-not-allowed rounded-full text-xs uppercase tracking-[0.2em]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </button>
                  </MagneticButton>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="py-4 px-6 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-green-700 font-semibold">Thank you! We'll be in touch soon.</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="py-4 px-6 bg-red-50 border-l-4 border-red-500 rounded">
                    <p className="text-red-700 font-semibold">Something went wrong. Please try again.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
