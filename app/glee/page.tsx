'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import NavBar from '@/components/navbar'
import GleeHero from '@/components/sections/glee-hero'
import PartnershipForm from '@/components/sections/partnership-form'
import Footer from '@/components/footer'

export default function GleePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-[#F7F6F3] text-[#1A1A1C] min-h-screen">
      <NavBar isScrolled={isScrolled} />
      <main className="relative">
        {/* ─── Glee Hero Section (Fifth Floor Palette & Glee Identity) ──── */}
        <GleeHero />

        {/* ─── CREATIVE DECORATION: Side Glee Logo Watermarks ──────────────── */}
        <div className="relative">
          {/* Left Watermark */}
          <div className="absolute top-24 -left-28 w-[500px] h-[320px] opacity-[0.035] pointer-events-none rotate-[-12deg] hidden lg:block select-none">
            <Image
              src="/logos/glee-logo-transparent.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Right Watermark */}
          <div className="absolute bottom-36 -right-28 w-[550px] h-[350px] opacity-[0.035] pointer-events-none rotate-[8deg] hidden lg:block select-none">
            <Image
              src="/logos/glee-logo-transparent.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Partnership Form Section */}
          <div id="partnership-form" className="relative z-10">
            <PartnershipForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
