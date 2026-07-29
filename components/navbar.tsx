'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import MagneticButton from '@/components/ui/magnetic-button'

interface NavBarProps {
  isScrolled?: boolean
}

export default function NavBar({ isScrolled = false }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(isScrolled)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Creatives', href: '/case-studies' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled ? 'py-3' : 'py-6'
      } ${
        scrolled && !isOpen
          ? 'bg-[#F7F6F3]/85 backdrop-blur-xl border-b border-[#1A1A1C]/8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
          : 'bg-transparent'
      }`}
    >
      <div className="relative z-50 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02] active-press"
        >
          <div className="relative w-11 h-11 shrink-0">
            {/* Dark Logo (Default) */}
            <Image
              src="/logos/fifth-icon-dark.png"
              alt="Fifth Floor"
              fill
              className={`object-contain rounded-full transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
              priority
            />
            {/* Light Logo (Mobile Menu) */}
            <Image
              src="/logos/fifth-icon-light.png"
              alt="Fifth Floor"
              fill
              className={`object-contain rounded-full transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
              priority
            />
          </div>
          <span
            className={`text-lg md:text-xl font-bold tracking-[0.25em] font-syne-display whitespace-nowrap transition-colors duration-300 ${
              isOpen ? 'text-[#F7F6F3]' : 'text-[#1A1A1C]'
            }`}
          >
            FIFTH FLOOR
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

            return (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.25em] font-semibold transition-colors duration-300 block py-1.5 px-1 relative ${
                    isActive ? 'text-[#1A1A1C]' : 'text-[#6E6E73] hover:text-[#1A1A1C]'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1C] inline-block animate-pulse" />
                    )}
                    {link.label}
                  </span>
                </Link>

                {/* Animated active/hover underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#1A1A1C] transition-all duration-300 cubic-bezier(0.16,1,0.3,1) ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </div>
            )
          })}

          {/* Quick CTA */}
          <MagneticButton strength={0.25}>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#1A1A1C] text-[#F7F6F3] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:bg-[#3E3E42] transition-all duration-300 active-press hover:shadow-lg inline-block"
            >
               Let's Talk
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`relative z-50 md:hidden p-2 rounded-full transition-colors duration-300 ${
            isOpen ? 'text-[#F7F6F3]' : 'text-[#1A1A1C] hover:bg-black/5'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0E0E10] z-40 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${
          isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col justify-between px-8 md:px-16 pt-28 pb-12 relative overflow-hidden">
          {/* Background Decoration */}
          <div
            className={`absolute -right-20 -bottom-20 w-[60vh] h-[60vh] opacity-[0.04] transition-transform duration-1000 ${
              isOpen ? 'translate-y-0 rotate-0' : 'translate-y-20 rotate-12'
            }`}
          >
            <Image
              src="/logos/fifth-decore-dark.png"
              alt=""
              fill
              className="object-contain invert brightness-0"
            />
          </div>

          <div className="space-y-6 relative z-10 my-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8E8D8A] mb-8 font-mono">
              // Navigation
            </p>
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block text-5xl sm:text-6xl font-syne-display font-bold tracking-tighter transition-all duration-500 transform ${
                    isActive ? 'text-white pl-4 border-l-2 border-white' : 'text-[#8E8D8A] hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: `${100 + index * 60}ms`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                  }}
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#555] pt-1">0{index + 1}</span>
                    <span>{link.label}</span>
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Footer Info */}
          <div
            className="pt-8 border-t border-white/10 flex flex-col gap-4 relative z-10"
            style={{
              transitionDelay: '400ms',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '700ms',
            }}
          >
            <div className="flex gap-6 text-[#8E8D8A] text-xs tracking-widest uppercase font-mono">
              <span>Kuwait 🇰🇼</span>
              <span>UAE 🇦🇪</span>
            </div>
            <a
              href="mailto:hello@fifthfloor.com"
              className="text-[#F7F6F3] text-lg hover:text-white transition-colors"
            >
              hello@fifthfloor.com
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
