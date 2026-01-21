'use client'

import NavBar from '@/components/navbar'
import ContactHero from '@/components/sections/contact-hero'
import ContactForm from '@/components/sections/contact-form'
import ContactInfo from '@/components/sections/contact-info'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-background text-foreground">
      <NavBar isScrolled={isScrolled} />
      <main>
        <ContactHero />
        <ContactForm />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  )
}
