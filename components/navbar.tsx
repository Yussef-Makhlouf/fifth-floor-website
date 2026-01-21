'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

interface NavBarProps {
  isScrolled?: boolean
}

export default function NavBar({ isScrolled = false }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(isScrolled)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
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
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: 'services' },
    { label: 'Philosophy', href: '/#philosophy' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled && !isOpen
        ? 'bg-[#f8f8f8]/80 backdrop-blur-md border-b border-[#3E3E3E]/5 py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="relative z-50 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-opacity duration-300 hover:opacity-80"
        >
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src={isOpen ? "/logos/fifth-icon-light.png" : "/logos/fifth-icon-dark.png"}
              alt="Fifth Floor"
              fill
              className="object-contain rounded-full transition-opacity duration-300"
              priority
            />
          </div>
          <span className={`text-xl font-bold tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#3E3E3E]'}`}>
            FIFTH FLOOR
          </span>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-10 lg:gap-14">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group overflow-hidden">
              <a
                href={link.href}
                className="text-sm font-medium tracking-wide text-[#3E3E3E] transition-colors duration-400 block relative py-1"
              >
                <span className="relative z-10 group-hover:-translate-y-[150%] transition-transform duration-500 block">
                  {link.label}
                </span>
                <span className="absolute top-0 left-0 w-full h-full z-10 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 block text-[#3E3E3E] font-bold">
                  {link.label}
                </span>
              </a>
              <span className="absolute bottom-0 left-1/2 w-0 h-px bg-[#3E3E3E] group-hover:w-full group-hover:left-0 transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`relative z-50 md:hidden p-2 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#3E3E3E] hover:text-[#6A6A6A]'
            }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#3E3E3E] z-40 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <div className="h-full flex flex-col justify-center px-8 md:px-16 pt-20 relative overflow-hidden">
          {/* Background Decoration */}
          <div
            className={`absolute -right-20 -bottom-20 w-[60vh] h-[60vh] opacity-[0.05] transition-transform duration-1000 ${isOpen ? 'translate-y-0 rotate-0' : 'translate-y-20 rotate-12'}`}
          >
            <Image
              src="/logos/fifth-decore-dark.png"
              alt=""
              fill
              className="object-contain invert brightness-0"
            />
          </div>

          <div className="space-y-8 relative z-10">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-4xl md:text-6xl font-thin text-[#CFCFCF] hover:text-white transition-colors duration-300 transform"
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: `${100 + index * 50}ms`,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(40px)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '700ms',
                  transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                }}
              >
                <span className="flex items-center gap-4 group">
                  <span className="text-sm font-mono opacity-50 pt-2 lg:pt-4">0{index + 1}</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">{link.label}</span>
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Footer Info */}
          <div
            className="mt-16 pt-8 border-t border-[#CFCFCF]/10 flex flex-col gap-4"
            style={{
              transitionDelay: '400ms',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '700ms'
            }}
          >
            <div className="flex gap-6 text-[#919191] text-sm tracking-widest uppercase">
              <span>Kuwait</span>
              <span>UAE</span>
            </div>
            <a href="mailto:hello@fifthfloor.com" className="text-[#CFCFCF] text-lg hover:text-white transition-colors">hello@fifthfloor.com</a>
          </div>
        </div>
      </div>

    </nav>
  )
}
