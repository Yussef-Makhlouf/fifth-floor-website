'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, ArrowDown, Zap } from 'lucide-react'
import DiagonalGrid from '@/components/ui/diagonal-grid'
import { CircleDecoration } from '@/components/ui/architectural-shapes'

export default function GleeHero() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault()
    const formEl = document.getElementById('partnership-form')
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 bg-gradient-to-br from-[#F7F6F3] via-[#F3F2EE] to-[#EFECE6] text-[#1A1A1C] pt-36 pb-24 overflow-hidden">
      {/* ─── Ambient Glow Orbs (Subtle Glee Lime & Fifth Floor Neutral) ──── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#D2FA15]/15 via-[#1A1A1C]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-tl from-[#FF3B5C]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* ─── CREATIVE DECORATION: Huge Background Glee Watermark ─────────── */}
      <div className="absolute -top-10 -right-16 md:right-10 w-[500px] md:w-[750px] h-[350px] md:h-[480px] opacity-[0.06] pointer-events-none select-none rotate-[-8deg] transform-gpu ">
        <Image
          src="/logos/glee-logo-transparent.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="absolute -bottom-16 -left-16 w-[400px] md:w-[600px] h-[300px] md:h-[400px] opacity-[0.04] pointer-events-none select-none rotate-[10deg] transform-gpu">
        <Image
          src="/logos/glee-logo-transparent.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* ─── Architectural Grid & Circle Accents ────────────────────────── */}
      <DiagonalGrid position="top-right" gridColor="#1A1A1C" gridSize={40} opacity={0.08} />
      <DiagonalGrid position="bottom-left" gridColor="#1A1A1C" gridSize={40} opacity={0.06} />

      <CircleDecoration className="absolute -top-20 -left-20 md:-top-36 md:-left-36 opacity-40" size="xl" />
      <CircleDecoration className="absolute -bottom-32 -right-32 opacity-40" size="xl" />

      {/* Vertical Decorative Line */}
      <div className="absolute top-1/4 right-12 md:right-24 w-px h-48 bg-gradient-to-b from-transparent via-[#1A1A1C]/20 to-transparent" />
      <div className="absolute bottom-1/4 left-12 md:left-24 w-px h-36 bg-gradient-to-b from-transparent via-[#1A1A1C]/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Partnership Pill Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[#1A1A1C]/15 backdrop-blur-md mb-8 shadow-sm animate-fade-in">
          <Zap className="w-4 h-4 text-[#8CB800]" />
          <span className="text-xs uppercase tracking-[0.25em] font-mono font-semibold text-[#1A1A1C]">
            Glee Brand • Executive Alliance
          </span>
        </div>

        {/* ─── CREATIVE LOGO CENTERPIECE (Glee Brand Identity) ───────────── */}
        <div className="relative mb-10 group">
          {/* Subtle ambient glow behind logo */}
          <div className="absolute -inset-6 bg-gradient-to-r from-[#D2FA15]/20 via-[#FF3B5C]/10 to-[#D2FA15]/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-500 group-hover:scale-105 pointer-events-none" />
          
          <div className="relative py-4 flex items-center justify-center">
            <Image
              src="/logos/glee-logo-transparent.svg"
              alt="Glee by Fifth Floor"
              width={380}
              height={160}
              className="w-64 sm:w-80 md:w-[380px] h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              priority
            />
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-syne-display tracking-tight text-[#1A1A1C] leading-[1.08] mb-6">
          Powering Extraordinary <br />
          <span className="font-serif-accent italic text-[#4A4A4F]">
            Glee Brand Partnerships
          </span>
        </h1>

        {/* Brand Mention & Description */}
        <p className="text-base md:text-xl text-[#5A5A5E] max-w-3xl font-light leading-relaxed mb-12">
          <strong className="font-semibold text-[#1A1A1C]">Glee by Fifth Floor</strong> is a specialized brand activation and content creator ecosystem. Powered by Fifth Floor’s spatial design, creative direction, and strategy, Glee connects forward-thinking brands and top content creators through high-impact sponsorships and curated events.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#1A1A1C] text-[#F7F6F3] font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#2C2C30] transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 active-press cursor-pointer"
          >
            Apply for Glee Partnership
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </button>
 
        </div>
      </div>
    </section>
  )
}
