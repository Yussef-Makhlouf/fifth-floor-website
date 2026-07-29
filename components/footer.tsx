'use client'

import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/scroll-reveal'
import MagneticButton from '@/components/ui/magnetic-button'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0E0E10] text-[#8E8D8A] relative overflow-hidden border-t border-white/10">
      {/* Ambient Lighting Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[25rem] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 relative z-10">
        {/* Large Brand Statement */}
        <ScrollReveal variant="fade-up">
          <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-[#6E6E73] font-mono mb-4 block">
                // Fifth Floor Creative Club
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-syne-display tracking-tighter text-[#F7F6F3] leading-[1.05]">
                Where Big Ideas <br />
                <span className="font-serif-accent text-[#8E8D8A]">Take Shape.</span>
              </h2>
            </div>
            <MagneticButton strength={0.35}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#F7F6F3] text-[#0E0E10] font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all duration-300 active-press hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] shrink-0"
              >
                Let's Talk
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Location & Info Grid */}
        <ScrollReveal variant="stagger" staggerAmount={0.12} className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/logos/fifth-icon-light.png"
                  alt="Fifth Floor"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-lg font-bold font-syne-display tracking-[0.2em] text-[#F7F6F3]">
                FIFTH FLOOR
              </span>
            </Link>
            <p className="text-xs text-[#8E8D8A] leading-relaxed max-w-sm">
              Bespoke creative house operating in Kuwait and UAE. Strategy, spatial branding, marketing, events, and immersive experiences for forward-thinking brands.
            </p>
            <div className="pt-2 text-xs font-mono text-[#6E6E73]">
              KW 029.3759° N • UAE 025.2048° N
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#F7F6F3] mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'About Agency', href: '/about' },
                { label: 'Selected Work', href: '/case-studies' },
                { label: 'Capabilities', href: '/services' },
                { label: 'Glee Partnership', href: '/glee' },
                { label: 'Get in Touch', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-[#8E8D8A] hover:text-[#F7F6F3] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#8E8D8A] group-hover:bg-[#F7F6F3] group-hover:scale-150 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#F7F6F3] mb-4">
              Capabilities
            </p>
            <ul className="space-y-2 text-xs text-[#8E8D8A]">
              {['Brand Strategy', 'Brand Identity', 'Marketing & Media', 'Events & Exhibitions', 'Spatial & Booths', 'Creative Concepts'].map((service) => (
                <li key={service} className="hover:text-[#F7F6F3] transition-colors duration-300 cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#F7F6F3] mb-4">
              Connect
            </p>
            <a
              href="mailto:info.fifthfloorcc@gmail.com"
              className="text-xs text-[#F7F6F3] hover:underline underline-offset-4 block"
            >
info.fifthfloorcc@gmail.com
            </a>
            <div className="text-xs text-[#8E8D8A] space-y-1 font-mono pt-2">
              <p>Kuwait City, Al Hamra Tower</p>
              <p>Dubai, DIFC Gate Precinct</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6E6E73]">
          <p>© {currentYear} Fifth Floor Creative Club. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#8E8D8A] transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-[#8E8D8A] transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>

          <p className="font-mono text-[10px] tracking-wider uppercase">
            Crafted by <span className="text-[#8E8D8A]">Fifth Floor Creative Club</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
