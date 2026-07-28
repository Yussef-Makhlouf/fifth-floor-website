import React from "react"
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import GlobalCursor from '@/components/ui/global-cursor'
import './globals.css'

import { Outfit, Syne, Playfair_Display } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FIFTH FLOOR – Where Big Ideas Take Shape',
  description: 'Premium creative house operating in Kuwait and UAE. Brand strategy, branding, marketing, events, booths & creative concepts for government entities, corporations, cultural institutions, and luxury brands.',
  keywords: ['creative agency', 'brand strategy', 'branding', 'marketing', 'events', 'Kuwait', 'UAE', 'GCC', 'luxury brands', 'creative concepts'],
  authors: [{ name: 'Fifth Floor Creative Club' }],
  creator: 'Fifth Floor Creative Club',
  icons: {
    icon: '/logos/fifith-favicon.png',
    shortcut: '/logos/fifith-favicon.png',
    apple: '/logos/fifith-favicon.png',
  },
  openGraph: {
    title: 'FIFTH FLOOR – Where Big Ideas Take Shape',
    description: 'Premium creative house. Brand strategy, branding, marketing, events & creative concepts for Kuwait and UAE.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0E0E10',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden bg-[#F7F6F3] text-[#1A1A1C] selection:bg-[#1A1A1C] selection:text-[#F7F6F3]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#0E0E10] focus:text-[#F7F6F3] focus:border focus:border-white/20 focus:outline-none"
        >
          Skip to main content
        </a>
        <GlobalCursor />
        <div id="main-content">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
