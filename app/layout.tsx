import React from "react"
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Using system font stack for reliability - no network dependency
const fontClass = 'font-sans'

export const metadata: Metadata = {
  title: 'FIFTH FLOOR – Where Big Ideas Take Shape',
  description: 'Premium creative house operating in Kuwait and UAE. Brand strategy, branding, marketing, events, booths & creative concepts for government entities, corporations, cultural institutions, and luxury brands.',
  keywords: ['creative agency', 'brand strategy', 'branding', 'marketing', 'events', 'Kuwait', 'UAE', 'GCC', 'luxury brands', 'creative concepts'],
  authors: [{ name: 'Yussef Dev Studio' }],
  creator: 'Yussef Dev Studio',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
  themeColor: '#3E3E3E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontClass} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
