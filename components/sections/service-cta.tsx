'use client'

import React, { useState, useCallback } from 'react'
import { OFFICE_LOCATIONS, COMPANY_INFO } from '@/lib/contact-config'
import { emailOnlySchema, validateForm, type EmailOnlyData, type FormErrors } from '@/lib/contact-schema'

export default function ServiceCTA() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError(null)
  }, [error])

  const handleBlur = useCallback(() => {
    setTouched(true)
    const result = emailOnlySchema.safeParse({ email })
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'Invalid email')
    }
  }, [email])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = validateForm(emailOnlySchema, { email })

    if (!result.success) {
      setError((result.errors as FormErrors<EmailOnlyData>).email || 'Invalid email')
      setTouched(true)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setEmail('')
      setError(null)
      setTouched(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClassName = () => {
    const base = 'w-full py-5 bg-transparent border-b text-white placeholder-[#5a5a5a] focus:outline-none transition-colors duration-300 text-base font-light tracking-wide'
    if (touched && error) return `${base} border-red-500/60`
    if (touched && !error && email) return `${base} border-[#6A6A6A]`
    return `${base} border-[#3a3a3a] focus:border-[#6A6A6A]`
  }

  return (
    <section className="relative py-32 px-8 md:px-16 lg:px-24 bg-[#0f0f0f] overflow-hidden text-[#CFCFCF]">

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />

      {/* Hairline grid */}
      <div className="absolute inset-0 hairline-grid-dark opacity-30 pointer-events-none" />

      {/* Ambient radial glow — top right */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-[#3E3E3E]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#5a5a5a] font-medium">Start a Project</p>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight mb-6 text-white">
          Built to last.
          <br />
          <span className="text-[#6A6A6A]">Designed to perform.</span>
        </h2>

        <p className="text-base text-[#6A6A6A] max-w-xl mb-14 leading-relaxed font-light">
          Whether launching a new brand or evolving an established one — we approach every partnership with the same standard: rigorous, honest, and built for the long run.
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6 mb-6 max-w-2xl">
          <div className="flex-1 relative">
            <input
              id="cta-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              aria-label="Email address"
              className={getInputClassName()}
            />
            {touched && error && (
              <p className="absolute -bottom-5 left-0 text-xs text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || submitStatus === 'success'}
            className="px-10 py-4 bg-white text-[#0f0f0f] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#CFCFCF] transition-all duration-300 rounded-none disabled:opacity-60 disabled:cursor-not-allowed active-press flex-shrink-0 flex items-center gap-2.5"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Sending...</span>
            ) : submitStatus === 'success' ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Sent
              </>
            ) : (
              'Begin the conversation'
            )}
          </button>
        </form>

        {/* Success message */}
        {submitStatus === 'success' && (
          <p className="text-sm text-[#6A6A6A] mb-10 font-light">
            Message received. We will respond within {COMPANY_INFO.responseTime}.
          </p>
        )}

        {/* Error message */}
        {submitStatus === 'error' && (
          <p className="text-sm text-red-400 mb-10 font-light">
            Connection failed. Please try again or email us directly.
          </p>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-[#1e1e1e] my-14" />

        {/* Contact info — 3 blocks with vertical stacking */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-[#1e1e1e]">
          <div className="group sm:pr-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] mb-3 font-medium">Email</p>
            <a
              href={`mailto:${COMPANY_INFO.mainEmail}`}
              className="text-sm font-light text-[#6A6A6A] group-hover:text-white transition-colors duration-300 hover-line-extend"
            >
              {COMPANY_INFO.mainEmail}
            </a>
          </div>

          <div className="group sm:px-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] mb-3 font-medium">Phone</p>
            <p className="text-sm font-light text-[#6A6A6A] group-hover:text-white transition-colors duration-300">
              {OFFICE_LOCATIONS[0].phone}
            </p>
          </div>

          <div className="group sm:pl-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#3E3E3E] mb-3 font-medium">Offices</p>
            <p className="text-sm font-light text-[#6A6A6A] group-hover:text-white transition-colors duration-300">
              {OFFICE_LOCATIONS.map(loc => loc.region).join(' · ')}
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-[#1a1a1a]">
          <p className="text-xs text-[#3E3E3E] font-light leading-relaxed max-w-xl">
            Every engagement begins with a conversation. We are selective about what we take on — because every project deserves full attention and honest counsel.
          </p>
        </div>
      </div>
    </section>
  )
}
