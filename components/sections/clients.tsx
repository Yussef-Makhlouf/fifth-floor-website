'use client'

import React from 'react'
import Image from 'next/image'
import { CircleDecoration } from '@/components/ui/architectural-shapes'
import ScrollReveal from '@/components/ui/scroll-reveal'

const partnerLogos = [
  { name: 'Andalus Mall',  src: '/partner-logos/andalus_mall_logo.svg',   accent: '#e8275a' },
  { name: 'Burgan Bank',   src: '/partner-logos/burgan_bank_logo.svg',    accent: '#055ba9' },
  { name: 'Dabdoob',       src: '/partner-logos/dabdoob_logo.svg',        accent: '#a78bfa' },
  { name: 'Partner 03',    src: '/partner-logos/partner_logo_03.svg',     accent: '#38bdf8' },
  { name: 'Partner 04',    src: '/partner-logos/partner_logo_04.svg',     accent: '#38bdf8' },
  { name: 'Partner 05',    src: '/partner-logos/partner_logo_05.svg',     accent: '#e5e5e5' },
  { name: 'Partner 06',    src: '/partner-logos/partner_logo_06.svg',     accent: '#f4921f' },
  { name: 'Technova',      src: '/partner-logos/technova_logo.svg',       accent: '#6C63FF' },
  { name: 'B-Genius',      src: '/partner-logos/b_genius_logo.png',       accent: '#F59E0B' },
]

// Triple-duplicate for truly seamless infinite scroll at large sizes
const track1 = [...partnerLogos, ...partnerLogos, ...partnerLogos]
const marqueeTrack2 = [...partnerLogos].reverse()
const marqueeTrack2Full = [...marqueeTrack2, ...marqueeTrack2, ...marqueeTrack2]

export default function Clients() {
  return (
    <section className="clients-section relative py-24 sm:py-32 bg-[#0A0A0C] text-[#F7F6F3] overflow-hidden border-t border-white/[0.07]">

      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large radial glow top-center */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80rem] h-[40rem] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
      </div>

      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 mb-20">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-white/30" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono">
                  // Strategic Partners
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-syne-display tracking-tighter text-white leading-[1.0]">
                Trusted by the world's{' '}
                <br className="hidden sm:block" />
                <span className="font-serif-accent font-normal italic text-white/50">
                  top visionaries
                </span>
              </h2>
            </div>

            {/* Stats */}
            <div className="flex gap-12 md:gap-16 pb-2">
              {[
                { value: '50+', label: 'Brand Partners' },
                { value: '8+', label: 'Years Active' },
              ].map((stat) => (
                <div key={stat.label} className="text-right">
                  <div className="text-3xl sm:text-4xl font-bold font-syne-display text-white tracking-tight">{stat.value}</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/35 font-mono mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Marquee Tracks ── */}
      <div className="relative z-10 flex flex-col gap-5">

        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-64 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #0A0A0C 0%, transparent 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-64 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #0A0A0C 0%, transparent 100%)' }} />

        {/* ── Track 1: Left → Right (faster) ── */}
        <div className="flex w-max logo-track-1">
          {track1.map((logo, idx) => (
            <LogoCard key={`t1-${logo.name}-${idx}`} logo={logo} />
          ))}
        </div>

        {/* ── Track 2: Right → Left (slower, offset) ── */}
        <div className="flex w-max logo-track-2" style={{ marginLeft: '-8%' }}>
          {marqueeTrack2Full.map((logo, idx) => (
            <LogoCard key={`t2-${logo.name}-${idx}`} logo={logo} dim />
          ))}
        </div>

      </div>

      {/* ── Animations ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .logo-track-1 {
          animation: scroll-left 50s linear infinite;
        }
        .logo-track-2 {
          animation: scroll-right 65s linear infinite;
        }
        .logo-track-1:hover,
        .logo-track-2:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .logo-card {
          transition: border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
        }
        .logo-card:hover {
          transform: translateY(-5px) scale(1.04);
          border-color: rgba(255,255,255,0.2) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) !important;
          background: rgba(255,255,255,0.07) !important;
        }
        .logo-img {
          transition: filter 0.4s ease, opacity 0.4s ease;
        }
        .logo-card:hover .logo-img {
          filter: brightness(1.1) saturate(1.2) !important;
          opacity: 1 !important;
        }
        .logo-card:hover .logo-glow {
          opacity: 1 !important;
        }
      `}} />
    </section>
  )
}

/* ─── Logo Card Component ─── */
function LogoCard({ logo, dim = false }: { logo: typeof partnerLogos[0]; dim?: boolean }) {
  return (
    <div
      className="logo-card relative mx-3 flex-shrink-0 flex items-center justify-center cursor-default"
      style={{
        width: '240px',
        height: '120px',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        background: dim
          ? 'rgba(255,255,255,0.015)'
          : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Accent glow that appears on hover */}
      <div
        className="logo-glow absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: 0,
          background: `radial-gradient(ellipse at 50% 120%, ${logo.accent}22 0%, transparent 70%)`,
          transition: 'opacity 0.4s ease',
        }}
      />
      {/* Inner subtle border glow on hover via box-shadow handled in CSS */}

      <Image
        src={logo.src}
        alt={logo.name}
        width={180}
        height={80}
        className="logo-img object-contain relative z-10"
        style={{
          maxWidth: '170px',
          maxHeight: '76px',
          width: 'auto',
          height: 'auto',
          filter: dim
            ? 'brightness(0.5) saturate(0.25)'
            : 'brightness(0.8) saturate(0.6)',
          opacity: dim ? 0.65 : 0.9,
        }}
      />
    </div>
  )
}
