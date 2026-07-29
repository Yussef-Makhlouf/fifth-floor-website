'use client'

import NavBar from '@/components/navbar'
import ContactHero from '@/components/sections/contact-hero'
import ContactForm from '@/components/sections/contact-form'
import ContactInfo from '@/components/sections/contact-info'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-background text-foreground">
      <NavBar isScrolled={isScrolled} />
      <main>
        <ContactHero />

        {/* Glee Partnership Banner */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 my-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0D0E10] via-[#16171B] to-[#0D0E10] text-[#F8F8FA] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-[#D2FA15]/20 group">
            {/* Background Watermark */}
            <div className="absolute -right-10 -bottom-10 w-80 h-40 opacity-10 pointer-events-none rotate-[-6deg]">
              <Image
                src="/logos/glee-logo-transparent.svg"
                alt=""
                fill
                className="object-contain filter invert"
              />
            </div>

            <div className="space-y-3 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono font-semibold text-[#D2FA15]">
                <Sparkles className="w-3.5 h-3.5 text-[#D2FA15]" />
                Glee × Fifth Floor Alliance
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Image
                  src="/logos/glee-logo-transparent.svg"
                  alt="Glee"
                  width={140}
                  height={60}
                  className="w-32 h-auto object-contain filter drop-shadow-[0_0_15px_rgba(210,250,21,0.2)]"
                />
                <h3 className="text-xl md:text-2xl font-bold font-syne-display tracking-tight text-white">
                  Brand Sponsorships & Creator Portal
                </h3>
              </div>
              <p className="text-xs md:text-sm text-[#9E9EA8] max-w-xl font-light">
                Submit your brand or creator partnership application directly on our dedicated Glee partnership page.
              </p>
            </div>
            <Link
              href="/glee"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#D2FA15] text-[#0D0E10] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#c3ea0f] transition-all duration-300 shadow-[0_0_25px_rgba(210,250,21,0.3)] shrink-0 active-press hover:scale-[1.02] z-10"
            >
              Explore Glee Page
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        </div>

        <ContactForm />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  )
}
