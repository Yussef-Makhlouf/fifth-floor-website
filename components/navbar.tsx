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

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: 'services' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
        ? 'bg-[#CFCFCF] border-b border-[#919191]'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative w-48 h-12 transition-opacity duration-300 hover:opacity-80"
        >
          <Image
            src="/logos/fifth-icon-dark.png"
            alt="Fifth Floor"
            fill
            className="object-contain object-left rounded-full"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 lg:gap-14">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-wide text-[#3e3e3e] hover:text-[#3e3e3e] transition-colors duration-400 hover-line-extend"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#3E3E3E] hover:text-[#6A6A6A] transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-[#CFCFCF] border-t border-[#919191] px-6 py-8 space-y-6">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm font-medium tracking-wide text-[#6A6A6A] hover:text-[#3E3E3E] transition-colors duration-300"
              onClick={() => setIsOpen(false)}
              style={{
                animation: isOpen ? `slideInUp 0.4s ease-out ${index * 0.1}s forwards` : 'none',
                opacity: 0,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Decorative Line */}
      <div
        className={`h-px bg-[#919191] transition-all duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </nav>
  )
}
