'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#3e3e3e] text-[#cfcfcf] relative overflow-hidden">
      {/* Decorative top line */}
      <div className="h-px bg-[#6A6A6A]" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        {/* Large Brand Statement */}
        <div className="mb-20 md:mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#CFCFCF] leading-tight">
            Where Big Ideas
            <br />
            Take Shape
          </h2>
        </div>

        {/* Location & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="block mb-6 relative w-40 h-10">
              <Image
                src="/logos/fifth-icon-light.png"
                alt="Fifth Floor"
                fill
                className="object-contain object-left rounded-full"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium creative house serving government entities, corporations,
              cultural institutions, and luxury brands across the GCC.
            </p>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <p className="section-label mb-4">Services</p>
            <ul className="space-y-2">
              {['Brand Strategy', 'Branding', 'Marketing', 'Events', 'Booths', 'Creative Concepts'].map((service) => (
                <li key={service}>
                  <span className="text-sm hover:text-[#CFCFCF] transition-colors duration-300 cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="md:col-span-2">
            <p className="section-label mb-4 text-[#919191]">Locations</p>
            <div className="flex items-center gap-3 text-sm text-[#CFCFCF]">
              <span>Kuwait 🇰🇼</span>
              <span className="text-[#919191]">|</span>
              <span>UAE 🇦🇪</span>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="section-label mb-4 text-[#919191]">Connect</p>
            <div className="space-y-2">
              <a
                href="/contact"
                className="text-sm text-[#919191] hover:text-[#CFCFCF] transition-colors duration-300 block hover-line-extend inline-block"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#6A6A6A] mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#919191]">
            © {currentYear} Fifth Floor. All rights reserved.
          </p>
          <p className="text-xs text-[#919191]">
            Designed & Developed by{' '}
            <span className="text-[#CFCFCF]">Yussef Dev Studio</span>
          </p>
        </div>
      </div>

      {/* Decorative Corner Shape */}
      <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          <circle cx="300" cy="300" r="280" stroke="#919191" strokeWidth="1" />
          <circle cx="300" cy="300" r="200" stroke="#919191" strokeWidth="1" />
        </svg>
      </div>
    </footer>
  )
}
